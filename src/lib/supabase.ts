// import { createClient } from '@supabase/supabase-js';

// Commented out for local testing - uncomment when Supabase is configured
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// export const supabase = createClient(supabaseUrl, supabaseKey);

// Mock Supabase client for local testing
export const supabase = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithOtp: () => Promise.resolve({ error: null }),
    signOut: () => Promise.resolve({ error: null })
  },
  from: () => ({
    select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
    insert: () => Promise.resolve({ error: null }),
    delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
    upsert: () => Promise.resolve({ error: null })
  })
};

export type Database = {
  public: {
    Tables: {
      ingredients: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category: string;
          quantity: string | null;
          unit: string | null;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          category: string;
          quantity?: string | null;
          unit?: string | null;
          source: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          category?: string;
          quantity?: string | null;
          unit?: string | null;
          source?: string;
          created_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          ingredients: string[];
          instructions: string[];
          prep_time: number;
          cook_time: number;
          servings: number;
          difficulty: string;
          meal_type: string;
          tags: string[];
          is_favorite: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description: string;
          ingredients: string[];
          instructions: string[];
          prep_time: number;
          cook_time: number;
          servings: number;
          difficulty: string;
          meal_type: string;
          tags: string[];
          is_favorite?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string;
          ingredients?: string[];
          instructions?: string[];
          prep_time?: number;
          cook_time?: number;
          servings?: number;
          difficulty?: string;
          meal_type?: string;
          tags?: string[];
          is_favorite?: boolean;
          created_at?: string;
        };
      };
    };
  };
};