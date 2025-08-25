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
  maxLength,
  placeholder
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium mb-1"
        style={{ color: '#820000' }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          style={{ 
            focusRingColor: '#820000',
            color: '#8F8967'
          }}
          rows={4}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          style={{ 
            focusRingColor: '#820000',
            color: '#8F8967'
          }}
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
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          style={{ 
            focusRingColor: '#820000',
            color: '#8F8967'
          }}
        />
      )}
      
      {maxLength && type === 'text' && (
        <div className="mt-1 text-xs text-right" style={{ color: '#8F8967' }}>
          {value.length}/{maxLength} caracteres
        </div>
      )}
      
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;