import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Leaf,
  LogIn,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';

export const Navbar: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    customSections,
    currentUser,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // All base navigation sections + dynamic custom sections
  const baseSections = [
    { id: 'hero', label: 'Inicio', emoji: '🌱' },
    { id: 'tutorial', label: 'Tutorial', emoji: '🧪' },
    { id: 'products', label: 'Productos', emoji: '📦' },
    { id: 'overview', label: 'El Proyecto', emoji: '🌿' },
    { id: 'problem', label: 'Problemática', emoji: '⚠️' },
    { id: 'recipe', label: 'Fórmula', emoji: '🔬' },
    { id: 'timeline', label: 'Cronograma', emoji: '📅' },
    { id: 'results', label: 'Resultados', emoji: '📊' },
    { id: 'gallery', label: 'Galería', emoji: '📸' },
    { id: 'team', label: 'Equipo', emoji: '👥' },
    { id: 'comments', label: 'Comunidad', emoji: '💬' },
  ];

  const allSections = [
    ...baseSections,
    ...customSections.map((sec) => ({
      id: sec.id,
      label: sec.title.length > 18 ? sec.title.slice(0, 18) + '...' : sec.title,
      emoji: '✨',
    })),
  ];

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = allSections.length - 1; i >= 0; i--) {
        const sec = allSections[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allSections]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollPills = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 text-white backdrop-blur-md border-b border-emerald-800/60 shadow-lg transition-all">
      {/* Top Header Row: Logo, Search, User Auth */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-300/30 group-hover:scale-105 transition-transform shrink-0">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-950 fill-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <EditableText
                  value={siteConfig.siteName}
                  onSave={(val) => updateSiteConfig({ siteName: val })}
                  tagName="span"
                  className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-200 via-teal-100 to-emerald-400 bg-clip-text text-transparent"
                />
                <span className="hidden sm:inline text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 border border-emerald-600/40">
                  Bioplásticos
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-300/80 font-medium line-clamp-1">
                Química Verde & Hidrosolubilidad
              </p>
            </div>
          </button>

          {/* User Session Buttons (Clean Auth - No Owner clues) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-emerald-800/80">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-emerald-400/50"
                />
                <div className="text-left hidden md:block max-w-[140px]">
                  <p className="text-xs font-bold truncate leading-tight text-white">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-emerald-300 truncate">
                    {currentUser.role === 'admin' ? 'Coordinación Solviplas' : (currentUser.institution || 'Comunidad')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="p-1.5 sm:p-2 text-emerald-300 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Ingresar</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Crear Cuenta</span>
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <div className="flex md:hidden items-center ml-1">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/60 rounded-xl transition-colors"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* HORIZONTAL QUICK NAVIGATION SECTION BUTTONS / PILLS       */}
      {/* On mobile: swipable horizontally with momentum scrolling  */}
      {/* ========================================================= */}
      <div className="border-t border-emerald-800/50 bg-emerald-950/70 relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative flex items-center">
          
          {/* Optional scroll arrow left (desktop/tablet) */}
          <button
            type="button"
            onClick={() => scrollPills('left')}
            className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white shrink-0 mr-1 z-10 transition-colors"
            aria-label="Desplazar menú a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Horizontally scrollable container for fast section jumping */}
          <nav
            ref={scrollContainerRef}
            aria-label="Navegación rápida de secciones"
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap py-2 sm:py-2.5 px-2 scrollbar-none snap-x touch-pan-x flex-1 scroll-smooth"
          >
            {allSections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`shrink-0 snap-start flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-400 text-emerald-950 shadow-md shadow-emerald-400/20 scale-105 ring-2 ring-emerald-300'
                      : 'bg-emerald-900/50 hover:bg-emerald-800/80 text-emerald-200 hover:text-white border border-emerald-700/50'
                  }`}
                >
                  <span className="text-[11px]">{sec.emoji}</span>
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Optional scroll arrow right (desktop/tablet) */}
          <button
            type="button"
            onClick={() => scrollPills('right')}
            className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white shrink-0 ml-1 z-10 transition-colors"
            aria-label="Desplazar menú a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* Mobile Drawer Dropdown if opened */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-800 bg-emerald-950/98 px-4 pt-3 pb-6 space-y-2 animate-fadeIn max-h-[70vh] overflow-y-auto">
          <p className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400 mb-2">
            Secciones del Sitio:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {allSections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs font-bold transition-colors ${
                  activeSection === sec.id
                    ? 'bg-emerald-500 text-emerald-950 font-black'
                    : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60'
                }`}
              >
                <span>{sec.emoji}</span>
                <span className="truncate">{sec.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
