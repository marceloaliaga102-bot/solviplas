import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, LogIn, UserPlus, Sparkles, Check, Loader2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginUser,
    registerUser,
  } = useApp();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAvatar, setRegAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');

  // When modal closes or mode toggles, ensure all inputs are completely clean
  useEffect(() => {
    if (!isAuthModalOpen) {
      setLoginIdentifier('');
      setLoginPassword('');
      setLoginError('');
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setIsSubmitting(false);
    }
  }, [isAuthModalOpen]);

  const avatarOptions = [
    { url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', label: 'Avatar 1' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', label: 'Avatar 2' },
    { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', label: 'Avatar 3' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', label: 'Avatar 4' },
    { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', label: 'Avatar 5' },
    { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', label: 'Avatar 6' },
  ];

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    try {
      const res = await loginUser(loginIdentifier, loginPassword);
      if (res.success) {
        setIsAuthModalOpen(false);
        setLoginIdentifier('');
        setLoginPassword('');
      } else {
        setLoginError(res.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    setIsSubmitting(true);
    try {
      const ok = await registerUser({
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword.trim(),
        avatar: regAvatar,
      });

      if (ok) {
        setIsAuthModalOpen(false);
        setRegName('');
        setRegEmail('');
        setRegPassword('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
        
        {/* Header with Close */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1 rounded-full hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-extrabold text-white">
              {authModalMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h3>
          </div>
          <p className="text-xs text-emerald-200/90 mt-1">
            Únete a la comunidad de Solviplas para comentar e interactuar.
          </p>

          {/* Nav tabs */}
          <div className="flex rounded-xl bg-emerald-950/80 p-1 border border-emerald-700/60 mt-4">
            <button
              onClick={() => { setAuthModalMode('login'); setLoginError(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authModalMode === 'login' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-emerald-200 hover:text-white'
              }`}
            >
              Ingresar
            </button>
            <button
              onClick={() => { setAuthModalMode('register'); setLoginError(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authModalMode === 'register' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-emerald-200 hover:text-white'
              }`}
            >
              Crear Cuenta
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* LOGIN FORM */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correo Electrónico o Usuario
                </label>
                <input
                  type="text"
                  required
                  placeholder="ejemplo@correo.com o tu usuario"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  placeholder="Ingresa tu contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Iniciar Sesión</span>
                  </>
                )}
              </button>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('marceloaliaga102@gmail.com');
                    setLoginPassword('Solviplas2025!');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Autocompletar Acceso Administrador (Marcelo Aliaga)</span>
                </button>
                <p className="text-[11px] text-center text-slate-400">
                  Credenciales de Admin: <span className="text-slate-600 font-mono">marceloaliaga102@gmail.com</span> / <span className="text-slate-600 font-mono">Solviplas2025!</span>
                </p>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  ¿No tienes cuenta? Regístrate aquí
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {authModalMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Carlos Martínez"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  placeholder="Crea una contraseña segura"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Selecciona tu Avatar
                </label>
                <div className="flex gap-2 justify-center">
                  {avatarOptions.map((av) => (
                    <button
                      key={av.url}
                      type="button"
                      onClick={() => setRegAvatar(av.url)}
                      className={`relative rounded-full p-0.5 transition-transform hover:scale-110 ${
                        regAvatar === av.url ? 'ring-2 ring-emerald-500 ring-offset-2 scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={av.url} alt={av.label} className="w-10 h-10 rounded-full object-cover" />
                      {regAvatar === av.url && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando en base de datos...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Crear Cuenta</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
