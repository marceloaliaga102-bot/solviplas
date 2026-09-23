import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Beaker, Sparkles, Droplet, Calculator, RefreshCw, CheckCircle2 } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';

export const RecipeProcessSection: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();

  // Portions multiplier
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1);

  // Solubility test simulator state
  const [waterTemp, setWaterTemp] = useState<'caliente' | 'tibia' | 'fria'>('caliente');
  const [testTime, setTestTime] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  if (!siteConfig.sections.recipe?.enabled) return null;

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setTestTime(0);
    const interval = setInterval(() => {
      setTestTime(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setTestTime(0);
  };

  return (
    <section id="recipe" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Beaker className="w-3.5 h-3.5" />
            <span>Fórmula de Química Verde</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cómo se Elabora Solviplas
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Una receta ecológica, segura y económica desarrollada con insumos naturales accesibles con un presupuesto optimizado de S/. 30 soles.
          </p>
        </div>

        {/* Portion Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 mb-10">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Calculadora de Proporciones para la Mezcla:</span>
          </div>
          <div className="flex gap-2">
            {[
              { label: "1 Lámina Individual", mult: 1 },
              { label: "Lote Mediano (25 láminas)", mult: 5 },
              { label: "Lote de Taller (100 láminas)", mult: 20 },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => setPortionMultiplier(item.mult)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  portionMultiplier === item.mult
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Grid (Canva Editable) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {siteConfig.recipeIngredients.map((ing, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-400 transition-all">
              <div className="flex items-start justify-between gap-2 mb-2">
                <EditableText
                  value={ing.name}
                  onSave={(val) => {
                    const updated = [...siteConfig.recipeIngredients];
                    updated[idx] = { ...updated[idx], name: val };
                    updateSiteConfig({ recipeIngredients: updated });
                  }}
                  tagName="h4"
                  className="font-bold text-slate-900 text-sm block"
                />
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold whitespace-nowrap">
                  {portionMultiplier === 1 ? ing.amount : `${portionMultiplier}x dosis`}
                </span>
              </div>
              <EditableText
                value={ing.purpose}
                onSave={(val) => {
                  const updated = [...siteConfig.recipeIngredients];
                  updated[idx] = { ...updated[idx], purpose: val };
                  updateSiteConfig({ recipeIngredients: updated });
                }}
                tagName="p"
                multiline
                className="text-xs text-slate-600 leading-relaxed block"
              />
            </div>
          ))}
        </div>

        {/* Cooking & Curing Steps (Canva Editable) */}
        <div className="mb-20">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-8">
            Pasos de Fabricación Artesanal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.recipeSteps.map((step, idx) => (
              <div key={step.stepNumber} className="relative p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm mb-4 shadow">
                    {step.stepNumber}
                  </div>
                  <EditableText
                    value={step.title}
                    onSave={(val) => {
                      const updated = [...siteConfig.recipeSteps];
                      updated[idx] = { ...updated[idx], title: val };
                      updateSiteConfig({ recipeSteps: updated });
                    }}
                    tagName="h4"
                    className="text-base font-bold text-slate-900 mb-2 block"
                  />
                  <EditableText
                    value={step.description}
                    onSave={(val) => {
                      const updated = [...siteConfig.recipeSteps];
                      updated[idx] = { ...updated[idx], description: val };
                      updateSiteConfig({ recipeSteps: updated });
                    }}
                    tagName="p"
                    multiline
                    className="text-xs text-slate-600 leading-relaxed mb-4 block"
                  />
                </div>
                <div className="pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-800 font-medium flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <strong>Consejo: </strong>
                    <EditableText
                      value={step.tip}
                      onSave={(val) => {
                        const updated = [...siteConfig.recipeSteps];
                        updated[idx] = { ...updated[idx], tip: val };
                        updateSiteConfig({ recipeSteps: updated });
                      }}
                      tagName="span"
                      className="inline"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Experiment: Prueba de Hidrosolubilidad */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white shadow-2xl border border-emerald-800/60 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-bold mb-2">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>Simulador Interactivo de Laboratorio</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Prueba de Disolución en Agua: Solviplas vs. Plástico Común
                </h3>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                  <button
                    onClick={() => setWaterTemp('caliente')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      waterTemp === 'caliente' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Agua Caliente (50°C)
                  </button>
                  <button
                    onClick={() => setWaterTemp('tibia')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      waterTemp === 'tibia' ? 'bg-teal-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Agua Tibia (30°C)
                  </button>
                  <button
                    onClick={() => setWaterTemp('fria')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      waterTemp === 'fria' ? 'bg-blue-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Agua Fría (18°C)
                  </button>
                </div>

                {!isSimulating ? (
                  <button
                    onClick={handleStartSimulation}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow-lg transition-all"
                  >
                    Iniciar Prueba de Inmersión
                  </button>
                ) : (
                  <button
                    onClick={handleResetSimulation}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Reiniciar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Comparison Flasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Solviplas Flask */}
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Muestra A: Lámina Solviplas (Biopolímero)
                  </span>
                  <span className="text-xs text-emerald-400 font-mono">
                    {testTime}% Disolución
                  </span>
                </div>

                <div className="h-44 rounded-xl bg-slate-900 border border-emerald-800/60 relative overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-emerald-500/10 transition-all duration-300"
                    style={{
                      height: `${60 + testTime * 0.4}%`,
                      bottom: 0,
                    }}
                  />
                  <div
                    className="w-24 h-24 rounded-2xl bg-emerald-400/70 backdrop-blur-sm border-2 border-emerald-300 transition-all duration-500 flex items-center justify-center text-center p-2"
                    style={{
                      opacity: Math.max(0, 1 - testTime / 100),
                      transform: `scale(${Math.max(0.2, 1 - testTime / 120)}) rotate(${testTime * 0.8}deg)`,
                      filter: `blur(${testTime * 0.08}px)`,
                    }}
                  >
                    <span className="text-[10px] font-bold text-emerald-950">
                      {testTime < 100 ? 'Solviplas' : 'Disuelto'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3">
                  {testTime === 0 && 'Muestra íntegra lista para entrar en contacto con el solvente acuoso.'}
                  {testTime > 0 && testTime < 100 && 'La matriz de amilosa y amilopectina se hidrata y rompe suavemente sin toxinas.'}
                  {testTime === 100 && '¡Disolución total! El agua permanece libre de microplásticos y el residuo es 100% compostable.'}
                </p>
              </div>

              {/* Conventional Plastic Flask */}
              <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/30 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Muestra B: Plástico Fósil Convencional (Polietileno)
                  </span>
                  <span className="text-xs text-rose-400 font-mono">
                    0% Disolución (Inalterado)
                  </span>
                </div>

                <div className="h-44 rounded-xl bg-slate-900 border border-rose-800/60 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-rose-500/5" />
                  <div className="w-24 h-24 rounded-2xl bg-rose-400/80 border-2 border-rose-300 flex items-center justify-center text-center p-2 shadow-lg">
                    <span className="text-[10px] font-bold text-rose-950">
                      Plástico Sintético
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3">
                  Inalterable al contacto con agua. Tardará más de 400 años en fragmentarse, liberando toxinas y microplásticos continuos en el ecosistema.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
