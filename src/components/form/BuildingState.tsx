import { useEffect } from 'react';
import { ToggleCard } from '../ui/ToggleCard';
import { BaseInput } from '../ui/BaseInput';
import { BaseSelect } from '../ui/BaseSelect';

interface BuildingStateProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function BuildingState({ data, onChange, errors = {} }: BuildingStateProps) {
  // Auto-suggestion for damageClassification
  useEffect(() => {
    const severities = [
      data.facadeDamage,
      data.stairsDamage,
      data.roofDamage,
      data.flooringDamage,
      data.interiorWallsDamage,
      data.installationsDamage,
      data.glassDamage
    ].map(Number).filter(v => !isNaN(v) && v > 0);
    
    if (severities.length > 0) {
      const maxSeverity = Math.max(...severities);
      if (!data.damageClassification || Number(data.damageClassification) < maxSeverity) {
         onChange('damageClassification', maxSeverity.toString());
      }
    }
  }, [
    data.facadeDamage,
    data.stairsDamage,
    data.roofDamage,
    data.flooringDamage,
    data.interiorWallsDamage,
    data.installationsDamage,
    data.glassDamage
  ]);

  const YesNoUnknown = ({ label, field, value }: { label: string, field: string, value: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-surface-900 mb-2">{label}</label>
      <div className="grid grid-cols-3 gap-2">
        {['1', '2', '3'].map((option) => (
          <ToggleCard
            key={option}
            label={option === '1' ? '1. Si' : option === '2' ? '2. No' : '3. No se pudo determinar'}
            isActive={value === option}
            onClick={() => onChange(field, option)}
            className="text-xs sm:text-sm py-2 px-1 flex items-center justify-center min-h-[3rem]"
            error={errors?.[field]}
          />
        ))}
      </div>
    </div>
  );

  const SeverityScale = ({ label, field, value }: { label: string, field: string, value: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-surface-900 mb-2">{label}</label>
      <div className="grid grid-cols-5 gap-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <ToggleCard
            key={num}
            label={num.toString()}
            isActive={value === num.toString()}
            onClick={() => onChange(field, num.toString())}
            className="text-sm py-2 px-0"
            activeColorClass={
              num === 1 ? 'bg-green-600 text-white border-green-600 ring-2 ring-green-500/20' :
              num === 2 ? 'bg-lime-500 text-white border-lime-500 ring-2 ring-lime-400/20' :
              num === 3 ? 'bg-yellow-500 text-white border-yellow-500 ring-2 ring-yellow-400/20' :
              num === 4 ? 'bg-orange-500 text-white border-orange-500 ring-2 ring-orange-400/20' :
              'bg-red-600 text-white border-red-600 ring-2 ring-red-500/20'
            }
            error={errors?.[field]}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-surface-500 mt-1 px-1">
        <span>Ninguno</span>
        <span>Severo</span>
      </div>
    </div>
  );

  const handleStructuralChange = (element: string, level: string, val: string) => {
    const current = data[element] || {};
    onChange(element, { ...current, [level]: val });
  };

  const StructuralCard = ({ title, field }: { title: string, field: string }) => {
    const values = data[field] || { none: '', slight: '', moderate: '', severe: '', verySevere: '' };
    return (
      <div className="border border-surface-200 p-3 sm:p-4 rounded-xl mb-4 bg-white shadow-sm">
        <h4 className="font-semibold text-surface-900 mb-3">{title}</h4>
        <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center text-[10px] sm:text-xs font-medium text-surface-600 mb-2">
          <div>1. Ninguno</div>
          <div>2. Leve</div>
          <div>3. Moderado</div>
          <div>4. Fuerte</div>
          <div>5. Severo</div>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          <BaseInput type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={values.none} onChange={(e) => handleStructuralChange(field, 'none', e.target.value)} placeholder="%" className="text-center px-0 sm:px-1 py-3 text-sm" error={errors?.[field] ? ' ' : undefined} />
          <BaseInput type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={values.slight} onChange={(e) => handleStructuralChange(field, 'slight', e.target.value)} placeholder="%" className="text-center px-0 sm:px-1 py-3 text-sm" error={errors?.[field] ? ' ' : undefined} />
          <BaseInput type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={values.moderate} onChange={(e) => handleStructuralChange(field, 'moderate', e.target.value)} placeholder="%" className="text-center px-0 sm:px-1 py-3 text-sm" error={errors?.[field] ? ' ' : undefined} />
          <BaseInput type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={values.severe} onChange={(e) => handleStructuralChange(field, 'severe', e.target.value)} placeholder="%" className="text-center px-0 sm:px-1 py-3 text-sm" error={errors?.[field] ? ' ' : undefined} />
          <BaseInput type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={values.verySevere} onChange={(e) => handleStructuralChange(field, 'verySevere', e.target.value)} placeholder="%" className="text-center px-0 sm:px-1 py-3 text-sm" error={errors?.[field] ? ' ' : undefined} />
        </div>
      </div>
    );
  };

  const toggleInstallationType = (type: string) => {
    const current = data.installationsTypes || [];
    if (current.includes(type)) {
      onChange('installationsTypes', current.filter((t: string) => t !== type));
    } else {
      onChange('installationsTypes', [...current, type]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-4 sm:p-6 mb-6">
      <h2 className="text-xl font-bold text-surface-900 mb-6">Estado de la Edificación</h2>

      {/* Geotécnicos 1-3 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-surface-800 mb-4 pb-2 border-b border-surface-100">Estado General y Problemas Geotécnicos</h3>
        <YesNoUnknown label="1. ¿Colapso o daño severo?" field="collapseState" value={data.collapseState} />
        <YesNoUnknown label="2. ¿Desviación de la vertical o asentamiento?" field="deviationState" value={data.deviationState} />
        <YesNoUnknown label="3. ¿Falla visible de la cimentación?" field="foundationFailureState" value={data.foundationFailureState} />
      </div>

      {/* Arquitectónicos 4-10 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-surface-800 mb-4 pb-2 border-b border-surface-100">Daños en Elementos Arquitectónicos</h3>
        <SeverityScale label="4. Muros de fachadas" field="facadeDamage" value={data.facadeDamage} />
        <SeverityScale label="5. Escaleras" field="stairsDamage" value={data.stairsDamage} />
        <SeverityScale label="6. Cubiertas" field="roofDamage" value={data.roofDamage} />
        <SeverityScale label="7. Pisos" field="flooringDamage" value={data.flooringDamage} />
        <SeverityScale label="8. Muros divisorios" field="interiorWallsDamage" value={data.interiorWallsDamage} />
        
        <div className="mb-4 bg-surface-50 p-4 rounded-xl border border-surface-200">
          <label className="block text-sm font-medium text-surface-900 mb-3">9. Instalaciones</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {['Acueducto', 'Alcantarillado', 'Energía', 'Gas'].map(type => (
              <ToggleCard
                key={type}
                label={type}
                isActive={(data.installationsTypes || []).includes(type)}
                onClick={() => toggleInstallationType(type)}
                className="text-sm py-2"
                activeColorClass="bg-primary-100 text-primary-800 border-primary-500 ring-2 ring-primary-500/20"
                error={errors.installationsTypes}
              />
            ))}
          </div>
          <SeverityScale label="Severidad de Instalaciones" field="installationsDamage" value={data.installationsDamage} />
        </div>

        <SeverityScale label="10. Vidrios" field="glassDamage" value={data.glassDamage} />
      </div>

      {/* Geotécnicos 11-12 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-surface-800 mb-4 pb-2 border-b border-surface-100">Más Problemas Geotécnicos</h3>
        <YesNoUnknown label="11. ¿Falla en talud?" field="slopeFailureState" value={data.slopeFailureState} />
        <YesNoUnknown label="12. ¿Asentamiento en el terreno?" field="settlementState" value={data.settlementState} />
      </div>

      {/* Estructurales 13-16 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-surface-800 mb-4 pb-2 border-b border-surface-100">Daños en Elementos Estructurales (%)</h3>
        
        <div className="mb-6">
          <BaseInput
            label="Indique el nivel de entrepiso con el mayor daño:"
            type="text"
            value={data.highestDamageFloor || ''}
            onChange={(e) => onChange('highestDamageFloor', e.target.value)}
            placeholder="Ej: 3, Sótano, etc."
            error={errors.highestDamageFloor}
          />
        </div>

        <StructuralCard title="13. Columnas o muros de carga" field="columnsDamage" />
        <StructuralCard title="14. Vigas" field="beamsDamage" />
        <StructuralCard title="15. Nudos" field="nodesDamage" />
        <StructuralCard title="16. Entrepisos" field="floorsDamage" />
      </div>

      {/* Clasificación Final */}
      <div className="bg-surface-50 p-4 sm:p-6 rounded-xl border border-surface-200">
        <h3 className="text-lg font-bold text-surface-900 mb-4">Clasificación Final</h3>
        
        <BaseSelect
          label="Indique la clasificación del daño según la presente evaluación:"
          value={data.damageClassification || ''}
          onChange={(e) => onChange('damageClassification', e.target.value)}
          options={[
            { value: '', label: 'Seleccione una opción...' },
            { value: '1', label: '1. Ninguno' },
            { value: '2', label: '2. Leve' },
            { value: '3', label: '3. Moderado' },
            { value: '4', label: '4. Fuerte' },
            { value: '5', label: '5. Severo' }
          ]}
          error={errors.damageClassification}
        />

        <div className="mt-6 border-t border-surface-200 pt-6">
          <label className="block text-sm font-medium text-surface-900 mb-3">¿Existe una clasificación previa?</label>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <ToggleCard
              label="Sí"
              isActive={data.hasPreviousClassification === 'Si'}
              onClick={() => onChange('hasPreviousClassification', 'Si')}
              error={errors.hasPreviousClassification}
            />
            <ToggleCard
              label="No"
              isActive={data.hasPreviousClassification === 'No'}
              onClick={() => onChange('hasPreviousClassification', 'No')}
              error={errors.hasPreviousClassification}
            />
          </div>

          {data.hasPreviousClassification === 'Si' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <BaseInput
                label="¿Cuál?"
                type="text"
                value={data.previousClassificationDetail || ''}
                onChange={(e) => onChange('previousClassificationDetail', e.target.value)}
                placeholder="Indique la clasificación previa"
                error={errors.previousClassificationDetail}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
