export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  quantity?: string;
  unit?: string;
  addedAt: Date;
  source: 'manual' | 'receipt';
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  mealType: MealType;
  tags: string[];
  isFavorite?: boolean;
}

export interface Receipt {
  id: string;
  filename: string;
  uploadedAt: Date;
  extractedIngredients: string[];
  processedAt?: Date;
  status: 'pending' | 'processed' | 'error';
}

export type IngredientCategory = 
  | 'dairy'
  | 'meat'
  | 'vegetables'
  | 'fruits' 
  | 'grains'
  | 'spices'
  | 'seafood'
  | 'legumes'
  | 'oils'
  | 'other';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface User {
  id: string;
  email: string;
  created_at: Date;
}