import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Star, Heart, Pin, Send, CornerDownRight, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EditableText } from './CanvaEditor/EditableText';

export const CommentsSection: React.FC = () => {
  const {
    siteConfig,
    currentUser,
    isAdmin,
    comments,
    addComment,
    toggleLikeComment,
    deleteComment,
    pinComment,
    replyComment,
    setIsAuthModalOpen,
    setAuthModalMode,
  } = useApp();

  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'opinion' | 'pregunta' | 'felicitacion' | 'idea'>('opinion');
  const [newRating, setNewRating] = useState(5);
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  if (!siteConfig.sections.comments?.enabled) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const ok = addComment(newContent, newCategory, newRating);
    if (ok) {
      setNewContent('');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#14b8a6', '#059669', '#34d399'],
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleSendReply = (commentId: string) => {
    if (!replyText.trim()) return;
    replyComment(commentId, replyText);
    setReplyingCommentId(null);
    setReplyText('');
  };

  const filteredComments = filterCategory === 'todos'
    ? comments
    : comments.filter(c => c.category === filterCategory);

  return (
    <section id="comments" className="py-16 sm:py-24 bg-gradient-to-b from-white to-emerald-50/60 border-b border-emerald-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comunidad & Participación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comentarios y Preguntas de la Comunidad
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Miembros de la comunidad, entusiastas del medio ambiente y participantes comparten sus dudas, ideas y experiencias con Solviplas.
          </p>
        </div>

        {/* Create Comment Form or Login Prompt */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border border-emerald-200/90 shadow-lg">
          {currentUser ? (
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                    <p className="text-xs text-emerald-700 font-medium">
                      {currentUser.role === 'admin' ? 'Equipo Solviplas' : (currentUser.institution || 'Comunidad')}
                    </p>
                  </div>
                </div>

                {/* Rating Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium">Calificación:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${star <= newRating ? 'fill-amber-400' : 'text-slate-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category selector */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Tipo de mensaje:</span>
                {[
                  { id: 'opinion', label: '🌱 Opinión' },
                  { id: 'pregunta', label: '❓ Pregunta' },
                  { id: 'felicitacion', label: '💚 Felicitación' },
                  { id: 'idea', label: '💡 Sugerencia' },
                ].map(cat => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setNewCategory(cat.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      newCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Escribe tu mensaje, duda o recomendación aquí..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Comentario</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                ¿Quieres dejar una opinión o pregunta sobre Solviplas?
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Crea una cuenta gratuita o inicia sesión para participar en la conversación ecológica y calificar el proyecto.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => {
                    setAuthModalMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow"
                >
                  Crear Cuenta Gratis
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'opinion', label: 'Opiniones' },
              { id: 'pregunta', label: 'Preguntas' },
              { id: 'felicitacion', label: 'Felicitaciones' },
              { id: 'idea', label: 'Sugerencias' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-medium">
            {filteredComments.length} {filteredComments.length === 1 ? 'comentario' : 'comentarios'}
          </span>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`p-5 sm:p-6 rounded-3xl bg-white border transition-all ${
                comment.isPinned
                  ? 'border-emerald-500 ring-2 ring-emerald-400/30 bg-emerald-50/20'
                  : 'border-slate-200/90 shadow-sm'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{comment.userName}</span>
                      {comment.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                          <Pin className="w-2.5 h-2.5 fill-emerald-800" /> Fijado
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {comment.userRole} • {comment.createdAt.split('T')[0]}
                    </span>
                  </div>
                </div>

                {/* Rating and Category Badge */}
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold capitalize">
                    {comment.category}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= comment.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Comment text */}
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                {comment.content}
              </p>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLikeComment(comment.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      currentUser && comment.likedBy.includes(currentUser.id)
                        ? 'text-rose-600 bg-rose-50'
                        : 'text-slate-500 hover:text-rose-600 hover:bg-slate-50'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        currentUser && comment.likedBy.includes(currentUser.id)
                          ? 'fill-rose-500'
                          : ''
                      }`}
                    />
                    <span>{comment.likes}</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() =>
                        setReplyingCommentId(
                          replyingCommentId === comment.id ? null : comment.id
                        )
                      }
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                    >
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>{comment.adminReply ? 'Modificar respuesta' : 'Responder oficialmente'}</span>
                    </button>
                  )}
                </div>

                {/* Admin controls */}
                {isAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => pinComment(comment.id)}
                      className={`p-1.5 rounded-lg text-xs font-semibold ${
                        comment.isPinned
                          ? 'text-emerald-700 bg-emerald-100'
                          : 'text-slate-400 hover:text-emerald-700'
                      }`}
                      title="Fijar comentario al inicio"
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                      title="Eliminar comentario"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Admin reply display */}
              {comment.adminReply && (
                <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CornerDownRight className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Respuesta del Equipo Solviplas:</span>
                  </div>
                  <p className="text-slate-700 pl-5">{comment.adminReply}</p>
                </div>
              )}

              {/* Inline Reply Form for Admin */}
              {replyingCommentId === comment.id && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribe la respuesta oficial..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleSendReply(comment.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500"
                  >
                    Enviar
                  </button>
                  <button
                    onClick={() => setReplyingCommentId(null)}
                    className="px-2 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
