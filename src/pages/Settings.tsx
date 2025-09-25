import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Download, Database } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export function Settings() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user?.email) {
      setEmail(user.email);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
      alert('Revisa tu correo para el enlace de acceso');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el enlace de acceso');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
    setUser(null);
    setEmail('');
  };

  const installPWA = () => {
    // PWA installation logic would be implemented here
    alert('La aplicación se puede instalar desde el menú de tu navegador');
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Configuración
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Personaliza tu experiencia y gestiona tu cuenta.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* User Account */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <User className="w-5 h-5 text-emerald-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Cuenta de Usuario</h2>
            </div>

            {user ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                    {user.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <div className="px-3 py-2 bg-green-50 rounded-lg text-sm text-green-600">
                    Conectado - Datos sincronizados
                  </div>
                </div>

                <Button onClick={handleSignOut} variant="outline" className="w-full">
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Inicia sesión para sincronizar tus datos entre dispositivos
                  </p>
                  <Input
                    type="email"
                    label="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                
                <Button type="submit" loading={loading} className="w-full">
                  Enviar enlace de acceso
                </Button>
                
                <p className="text-xs text-gray-500">
                  Te enviaremos un enlace mágico para iniciar sesión sin contraseña
                </p>
              </form>
            )}
          </Card>
        </motion.div>

        {/* App Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <SettingsIcon className="w-5 h-5 text-emerald-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Aplicación</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-orange-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Instalar App</h3>
                    <p className="text-sm text-gray-600">Usa RecipeAI como aplicación nativa</p>
                  </div>
                </div>
                <Button onClick={installPWA} size="sm">
                  Instalar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Notificaciones</h3>
                    <p className="text-sm text-gray-600">Recordatorios de comidas</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-orange-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Almacenamiento</h3>
                    <p className="text-sm text-gray-600">
                      {user ? 'Datos en la nube' : 'Solo dispositivo local'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl p-8"
      >
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">
            Acerca de RecipeAI
          </h2>
          <div className="max-w-3xl mx-auto text-gray-600 space-y-4">
            <p>
              RecipeAI es un generador inteligente de recetas que transforma los ingredientes que tienes en casa en deliciosas comidas personalizadas. 
            </p>
            <p>
              Utiliza tecnología de inteligencia artificial para sugerir recetas basadas en la hora del día, tus preferencias y los ingredientes disponibles.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">5000+</div>
                <div className="text-sm">Recetas generadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">1000+</div>
                <div className="text-sm">Ingredientes procesados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm">Precisión OCR</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}