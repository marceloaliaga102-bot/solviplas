import React from 'react';
import { useApp } from '../context/AppContext';
import { Droplets, Leaf, ArrowRight, ShieldCheck, Sparkles, Package } from 'lucide-react';
import { SparkleParticles } from './SparkleParticles';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableMedia } from './CanvaEditor/EditableMedia';

export const Hero: React.FC = () => {
  const { siteConfig, updateSiteConfig, mediaItems, updateMediaItem } = useApp();

  const featuredImage = mediaItems.find(m => m.isFeatured) || mediaItems[0];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      {/* Animated Sparkling Light Particles at the start of the page */}
      <SparkleParticles />

      {/* Organic background gradient glows */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-400 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-emerald-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Top Notification Badge (Canva editable) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-400/40 text-emerald-200 text-xs font-bold backdrop-blur-md shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <EditableText
              value={siteConfig.heroBadge}
              onSave={(val) => updateSiteConfig({ heroBadge: val })}
              tagName="span"
            />
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headings & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <EditableText
                value={siteConfig.heroTitle}
                onSave={(val) => updateSiteConfig({ heroTitle: val })}
                tagName="h1"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight block text-white"
              />
              <EditableText
                value={siteConfig.heroHighlight}
                onSave={(val) => updateSiteConfig({ heroHighlight: val })}
                tagName="h2"
                className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-green-300 bg-clip-text text-transparent drop-shadow-sm block"
              />
            </div>

            <EditableText
              value={siteConfig.heroDescription}
              onSave={(val) => updateSiteConfig({ heroDescription: val })}
              tagName="p"
              multiline
              className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-normal block"
            />

            {/* Quick CTAs with direct links to Tutorial and Products */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#tutorial"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-emerald-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver Tutorial de Elaboración</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#products"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-bold text-sm border border-emerald-500/50 backdrop-blur-md transition-all shadow-lg"
              >
                <Package className="w-4 h-4 text-emerald-300" />
                <span>Catálogo de Productos</span>
              </a>

              <a
                href="#recipe"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl text-emerald-300 hover:text-white hover:bg-emerald-800/40 text-sm font-semibold transition-all"
              >
                <Droplets className="w-4 h-4 text-teal-300" />
                <span>Fórmula & Simulador</span>
              </a>
            </div>

            {/* General eco accreditation */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-300/90 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Química Verde: Cero Petróleo
              </span>
              <span className="hidden sm:inline text-emerald-700">•</span>
              <span>100% Hidrosoluble en Minutos</span>
              <span className="hidden sm:inline text-emerald-700">•</span>
              <span>Presupuesto Accesible (S/. 30)</span>
            </div>
          </div>

          {/* Right Column: In-Place Canva Editable Video / Image Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/40 bg-emerald-950/90 aspect-[4/3]">
              <EditableMedia
                type={siteConfig.heroMediaType || 'image'}
                src={siteConfig.heroMediaUrl || featuredImage?.url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'}
                alt="Proyecto Solviplas"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
                onSave={(newSrc, newType) => {
                  updateSiteConfig({ heroMediaUrl: newSrc, heroMediaType: newType });
                  if (featuredImage) {
                    updateMediaItem(featuredImage.id, { url: newSrc, type: newType });
                  }
                }}
                label="Cambiar Foto o Video Principal"
              />

              {/* Caption badge */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-emerald-950/85 backdrop-blur-md border border-emerald-600/40 z-10 pointer-events-auto">
                <EditableText
                  value={featuredImage?.title || 'Lámina Flexible de Bioplástico'}
                  onSave={(val) => {
                    if (featuredImage) {
                      updateMediaItem(featuredImage.id, { title: val });
                    }
                  }}
                  tagName="p"
                  className="text-xs font-bold text-emerald-200 line-clamp-1 block"
                />
                <EditableText
                  value={featuredImage?.description || 'Biopolímero natural a base de almidón y glicerina vegetal'}
                  onSave={(val) => {
                    if (featuredImage) {
                      updateMediaItem(featuredImage.id, { description: val });
                    }
                  }}
                  tagName="p"
                  className="text-[11px] text-emerald-300/80 line-clamp-1 mt-0.5 block"
                />
              </div>
            </div>
          </div>

        </div>

        {/* In-Place Editable Key Impact Metrics Bar */}
        <div className="mt-14 pt-8 border-t border-emerald-800/60 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 backdrop-blur-sm text-left">
            <EditableText
              value={String(siteConfig.stats.beneficiarios)}
              onSave={(val) => updateSiteConfig({
                stats: { ...siteConfig.stats, beneficiarios: Number(val) || 0 }
              })}
              tagName="p"
              className="text-3xl sm:text-4xl font-black text-emerald-300 block"
            />
            <EditableText
              value={siteConfig.stats.beneficiariosLabel}
              onSave={(val) => updateSiteConfig({
                stats: { ...siteConfig.stats, beneficiariosLabel: val }
              })}
              tagName="p"
              className="text-xs sm:text-sm text-emerald-100/80 font-medium mt-1 block"
            />
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 backdrop-blur-sm text-left">
            <EditableText
              value={siteConfig.stats.presupuesto}
              onSave={(val) => updateSiteConfig({
                stats: { ...siteConfig.stats, presupuesto: val }
              })}
              tagName="p"
              className="text-3xl sm:text-4xl font-black text-teal-300 block"
            />
            <EditableText
              value={siteConfig.stats.presupuestoLabel}
              onSave={(val) => updateSiteConfig({
                stats: { ...siteConfig.stats, presupuestoLabel: val }
              })}
              tagName="p"
              className="text-xs sm:text-sm text-emerald-100/80 font-medium mt-1 block"
            />
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 backdrop-blur-sm text-left">
            <EditableText
              value={siteConfig.stats.reduccionHuella}
              onSave={(val) => updateSiteConfig({
                stats: { ...siteConfig.stats, reduccionHuella: val }
              })}
              tagName="p"
              className="text-3xl sm:text-4xl font-black text-green-300 block"
            />
            <EditableText
              value={siteConfig.stats.reduccionHuellaLabel}
              onSave={(val) => updateSiteConfig({
                stats: { ...siteConfig.stats, reduccionHuellaLabel: val }
              })}
              tagName="p"
              className="text-xs sm:text-sm text-emerald-100/80 font-medium mt-1 block"
            />
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 backdrop-blur-sm text-left">
            <EditableText
              value={siteConfig.stats.adopcionPostest}
              onSave={(val) => updateSiteConfig({
                stats: { ...siteConfig.stats, adopcionPostest: val }
              })}
              tagName="p"
              className="text-3xl sm:text-4xl font-black text-emerald-300 block"
            />
            <EditableText
              value={siteConfig.stats.adopcionLabel}
              onSave={(val) => updateSiteConfig({
                stats: { ...siteConfig.stats, adopcionLabel: val }
              })}
              tagName="p"
              className="text-xs sm:text-sm text-emerald-100/80 font-medium mt-1 block"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
