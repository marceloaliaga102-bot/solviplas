import React from 'react';
import { useApp } from '../context/AppContext';
import { CustomSection } from '../types';
import { Sparkles, Trash2, Plus, CheckCircle2 } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableMedia } from './CanvaEditor/EditableMedia';

interface CustomSectionRendererProps {
  section: CustomSection;
}

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({ section }) => {
  const {
    updateCustomSection,
    deleteCustomSection,
    isAdmin,
    isLiveEditEnabled,
  } = useApp();

  const canEdit = isAdmin && isLiveEditEnabled;

  const handleAddHighlight = () => {
    const nextItem = {
      id: 'h-' + Date.now(),
      title: 'Nuevo Punto Clave',
      description: 'Describe el impacto o característica relevante de este punto.',
    };
    const updatedHighlights = [...(section.highlights || []), nextItem];
    updateCustomSection(section.id, { highlights: updatedHighlights });
  };

  const handleUpdateHighlight = (hId: string, updated: any) => {
    const updatedHighlights = (section.highlights || []).map(h =>
      h.id === hId ? { ...h, ...updated } : h
    );
    updateCustomSection(section.id, { highlights: updatedHighlights });
  };

  const handleDeleteHighlight = (hId: string) => {
    const updatedHighlights = (section.highlights || []).filter(h => h.id !== hId);
    updateCustomSection(section.id, { highlights: updatedHighlights });
  };

  return (
    <section
      id={section.id}
      className="py-20 bg-slate-950 text-white relative border-t border-slate-900 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Admin Section Controls Header */}
        {canEdit && (
          <div className="flex items-center justify-end mb-4">
            <button
              type="button"
              onClick={() => {
                if (confirm(`¿Estás seguro de eliminar la sección "${section.title}"?`)) {
                  deleteCustomSection(section.id);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-800 text-rose-200 hover:text-white text-xs font-bold transition-all border border-rose-800/40"
              title="Eliminar esta sección personalizada"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Eliminar Sección</span>
            </button>
          </div>
        )}

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <EditableText
              value={section.badge || '✨ Sección Personalizada'}
              onSave={(val) => updateCustomSection(section.id, { badge: val })}
              tagName="span"
            />
          </div>

          <EditableText
            value={section.title}
            onSave={(val) => updateCustomSection(section.id, { title: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
          />

          <EditableText
            value={section.subtitle}
            onSave={(val) => updateCustomSection(section.id, { subtitle: val })}
            tagName="p"
            className="text-base sm:text-lg text-emerald-200/90 font-medium mb-3"
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Media Column */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/40 bg-black aspect-video">
              <EditableMedia
                type={section.mediaType || 'image'}
                src={section.mediaUrl}
                alt={section.title}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
                onSave={(newSrc, newType) =>
                  updateCustomSection(section.id, { mediaUrl: newSrc, mediaType: newType })
                }
                label="Cambiar Foto o Video"
              />
            </div>
          </div>

          {/* Text & Highlights Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Información Detallada:
              </p>
              <EditableText
                value={section.content}
                onSave={(val) => updateCustomSection(section.id, { content: val })}
                tagName="p"
                multiline
                className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal"
              />
            </div>

            {/* Key highlights cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Puntos Destacados:
                </span>
                {canEdit && (
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-900/60 hover:bg-emerald-800 px-2 py-1 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Punto</span>
                  </button>
                )}
              </div>

              {section.highlights?.map((h) => (
                <div
                  key={h.id}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 relative group"
                >
                  <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <EditableText
                        value={h.title}
                        onSave={(val) => handleUpdateHighlight(h.id, { title: val })}
                        tagName="h4"
                        className="text-xs sm:text-sm font-bold text-white"
                      />
                      {canEdit && (section.highlights?.length || 0) > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteHighlight(h.id)}
                          className="p-1 rounded-lg text-rose-400 hover:bg-rose-950/60 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <EditableText
                      value={h.description}
                      onSave={(val) => handleUpdateHighlight(h.id, { description: val })}
                      tagName="p"
                      multiline
                      className="text-xs text-slate-300 mt-1 leading-normal"
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
