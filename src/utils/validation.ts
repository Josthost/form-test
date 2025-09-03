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

  // Validate first name
  if (!data.firstName.trim()) {
    errors.firstName = 'El nombre es requerido';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'El nombre debe tener al menos 2 caracteres';
  }

  // Validate last name
  if (!data.lastName.trim()) {
    errors.lastName = 'Los apellidos son requeridos';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Los apellidos deben tener al menos 2 caracteres';
  }

  // Validate ID number
  if (!data.idNumber.trim()) {
    errors.idNumber = 'La cédula de identidad es requerida';
  } else if (!/^[VE]-?\d{7,8}$/i.test(data.idNumber.trim())) {
    errors.idNumber = 'Formato de cédula inválido (Ej: V-12345678 o E-12345678)';
  }

  // Validate email
  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Formato de correo electrónico inválido';
  }

  // Validate position
  if (!data.position.trim()) {
    errors.position = 'El cargo es requerido';
  } else if (data.position.trim().length < 2) {
    errors.position = 'El cargo debe tener al menos 2 caracteres';
  }

  // Validate birth date
  if (!data.birthDate.trim()) {
    errors.birthDate = 'La fecha de nacimiento es requerida';
  } else {
    const birthDate = new Date(data.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18 || age > 100) {
      errors.birthDate = 'La edad debe estar entre 18 y 100 años';
    }
  }

  // Validate service
  if (!data.service) {
    errors.service = 'El servicio es requerido';
  }

  // Validate module
  if (!data.module) {
    errors.module = 'El módulo es requerido';
  }

  // Validate description
  // if (!data.description.trim()) {
  //   errors.description = 'La descripción es requerida';
  // } else if (data.description.trim().length < 10) {
  //   errors.description = 'La descripción debe tener al menos 10 caracteres';
  // }

  return errors;
};