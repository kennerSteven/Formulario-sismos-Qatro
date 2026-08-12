import React from 'react';
import { BaseInput } from '../ui/BaseInput';
import { MapPin } from 'lucide-react';
import { StaticMap } from '../ui/StaticMap';

interface FormHeaderProps {
  data: {
    formNumber: string;
    locality: string;
    neighborhoodName: string;
    cadastralBarrio: string;
    cadastralManzana: string;
    cadastralPredio: string;
    cadastralConstruccion: string;
    location?: { lat: number; lng: number } | null;
  };
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function FormHeader({ data, onChange, errors = {} }: FormHeaderProps) {
  const [isLocating, setIsLocating] = React.useState(false);
  const [locationError, setLocationError] = React.useState('');

  const handleCaptureLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Tu navegador no soporta geolocalización');
      return;
    }

    setIsLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange('location', {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Permiso denegado. Por favor, permite el acceso a la ubicación.');
        } else {
          setLocationError('Error al obtener la ubicación. Intenta nuevamente.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <section className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-sm border border-surface-100">
      <h2 className="text-xl font-bold text-surface-900 border-b border-surface-100 pb-4 mb-2">Datos Generales</h2>
      
      <BaseInput
        label="Número de Formulario"
        type="text"
        placeholder="Ej. F-001"
        value={data.formNumber}
        onChange={(e) => onChange('formNumber', e.target.value)}
        className="font-bold pointer-events-none opacity-80"
        readOnly
        error={errors.formNumber}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput
          label="Localidad"
          type="text"
          value={data.locality}
          onChange={(e) => onChange('locality', e.target.value)}
          error={errors.locality}
        />
        <BaseInput
          label="Nombre del Barrio"
          type="text"
          value={data.neighborhoodName}
          onChange={(e) => onChange('neighborhoodName', e.target.value)}
          error={errors.neighborhoodName}
        />
      </div>

      <div className="mt-4 p-5 bg-surface-50 rounded-xl border border-surface-200">
        <h3 className="text-sm font-semibold text-surface-600 uppercase tracking-wider mb-2">Identificación Catastral</h3>
        <p className="text-xs text-surface-500 mb-4">Nota: Si no conoce algún dato, escriba "N/A".</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BaseInput
            label="Barrio"
            type="text"
            value={data.cadastralBarrio}
            onChange={(e) => onChange('cadastralBarrio', e.target.value)}
            error={errors.cadastralBarrio}
          />
          <BaseInput
            label="Manzana"
            type="text"
            value={data.cadastralManzana}
            onChange={(e) => onChange('cadastralManzana', e.target.value)}
            error={errors.cadastralManzana}
          />
          <BaseInput
            label="Predio"
            type="text"
            value={data.cadastralPredio}
            onChange={(e) => onChange('cadastralPredio', e.target.value)}
            error={errors.cadastralPredio}
          />
          <BaseInput
            label="Construcción"
            type="text"
            value={data.cadastralConstruccion}
            onChange={(e) => onChange('cadastralConstruccion', e.target.value)}
            error={errors.cadastralConstruccion}
          />
        </div>

        <div className="mt-6 border-t border-surface-200 pt-6">
          <h4 className="text-sm font-semibold text-surface-600 uppercase tracking-wider mb-4">Ubicación (Geolocalización)</h4>
          <button 
            type="button" 
            onClick={handleCaptureLocation} 
            disabled={isLocating}
            className="w-full flex items-center justify-center gap-2 bg-white border border-surface-300 rounded-xl py-4 font-medium hover:bg-surface-50 transition-colors disabled:opacity-50"
          >
            <MapPin className="w-5 h-5" /> 
            {isLocating ? 'Obteniendo coordenadas...' : data.location ? 'Actualizar Ubicación' : 'Capturar Ubicación'}
          </button>
          
          {locationError && <span className="text-sm text-red-600 mt-2 block">{locationError}</span>}
          
          {data.location && (
            <div className="mt-4 bg-white p-3 rounded-xl border border-surface-200 shadow-sm flex flex-col items-center">
              <p className="text-sm font-medium text-surface-700 mb-2">
                Lat: {data.location.lat.toFixed(5)}, Lng: {data.location.lng.toFixed(5)}
              </p>
              <div className="w-full aspect-video rounded-lg overflow-hidden border border-surface-200 bg-surface-100 relative flex items-center justify-center">
                <StaticMap lat={data.location.lat} lng={data.location.lng} zoom={16} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
