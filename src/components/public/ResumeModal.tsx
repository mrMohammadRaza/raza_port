'use client';

import { X, Download, FileText, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
  fullName?: string;
}

export default function ResumeModal({
  isOpen,
  onClose,
  resumeUrl = '/uploads/Mohammad_Raza_Resume.png',
  fullName = 'Mohammad Raza'
}: ResumeModalProps) {
  if (!isOpen) return null;

  const isImage = resumeUrl.match(/\.(jpeg|jpg|png|webp)$/i);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-card rounded-2xl border border-slate-700 bg-slate-950/95 overflow-hidden shadow-2xl h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">{fullName} - Resume</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href={resumeUrl}
              download={isImage ? `Mohammad_Raza_Resume.png` : `Mohammad_Raza_Resume.pdf`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white text-xs font-semibold hover:opacity-95 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Viewer Container */}
        <div className="flex-1 bg-slate-900 p-4 overflow-y-auto flex flex-col items-center justify-start">
          {isImage ? (
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-2 overflow-hidden border border-slate-700">
              <img
                src={resumeUrl}
                alt={`${fullName} Resume`}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          ) : (
            <iframe
              src={`${resumeUrl}#toolbar=0`}
              className="w-full h-full rounded-xl border border-slate-800"
              title="Resume Viewer"
            />
          )}
        </div>

      </div>
    </div>
  );
}
