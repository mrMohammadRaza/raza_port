'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { WebsiteSettings } from '@/lib/types';
import { Settings, Lock, Save, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setStatus(null);

    if (newPassword && newPassword !== confirmPassword) {
      setStatus({ type: 'error', msg: 'Passwords do not match!' });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setStatus({ type: 'error', msg: 'Password must be at least 6 characters long.' });
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...settings,
          ...(newPassword ? { newPassword } : {})
        })
      });

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Settings updated successfully!' });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const err = await res.json();
        setStatus({ type: 'error', msg: err.error || 'Failed to update settings.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to update settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) return <div className="p-8 text-slate-400 font-mono text-sm">Loading Website Settings...</div>;

  return (
    <div className="flex-1 overflow-y-auto pb-12">
      <AdminHeader
        title="Website Settings & Admin Credentials"
        subtitle="Configure public SEO metadata, contact form behavior, and admin credentials"
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

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* SEO & Site Info */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-400" />
              <span>Public Website Settings & SEO</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Website Title</label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">SEO Meta Description</label>
              <textarea
                rows={3}
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Footer / Hero Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowContactForm}
                  onChange={(e) => setSettings({ ...settings, allowContactForm: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                />
                <span>Enable Public Contact Form</span>
              </label>
            </div>
          </div>

          {/* Admin Credentials */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-sky-400" />
              <span>Admin Profile & Change Password</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Admin Email Address</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">New Admin Password</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold text-sm shadow-md hover:opacity-95 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Saving Settings...' : 'Save Settings & Update Credentials'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
