import React from 'react';
import { FormFieldProps } from '../types/formTypes';

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  required = false,
  options = [],
  maxLength
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bnv-primary transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bnv-primary transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">-- Seleccionar --</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bnv-primary transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      )}
      
      {maxLength && type === 'text' && (
        <div className="mt-1 text-xs text-gray-500 text-right">
          {value.length}/{maxLength} caracteres
        </div>
      )}
      
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;