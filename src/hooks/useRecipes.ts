import { useState } from 'react';
import { Recipe, Ingredient } from '../types';
import { generateRecipesFromIngredients } from '../utils/recipes';
import { supabase } from '../lib/supabase';
// Hook personalizado para gestión de recetas

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generar recetas basadas en ingredientes disponibles
  const generateRecipes = async (ingredients: Ingredient[]) => {
    try {
      setLoading(true);
      setError(null);
      
      // Usar API local para generación de recetas
      setRecipes(generatedRecipes);
      
      return generatedRecipes;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error generando recetas';
      setError(errorMessage);
      console.error('Error generando recetas:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Alternar estado de favorito de una receta
  const toggleFavorite = async (recipeId: string) => {
    try {
      const updatedRecipes = recipes.map(recipe => {
        if (recipe.id === recipeId) {
          const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
          
          // Save to localStorage for local testing
          const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '{}');
          favoriteRecipes[recipeId] = updatedRecipe.isFavorite;
          localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
          
          // Supabase integration commented out for local testing
          // const { data: { user } } = await supabase.auth.getUser();
          // ... Supabase code here
          
          return updatedRecipe;
        }
        return recipe;
      });
      
      setRecipes(updatedRecipes);
    } catch (err) {
      console.error('Error alternando favorito:', err);
    }
  };

  return {
    recipes,
    loading,
    error,
    generateRecipes,
    toggleFavorite,
    setRecipes
  };
}