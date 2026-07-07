import type { ReactNode } from 'react';
import { Loader2, Inbox } from 'lucide-react';
import { useBetSlip } from '../context/BetSlipContext';
import { Ticket } from 'lucide-react';

export function StatCard({ label, value, icon, accent = 'lime', sub }: { label: string; value: string; icon: ReactNode; accent?: 'lime' | 'violet' | 'amber' | 'blue' | 'red'; sub?: string }) {
  const accentMap: Record<string, string> = {
    lime: 'text-lime bg-lime/10',
    violet: 'text-violet bg-violet/10',
    amber: 'text-amber bg-amber/10',
    blue: 'text-blue bg-blue/10',
    red: 'text-red bg-red/10',
  };
  return (
    <div className="bg-surface border border-line-soft rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-dim font-medium">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accentMap[accent]}`}>{icon}</div>
      </div>
      <div>
        <div className="text-xl font-bold font-display">{value}</div>
        {sub && <div className="text-[11px] text-text-faint mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

export function EmptyState({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox size={32} className="text-text-faint mb-3" />
      <p className="text-sm font-medium text-text-dim">{label}</p>
      {sub && <p className="text-xs text-text-faint mt-1">{sub}</p>}
    </div>
  );
}

export function LoadingBlock({ label = 'Loading data…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <Loader2 size={26} className="animate-spin text-lime" />
      <p className="text-xs text-text-faint">{label}</p>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: 'text-lime bg-lime/10', Won: 'text-lime bg-lime/10', Verified: 'text-lime bg-lime/10', Active: 'text-lime bg-lime/10',
    Pending: 'text-amber bg-amber/10', Open: 'text-blue bg-blue/10',
    Failed: 'text-red bg-red/10', Lost: 'text-red bg-red/10', Suspended: 'text-red bg-red/10', Unverified: 'text-red bg-red/10',
    'Cashed Out': 'text-violet bg-violet/10',
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[status] || 'text-text-dim bg-surface-2'}`}>{status}</span>;
}

export function MobileBetSlipTrigger() {
  const { selections, setOpenMobile, isOpenMobile } = useBetSlip();
  if (selections.length === 0 || isOpenMobile) return null;
  return (
    <button
      onClick={() => setOpenMobile(true)}
      className="lg:hidden fixed bottom-4 right-4 z-40 bg-lime text-ink rounded-full pl-4 pr-5 py-3 shadow-xl flex items-center gap-2 font-bold text-sm"
    >
      <Ticket size={16} /> Slip <span className="bg-ink/20 rounded-full w-5 h-5 flex items-center justify-center text-xs">{selections.length}</span>
    </button>
  );
}
