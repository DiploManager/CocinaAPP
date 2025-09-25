import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, Heart, Timer } from 'lucide-react';
import { Recipe } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { getMealTypeLabel } from '../../utils/recipes';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (recipeId: string) => void;
}

export function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const difficultyLabels = {
    easy: 'Fácil',
    medium: 'Intermedio',
    hard: 'Difícil'
  };

  return (
    <Card hover className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={difficultyColors[recipe.difficulty]}>
                {difficultyLabels[recipe.difficulty]}
              </Badge>
              <Badge variant="secondary">
                {getMealTypeLabel(recipe.mealType)}
              </Badge>
              {recipe.tags.map(tag => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {onToggleFavorite && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleFavorite(recipe.id)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                recipe.isFavorite 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${recipe.isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center text-sm text-gray-600">
            <Timer className="w-4 h-4 mr-1" />
            <span>{recipe.prepTime} min prep</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{recipe.cookTime} min cocción</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>{recipe.servings} porciones</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <ChefHat className="w-4 h-4 mr-2" />
            Ingredientes
          </h4>
          <div className="grid grid-cols-2 gap-1">
            {recipe.ingredients.map((ingredient, index) => (
              <span key={index} className="text-sm text-gray-600 capitalize">
                • {ingredient}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Instrucciones</h4>
          <ol className="space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-sm text-gray-600 flex">
                <span className="font-medium text-emerald-600 mr-2 min-w-[20px]">
                  {index + 1}.
                </span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Card>
  );
}