import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useIngredients } from '../hooks/useIngredients';
import { IngredientForm } from '../components/Ingredients/IngredientForm';
import { IngredientList } from '../components/Ingredients/IngredientList';
import { Button } from '../components/ui/Button';

export function Ingredients() {
  const navigate = useNavigate();
  const { ingredients, addIngredient, removeIngredient, clearIngredients, loading } = useIngredients();

  const handleAddIngredient = async (name: string, quantity?: string, unit?: string) => {
    try {
      await addIngredient(name, quantity, unit);
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Gestión de Ingredientes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Agrega los ingredientes que tienes disponibles y organízalos automáticamente por categorías.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <IngredientForm onAdd={handleAddIngredient} loading={loading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <IngredientList 
            ingredients={ingredients}
            onRemove={removeIngredient}
            onClear={clearIngredients}
            loading={loading}
          />
        </motion.div>
      </div>

      {ingredients.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl p-8 border border-emerald-100"
        >
          <Sparkles className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            ¡Genial! Tienes {ingredients.length} ingredientes
          </h2>
          <p className="text-gray-600 mb-6">
            Ya puedes generar recetas personalizadas con los ingredientes que tienes disponibles.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/recipes')}
            className="text-lg px-8 py-4"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generar Recetas
          </Button>
        </motion.div>
      )}
    </div>
  );
}