export interface ToggleCardProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  activeColorClass?: string;
  error?: string | boolean;
  className?: string;
}

export function ToggleCard({ 
  label, 
  isActive, 
  onClick, 
  activeColorClass = 'bg-primary-600 text-white border-primary-600', 
  error,
  className = '' 
}: ToggleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-xl border p-4 text-center text-base font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-surface-200 ${
        isActive
          ? activeColorClass
          : error
            ? 'border-red-500 bg-white text-surface-700 hover:border-red-600 hover:bg-red-50'
            : 'border-surface-200 bg-white text-surface-700 hover:border-surface-300 hover:bg-surface-50 hover:shadow-sm'
      } ${className}`}
    >
      {label}
    </button>
  );
}
