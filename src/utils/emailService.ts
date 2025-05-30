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
const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const PUBLIC_KEY = 'your_public_key';

export const sendEmail = async (params: EmailParams): Promise<void> => {
  try {
    const templateParams = {
      department: params.department,
      division: params.division,
      email: params.email,
      supportArea: params.supportArea,
      supportType: params.supportType,
      description: params.description,
    };
    
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};