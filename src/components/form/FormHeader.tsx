
import { BaseInput } from '../ui/BaseInput';

interface FormHeaderProps {
  data: {
    formNumber: string;
    locality: string;
    neighborhoodName: string;
    cadastralBarrio: string;
    cadastralManzana: string;
    cadastralPredio: string;
    cadastralConstruccion: string;
  };
  onChange: (field: string, value: string) => void;
}

export function FormHeader({ data, onChange }: FormHeaderProps) {
  return (
    <section className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-sm border border-surface-100">
      <h2 className="text-xl font-bold text-surface-900 border-b border-surface-100 pb-4 mb-2">Datos Generales</h2>
      
      <BaseInput
        label="Número de Formulario"
        type="text"
        placeholder="Ej. F-001"
        value={data.formNumber}
        onChange={(e) => onChange('formNumber', e.target.value)}
        className="font-bold"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput
          label="Localidad"
          type="text"
          value={data.locality}
          onChange={(e) => onChange('locality', e.target.value)}
        />
        <BaseInput
          label="Nombre del Barrio"
          type="text"
          value={data.neighborhoodName}
          onChange={(e) => onChange('neighborhoodName', e.target.value)}
        />
      </div>

      <div className="mt-4 p-5 bg-surface-50 rounded-xl border border-surface-200">
        <h3 className="text-sm font-semibold text-surface-600 uppercase tracking-wider mb-4">Identificación Catastral</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BaseInput
            label="Barrio"
            type="number"
            value={data.cadastralBarrio}
            onChange={(e) => onChange('cadastralBarrio', e.target.value)}
          />
          <BaseInput
            label="Manzana"
            type="number"
            value={data.cadastralManzana}
            onChange={(e) => onChange('cadastralManzana', e.target.value)}
          />
          <BaseInput
            label="Predio"
            type="number"
            value={data.cadastralPredio}
            onChange={(e) => onChange('cadastralPredio', e.target.value)}
          />
          <BaseInput
            label="Construcción"
            type="number"
            value={data.cadastralConstruccion}
            onChange={(e) => onChange('cadastralConstruccion', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
