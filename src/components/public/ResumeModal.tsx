'use client';

import { X, Download, FileText, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
  fullName?: string;
}

export default function ResumeModal({ isOpen, onClose, resumeUrl = '/uploads/Mohammad_Raza_Resume.pdf', fullName = 'Mohammad Raza' }: ResumeModalProps) {
  if (!isOpen) return null;

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
              download={`${fullName.replace(/\s+/g, '_')}_Resume.pdf`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
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
        <div className="flex-1 bg-slate-900 p-2 overflow-hidden flex flex-col items-center justify-center">
          <iframe
            src={`${resumeUrl}#toolbar=0`}
            className="w-full h-full rounded-xl border border-slate-800"
            title="Resume Viewer"
          />
        </div>

      </div>
    </div>
  );
}
