import { BaseInput } from '../ui/BaseInput';
import { BaseSelect } from '../ui/BaseSelect';

interface BuildingIdentificationProps {
  data: {
    addressCarrera: string;
    addressCalle: string;
    addressTransv: string;
    addressDiag: string;
    addressAvda: string;
    addressOtro: string;
    addressNumero: string;
    buildingName: string;
    predominantUse: string;
    buildingUse: string;
    groundFloorUse: string;
    levelsAboveGround: string;
    basements: string;
    frontMeters: string;
    depthMeters: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

const predominantUses = [
  { value: '', label: 'Seleccionar...' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'oficinas', label: 'Oficinas' },
  { value: 'institucional', label: 'Institucional' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'salud', label: 'Salud' },
  { value: 'educacion', label: 'Educación' },
  { value: 'recreacion', label: 'Recreación' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'religioso', label: 'Religioso' },
  { value: 'otros', label: 'Otros' },
];

export function BuildingIdentification({ data, onChange, errors = {} }: BuildingIdentificationProps) {
  const levelsAbove = Number(data.levelsAboveGround) || 0;
  const basements = Number(data.basements) || 0;
  const totalLevels = levelsAbove + basements;

  // Lógica de bloqueo cruzado
  const isAnyStreetTypeSelected = [
    data.addressCarrera,
    data.addressCalle,
    data.addressTransv,
    data.addressDiag,
    data.addressAvda,
    data.addressOtro
  ].some(val => val && val.trim() !== '');

  const isFieldDisabled = (fieldName: keyof typeof data) => {
    if (!isAnyStreetTypeSelected) return false;
    const value = data[fieldName];
    return typeof value === 'string' && value.trim() === '';
  };

  return (
    <section className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-sm border border-surface-100 mt-6">
      <h2 className="text-xl font-bold text-surface-900 border-b border-surface-100 pb-4 mb-2">Identificación de la Edificación</h2>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-surface-600 uppercase tracking-wider">Dirección</h3>
        
        {/* Fila 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BaseInput
            layout="horizontal"
            label="Carrera (K)"
            type="text"
            value={data.addressCarrera}
            onChange={(e) => onChange('addressCarrera', e.target.value)}
            disabled={isFieldDisabled('addressCarrera')}
            error={errors.addressCarrera}
          />
          <BaseInput
            layout="horizontal"
            label="Calle (C)"
            type="text"
            value={data.addressCalle}
            onChange={(e) => onChange('addressCalle', e.target.value)}
            disabled={isFieldDisabled('addressCalle')}
            error={errors.addressCalle}
          />
          <BaseInput
            layout="horizontal"
            label="Transv (TV)"
            type="text"
            value={data.addressTransv}
            onChange={(e) => onChange('addressTransv', e.target.value)}
            disabled={isFieldDisabled('addressTransv')}
            error={errors.addressTransv}
          />
          <BaseInput
            layout="horizontal"
            label="Diag (DG)"
            type="text"
            value={data.addressDiag}
            onChange={(e) => onChange('addressDiag', e.target.value)}
            disabled={isFieldDisabled('addressDiag')}
            error={errors.addressDiag}
          />
        </div>

        {/* Fila 2 */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          <div className="col-span-1 md:col-span-4">
            <BaseInput
              layout="horizontal"
              label="Avda (AV)"
              type="text"
              value={data.addressAvda}
              onChange={(e) => onChange('addressAvda', e.target.value)}
              disabled={isFieldDisabled('addressAvda')}
              error={errors.addressAvda}
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <BaseInput
              layout="horizontal"
              label="Otro"
              type="text"
              value={data.addressOtro}
              onChange={(e) => onChange('addressOtro', e.target.value)}
              disabled={isFieldDisabled('addressOtro')}
              error={errors.addressOtro}
            />
          </div>
          <div className="col-span-2 md:col-span-5">
            <BaseInput
              layout="horizontal"
              label="No."
              type="text"
              value={data.addressNumero}
              onChange={(e) => onChange('addressNumero', e.target.value)}
              error={errors.addressNumero}
            />
          </div>
        </div>

        <BaseInput
          label="Nombre de la Edificación"
          type="text"
          value={data.buildingName}
          onChange={(e) => onChange('buildingName', e.target.value)}
          className="mt-2"
          error={errors.buildingName}
        />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-sm font-semibold text-surface-600 uppercase tracking-wider">Uso Predominante</h3>
        <BaseSelect
          label="Principal"
          options={predominantUses}
          value={data.predominantUse}
          onChange={(e) => onChange('predominantUse', e.target.value)}
          error={errors.predominantUse}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseInput
            label="De la edificación"
            type="text"
            value={data.buildingUse}
            onChange={(e) => onChange('buildingUse', e.target.value)}
            error={errors.buildingUse}
          />
          <BaseInput
            label="De la Planta Baja"
            type="text"
            value={data.groundFloorUse}
            onChange={(e) => onChange('groundFloorUse', e.target.value)}
            error={errors.groundFloorUse}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-sm font-semibold text-surface-600 uppercase tracking-wider">Métricas</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <BaseInput
            label="Niveles s. terreno"
            type="number"
            min="0"
            value={data.levelsAboveGround}
            onChange={(e) => onChange('levelsAboveGround', e.target.value)}
            error={errors.levelsAboveGround}
          />
          <BaseInput
            label="Sótanos"
            type="number"
            min="0"
            value={data.basements}
            onChange={(e) => onChange('basements', e.target.value)}
            error={errors.basements}
          />
          <BaseInput
            label="Total"
            type="number"
            value={totalLevels}
            readOnly
            className="bg-surface-50 text-surface-500 font-bold pointer-events-none"
          />
          <BaseInput
            label="Frente (m)"
            type="number"
            min="0"
            step="0.01"
            value={data.frontMeters}
            onChange={(e) => onChange('frontMeters', e.target.value)}
            error={errors.frontMeters}
          />
          <BaseInput
            label="Fondo (m)"
            type="number"
            min="0"
            step="0.01"
            value={data.depthMeters}
            onChange={(e) => onChange('depthMeters', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
