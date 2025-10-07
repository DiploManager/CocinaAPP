const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const { v4: uuidv4 } = require('uuid');

// Importar operaciones de base de datos
const { dbOperations } = require('./database');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Crear directorio de uploads si no existe
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configurar multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Función de categorización de ingredientes
function categorizeIngredient(name) {
  const normalized = name.toLowerCase().trim();
  
  const categories = {
    vegetables: ['tomate', 'cebolla', 'ajo', 'zanahoria', 'apio', 'pimiento', 'lechuga', 'espinaca'],
    fruits: ['manzana', 'plátano', 'naranja', 'limón', 'fresa', 'uva', 'pera', 'melocotón'],
    proteins: ['pollo', 'carne', 'pescado', 'huevo', 'jamón', 'atún', 'salmón', 'cerdo'],
    dairy: ['leche', 'queso', 'yogur', 'mantequilla', 'nata', 'crema'],
    grains: ['arroz', 'pasta', 'pan', 'harina', 'avena', 'quinoa'],
    spices: ['sal', 'pimienta', 'orégano', 'albahaca', 'perejil', 'cilantro']
  };
  
  for (const [category, items] of Object.entries(categories)) {
    if (items.some(item => normalized.includes(item))) {
      return category;
    }
  }
  
  return 'other';
}

// Algoritmo de generación de recetas
function generateRecipes(ingredients) {
  const currentHour = new Date().getHours();
  let mealType = 'snack';
  
  if (currentHour >= 6 && currentHour < 11) mealType = 'breakfast';
  else if (currentHour >= 11 && currentHour < 16) mealType = 'lunch';
  else if (currentHour >= 16 && currentHour < 22) mealType = 'dinner';
  
  const recipes = [
    {
      id: 1,
      name: 'Ensalada Mediterránea',
      ingredients: ['tomate', 'cebolla', 'aceite', 'sal'],
      instructions: ['Cortar tomates y cebolla', 'Mezclar con aceite y sal', 'Servir fresco'],
      cookingTime: 10,
      difficulty: 'easy',
      mealType: 'lunch'
    },
    {
      id: 2,
      name: 'Pasta con Ajo',
      ingredients: ['pasta', 'ajo', 'aceite', 'sal'],
      instructions: ['Hervir pasta', 'Freír ajo en aceite', 'Mezclar y servir'],
      cookingTime: 15,
      difficulty: 'easy',
      mealType: 'dinner'
    }
  ];
  
  const availableIngredients = ingredients.map(ing => ing.name.toLowerCase());
  const matchingRecipes = recipes.filter(recipe => 
    recipe.ingredients.some(ingredient => 
      availableIngredients.some(available => available.includes(ingredient))
    )
  );
  
  return matchingRecipes.slice(0, 3);
}

// Función de procesamiento OCR
async function processReceiptOCR(imagePath) {
  try {
    console.log('Procesando OCR para:', imagePath);
    
    const { data: { text } } = await Tesseract.recognize(imagePath, 'spa', {
      logger: m => console.log(m)
    });
    
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const extractedIngredients = [];
    
    lines.forEach(line => {
      const cleanLine = line.trim();
      if (cleanLine.length > 2 && !cleanLine.match(/^\d+[.,]\d+$/)) {
        const quantityMatch = cleanLine.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|g|l|ml|unid|u)?/i);
        const quantity = quantityMatch ? parseFloat(quantityMatch[1].replace(',', '.')) : 1;
        const name = cleanLine.replace(/\d+(?:[.,]\d+)?\s*(?:kg|g|l|ml|unid|u)?\s*/gi, '').trim();
        
        if (name.length > 1) {
          extractedIngredients.push({
            name,
            quantity,
            unit: 'unidad',
            category: categorizeIngredient(name)
          });
        }
      }
    });
    
    return extractedIngredients;
  } catch (error) {
    console.error('Error en procesamiento OCR:', error);
    throw error;
  }
}

// Rutas de API

// Obtener todos los ingredientes de un usuario
app.get('/api/ingredients/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const ingredients = dbOperations.getIngredients(userId);
    res.json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

// Agregar nuevo ingrediente
app.post('/api/ingredients', (req, res) => {
  try {
    const { name, quantity, unit, source = 'manual' } = req.body;
    const userId = 'local-user'; // Para pruebas locales
    
    const ingredient = {
      id: uuidv4(),
      name,
      quantity,
      unit,
      category: categorizeIngredient(name),
      source,
      userId,
      createdAt: new Date().toISOString()
    };
    
    dbOperations.addIngredient(ingredient);
    res.json(ingredient);
  } catch (error) {
    console.error('Error adding ingredient:', error);
    res.status(500).json({ error: 'Failed to add ingredient' });
  }
});

// Eliminar ingrediente
app.delete('/api/ingredients/:id', (req, res) => {
  try {
    const { id } = req.params;
    dbOperations.deleteIngredient(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    res.status(500).json({ error: 'Failed to delete ingredient' });
  }
});

// Limpiar todos los ingredientes
app.delete('/api/ingredients', (req, res) => {
  try {
    const userId = 'local-user'; // Para pruebas locales
    dbOperations.clearIngredients(userId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error clearing ingredients:', error);
    res.status(500).json({ error: 'Failed to clear ingredients' });
  }
});

// Generar recetas
app.post('/api/recipes/generate', (req, res) => {
  try {
    const { ingredients } = req.body;
    const recipes = generateRecipes(ingredients);
    res.json(recipes);
  } catch (error) {
    console.error('Error generating recipes:', error);
    res.status(500).json({ error: 'Failed to generate recipes' });
  }
});

// Alternar receta favorita
app.patch('/api/recipes/:id/favorite', (req, res) => {
  try {
    const { id } = req.params;
    const { isFavorite } = req.body;
    
    // Aquí implementarías la lógica para guardar favoritos
    res.json({ success: true, id, isFavorite });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
});

// Subir y procesar factura
app.post('/api/receipts/upload', upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Archivo subido:', req.file.filename);
    
    // Procesar OCR
    const extractedIngredients = await processReceiptOCR(req.file.path);
    
    // Guardar factura en base de datos
    const receipt = {
      id: uuidv4(),
      userId: 'local-user', // Para pruebas locales
      filename: req.file.filename,
      extractedIngredients,
      status: 'processed'
    };
    
    dbOperations.saveReceipt(receipt);
    
    res.json({
      success: true,
      receipt,
      extractedIngredients
    });
  } catch (error) {
    console.error('Error processing receipt:', error);
    res.status(500).json({ error: 'Failed to process receipt' });
  }
});

// Endpoint de verificación de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API de RecipeAI funcionando',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor API de RecipeAI ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: SQLite (recipes.db)`);
  console.log(`📁 Directorio de uploads: ${uploadsDir}`);
});