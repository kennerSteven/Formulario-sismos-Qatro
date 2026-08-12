import { useState, useRef } from 'react';
import domtoimage from 'dom-to-image-more';
import { jsPDF } from 'jspdf';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import { Login } from './components/Login';
import { FormHeader } from './components/form/FormHeader';
import { HabitabilityStatus } from './components/form/HabitabilityStatus';
import { BuildingIdentification } from './components/form/BuildingIdentification';
import { StructureDescription } from './components/form/StructureDescription';
import { BuildingState } from './components/form/BuildingState';
import { FinalEvaluation } from './components/form/FinalEvaluation';
import { PrintTemplate } from './components/pdf/PrintTemplate';
import { BaseButton } from './components/ui/BaseButton';
import { AlertCircle, Save, Loader2, Eraser } from 'lucide-react';
import logoUrl from './assets/contro.ico';
import qatroLogoUrl from './assets/Qatro.png';

const getInitialFormData = () => ({
  // Header
  formNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
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
  constructionYearId: '',

  // Building State
  collapseState: '',
  deviationState: '',
  foundationFailureState: '',
  slopeFailureState: '',
  settlementState: '',

  facadeDamage: '',
  stairsDamage: '',
  roofDamage: '',
  flooringDamage: '',
  interiorWallsDamage: '',
  installationsTypes: [] as string[],
  installationsDamage: '',
  glassDamage: '',

  highestDamageFloor: '',
  columnsDamage: { none: '', slight: '', moderate: '', severe: '', verySevere: '' },
  beamsDamage: { none: '', slight: '', moderate: '', severe: '', verySevere: '' },
  nodesDamage: { none: '', slight: '', moderate: '', severe: '', verySevere: '' },
  floorsDamage: { none: '', slight: '', moderate: '', severe: '', verySevere: '' },

  damageClassification: '',
  hasPreviousClassification: '',
  previousClassificationDetail: '',

  // Final Evaluation
  specializedVisits: [] as string[],
  securityMeasures: [] as string[],
  restrictedAreas: '',
  photos: [] as string[],
  location: null as { lat: number; lng: number } | null,

  qualityCondition: '',
  planConfigurationCondition: '',
  heightCondition: '',
  structuralCondition: '',
  previousEarthquakeDamage: '',
  wasRepaired: '',

  hasCasualties: '',
  deceasedCount: '',
  injuredCount: '',
  isInhabited: '',
  existingUnits: '',
  uninhabitableUnits: '',

  contactName: '',
  contactPhone: '',
  comments: '',

  // Inspectores
  commissionCode: '',
  commissionLeaderName: '',
  evaluatorsCount: '',
  inspectorSignature: '', // base64 string

  // Fecha de inspección
  inspectionDay: '',
  inspectionMonth: '',
  inspectionYear: '',
  inspectionTime: ''
});

const flattenPayload = (obj: any, prefix = ''): any => {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? prefix + '_' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k]) && !(obj[k] instanceof Date)) {
      Object.assign(acc, flattenPayload(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

function App() {

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<{ name: string, doc: string } | null>(() => {
    const saved = localStorage.getItem('inspectorUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [formData, setFormData] = useState(() => {
    return getInitialFormData();
  });

  const handleClearForm = () => {
    setFormData(getInitialFormData());
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user types to improve UX
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Header
    if (!formData.formNumber) errors.formNumber = "Requerido";
    if (!formData.locality) errors.locality = "Requerido";
    if (!formData.neighborhoodName) errors.neighborhoodName = "Requerido";
    if (!formData.cadastralBarrio) errors.cadastralBarrio = "Requerido";
    if (!formData.cadastralManzana) errors.cadastralManzana = "Requerido";
    if (!formData.cadastralPredio) errors.cadastralPredio = "Requerido";
    if (!formData.cadastralConstruccion) errors.cadastralConstruccion = "Requerido";

    // Habitability
    if (!formData.inspectionType) errors.inspectionType = "Requerido";
    if (!formData.habitability) errors.habitability = "Requerido";

    // Building Identification
    const isAnyAddressProvided = [
      formData.addressCarrera,
      formData.addressCalle,
      formData.addressTransv,
      formData.addressDiag,
      formData.addressAvda,
      formData.addressOtro
    ].some(val => val && val.trim() !== '');
    if (!isAnyAddressProvided) errors.addressCarrera = "Requerido";
    if (!formData.addressNumero) errors.addressNumero = "Requerido";
    if (!formData.buildingName) errors.buildingName = "Requerido";
    if (!formData.predominantUse) errors.predominantUse = "Requerido";
    if (!formData.buildingUse) errors.buildingUse = "Requerido";
    if (!formData.groundFloorUse) errors.groundFloorUse = "Requerido";
    if (!formData.levelsAboveGround) errors.levelsAboveGround = "Requerido";
    if (!formData.basements) errors.basements = "Requerido";
    if (!formData.frontMeters) errors.frontMeters = "Requerido";
    if (!formData.depthMeters) errors.depthMeters = "Requerido";

    // Structure Description
    if (!formData.structuralSystemId) errors.structuralSystemId = "Requerido";
    if (!formData.floorTypeId) errors.floorTypeId = "Requerido";
    if (!formData.constructionYearId) errors.constructionYearId = "Requerido";

    // Building State - Geotécnicos
    if (!formData.collapseState) errors.collapseState = "Requerido";
    if (!formData.deviationState) errors.deviationState = "Requerido";
    if (!formData.foundationFailureState) errors.foundationFailureState = "Requerido";
    if (!formData.slopeFailureState) errors.slopeFailureState = "Requerido";
    if (!formData.settlementState) errors.settlementState = "Requerido";

    // Arquitectónicos
    if (!formData.facadeDamage) errors.facadeDamage = "Requerido";
    if (!formData.stairsDamage) errors.stairsDamage = "Requerido";
    if (!formData.roofDamage) errors.roofDamage = "Requerido";
    if (!formData.flooringDamage) errors.flooringDamage = "Requerido";
    if (!formData.interiorWallsDamage) errors.interiorWallsDamage = "Requerido";
    if (!formData.glassDamage) errors.glassDamage = "Requerido";

    // Instalaciones
    if (formData.installationsTypes.length === 0) errors.installationsTypes = "Requerido";
    if (!formData.installationsDamage) errors.installationsDamage = "Requerido";

    // Estructurales
    if (!formData.highestDamageFloor) errors.highestDamageFloor = "Requerido";
    const hasValue = (obj: any) => Object.values(obj).some(v => v !== '' && v !== '0');
    if (!hasValue(formData.columnsDamage)) errors.columnsDamage = "Requerido";
    if (!hasValue(formData.beamsDamage)) errors.beamsDamage = "Requerido";
    if (!hasValue(formData.nodesDamage)) errors.nodesDamage = "Requerido";
    if (!hasValue(formData.floorsDamage)) errors.floorsDamage = "Requerido";

    if (!formData.damageClassification) errors.damageClassification = "Requerido";
    if (!formData.hasPreviousClassification) {
      errors.hasPreviousClassification = "Requerido";
    } else if (formData.hasPreviousClassification === 'Si' && !formData.previousClassificationDetail) {
      errors.previousClassificationDetail = "Requerido";
    }

    // Final Evaluation
    if (formData.specializedVisits.length === 0) errors.specializedVisits = "Requerido";
    if (formData.securityMeasures.length === 0) errors.securityMeasures = "Requerido";
    if (!formData.restrictedAreas) errors.restrictedAreas = "Requerido";
    if (formData.photos.length === 0) errors.photos = "Requerido";

    if (!formData.qualityCondition) errors.qualityCondition = "Requerido";
    if (!formData.planConfigurationCondition) errors.planConfigurationCondition = "Requerido";
    if (!formData.heightCondition) errors.heightCondition = "Requerido";
    if (!formData.structuralCondition) errors.structuralCondition = "Requerido";
    if (!formData.previousEarthquakeDamage) errors.previousEarthquakeDamage = "Requerido";
    if (!formData.wasRepaired) errors.wasRepaired = "Requerido";

    if (!formData.hasCasualties) {
      errors.hasCasualties = "Requerido";
    } else if (formData.hasCasualties === '2') {
      if (!formData.deceasedCount) errors.deceasedCount = "Requerido";
      if (!formData.injuredCount) errors.injuredCount = "Requerido";
    }

    if (!formData.isInhabited) {
      errors.isInhabited = "Requerido";
    } else if (formData.isInhabited === '1') {
      if (!formData.existingUnits) errors.existingUnits = "Requerido";
      if (!formData.uninhabitableUnits) errors.uninhabitableUnits = "Requerido";
    }

    if (!formData.contactName) errors.contactName = "Requerido";
    if (!formData.contactPhone) errors.contactPhone = "Requerido";
    if (!formData.comments) errors.comments = "Requerido";

    // Inspectores
    if (!formData.commissionCode) errors.commissionCode = "Requerido";
    if (!formData.commissionLeaderName) errors.commissionLeaderName = "Requerido";
    if (!formData.evaluatorsCount) errors.evaluatorsCount = "Requerido";
    if (!formData.inspectorSignature) errors.inspectorSignature = "Requerido";
    // Fecha
    if (!formData.inspectionDay) errors.inspectionDay = "Requerido";
    if (!formData.inspectionMonth) errors.inspectionMonth = "Requerido";
    if (!formData.inspectionYear) errors.inspectionYear = "Requerido";
    if (!formData.inspectionTime) errors.inspectionTime = "Requerido";

    return errors;
  };

  const handleSyncAndExport = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setFormErrors({});
    setIsProcessing(true);

    try {
      // Paso 1 (Base de Datos)
      const cleanedData = {
        ...formData
      };

      const payloadAplanado = flattenPayload(cleanedData);
      payloadAplanado.timestamp_creacion = new Date();
      payloadAplanado.inspector_id = formData.commissionCode || 'anonimo';
      payloadAplanado.estado_sincronizacion = 'pendiente';

      const docRef = await addDoc(collection(db, 'inspecciones_sismo'), payloadAplanado);
      console.log("Datos guardados con ID: ", docRef.id);

      // Paso 2 (PDF)
      await generarPDF();

    } catch (error) {
      // Paso 3 (Fallback/Error)
      console.error("Error en operación: ", error);
      // Intentamos generar el PDF como contingencia
      try {
        await generarPDF();
      } catch (pdfError) {
        console.error("Error al generar PDF de contingencia: ", pdfError);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const generarPDF = async () => {
    if (!printRef.current) throw new Error("Referencia a la plantilla no encontrada");

    const node = printRef.current;

    const scale = 3;
    const width = node.scrollWidth;
    const height = node.scrollHeight;

    const imgData = await domtoimage.toJpeg(node, {
      quality: 1.0,
      bgcolor: '#ffffff',
      width: width * scale,
      height: height * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${width}px`,
        height: `${height}px`
      }
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pdfHeight = (height * pdfWidth) / width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `Inspeccion_${formData.cadastralBarrio || '00'}${formData.cadastralManzana || '00'}${formData.cadastralPredio || '00'}.pdf`;
    pdf.save(fileName);
  };

  const handleLogin = (name: string, doc: string) => {
    const newUser = { name, doc };
    setUser(newUser);
    localStorage.setItem('inspectorUser', JSON.stringify(newUser));
    setFormData(prev => ({
      ...prev,
      commissionLeaderName: name
    }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('inspectorUser');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-surface-50 pb-5 relative">
      <header className="bg-white border-b border-surface-200 sticky top-0 z-50 shadow-sm mb-8">
        <div className="max-w-3xl mx-auto px-1 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2">
            <img src={qatroLogoUrl} alt="Qatro" className="w-32 sm:w-40 h-16 sm:h-20 object-contain flex-shrink-0 -mr-4 sm:-mr-6" />
            <div className="flex flex-col border-l border-surface-200 pl-2 sm:pl-4 justify-center">
              <span className="text-[7px] sm:text-[10px] text-surface-500 uppercase tracking-wider leading-none mb-1">Desarrollado por:</span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <img src={logoUrl} alt="Controller" className="w-3 h-3 sm:w-4 sm:h-4 object-contain" />
                <span className="font-bold text-surface-800 text-[8px] sm:text-xs leading-none">Controller R.M.A</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg border border-primary-100 text-xs sm:text-sm font-medium">
              <span className="hidden sm:inline">Inspector: </span>
              <span className="max-w-[70px] sm:max-w-[150px] truncate">{user?.name}</span>
            </div>
            <button type="button" onClick={handleLogout} className="text-xs font-semibold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors">
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-extrabold text-surface-900 tracking-tight">Inspección Post-Sismo</h1>
          <p className="mt-2 text-surface-500">Formulario técnico de evaluación de edificaciones</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          <FormHeader data={formData} onChange={handleFieldChange} errors={formErrors} />

          <HabitabilityStatus data={formData} onChange={handleFieldChange} errors={formErrors} />

          <BuildingIdentification data={formData} onChange={handleFieldChange} errors={formErrors} />

          <StructureDescription data={formData} onChange={handleFieldChange} errors={formErrors} />

          <BuildingState data={formData} onChange={handleFieldChange} errors={formErrors} />

          <FinalEvaluation data={formData} onChange={handleFieldChange} errors={formErrors} />

          {Object.keys(formErrors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 mb-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-800 font-semibold mb-2">Faltan campos por diligenciar</h3>
                  <p className="text-sm text-red-700">Por favor, revisa el formulario. Los campos requeridos están marcados en rojo arriba.</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-6 border-t border-surface-200 flex flex-col sm:flex-row gap-4">
            <BaseButton
              type="button"
              variant="outline"
              onClick={handleClearForm}
              disabled={isProcessing}
              className="py-4 text-sm sm:text-base sm:w-1/4 border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
            >
              <Eraser className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Limpiar
            </BaseButton>
            <BaseButton
              type="button"
              onClick={handleSyncAndExport}
              disabled={isProcessing}
              className="py-4 text-lg sm:w-3/4"
            >
              {isProcessing ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Procesando...</>
              ) : (
                <><Save className="w-5 h-5 mr-2" /> Guardar y generar PDF</>
              )}
            </BaseButton>
          </div>
        </form>
      </main>

      {/* Plantilla de Impresión Oculta */}
      <div className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none -z-50 overflow-hidden">
        <PrintTemplate ref={printRef} data={formData} />
      </div>
    </div>
  );
}

export default App;
