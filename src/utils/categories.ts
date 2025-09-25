import { IngredientCategory } from '../types';

export const categoryLabels: Record<IngredientCategory, string> = {
  dairy: 'Lácteos',
  meat: 'Carnes',
  vegetables: 'Verduras',
  fruits: 'Frutas',
  grains: 'Granos',
  spices: 'Especias',
  seafood: 'Mariscos',
  legumes: 'Legumbres',
  oils: 'Aceites',
  other: 'Otros'
};

export const categoryColors: Record<IngredientCategory, string> = {
  dairy: 'bg-blue-100 text-blue-800',
  meat: 'bg-red-100 text-red-800',
  vegetables: 'bg-green-100 text-green-800',
  fruits: 'bg-yellow-100 text-yellow-800',
  grains: 'bg-amber-100 text-amber-800',
  spices: 'bg-orange-100 text-orange-800',
  seafood: 'bg-cyan-100 text-cyan-800',
  legumes: 'bg-lime-100 text-lime-800',
  oils: 'bg-yellow-100 text-yellow-800',
  other: 'bg-gray-100 text-gray-800'
};

export const ingredientSuggestions: Record<IngredientCategory, string[]> = {
  dairy: ['leche', 'queso', 'yogur', 'mantequilla', 'crema'],
  meat: ['pollo', 'carne de res', 'cerdo', 'pavo', 'jamón'],
  vegetables: ['cebolla', 'tomate', 'zanahoria', 'pimientos', 'ajo'],
  fruits: ['manzana', 'plátano', 'naranja', 'limón', 'fresas'],
  grains: ['arroz', 'pasta', 'pan', 'quinoa', 'avena'],
  spices: ['sal', 'pimienta', 'orégano', 'comino', 'paprika'],
  seafood: ['salmón', 'camarones', 'atún', 'bacalao', 'mejillones'],
  legumes: ['frijoles', 'lentejas', 'garbanzos', 'guisantes', 'habas'],
  oils: ['aceite de oliva', 'aceite vegetal', 'mantequilla', 'aceite de coco'],
  other: ['huevos', 'vinagre', 'azúcar', 'harina', 'levadura']
};

export function categorizeIngredient(ingredientName: string): IngredientCategory {
  const normalized = ingredientName.toLowerCase().trim();
  
  for (const [category, suggestions] of Object.entries(ingredientSuggestions)) {
    if (suggestions.some(suggestion => normalized.includes(suggestion) || suggestion.includes(normalized))) {
      return category as IngredientCategory;
    }
  }
  
  return 'other';
}