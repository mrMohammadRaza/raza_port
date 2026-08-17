'use client';

import { EducationItem, ExperienceItem } from '@/lib/types';
import { GraduationCap, Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface TimelineProps {
  education: EducationItem[];
  experience: ExperienceItem[];
}

export default function TimelineSection({ education, experience }: TimelineProps) {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Experience & Simulations</h2>
                <p className="text-xs text-slate-400 font-mono">Corporate Virtual Internships & Hands-on Projects</p>
              </div>
            </div>

            <div className="space-y-6 relative pl-6 border-l-2 border-indigo-900/60">
              {experience.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-950 shadow-md shadow-indigo-500/50 group-hover:scale-125 transition-transform" />
                  
                  <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-mono">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {exp.position}
                    </h3>
                    <p className="text-sm font-semibold text-sky-400 mt-0.5">{exp.organization}</p>
                    
                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div id="education">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-sky-600/20 border border-sky-500/40 text-sky-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Academic Education</h2>
                <p className="text-xs text-slate-400 font-mono">Degrees & Academic Credentials</p>
              </div>
            </div>

            <div className="space-y-6 relative pl-6 border-l-2 border-sky-900/60">
              {education.map((edu) => (
                <div key={edu.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-sky-500 border-4 border-slate-950 shadow-md shadow-sky-500/50 group-hover:scale-125 transition-transform" />

                  <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-950 text-sky-300 border border-sky-800/60 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-400 mt-0.5">{edu.institution}</p>
                    
                    {edu.location && (
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                      {edu.description}
                    </p>

                    {edu.cgpa && (
                      <div className="mt-3 inline-block px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold font-mono">
                        Grade / Score: {edu.cgpa}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
