import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Sparkles, Clock, ListFilter as Filter } from 'lucide-react';
import { useIngredients } from '../hooks/useIngredients';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeList } from '../components/Recipes/RecipeList';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { getCurrentMealType, getMealTypeLabel } from '../utils/recipes';
import { MealType } from '../types';

export function Recipes() {
  const navigate = useNavigate();
  const { ingredients } = useIngredients();
  const { recipes, loading, generateRecipes, toggleFavorite } = useRecipes();
  const [selectedMealType, setSelectedMealType] = useState<MealType | 'all'>('all');

  const currentMealType = getCurrentMealType();
  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  useEffect(() => {
    if (ingredients.length > 0 && recipes.length === 0) {
      generateRecipes(ingredients);
    }
  }, [ingredients]);

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      navigate('/ingredients');
      return;
    }
    await generateRecipes(ingredients);
  };

  const filteredRecipes = recipes.filter(recipe => 
    selectedMealType === 'all' || recipe.mealType === selectedMealType
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Recetas Inteligentes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Genera recetas personalizadas basadas en tus ingredientes disponibles y el momento del día.
        </p>
      </motion.div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Momento actual: </span>
              <Badge variant="success" className="ml-1">
                {getMealTypeLabel(currentMealType)}
              </Badge>
            </div>
            
            {ingredients.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <ChefHat className="w-4 h-4 mr-2" />
                <span>{ingredients.length} ingredientes disponibles</span>
              </div>
            )}
          </div>

          <Button
            onClick={handleGenerateRecipes}
            loading={loading}
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {ingredients.length === 0 ? 'Agregar Ingredientes' : 'Generar Recetas'}
          </Button>
        </div>
      </Card>

      {ingredients.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No tienes ingredientes agregados
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Para generar recetas personalizadas, primero necesitas agregar algunos ingredientes que tengas disponibles.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/ingredients')}
            className="text-lg px-8 py-4"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Agregar Ingredientes
          </Button>
        </motion.div>
      ) : recipes.length === 0 && !loading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Genera tus primeras recetas
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Tienes {ingredients.length} ingredientes listos. Haz clic en "Generar Recetas" para crear sugerencias personalizadas.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {recipes.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 mr-2">Filtrar por:</span>
              
              <button
                onClick={() => setSelectedMealType('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedMealType === 'all'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              
              {mealTypes.map(mealType => (
                <button
                  key={mealType}
                  onClick={() => setSelectedMealType(mealType)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedMealType === mealType
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getMealTypeLabel(mealType)}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <ChefHat className="w-16 h-16 text-emerald-600" />
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Generando recetas...
              </h2>
              <p className="text-gray-600">
                Creando deliciosas recetas con tus ingredientes disponibles.
              </p>
            </div>
          ) : (
            <RecipeList recipes={filteredRecipes} onToggleFavorite={toggleFavorite} />
          )}
        </div>
      )}
    </div>
  );
}