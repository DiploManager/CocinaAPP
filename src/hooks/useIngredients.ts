import { useState, useEffect } from 'react';
import { Ingredient, IngredientCategory } from '../types';
import { supabase } from '../lib/supabase';
import { categorizeIngredient } from '../utils/categories';

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Load from localStorage for non-authenticated users
        const stored = localStorage.getItem('ingredients');
        if (stored) {
          setIngredients(JSON.parse(stored));
        }
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from('ingredients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      const formattedIngredients: Ingredient[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as IngredientCategory,
        quantity: item.quantity || undefined,
        unit: item.unit || undefined,
        addedAt: new Date(item.created_at),
        source: item.source as 'manual' | 'receipt'
      }));

      setIngredients(formattedIngredients);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading ingredients');
      console.error('Error loading ingredients:', err);
    } finally {
      setLoading(false);
    }
  };

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

      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error: supabaseError } = await supabase
          .from('ingredients')
          .insert({
            id: newIngredient.id,
            user_id: user.id,
            name: newIngredient.name,
            category: newIngredient.category,
            quantity: newIngredient.quantity,
            unit: newIngredient.unit,
            source: newIngredient.source
          });

        if (supabaseError) throw supabaseError;
      } else {
        // Store locally for non-authenticated users
        const updatedIngredients = [newIngredient, ...ingredients];
        localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
        setIngredients(updatedIngredients);
      }

      if (user) {
        await loadIngredients();
      }

      return newIngredient;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding ingredient');
      throw err;
    }
  };

  const removeIngredient = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error: supabaseError } = await supabase
          .from('ingredients')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (supabaseError) throw supabaseError;
        await loadIngredients();
      } else {
        const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== id);
        localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
        setIngredients(updatedIngredients);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error removing ingredient');
      throw err;
    }
  };

  const clearIngredients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error: supabaseError } = await supabase
          .from('ingredients')
          .delete()
          .eq('user_id', user.id);

        if (supabaseError) throw supabaseError;
      } else {
        localStorage.removeItem('ingredients');
      }

      setIngredients([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error clearing ingredients');
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