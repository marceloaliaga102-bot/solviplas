import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, X, Layers, Image as ImageIcon, Video, Check } from 'lucide-react';

export const NewSectionModal: React.FC = () => {
  const {
    isNewSectionModalOpen,
    setIsNewSectionModalOpen,
    addCustomSection,
  } = useApp();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('🌱 Nueva Innovación');
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaUrl, setMediaUrl] = useState('');

  if (!isNewSectionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCustomSection({
      title: title.trim(),
      subtitle: subtitle.trim() || 'Avances y Aplicaciones Sostenibles',
      badge: badge.trim() || '🌱 Innovación',
      content:
        content.trim() ||
        'Contenido explicativo sobre el desarrollo de alternativas de bioplásticos biodegradables.',
      mediaType,
      mediaUrl:
        mediaUrl.trim() ||
        (mediaType === 'video'
          ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
          : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80'),
    });

    // Reset
    setTitle('');
    setSubtitle('');
    setContent('');
    setMediaUrl('');
    setIsNewSectionModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => setIsNewSectionModalOpen(false)}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 text-slate-900 animate-fadeIn my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Crear Nueva Sección</h3>
              <p className="text-xs text-slate-500">Añade un bloque completo con texto y multimedia a la página</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsNewSectionModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Título de la Sección *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Certificaciones y Ensayos de Toxicidad Cero"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Subtítulo
            </label>
            <input
              type="text"
              placeholder="Ej. Validación en laboratorio y pruebas de biocompatibilidad"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Distintivo / Etiqueta Superior
            </label>
            <input
              type="text"
              placeholder="Ej. 🌱 Certificación Inocua"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Contenido o Descripción Detallada
            </label>
            <textarea
              rows={3}
              placeholder="Explica detalladamente la temática de esta sección..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Tipo de Multimedia
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMediaType('image')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                  mediaType === 'image'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Imagen</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaType('video')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                  mediaType === 'video'
                    ? 'bg-teal-50 border-teal-500 text-teal-900'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              URL de la {mediaType === 'video' ? 'Video (MP4 / WebM)' : 'Imagen'} (opcional)
            </label>
            <input
              type="url"
              placeholder={
                mediaType === 'video'
                  ? 'https://servidor.com/video.mp4'
                  : 'https://images.unsplash.com/...'
              }
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 text-xs"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Si lo dejas vacío, se usará una muestra ecológica predeterminada que podrás cambiar luego en tiempo real.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsNewSectionModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Crear Sección</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
