export interface FormData {
  department: string;
  division: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  service: string;
  description: string;
}

export interface FormErrors {
  department?: string;
  division?: string;
  firstName?: string;
  lastName?: string;
  idNumber?: string;
  service?: string;
  description?: string;
}

export interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  maxLength?: number;
  placeholder?: string;
}