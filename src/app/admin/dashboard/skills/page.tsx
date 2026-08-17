'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { SkillItem } from '@/lib/types';
import { Cpu, Plus, Edit2, Trash2, Eye, EyeOff, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [form, setForm] = useState({
    name: '',
    category: 'Coding Languages' as SkillItem['category'],
    level: 85,
    published: true
  });

  const categories = [
    'Coding Languages',
    'Web Development',
    'Database',
    'Tools & Technologies',
    'IoT',
    'Other Areas'
  ] as const;

  const loadSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills');
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setForm({ name: '', category: 'Coding Languages', level: 85, published: true });
    setModalOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      published: skill.published
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const payload = {
      ...form,
      ...(editingSkill ? { id: editingSkill.id } : {})
    };

    try {
      const res = await fetch('/api/admin/skills', {
        method: editingSkill ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: `Skill ${editingSkill ? 'updated' : 'added'}!` });
        setModalOpen(false);
        loadSkills();
      } else {
        const err = await res.json();
        setStatus({ type: 'error', msg: err.error || 'Failed to save skill' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to save skill' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${deleteTargetId}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Skill deleted successfully!' });
        loadSkills();
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to delete skill.' });
    } finally {
      setDeleteTargetId(null);
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-mono text-sm">Loading Skills...</div>;

  return (
    <div className="flex-1 overflow-y-auto pb-12">
      <AdminHeader
        title="Skills Manager"
        subtitle="Manage technical skills, proficiency levels, and category groupings"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-400" />
              <span>Technical Skills ({skills.length})</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">Manage technical stack skills</p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold text-xs shadow-md hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="glass-card rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white text-sm">{skill.name}</span>
                  <span className="text-xs font-mono text-indigo-300">{skill.level}%</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono block mb-3">{skill.category}</span>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  skill.published ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-rose-950 text-rose-400 border-rose-800'
                }`}>
                  {skill.published ? 'Published' : 'Hidden'}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEditModal(skill)} className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteTargetId(skill.id)} className="p-1.5 rounded bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md glass-card rounded-2xl border border-slate-700 bg-slate-950/95 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Proficiency Level ({form.level}%)</label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
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
                <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow-md">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Skill?"
        message="Are you sure you want to delete this skill entry?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
