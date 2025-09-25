import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Utensils, BookOpen, Receipt, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Utensils,
      title: 'Gestión de Ingredientes',
      description: 'Agrega y organiza tus ingredientes manualmente o extráelos automáticamente de facturas.',
      action: () => navigate('/ingredients')
    },
    {
      icon: BookOpen,
      title: 'Recetas Inteligentes',
      description: 'Genera recetas personalizadas basadas en tus ingredientes disponibles y la hora del día.',
      action: () => navigate('/recipes')
    },
    {
      icon: Receipt,
      title: 'Extracción de Facturas',
      description: 'Sube facturas en PDF o imagen y extrae ingredientes automáticamente con OCR.',
      action: () => navigate('/receipts')
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <ChefHat className="w-20 h-20 text-emerald-600" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-orange-600 to-purple-600 bg-clip-text text-transparent">
          RecipeAI
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Generador inteligente de recetas basado en ingredientes disponibles. 
          Convierte lo que tienes en deliciosas comidas personalizadas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate('/ingredients')}
            className="text-lg px-8 py-4"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Comenzar Ahora
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/recipes')}
            className="text-lg px-8 py-4"
          >
            Ver Recetas
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card 
                hover 
                className="p-8 h-full cursor-pointer group"
                onClick={feature.action}
              >
                <div className="text-center space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:shadow-lg transition-shadow duration-300"
                  >
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-emerald-600 mx-auto" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl p-8 md:p-12"
      >
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ¿Cómo Funciona?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Agrega Ingredientes', desc: 'Manualmente o desde facturas' },
              { step: 2, title: 'Categorización', desc: 'Organiza automáticamente por tipo' },
              { step: 3, title: 'Genera Recetas', desc: 'IA crea recetas personalizadas' },
              { step: 4, title: 'Cocina y Disfruta', desc: 'Sigue las instrucciones paso a paso' }
            ].map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ y: -5 }}
                className="text-center space-y-3"
              >
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Lista para transformar tu cocina
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Comienza ahora y descubre nuevas recetas con los ingredientes que ya tienes.
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/ingredients')}
          className="text-lg px-8 py-4"
        >
          <ChefHat className="w-5 h-5 mr-2" />
          Empezar a Cocinar
        </Button>
      </motion.div>
    </div>
  );
}