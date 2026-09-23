import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import {
  Package,
  Plus,
  Trash2,
  ExternalLink,
  Droplets,
  Clock,
  Layers,
  Sparkles,
  X,
  ChefHat,
  Lightbulb,
  CheckCircle2,
  Waves,
  Tag
} from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableMedia } from './CanvaEditor/EditableMedia';

export const ProductsSection: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    isAdmin,
    isLiveEditEnabled,
    showToast
  } = useApp();

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [isDissolvingSim, setIsDissolvingSim] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  const canEdit = isAdmin && isLiveEditEnabled;

  // Categories extracted from products
  const categories = ['todos', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = filterCategory === 'todos'
    ? products
    : products.filter(p => p.category === filterCategory);

  // Trigger interactive water dissolution simulation
  const startDissolutionSim = () => {
    setIsDissolvingSim(true);
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDissolvingSim(false), 2000);
          showToast('¡El bioplástico se ha disuelto por completo en agua sin contaminar!', 'success');
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  // Add specific ingredient to currently selected product
  const handleAddProductIngredient = (prodId: string) => {
    if (!selectedProduct) return;
    const newIng = {
      id: 'ing-' + Date.now(),
      name: 'Nuevo Insumo Natural',
      amount: 'Proporción recomendada',
      purpose: 'Propósito técnico'
    };
    const updatedIngredients = [...(selectedProduct.ingredients || []), newIng];
    updateProduct(prodId, { ingredients: updatedIngredients });
    setSelectedProduct(prev => prev ? { ...prev, ingredients: updatedIngredients } : null);
  };

  // Delete specific ingredient
  const handleDeleteProductIngredient = (prodId: string, ingId: string) => {
    if (!selectedProduct) return;
    const updatedIngredients = selectedProduct.ingredients.filter(i => i.id !== ingId);
    updateProduct(prodId, { ingredients: updatedIngredients });
    setSelectedProduct(prev => prev ? { ...prev, ingredients: updatedIngredients } : null);
  };

  // Update specific ingredient
  const handleUpdateProductIngredient = (prodId: string, ingId: string, updated: any) => {
    if (!selectedProduct) return;
    const updatedIngredients = selectedProduct.ingredients.map(i => i.id === ingId ? { ...i, ...updated } : i);
    updateProduct(prodId, { ingredients: updatedIngredients });
    setSelectedProduct(prev => prev ? { ...prev, ingredients: updatedIngredients } : null);
  };

  // Add specific step to currently selected product
  const handleAddProductStep = (prodId: string) => {
    if (!selectedProduct) return;
    const nextNum = (selectedProduct.steps?.length || 0) + 1;
    const newStep = {
      id: 'step-' + Date.now(),
      stepNumber: nextNum,
      title: `Paso ${nextNum}: Nueva Fase Específica`,
      description: 'Describe el procedimiento requerido para este producto.',
      tip: 'Recomendación práctica.'
    };
    const updatedSteps = [...(selectedProduct.steps || []), newStep];
    updateProduct(prodId, { steps: updatedSteps });
    setSelectedProduct(prev => prev ? { ...prev, steps: updatedSteps } : null);
  };

  // Delete specific step
  const handleDeleteProductStep = (prodId: string, stepId: string) => {
    if (!selectedProduct) return;
    const updatedSteps = selectedProduct.steps.filter(s => s.id !== stepId).map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    updateProduct(prodId, { steps: updatedSteps });
    setSelectedProduct(prev => prev ? { ...prev, steps: updatedSteps } : null);
  };

  // Update specific step
  const handleUpdateProductStep = (prodId: string, stepId: string, updated: any) => {
    if (!selectedProduct) return;
    const updatedSteps = selectedProduct.steps.map(s => s.id === stepId ? { ...s, ...updated } : s);
    updateProduct(prodId, { steps: updatedSteps });
    setSelectedProduct(prev => prev ? { ...prev, steps: updatedSteps } : null);
  };

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Package className="w-3.5 h-3.5 text-emerald-400" />
            <EditableText
              value={siteConfig.productsBadge}
              onSave={(val) => updateSiteConfig({ productsBadge: val })}
              tagName="span"
            />
          </div>

          <EditableText
            value={siteConfig.productsTitle}
            onSave={(val) => updateSiteConfig({ productsTitle: val })}
            tagName="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
          />

          <EditableText
            value={siteConfig.productsSubtitle}
            onSave={(val) => updateSiteConfig({ productsSubtitle: val })}
            tagName="p"
            className="text-base sm:text-lg text-emerald-200/90 font-medium mb-3"
          />

          <EditableText
            value={siteConfig.productsDescription}
            onSave={(val) => updateSiteConfig({ productsDescription: val })}
            tagName="p"
            className="text-sm text-slate-300 leading-relaxed"
          />
        </div>

        {/* Categories Bar & Admin Add Product Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          
          {/* Horizontal scrollable category pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-emerald-500 text-emerald-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat === 'todos' ? 'Todos los Productos' : cat}
              </button>
            ))}
          </div>

          {/* Admin Add Product Button */}
          {canEdit && (
            <button
              type="button"
              onClick={() => addProduct()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950 transition-all hover:scale-105 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Nuevo Producto</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group rounded-3xl bg-slate-900/90 border border-emerald-900/40 hover:border-emerald-500/60 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Media Container */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <EditableMedia
                    type={prod.mediaType}
                    src={prod.mediaUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                    onSave={(newSrc, newType) =>
                      updateProduct(prod.id, { mediaUrl: newSrc, mediaType: newType })
                    }
                    label="Cambiar Foto / Video"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                      {prod.badge}
                    </span>
                  </div>

                  {/* Admin Delete Card Button */}
                  {canEdit && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`¿Eliminar el producto "${prod.name}"?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="absolute top-3 right-3 z-30 p-2 rounded-xl bg-rose-950/80 hover:bg-rose-700 text-rose-200 hover:text-white transition-colors shadow-lg"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-2">
                    <Tag className="w-3.5 h-3.5" />
                    <EditableText
                      value={prod.category}
                      onSave={(val) => updateProduct(prod.id, { category: val })}
                      tagName="span"
                    />
                  </div>

                  <EditableText
                    value={prod.name}
                    onSave={(val) => updateProduct(prod.id, { name: val })}
                    tagName="h3"
                    className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors mb-2"
                  />

                  <EditableText
                    value={prod.shortDescription}
                    onSave={(val) => updateProduct(prod.id, { shortDescription: val })}
                    tagName="p"
                    multiline
                    className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4"
                  />

                  {/* Quick specs pills */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-1.5 truncate">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{prod.dissolutionTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{prod.thickness}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action: View Details & Specific Formula */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(prod)}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 hover:text-white text-xs font-extrabold transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Ver Ingredientes y Pasos de Elaboración</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-400">No hay productos en esta categoría.</p>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE PRODUCT MODAL: INGREDIENTS, STEPS & DISOLVING */}
      {/* ========================================================= */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-slate-900 border border-emerald-700/50 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-white my-auto animate-fadeIn relative p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-10">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                  <EditableText
                    value={selectedProduct.badge}
                    onSave={(val) => {
                      updateProduct(selectedProduct.id, { badge: val });
                      setSelectedProduct({ ...selectedProduct, badge: val });
                    }}
                    tagName="span"
                  />
                </span>
                <span className="text-xs text-slate-400">
                  Categoría:{' '}
                  <EditableText
                    value={selectedProduct.category}
                    onSave={(val) => {
                      updateProduct(selectedProduct.id, { category: val });
                      setSelectedProduct({ ...selectedProduct, category: val });
                    }}
                    tagName="span"
                    className="font-bold text-white"
                  />
                </span>
              </div>

              <EditableText
                value={selectedProduct.name}
                onSave={(val) => {
                  updateProduct(selectedProduct.id, { name: val });
                  setSelectedProduct({ ...selectedProduct, name: val });
                }}
                tagName="h2"
                className="text-2xl sm:text-3xl font-black text-white"
              />
            </div>

            {/* Media Banner */}
            <div className="mb-6 rounded-2xl overflow-hidden aspect-video max-h-72 border border-slate-800 relative bg-black shadow-lg">
              <EditableMedia
                type={selectedProduct.mediaType}
                src={selectedProduct.mediaUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
                onSave={(newSrc, newType) => {
                  updateProduct(selectedProduct.id, { mediaUrl: newSrc, mediaType: newType });
                  setSelectedProduct({ ...selectedProduct, mediaUrl: newSrc, mediaType: newType });
                }}
                label="Cambiar Foto o Video de este Producto"
              />
            </div>

            {/* Detailed Description */}
            <div className="mb-8">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Descripción y Aplicación Práctica:
              </p>
              <EditableText
                value={selectedProduct.description}
                onSave={(val) => {
                  updateProduct(selectedProduct.id, { description: val });
                  setSelectedProduct({ ...selectedProduct, description: val });
                }}
                tagName="p"
                multiline
                className="text-sm text-slate-200 leading-relaxed"
              />
            </div>

            {/* Technical Specs Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-8">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">⏱️ Tiempo de Disolución:</span>
                <EditableText
                  value={selectedProduct.dissolutionTime}
                  onSave={(val) => {
                    updateProduct(selectedProduct.id, { dissolutionTime: val });
                    setSelectedProduct({ ...selectedProduct, dissolutionTime: val });
                  }}
                  tagName="span"
                  className="text-xs font-bold text-emerald-300"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">📏 Grosor / Calibre:</span>
                <EditableText
                  value={selectedProduct.thickness}
                  onSave={(val) => {
                    updateProduct(selectedProduct.id, { thickness: val });
                    setSelectedProduct({ ...selectedProduct, thickness: val });
                  }}
                  tagName="span"
                  className="text-xs font-bold text-teal-300"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">🎯 Aplicación Óptima:</span>
                <EditableText
                  value={selectedProduct.usage}
                  onSave={(val) => {
                    updateProduct(selectedProduct.id, { usage: val });
                    setSelectedProduct({ ...selectedProduct, usage: val });
                  }}
                  tagName="span"
                  className="text-xs font-bold text-slate-200"
                />
              </div>
            </div>

            {/* Interactive Dissolution Simulator Button */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-emerald-950/50 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-cyan-200 uppercase tracking-wide">
                    Simulador de Biodegradabilidad e Hidrosolubilidad
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Comprueba cómo este producto desaparece al contacto con agua tibia.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={startDissolutionSim}
                disabled={isDissolvingSim}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md transition-all shrink-0 disabled:opacity-50"
              >
                {isDissolvingSim ? 'Disolviendo...' : 'Probar Disolución en Agua'}
              </button>
            </div>

            {/* Dissolution animation progress bar */}
            {isDissolvingSim && (
              <div className="mb-8 p-4 rounded-2xl bg-slate-950 border border-cyan-600/50 animate-pulse">
                <div className="flex justify-between text-xs font-bold text-cyan-300 mb-2">
                  <span>Reacción en agua a 55°C en progreso...</span>
                  <span>{simProgress}% disuelto</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${simProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* ======================================= */}
            {/* SPECIFIC INGREDIENTS LIST FOR THIS PRODUCT */}
            {/* ======================================= */}
            <div className="mb-10">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-emerald-400" />
                  <span>Fórmula e Ingredientes Específicos para este Producto</span>
                </h3>
                {canEdit && (
                  <button
                    type="button"
                    onClick={() => handleAddProductIngredient(selectedProduct.id)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-900/60 hover:bg-emerald-800 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Ingrediente</span>
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {selectedProduct.ingredients?.map((ing) => (
                  <div
                    key={ing.id}
                    className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <EditableText
                          value={ing.name}
                          onSave={(val) => handleUpdateProductIngredient(selectedProduct.id, ing.id, { name: val })}
                          tagName="span"
                          className="font-bold text-xs sm:text-sm text-white"
                        />
                      </div>
                      <EditableText
                        value={ing.purpose}
                        onSave={(val) => handleUpdateProductIngredient(selectedProduct.id, ing.id, { purpose: val })}
                        tagName="p"
                        className="text-[11px] text-slate-400 mt-0.5"
                      />
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 font-extrabold text-xs">
                        <EditableText
                          value={ing.amount}
                          onSave={(val) => handleUpdateProductIngredient(selectedProduct.id, ing.id, { amount: val })}
                          tagName="span"
                        />
                      </span>

                      {canEdit && selectedProduct.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteProductIngredient(selectedProduct.id, ing.id)}
                          className="p-1 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-900/50 transition-colors opacity-70 group-hover:opacity-100"
                          title="Eliminar ingrediente"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ======================================= */}
            {/* SPECIFIC PREPARATION STEPS FOR THIS PRODUCT */}
            {/* ======================================= */}
            <div className="mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-teal-400" />
                  <span>Pasos de Elaboración Específicos</span>
                </h3>
                {canEdit && (
                  <button
                    type="button"
                    onClick={() => handleAddProductStep(selectedProduct.id)}
                    className="flex items-center gap-1 text-xs font-bold text-teal-300 hover:text-white bg-teal-900/60 hover:bg-teal-800 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Paso</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {selectedProduct.steps?.map((step) => (
                  <div
                    key={step.id}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3.5 group"
                  >
                    <div className="w-7 h-7 rounded-xl bg-teal-950 border border-teal-700 text-teal-300 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <EditableText
                          value={step.title}
                          onSave={(val) => handleUpdateProductStep(selectedProduct.id, step.id, { title: val })}
                          tagName="h4"
                          className="text-xs sm:text-sm font-bold text-white"
                        />

                        {canEdit && selectedProduct.steps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteProductStep(selectedProduct.id, step.id)}
                            className="p-1 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-900/50 transition-colors opacity-0 group-hover:opacity-100"
                            title="Eliminar paso"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <EditableText
                        value={step.description}
                        onSave={(val) => handleUpdateProductStep(selectedProduct.id, step.id, { description: val })}
                        tagName="p"
                        multiline
                        className="text-xs text-slate-300 leading-relaxed mb-2"
                      />

                      {step.tip && (
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 font-medium">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <EditableText
                            value={step.tip}
                            onSave={(val) => handleUpdateProductStep(selectedProduct.id, step.id, { tip: val })}
                            tagName="span"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
