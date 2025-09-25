import React from 'react';
import { motion } from 'framer-motion';
import { Recipe } from '../../types';
import { RecipeCard } from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite?: (recipeId: string) => void;
}

export function RecipeList({ recipes, onToggleFavorite }: RecipeListProps) {
  if (recipes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Recetas Sugeridas</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RecipeCard recipe={recipe} onToggleFavorite={onToggleFavorite} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}