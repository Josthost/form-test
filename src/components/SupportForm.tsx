import React, { useState, useMemo } from 'react';
import { SendIcon, RotateCw } from 'lucide-react';
import FormField from './FormField';
import Notification from './Notification';
import { FormData, FormErrors } from '../types/formTypes';
import { validateForm } from '../utils/validation';
import { sendEmail } from '../utils/emailService';

const DEPARTMENTS = [
  { value: 'administracion', label: 'Administración' },
  { value: 'recursos-humanos', label: 'Recursos Humanos' },
  { value: 'contabilidad', label: 'Contabilidad' },
  { value: 'operaciones', label: 'Operaciones' },
  { value: 'creditos', label: 'Créditos' },
  { value: 'captaciones', label: 'Captaciones' },
  { value: 'tesoreria', label: 'Tesorería' },
  { value: 'auditoria', label: 'Auditoría' },
  { value: 'legal', label: 'Legal' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sistemas', label: 'Sistemas' },
  { value: 'seguridad', label: 'Seguridad' },
  { value: 'gerencia', label: 'Gerencia' },
];

const DIVISIONS_BY_DEPARTMENT: Record<string, { value: string; label: string }[]> = {
  'administracion': [
    { value: 'nomina', label: 'Nómina' },
    { value: 'compras', label: 'Compras' },
    { value: 'servicios-generales', label: 'Servicios Generales' },
  ],
  'recursos-humanos': [
    { value: 'seleccion', label: 'Selección de Personal' },
    { value: 'capacitacion', label: 'Capacitación' },
    { value: 'bienestar', label: 'Bienestar Social' },
  ],
  'contabilidad': [
    { value: 'cuentas-por-pagar', label: 'Cuentas por Pagar' },
    { value: 'cuentas-por-cobrar', label: 'Cuentas por Cobrar' },
    { value: 'estados-financieros', label: 'Estados Financieros' },
  ],
  'operaciones': [
    { value: 'atencion-cliente', label: 'Atención al Cliente' },
    { value: 'caja', label: 'Caja' },
    { value: 'mesa-cambio', label: 'Mesa de Cambio' },
  ],
  'creditos': [
    { value: 'credito-comercial', label: 'Crédito Comercial' },
    { value: 'credito-personal', label: 'Crédito Personal' },
    { value: 'hipotecario', label: 'Hipotecario' },
  ],
  'captaciones': [
    { value: 'ahorros', label: 'Ahorros' },
    { value: 'cuentas-corrientes', label: 'Cuentas Corrientes' },
    { value: 'certificados', label: 'Certificados de Depósito' },
  ],
  'tesoreria': [
    { value: 'mesa-dinero', label: 'Mesa de Dinero' },
    { value: 'inversiones', label: 'Inversiones' },
    { value: 'liquidez', label: 'Liquidez' },
  ],
  'auditoria': [
    { value: 'auditoria-interna', label: 'Auditoría Interna' },
    { value: 'cumplimiento', label: 'Cumplimiento' },
    { value: 'riesgos', label: 'Gestión de Riesgos' },
  ],
  'legal': [
    { value: 'contratos', label: 'Contratos' },
    { value: 'litigios', label: 'Litigios' },
    { value: 'normativa', label: 'Normativa' },
  ],
  'marketing': [
    { value: 'publicidad', label: 'Publicidad' },
    { value: 'comunicaciones', label: 'Comunicaciones' },
    { value: 'eventos', label: 'Eventos' },
  ],
  'sistemas': [
    { value: 'desarrollo', label: 'Desarrollo de Sistemas' },
    { value: 'soporte-tecnico', label: 'Soporte Técnico' },
    { value: 'infraestructura', label: 'Infraestructura' },
  ],
  'seguridad': [
    { value: 'seguridad-fisica', label: 'Seguridad Física' },
    { value: 'seguridad-informatica', label: 'Seguridad Informática' },
    { value: 'investigacion', label: 'Investigación' },
  ],
  'gerencia': [
    { value: 'gerencia-general', label: 'Gerencia General' },
    { value: 'planificacion', label: 'Planificación' },
    { value: 'control-gestion', label: 'Control de Gestión' },
  ],
};

const SERVICES = [
  { value: 'correo-institucional', label: 'Correo Institucional' },
  { value: 'sistema-bancario', label: 'Sistema Bancario' },
  { value: 'aplicaciones-office', label: 'Aplicaciones Office' },
  { value: 'soporte-hardware', label: 'Soporte Hardware' },
  { value: 'acceso-sistemas', label: 'Acceso a Sistemas' },
  { value: 'backup-datos', label: 'Respaldo de Datos' },
  { value: 'mantenimiento-preventivo', label: 'Mantenimiento Preventivo' },
  { value: 'seguridad-informatica', label: 'Seguridad Informática' },
  { value: 'capacitacion-usuario', label: 'Capacitación de Usuario' },
  { value: 'redes-conectividad', label: 'Redes y Conectividad' },
];

const MODULES_BY_SERVICE: Record<string, { value: string; label: string }[]> = {
  'correo-institucional': [
    { value: 'creacion-nuevo-correo', label: 'Creación de Nuevo Correo' },
    { value: 'recuperacion-password', label: 'Recuperación de Contraseña' },
    { value: 'configuracion-outlook', label: 'Configuración Outlook' },
    { value: 'problemas-envio', label: 'Problemas de Envío' },
  ],
  'sistema-bancario': [
    { value: 'core-bancario', label: 'Core Bancario' },
    { value: 'cajeros-automaticos', label: 'Cajeros Automáticos' },
    { value: 'pos-comercios', label: 'POS Comercios' },
    { value: 'banca-online', label: 'Banca Online' },
  ],
  'aplicaciones-office': [
    { value: 'word', label: 'Microsoft Word' },
    { value: 'excel', label: 'Microsoft Excel' },
    { value: 'powerpoint', label: 'Microsoft PowerPoint' },
    { value: 'teams', label: 'Microsoft Teams' },
  ],
  'soporte-hardware': [
    { value: 'computadoras', label: 'Computadoras' },
    { value: 'impresoras', label: 'Impresoras' },
    { value: 'telefonos', label: 'Teléfonos' },
    { value: 'equipos-red', label: 'Equipos de Red' },
  ],
  'acceso-sistemas': [
    { value: 'creacion-usuario', label: 'Creación de Usuario' },
    { value: 'reseteo-password', label: 'Reseteo de Contraseña' },
    { value: 'permisos-acceso', label: 'Permisos de Acceso' },
    { value: 'bloqueo-cuenta', label: 'Desbloqueo de Cuenta' },
  ],
  'backup-datos': [
    { value: 'respaldo-archivos', label: 'Respaldo de Archivos' },
    { value: 'recuperacion-datos', label: 'Recuperación de Datos' },
    { value: 'migracion-datos', label: 'Migración de Datos' },
  ],
  'mantenimiento-preventivo': [
    { value: 'limpieza-equipos', label: 'Limpieza de Equipos' },
    { value: 'actualizacion-software', label: 'Actualización de Software' },
    { value: 'revision-antivirus', label: 'Revisión Antivirus' },
  ],
  'seguridad-informatica': [
    { value: 'instalacion-antivirus', label: 'Instalación Antivirus' },
    { value: 'politicas-seguridad', label: 'Políticas de Seguridad' },
    { value: 'incidentes-seguridad', label: 'Incidentes de Seguridad' },
  ],
  'capacitacion-usuario': [
    { value: 'uso-sistemas', label: 'Uso de Sistemas' },
    { value: 'buenas-practicas', label: 'Buenas Prácticas' },
    { value: 'nuevas-funcionalidades', label: 'Nuevas Funcionalidades' },
  ],
  'redes-conectividad': [
    { value: 'problemas-internet', label: 'Problemas de Internet' },
    { value: 'configuracion-wifi', label: 'Configuración WiFi' },
    { value: 'velocidad-conexion', label: 'Velocidad de Conexión' },
  ],
};

const SupportForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    department: '',
    division: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    position: '',
    birthDate: '',
    service: '',
    module: '',
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter divisions based on selected department
  const availableDivisions = useMemo(() => {
    return formData.department ? DIVISIONS_BY_DEPARTMENT[formData.department] || [] : [];
  }, [formData.department]);

  // Filter modules based on selected service
  const availableModules = useMemo(() => {
    return formData.service ? MODULES_BY_SERVICE[formData.service] || [] : [];
  }, [formData.service]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Reset division when department changes
      if (name === 'department') {
        newData.division = '';
      }
      
      // Reset module when service changes
      if (name === 'service') {
        newData.module = '';
      }
      
      return newData;
    });
    
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
          email: '',
          position: '',
          birthDate: '',
          service: '',
          module: '',
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
    <div className="w-full max-w-4xl mx-auto">
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
            type="select"
            value={formData.department}
            onChange={handleChange}
            error={errors.department}
            required
            options={DEPARTMENTS}
          />
          
          <FormField
            id="division"
            label="División del solicitante"
            type="select"
            value={formData.division}
            onChange={handleChange}
            error={errors.division}
            required
            options={availableDivisions}
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
            id="email"
            label="Correo electrónico"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="Ej: juan.perez@bnv.com"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="position"
            label="Cargo"
            type="text"
            value={formData.position}
            onChange={handleChange}
            error={errors.position}
            required
            placeholder="Ej: Analista de Créditos"
          />
          
          <FormField
            id="birthDate"
            label="Fecha de nacimiento"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            error={errors.birthDate}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          <FormField
            id="module"
            label="Módulo específico"
            type="select"
            value={formData.module}
            onChange={handleChange}
            error={errors.module}
            required
            options={availableModules}
          />
        </div>
        
        <FormField
          id="description"
          label="Descripción del problema"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          required
          placeholder="Describa detalladamente el problema o solicitud..."
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