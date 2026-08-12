import React, { useRef } from 'react';
import { ToggleCard } from '../ui/ToggleCard';
import { BaseInput } from '../ui/BaseInput';
import { BaseSelect } from '../ui/BaseSelect';
import { Camera, X } from 'lucide-react';
import { SignaturePad } from '../ui/SignaturePad';

interface FinalEvaluationProps {
  data: any;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function FinalEvaluation({ data, onChange, errors = {} }: FinalEvaluationProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleArrayItem = (field: string, item: string) => {
    const current = data[field] || [];
    if (current.includes(item)) {
      onChange(field, current.filter((i: string) => i !== item));
    } else {
      onChange(field, [...current, item]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentPhotos = data.photos || [];
    const availableSlots = 4 - currentPhotos.length;
    
    if (availableSlots <= 0) {
      alert("Solo se permite un máximo de 4 fotografías.");
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);



    // To prevent race conditions with multiple files in a single event, we read all at once:
    Promise.all(filesToProcess.map(file => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    }))).then(base64Photos => {
      const updatedPhotos = [...(data.photos || []), ...base64Photos];
      // Max 4 again just in case
      onChange('photos', updatedPhotos.slice(0, 4));
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...(data.photos || [])];
    newPhotos.splice(index, 1);
    onChange('photos', newPhotos);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-200 p-4 sm:p-6 mb-6">
      <h2 className="text-xl font-bold text-surface-900 mb-6">Evaluación Final y Recomendaciones</h2>

      {/* 1. Recomendaciones y Medidas de Seguridad */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-surface-800 mb-4 pb-2 border-b border-surface-100">Recomendaciones y Medidas</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-surface-900 mb-2">Visita especializada por:</label>
          <div className="grid grid-cols-2 gap-2">
            {['Geotécnico', 'Estructural', 'No requiere', 'Otro'].map(visit => (
              <ToggleCard
                key={visit}
                label={visit}
                isActive={(data.specializedVisits || []).includes(visit)}
                onClick={() => toggleArrayItem('specializedVisits', visit)}
                activeColorClass="bg-primary-600 text-white border-primary-600"
                error={!!errors.specializedVisits}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-surface-900 mb-2">Medidas de seguridad:</label>
          <div className="grid grid-cols-2 gap-2">
            {['Evacuar', 'Apuntalar', 'Demoler', 'Restringir acceso', 'Cubrir', 'Ninguna'].map(measure => (
              <ToggleCard
                key={measure}
                label={measure}
                isActive={(data.securityMeasures || []).includes(measure)}
                onClick={() => toggleArrayItem('securityMeasures', measure)}
                activeColorClass="bg-red-600 text-white border-red-600"
                error={!!errors.securityMeasures}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-surface-900 mb-2">Especifique lugares de la edificación:</label>
          <textarea
            className={`w-full rounded-xl border ${errors.restrictedAreas ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' : 'border-surface-300'} px-4 py-3 min-h-[80px] transition-all`}
            value={data.restrictedAreas || ''}
            onChange={(e) => onChange('restrictedAreas', e.target.value)}
          />
          {errors.restrictedAreas && <span className="text-sm text-red-500 mt-1 block">{errors.restrictedAreas}</span>}
        </div>
      </div>

      <div className={`mb-8 p-4 rounded-xl border ${errors.photos ? 'border-red-500 bg-red-50' : 'bg-surface-50 border-surface-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 pb-2 border-b ${errors.photos ? 'text-red-800 border-red-200' : 'text-surface-800 border-surface-100'}`}>Evidencia Fotográfica</h3>
        {errors.photos && <span className="text-sm text-red-600 mb-4 block">Requerido (mínimo 1 fotografía)</span>}
        <input type="file" accept="image/*" capture="environment" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={(data.photos || []).length >= 4} className="w-full flex items-center justify-center gap-2 bg-white border border-surface-300 rounded-xl py-4 font-medium hover:bg-surface-50 transition-colors">
          <Camera className="w-5 h-5" /> Capturar Fotografía
        </button>
        {(data.photos || []).length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {(data.photos || []).map((photo: string, index: number) => (
              <div key={index} className="relative aspect-video rounded-xl overflow-hidden">
                <img src={photo} alt={`Evidencia ${index + 1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removePhoto(index)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5"><X className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8 bg-surface-50 p-4 rounded-xl border border-surface-200">
        <h3 className="text-lg font-semibold text-surface-800 mb-4 pb-2 border-b border-surface-100">3. Condiciones Pre-existentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect label="Calidad de la construcción" options={[{value:'', label:'Seleccione...'}, {value:'Buena', label:'Buena'}, {value:'Regular', label:'Regular'}, {value:'Mala', label:'Mala'}]} value={data.qualityCondition} onChange={(e) => onChange('qualityCondition', e.target.value)} error={errors.qualityCondition} />
          <BaseSelect label="Configuración en planta" options={[{value:'', label:'Seleccione...'}, {value:'Regular', label:'Regular'}, {value:'Irregular', label:'Irregular'}]} value={data.planConfigurationCondition} onChange={(e) => onChange('planConfigurationCondition', e.target.value)} error={errors.planConfigurationCondition} />
          <BaseSelect label="Condición de altura" options={[{value:'', label:'Seleccione...'}, {value:'Regular', label:'Regular'}, {value:'Irregular', label:'Irregular'}]} value={data.heightCondition} onChange={(e) => onChange('heightCondition', e.target.value)} error={errors.heightCondition} />
          <BaseSelect label="Condición estructural" options={[{value:'', label:'Seleccione...'}, {value:'Buena', label:'Buena'}, {value:'Regular', label:'Regular'}, {value:'Mala', label:'Mala'}]} value={data.structuralCondition} onChange={(e) => onChange('structuralCondition', e.target.value)} error={errors.structuralCondition} />
          <BaseSelect label="Daños por sismos anteriores" options={[{value:'', label:'Seleccione...'}, {value:'1', label:'1. Si'}, {value:'2', label:'2. No'}, {value:'3', label:'3. No se sabe'}]} value={data.previousEarthquakeDamage} onChange={(e) => onChange('previousEarthquakeDamage', e.target.value)} error={errors.previousEarthquakeDamage} />
          <BaseSelect label="¿Hubo reparación?" options={[{value:'', label:'Seleccione...'}, {value:'1', label:'1. Si'}, {value:'2', label:'2. No'}, {value:'3', label:'3. No se sabe'}]} value={data.wasRepaired} onChange={(e) => onChange('wasRepaired', e.target.value)} error={errors.wasRepaired} />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-surface-800 mb-4 pb-2 border-b border-surface-100">4. Efecto en Ocupantes y Ocupación</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-surface-900 mb-2">¿Hubo muertos o heridos?</label>
          <div className="grid grid-cols-3 gap-2">
            <ToggleCard label="1. Si" isActive={data.hasCasualties === '2'} onClick={() => onChange('hasCasualties', '2')} error={!!errors.hasCasualties} />
            <ToggleCard label="2. No" isActive={data.hasCasualties === '1'} onClick={() => onChange('hasCasualties', '1')} error={!!errors.hasCasualties} />
            <ToggleCard label="3. N/S" isActive={data.hasCasualties === '3'} onClick={() => onChange('hasCasualties', '3')} error={!!errors.hasCasualties} />
          </div>
          {data.hasCasualties === '2' && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <BaseInput label="Personas fallecidas" type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={data.deceasedCount} onChange={(e) => onChange('deceasedCount', e.target.value)} error={errors.deceasedCount} />
              <BaseInput label="Número de heridos" type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={data.injuredCount} onChange={(e) => onChange('injuredCount', e.target.value)} error={errors.injuredCount} />
            </div>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-surface-900 mb-2">¿La edificación está habitada?</label>
          <div className="grid grid-cols-3 gap-2">
            <ToggleCard label="1. Si" isActive={data.isInhabited === '1'} onClick={() => onChange('isInhabited', '1')} error={!!errors.isInhabited} />
            <ToggleCard label="2. No" isActive={data.isInhabited === '2'} onClick={() => onChange('isInhabited', '2')} error={!!errors.isInhabited} />
            <ToggleCard label="3. N/S" isActive={data.isInhabited === '3'} onClick={() => onChange('isInhabited', '3')} error={!!errors.isInhabited} />
          </div>
          {data.isInhabited === '1' && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <BaseInput label="Unidades existentes" type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={data.existingUnits} onChange={(e) => onChange('existingUnits', e.target.value)} error={errors.existingUnits} />
              <BaseInput label="Unidades no habitables" type="number" min="0" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={data.uninhabitableUnits} onChange={(e) => onChange('uninhabitableUnits', e.target.value)} error={errors.uninhabitableUnits} />
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 bg-surface-50 p-4 sm:p-6 rounded-xl border border-surface-200">
        <h3 className="text-lg font-bold text-surface-900 mb-4">Contacto y Comentarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput label="Persona de contacto" type="text" value={data.contactName} onChange={(e) => onChange('contactName', e.target.value)} error={errors.contactName} />
          <BaseInput label="Teléfono de contacto" type="tel" value={data.contactPhone} onChange={(e) => onChange('contactPhone', e.target.value)} error={errors.contactPhone} />
        </div>
        <div className="mb-6 mt-4">
          <label className="block text-sm font-medium text-surface-900 mb-2">Comentarios:</label>
          <textarea className={`w-full rounded-xl border ${errors.comments ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/20' : 'border-surface-300'} px-4 py-3 min-h-[100px] transition-all`} value={data.comments || ''} onChange={(e) => onChange('comments', e.target.value)} />
          {errors.comments && <span className="text-sm text-red-500 mt-1 block">{errors.comments}</span>}
        </div>
        <div className="border-t border-surface-200 pt-6 mt-6">
          <h4 className="text-sm font-bold text-surface-900 mb-4">INSPECTORES</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <BaseInput label="Código de la comisión:" type="text" value={data.commissionCode} onChange={(e) => onChange('commissionCode', e.target.value)} error={errors.commissionCode} />
              <p className="text-xs text-surface-500 mt-1">Nota: Si no lo conoce, escriba "NA".</p>
            </div>
            <BaseInput label="Nombre del líder:" type="text" value={data.commissionLeaderName} onChange={(e) => onChange('commissionLeaderName', e.target.value)} error={errors.commissionLeaderName} />
            <BaseInput label="No de Evaluadores:" type="number" min="1" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={data.evaluatorsCount} onChange={(e) => onChange('evaluatorsCount', e.target.value)} error={errors.evaluatorsCount} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-surface-900 mb-2">Firma:</label>
            <div className={`border rounded-xl bg-white overflow-hidden ${errors.inspectorSignature ? 'border-red-500' : 'border-surface-200'}`}>
              <SignaturePad onChange={(sig) => onChange('inspectorSignature', sig)} />
            </div>
            {errors.inspectorSignature && <span className="text-sm text-red-500 mt-1 block">La firma es obligatoria</span>}
          </div>
          <h4 className="text-sm font-bold text-surface-900 mb-4">FECHA DE INSPECCIÓN</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <BaseInput label="Día" type="number" min="1" max="31" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={data.inspectionDay} onChange={(e) => onChange('inspectionDay', e.target.value)} error={errors.inspectionDay} />
            <BaseInput label="Mes" type="number" min="1" max="12" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={data.inspectionMonth} onChange={(e) => onChange('inspectionMonth', e.target.value)} error={errors.inspectionMonth} />
            <BaseInput label="Año" type="number" min="2020" onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} value={data.inspectionYear} onChange={(e) => onChange('inspectionYear', e.target.value)} error={errors.inspectionYear} />
            <BaseInput label="Hora" type="time" value={data.inspectionTime} onChange={(e) => onChange('inspectionTime', e.target.value)} error={errors.inspectionTime} />
          </div>
        </div>
      </div>
    </div>
  );
}
