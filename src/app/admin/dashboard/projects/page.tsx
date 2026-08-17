'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { ProjectItem } from '@/lib/types';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Github,
  ExternalLink
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    subtitle: 'Personal Project',
    description: '',
    detailedDescription: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    badge: 'Personal Project',
    image: '',
    published: true,
    featured: false
  });

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setForm({
      title: '',
      subtitle: 'Personal Project',
      description: '',
      detailedDescription: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      badge: 'Personal Project',
      image: '',
      published: true,
      featured: false
    });
    setModalOpen(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setForm({
      title: proj.title,
      subtitle: proj.subtitle,
      description: proj.description,
      detailedDescription: proj.detailedDescription || proj.description,
      technologies: proj.technologies.join(', '),
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      badge: proj.badge || proj.subtitle,
      image: proj.image || '',
      published: proj.published,
      featured: proj.featured
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const payload = {
      ...form,
      ...(editingProject ? { id: editingProject.id } : {})
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method: editingProject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: `Project ${editingProject ? 'updated' : 'created'} successfully!` });
        setModalOpen(false);
        loadProjects();
      } else {
        const errData = await res.json();
        setStatus({ type: 'error', msg: errData.error || 'Failed to save project' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'An error occurred while saving.' });
    }
  };

  const togglePublished = async (proj: ProjectItem) => {
    try {
      await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: proj.id, published: !proj.published })
      });
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = async (proj: ProjectItem) => {
    try {
      await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: proj.id, featured: !proj.featured })
      });
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${deleteTargetId}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Project deleted successfully!' });
        loadProjects();
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to delete project.' });
    } finally {
      setDeleteTargetId(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'project');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-400 font-mono text-sm">Loading Projects...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto pb-12">
      <AdminHeader
        title="Projects Manager"
        subtitle="Create, edit, toggle visibility, and mark featured engineering projects"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-400" />
              <span>Projects ({projects.length})</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">Manage projects shown on public portfolio</p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold text-xs shadow-md hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
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

        {/* Projects List Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300 text-[11px] font-mono">
                    {proj.badge || proj.subtitle}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleFeatured(proj)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        proj.featured ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                      title={proj.featured ? 'Featured ON' : 'Featured OFF'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => togglePublished(proj)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        proj.published ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                      }`}
                      title={proj.published ? 'Published (ON)' : 'Hidden (OFF)'}
                    >
                      {proj.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><Github className="w-4 h-4" /></a>}
                  {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300"><ExternalLink className="w-4 h-4" /></a>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(proj.id)}
                    className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900/60"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-card rounded-2xl border border-slate-700 bg-slate-950/95 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subtitle / Category</label>
                  <input
                    type="text"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value, badge: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Description (Modal Popup)</label>
                <textarea
                  rows={4}
                  value={form.detailedDescription}
                  onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Technologies Used (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="React.js, Node.js, Express.js, MongoDB"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Screenshot Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="/uploads/project.png"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none"
                  />
                  <label className="px-3 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 cursor-pointer flex items-center gap-1">
                    {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Published ON (Visible to Public)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Featured Project</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Project?"
        message="Are you sure you want to delete this project entry?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
