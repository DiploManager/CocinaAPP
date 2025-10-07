import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Camera, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { apiClient } from '../lib/api';
import { useIngredients } from '../hooks/useIngredients';

export function Receipts() {
  const { addIngredient } = useIngredients();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [extractedIngredients, setExtractedIngredients] = useState<string[]>([]);

  // Manejar subida de archivos
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  // Procesar facturas con OCR real
  const processReceipts = async () => {
    setProcessing(true);
    
    try {
      // Procesar cada archivo subido
      const allExtractedIngredients: string[] = [];
      
      for (const file of uploadedFiles) {
        const result = await apiClient.uploadReceipt(file);
        allExtractedIngredients.push(...result.extractedIngredients);
      }
      
      setExtractedIngredients(allExtractedIngredients);
    } catch (error) {
      console.error('Error procesando facturas:', error);
      alert('Error procesando las facturas. Por favor intenta de nuevo.');
    } finally {
      setProcessing(false);
    }
  };

  // Confirmar y agregar ingredientes extraídos
  const confirmIngredients = async () => {
    try {
      // Agregar cada ingrediente extraído a la lista del usuario
      for (const ingredient of extractedIngredients) {
        await addIngredient(ingredient, undefined, undefined, 'receipt');
      }
      
      alert('¡Ingredientes agregados exitosamente!');
    } catch (error) {
      console.error('Error agregando ingredientes:', error);
      alert('Error agregando ingredientes. Por favor intenta de nuevo.');
    }
    
    // Limpiar estado
    setExtractedIngredients([]);
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Extracción de Facturas
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sube facturas en PDF o imagen para extraer automáticamente los ingredientes con tecnología OCR.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-emerald-600" />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Subir Facturas
                </h2>
                <p className="text-gray-600">
                  Arrastra archivos aquí o haz clic para seleccionar
                </p>
              </div>

              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-emerald-500 hover:bg-emerald-50 transition-colors duration-200">
                  <div className="flex flex-col items-center space-y-3">
                    <Camera className="w-8 h-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-emerald-600">Haz clic para subir</span> o arrastra archivos
                    </div>
                    <div className="text-xs text-gray-500">
                      PDF, JPG, PNG hasta 10MB
                    </div>
                  </div>
                </div>
              </label>

              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Archivos subidos:</h3>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <Badge variant="secondary">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </Badge>
                    </div>
                  ))}
                  
                  <Button
                    onClick={processReceipts}
                    loading={processing}
                    className="w-full mt-4"
                    size="lg"
                  >
                    {processing ? 'Procesando...' : 'Extraer Ingredientes'}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 h-full">
            {!processing && extractedIngredients.length === 0 && (
              <div className="text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Resultados de Extracción
                </h3>
                <p className="text-gray-600">
                  Los ingredientes extraídos aparecerán aquí una vez procesadas las facturas.
                </p>
              </div>
            )}

            {processing && (
              <div className="text-center space-y-4 py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <FileText className="w-8 h-8 text-emerald-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Procesando facturas...
                </h3>
                <p className="text-gray-600">
                  Extrayendo ingredientes con tecnología OCR
                </p>
              </div>
            )}

            {extractedIngredients.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ingredientes Extraídos ({extractedIngredients.length})
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {extractedIngredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-emerald-50 rounded-lg border border-emerald-100"
                    >
                      <span className="text-sm text-emerald-800 capitalize font-medium">
                        {ingredient}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    Revisa los ingredientes extraídos y confirma para agregarlos a tu lista.
                  </p>
                  
                  <div className="flex space-x-3">
                    <Button
                      onClick={confirmIngredients}
                      className="flex-1"
                      size="lg"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirmar y Agregar
                    </Button>
                    
                    <Button
                      onClick={() => setExtractedIngredients([])}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl p-8"
      >
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Cómo funciona la extracción?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: 'Sube la factura',
                desc: 'Arrastra o selecciona archivos PDF o imágenes de tus facturas de compras'
              },
              {
                step: 2,
                title: 'Procesamiento OCR',
                desc: 'La tecnología OCR extrae automáticamente el texto y identifica ingredientes'
              },
              {
                step: 3,
                title: 'Confirma y agrega',
                desc: 'Revisa los resultados y confirma para agregar a tu lista de ingredientes'
              }
            ].map((item) => (
              <div key={item.step} className="text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}