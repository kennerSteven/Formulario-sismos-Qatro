import type { InputHTMLAttributes } from 'react';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  layout?: 'vertical' | 'horizontal';
}

export function BaseInput({ label, error, layout = 'vertical', className = '', id, ...props }: BaseInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const containerClass = layout === 'horizontal' ? 'flex flex-row items-center gap-3' : 'flex flex-col gap-1.5';
  const labelClass = layout === 'horizontal' ? 'text-sm font-medium text-surface-700 whitespace-nowrap' : 'text-sm font-medium text-surface-700';

  return (
    <div className={`${containerClass} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
      )}
      <div className="flex-1 w-full">
        <input
          id={inputId}
          className={`w-full rounded-xl border border-surface-200 bg-white px-4 py-3.5 text-base text-surface-900 transition-all placeholder:text-surface-400 hover:border-surface-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none disabled:bg-surface-100 disabled:text-surface-400 disabled:border-surface-200 disabled:cursor-not-allowed ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
          }`}
          {...props}
        />
        {error && <span className="text-sm text-red-500 mt-1 block">{error}</span>}
      </div>
    </div>
  );
}
