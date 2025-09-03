import React, { useState, useMemo } from 'react';
import { SendIcon, RotateCw } from 'lucide-react';
import FormField from './FormField';
import Notification from './Notification';
import { FormData, FormErrors } from '../types/formTypes';
import { validateForm } from '../utils/validation';
import { sendEmail } from '../utils/emailService';

const DEPARTMENTS = [
  { value: 'Dirección General', label: 'Dirección General' },
  { value: 'Consultoría Jurídica', label: 'Consultoría Jurídica' },
  { value: 'Auditoría Jurídica', label: 'Auditoría Jurídica' },
  { value: 'Oficina de Planificacion Estrategica y Control de Gestión', label: 'Oficina de Planificacion Estrategica y Control de Gestión' },
  { value: 'Oficina de Comunicación e Imagen Institucional', label: 'Oficina de Comunicación e Imagen Institucional' },
  { value: 'Oficina de Administración', label: 'Oficina de Administración' },
  { value: 'Oficina de Recursos Humanos', label: 'Oficina de Recursos Humanos' },
  { value: 'Oficina de Técnologia de la Información', label: 'Oficina de Técnologia de la Información' },
  { value: 'Oficina de Mantenimiento de Servicios Generales', label: 'Oficina de Mantenimiento de Servicios Generales' },
  { value: 'Seguridad Integral', label: 'Seguridad Integral' },
  { value: 'Extensión Cultural', label: 'Extensión Cultural' },
  { value: 'Dirección de Programa de Servicios de la Biblioteca Nacional', label: 'Dirección de Programa de Servicios de la Biblioteca Nacional' },
  { value: 'Dirección de Programa de Servicios Bibliotecas Públicas', label: 'Dirección de Programa de Servicios Bibliotecas Públicas' },
  { value: 'Dirección de programa de Servicios Técnicos Bibliotecarios', label: 'Dirección de programa de Servicios Técnicos Bibliotecarios' },
  { value: 'Dirección de Orientación y Referencia', label: 'Dirección de Orientación y Referencia' },
  { value: 'Dirección Colección Bibliográfica', label: 'Dirección Colección Bibliográfica' },
  { value: 'Dirección Colección Audiovisual', label: 'Dirección Colección Audiovisual' },
  { value: 'Dirección de la Red Metropolitana de Bibliotecas Públicas', label: 'Dirección de la Red Metropolitana de Bibliotecas Públicas' },
  { value: 'Dirección de Redes Estatales de Bilbiotecas Públicas', label: 'Dirección de Redes Estatales de Bilbiotecas Públicas' },
  { value: 'Dirección de Desarrollo de Colecciones', label: 'Dirección de Desarrollo de Colecciones' },
  { value: 'Dirección de Procesos Técnicos', label: 'Dirección de Procesos Técnicos' },
  { value: 'Dirección del Centro Nacional de Preservación Documental', label: 'Dirección del Centro Nacional de Preservación Documental' },
];

const DIVISIONS_BY_DEPARTMENT: Record<string, { value: string; label: string }[]> = {
  'Dirección General': [
    { value: 'Archivo General', label: 'Archivo General' },
    { value: 'Apoyo Administrativo', label: 'Apoyo Administrativo' },
    { value: 'Servicios Generales', label: 'Servicios Generales' },
  ],
  'Consultoría Jurídica': [
    { value: 'Consultoría Jurídica', label: 'Consultoría Jurídica' },
  ],
  'Auditoría Jurídica': [
    { value: 'Auditoría de Gestión', label: 'Auditoría de Gestión' },
    { value: 'Auditoría Financiera', label: 'Auditoría Financiera' },
    { value: 'Averiguaciones Administrativa', label: 'Averiguaciones Administrativa' },
  ],
  'Oficina de Planificacion Estrategica y Control de Gestión': [
    { value: 'Planes, Programas y Proyectos', label: 'Planes, Programas y Proyectos' },
    { value: 'Presupuesto', label: 'Presupuesto' },
    { value: 'Desarrollo Organizacional', label: 'Desarrollo Organizacional' },
    { value: 'Investigación y Estadística', label: 'Investigación y Estadística' },
  ],
  'Oficina de Comunicación e Imagen Institucional': [
    { value: 'Publicaciones Institucionales', label: 'Publicaciones Institucionales' },
    { value: 'Coordinación de Publicaciones Divulgativas', label: 'Coordinación de Publicaciones Divulgativas' },
    { value: 'Coordinación de Producción Audiovisual', label: 'Coordinación de Producción Audiovisual' },
  ],
  'Oficina de Administración': [
    { value: 'Compras', label: 'Compras' },
    { value: 'Finanzas', label: 'Finanzas' },
    { value: 'Contabilidad', label: 'Contabilidad' },
  ],
  'Oficina de Recursos Humanos': [
    { value: 'Desarrollo y Gestión Humana', label: 'Desarrollo y Gestión Humana' },
    { value: 'Nomina y Gestión Administrativa', label: 'Nomina y Gestión Administrativa' },
    { value: 'Bienestar Social', label: 'Bienestar Social' },
  ],
  'Oficina de Técnologia de la Información': [
    { value: 'Sistemas', label: 'Sistemas' },
    { value: 'Atención Técnologica', label: 'Atención Técnologica' },
  ],
  'Oficina de Mantenimiento de Servicios Generales': [
    { value: 'Servicios Internos', label: 'Servicios Internos' },
    { value: 'Servicios Contratados', label: 'Servicios Contratados' },
    { value: 'Equipos y Sistemas', label: 'Equipos y Sistemas' },
    { value: 'Infrastructura', label: 'Infrastructura' },
  ],
  'Seguridad Integral': [
    { value: 'Seguridad Fisica', label: 'Seguridad Fisica' },
    { value: 'Técnologia de Seguridad', label: 'Técnologia de Seguridad' },
    { value: 'Higiene y Control de Riesgo', label: 'Higiene y Control de Riesgo' },
  ],
  'Extensión Cultural': [
    { value: 'Producción y Montaje', label: 'Producción y Montaje' },
    { value: 'Programación y Promoción', label: 'Programación y Promoción' },
  ],
  'Dirección de Programa de Servicios de la Biblioteca Nacional': [
    { value: 'Sin División', label: 'Sin División' },
  ],
  'Dirección de Programa de Servicios Bibliotecas Públicas': [
    { value: 'Desarrollo de Servicios Especiales de Información', label: 'Desarrollo de Servicios Especiales de Información' },
  ],
  'Dirección de programa de Servicios Técnicos Bibliotecarios': [
    { value: 'Normalización Técnica', label: 'Normalización Técnica' },
  ],
  'Dirección de Orientación y Referencia': [
    { value: 'Documentación e Información Bibliotecológica', label: 'Documentación e Información Bibliotecológica' },
  ],
  'Dirección Colección Bibliográfica': [
    { value: 'Colección Documental Antigua', label: 'Colección Documental Antigua' },
    { value: 'Colección Tulio Febres Cordero (Mérida)', label: 'Colección Tulio Febres Cordero (Mérida)' },
    { value: 'Colección Bibliográfica Contemporanea', label: 'Colección Bibliográfica Contemporanea' },
  ],
  'Dirección Colección Audiovisual': [
    { value: 'Colección Sonido y Cine', label: 'Colección Sonido y Cine' },
    { value: 'Colección Obras Planas', label: 'Colección Obras Planas' },
  ],
  'Dirección de la Red Metropolitana de Bibliotecas Públicas': [
    { value: 'BPC Simón Rodríguez', label: 'BPC Simón Rodríguez' },
  ],
  'Dirección de Redes Estatales de Bilbiotecas Públicas': [
    { value: 'Sin división', label: 'Sin división' },
  ],
  'Dirección de Desarrollo de Colecciones': [
    { value: 'Recepción y Distribución', label: 'Recepción y Distribución' },
    { value: 'Adquisiciones', label: 'Adquisiciones' },
    { value: 'Depósito Legal', label: 'Depósito Legal' },
    { value: 'Control y Evaluación', label: 'Control y Evaluación' },
  ],
  'Dirección de Procesos Técnicos': [
    { value: 'Registro', label: 'Registro' },
    { value: 'Control de Calidad', label: 'Control de Calidad' },
    { value: 'Catalogación y Clasificación de Materiales Bibliográficos y Seriado', label: 'Catalogación y Clasificación de Materiales Bibliográficos y Seriado' },
    { value: 'Catalogación y Clasificación de Materiales Audiovisuales', label: 'Catalogación y Clasificación de Materiales Audiovisuales' },
  ],
  'Dirección del Centro Nacional de Preservación Documental': [
    { value: 'Preservación de Colecciones', label: 'Preservación de Colecciones' },
    { value: 'Conservación de Colecciones', label: 'Conservación de Colecciones' },
    { value: 'Micrografía', label: 'Micrografía' },
    { value: 'Preservación por Duplicados', label: 'Preservación por Duplicados' },
  ],
};

const SERVICES = [
  { value: 'Correo Institucional', label: 'Correo Institucional' },
  { value: 'SIGESP', label: 'SIGESP' },
  { value: 'Wordpress', label: 'Wordpress' },
  { value: 'Intranet', label: 'Intranet' },
  { value: 'PSI', label: 'PSI' },
];

const MODULES_BY_SERVICE: Record<string, { value: string; label: string }[]> = {
  'Correo Institucional': [
    { value: 'Creación de Nuevo Correo', label: 'Creación de Nuevo Correo' },
    // { value: 'Recuperación de Contraseña', label: 'Recuperación de Contraseña' },
    // { value: 'Configuración Outlook', label: 'Configuración Outlook' },
    // { value: 'Problemas de Envío', label: 'Problemas de Envío' },
  ],
  'SIGESP': [
    { value: 'Nómina', label: 'Nómina' },
    { value: 'Recursos Humanos', label: 'Recursos Humanos' },
    { value: 'Gestión Humana', label: 'Gestión Humana' },
    { value: 'Administración', label: 'Administración' },
    { value: 'Compras', label: 'Compras' },
    { value: 'Contabilidad', label: 'Contabilidad' },
    { value: 'Bienes Nacionales', label: 'Bienes Nacionales' },
    { value: 'Finanza', label: 'Finanza' },
    { value: 'Presupuesto', label: 'Presupuesto' },
  ],
  'Wordpress': [
    { value: 'Biblioteca Digital', label: 'Biblioteca Digital' },
    { value: 'Audiovisual', label: 'Audiovisual' },
    { value: 'Mama Rosa', label: 'Mama Rosa' },
    { value: 'Pagina Web', label: 'Pagina Web' },
    { value: 'Intranet', label: 'Intranet' },
    { value: 'PNF', label: 'PNF' },
    { value: 'Atención Ciudadana', label: 'Atención Ciudadana' },

  ],
  'Intranet': [
    { value: 'Usuario', label: 'Usuario' },
  ],
  'PSI': [
    { value: '', label: '' },
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
    // description: '',
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
          // description: '',
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
        
        {/* <FormField
          id="description"
          label="Descripción del problema"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          required
          placeholder="Describa detalladamente el problema o solicitud..."
        /> */}
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ 
              backgroundColor: '#A70336',
              focusRingColor: '#A70336'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#c91e4a';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#A70336';
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