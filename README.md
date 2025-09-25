# RecipeAI - Generador Inteligente de Recetas

Una aplicación web completa que genera recetas personalizadas basadas en los ingredientes disponibles, utilizando inteligencia artificial y tecnología OCR para una experiencia culinaria inteligente.

![RecipeAI Screenshot](https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)

## 🌟 Características

### ✨ Funcionalidades Principales

- **Gestión Inteligente de Ingredientes**: Agregar ingredientes manualmente con autocompletado inteligente
- **Categorización Automática**: Organización automática por categorías (lácteos, carnes, verduras, etc.)
- **Generación de Recetas con IA**: Recetas personalizadas basadas en ingredientes disponibles y momento del día
- **Extracción OCR de Facturas**: Procesamiento automático de facturas PDF/imagen para extraer ingredientes
- **Aplicación Web Progresiva (PWA)**: Funciona offline y se puede instalar como app nativa
- **Sincronización en la Nube**: Datos sincronizados entre dispositivos con Supabase
- **Interfaz Responsiva**: Optimizada para móvil, tablet y escritorio

### 🎨 Diseño y Experiencia

- **Diseño Moderno**: Interfaz limpia con gradientes y micro-interacciones
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Tema de Colores Premium**: Paleta emerald, orange y purple con excelente contraste
- **Tipografía Optimizada**: Jerarquía clara con espaciado 150% para legibilidad
- **Sistema de Componentes**: UI consistente con componentes reutilizables

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (opcional para sincronización)

### Instalación Local

```bash
# Clonar el repositorio
git clone [repository-url]
cd recipe-ai

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Configuración de Base de Datos (Opcional)

Para sincronización entre dispositivos, configura Supabase:

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia las credenciales y crea un archivo `.env`:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. Configura las tablas ejecutando las migraciones SQL en Supabase:

```sql
-- Tabla de ingredientes
CREATE TABLE ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity TEXT,
  unit TEXT,
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de recetas
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time INTEGER NOT NULL,
  cook_time INTEGER NOT NULL,
  servings INTEGER NOT NULL,
  difficulty TEXT NOT NULL,
  meal_type TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can manage own ingredients" ON ingredients
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own recipes" ON recipes
  FOR ALL USING (auth.uid() = user_id);
```

## 📱 Instalación como PWA

### En Móvil (Android/iOS)
1. Abre la aplicación en tu navegador
2. Toca el menú del navegador (⋮ o ⋯)
3. Selecciona "Agregar a pantalla de inicio" o "Instalar app"

### En Escritorio (Chrome/Edge)
1. Visita la aplicación
2. Busca el ícono de instalación en la barra de direcciones
3. Haz clic en "Instalar RecipeAI"

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con hot reload

# Producción  
npm run build        # Build para producción
npm run preview      # Preview del build de producción

# Calidad de código
npm run lint         # Ejecutar ESLint
```

## 📋 Flujo de Uso

### 1. **Agregar Ingredientes**
- **Manual**: Usa el formulario con autocompletado inteligente
- **Facturas**: Sube PDF/imágenes y confirma ingredientes extraídos por OCR

### 2. **Categorización**
- Los ingredientes se categorizan automáticamente
- Filtra por categorías para mejor organización

### 3. **Generar Recetas**
- La IA crea recetas basadas en tus ingredientes
- Las sugerencias cambian según la hora del día (desayuno, almuerzo, cena, snack)

### 4. **Gestionar Recetas**
- Marca recetas como favoritas
- Filtra por tipo de comida y dificultad
- Sigue instrucciones paso a paso

## 🏗️ Arquitectura Técnica

### Frontend
- **React 18** con TypeScript para type safety
- **Vite** como bundler y dev server
- **Tailwind CSS** para styling utilitario
- **Framer Motion** para animaciones fluidas
- **React Router** para navegación SPA
- **React Hook Form** con Zod para validación

### Backend y Datos
- **Supabase** para base de datos PostgreSQL y autenticación
- **LocalStorage** como fallback para usuarios no autenticados
- **PWA** con Service Worker para funcionalidad offline

### Componentes Clave
```
src/
├── components/
│   ├── ui/             # Componentes base (Button, Card, Input)
│   ├── Layout/         # Navegación y layout principal  
│   ├── Ingredients/    # Gestión de ingredientes
│   └── Recipes/        # Visualización de recetas
├── hooks/              # Custom hooks para lógica de estado
├── pages/              # Páginas principales de la aplicación
├── types/              # Definiciones TypeScript
├── utils/              # Utilidades y helpers
└── lib/                # Configuración de servicios externos
```

## 🔒 Seguridad y Privacidad

- **Row Level Security (RLS)** en Supabase para protección de datos
- **Autenticación sin contraseña** con enlaces mágicos
- **Almacenamiento local** como fallback sin comprometer privacidad
- **HTTPS obligatorio** para todas las comunicaciones

## 🌍 Tecnologías del Futuro

### Próximas Funcionalidades
- **Reconocimiento de imágenes** para ingredientes por foto
- **Integración con APIs de nutrición** para información nutricional
- **Planificador de comidas** semanal
- **Lista de compras inteligente** basada en recetas
- **Sharing social** de recetas favoritas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

¿Tienes problemas o preguntas? 
- 📧 Email: soporte@recipeai.com
- 💬 Discord: [RecipeAI Community](https://discord.gg/recipeai)
- 📖 Wiki: [Documentación completa](https://github.com/recipeai/wiki)

---

**¡Transforma tus ingredientes en experiencias culinarias increíbles con RecipeAI!** 🍳✨