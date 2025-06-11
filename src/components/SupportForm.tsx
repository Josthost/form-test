import React, { useState } from 'react';
import { SendIcon, RotateCw } from 'lucide-react';
import FormField from './FormField';
import Notification from './Notification';
import { FormData, FormErrors } from '../types/formTypes';
import { validateForm } from '../utils/validation';
import { sendEmail } from '../utils/emailService';

const SUPPORT_AREAS = [
  { value: 'soporte-tecnico', label: 'Soporte Técnico' },
  { value: 'redes-internet', label: 'Redes e Internet' },
  { value: 'sistemas-web', label: 'Sistemas Web' },
];

const SupportForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    department: '',
    division: '',
    email: '',
    supportArea: '',
    supportType: '',
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
      // In a real app, this would send the data to your backend or service
      await sendEmail(formData);
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Solicitud enviada con éxito. Le contactaremos pronto.',
      });
      
      // Reset form
      setFormData({
        department: '',
        division: '',
        email: '',
        supportArea: '',
        supportType: '',
        description: '',
      });
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
          />
          
          <FormField
            id="division"
            label="División del solicitante"
            type="text"
            value={formData.division}
            onChange={handleChange}
            error={errors.division}
            required
          />
        </div>
        
        <FormField
          id="email"
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="supportArea"
            label="Área de soporte"
            type="select"
            value={formData.supportArea}
            onChange={handleChange}
            error={errors.supportArea}
            required
            options={SUPPORT_AREAS}
          />
          
          <FormField
            id="supportType"
            label="Tipo de soporte"
            type="text"
            value={formData.supportType}
            onChange={handleChange}
            error={errors.supportType}
            required
            maxLength={50}
          />
        </div>
        
        <FormField
          id="description"
          label="Descripción detallada"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          required
        />
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-bnv-primary text-white py-2 px-4 rounded-md hover:bg-bnv-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-bnv-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
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