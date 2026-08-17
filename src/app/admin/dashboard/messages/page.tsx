'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { ContactMessage } from '@/lib/types';
import { Inbox, Mail, MailOpen, Trash2, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) setMessages(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const toggleReadStatus = async (msg: ContactMessage) => {
    try {
      await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg.id, read: !msg.read })
      });
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${deleteTargetId}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Message deleted from inbox.' });
        loadMessages();
      }
    } finally {
      setDeleteTargetId(null);
    }
  };

  if (loading) return <div className="p-8 text-slate-400 font-mono text-sm">Loading Contact Messages...</div>;

  return (
    <div className="flex-1 overflow-y-auto pb-12">
      <AdminHeader
        title="Contact Inbox"
        subtitle="Manage inquiries and messages received through your public contact form"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between glass-card p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Inquiries Inbox ({messages.length})</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {messages.filter(m => !m.read).length} Unread
          </span>
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
          {messages.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center text-slate-400 text-sm">
              No contact messages received yet.
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`glass-card rounded-2xl p-5 border transition-all ${
                  msg.read ? 'border-slate-800/80 bg-slate-950/40' : 'border-indigo-500/40 bg-indigo-950/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{msg.name}</span>
                    <a href={`mailto:${msg.email}`} className="text-xs text-sky-400 font-mono hover:underline">
                      &lt;{msg.email}&gt;
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                    <button
                      onClick={() => toggleReadStatus(msg)}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                      title={msg.read ? 'Mark Unread' : 'Mark Read'}
                    >
                      {msg.read ? <MailOpen className="w-4 h-4 text-slate-400" /> : <Mail className="w-4 h-4 text-indigo-400" />}
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(msg.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:bg-rose-900"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-indigo-300 mb-1">Subject: {msg.subject}</h4>
                  <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Message?"
        message="Are you sure you want to delete this inquiry message from your inbox?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
