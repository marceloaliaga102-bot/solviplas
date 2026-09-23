import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MediaItem } from '../types';
import { Image as ImageIcon, Video, Play, Maximize2, Plus, Trash2, Star, X, Upload, Link as LinkIcon, Check } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableImage } from './CanvaEditor/EditableImage';

export const MediaGallery: React.FC = () => {
  const { siteConfig, mediaItems, isAdmin, isLiveEditEnabled, addMediaItem, updateMediaItem, deleteMediaItem, toggleFeaturedMedia, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Media Form state
  const [newType, setNewType] = useState<'image' | 'video'>('image');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<'taller' | 'proceso' | 'prototipo' | 'resultados' | 'documental'>('proceso');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!siteConfig.sections.gallery?.enabled) return null;

  const categories = [
    { id: 'todos', label: 'Todo el Material' },
    { id: 'taller', label: 'Talleres Prácticos' },
    { id: 'proceso', label: 'Proceso de Elaboración' },
    { id: 'prototipo', label: 'Prototipos Ecológicos' },
    { id: 'documental', label: 'Videos' },
  ];

  const filteredItems = selectedCategory === 'todos'
    ? mediaItems
    : mediaItems.filter(item => item.category === selectedCategory || (selectedCategory === 'documental' && item.type === 'video'));

  const handleFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideoFile = file.type.startsWith('video/');
    setNewType(isVideoFile ? 'video' : 'image');

    const reader = new FileReader();
    reader.onload = () => {
      setNewUrl(reader.result as string);
      if (!newTitle) {
        setNewTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      showToast('Archivo cargado correctamente para previsualización.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newTitle) {
      showToast('Por favor selecciona un archivo o escribe una URL y título.', 'warning');
      return;
    }

    addMediaItem({
      type: newType,
      title: newTitle,
      description: newDescription || 'Material ecológico del proyecto Solviplas.',
      url: newUrl,
      category: newCategory,
      isFeatured: false,
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewUrl('');
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Evidencia Fotográfica y Audiovisual</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Galería Multimedia de Solviplas
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              Fotos y videos de los talleres prácticos, las pruebas de solubilidad y los prototipos finales biodegradables.
            </p>
          </div>

          {/* Direct Upload Button (Only in Canva Edit Mode) */}
          {isAdmin && isLiveEditEnabled && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Subir Foto o Video Descargado</span>
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-emerald-500/50 transition-all flex flex-col"
            >
              {/* Media Thumbnail Container */}
              <div
                className="relative aspect-video overflow-hidden cursor-pointer bg-black"
                onClick={() => setActiveMedia(item)}
              >
                {item.type === 'video' ? (
                  <>
                    <video
                      src={item.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5" /> Ver en alta resolución
                      </span>
                    </div>
                  </>
                )}

                {/* Badge for Type */}
                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    <span>{item.type === 'video' ? 'Video' : 'Foto'}</span>
                  </span>
                  {item.isFeatured && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center gap-1">
                      <Star className="w-3 h-3 fill-slate-950" /> Destacado
                    </span>
                  )}
                </div>

                {/* In-place Canva Quick Actions on card */}
                {isAdmin && isLiveEditEnabled && (
                  <div className="absolute top-3 right-3 flex gap-1 z-20" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => toggleFeaturedMedia(item.id)}
                      className="p-1.5 rounded-lg bg-slate-900/80 text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-colors shadow"
                      title="Alternar destacado"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteMediaItem(item.id)}
                      className="p-1.5 rounded-lg bg-slate-900/80 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors shadow"
                      title="Eliminar elemento"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Meta & Canva In-Place Text Editing */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <EditableText
                    value={item.title}
                    onSave={(val) => updateMediaItem(item.id, { title: val })}
                    tagName="h4"
                    className="font-bold text-sm text-white mb-1.5 leading-snug block"
                  />
                  <EditableText
                    value={item.description}
                    onSave={(val) => updateMediaItem(item.id, { description: val })}
                    tagName="p"
                    multiline
                    className="text-xs text-slate-400 leading-relaxed block"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="capitalize">{item.category}</span>
                  <span>{item.uploadedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Lightbox for Viewing Image / Video */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-black flex items-center justify-center">
              {activeMedia.type === 'video' ? (
                <video
                  src={activeMedia.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={activeMedia.url}
                  alt={activeMedia.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{activeMedia.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{activeMedia.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Direct Uploading New Media (Canva Style) */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Agregar a la Galería
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMedia} className="space-y-4">
              {/* Type Switcher */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setNewType('image')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    newType === 'image' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Fotografía
                </button>
                <button
                  type="button"
                  onClick={() => setNewType('video')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    newType === 'video' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Video
                </button>
              </div>

              {/* File upload from device */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Seleccionar archivo descargado de tu dispositivo:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept={newType === 'video' ? 'video/*' : 'image/*'}
                  onChange={handleFilePicked}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 rounded-xl border-2 border-dashed border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50 text-center cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-900">
                    Elegir {newType === 'video' ? 'Video (MP4, WebM)' : 'Imagen (JPG, PNG, WebP)'}
                  </span>
                </button>
              </div>

              {/* Or paste URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  O ingresar enlace URL:
                </label>
                <input
                  type="url"
                  placeholder="https://ejemplo.com/archivo"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título del elemento:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Prueba de elasticidad del bioplástico"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descripción:
                </label>
                <textarea
                  rows={2}
                  placeholder="Breve descripción del proceso o resultado..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2.5 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publicar en Galería</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
