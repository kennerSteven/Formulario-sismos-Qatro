

interface ToggleCardProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  activeColorClass?: string; // e.g. "bg-green-500 text-white border-green-500"
  className?: string;
}

export function ToggleCard({ 
  label, 
  isActive, 
  onClick, 
  activeColorClass = 'bg-primary-600 text-white border-primary-600 ring-4 ring-primary-500/20',
  className = '' 
}: ToggleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-center text-base font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-surface-200 ${
        isActive
          ? activeColorClass
          : 'border-surface-200 bg-white text-surface-700 hover:border-surface-300 hover:bg-surface-50 hover:shadow-sm'
      } ${className}`}
    >
      {label}
    </button>
  );
}
