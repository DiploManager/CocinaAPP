import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { categoryLabels, categoryColors, ingredientSuggestions, IngredientCategory } from '../../utils/categories';

interface IngredientFormProps {
  onAdd: (name: string, quantity?: string, unit?: string) => Promise<void>;
  loading?: boolean;
}

export function IngredientForm({ onAdd, loading }: IngredientFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await onAdd(name.trim(), quantity || undefined, unit || undefined);
      setName('');
      setQuantity('');
      setUnit('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion);
    setShowSuggestions(false);
  };

  const getSuggestions = () => {
    if (!name.trim()) return [];
    const query = name.toLowerCase();
    const suggestions: string[] = [];
    
    Object.values(ingredientSuggestions).forEach(categoryItems => {
      categoryItems.forEach(item => {
        if (item.toLowerCase().includes(query) && !suggestions.includes(item)) {
          suggestions.push(item);
        }
      });
    });
    
    return suggestions.slice(0, 6);
  };

  const suggestions = getSuggestions();

  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <Plus className="w-5 h-5 text-emerald-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Agregar Ingrediente</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            label="Nombre del ingrediente"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            placeholder="Ej: tomate, pollo, arroz..."
            required
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Cantidad (opcional)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="2"
          />
          <Input
            label="Unidad (opcional)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="kg, piezas, tazas..."
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Ingrediente
        </Button>
      </form>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Sparkles className="w-4 h-4 mr-1" />
          Sugerencias por categoría
        </h3>
        <div className="space-y-3">
          {Object.entries(ingredientSuggestions).slice(0, 4).map(([category, items]) => (
            <div key={category}>
              <Badge className={`mb-2 ${categoryColors[category as IngredientCategory]}`}>
                {categoryLabels[category as IngredientCategory]}
              </Badge>
              <div className="flex flex-wrap gap-1">
                {items.slice(0, 5).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSuggestionClick(item)}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-150"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}