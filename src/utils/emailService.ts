import emailjs from '@emailjs/browser';

interface EmailParams {
  department: string;
  division: string;
  email: string;
  supportArea: string;
  supportType: string;
  description: string;
}

// Replace these with your actual EmailJS credentials
const SERVICE_ID = 'service_s6sylx7';
const TEMPLATE_ID = 'template_41txpt8';
const PUBLIC_KEY = 'KxvsssG3ALdwfNJ2X';

export const sendEmail = async (params: EmailParams): Promise<void> => {
  try {
    const fecha = new Date().toLocaleString();
    const templateParams = {
      department: params.department,
      division: params.division,
      email: params.email,
      supportArea: params.supportArea,
      supportType: params.supportType,
      description: params.description,
      fecha_actual: params.fecha_actual || fecha
    };
    
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
