import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Upload,
  Link as LinkIcon,
  Download,
  Check,
  X,
  Sparkles,
  Play
} from 'lucide-react';

interface EditableMediaProps {
  type?: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
  onSave: (newSrc: string, newType: 'image' | 'video') => void;
  label?: string;
}

const PRESET_ECO_MEDIA = [
  {
    type: 'image' as const,
    name: 'Lámina Hidrosoluble',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image' as const,
    name: 'Gelatinización en Olla',
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image' as const,
    name: 'Disolución en Agua',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'image' as const,
    name: 'Nivelado en Molde',
    url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80'
  },
  {
    type: 'video' as const,
    name: 'Video Demostrativo Lab',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    type: 'video' as const,
    name: 'Video Naturaleza y Agua',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  }
];

export const EditableMedia: React.FC<EditableMediaProps> = ({
  type = 'image',
  src,
  alt = 'Contenido multimedia Solviplas',
  poster,
  className = '',
  containerClassName = '',
  onSave,
  label = 'Cambiar Imagen / Video',
}) => {
  const { isAdmin, isLiveEditEnabled, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  
  // Modal state
  const [selectedType, setSelectedType] = useState<'image' | 'video'>(type);
  const [previewSrc, setPreviewSrc] = useState(src);
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canEdit = isAdmin && isLiveEditEnabled;

  const handleOpenModal = () => {
    setSelectedType(type);
    setPreviewSrc(src);
    setUrlInput('');
    setIsOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video');
    const isImage = file.type.startsWith('image');

    if (!isImage && !isVideo) {
      showToast('Por favor selecciona un archivo de imagen o video válido.', 'warning');
      return;
    }

    const detectedType = isVideo ? 'video' : 'image';
    setSelectedType(detectedType);

    if (isImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, w, h);
            const optimized = canvas.toDataURL('image/jpeg', 0.8);
            setPreviewSrc(optimized);
            showToast('Imagen optimizada y lista para guardar en la nube.', 'success');
          } else {
            setPreviewSrc(reader.result as string);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      return;
    }

    if (isVideo) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Para sincronizar videos con todos los usuarios en la nube, se recomienda usar la pestaña "Enlace / URL" (YouTube, MP4 o Drive).', 'info');
      }
      const localUrl = URL.createObjectURL(file);
      setPreviewSrc(localUrl);
      showToast('Video cargado en vista previa.', 'info');
      return;
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setPreviewSrc(urlInput.trim());
    showToast('Enlace cargado en la vista previa.', 'info');
  };

  const handleApplyChanges = () => {
    if (!previewSrc) return;
    onSave(previewSrc, selectedType);
    setIsOpen(false);
    showToast('¡Multimedia actualizada con éxito!', 'success');
  };

  const handleDownloadCurrent = () => {
    try {
      const a = document.createElement('a');
      a.href = src;
      a.download = `solviplas-${selectedType}-${Date.now()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Descarga iniciada.', 'info');
    } catch {
      window.open(src, '_blank');
    }
  };

  return (
    <div className={`relative group/canva-media ${containerClassName}`}>
      {/* Visual media display */}
      {type === 'video' ? (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          className={className}
        >
          Tu navegador no soporta video HTML5.
        </video>
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
        />
      )}

      {/* Canva Overlay Trigger */}
      {canEdit && (
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/canva-media:opacity-100 transition-opacity flex items-center justify-center pointer-events-auto z-20 backdrop-blur-[2px] rounded-[inherit]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-2xl hover:scale-105 transition-transform"
          >
            {type === 'video' ? <VideoIcon className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
            <span>{label}</span>
          </button>
        </div>
      )}

      {/* Editor Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 text-slate-900 animate-fadeIn my-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  {selectedType === 'video' ? <VideoIcon className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                    Editor Multimedia en Vivo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cambia imágenes por videos o sube archivos desde tu dispositivo
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Type Switcher: Image or Video */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tipo de Contenido Multimedia:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedType('image')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedType === 'image'
                      ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Fotografía / Imagen</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('video')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedType === 'video'
                      ? 'bg-white text-teal-800 shadow-sm border border-teal-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <VideoIcon className="w-4 h-4" />
                  <span>Video Demostrativo</span>
                </button>
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="mb-4 bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-800 shadow-inner">
              {selectedType === 'video' ? (
                <video
                  src={previewSrc}
                  controls
                  className="w-full h-44 object-contain"
                />
              ) : (
                <img
                  src={previewSrc}
                  alt="Vista previa"
                  className="w-full h-44 object-cover"
                />
              )}
              <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-950/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                Vista previa
              </span>
            </div>

            {/* Tabs: Upload, URL, Presets */}
            <div className="flex rounded-xl bg-slate-100 p-1 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir Archivo</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'url' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Enlace Web</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Catálogo</span>
              </button>
            </div>

            {/* Tab 1: Upload from local device / downloaded file */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept={selectedType === 'video' ? 'video/*' : 'image/*'}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-6 rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-950">
                    Seleccionar {selectedType === 'video' ? 'Video' : 'Imagen'} de tu equipo
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Archivos descargados (JPG, PNG, WebP, MP4, WebM)
                  </span>
                </button>
              </div>
            )}

            {/* Tab 2: Web URL */}
            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dirección URL directa ({selectedType === 'video' ? 'Video MP4 / Enlace' : 'Imagen HTTPS'}):
                  </label>
                  <input
                    type="url"
                    placeholder={
                      selectedType === 'video'
                        ? 'https://servidor.com/video.mp4'
                        : 'https://images.unsplash.com/...'
                    }
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Probar en Vista Previa</span>
                </button>
              </form>
            )}

            {/* Tab 3: Curated Presets */}
            {activeTab === 'presets' && (
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {PRESET_ECO_MEDIA.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedType(preset.type);
                      setPreviewSrc(preset.url);
                    }}
                    className="p-2 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 text-left transition-all flex items-center gap-2"
                  >
                    {preset.type === 'video' ? (
                      <VideoIcon className="w-4 h-4 text-teal-600 shrink-0" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span className="text-[11px] font-bold text-slate-800 truncate">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDownloadCurrent}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Descargar este archivo a tu computadora"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleApplyChanges}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar y Aplicar</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
