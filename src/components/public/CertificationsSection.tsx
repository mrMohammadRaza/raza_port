'use client';

import { CertificationItem } from '@/lib/types';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

interface CertificationsProps {
  certifications: CertificationItem[];
}

export default function CertificationsSection({ certifications }: CertificationsProps) {
  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Certifications & Industry Badges
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-2">
            Professional certifications from Cisco, HackerRank, Deloitte, Tata, and Vista Equity Partners.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full mt-4" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    <Calendar className="w-3 h-3" />
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-xs font-medium text-sky-400 mt-1">{cert.issuer}</p>

                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-slate-400 mt-2 truncate">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>

              {cert.credentialUrl && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
