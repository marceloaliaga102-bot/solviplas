import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Users } from 'lucide-react';
import { EditableText } from './CanvaEditor/EditableText';
import { EditableImage } from './CanvaEditor/EditableImage';

export const TeamSection: React.FC = () => {
  const { siteConfig, teamMembers, updateTeamMember } = useApp();

  if (!siteConfig.sections.team?.enabled) return null;

  const leader = teamMembers[0];
  const members = teamMembers.slice(1);

  return (
    <section id="team" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Equipo de Investigación & Desarrollo Sostenible</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Equipo Responsable del Proyecto
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Personas comprometidas con la reducción de residuos plásticos y la democratización de la química verde.
          </p>
        </div>

        {/* Featured Leader Card */}
        {leader && (
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-xl border border-emerald-700/50 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="relative">
                  <EditableImage
                    src={leader.avatar}
                    alt={leader.name}
                    onSave={(newSrc) => updateTeamMember(leader.id, { avatar: newSrc })}
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover ring-4 ring-emerald-400/50 shadow-2xl"
                    label="Cambiar Foto"
                  />
                  <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider shadow pointer-events-none">
                    Coordinación
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 space-y-3 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-bold border border-emerald-600/50">
                  <Award className="w-3.5 h-3.5" />
                  <EditableText
                    value={leader.role}
                    onSave={(val) => updateTeamMember(leader.id, { role: val })}
                    tagName="span"
                  />
                </div>

                <EditableText
                  value={leader.name}
                  onSave={(val) => updateTeamMember(leader.id, { name: val })}
                  tagName="h3"
                  className="text-2xl sm:text-3xl font-black text-white block"
                />

                <EditableText
                  value={leader.institution}
                  onSave={(val) => updateTeamMember(leader.id, { institution: val })}
                  tagName="p"
                  className="text-xs sm:text-sm text-emerald-300 font-semibold block"
                />

                <EditableText
                  value={leader.description}
                  onSave={(val) => updateTeamMember(leader.id, { description: val })}
                  tagName="p"
                  multiline
                  className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl block"
                />
              </div>
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(member => (
            <div
              key={member.id}
              className="p-6 rounded-3xl bg-emerald-50/40 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <EditableImage
                    src={member.avatar}
                    alt={member.name}
                    onSave={(newSrc) => updateTeamMember(member.id, { avatar: newSrc })}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30 shadow-sm"
                    label="Cambiar"
                  />
                  <div>
                    <EditableText
                      value={member.name}
                      onSave={(val) => updateTeamMember(member.id, { name: val })}
                      tagName="h4"
                      className="font-bold text-slate-900 text-sm leading-snug block"
                    />
                    <EditableText
                      value={member.role}
                      onSave={(val) => updateTeamMember(member.id, { role: val })}
                      tagName="p"
                      className="text-xs text-emerald-700 font-semibold block"
                    />
                  </div>
                </div>

                <EditableText
                  value={member.description}
                  onSave={(val) => updateTeamMember(member.id, { description: val })}
                  tagName="p"
                  multiline
                  className="text-xs text-slate-600 leading-relaxed block"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <EditableText
                  value={member.institution}
                  onSave={(val) => updateTeamMember(member.id, { institution: val })}
                  tagName="span"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
