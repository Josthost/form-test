import React, { useState } from 'react';
import { SendIcon, RotateCw } from 'lucide-react';
import FormField from './FormField';
import Notification from './Notification';
import { FormData, FormErrors } from '../types/formTypes';
import { validateForm } from '../utils/validation';
import { sendEmail } from '../utils/emailService';

const SERVICES = [
  { value: 'soporte-tecnico', label: 'Soporte Técnico General' },
  { value: 'instalacion-software', label: 'Instalación de Software' },
  { value: 'configuracion-equipos', label: 'Configuración de Equipos' },
  { value: 'problemas-red', label: 'Problemas de Red' },
  { value: 'acceso-sistemas', label: 'Acceso a Sistemas' },
  { value: 'backup-datos', label: 'Respaldo de Datos' },
  { value: 'mantenimiento-preventivo', label: 'Mantenimiento Preventivo' },
  { value: 'actualizacion-sistema', label: 'Actualización de Sistema' },
  { value: 'seguridad-informatica', label: 'Seguridad Informática' },
  { value: 'capacitacion-usuario', label: 'Capacitación de Usuario' },
];

const SupportForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    department: '',
    division: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    service: '',
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await sendEmail(formData);
      
      if (result.success) {
        // Show success notification with ticket code
        setNotification({
          type: 'success',
          message: `Solicitud enviada con éxito. Código de ticket: ${result.code}. Le contactaremos pronto.`,
        });
        
        // Reset form
        setFormData({
          department: '',
          division: '',
          firstName: '',
          lastName: '',
          idNumber: '',
          service: '',
          description: '',
        });
      } else {
        throw new Error('Error al enviar el correo');
      }
    } catch (error) {
      // Show error notification
      setNotification({
        type: 'error',
        message: 'No se pudo enviar la solicitud. Por favor, inténtelo de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
      
      <form onSubmit={handleSubmit} className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="department"
            label="Departamento solicitante"
            type="text"
            value={formData.department}
            onChange={handleChange}
            error={errors.department}
            required
            placeholder="Ej: Recursos Humanos"
          />
          
          <FormField
            id="division"
            label="División del solicitante"
            type="text"
            value={formData.division}
            onChange={handleChange}
            error={errors.division}
            required
            placeholder="Ej: Nómina"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="firstName"
            label="Nombre completo"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            placeholder="Ej: Juan Carlos"
          />
          
          <FormField
            id="lastName"
            label="Apellidos"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            placeholder="Ej: Pérez González"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="idNumber"
            label="Cédula de identidad"
            type="text"
            value={formData.idNumber}
            onChange={handleChange}
            error={errors.idNumber}
            required
            placeholder="Ej: V-12345678"
          />
          
          <FormField
            id="service"
            label="Servicio requerido"
            type="select"
            value={formData.service}
            onChange={handleChange}
            error={errors.service}
            required
            options={SERVICES}
          />
        </div>
        
        <FormField
          id="description"
          label="Descripción detallada del problema o solicitud"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          required
          placeholder="Describa detalladamente el problema o servicio que necesita..."
        />
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ 
              backgroundColor: '#820000',
              focusRingColor: '#820000'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#a00000';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#820000';
              }
            }}
          >
            {isSubmitting ? (
              <>
                <RotateCw className="animate-spin h-5 w-5 mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <SendIcon className="h-5 w-5 mr-2" />
                Enviar solicitud
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportForm;