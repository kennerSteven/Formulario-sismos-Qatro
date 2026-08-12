import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-surface-100">
          <h2 className="text-xl font-bold text-surface-900">Política de Tratamiento de Datos Personales</h2>
          <button 
            onClick={onClose}
            className="text-surface-400 hover:text-surface-600 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 prose prose-sm max-w-none prose-headings:text-surface-800 prose-p:text-surface-600 prose-a:text-primary-600 space-y-6">
          <p><strong>Fecha de actualización:</strong> 12 de agosto de 2026<br/>
          <strong>Versión:</strong> 1.0</p>

          <h3 className="text-lg font-bold text-surface-900 mt-6 mb-3">1. Responsable del tratamiento</h3>
          <p>El responsable del tratamiento de los datos personales recopilados mediante esta plataforma es:</p>
          <ul className="list-disc pl-5 space-y-3 mt-2">
            <li><strong>Responsable:</strong> Controller RMA SAS</li>
            <li><strong>NIT:</strong> 901.831.578-9</li>
            <li><strong>Correo electrónico:</strong> coordinacion@controller.com.co</li>
            <li><strong>Dirección:</strong> Carrera 55 # 152b - 68</li>
          </ul>
          <p className="mt-4">La presente política se establece de conformidad con la Ley 1581 de 2012 y las demás normas colombianas aplicables en materia de protección de datos personales.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">2. Datos personales que recopilamos</h3>
          <p>Para el funcionamiento de la plataforma podremos recopilar y almacenar información proporcionada directamente por el usuario, incluyendo:</p>
          <ul className="list-disc pl-5 space-y-3 mt-2">
            <li>Nombre y apellidos.</li>
            <li>Correo electrónico.</li>
            <li>Información asociada a la cuenta del usuario.</li>
            <li>Información necesaria para la autenticación y gestión de la sesión.</li>
            <li>Documentos cargados voluntariamente por el usuario.</li>
            <li>Información relacionada con las acciones realizadas dentro de la plataforma.</li>
            <li>Datos de contacto de terceros (ej. propietarios o responsables de edificaciones), los cuales son suministrados por el usuario bajo su responsabilidad de haber obtenido la autorización correspondiente, y serán usados exclusivamente para el registro técnico de la inspección.</li>
            <li>Firma digitalizada o electrónica del usuario.</li>
            <li>Fotografías capturadas durante el proceso de inspección técnica.</li>
          </ul>
          <p className="mt-4">No se solicitarán datos personales que no sean necesarios para las finalidades descritas en esta política.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">3. Finalidades del tratamiento</h3>
          <p>Los datos personales serán tratados con las siguientes finalidades:</p>
          <ol className="list-decimal pl-5 space-y-3 mt-2">
            <li>Crear y administrar la cuenta del usuario.</li>
            <li>Permitir el inicio de sesión y autenticación dentro de la plataforma.</li>
            <li>Identificar al usuario y asociar la información con su cuenta.</li>
            <li>Permitir la carga, almacenamiento, consulta y gestión de documentos.</li>
            <li>Mantener la seguridad de las cuentas y de la información almacenada.</li>
            <li>Brindar soporte y atender solicitudes realizadas por los usuarios.</li>
            <li>Mantener, mejorar y garantizar el correcto funcionamiento de la plataforma.</li>
            <li>Cumplir con las obligaciones legales que resulten aplicables.</li>
          </ol>
          <p className="mt-4">Los datos personales no serán utilizados para finalidades diferentes a las informadas al titular, salvo que exista una autorización adicional o una obligación legal que lo permita.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">4. Tratamiento y almacenamiento de la información</h3>
          <p>La información proporcionada por los usuarios podrá ser almacenada en bases de datos y servicios tecnológicos utilizados para la operación de la plataforma.</p>
          <p>El nombre y demás datos asociados a la cuenta podrán permanecer almacenados mientras la cuenta se encuentre activa o durante el tiempo necesario para cumplir las finalidades descritas en esta política.</p>
          <p>Los documentos cargados por el usuario podrán ser almacenados y asociados a su cuenta para permitir su posterior consulta y gestión dentro de la plataforma.</p>
          <p>La información podrá ser almacenada en servidores ubicados fuera del territorio colombiano a través de proveedores de servicios en la nube (ej. Firebase/Google Cloud) que cumplen con estándares internacionales de seguridad, lo cual el titular acepta y autoriza.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">5. Seguridad de la información</h3>
          <p>Se implementarán medidas técnicas, administrativas y organizativas razonables para proteger los datos personales y documentos almacenados frente a pérdida, alteración, acceso no autorizado, divulgación o uso indebido.</p>
          <p>El acceso a la información estará limitado de acuerdo con los roles y permisos establecidos dentro de la plataforma.</p>
          <p>Cuando se utilicen proveedores tecnológicos externos para servicios de almacenamiento, autenticación, infraestructura o procesamiento de información, estos deberán cumplir con las obligaciones de seguridad y confidencialidad aplicables.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">6. Confidencialidad</h3>
          <p>Las personas que intervengan en el tratamiento de los datos personales deberán mantener la confidencialidad de la información a la que tengan acceso y utilizarla únicamente para las finalidades autorizadas.</p>
          <p>La información no será comercializada ni divulgada a terceros para finalidades diferentes a las establecidas en esta política, salvo autorización del titular, obligación legal o requerimiento de una autoridad competente.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">7. Documentos cargados por los usuarios</h3>
          <p>Los documentos cargados voluntariamente por los usuarios serán tratados únicamente para las funcionalidades que ofrece la plataforma.</p>
          <p>El usuario será responsable de garantizar que cuenta con los derechos, permisos o autorizaciones necesarios para cargar y almacenar dichos documentos.</p>
          <p>El responsable de la plataforma implementará medidas razonables para restringir el acceso a los documentos de acuerdo con los permisos establecidos.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">8. Derechos de los titulares</h3>
          <p>De acuerdo con la legislación colombiana, los titulares de los datos personales tienen derecho a:</p>
          <ul className="list-disc pl-5 space-y-3 mt-2">
            <li>Conocer los datos personales que son objeto de tratamiento.</li>
            <li>Solicitar la actualización y rectificación de sus datos.</li>
            <li>Solicitar información sobre el uso dado a sus datos personales.</li>
            <li>Presentar consultas y reclamos relacionados con el tratamiento de sus datos.</li>
            <li>Solicitar la supresión de sus datos cuando sea procedente.</li>
            <li>Revocar la autorización otorgada para el tratamiento de sus datos, cuando legalmente sea posible.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio cuando considere que se han vulnerado sus derechos.</li>
          </ul>
          <p className="mt-4">Estos derechos se encuentran contemplados, entre otras disposiciones, en la Ley 1581 de 2012.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">9. Consultas y reclamos</h3>
          <p>El titular podrá realizar consultas o presentar reclamos relacionados con sus datos personales mediante el siguiente canal:</p>
          <p className="font-semibold text-surface-800">Correo electrónico: <span className="font-normal text-surface-600">coordinacion@controller.com.co</span></p>
          <p>Las solicitudes deberán permitir la identificación del titular y especificar claramente la información o acción solicitada. Las consultas y reclamos serán atendidos de acuerdo con los procedimientos y términos establecidos en la legislación colombiana aplicable.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">10. Conservación de los datos</h3>
          <p>Los datos personales y documentos serán conservados durante el tiempo necesario para cumplir las finalidades para las cuales fueron recopilados, mientras la cuenta permanezca activa o cuando exista una obligación legal o contractual que requiera su conservación.</p>
          <p>Una vez cumplida la finalidad del tratamiento y cuando no exista una obligación legal o contractual para conservar la información, los datos podrán ser eliminados, anonimizados o sometidos a las medidas correspondientes.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">11. Autorización del titular</h3>
          <p>Cuando la legislación aplicable exija autorización, esta será solicitada previamente al titular de los datos de manera expresa e informada.</p>
          <p>La aceptación de esta política podrá quedar registrada junto con la fecha, hora y versión de la política aceptada, con el propósito de conservar evidencia de la autorización otorgada.</p>

          <h3 className="text-lg font-bold text-surface-900 mt-8 mb-3">12. Vigencia y modificaciones</h3>
          <p>La presente política entra en vigencia a partir de su publicación y permanecerá vigente mientras se realice el tratamiento de datos personales por parte del responsable. Cualquier modificación sustancial será comunicada oportunamente a través de los canales disponibles para los usuarios.</p>
        </div>
        
        <div className="p-4 sm:p-6 border-t border-surface-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
