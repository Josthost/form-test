import React from 'react';
import SupportForm from './components/SupportForm';
import { HelpCircle, Mail } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-bnv-primary to-bnv-tertiary text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Ticket Soporte BNV</h1>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-1" />
              <span>soporte@bnv.com</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-t-4 border-bnv-secondary">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-bnv-primary mb-2">Formulario de Solicitud de Soporte</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete el siguiente formulario para solicitar asistencia técnica. 
              Un miembro de nuestro equipo revisará su solicitud y se pondrá en contacto con usted a la brevedad.
            </p>
          </div>
          
          <SupportForm />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Para soporte urgente, llame al: <span className="font-medium text-bnv-primary">+58 (212) 555-0123</span></p>
        </div>
      </main>
      
      <footer className="bg-bnv-tertiary text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Banco Nacional de Venezuela. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;