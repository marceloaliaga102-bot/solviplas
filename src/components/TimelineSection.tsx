import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';

export const TimelineSection: React.FC = () => {
  const { siteConfig, activities, updateActivity } = useApp();
  const [selectedObjective, setSelectedObjective] = useState<number | 'all'>('all');

  if (!siteConfig.sections.timeline?.enabled) return null;

  const filteredActivities = selectedObjective === 'all'
    ? activities
    : activities.filter(a => a.objectiveId === selectedObjective);

  return (
    <section id="timeline" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Planificación Estratégica 2025</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cronograma y Fases del Proyecto
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Desarrollo de acciones ejecutadas por el equipo de investigación para la implementación de bioplásticos biodegradables.
          </p>
        </div>

        {/* Filter by Objective */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedObjective('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedObjective === 'all'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todas las Fases (1 a 5)
          </button>
          {[
            { id: 1, label: 'Fase 1: Fabricación' },
            { id: 2, label: 'Fase 2: Difusión' },
            { id: 3, label: 'Fase 3: Talleres' },
            { id: 4, label: 'Fase 4: Evaluación' },
            { id: 5, label: 'Fase 5: Replicabilidad' },
          ].map(obj => (
            <button
              key={obj.id}
              onClick={() => setSelectedObjective(obj.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedObjective === obj.id
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {obj.label}
            </button>
          ))}
        </div>

        {/* Activity Cards List */}
        <div className="space-y-4">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    {act.activityCode}
                  </span>
                  <EditableText
                    value={act.name}
                    onSave={(val) => updateActivity(act.id, { name: val })}
                    tagName="h4"
                    className="text-base font-bold text-slate-900 block"
                  />
                </div>
                <EditableText
                  value={act.description}
                  onSave={(val) => updateActivity(act.id, { description: val })}
                  tagName="p"
                  multiline
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed block"
                />
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    Responsable:{' '}
                    <EditableText
                      value={act.responsible}
                      onSave={(val) => updateActivity(act.id, { responsible: val })}
                      tagName="span"
                      className="font-bold text-slate-800"
                    />
                  </span>
                </div>
              </div>

              {/* Execution Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
                {/* Active Months Badges */}
                <div className="flex flex-wrap gap-1">
                  {act.months.map(m => (
                    <span
                      key={m}
                      className="px-2 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Status Tag */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    act.status === 'completado'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {act.status === 'completado' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Completado</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>En Proceso</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
