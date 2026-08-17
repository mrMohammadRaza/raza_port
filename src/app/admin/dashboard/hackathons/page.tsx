'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { HackathonItem, AchievementItem } from '@/lib/types';
import { Trophy, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

export default function AdminHackathonsPage() {
  const [hackathons, setHackathons] = useState<HackathonItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [hackModalOpen, setHackModalOpen] = useState(false);
  const [editingHack, setEditingHack] = useState<HackathonItem | null>(null);
  const [deleteHackId, setDeleteHackId] = useState<string | null>(null);

  const [achModalOpen, setAchModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<AchievementItem | null>(null);
  const [deleteAchId, setDeleteAchId] = useState<string | null>(null);

  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Hackathon Form State
  const [hackForm, setHackForm] = useState({
    title: '',
    organizer: '',
    teamName: '',
    project: '',
    result: 'Participant',
    description: '',
    published: true
  });

  // Achievement Form State
  const [achForm, setAchForm] = useState({
    title: '',
    description: '',
    published: true
  });

  const loadData = async () => {
    try {
      const [hRes, aRes] = await Promise.all([
        fetch('/api/admin/hackathons'),
        fetch('/api/admin/achievements')
      ]);
      if (hRes.ok) setHackathons(await hRes.json());
      if (aRes.ok) setAchievements(await aRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Hackathon Handlers
  const openCreateHack = () => {
    setEditingHack(null);
    setHackForm({ title: '', organizer: '', teamName: '', project: '', result: 'Participant', description: '', published: true });
    setHackModalOpen(true);
  };

  const openEditHack = (item: HackathonItem) => {
    setEditingHack(item);
    setHackForm({
      title: item.title,
      organizer: item.organizer || '',
      teamName: item.teamName || '',
      project: item.project || '',
      result: item.result || 'Participant',
      description: item.description || '',
      published: item.published
    });
    setHackModalOpen(true);
  };

  const handleSaveHack = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...hackForm, ...(editingHack ? { id: editingHack.id } : {}) };
    try {
      const res = await fetch('/api/admin/hackathons', {
        method: editingHack ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStatus({ type: 'success', msg: `Hackathon ${editingHack ? 'updated' : 'added'}!` });
        setHackModalOpen(false);
        loadData();
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to save hackathon' });
    }
  };

  const handleDeleteHackConfirm = async () => {
    if (!deleteHackId) return;
    try {
      const res = await fetch(`/api/admin/hackathons?id=${deleteHackId}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Hackathon deleted!' });
        loadData();
      }
    } finally {
      setDeleteHackId(null);
    }
  };

  // Achievement Handlers
  const openCreateAch = () => {
    setEditingAch(null);
    setAchForm({ title: '', description: '', published: true });
    setAchModalOpen(true);
  };

  const openEditAch = (item: AchievementItem) => {
    setEditingAch(item);
    setAchForm({ title: item.title, description: item.description || '', published: item.published });
    setAchModalOpen(true);
  };

  const handleSaveAch = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...achForm, ...(editingAch ? { id: editingAch.id } : {}) };
    try {
      const res = await fetch('/api/admin/achievements', {
        method: editingAch ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStatus({ type: 'success', msg: `Achievement ${editingAch ? 'updated' : 'added'}!` });
        setAchModalOpen(false);
        loadData();
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to save achievement' });
    }
  };

  const handleDeleteAchConfirm = async () => {
    if (!deleteAchId) return;
    try {
      const res = await fetch(`/api/admin/achievements?id=${deleteAchId}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Achievement deleted!' });
        loadData();
      }
    } finally {
      setDeleteAchId(null);
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-mono text-sm">Loading Hackathons & Achievements...</div>;

  return (
    <div className="flex-1 overflow-y-auto pb-12">
      <AdminHeader
        title="Hackathons & Achievements"
        subtitle="Manage competitive hackathon records and technical milestones"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        
        {status && (
          <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 ${
            status.type === 'success' ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' : 'bg-rose-950/80 border border-rose-800 text-rose-300'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span>{status.msg}</span>
          </div>
        )}

        {/* Hackathons Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between glass-card p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Hackathons ({hackathons.length})</h2>
            </div>
            <button
              onClick={openCreateHack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Hackathon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hackathons.map((hack) => (
              <div key={hack.id} className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                    {hack.result}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">{hack.title}</h3>
                  <p className="text-xs text-sky-400 font-medium">{hack.organizer} • Team {hack.teamName}</p>
                  <p className="text-xs text-slate-300 mt-2">{hack.description}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-indigo-300">Project: {hack.project}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEditHack(hack)} className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteHackId(hack.id)} className="p-1 rounded bg-rose-950/40 text-rose-400 hover:bg-rose-900"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between glass-card p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Achievements & Recognitions ({achievements.length})</h2>
            </div>
            <button
              onClick={openCreateAch}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 text-white font-semibold text-xs shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Achievement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="glass-card rounded-2xl p-5 border border-slate-800 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{ach.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{ach.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-3">
                  <button onClick={() => openEditAch(ach)} className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteAchId(ach.id)} className="p-1 rounded bg-rose-950/40 text-rose-400 hover:bg-rose-900"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Hackathon Modal */}
      {hackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-card rounded-2xl border border-slate-700 bg-slate-950/95 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{editingHack ? 'Edit Hackathon' : 'Add Hackathon'}</h3>
              <button onClick={() => setHackModalOpen(false)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveHack} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hackathon Event Name *</label>
                <input type="text" required value={hackForm.title} onChange={(e) => setHackForm({ ...hackForm, title: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Organizer Institution</label>
                <input type="text" value={hackForm.organizer} onChange={(e) => setHackForm({ ...hackForm, organizer: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Team Name</label>
                  <input type="text" value={hackForm.teamName} onChange={(e) => setHackForm({ ...hackForm, teamName: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Result / Standing</label>
                  <input type="text" value={hackForm.result} onChange={(e) => setHackForm({ ...hackForm, result: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Built</label>
                <input type="text" value={hackForm.project} onChange={(e) => setHackForm({ ...hackForm, project: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea rows={3} value={hackForm.description} onChange={(e) => setHackForm({ ...hackForm, description: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm resize-none" />
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setHackModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">Save Hackathon</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {achModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-card rounded-2xl border border-slate-700 bg-slate-950/95 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{editingAch ? 'Edit Achievement' : 'Add Achievement'}</h3>
              <button onClick={() => setAchModalOpen(false)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveAch} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Achievement Title *</label>
                <input type="text" required value={achForm.title} onChange={(e) => setAchForm({ ...achForm, title: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea rows={3} value={achForm.description} onChange={(e) => setAchForm({ ...achForm, description: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm resize-none" />
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setAchModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold">Save Achievement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDeleteModal isOpen={Boolean(deleteHackId)} title="Delete Hackathon?" onConfirm={handleDeleteHackConfirm} onCancel={() => setDeleteHackId(null)} />
      <ConfirmDeleteModal isOpen={Boolean(deleteAchId)} title="Delete Achievement?" onConfirm={handleDeleteAchConfirm} onCancel={() => setDeleteAchId(null)} />
    </div>
  );
}
