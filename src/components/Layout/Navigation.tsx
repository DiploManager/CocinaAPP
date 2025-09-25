import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Hop as Home, Utensils, Receipt, BookOpen, Settings } from 'lucide-react';

const navigation = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Ingredientes', href: '/ingredients', icon: Utensils },
  { name: 'Recetas', href: '/recipes', icon: BookOpen },
  { name: 'Facturas', href: '/receipts', icon: Receipt },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <ChefHat className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                RecipeAI
              </span>
            </motion.div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="sm:hidden border-t border-gray-100">
        <div className="flex justify-around py-2">
          {navigation.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex flex-col items-center py-2 px-3 text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                <Icon className="w-5 h-5 mb-1" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}