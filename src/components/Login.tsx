import { useState } from 'react';
import { BaseInput } from './ui/BaseInput';
import { BaseButton } from './ui/BaseButton';
import logoUrl from '../assets/contro.ico';
import qatroLogoUrl from '../assets/Qatro.png';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

interface LoginProps {
  onLogin: (name: string, doc: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!document.trim()) {
      setError('Por favor, ingresa tu número de documento.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          setError('El nombre completo es requerido para registrarse.');
          setIsLoading(false);
          return;
        }

        if (!acceptPolicy) {
          setError('Debes aceptar la Política de Tratamiento de Datos Personales para registrarte.');
          setIsLoading(false);
          return;
        }

        // Check if already exists
        const docRef = doc(db, 'inspectores', document.trim());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setError('Esta cuenta ya existe. Por favor, inicia sesión.');
        } else {
          // Register
          await setDoc(docRef, { nombre: name.trim(), documento: document.trim(), rol: 'inspector' });
          onLogin(name.trim(), document.trim());
        }
      } else {
        // Login / Recover
        const docRef = doc(db, 'inspectores', document.trim());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          onLogin(data.nombre, document.trim());
        } else {
          setError('Cuenta no encontrada. Verifica tu documento o regístrate.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión. Verifica tu internet o contacta al administrador.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-sm border border-surface-200 px-4 pb-3">
        <div className="flex flex-col items-center justify-center mb-8">
          <img src={qatroLogoUrl} alt="Qatro" className="w-52 h-52 object-contain relative z-10 -mr-4" />
          <small className="font-bold text-surface-800 text-[11px] -mt-12 mb-4 relative z-20 tracking-widest uppercase -mr-4">Consultoría Técnica</small>
          <p className="text-surface-500 text-center text-sm px-2 mb-6">Guía Técnica para la Inspección de Edificaciones Después de un Sismo</p>

          <div className="flex flex-col items-center justify-center">
            <span className="text-xs text-surface-400 mb-1">Un producto desarrollado por:</span>
            <div className="flex items-center gap-2">
              <img src={logoUrl} alt="Controller" className="w-6 h-6 object-contain" />
              <span className="font-bold text-surface-600 text-sm">Controller R.M.A</span>
            </div>
          </div>
        </div>

        <div className="flex rounded-xl bg-surface-100 p-1 mb-6">
          <button
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${mode === 'login' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}
            onClick={() => { setMode('login'); setError(''); }}
          >
            Iniciar Sesión / Recuperar
          </button>
          <button
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${mode === 'register' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}
            onClick={() => { setMode('register'); setError(''); }}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <BaseInput
                label="Nombre Completo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
              />
            </div>
          )}

          <BaseInput
            label="Número de Documento"
            type="text"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            placeholder="Documento de identidad"
          />

          {mode === 'register' && (
            <div className="flex items-start gap-2 mt-2 px-1">
              <input 
                type="checkbox" 
                id="acceptPolicy" 
                className="mt-1 w-4 h-4 text-primary-600 rounded border-surface-300 focus:ring-primary-500"
                checked={acceptPolicy}
                onChange={(e) => setAcceptPolicy(e.target.checked)}
              />
              <label htmlFor="acceptPolicy" className="text-sm text-surface-600 leading-tight">
                He leído y acepto la{' '}
                <button 
                  type="button" 
                  onClick={() => setIsPolicyModalOpen(true)}
                  className="text-primary-600 hover:text-primary-800 font-medium underline"
                >
                  Política de Tratamiento de Datos Personales
                </button>
              </label>
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <BaseButton type="submit" fullWidth className="mt-4 py-3 text-lg flex justify-center" disabled={isLoading}>
            {isLoading ? 'Cargando...' : mode === 'register' ? 'Crear Cuenta' : 'Ingresar'}
          </BaseButton>
        </form>
      </div>

      <PrivacyPolicyModal 
        isOpen={isPolicyModalOpen} 
        onClose={() => setIsPolicyModalOpen(false)} 
      />
    </div>
  );
}
