import Sidebar from '@/components/admin/Sidebar';
import { getDatabase } from '@/lib/db';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const db = getDatabase();
  const unreadMessagesCount = (db.messages || []).filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex">
      <Sidebar unreadMessagesCount={unreadMessagesCount} />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
