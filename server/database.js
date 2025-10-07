// Configuración de base de datos SQLite para pruebas locales
const Database = require('better-sqlite3');
const path = require('path');

// Crear conexión a la base de datos
const db = new Database(path.join(__dirname, '..', 'recipes.db'));

// Habilitar claves foráneas
db.pragma('foreign_keys = ON');

// Inicializar esquema de base de datos
function initializeDatabase() {
  // Tabla de usuarios
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de ingredientes
  db.exec(`
    CREATE TABLE IF NOT EXISTS ingredients (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT,
      quantity REAL,
      unit TEXT,
      source TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Tabla de recetas
  db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      ingredients TEXT,
      instructions TEXT,
      prep_time INTEGER,
      cook_time INTEGER,
      servings INTEGER,
      difficulty TEXT,
      meal_type TEXT,
      tags TEXT,
      is_favorite BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Tabla de facturas
  db.exec(`
    CREATE TABLE IF NOT EXISTS receipts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      filename TEXT NOT NULL,
      extracted_ingredients TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  console.log('Base de datos inicializada correctamente');
}

// Operaciones de base de datos
const dbOperations = {
  // Operaciones de usuario
  createUser: (id, email) => {
    const stmt = db.prepare('INSERT INTO users (id, email) VALUES (?, ?)');
    return stmt.run(id, email);
  },

  getUser: (id) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  },

  // Operaciones de ingredientes
  addIngredient: (ingredient) => {
    const stmt = db.prepare(`
      INSERT INTO ingredients (id, user_id, name, category, quantity, unit, source)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(ingredient.id, ingredient.user_id, ingredient.name, ingredient.category, ingredient.quantity, ingredient.unit, ingredient.source);
  },

  getUserIngredients: (userId) => {
    const stmt = db.prepare('SELECT * FROM ingredients WHERE user_id = ?');
    return stmt.all(userId);
  },

  // Operaciones de recetas
  addRecipe: (recipe) => {
    const stmt = db.prepare(`
      INSERT INTO recipes (id, user_id, name, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, meal_type, tags, is_favorite)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(recipe.id, recipe.user_id, recipe.name, recipe.description, recipe.ingredients, recipe.instructions, recipe.prep_time, recipe.cook_time, recipe.servings, recipe.difficulty, recipe.meal_type, recipe.tags, recipe.is_favorite);
  },

  getUserRecipes: (userId) => {
    const stmt = db.prepare('SELECT * FROM recipes WHERE user_id = ?');
    return stmt.all(userId);
  },

  updateRecipeFavorite: (recipeId, isFavorite) => {
    const stmt = db.prepare('UPDATE recipes SET is_favorite = ? WHERE id = ?');
    return stmt.run(recipeId, isFavorite);
  },

  // Operaciones de facturas
  addReceipt: (receipt) => {
    const stmt = db.prepare(`
      INSERT INTO receipts (id, user_id, filename, extracted_ingredients, status)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(receipt.id, receipt.user_id, receipt.filename, receipt.extracted_ingredients, receipt.status);
  },

  getUserReceipts: (userId) => {
    const stmt = db.prepare('SELECT * FROM receipts WHERE user_id = ?');
    return stmt.all(userId);
  }
};

// Inicializar base de datos al inicio
initializeDatabase();

module.exports = { db, dbOperations };