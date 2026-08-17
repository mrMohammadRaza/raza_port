'use client';

import { ProjectItem } from '@/lib/types';
import { X, Github, ExternalLink, Calendar, Tag, Layers, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-card rounded-2xl border border-slate-700 bg-slate-950/95 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800/60 text-indigo-300 text-xs font-medium">
              {project.badge || project.subtitle}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.createdAt || '2025'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Description */}
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
            <p className="text-indigo-400 text-sm font-medium mt-1">{project.subtitle}</p>
          </div>

          {/* Project Screenshot / Hero Visual */}
          <div className="relative w-full h-56 sm:h-72 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
              <Layers className="w-12 h-12 text-indigo-400 mb-2 opacity-80" />
              <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">{project.title}</span>
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Project Overview</h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.detailedDescription || project.description}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-sky-400" />
              <span>Technologies & Tools Used</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-mono font-medium flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-sky-400" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold hover:border-indigo-500 hover:bg-slate-800 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code on GitHub</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 hover:scale-105 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Demo</span>
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
