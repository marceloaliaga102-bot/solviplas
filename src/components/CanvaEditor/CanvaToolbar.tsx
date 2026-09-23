import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Palette,
  Eye,
  Edit3,
  CheckCircle2,
  LogOut,
  HelpCircle,
  X,
  Plus,
  Cloud,
  RotateCw
} from 'lucide-react';

export const CanvaToolbar: React.FC = () => {
  const {
    isAdmin,
    isLiveEditEnabled,
    setIsLiveEditEnabled,
    setIsNewSectionModalOpen,
    triggerSync,
    isSyncing,
    logout
  } = useApp();
  const [showHelp, setShowHelp] = useState(false);

  // If not admin, completely invisible
  if (!isAdmin) return null;

  return (
    <>
      {/* Help popover if toggled */}
      {showHelp && (
        <div className="fixed bottom-20 right-6 z-50 max-w-sm bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/40 backdrop-blur-md text-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Palette className="w-4 h-4" />
              ¿Cómo editar como en Canva?
            </span>
            <button
              onClick={() => setShowHelp(false)}
              className="p-0.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Textos:</strong> Haz clic en cualquier título, descripción o número para editarlo directamente en el lugar.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Imágenes y Videos:</strong> Pasa el ratón sobre cualquier foto y haz clic en "Cambiar Imagen / Video". Puedes subir archivos descargados de tu PC o cambiar una imagen por un video.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Nueva Sección:</strong> Usa el botón "+ Sección" para crear bloques enteros personalizados en la página.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><strong>Base de datos en la nube:</strong> Todos los cambios se guardan de inmediato en la base de datos para que todos los visitantes los vean.</span>
            </li>
          </ul>
        </div>
      )}

      {/* Floating Canva Dock */}
      <aside aria-label="Canva Mode Dock" className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 sm:gap-2 p-2 rounded-2xl bg-slate-900/95 text-white shadow-2xl border border-emerald-500/50 backdrop-blur-xl animate-fadeIn">
        <div className="flex items-center gap-2 pl-2 pr-1">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow">
            <Palette className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] font-extrabold text-white leading-tight">
              Modo Canva
            </p>
            <p className="text-[9px] text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Base en Vivo</span>
            </p>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-700/80 mx-1" />

        {/* Add Section Button */}
        <button
          type="button"
          onClick={() => setIsNewSectionModalOpen(true)}
          className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow transition-all hover:scale-105"
          title="Crear una nueva sección en la página"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nueva Sección</span>
          <span className="sm:hidden">Sección</span>
        </button>

        {/* Toggle Edit / Preview */}
        <button
          type="button"
          onClick={() => setIsLiveEditEnabled(!isLiveEditEnabled)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
            isLiveEditEnabled
              ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
          title={isLiveEditEnabled ? 'Cambiar a modo vista previa' : 'Activar edición en pantalla'}
        >
          {isLiveEditEnabled ? (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Editando</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vista Previa</span>
            </>
          )}
        </button>

        {/* Cloud Sync Button */}
        <button
          type="button"
          onClick={() => triggerSync()}
          className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors"
          title="Sincronizar con la base de datos en la nube"
        >
          <RotateCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
        </button>

        {/* Help button */}
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Instrucciones de edición"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={logout}
          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
          title="Cerrar sesión de edición"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </aside>
    </>
  );
};
