import emailjs from '@emailjs/browser';

interface EmailParams {
  department: string;
  division: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  service: string;
  description: string;
  fecha_actual?: string;
}

// Configuración de cuentas
const ACCOUNTS = [
  {
    SERVICE_ID: 'service_me8dq26',
    TEMPLATE_ID: 'template_41txpt8',
    PUBLIC_KEY: 'KxvsssG3ALdwfNJ2X'
  },
  {
    SERVICE_ID: 'service_pel282i',
    TEMPLATE_ID: 'template_apkffii',
    PUBLIC_KEY: 'AJTVDc1xSxFvikNN6'
  }
];

// Generar código único (timestamp + 4 caracteres aleatorios)
const generateUniqueCode = (): string => {
  const timestamp = Date.now().toString(36); // Base36 para acortar
  const randomChars = Math.random().toString(36).substring(2, 6); // 4 caracteres aleatorios
  return `TKT-${timestamp}-${randomChars}`.toUpperCase();
};

const trySendEmail = async (params: EmailParams, accountIndex: number): Promise<{code: string, success: boolean}> => {
  const account = ACCOUNTS[accountIndex];
  if (!account) {
    throw new Error('No hay cuentas de correo disponibles');
  }

  const ticketCode = generateUniqueCode();
  
  try {
    const fecha = new Date().toLocaleString();
    const templateParams = {
      ...params,
      fecha_actual: params.fecha_actual || fecha,
      ticket_code: ticketCode // Añadimos el código al correo
    };
    
    await emailjs.send(account.SERVICE_ID, account.TEMPLATE_ID, templateParams, {
      publicKey: account.PUBLIC_KEY,
    });

    return { code: ticketCode, success: true };
    
  } catch (error) {
    console.error(`Error enviando correo con cuenta ${accountIndex}:`, error);
    
    if (isLimitExceededError(error)) {
      console.log(`Límite alcanzado en cuenta ${accountIndex}, intentando con cuenta de respaldo...`);
      return trySendEmail(params, accountIndex + 1);
    }
    
    return { code: ticketCode, success: false };
  }
};

const isLimitExceededError = (error: any): boolean => {
  return error?.status === 429 || 
         error?.message?.includes('limit') || 
         error?.message?.includes('exceeded');
};

// Función pública modificada para retornar el código
export const sendEmail = async (params: EmailParams): Promise<{code: string, success: boolean}> => {
  return trySendEmail(params, 0);
};