import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Clock,
  Thermometer,
  Lightbulb,
  CheckCircle2,
  Plus,
  Trash2,
  ChefHat,
  Sparkles,
  Layers,
  Droplets,
  Scale
} from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableMedia } from './CanvaEditor/EditableMedia';

export const TutorialSection: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    tutorialSteps,
    updateTutorialStep,
    addTutorialStep,
    deleteTutorialStep,
    tutorialIngredients,
    updateTutorialIngredient,
    addTutorialIngredient,
    deleteTutorialIngredient,
    isAdmin,
    isLiveEditEnabled
  } = useApp();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [portionMultiplier, setPortionMultiplier] = useState(1);
  const canEdit = isAdmin && isLiveEditEnabled;

  const currentStep = tutorialSteps[activeStepIndex] || tutorialSteps[0];

  return (
    <section id="tutorial" className="py-20 bg-gradient-to-b from-slate-900 via-emerald-950/60 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <EditableText
              value={siteConfig.tutorialBadge}
              onSave={(val) => updateSiteConfig({ tutorialBadge: val })}
              tagName="span"
            />
          </div>

          <EditableText
            value={siteConfig.tutorialTitle}
            onSave={(val) => updateSiteConfig({ tutorialTitle: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
          />

          <EditableText
            value={siteConfig.tutorialSubtitle}
            onSave={(val) => updateSiteConfig({ tutorialSubtitle: val })}
            tagName="p"
            className="text-base sm:text-lg text-emerald-200/90 font-medium mb-3"
          />

          <EditableText
            value={siteConfig.tutorialDescription}
            onSave={(val) => updateSiteConfig({ tutorialDescription: val })}
            tagName="p"
            className="text-sm text-slate-300 leading-relaxed"
          />
        </div>

        {/* Master Demonstration Media (Video / Photo) */}
        <div className="mb-16 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-teal-900/40 p-2 sm:p-4 rounded-3xl border border-emerald-800/40 shadow-2xl backdrop-blur-md">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video max-h-[500px]">
            <EditableMedia
              type={siteConfig.tutorialMediaType}
              src={siteConfig.tutorialMediaUrl}
              alt="Video tutorial de elaboración de bioplástico"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
              onSave={(newSrc, newType) =>
                updateSiteConfig({
                  tutorialMediaUrl: newSrc,
                  tutorialMediaType: newType,
                })
              }
              label="Cambiar Video o Portada del Tutorial"
            />
          </div>
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Demostración Oficial en Vivo: Gelatinización y Curado Artesanal</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>⏱️ Tiempo de cocción: ~7 min</span>
              <span>🌡️ Temperatura óptima: 80°C</span>
              <span>🌿 100% Inocuo</span>
            </div>
          </div>
        </div>

        {/* Interactive Steps Navigator & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Steps selector buttons */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Etapas del Proceso</span>
              </h3>
              {canEdit && (
                <button
                  type="button"
                  onClick={addTutorialStep}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-800/60 hover:bg-emerald-700 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Paso</span>
                </button>
              )}
            </div>

            <div className="space-y-2">
              {tutorialSteps.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600/90 to-teal-700 text-white border-emerald-400/50 shadow-lg shadow-emerald-950/40 scale-[1.02]'
                        : 'bg-slate-900/70 hover:bg-slate-800/80 text-slate-300 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-white text-emerald-900 shadow'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        0{step.stepNumber || idx + 1}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold line-clamp-1">{step.title}</p>
                        <p className="text-[10px] opacity-75">{step.duration} • {step.temp}</p>
                      </div>
                    </div>

                    {canEdit && tutorialSteps.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('¿Eliminar este paso?')) {
                            deleteTutorialStep(step.id);
                            if (activeStepIndex >= tutorialSteps.length - 1) {
                              setActiveStepIndex(Math.max(0, tutorialSteps.length - 2));
                            }
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-300 hover:text-rose-100 hover:bg-rose-900/60 transition-colors"
                        title="Eliminar paso"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Step Detailed Interactive View */}
          {currentStep && (
            <div className="lg:col-span-8 bg-slate-900/90 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/40">
                    PASO {currentStep.stepNumber}
                  </span>
                  <EditableText
                    value={currentStep.title}
                    onSave={(val) => updateTutorialStep(currentStep.id, { title: val })}
                    tagName="h3"
                    className="text-xl sm:text-2xl font-black text-white"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-emerald-300 border border-slate-700">
                    <Clock className="w-3.5 h-3.5" />
                    <EditableText
                      value={currentStep.duration}
                      onSave={(val) => updateTutorialStep(currentStep.id, { duration: val })}
                      tagName="span"
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-amber-300 border border-slate-700">
                    <Thermometer className="w-3.5 h-3.5" />
                    <EditableText
                      value={currentStep.temp}
                      onSave={(val) => updateTutorialStep(currentStep.id, { temp: val })}
                      tagName="span"
                      className="font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Step Media */}
              <div className="mb-6 rounded-2xl overflow-hidden aspect-video max-h-72 border border-slate-800 shadow-lg relative bg-black">
                <EditableMedia
                  type={currentStep.mediaType || 'image'}
                  src={currentStep.mediaUrl}
                  alt={currentStep.title}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                  onSave={(newSrc, newType) =>
                    updateTutorialStep(currentStep.id, {
                      mediaUrl: newSrc,
                      mediaType: newType,
                    })
                  }
                  label="Cambiar Foto o Video de este Paso"
                />
              </div>

              {/* Step Description */}
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Procedimiento Detallado:
                </p>
                <EditableText
                  value={currentStep.description}
                  onSave={(val) => updateTutorialStep(currentStep.id, { description: val })}
                  tagName="p"
                  multiline
                  className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal"
                />
              </div>

              {/* Pro Tip Box */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                    Consejo de Laboratorio:
                  </p>
                  <EditableText
                    value={currentStep.tip}
                    onSave={(val) => updateTutorialStep(currentStep.id, { tip: val })}
                    tagName="p"
                    className="text-xs text-amber-100/90 leading-normal"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Dynamic Ingredients Portion Calculator */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <ChefHat className="w-6 h-6 text-emerald-400" />
                <span>Ingredientes Requeridos y Calculadora de Proporciones</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Ajusta la cantidad según el número de láminas que desees preparar.
              </p>
            </div>

            {/* Portions selector */}
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 pl-2">Escala:</span>
              {[1, 3, 5, 10].map((mult) => (
                <button
                  key={mult}
                  type="button"
                  onClick={() => setPortionMultiplier(mult)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    portionMultiplier === mult
                      ? 'bg-emerald-500 text-emerald-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {mult}x {mult === 1 ? 'Lámina' : 'Láminas'}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {tutorialIngredients.map((ing) => (
              <div
                key={ing.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-900/50 hover:border-emerald-500/50 transition-colors flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">
                        <Droplets className="w-3.5 h-3.5" />
                      </div>
                      <EditableText
                        value={ing.name}
                        onSave={(val) => updateTutorialIngredient(ing.id, { name: val })}
                        tagName="h4"
                        className="text-xs sm:text-sm font-bold text-white"
                      />
                    </div>

                    {canEdit && tutorialIngredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('¿Retirar este ingrediente?')) {
                            deleteTutorialIngredient(ing.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-rose-400 hover:bg-rose-950/60 transition-opacity"
                        title="Eliminar ingrediente"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <EditableText
                    value={ing.purpose}
                    onSave={(val) => updateTutorialIngredient(ing.id, { purpose: val })}
                    tagName="p"
                    className="text-[11px] text-slate-400 leading-snug mb-3"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Cantidad:</span>
                  <div className="font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                    <EditableText
                      value={portionMultiplier > 1 ? `${ing.amount} (${portionMultiplier}x)` : ing.amount}
                      onSave={(val) => updateTutorialIngredient(ing.id, { amount: val })}
                      tagName="span"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Admin ingredient add button */}
          {canEdit && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addTutorialIngredient}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Ingrediente a la Fórmula</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
