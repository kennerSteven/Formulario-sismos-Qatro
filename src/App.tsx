import { useState } from 'react';
import { FormHeader } from './components/form/FormHeader';
import { HabitabilityStatus } from './components/form/HabitabilityStatus';
import { BuildingIdentification } from './components/form/BuildingIdentification';
import { StructureDescription } from './components/form/StructureDescription';
import { BaseButton } from './components/ui/BaseButton';
import { Save } from 'lucide-react';
import { STRUCTURAL_SYSTEMS, FLOOR_TYPES, CONSTRUCTION_YEARS } from './data/dictionaries';

function App() {
  const [formData, setFormData] = useState({
    // Header
    formNumber: '',
    locality: '',
    neighborhoodName: '',
    cadastralBarrio: '',
    cadastralManzana: '',
    cadastralPredio: '',
    cadastralConstruccion: '',
    
    // Habitability
    inspectionType: '',
    habitability: '',
  
    // Building Identification
    addressCarrera: '',
    addressCalle: '',
    addressTransv: '',
    addressDiag: '',
    addressAvda: '',
    addressOtro: '',
    addressNumero: '',
    buildingName: '',
    predominantUse: '',
    buildingUse: '',
    groundFloorUse: '',
    levelsAboveGround: '',
    basements: '',
    frontMeters: '',
    depthMeters: '',
  
    // Structure Description
    structuralSystemId: '',
    floorTypeId: '',
    constructionYearId: ''
  });

  const handleFieldChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAndExport = () => {
    // Cruce interno de datos con el diccionario
    const exportData = {
      ...formData,
      _structuralSystemLabel: STRUCTURAL_SYSTEMS.find(s => s.id.toString() === formData.structuralSystemId)?.label || '',
      _floorTypeLabel: FLOOR_TYPES.find(f => f.id.toString() === formData.floorTypeId)?.label || '',
      _constructionYearLabel: CONSTRUCTION_YEARS.find(y => y.id.toString() === formData.constructionYearId)?.label || '',
    };
    console.log('--- DATOS DEL FORMULARIO ---');
    console.log(JSON.stringify(exportData, null, 2));
    alert('Datos guardados y exportados. Revisa la consola para ver el JSON cruzado con el diccionario.');
  };

  return (
    <div className="min-h-screen bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto flex flex-col gap-6">
        <header className="mb-4 text-center">
          <h1 className="text-3xl font-extrabold text-surface-900 tracking-tight">Inspección Post-Sismo</h1>
          <p className="mt-2 text-surface-500">Formulario técnico de evaluación de edificaciones</p>
        </header>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          <FormHeader data={formData} onChange={handleFieldChange} />
          
          <HabitabilityStatus data={formData} onChange={handleFieldChange} />
          
          <BuildingIdentification data={formData} onChange={handleFieldChange} />
          
          <StructureDescription data={formData} onChange={handleFieldChange} />

          <div className="mt-8 pt-6 border-t border-surface-200">
            <BaseButton 
              type="button" 
              onClick={handleSaveAndExport}
              fullWidth
              className="py-4 text-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Guardar y Exportar
            </BaseButton>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
