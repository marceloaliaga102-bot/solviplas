import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  label?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  tagName = 'p',
  className = '',
  multiline = false,
  placeholder = 'Escribe aquí...',
  label,
}) => {
  const { isAdmin, isLiveEditEnabled } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const canEdit = isAdmin && isLiveEditEnabled;

  const handleSave = () => {
    const trimmed = draft.trim();
    if (trimmed !== value) {
      onSave(trimmed || value);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  // When not in admin edit mode, render pure clean element
  if (!canEdit) {
    const Component = tagName as any;
    return <Component className={className}>{value}</Component>;
  }

  // Active in-place Canva editor
  if (isEditing) {
    return (
      <div className="relative my-1 inline-block w-full max-w-full z-20 group/active-editor">
        {label && (
          <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
            {label}
          </span>
        )}
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={Math.max(2, Math.min(8, draft.split('\n').length + 1))}
            placeholder={placeholder}
            className={`w-full p-2.5 rounded-xl bg-white/95 text-slate-900 border-2 border-emerald-500 shadow-xl outline-none ring-2 ring-emerald-400/30 text-sm leading-relaxed resize-y ${className}`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full px-3 py-1.5 rounded-xl bg-white/95 text-slate-900 border-2 border-emerald-500 shadow-xl outline-none ring-2 ring-emerald-400/30 font-inherit ${className}`}
          />
        )}

        {/* Canva mini floating action bar */}
        <div className="flex items-center gap-1.5 mt-1.5 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 flex items-center gap-1 transition-all shadow-sm"
          >
            <X className="w-3 h-3" />
            <span>Cancelar</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-1 transition-all shadow-md active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Guardar</span>
          </button>
        </div>
      </div>
    );
  }

  // Hoverable Canva template element
  const Component = tagName as any;
  return (
    <Component
      onClick={() => setIsEditing(true)}
      title="Haz clic para editar texto en vivo (Estilo Canva)"
      className={`relative cursor-pointer transition-all rounded px-1 -mx-1 group/editable hover:outline hover:outline-2 hover:outline-dashed hover:outline-emerald-400/90 hover:bg-emerald-500/10 ${className}`}
    >
      {value}
      <span className="opacity-0 group-hover/editable:opacity-100 transition-opacity absolute -top-3 -right-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-700 text-white text-[9px] font-bold shadow-md pointer-events-none z-30">
        <Edit2 className="w-2.5 h-2.5" />
        <span>Editar</span>
      </span>
    </Component>
  );
};
