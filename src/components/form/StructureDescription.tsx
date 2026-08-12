import { BaseSelect } from '../ui/BaseSelect';
import { STRUCTURAL_SYSTEMS, FLOOR_TYPES, CONSTRUCTION_YEARS } from '../../data/dictionaries';

interface StructureDescriptionProps {
  data: {
    structuralSystemId: string;
    floorTypeId: string;
    constructionYearId: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function StructureDescription({ data, onChange, errors = {} }: StructureDescriptionProps) {
  
  // Mapeo de diccionarios a formato de opciones para BaseSelect: "id - label"
  const structuralOptions = [
    { value: '', label: 'Seleccionar...' },
    ...STRUCTURAL_SYSTEMS.map(item => ({
      value: item.id.toString(),
      label: `${item.id} - ${item.label}`
    }))
  ];

  const floorOptions = [
    { value: '', label: 'Seleccionar...' },
    ...FLOOR_TYPES.map(item => ({
      value: item.id.toString(),
      label: `${item.id} - ${item.label}`
    }))
  ];

  const yearOptions = [
    { value: '', label: 'Seleccionar...' },
    ...CONSTRUCTION_YEARS.map(item => ({
      value: item.id.toString(),
      label: `${item.id} - ${item.label}`
    }))
  ];

  return (
    <section className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-sm border border-surface-100 mt-6">
      <h2 className="text-xl font-bold text-surface-900 border-b border-surface-100 pb-4 mb-2">Descripción de la Estructura</h2>

      <div className="flex flex-col gap-5">
        <BaseSelect
          label="Sistema Estructural"
          options={structuralOptions}
          value={data.structuralSystemId}
          onChange={(e) => onChange('structuralSystemId', e.target.value)}
          error={errors.structuralSystemId}
        />
        
        <BaseSelect
          label="Tipo de Entrepiso"
          options={floorOptions}
          value={data.floorTypeId}
          onChange={(e) => onChange('floorTypeId', e.target.value)}
          error={errors.floorTypeId}
        />
        
        <BaseSelect
          label="Año de Construcción"
          options={yearOptions}
          value={data.constructionYearId}
          onChange={(e) => onChange('constructionYearId', e.target.value)}
          error={errors.constructionYearId}
        />
      </div>
    </section>
  );
}
