import { useState, useEffect } from 'react';
import { Ingredient, IngredientCategory } from '../types';
import { supabase } from '../lib/supabase';
import { categorizeIngredient } from '../utils/categories';

// Hook personalizado para gestión de ingredientes
export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIngredients();
  }, []);

  // Cargar ingredientes desde la API local
  const loadIngredients = async () => {
    try {
      setLoading(true);
      // Usar API local
      const stored = localStorage.getItem('ingredients');
      if (stored) {
        const parsedIngredients = JSON.parse(stored).map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setIngredients(parsedIngredients);
      }
      
      // Supabase integration commented out for local testing
      // const { data: { user } } = await supabase.auth.getUser();
      // ... Supabase code here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando ingredientes');
      console.error('Error cargando ingredientes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Agregar nuevo ingrediente
  const addIngredient = async (name: string, quantity?: string, unit?: string, source: 'manual' | 'receipt' = 'manual') => {
    try {
      const category = categorizeIngredient(name);
      const newIngredient: Ingredient = {
        id: crypto.randomUUID(),
        name,
        category,
        quantity,
        unit,
        addedAt: new Date(),
        source
      };

      // Always use localStorage for local testing
      const updatedIngredients = [newIngredient, ...ingredients];
      localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
      setIngredients(updatedIngredients);
      
      // Supabase integration commented out for local testing
      // const { data: { user } } = await supabase.auth.getUser();
      // ... Supabase code here

      return newIngredient;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error agregando ingrediente');
      throw err;
    }
  };

  // Eliminar ingrediente
  const removeIngredient = async (id: string) => {
    try {
      // Always use localStorage for local testing
      const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== id);
      localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
      setIngredients(updatedIngredients);
      
      // Supabase integration commented out for local testing
      // const { data: { user } } = await supabase.auth.getUser();
      // ... Supabase code here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error eliminando ingrediente');
      throw err;
    }
  };

  // Limpiar todos los ingredientes
  const clearIngredients = async () => {
    try {
      // Always use localStorage for local testing
      localStorage.removeItem('ingredients');
      setIngredients([]);
      
      // Supabase integration commented out for local testing
      // const { data: { user } } = await supabase.auth.getUser();
      // ... Supabase code here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error limpiando ingredientes');
      throw err;
    }
  };

  return {
    ingredients,
    loading,
    error,
    addIngredient,
    removeIngredient,
    clearIngredients,
    refresh: loadIngredients
  };
}