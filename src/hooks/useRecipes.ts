import { useState } from 'react';
import { Recipe, Ingredient } from '../types';
import { generateRecipesFromIngredients } from '../utils/recipes';
import { supabase } from '../lib/supabase';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipes = async (ingredients: Ingredient[]) => {
    try {
      setLoading(true);
      setError(null);
      
      const generatedRecipes = await generateRecipesFromIngredients(ingredients);
      setRecipes(generatedRecipes);
      
      return generatedRecipes;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error generating recipes';
      setError(errorMessage);
      console.error('Error generating recipes:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (recipeId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const updatedRecipes = recipes.map(recipe => {
        if (recipe.id === recipeId) {
          const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
          
          // Save to Supabase if user is authenticated
          if (user) {
            supabase
              .from('recipes')
              .upsert({
                id: updatedRecipe.id,
                user_id: user.id,
                name: updatedRecipe.name,
                description: updatedRecipe.description,
                ingredients: updatedRecipe.ingredients,
                instructions: updatedRecipe.instructions,
                prep_time: updatedRecipe.prepTime,
                cook_time: updatedRecipe.cookTime,
                servings: updatedRecipe.servings,
                difficulty: updatedRecipe.difficulty,
                meal_type: updatedRecipe.mealType,
                tags: updatedRecipe.tags,
                is_favorite: updatedRecipe.isFavorite || false
              });
          }
          
          return updatedRecipe;
        }
        return recipe;
      });
      
      setRecipes(updatedRecipes);
    } catch (err) {
      console.error('Error toggling favorite:', err);
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