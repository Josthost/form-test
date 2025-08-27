import React from 'react';
import SupportForm from './components/SupportForm';
import { HelpCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <header className="text-white py-6 shadow-md" style={{ backgroundColor: '#A70336' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Ticket Soporte BNV</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-t-4" style={{ borderTopColor: '#273376' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-black">Formulario de Solicitud de Soporte</h2>
            <p className="max-w-2xl mx-auto text-black">
              Complete el siguiente formulario para solicitar asistencia técnica. 
              Un miembro de nuestro equipo revisará su solicitud y se pondrá en contacto con usted a la brevedad.
            </p>
          </div>
          
          <SupportForm />
        </div>
        
        <div className="mt-8 text-center text-sm">
          <p className="text-black">Para soporte urgente, llame al: <span className="font-medium text-black">+58 (212) 555-0123</span></p>
        </div>
      </main>
      
      <footer className="text-white py-6 mt-12" style={{ backgroundColor: '#A70336' }}>
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Banco Nacional de Venezuela. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;