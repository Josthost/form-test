import { FormData, FormErrors } from '../types/formTypes';

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate department
  if (!data.department.trim()) {
    errors.department = 'El departamento es requerido';
  }

  // Validate division
  if (!data.division.trim()) {
    errors.division = 'La división es requerida';
  }

  // Validate email
  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ingrese un correo electrónico válido';
  }

  // Validate support area
  if (!data.supportArea) {
    errors.supportArea = 'El área de soporte es requerida';
  }

  // Validate support type
  if (!data.supportType.trim()) {
    errors.supportType = 'El tipo de soporte es requerido';
  } else if (data.supportType.trim().length > 50) {
    errors.supportType = 'El tipo de soporte no puede exceder 50 caracteres';
  }

  // Validate description
  if (!data.description.trim()) {
    errors.description = 'La descripción es requerida';
  } else if (data.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }

  return errors;
};