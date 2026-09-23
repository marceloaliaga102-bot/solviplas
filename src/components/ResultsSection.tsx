import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SURVEY_RESULTS } from '../data/initialData';
import { BarChart3, TrendingUp, Award, CheckCircle } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';

export const ResultsSection: React.FC = () => {
  const { siteConfig } = useApp();
  const [activeTab, setActiveTab] = useState<'prepost' | 'satisfaction'>('prepost');

  if (!siteConfig.sections.results?.enabled) return null;

  return (
    <section id="results" className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/40 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Evidencia & Resultados</span>
          </div>
          <EditableText
            value="Impacto y Validación Práctica de Solviplas"
            onSave={() => {}}
            tagName="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight block"
          />
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Muestra evaluada de <strong>100 participantes</strong> antes y después de los talleres prácticos de formulación ecológica.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('prepost')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'prepost'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Comparativa Pretest vs. Postest (+87% Adopción)</span>
            </button>
            <button
              onClick={() => setActiveTab('satisfaction')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'satisfaction'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Encuesta de Satisfacción (100 participantes)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Pretest vs Postest */}
        {activeTab === 'prepost' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top highlight card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300">
                  Hallazgo Principal del Proyecto
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  Disposición a sustituir el plástico por Solviplas saltó del 2% al 89%
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
                  Antes del taller, la gran mayoría dudaba o desconocía los bioplásticos solubles. Tras experimentar su fabricación con almidón vegetal, 89 de cada 100 participantes manifestaron su total disposición a reemplazar plásticos comunes.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-4 bg-white/10 px-6 py-4 rounded-2xl border border-white/20">
                <div className="text-center">
                  <span className="text-xs text-emerald-200 block">Antes</span>
                  <span className="text-2xl font-black text-rose-300">2%</span>
                </div>
                <TrendingUp className="w-6 h-6 text-emerald-300" />
                <div className="text-center">
                  <span className="text-xs text-emerald-200 block">Después</span>
                  <span className="text-3xl font-black text-emerald-300">89%</span>
                </div>
              </div>
            </div>

            {/* Questions Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SURVEY_RESULTS.pretestVsPostest.map((item, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      Pregunta #{idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mb-4">
                      {item.question}
                    </h4>

                    {/* Bars */}
                    <div className="space-y-4">
                      {/* Pretest */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-500">Pretest (Antes del taller):</span>
                          <span className="text-slate-700 font-bold">{item.pretest.correct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                          <div
                            className="bg-slate-400 h-full rounded-full transition-all duration-700"
                            style={{ width: `${item.pretest.correct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{item.pretest.label}</p>
                      </div>

                      {/* Postest */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-emerald-700 font-bold">Postest (Después del taller):</span>
                          <span className="text-emerald-700 font-black text-sm">{item.postest.correct}%</span>
                        </div>
                        <div className="w-full bg-emerald-100 rounded-full h-3.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700"
                            style={{ width: `${item.postest.correct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-emerald-800 font-medium mt-1">{item.postest.label}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Avance positivo registrado:</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px]">
                      {item.gain}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 2: Satisfaction Survey */}
        {activeTab === 'satisfaction' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Encuesta de Satisfacción Post-Taller
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluación cuantitativa sobre 100 encuestados directos
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> Muy Satisfecho
                </span>
                <span className="flex items-center gap-1.5 font-bold text-teal-600">
                  <span className="w-3 h-3 rounded-full bg-teal-400 inline-block" /> Satisfecho
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {SURVEY_RESULTS.satisfaction.map((metric, idx) => {
                const totalPositive = metric.muySatisfecho + metric.satisfecho;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800">{metric.metric}</span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                        {totalPositive}% Aprobación
                      </span>
                    </div>

                    <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full"
                        style={{ width: `${metric.muySatisfecho}%` }}
                        title={`Muy satisfecho: ${metric.muySatisfecho}%`}
                      />
                      <div
                        className="bg-teal-400 h-full"
                        style={{ width: `${metric.satisfecho}%` }}
                        title={`Satisfecho: ${metric.satisfecho}%`}
                      />
                      <div
                        className="bg-amber-300 h-full"
                        style={{ width: `${metric.pocoSatisfecho}%` }}
                        title={`Poco satisfecho: ${metric.pocoSatisfecho}%`}
                      />
                      <div
                        className="bg-rose-400 h-full"
                        style={{ width: `${metric.nadaSatisfecho}%` }}
                        title={`Nada satisfecho: ${metric.nadaSatisfecho}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3 text-xs text-emerald-900 mt-6">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Más del <strong>95% de los participantes</strong> calificó la experiencia formativa como positiva y altamente aplicable en su vida cotidiana.
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
