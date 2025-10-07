import { Ingredient, Recipe, Receipt } from '../types';

// URL base de la API - ajustar según tu entorno
const API_BASE_URL = 'http://localhost:3001/api';

// Cliente API para comunicación con servidor local
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Método de petición genérico
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Petición API falló: ${response.statusText}`);
    }

    return response.json();
  }

  // Operaciones de ingredientes
  async getIngredients(userId: string = 'local-user'): Promise<Ingredient[]> {
    const ingredients = await this.request<any[]>(`/ingredients/${userId}`);
    return ingredients.map(ingredient => ({
      id: ingredient.id,
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      expiryDate: ingredient.expiryDate ? new Date(ingredient.expiryDate) : undefined,
    }));
  }

  async addIngredient(ingredient: Omit<Ingredient, 'id'>, userId: string = 'local-user'): Promise<Ingredient> {
    return this.request<Ingredient>('/ingredients', {
      method: 'POST',
      body: JSON.stringify({ ...ingredient, userId }),
    });
  }

  async updateIngredient(id: string, ingredient: Partial<Ingredient>): Promise<Ingredient> {
    return this.request<Ingredient>(`/ingredients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ingredient),
    });
  }

  async deleteIngredient(id: string): Promise<void> {
    return this.request(`/ingredients/${id}`, { method: 'DELETE' });
  }

  async clearAllIngredients(): Promise<void> {
    return this.request('/ingredients', { method: 'DELETE' });
  }

  // Operaciones de recetas
  async generateRecipes(ingredients: Ingredient[]): Promise<Recipe[]> {
    return this.request<Recipe[]>('/recipes/generate', {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
    });
  }

  // Operaciones de facturas
  async uploadReceipt(file: File): Promise<{ extractedIngredients: string[] }> {
    const formData = new FormData();
    formData.append('receipt', file);

    const response = await fetch(`${this.baseUrl}/receipts/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// Exportar instancia singleton
export const apiClient = new ApiClient();