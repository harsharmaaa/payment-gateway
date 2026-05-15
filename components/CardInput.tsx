import React from 'react';

interface CardInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | null;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  id?: string;
  disabled?: boolean;
}

export const CardInput: React.FC<CardInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  placeholder,
  maxLength,
  id,
  disabled = false,
}) => {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1">
      <label 
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
        className={`px-4 py-2 border rounded-lg transition-colors ${
          hasError
            ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
            : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      />
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
