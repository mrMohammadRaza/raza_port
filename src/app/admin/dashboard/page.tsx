'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import { PortfolioDatabase } from '@/lib/types';
import {
  FolderGit2,
  Cpu,
  Award,
  GraduationCap,
  Trophy,
  Inbox,
  Clock,
  Sparkles,
  FileCheck2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<PortfolioDatabase | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => {
        if (res.status === 401) {
          router.push('/admin/login');
          return null;
        }
        return fetch('/api/portfolio');
      })
      .then((res) => (res ? res.json() : null))
      .then((publicData) => {
        if (publicData) {
          // Fetch full admin settings & logs
          fetch('/api/admin/settings')
            .then((r) => r.json())
            .then((settingsData) => {
              setData({
                ...publicData,
                settings: settingsData.settings,
                activityLogs: settingsData.logs || []
              });
              setLoading(false);
            });
        }
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading || !data) {
    return (
      <div className="p-8 text-slate-400 font-mono text-sm flex items-center gap-2">
        <span>Loading Admin Overview Dashboard...</span>
      </div>
    );
  }

  const projectsCount = data.projects?.length || 0;
  const skillsCount = data.skills?.length || 0;
  const certsCount = data.certifications?.length || 0;
  const eduCount = data.education?.length || 0;
  const hackCount = data.hackathons?.length || 0;

  return (
    <div className="flex-1 overflow-y-auto pb-12">
      <AdminHeader
        title="Admin Control Center"
        subtitle="Manage portfolio content, monitor inquiries, and configure settings"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Status Banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-900/60 bg-gradient-to-r from-indigo-950/40 via-slate-950 to-sky-950/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authenticated Admin Session</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Welcome back, {data.profile?.fullName || 'Mohammad Raza'}!
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Your public portfolio is live and synchronized with this dashboard. Any edits made here will immediately update your public recruiter website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-mono">Resume Document</span>
                <span className="text-xs font-semibold text-emerald-300">Active & Downloadable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Analytics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">Total Projects</span>
              <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                <FolderGit2 className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-extrabold text-white">{projectsCount}</span>
            <span className="block text-[11px] text-indigo-300 font-mono mt-1">Live in Portfolio</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">Skills Listed</span>
              <div className="p-2 rounded-xl bg-sky-600/20 text-sky-400">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-extrabold text-white">{skillsCount}</span>
            <span className="block text-[11px] text-sky-300 font-mono mt-1">Categorized Tech</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">Certifications</span>
              <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-extrabold text-white">{certsCount}</span>
            <span className="block text-[11px] text-emerald-300 font-mono mt-1">Verified Badges</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">Education</span>
              <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-extrabold text-white">{eduCount}</span>
            <span className="block text-[11px] text-purple-300 font-mono mt-1">Academic Records</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">Hackathons</span>
              <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-extrabold text-white">{hackCount}</span>
            <span className="block text-[11px] text-amber-300 font-mono mt-1">Competitions</span>
          </div>
        </div>

        {/* Recent Admin Activity Log Table */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Recent Dashboard Activity</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">Live Security Audit Log</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-mono border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Action Description</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(data.activityLogs || []).slice(0, 8).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/40">
                    <td className="px-4 py-3 font-mono text-slate-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-200 font-medium">
                      {log.action}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
