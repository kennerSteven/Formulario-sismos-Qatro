import type { ButtonHTMLAttributes } from 'react';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export function BaseButton({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}: BaseButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-6 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-4 disabled:opacity-70 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500/30 shadow-md shadow-primary-500/20",
    secondary: "bg-surface-200 text-surface-900 hover:bg-surface-300 focus:ring-surface-200/50",
    outline: "border-2 border-surface-200 bg-transparent text-surface-700 hover:bg-surface-50 focus:ring-surface-200/50"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
