
import { ToggleCard } from '../ui/ToggleCard';

interface HabitabilityStatusProps {
  data: {
    inspectionType: string;
    habitability: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function HabitabilityStatus({ data, onChange, errors = {} }: HabitabilityStatusProps) {
  return (
    <section className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-sm border border-surface-100 mt-6">
      <h2 className="text-xl font-bold text-surface-900 border-b border-surface-100 pb-4 mb-2">Estado de Habitabilidad</h2>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-surface-600 uppercase tracking-wider">Tipo de Inspección</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToggleCard
            label="Exterior e interior"
            isActive={data.inspectionType === 'Exterior e interior'}
            onClick={() => onChange('inspectionType', 'Exterior e interior')}
            activeColorClass="bg-primary-600 text-white border-primary-600 ring-4 ring-primary-500/20"
            error={errors.inspectionType}
          />
          <ToggleCard
            label="No se pudo entrar"
            isActive={data.inspectionType === 'No se pudo entrar'}
            onClick={() => onChange('inspectionType', 'No se pudo entrar')}
            activeColorClass="bg-surface-700 text-white border-surface-700 ring-4 ring-surface-700/20"
            error={errors.inspectionType}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-sm font-semibold text-surface-600 uppercase tracking-wider">Evaluación de Habitabilidad</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ToggleCard
            label="Verde"
            isActive={data.habitability === 'Verde'}
            onClick={() => onChange('habitability', 'Verde')}
            activeColorClass="bg-green-500 text-white border-green-500 ring-4 ring-green-500/30 shadow-lg shadow-green-500/20"
            error={errors.habitability}
          />
          <ToggleCard
            label="Amarillo"
            isActive={data.habitability === 'Amarillo'}
            onClick={() => onChange('habitability', 'Amarillo')}
            activeColorClass="bg-yellow-400 text-yellow-900 border-yellow-400 ring-4 ring-yellow-400/30 shadow-lg shadow-yellow-400/20"
            error={errors.habitability}
          />
          <ToggleCard
            label="Naranja"
            isActive={data.habitability === 'Naranja'}
            onClick={() => onChange('habitability', 'Naranja')}
            activeColorClass="bg-orange-500 text-white border-orange-500 ring-4 ring-orange-500/30 shadow-lg shadow-orange-500/20"
            error={errors.habitability}
          />
          <ToggleCard
            label="Rojo"
            isActive={data.habitability === 'Rojo'}
            onClick={() => onChange('habitability', 'Rojo')}
            activeColorClass="bg-red-500 text-white border-red-500 ring-4 ring-red-500/30 shadow-lg shadow-red-500/20"
            error={errors.habitability}
          />
        </div>
      </div>
    </section>
  );
}
