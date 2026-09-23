import React from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, ArrowUp, Sparkles, Globe, Heart } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';

export const Footer: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/80">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-emerald-950 shadow">
                <Leaf className="w-5 h-5" />
              </div>
              <EditableText
                value={siteConfig.siteName}
                onSave={(val) => updateSiteConfig({ siteName: val })}
                tagName="span"
                className="text-2xl font-black tracking-tight text-white block"
              />
            </div>
            <EditableText
              value={siteConfig.heroDescription}
              onSave={(val) => updateSiteConfig({ heroDescription: val })}
              tagName="p"
              multiline
              className="text-xs text-emerald-300/80 leading-relaxed block"
            />
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-[11px] font-semibold">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Iniciativa de Impacto Ecológico</span>
              </span>
            </div>
          </div>

          {/* Environmental Commitment */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Compromiso Verde
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/90">
              <li className="font-semibold text-emerald-300">Bioplásticos a base de almidón</li>
              <li>Disolución rápida y segura en agua</li>
              <li>100% libre de derivados de petróleo</li>
              <li className="font-semibold text-teal-300">Residuo compostable e inocuo</li>
              <li>Economía circular y química limpia</li>
            </ul>
          </div>

          {/* Academic & Scientific references */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Referencias y Base Científica
            </h4>
            <ul className="space-y-2 text-[11px] text-emerald-300/80 leading-snug">
              <li>• Ellen MacArthur Foundation - Principios de circularidad</li>
              <li>• Reducción de hasta un 60% en huella de carbono</li>
              <li>• Química verde aplicada a materiales cotidianos</li>
              <li>• Estándares de biodegradabilidad acuosa</li>
            </ul>
          </div>

          {/* Quick links & Scroll */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-3">
              Navegación Rápida
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-emerald-300">
              <a href="#hero" className="hover:text-white transition-colors">Inicio</a>
              <a href="#overview" className="hover:text-white transition-colors">El Proyecto</a>
              <a href="#recipe" className="hover:text-white transition-colors">Fórmula y Proceso</a>
              <a href="#results" className="hover:text-white transition-colors">Resultados</a>
              <a href="#gallery" className="hover:text-white transition-colors">Galería Multimedia</a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-xs text-emerald-200 hover:text-white transition-colors border border-emerald-800"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Volver arriba</span>
            </button>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p className="flex items-center gap-1">
            <span>© {siteConfig.year} {siteConfig.siteName} • Hecho con</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
            <span>para el medio ambiente.</span>
          </p>
          <div className="flex items-center gap-2 text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Optimizado para carga rápida y dispositivos móviles</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
