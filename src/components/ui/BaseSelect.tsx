import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
}

interface BaseSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export function BaseSelect({ label, options, error, className = '', id, ...props }: BaseSelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-surface-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`appearance-none w-full rounded-xl border border-surface-200 bg-white px-4 py-3.5 pr-10 text-base text-surface-900 transition-all hover:border-surface-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none disabled:bg-surface-100 disabled:text-surface-400 disabled:border-surface-200 disabled:cursor-not-allowed ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
          }`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-surface-500">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
