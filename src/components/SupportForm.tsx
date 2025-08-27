import React, { useState, useMemo } from 'react';
import { SendIcon, RotateCw } from 'lucide-react';
import FormField from './FormField';
import Notification from './Notification';
import { FormData, FormErrors } from '../types/formTypes';
import { validateForm } from '../utils/validation';
import { sendEmail } from '../utils/emailService';

const DEPARTMENTS = [
  { value: 'Administración', label: 'Administración' },
  { value: 'Recursos Humanos', label: 'Recursos Humanos' },
  { value: 'Contabilidad', label: 'Contabilidad' },
  { value: 'Operaciones', label: 'Operaciones' },
  { value: 'Créditos', label: 'Créditos' },
  { value: 'Captaciones', label: 'Captaciones' },
  { value: 'Tesorería', label: 'Tesorería' },
  { value: 'Auditoría', label: 'Auditoría' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sistemas', label: 'Sistemas' },
  { value: 'Seguridad', label: 'Seguridad' },
  { value: 'Gerencia', label: 'Gerencia' },
  { value: 'direccion-de-programa-de-servicios-tecnicos-bibliotecarios', label: 'Dirección de programa de Servicios Técnicos Bibliotecarios' },
  { value: 'direccion-de-orientacion-y-referencia', label: 'Dirección de Orientación y Referencia' },
  { value: 'direccion-coleccion-bibliografica', label: 'Dirección Colección Bibliográfica' },
  { value: 'direccion-coleccion-audiovisual', label: 'Dirección Colección Audiovisual' },
  { value: 'direccion-de-la-red-metropolitana-de-bibliotecas-publicas', label: 'Dirección de la Red Metropolitana de Bibliotecas Públicas' },
  { value: 'direccion-de-redes-estatales-de-bibliotecas-publicas', label: 'Dirección de Redes Estatales de Bilbiotecas Públicas' },
  { value: 'direccion-de-desarrollo-de-colecciones', label: 'Dirección de Desarrollo de Colecciones' },
  { value: 'direccion-de-procesos-tecnicos', label: 'Dirección de Procesos Técnicos' },
  { value: 'direccion-del-centro-nacional-de-preservacion-documental', label: 'Dirección del Centro NAcional de Preservación Documental' },
];

const DIVISIONS_BY_DEPARTMENT: Record<string, { value: string; label: string }[]> = {
  'Administración': [
    { value: 'Nómina', label: 'Nómina' },
    { value: 'Compras', label: 'Compras' },
    { value: 'Servicios Generales', label: 'Servicios Generales' },
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
  'Recursos Humanos': [
    { value: 'Selección de Personal', label: 'Selección de Personal' },
    { value: 'Capacitación', label: 'Capacitación' },
    { value: 'Bienestar Social', label: 'Bienestar Social' },
  ],
  'oficina-de-tecnologia-de-la-informacion': [
    { value: 'sistemas', label: 'Sistemas' },
    { value: 'atencion-tecnologica', label: 'Atención Técnologica' },
  ],
  'oficina-de-mantenimiento-de-servicios-generales': [
    { value: 'servicios-internos', label: 'Servicios Internos' },
    { value: 'servicios-contratados', label: 'Servicios Contratados' },
    { value: 'equipos-y-sistemas', label: 'Equipos y Sistemas' },
  'Contabilidad': [
    { value: 'Cuentas por Pagar', label: 'Cuentas por Pagar' },
    { value: 'Cuentas por Cobrar', label: 'Cuentas por Cobrar' },
    { value: 'Estados Financieros', label: 'Estados Financieros' },
    { value: 'tecnologia-de-seguridad', label: 'Técnologia de Seguridad' },
  'Operaciones': [
    { value: 'Atención al Cliente', label: 'Atención al Cliente' },
    { value: 'Caja', label: 'Caja' },
    { value: 'Mesa de Dinero', label: 'Mesa de Dinero' },
    { value: 'programacion-y-promocion', label: 'Programación y Promoción' },
  'Créditos': [
    { value: 'Crédito Comercial', label: 'Crédito Comercial' },
    { value: 'Crédito Personal', label: 'Crédito Personal' },
    { value: 'Crédito Hipotecario', label: 'Crédito Hipotecario' },
    { value: 'Crédito Vehicular', label: 'Crédito Vehicular' },
    { value: 'desarrollo-de-servicios-especiales-de-informacion', label: 'Desarrollo de Servicios Especiales de Información' },
  'Captaciones': [
    { value: 'Cuentas Corrientes', label: 'Cuentas Corrientes' },
    { value: 'Cuentas de Ahorro', label: 'Cuentas de Ahorro' },
    { value: 'Depósitos a Plazo', label: 'Depósitos a Plazo' },
  'direccion-de-orientacion-y-referencia': [
  'Tesorería': [
    { value: 'Flujo de Caja', label: 'Flujo de Caja' },
    { value: 'Inversiones', label: 'Inversiones' },
    { value: 'Cambio de Divisas', label: 'Cambio de Divisas' },
    { value: 'coleccion-tulio-febres-cordero', label: 'Colección Tulio Febres Cordero (Mérida)' },
  'Auditoría': [
    { value: 'Auditoría Interna', label: 'Auditoría Interna' },
    { value: 'Control de Riesgos', label: 'Control de Riesgos' },
    { value: 'Cumplimiento', label: 'Cumplimiento' },
    { value: 'coleccion-obras-planas', label: 'Colección Obras Planas' },
  'Legal': [
    { value: 'Asesoría Jurídica', label: 'Asesoría Jurídica' },
    { value: 'Contratos', label: 'Contratos' },
    { value: 'Litigios', label: 'Litigios' },
  'direccion-de-redes-estatales-de-bibliotecas-publicas': [
  'Marketing': [
    { value: 'Publicidad', label: 'Publicidad' },
    { value: 'Promociones', label: 'Promociones' },
    { value: 'Relaciones Públicas', label: 'Relaciones Públicas' },
    { value: 'adquisiciones', label: 'Adquisiciones' },
  'Sistemas': [
  'Correo Institucional': [
    { value: 'Creación de Nuevo Correo', label: 'Creación de Nuevo Correo' },
    { value: 'Recuperación de Contraseña', label: 'Recuperación de Contraseña' },
    { value: 'Configuración Outlook', label: 'Configuración Outlook' },
    { value: 'Problemas de Envío', label: 'Problemas de Envío' },
    { value: 'Seguridad Física', label: 'Seguridad Física' },
  'Sistema Bancario': [
    { value: 'Core Bancario', label: 'Core Bancario' },
    { value: 'Cajeros Automáticos', label: 'Cajeros Automáticos' },
    { value: 'POS', label: 'POS' },
    { value: 'Banca Online', label: 'Banca Online' },
    { value: 'Banca Móvil', label: 'Banca Móvil' },
    { value: 'Relaciones Institucionales', label: 'Relaciones Institucionales' },
  'Soporte Técnico General': [
    { value: 'Hardware', label: 'Hardware' },
    { value: 'Software', label: 'Software' },
    { value: 'Impresoras', label: 'Impresoras' },
    { value: 'Periféricos', label: 'Periféricos' },
  { value: 'Sistema Bancario', label: 'Sistema Bancario' },
  'Instalación de Software': [
    { value: 'Microsoft Office', label: 'Microsoft Office' },
    { value: 'Antivirus', label: 'Antivirus' },
    { value: 'Aplicaciones Bancarias', label: 'Aplicaciones Bancarias' },
    { value: 'Navegadores', label: 'Navegadores' },
  { value: 'Respaldo de Datos', label: 'Respaldo de Datos' },
  'Configuración de Equipos': [
    { value: 'Computadoras', label: 'Computadoras' },
    { value: 'Laptops', label: 'Laptops' },
    { value: 'Tablets', label: 'Tablets' },
    { value: 'Teléfonos', label: 'Teléfonos' },
  ],
  'Problemas de Red': [
    { value: 'Conectividad', label: 'Conectividad' },
    { value: 'WiFi', label: 'WiFi' },
    { value: 'Ethernet', label: 'Ethernet' },
    { value: 'VPN', label: 'VPN' },
    { value: 'compras', label: 'Compras' },
  'Acceso a Sistemas': [
    { value: 'Permisos de Usuario', label: 'Permisos de Usuario' },
    { value: 'Reseteo de Contraseña', label: 'Reseteo de Contraseña' },
    { value: 'Activación de Cuenta', label: 'Activación de Cuenta' },
    { value: 'Desbloqueo de Cuenta', label: 'Desbloqueo de Cuenta' },
  'wordpress': [
  'Respaldo de Datos': [
    { value: 'Backup de Archivos', label: 'Backup de Archivos' },
    { value: 'Restauración de Datos', label: 'Restauración de Datos' },
    { value: 'Migración de Datos', label: 'Migración de Datos' },
    { value: 'intranet', label: 'Intranet' },
  'Mantenimiento Preventivo': [
    { value: 'Limpieza de Equipos', label: 'Limpieza de Equipos' },
    { value: 'Actualización de Sistema', label: 'Actualización de Sistema' },
    { value: 'Revisión de Hardware', label: 'Revisión de Hardware' },
  'intranet': [
  'Seguridad Informática': [
    { value: 'Análisis de Malware', label: 'Análisis de Malware' },
    { value: 'Configuración de Firewall', label: 'Configuración de Firewall' },
    { value: 'Políticas de Seguridad', label: 'Políticas de Seguridad' },
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