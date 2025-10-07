# RecipeAI - Generador Inteligente de Recetas

Una aplicación web completa que genera recetas personalizadas basadas en los ingredientes disponibles, utilizando inteligencia artificial, tecnología OCR y base de datos local para una experiencia culinaria inteligente y completamente funcional.

![RecipeAI Screenshot](https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)

## 🌟 Características Principales

### ✨ Funcionalidades Completas

- **🥗 Gestión Inteligente de Ingredientes**: Agregar ingredientes manualmente con autocompletado inteligente
- **📂 Categorización Automática**: Organización automática por categorías (lácteos, carnes, verduras, etc.)
- **🤖 Generación de Recetas con IA**: Recetas personalizadas basadas en ingredientes disponibles y momento del día
- **📄 Extracción OCR de Facturas**: Procesamiento automático de facturas PDF/imagen para extraer ingredientes
- **💾 Base de Datos Local**: SQLite integrado para almacenamiento completo sin dependencias externas
- **📱 Aplicación Web Progresiva (PWA)**: Funciona offline y se puede instalar como app nativa
- **🎨 Interfaz Responsiva**: Optimizada para móvil, tablet y escritorio

### 🎨 Diseño y Experiencia

- **🌈 Diseño Moderno**: Interfaz limpia con gradientes emerald, orange y purple
- **✨ Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **📝 Tipografía Optimizada**: Jerarquía clara con espaciado 150% para legibilidad
- **🧩 Sistema de Componentes**: UI consistente con componentes reutilizables
- **🔍 Filtros Avanzados**: Búsqueda y filtrado por categorías de ingredientes

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js 18+** 
- **npm** o **yarn**
- **Sistema operativo**: Windows, macOS, o Linux

### 📦 Instalación Completa

```bash
# 1. Clonar el repositorio
git clone [repository-url]
cd recipe-ai

# 2. Instalar todas las dependencias
npm install

# 3. Ejecutar la aplicación completa (API + Frontend)
npm run dev:full
```

### 🌐 Acceso a la Aplicación

Una vez ejecutado `npm run dev:full`, la aplicación estará disponible en:

- **🖥️ Frontend (Interfaz de Usuario)**: http://localhost:5173
- **⚙️ API Server (Base de Datos)**: http://localhost:3001
- **📊 Base de Datos**: `recipes.db` (SQLite, creada automáticamente)

## 📋 Scripts Disponibles

```bash
# 🚀 RECOMENDADO: Ejecutar aplicación completa
npm run dev:full          # Inicia API server + Frontend simultáneamente

# 🔧 Scripts individuales
npm run server            # Solo API server (puerto 3001)
npm run dev              # Solo frontend (puerto 5173)

# 📦 Producción
npm run build            # Build para producción
npm run preview          # Preview del build de producción

# 🧹 Calidad de código
npm run lint             # Ejecutar ESLint
```

## 🏗️ Arquitectura Técnica Completa

### 🖥️ Frontend (Puerto 5173)
- **React 18** con TypeScript para type safety completo
- **Vite** como bundler y dev server ultrarrápido
- **Tailwind CSS** para styling utilitario y responsive
- **Framer Motion** para animaciones fluidas y micro-interacciones
- **React Router** para navegación SPA sin recargas
- **React Hook Form** con Zod para validación robusta

### 🔧 Backend API (Puerto 3001)
- **Express.js** servidor API RESTful completo
- **SQLite + better-sqlite3** base de datos local de alto rendimiento
- **Tesseract.js** procesamiento OCR real para facturas
- **Multer** manejo de subida de archivos
- **CORS** configurado para desarrollo local

### 💾 Base de Datos (SQLite)
```sql
-- Esquema completo de la base de datos
users (id, email, created_at)
ingredients (id, user_id, name, category, quantity, unit, source, created_at)
recipes (id, user_id, name, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, meal_type, tags, is_favorite, created_at)
receipts (id, user_id, filename, extracted_ingredients, status, created_at)
```

### 📁 Estructura de Archivos
```
recipe-ai/
├── 📂 server/                 # API Backend
│   ├── database.js           # Configuración SQLite + esquemas
│   └── api.js               # Rutas API + lógica de negocio
├── 📂 src/                   # Frontend React
│   ├── 📂 components/        # Componentes reutilizables
│   │   ├── 📂 ui/           # Componentes base (Button, Card, Input)
│   │   ├── 📂 Layout/       # Navegación y layout principal
│   │   ├── 📂 Ingredients/  # Gestión de ingredientes
│   │   └── 📂 Recipes/      # Visualización de recetas
│   ├── 📂 hooks/            # Custom hooks para lógica de estado
│   ├── 📂 pages/            # Páginas principales de la aplicación
│   ├── 📂 types/            # Definiciones TypeScript
│   ├── 📂 utils/            # Utilidades y helpers
│   └── 📂 lib/              # Configuración de servicios (API client)
├── 📂 uploads/               # Archivos subidos (facturas)
├── 📄 recipes.db            # Base de datos SQLite (auto-generada)
└── 📄 package.json          # Dependencias y scripts
```

## 🔄 Flujo de Uso Completo

### 1. **🥗 Gestión de Ingredientes**
```
Inicio → Ingredientes → Agregar manualmente o subir factura
↓
Categorización automática → Almacenamiento en SQLite
↓
Lista organizada con filtros y búsqueda
```

### 2. **📄 Procesamiento de Facturas (OCR Real)**
```
Subir PDF/Imagen → Tesseract.js OCR → Extracción de texto
↓
Algoritmo de parsing → Identificación de ingredientes
↓
Confirmación manual → Guardado en base de datos
```

### 3. **🤖 Generación Inteligente de Recetas**
```
Ingredientes disponibles + Hora del día → Algoritmo IA local
↓
Generación de recetas contextuales → Almacenamiento
↓
Visualización con filtros → Marcar favoritas
```

### 4. **📱 Experiencia PWA**
```
Navegador → Instalar como app → Funcionalidad offline
↓
Datos locales persistentes → Sincronización automática
```

## 🛠️ Funcionalidades Técnicas Avanzadas

### 🔍 **OCR Real con Tesseract.js**
- Procesamiento de imágenes JPG, PNG y PDF
- Reconocimiento de texto en español
- Algoritmo de parsing inteligente para identificar ingredientes
- Manejo de errores y validación de archivos

### 🤖 **Algoritmo de Generación de Recetas**
- Análisis de ingredientes disponibles por categoría
- Contextualización por momento del día (desayuno, almuerzo, cena, snack)
- Generación de recetas completas con:
  - Nombre descriptivo
  - Lista de ingredientes necesarios
  - Instrucciones paso a paso
  - Tiempos de preparación y cocción
  - Nivel de dificultad
  - Número de porciones

### 📊 **Base de Datos SQLite Optimizada**
- Esquema relacional completo con claves foráneas
- Índices optimizados para consultas rápidas
- Transacciones ACID para integridad de datos
- Respaldo automático y recuperación de errores

### 🎨 **Sistema de Diseño Avanzado**
- Paleta de colores profesional (emerald, orange, purple)
- Sistema de espaciado consistente (8px grid)
- Tipografía jerárquica con 3 pesos máximo
- Animaciones con propósito y feedback visual
- Responsive design con breakpoints optimizados

## 🚀 Instrucciones de Ejecución Paso a Paso

### ✅ **Método Recomendado (Todo en Uno)**

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Ejecutar aplicación completa
npm run dev:full

# 3. Abrir navegador en http://localhost:5173
# ¡Listo para usar! 🎉
```

### 🔧 **Método Manual (Desarrollo Avanzado)**

```bash
# Terminal 1: API Server
npm run server

# Terminal 2: Frontend (en otra terminal)
npm run dev

# Verificar funcionamiento:
# - API: http://localhost:3001/api/health
# - Frontend: http://localhost:5173
```

### 🐛 **Solución de Problemas Comunes**

```bash
# Si hay errores de dependencias:
rm -rf node_modules package-lock.json
npm install

# Si el puerto está ocupado:
# Cambiar puerto en package.json o cerrar otras aplicaciones

# Si la base de datos no se crea:
# Verificar permisos de escritura en el directorio del proyecto
```

## 📱 Instalación como PWA

### 📱 **En Móvil (Android/iOS)**
1. Abrir la aplicación en el navegador
2. Tocar el menú del navegador (⋮ o ⋯)
3. Seleccionar "Agregar a pantalla de inicio" o "Instalar app"
4. ¡Usar como aplicación nativa!

### 🖥️ **En Escritorio (Chrome/Edge)**
1. Visitar http://localhost:5173
2. Buscar el ícono de instalación en la barra de direcciones
3. Hacer clic en "Instalar RecipeAI"
4. ¡Aplicación de escritorio lista!

## 🔒 Seguridad y Privacidad

- **🏠 Datos Locales**: Todo se almacena en tu dispositivo (SQLite)
- **🔐 Sin Registro**: No requiere cuentas ni datos personales
- **🛡️ Validación Robusta**: Validación de archivos y datos de entrada
- **🚫 Sin Tracking**: Cero seguimiento o analytics externos

## 🌟 Características Únicas

### 🎯 **Inteligencia Contextual**
- Sugerencias de recetas basadas en la hora del día
- Categorización automática de ingredientes
- Algoritmo de matching inteligente ingrediente-receta

### ⚡ **Rendimiento Optimizado**
- Base de datos SQLite ultrarrápida
- Componentes React optimizados con lazy loading
- Imágenes optimizadas y caching inteligente

### 🎨 **Experiencia de Usuario Premium**
- Animaciones fluidas sin impacto en rendimiento
- Feedback visual inmediato en todas las acciones
- Diseño responsive que se adapta a cualquier pantalla

## 🤝 Contribución y Desarrollo

### 🔧 **Configuración de Desarrollo**
```bash
# Clonar y configurar
git clone [repository-url]
cd recipe-ai
npm install

# Desarrollo con hot reload
npm run dev:full

# Testing y linting
npm run lint
```

### 📝 **Estructura de Commits**
```
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de estilo/formato
refactor: refactorización de código
test: agregar o modificar tests
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte y Ayuda

### 🚨 **Problemas Comunes**

**❌ Error: "Puerto 3001 ya está en uso"**
```bash
# Solución: Cambiar puerto o cerrar aplicación que lo usa
lsof -ti:3001 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3001   # Windows
```

**❌ Error: "Cannot find module 'better-sqlite3'"**
```bash
# Solución: Reinstalar dependencias
npm install
```

**❌ Error: "OCR no funciona"**
```bash
# Verificar que los archivos sean imágenes válidas (JPG, PNG)
# Tamaño máximo: 10MB
```

### 📞 **Contacto**
- 📧 Email: soporte@recipeai.com
- 💬 Discord: [RecipeAI Community]()
- 📖 Wiki: [Documentación completa](https://github.com/recipeai/wiki)

---

**¡Transforma tus ingredientes en experiencias culinarias increíbles con RecipeAI!** 🍳✨

### 🎯 **Resumen de Comandos Esenciales**

```bash
# 🚀 INICIO RÁPIDO (Recomendado)
npm install && npm run dev:full

# 🌐 Acceder a la aplicación
# Frontend: http://localhost:5173
# API: http://localhost:3001

# 📱 ¡Listo para cocinar! 🍳
```