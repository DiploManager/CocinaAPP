import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ListFilter as Filter, Search, Clock } from 'lucide-react';
import { Ingredient, IngredientCategory } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { categoryLabels, categoryColors } from '../../utils/categories';

interface IngredientListProps {
  ingredients: Ingredient[];
  onRemove: (id: string) => Promise<void>;
  onClear: () => Promise<void>;
  loading?: boolean;
}

export function IngredientList({ ingredients, onRemove, onClear, loading }: IngredientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IngredientCategory | 'all'>('all');

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(ingredients.map(i => i.category))) as IngredientCategory[];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 text-emerald-600 mr-2" />
          Mis Ingredientes ({ingredients.length})
        </h2>
        {ingredients.length > 0 && (
          <Button
            onClick={onClear}
            variant="outline"
            size="sm"
            loading={loading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpiar todo
          </Button>
        )}
      </div>

      {ingredients.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay ingredientes</h3>
          <p className="text-gray-500">Comienza agregando algunos ingredientes para generar recetas.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar ingredientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? categoryColors[category]
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid gap-3">
              {filteredIngredients.map((ingredient) => (
                <motion.div
                  key={ingredient.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Badge className={categoryColors[ingredient.category]}>
                      {categoryLabels[ingredient.category]}
                    </Badge>
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {ingredient.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        {(ingredient.quantity || ingredient.unit) && (
                          <span>
                            {ingredient.quantity} {ingredient.unit}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {ingredient.addedAt.toLocaleDateString()}
                        </span>
                        <Badge 
                          variant={ingredient.source === 'manual' ? 'default' : 'secondary'}
                        >
                          {ingredient.source === 'manual' ? 'Manual' : 'Factura'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => onRemove(ingredient.id)}
                    variant="ghost"
                    size="sm"
                    loading={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredIngredients.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron ingredientes que coincidan con "{searchTerm}"</p>
            </div>
          )}
        </>
      )}
    </Card>
  );
}