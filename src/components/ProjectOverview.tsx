import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, Globe2, BookOpen, Compass, CheckCircle2, Users, MapPin } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';

export const ProjectOverview: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();

  if (!siteConfig.sections.overview?.enabled) return null;

  return (
    <section id="overview" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Datos Generales e Identidad</span>
          </div>
          <EditableText
            value="Proyecto Sostenible Solviplas"
            onSave={(val) => updateSiteConfig({ siteName: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight block"
          />
          <EditableText
            value={siteConfig.tagline}
            onSave={(val) => updateSiteConfig({ tagline: val })}
            tagName="p"
            className="mt-3 text-base sm:text-lg text-slate-600 block"
          />
        </div>

        {/* Fact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Alcance y Comunidad</h3>
            <EditableText
              value={siteConfig.institutionTarget}
              onSave={(val) => updateSiteConfig({ institutionTarget: val })}
              tagName="p"
              className="text-sm font-semibold text-emerald-800 mb-2 block"
            />
            <p className="text-xs text-slate-600 leading-relaxed">
              Personas, familias y participantes interesados en soluciones ecológicas que reducen el uso continuo de envolturas y plásticos convencionales.
            </p>
            <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center gap-1.5 text-xs text-emerald-900 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <EditableText
                value={siteConfig.location}
                onSave={(val) => updateSiteConfig({ location: val })}
                tagName="span"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50/80 to-emerald-50/40 border border-teal-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-4 shadow-md shadow-teal-600/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Objetivo General</h3>
            <EditableText
              value={siteConfig.generalObjective}
              onSave={(val) => updateSiteConfig({ generalObjective: val })}
              tagName="p"
              multiline
              className="text-xs text-slate-700 leading-relaxed block"
            />
            <div className="mt-4 pt-3 border-t border-teal-200/60 flex items-center gap-1 text-xs text-teal-800 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>100 Participantes directos en talleres</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-green-50/80 to-emerald-50/40 border border-green-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-green-700 text-white flex items-center justify-center mb-4 shadow-md shadow-green-700/20">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Alineación con los ODS</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Compromiso con la Agenda 2030 de las Naciones Unidas:
            </p>
            <div className="space-y-2">
              {siteConfig.odsGoals.map((ods, idx) => (
                <div key={ods.number} className="p-2.5 rounded-xl bg-white/80 border border-green-200 text-xs">
                  <EditableText
                    value={`ODS ${ods.number}: ${ods.title}`}
                    onSave={(val) => {
                      const updated = [...siteConfig.odsGoals];
                      updated[idx] = { ...updated[idx], title: val };
                      updateSiteConfig({ odsGoals: updated });
                    }}
                    tagName="span"
                    className="font-bold text-green-800 block"
                  />
                  <EditableText
                    value={ods.description}
                    onSave={(val) => {
                      const updated = [...siteConfig.odsGoals];
                      updated[idx] = { ...updated[idx], description: val };
                      updateSiteConfig({ odsGoals: updated });
                    }}
                    tagName="span"
                    multiline
                    className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 block"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Circular Economy Foundation */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold border border-emerald-700/60">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Economía Circular & Química Verde</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Transformando materiales cotidianos en soluciones biodegradables
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Siguiendo directrices de la <em>Ellen MacArthur Foundation</em> y principios de química verde, los biopolímeros derivados de fuentes vegetales renovables reducen hasta un 60% la huella de carbono asociada al petróleo. Con Solviplas cualquier persona puede elaborar empaques, fundas y protectores que se disuelven inocuamente en agua al terminar su ciclo de uso.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <p className="text-3xl font-extrabold text-emerald-400">100 a 500</p>
                <p className="text-xs text-slate-300 mt-1">Años que tarda en degradarse el plástico sintético tradicional</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <p className="text-3xl font-extrabold text-teal-300">Minutos</p>
                <p className="text-xs text-slate-300 mt-1">Tiempo de disolución limpia de Solviplas en agua tibia</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
