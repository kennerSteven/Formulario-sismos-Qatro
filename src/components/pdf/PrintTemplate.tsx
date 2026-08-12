import { forwardRef } from 'react';
import { STRUCTURAL_SYSTEMS, FLOOR_TYPES, CONSTRUCTION_YEARS } from '../../data/dictionaries';
import logoUrl from '../../assets/contro.ico';
import qatroLogoUrl from '../../assets/Qatro.png';
import { StaticMap } from '../ui/StaticMap';

interface PrintTemplateProps {
  data: any;
}

export const PrintTemplate = forwardRef<HTMLDivElement, PrintTemplateProps>(({ data }, ref) => {
  const systemLabel = STRUCTURAL_SYSTEMS.find(s => s.id.toString() === data.structuralSystemId)?.label || '';
  const floorLabel = FLOOR_TYPES.find(f => f.id.toString() === data.floorTypeId)?.label || '';
  const yearLabel = CONSTRUCTION_YEARS.find(y => y.id.toString() === data.constructionYearId)?.label || '';

  const Box = ({ label, value, className = '' }: { label: string, value: any, className?: string }) => (
    <div className={`border border-black flex flex-col p-1 ${className}`}>
      <span className="text-[9px] font-bold uppercase leading-tight mb-0.5 text-black">{label}</span>
      <span className="text-[11px] font-medium leading-tight text-black break-words">{value || '-'}</span>
    </div>
  );

  return (
    <div 
      ref={ref} 
      className="bg-white print-container"
      style={{ width: '210mm', minHeight: '297mm', padding: '10mm', color: '#000', fontFamily: 'sans-serif' }}
    >
      {/* HEADER */}
      <div className="flex border-2 border-black mb-2">
        <div className="w-1/4 p-1 flex flex-col items-center justify-center border-r-2 border-black">
          <img src={qatroLogoUrl} alt="Qatro Logo" className="w-40 h-24 object-contain -mb-2" />
          
          <div className="flex flex-col items-center justify-center w-full mt-0.5">
            <span className="text-[6px] text-gray-500 uppercase font-bold leading-none mb-0.5">Desarrollado por:</span>
            <div className="flex items-center gap-1">
              <img src={logoUrl} alt="Logo" className="w-3 h-3 object-contain" />
              <div className="font-bold text-center text-[8px] leading-tight text-black">
                Controller R.M.A
              </div>
            </div>
          </div>

          <div className="text-[7.5px] font-bold mt-1.5 text-black bg-gray-200 px-1 py-0.5 rounded uppercase w-full text-center truncate">
            INSP: {data.commissionLeaderName || 'SIN ASIGNAR'}
          </div>
        </div>
        <div className="w-1/2 p-2 flex items-center justify-center border-r-2 border-black text-center">
          <h1 className="font-bold text-base leading-tight text-black">
            FORMULARIO DE EVALUACIÓN RÁPIDA DE<br/>EDIFICACIONES POST-SISMO
          </h1>
        </div>
        <div className="w-1/4 p-2 flex flex-col justify-center text-center">
          <div className="text-[10px] font-bold text-black mb-1">Formulario No:</div>
          <div className="text-lg font-bold text-black">{data.formNumber || '___'}</div>
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <Box label="Localidad" value={data.locality} className="flex-1" />
        <Box label="Barrio" value={data.neighborhoodName} className="flex-1" />
      </div>

      <div className="border border-black p-1 mb-2">
        <div className="text-[10px] font-bold mb-1 text-black">IDENTIFICACIÓN CATASTRAL</div>
        <div className="flex gap-1">
          <Box label="Barrio" value={data.cadastralBarrio} className="flex-1" />
          <Box label="Manzana" value={data.cadastralManzana} className="flex-1" />
          <Box label="Predio" value={data.cadastralPredio} className="flex-1" />
          <Box label="Construcción" value={data.cadastralConstruccion} className="flex-1" />
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <Box label="Inspección" value={data.inspectionType} className="w-1/2" />
        <Box label="Habitabilidad" value={data.habitability} className="w-1/2" />
      </div>

      {/* DIRECCIÓN Y USO */}
      <div className="border border-black p-1 mb-2">
        <div className="text-[10px] font-bold mb-1 text-black">IDENTIFICACIÓN DE LA EDIFICACIÓN</div>
        <div className="flex gap-1 mb-1">
          <Box label="Carrera" value={data.addressCarrera} className="flex-1" />
          <Box label="Calle" value={data.addressCalle} className="flex-1" />
          <Box label="Transv" value={data.addressTransv} className="flex-1" />
          <Box label="Diag" value={data.addressDiag} className="flex-1" />
          <Box label="Avda" value={data.addressAvda} className="flex-1" />
          <Box label="Otro" value={data.addressOtro} className="flex-1" />
          <Box label="Número" value={data.addressNumero} className="flex-1" />
        </div>
        <div className="flex gap-1 mb-1">
          <Box label="Nombre de la edificación" value={data.buildingName} className="w-1/2" />
          <Box label="Uso predominante" value={data.predominantUse} className="w-1/4" />
          <Box label="Uso edificación" value={data.buildingUse} className="w-1/4" />
        </div>
        <div className="flex gap-1">
          <Box label="Uso planta baja" value={data.groundFloorUse} className="flex-1" />
          <Box label="Niveles sobre terreno" value={data.levelsAboveGround} className="flex-1" />
          <Box label="Sótanos" value={data.basements} className="flex-1" />
          <Box label="Frente (m)" value={data.frontMeters} className="flex-1" />
          <Box label="Fondo (m)" value={data.depthMeters} className="flex-1" />
        </div>
      </div>

      {/* DESCRIPCIÓN ESTRUCTURA */}
      <div className="flex gap-1 mb-2">
        <Box label="Sistema estructural" value={systemLabel} className="w-1/3" />
        <Box label="Tipo de entrepiso" value={floorLabel} className="w-1/3" />
        <Box label="Año de construcción" value={yearLabel} className="w-1/3" />
      </div>

      {/* ESTADO DE LA EDIFICACIÓN */}
      <div className="border-2 border-black p-1 mb-2">
        <div className="text-[10px] font-bold mb-1 text-black bg-gray-200 p-1">ESTADO DE LA EDIFICACIÓN</div>
        
        <div className="flex gap-2">
          {/* Col 1 */}
          <div className="w-1/2">
            <div className="text-[9px] font-bold mb-1 text-black border-b border-black pb-0.5">ESTADO GENERAL Y GEOTÉCNICOS (1.Si 2.No 3.N/S)</div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>1. Colapso o daño severo</span> <span>{data.collapseState || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>2. Desviación de vertical</span> <span>{data.deviationState || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>3. Falla visible cimentación</span> <span>{data.foundationFailureState || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>11. Falla en talud</span> <span>{data.slopeFailureState || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>12. Asentamiento en terreno</span> <span>{data.settlementState || '-'}</span></div>

            <div className="text-[9px] font-bold mt-2 mb-1 text-black border-b border-black pb-0.5">DAÑOS ARQUITECTÓNICOS (1-Ninguno a 5-Severo)</div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>4. Muros fachadas</span> <span>{data.facadeDamage || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>5. Escaleras</span> <span>{data.stairsDamage || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>6. Cubiertas</span> <span>{data.roofDamage || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>7. Pisos</span> <span>{data.flooringDamage || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>8. Muros divisorios</span> <span>{data.interiorWallsDamage || '-'}</span></div>
            <div className="flex justify-between text-[10px] text-black mb-0.5"><span>10. Vidrios</span> <span>{data.glassDamage || '-'}</span></div>
            <div className="flex flex-col text-[10px] text-black mt-1 bg-gray-100 p-1">
              <span>9. Instalaciones: {(data.installationsTypes || []).join(', ') || '-'}</span> 
              <span>Severidad Inst: {data.installationsDamage || '-'}</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="w-1/2 border-l border-black pl-2">
            <div className="text-[9px] font-bold mb-1 text-black border-b border-black pb-0.5">DAÑOS ESTRUCTURALES (%)</div>
            <div className="text-[10px] mb-2 text-black font-medium">Nivel de mayor daño: {data.highestDamageFloor || '-'}</div>
            
            <table className="w-full text-[9px] text-center border-collapse text-black mb-2">
              <thead>
                <tr className="border-b border-black bg-gray-100">
                  <th className="text-left p-1">Elemento</th>
                  <th className="p-1">1</th><th className="p-1">2</th><th className="p-1">3</th><th className="p-1">4</th><th className="p-1">5</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dashed border-gray-300">
                  <td className="text-left py-1">13. Columnas</td>
                  <td>{data.columnsDamage?.none || '-'}</td><td>{data.columnsDamage?.slight || '-'}</td><td>{data.columnsDamage?.moderate || '-'}</td><td>{data.columnsDamage?.severe || '-'}</td><td>{data.columnsDamage?.verySevere || '-'}</td>
                </tr>
                <tr className="border-b border-dashed border-gray-300">
                  <td className="text-left py-1">14. Vigas</td>
                  <td>{data.beamsDamage?.none || '-'}</td><td>{data.beamsDamage?.slight || '-'}</td><td>{data.beamsDamage?.moderate || '-'}</td><td>{data.beamsDamage?.severe || '-'}</td><td>{data.beamsDamage?.verySevere || '-'}</td>
                </tr>
                <tr className="border-b border-dashed border-gray-300">
                  <td className="text-left py-1">15. Nudos</td>
                  <td>{data.nodesDamage?.none || '-'}</td><td>{data.nodesDamage?.slight || '-'}</td><td>{data.nodesDamage?.moderate || '-'}</td><td>{data.nodesDamage?.severe || '-'}</td><td>{data.nodesDamage?.verySevere || '-'}</td>
                </tr>
                <tr>
                  <td className="text-left py-1">16. Entrepisos</td>
                  <td>{data.floorsDamage?.none || '-'}</td><td>{data.floorsDamage?.slight || '-'}</td><td>{data.floorsDamage?.moderate || '-'}</td><td>{data.floorsDamage?.severe || '-'}</td><td>{data.floorsDamage?.verySevere || '-'}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-2 text-[10px] font-bold text-black p-1 bg-gray-100">CLASIFICACIÓN DEL DAÑO: {data.damageClassification || '-'}</div>
            <div className="text-[10px] text-black mt-1">¿Clasificación previa?: {data.hasPreviousClassification || '-'} - {data.previousClassificationDetail}</div>
          </div>
        </div>
      </div>

      {/* RECOMENDACIONES */}
      <div className="border border-black p-1 mb-2 flex flex-col gap-1 text-black">
        <div className="text-[10px] font-bold text-black bg-gray-200 p-1">EVALUACIÓN FINAL Y RECOMENDACIONES</div>
        <div className="text-[10px]"><strong>Visita especializada por:</strong> {(data.specializedVisits || []).join(', ') || '-'}</div>
        <div className="text-[10px]"><strong>Medidas de seguridad:</strong> {(data.securityMeasures || []).join(', ') || '-'}</div>
        <div className="text-[10px]"><strong>Lugares especificados:</strong> {data.restrictedAreas || '-'}</div>
      </div>

      {/* CONDICIONES */}
      <div className="flex gap-2 mb-2 text-black">
        <div className="w-1/2 border border-black p-2 text-[10px]">
          <div className="font-bold border-b border-black mb-1 pb-0.5">CONDICIONES PRE-EXISTENTES</div>
          <div className="flex justify-between mb-0.5"><span>Calidad construcción:</span> <span>{data.qualityCondition || '-'}</span></div>
          <div className="flex justify-between mb-0.5"><span>Configuración planta:</span> <span>{data.planConfigurationCondition || '-'}</span></div>
          <div className="flex justify-between mb-0.5"><span>Condición altura:</span> <span>{data.heightCondition || '-'}</span></div>
          <div className="flex justify-between mb-0.5"><span>Condición estructural:</span> <span>{data.structuralCondition || '-'}</span></div>
          <div className="flex justify-between mb-0.5"><span>Daños previos:</span> <span>{data.previousEarthquakeDamage || '-'}</span></div>
          <div className="flex justify-between"><span>¿Hubo reparación?:</span> <span>{data.wasRepaired || '-'}</span></div>
        </div>
        <div className="w-1/2 border border-black p-2 text-[10px]">
          <div className="font-bold border-b border-black mb-1 pb-0.5">EFECTO EN OCUPANTES</div>
          <div className="flex justify-between mb-1"><span>¿Muertos/Heridos?:</span> <span>{data.hasCasualties || '-'}</span></div>
          <div className="mb-2 pl-4 text-gray-700">- Muertos: {data.deceasedCount || 0} | Heridos: {data.injuredCount || 0}</div>
          <div className="flex justify-between mb-1"><span>¿Está habitada?:</span> <span>{data.isInhabited || '-'}</span></div>
          <div className="pl-4 text-gray-700">
            <div>- Unidades existentes: {data.existingUnits || '-'}</div>
            <div>- Unidades no habitables: {data.uninhabitableUnits || '-'}</div>
          </div>
        </div>
      </div>

      {/* Espaciador artificial para alinear el salto de página en jsPDF y evitar que corte el texto */}
      <div style={{ height: '25mm' }}></div>

      <div className="border border-black p-2 mb-2 text-[10px] text-black">
        <div className="font-bold mb-1">CONTACTO Y COMENTARIOS</div>
        <div className="mb-1"><strong>Persona de contacto:</strong> {data.contactName || '-'} | <strong>Teléfono:</strong> {data.contactPhone || '-'}</div>
        <div className="bg-gray-50 p-2 border border-gray-200 mt-1 min-h-[40px] italic">
          {data.comments || 'Sin comentarios.'}
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <div className="w-2/3 border border-black p-2 text-[10px] text-black">
          <div className="font-bold border-b border-black mb-2 pb-0.5">INSPECTORES</div>
          <div className="flex justify-between mb-4 font-medium">
            <span>Código comisión: <span className="font-normal underline decoration-dashed">{data.commissionCode || '_______'}</span></span>
            <span>Líder: <span className="font-normal underline decoration-dashed">{data.commissionLeaderName || '_________________'}</span></span>
            <span>Evaluadores: <span className="font-normal underline decoration-dashed">{data.evaluatorsCount || '___'}</span></span>
          </div>
          <div className="flex gap-2 items-end mt-4">
            <span className="font-bold">Firma:</span>
            {data.inspectorSignature ? (
              <img src={data.inspectorSignature} alt="Firma" className="h-12 border-b border-black flex-1 object-contain object-left" />
            ) : (
               <div className="h-8 flex-1 border-b border-black"></div>
            )}
          </div>
        </div>
        <div className="w-1/3 border border-black p-2 text-[10px] text-black flex flex-col justify-between">
          <div className="font-bold border-b border-black mb-2 pb-0.5">FECHA DE INSPECCIÓN</div>
          <div className="flex justify-between px-2 py-1 mb-2">
            <div className="flex flex-col items-center"><span>Día</span><span className="font-bold">{data.inspectionDay || '--'}</span></div>
            <div className="flex flex-col items-center"><span>Mes</span><span className="font-bold">{data.inspectionMonth || '--'}</span></div>
            <div className="flex flex-col items-center"><span>Año</span><span className="font-bold">{data.inspectionYear || '----'}</span></div>
          </div>
          <div className="text-center font-bold bg-gray-200 py-1">Hora: {data.inspectionTime || '--:--'}</div>
        </div>
      </div>

      {/* FOTOS Y UBICACIÓN */}
      {(data.location || (data.photos || []).length > 0) && (
        <div className="border-2 border-black p-1 mt-4 text-black" style={{ pageBreakInside: 'avoid' }}>
          <div className="text-[10px] font-bold mb-1 text-black bg-gray-200 p-1">ESQUEMA (EVIDENCIA FOTOGRÁFICA Y UBICACIÓN)</div>
          
          {data.location && (
            <div className="mb-2 p-1 border border-gray-300 bg-gray-50 flex flex-col items-center">
              <div className="text-[9px] font-bold mb-1">
                Ubicación GPS: Lat {data.location.lat.toFixed(5)}, Lng {data.location.lng.toFixed(5)}
              </div>
              <div className="w-full max-w-[600px] h-[300px] border border-gray-300 overflow-hidden relative">
                <StaticMap lat={data.location.lat} lng={data.location.lng} zoom={16} width="100%" height="100%" />
              </div>
            </div>
          )}

          {(data.photos || []).length > 0 && (
            <div className="grid grid-cols-2 gap-2 p-1">
              {(data.photos || []).map((photo: string, index: number) => (
                <div key={index} className="aspect-video border border-gray-300 bg-gray-50 flex items-center justify-center">
                  <img src={photo} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
});
