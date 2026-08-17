'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { ExperienceItem } from '@/lib/types';
import { Briefcase, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function AdminExperiencePage() {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [form, setForm] = useState({
    organization: '',
    position: '',
    period: '',
    description: '',
    responsibilities: '',
    technologies: '',
    published: true
  });

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/experience');
      if (res.ok) setExperience(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({ organization: '', position: '', period: '', description: '', responsibilities: '', technologies: '', published: true });
    setModalOpen(true);
  };

  const openEditModal = (item: ExperienceItem) => {
    setEditingItem(item);
    setForm({
      organization: item.organization,
      position: item.position,
      period: item.period || '',
      description: item.description || '',
      responsibilities: (item.responsibilities || []).join('\n'),
      technologies: (item.technologies || []).join(', '),
      published: item.published
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const payload = {
      ...form,
      ...(editingItem ? { id: editingItem.id } : {})
    };

    try {
      const res = await fetch('/api/admin/experience', {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: `Experience ${editingItem ? 'updated' : 'added'}!` });
        setModalOpen(false);
        loadData();
      } else {
        const err = await res.json();
        setStatus({ type: 'error', msg: err.error || 'Failed to save experience' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to save experience' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/experience?id=${deleteTargetId}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Experience entry deleted!' });
        loadData();
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to delete entry.' });
    } finally {
      setDeleteTargetId(null);
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-mono text-sm">Loading Experience...</div>;

  return (
    <div className="flex-1 overflow-y-auto pb-12">
      <AdminHeader
        title="Experience Manager"
        subtitle="Manage virtual internships, job simulations, and work responsibilities"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <span>Experience & Simulations ({experience.length})</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono font-normal">Internships & Role History</p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold text-xs shadow-md hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        </div>

        {status && (
          <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 ${
            status.type === 'success' ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' : 'bg-rose-950/80 border border-rose-800 text-rose-300'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span>{status.msg}</span>
          </div>
        )}

        <div className="space-y-4">
          {experience.map((item) => (
            <div key={item.id} className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono">
                    {item.period}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    item.published ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-rose-950 text-rose-400 border-rose-800'
                  }`}>
                    {item.published ? 'Published' : 'Hidden'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{item.position}</h3>
                <p className="text-xs font-semibold text-sky-400">{item.organization}</p>
                <p className="text-xs text-slate-300 pt-1">{item.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEditModal(item)} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteTargetId(item.id)} className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-card rounded-2xl border border-slate-700 bg-slate-950/95 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{editingItem ? 'Edit Experience' : 'Add Experience'}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Position / Role Title *</label>
                <input
                  type="text"
                  required
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Organization / Company *</label>
                <input
                  type="text"
                  required
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Duration / Period (e.g. 2024)</label>
                <input
                  type="text"
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description Overview</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Key Responsibilities (One per line)</label>
                <textarea
                  rows={3}
                  value={form.responsibilities}
                  onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Technologies Used (Comma Separated)</label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Published ON</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow-md">Save Experience</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Experience Entry?"
        message="Are you sure you want to delete this experience record?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
