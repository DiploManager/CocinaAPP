import { Recipe, Ingredient, MealType } from '../types';

export function getCurrentMealType(): MealType {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  if (hour >= 16 && hour < 21) return 'dinner';
  return 'snack';
}

export function getMealTypeLabel(mealType: MealType): string {
  const labels = {
    breakfast: 'Desayuno',
    lunch: 'Almuerzo',
    dinner: 'Cena',
    snack: 'Merienda'
  };
  return labels[mealType];
}

export async function generateRecipesFromIngredients(ingredients: Ingredient[]): Promise<Recipe[]> {
  // Generación de recetas de IA simulada: en producción, esto se llamaría API de IA
  const mealType = getCurrentMealType();
  const availableIngredients = ingredients.map(i => i.name);
  
  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Pasta con Vegetales Frescos',
      description: 'Una deliciosa pasta con vegetales de temporada, perfecta para cualquier momento del día',
      ingredients: ['pasta', 'tomate', 'cebolla', 'pimientos', 'aceite de oliva', 'ajo'],
      instructions: [
        'Cocinar la pasta según las instrucciones del paquete',
        'Calentar aceite de oliva en una sartén grande',
        'Saltear la cebolla y el ajo hasta que estén dorados',
        'Agregar los pimientos y tomates, cocinar por 5 minutos',
        'Mezclar con la pasta cocida y servir caliente'
      ],
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'easy',
      mealType,
      tags: ['vegetariano', 'mediterráneo', 'fácil']
    },
    {
      id: '2',
      name: 'Ensalada de Pollo con Aguacate',
      description: 'Ensalada nutritiva y sabrosa con pollo a la plancha y aguacate fresco',
      ingredients: ['pollo', 'lechuga', 'tomate', 'aguacate', 'aceite de oliva', 'limón'],
      instructions: [
        'Cocinar el pollo a la plancha hasta que esté bien cocido',
        'Cortar el pollo en tiras delgadas',
        'Mezclar la lechuga, tomate y aguacate en un bowl',
        'Agregar el pollo encima',
        'Aliñar con aceite de oliva y jugo de limón'
      ],
      prepTime: 15,
      cookTime: 10,
      servings: 2,
      difficulty: 'easy',
      mealType,
      tags: ['saludable', 'proteína', 'fresco']
    },
    {
      id: '3',
      name: 'Arroz con Verduras al Curry',
      description: 'Plato aromático con arroz basmati y verduras en salsa de curry',
      ingredients: ['arroz', 'zanahoria', 'pimientos', 'cebolla', 'curry', 'leche de coco'],
      instructions: [
        'Cocinar el arroz según instrucciones',
        'En una sartén, saltear la cebolla hasta dorar',
        'Agregar zanahorias y pimientos, cocinar 5 minutos',
        'Añadir curry en polvo y mezclar bien',
        'Incorporar leche de coco y cocinar 10 minutos más',
        'Servir sobre el arroz cocido'
      ],
      prepTime: 15,
      cookTime: 25,
      servings: 3,
      difficulty: 'medium',
      mealType,
      tags: ['vegano', 'especiado', 'nutritivo']
    }
  ];

  // Filtrar recetas según los ingredientes disponibles.
  return recipes.filter(recipe => {
    const matchingIngredients = recipe.ingredients.filter(ingredient => 
      availableIngredients.some(available => 
        available.toLowerCase().includes(ingredient.toLowerCase()) ||
        ingredient.toLowerCase().includes(available.toLowerCase())
      )
    );
    return matchingIngredients.length >= Math.floor(recipe.ingredients.length * 0.4);
  });
}