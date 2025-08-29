import React, { useState, useMemo } from 'react';
import { SendIcon, RotateCw } from 'lucide-react';
import FormField from './FormField';
import Notification from './Notification';
import { FormData, FormErrors } from '../types/formTypes';
import { validateForm } from '../utils/validation';
import { sendEmail } from '../utils/emailService';

const DEPARTMENTS = [
  { value: 'direccion-general', label: 'Dirección General' },
  { value: 'consultoria-juridica', label: 'Consultoría Jurídica' },
  { value: 'auditoria-juridica', label: 'Auditoría Jurídica' },
  { value: 'planificacion-estrategica-y-control-de-gestion', label: 'Oficina de Planificacion Estrategica y Control de Gestión' },
  { value: 'comunicacion-e-imagen', label: 'Oficina de Comunicación e Imagen Institucional' },
  { value: 'oficina-de-administracion', label: 'Oficina de Administración' },
  { value: 'oficina-de-recursos-humanos', label: 'Oficina de Recursos Humanos' },
  { value: 'oficina-de-tecnologia-de-la-informacion', label: 'Oficina de Técnologia de la Información' },
  { value: 'oficina-de-mantenimiento-de-servicios-generales', label: 'Oficina de Mantenimiento de Servicios Generales' },
  { value: 'seguridad-integral', label: 'Seguridad Integral' },
  { value: 'extension-cultural', label: 'Extensión Cultural' },
  { value: 'direccion-de-programa-de-servicios-de-la-biblioteca-nacional', label: 'Dirección de Programa de Servicios de la Biblioteca Nacional' },
  { value: 'direccion-de-programa-de-servicios-bibliotecas-publicas', label: 'Dirección de Programa de Servicios Bibliotecas Públicas' },
  { value: 'direccion-de-programa-de-servicios-tecnicos-bibliotecarios', label: 'Dirección de programa de Servicios Técnicos Bibliotecarios' },
  { value: 'direccion-de-orientacion-y-referencia', label: 'Dirección de Orientación y Referencia' },
  { value: 'direccion-coleccion-bibliografica', label: 'Dirección Colección Bibliográfica' },
  { value: 'direccion-coleccion-audiovisual', label: 'Dirección Colección Audiovisual' },
  { value: 'direccion-de-la-red-metropolitana-de-bibliotecas-publicas', label: 'Dirección de la Red Metropolitana de Bibliotecas Públicas' },
  { value: 'direccion-de-redes-estatales-de-bibliotecas-publicas', label: 'Dirección de Redes Estatales de Bilbiotecas Públicas' },
  { value: 'direccion-de-desarrollo-de-colecciones', label: 'Dirección de Desarrollo de Colecciones' },
  { value: 'direccion-de-procesos-tecnicos', label: 'Dirección de Procesos Técnicos' },
  { value: 'direccion-del-centro-nacional-de-preservacion-documental', label: 'Dirección del Centro Nacional de Preservación Documental' },
];

const DIVISIONS_BY_DEPARTMENT: Record<string, { value: string; label: string }[]> = {
  'direccion-general': [
    { value: 'archivo-general', label: 'Archivo General' },
    { value: 'apoyo-administrativo', label: 'Apoyo Administrativo' },
    { value: 'servicios-generales', label: 'Servicios Generales' },
  ],
  'consultoria-juridica': [
    { value: 'consulturia-juridica', label: 'Consultoría Jurídica' },
  ],
  'auditoria-juridica': [
    { value: 'auditoria-de-gestion', label: 'Auditoría de Gestión' },
    { value: 'auditoria-financiera', label: 'Auditoría Financiera' },
    { value: 'averiguaciones-administrativa', label: 'Averiguaciones Administrativa' },
  ],
  'planificacion-estrategica-y-control-de-gestion': [
    { value: 'planes-programas-proyectos', label: 'Planes, Programas y Proyectos' },
    { value: 'presupuesto', label: 'Presupuesto' },
    { value: 'desarrollo-organizacional', label: 'Desarrollo Organizacional' },
    { value: 'investigacion-estadistica', label: 'Investigación y Estadística' },
  ],
  'comunicacion-e-imagen': [
    { value: 'publicaciones-institucionales', label: 'Publicaciones Institucionales' },
    { value: 'coordinacion-de-publicaciones-divulgativas', label: 'Coordinación de Publicaciones Divulgativas' },
    { value: 'coordinacion-produccion.audiovisual', label: 'Coordinación de Producción Audiovisual' },
  ],
  'oficina-de-administracion': [
    { value: 'compras', label: 'Compras' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'contabilidad', label: 'Contabilidad' },
  ],
  'oficina-de-recursos-humanos': [
    { value: 'Desarrollo-y-gestion-humana', label: 'Desarrollo y Gestión Humana' },
    { value: 'nomina-y-gestion-administrativa', label: 'Nomina y Gestión Administrativa' },
    { value: 'bienestar-social', label: 'Bienestar Social' },
  ],
  'oficina-de-tecnologia-de-la-informacion': [
    { value: 'sistemas', label: 'Sistemas' },
    { value: 'atencion-tecnologica', label: 'Atención Técnologica' },
  ],
  'oficina-de-mantenimiento-de-servicios-generales': [
    { value: 'servicios-internos', label: 'Servicios Internos' },
    { value: 'servicios-contratados', label: 'Servicios Contratados' },
    { value: 'equipos-y-sistemas', label: 'Equipos y Sistemas' },
    { value: 'infractructura', label: 'Infrastructura' },
  ],
  'seguridad-integral': [
    { value: 'seguridad-fisica', label: 'Seguridad Fisica' },
    { value: 'tecnologia-de-seguridad', label: 'Técnologia de Seguridad' },
    { value: 'higiene-y-control-de-riesgo', label: 'Higiene y Control de Riesgo' },
  ],
  'extension-cultural': [
    { value: 'produccion-y-montaje', label: 'Producción y Montaje' },
    { value: 'programacion-y-promocion', label: 'Programación y Promoción' },
  ],
  'direccion-de-programa-de-servicios-de-la-biblioteca-nacional': [
    { value: 'sin-division', label: 'Sin División' },
  ],
  'direccion-de-programa-de-servicios-bibliotecas-publicas': [
    { value: 'desarrollo-de-servicios-especiales-de-informacion', label: 'Desarrollo de Servicios Especiales de Información' },
  ],
  'direccion-de-programa-de-servicios-tecnicos-bibliotecarios': [
    { value: 'normalizacion-tecnica', label: 'Normalización Técnica' },
  ],
  'direccion-de-orientacion-y-referencia': [
    { value: 'documentacion-e-informacion-bibliotecologica', label: 'Documentación e Información Bibliotecológica' },
  ],
  'direccion-coleccion-bibliografica': [
    { value: 'coleccion-documental-antigua', label: 'Colección Documental Antigua' },
    { value: 'coleccion-tulio-febres-cordero', label: 'Colección Tulio Febres Cordero (Mérida)' },
    { value: 'coleccion-bibliografica-contemporanea', label: 'Colección Bibliográfica Contemporanea' },
  ],
  'direccion-coleccion-audiovisual': [
    { value: 'coleccion-sonido-y-cine', label: 'Colección Sonido y Cine' },
    { value: 'coleccion-obras-planas', label: 'Colección Obras Planas' },
  ],
  'direccion-de-la-red-metropolitana-de-bibliotecas-publicas': [
    { value: 'bpc-simon-rodriguez', label: 'BPC Simón Rodríguez' },
  ],
  'direccion-de-redes-estatales-de-bibliotecas-publicas': [
    { value: 'sin-division', label: 'Sin división' },
  ],
  'direccion-de-desarrollo-de-colecciones': [
    { value: 'recepcion-y-distribucion', label: 'Recepción y Distribución' },
    { value: 'adquisiciones', label: 'Adquisiciones' },
    { value: 'deposito-legal', label: 'Depósito Legal' },
    { value: 'control-y-evaluacion', label: 'Control y Evaluación' },
  ],
  'direccion-de-procesos-tecnicos': [
    { value: 'registro', label: 'Registro' },
    { value: 'control-de-calidad', label: 'COntrol de Calidad' },
    { value: 'catalogacion-y-clasificacion-de-materiales-bibliograficos-y-seriado', label: 'Catalogación y Clasificación de Materiales Bibliográficos y Seriado' },
    { value: 'catalogacion-y-clasificacion-de-materiales-audiovisuales', label: 'Catalogación y Clasificación de Materiales Audiovisuales' },
  ],
  'direccion-del-centro-nacional-de-preservacion-documental': [
    { value: 'preservacion-de-colecciones', label: 'Preservación de Colecciones' },
    { value: 'conservacion-de-colecciones', label: 'Conservación de Colecciones' },
    { value: 'micrografia', label: 'Micrografía' },
    { value: 'preservacion-por-duplicados', label: 'Preservación por Duplicados' },
  ],
};

const SERVICES = [
  { value: 'correo-institucional', label: 'Correo Institucional' },
  { value: 'sigesp', label: 'SIGESP' },
  { value: 'wordpress', label: 'Wordpress' },
  { value: 'intranet', label: 'Intranet' },
  { value: 'psi', label: 'PSI' },
];

const MODULES_BY_SERVICE: Record<string, { value: string; label: string }[]> = {
  'correo-institucional': [
    { value: 'creacion-nuevo-correo', label: 'Creación de Nuevo Correo' },
    // { value: 'recuperacion-password', label: 'Recuperación de Contraseña' },
    // { value: 'configuracion-outlook', label: 'Configuración Outlook' },
    // { value: 'problemas-envio', label: 'Problemas de Envío' },
  ],
  'sigesp': [
    { value: 'nomina', label: 'Nómina' },
    { value: 'recursos-humanos', label: 'Recursos Humanos' },
    { value: 'gestion-humana', label: 'Gestión Humana' },
    { value: 'administración', label: 'Administración' },
    { value: 'compras', label: 'Compras' },
    { value: 'contabilidad', label: 'Contabilidad' },
    { value: 'bienes-nacionales', label: 'Bienes Nacionales' },
    { value: 'finanza', label: 'Finanza' },
    { value: 'Presupuesto', label: 'Presupuesto' },
  ],
  'wordpress': [
    { value: 'biblioteca-digital', label: 'Biblioteca Digital' },
    { value: 'audiovisual', label: 'Audiovisual' },
    { value: 'mama-rosa', label: 'Mama Rosa' },
    { value: 'pagina-web', label: 'Pagina Web' },
    { value: 'intranet', label: 'Intranet' },
    { value: 'pnf', label: 'PNF' },
    { value: 'atencion-ciudadana', label: 'Atención Ciudadana' },

  ],
  'intranet': [
    { value: 'usuario', label: 'Usuario' },
  ],
  'psi': [
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
