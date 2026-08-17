'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { ProfileData } from '@/lib/types';
import { FileText, Upload, Download, ExternalLink, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminResumePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/profile')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      setStatus({ type: 'error', msg: 'Please upload a valid PDF document.' });
      return;
    }

    setUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'resume');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.url) {
        setProfile((prev) => prev ? { ...prev, resumeUrl: data.url } : null);
        setStatus({
          type: 'success',
          msg: 'Resume uploaded successfully! Public portfolio updated automatically.'
        });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Failed to upload PDF resume.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to upload resume file.' });
    } finally {
      setUploading(false);
    }
  };

  if (loading || !profile) return <div className="p-8 text-slate-400 font-mono text-sm">Loading Resume Manager...</div>;

  return (
    <div className="flex-1 overflow-y-auto pb-12">
      <AdminHeader
        title="Resume Manager"
        subtitle="Upload and update your official PDF resume without changing code"
      />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        
        {status && (
          <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 ${
            status.type === 'success' ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' : 'bg-rose-950/80 border border-rose-800 text-rose-300'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span>{status.msg}</span>
          </div>
        )}

        {/* Upload Box Card */}
        <div className="glass-card rounded-2xl p-8 border border-slate-800 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 mx-auto flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">Upload New PDF Resume</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              When you upload a new resume from this panel, all download and view links on your public portfolio will instantly point to the latest file.
            </p>
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all cursor-pointer">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>{uploading ? 'Uploading & Updating Resume...' : 'Select PDF File & Replace Resume'}</span>
              <input type="file" accept=".pdf,application/pdf" onChange={handleResumeUpload} className="hidden" />
            </label>
          </div>

          <p className="text-[11px] text-slate-500 font-mono">
            Supported File Format: .pdf (Max size: 10MB)
          </p>
        </div>

        {/* Current Active Resume Details */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Currently Active Resume File</span>
          </h3>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 block">File Path URL:</span>
              <span className="text-indigo-300 font-semibold">{profile.resumeUrl}</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors"
              >
                <span>View PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={profile.resumeUrl}
                download="Mohammad_Raza_Resume.pdf"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-500 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Test Download</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
