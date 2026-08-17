'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  GraduationCap,
  Briefcase,
  Award,
  Trophy,
  FileText,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Code2
} from 'lucide-react';

interface SidebarProps {
  unreadMessagesCount?: number;
}

export default function Sidebar({ unreadMessagesCount = 0 }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Profile & About', href: '/admin/dashboard/profile', icon: User },
    { name: 'Projects', href: '/admin/dashboard/projects', icon: FolderGit2 },
    { name: 'Skills', href: '/admin/dashboard/skills', icon: Cpu },
    { name: 'Education', href: '/admin/dashboard/education', icon: GraduationCap },
    { name: 'Experience', href: '/admin/dashboard/experience', icon: Briefcase },
    { name: 'Certifications', href: '/admin/dashboard/certificates', icon: Award },
    { name: 'Hackathons', href: '/admin/dashboard/hackathons', icon: Trophy },
    { name: 'Resume File', href: '/admin/dashboard/resume', icon: FileText },
    { name: 'Messages', href: '/admin/dashboard/messages', icon: Inbox, badge: unreadMessagesCount },
    { name: 'Website Settings', href: '/admin/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0">
      <div>
        {/* Header Branding */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 p-0.5 shadow-md shadow-indigo-600/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-sky-400" />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-white text-sm tracking-tight flex items-center gap-1">
                Admin Panel
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">Mohammad Raza</span>
            </div>
          </div>
        </div>

        {/* View Public Website Button */}
        <div className="p-4 border-b border-slate-800/60">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 hover:text-white hover:border-indigo-500/50 transition-all"
          >
            <span>Preview Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs font-semibold hover:bg-rose-900/60 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
