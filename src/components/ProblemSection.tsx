import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, GitFork, ArrowDown, ArrowUp, CheckCircle } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';

export const ProblemSection: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();
  const [activeTree, setActiveTree] = useState<'problem' | 'objective'>('problem');

  if (!siteConfig.sections.problem?.enabled) return null;

  return (
    <section id="problem" className="py-16 sm:py-24 bg-gradient-to-b from-white to-emerald-50/50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Diagnóstico Ambiental & Realidad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            La Problemática de los Plásticos de Un Solo Uso
          </h2>
          <EditableText
            value={siteConfig.problemText}
            onSave={(val) => updateSiteConfig({ problemText: val })}
            tagName="p"
            multiline
            className="mt-3 text-base sm:text-lg text-slate-600 block"
          />
        </div>

        {/* Tree Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 backdrop-blur-md shadow-inner">
            <button
              onClick={() => setActiveTree('problem')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTree === 'problem'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              <GitFork className="w-4 h-4 rotate-180" />
              <span>Árbol de Problemas (Causas & Consecuencias)</span>
            </button>
            <button
              onClick={() => setActiveTree('objective')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTree === 'objective'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Árbol de Objetivos (Medios & Efectos)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tree Diagram */}
        {activeTree === 'problem' ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-rose-200/80 shadow-xl space-y-8 animate-fadeIn">
            
            {/* Consecuencias (Copa del Árbol) */}
            <div>
              <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-700 mb-4">
                <ArrowUp className="w-4 h-4" />
                <span>Efectos y Consecuencias en el Ecosistema y Salud</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Contaminación de suelos, ríos y mares", desc: "Acumulación masiva en vertederos y ecosistemas naturales terrestres y acuáticos." },
                  { title: "Daño a fauna marina y terrestre", desc: "Ingesta accidental de plásticos por animales y pérdida progresiva de biodiversidad." },
                  { title: "Presencia de microplásticos", desc: "Partículas microscópicas no biodegradables presentes en alimentos y agua de consumo." },
                  { title: "Mayor emisión de gases contaminantes", desc: "Quema indiscriminada de plásticos y alta huella de carbono de la refinación petrolera." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center shadow-sm">
                    <h4 className="text-xs sm:text-sm font-bold text-rose-950 mb-1">{item.title}</h4>
                    <p className="text-[11px] text-rose-800 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tronco: Problema Central */}
            <div className="relative py-2 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-rose-300" />
              <div className="w-full max-w-xl p-5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-center shadow-lg ring-4 ring-rose-200">
                <span className="text-[10px] uppercase font-black tracking-widest text-rose-200 block mb-1">
                  Problema Central Identificado
                </span>
                <EditableText
                  value="Contaminación ambiental acelerada por el consumo masivo de polímeros plásticos sintéticos no biodegradables"
                  onSave={() => {}}
                  tagName="h3"
                  className="text-base sm:text-lg font-extrabold leading-snug block"
                />
              </div>
              <div className="w-0.5 h-6 bg-rose-300" />
            </div>

            {/* Causas (Raíces del Árbol) */}
            <div>
              <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-700 mb-4">
                <ArrowDown className="w-4 h-4" />
                <span>Causas Principales</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Producción masiva de plásticos fósiles", desc: "Alta disponibilidad comercial y bajo costo aparente de derivados del petróleo." },
                  { title: "Consumo cotidiano de empaques desechables", desc: "Uso generalizado de forros, envolturas y bolsas de un solo uso sin sustitutos claros." },
                  { title: "Deficiente gestión de residuos", desc: "Escasez de puntos de reciclaje y baja tasa de recuperación de polímeros sintéticos." },
                  { title: "Escasa difusión de química verde", desc: "Poco conocimiento práctico sobre bioplásticos caseros hidrosolubles y compostables." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-center shadow-sm">
                    <h4 className="text-xs sm:text-sm font-bold text-amber-950 mb-1">{item.title}</h4>
                    <p className="text-[11px] text-amber-800 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-emerald-200/80 shadow-xl space-y-8 animate-fadeIn">
            
            {/* Efectos Positivos Esperados (Copa) */}
            <div>
              <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-4">
                <ArrowUp className="w-4 h-4" />
                <span>Fines y Efectos Positivos del Proyecto</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Conservar ecosistemas acuáticos y terrestres", desc: "Cero residuos plásticos no degradables en canales y áreas verdes comunitarias." },
                  { title: "Proteger la biodiversidad", desc: "Eliminación del riesgo de ingestión plástica por animales y preservación de hábitats." },
                  { title: "Cuidar la salud humana", desc: "Espacios de uso cotidiano libres de partículas sintéticas y microplásticos tóxicos." },
                  { title: "Disminuir la huella de carbono", desc: "Hasta 60% menos emisiones que la síntesis de polímeros petroquímicos convencionales." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center shadow-sm">
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950 mb-1">{item.title}</h4>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tronco: Objetivo Central */}
            <div className="relative py-2 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-emerald-300" />
              <div className="w-full max-w-xl p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center shadow-lg ring-4 ring-emerald-200">
                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-200 block mb-1">
                  Propósito Central
                </span>
                <EditableText
                  value="Implementar bioplásticos hidrosolubles y biodegradables accesibles para reemplazar materiales sintéticos"
                  onSave={() => {}}
                  tagName="h3"
                  className="text-base sm:text-lg font-extrabold leading-snug block"
                />
              </div>
              <div className="w-0.5 h-6 bg-emerald-300" />
            </div>

            {/* Medios de Solución (Raíces) */}
            <div>
              <div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-4">
                <ArrowDown className="w-4 h-4" />
                <span>Medios y Acciones Estratégicas</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Formulación con insumos naturales", desc: "Aprovechamiento de almidón vegetal, glicerina y vinagre para una matriz maleable." },
                  { title: "Capacitación práctica abierta", desc: "Enseñanza directa paso a paso para que cualquier persona produzca sus propias láminas." },
                  { title: "Prototipos funcionales", desc: "Elaboración de cubiertas, protectores y bolsas biodegradables de disolución segura." },
                  { title: "Evaluación y difusión", desc: "Comprobación de solubilidad en agua y monitoreo del cambio hacia hábitos ecológicos." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 text-center shadow-sm">
                    <h4 className="text-xs sm:text-sm font-bold text-teal-950 mb-1">{item.title}</h4>
                    <p className="text-[11px] text-teal-800 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
