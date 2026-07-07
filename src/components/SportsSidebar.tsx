import { NavLink } from 'react-router-dom';
import { Trophy, CircleDot, CircleDashed, Volleyball, Zap, Swords, Gamepad2, TrendingUp, Star } from 'lucide-react';
import type { SportKey } from '../types';

const SPORTS: { key: SportKey; label: string; icon: React.ReactNode; count: number }[] = [
  { key: 'football', label: 'Football', icon: <CircleDot size={17} />, count: 68 },
  { key: 'cricket', label: 'Cricket', icon: <CircleDashed size={17} />, count: 34 },
  { key: 'tennis', label: 'Tennis', icon: <Volleyball size={17} />, count: 41 },
  { key: 'basketball', label: 'Basketball', icon: <Trophy size={17} />, count: 25 },
  { key: 'baseball', label: 'Baseball', icon: <CircleDot size={17} />, count: 18 },
  { key: 'mma', label: 'MMA', icon: <Swords size={17} />, count: 9 },
  { key: 'esports', label: 'Esports', icon: <Gamepad2 size={17} />, count: 12 },
];

export default function SportsSidebar({ active, onSelect }: { active: SportKey | 'all'; onSelect: (s: SportKey | 'all') => void }) {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-line-soft bg-surface/40 h-[calc(100vh-3.5rem-2rem)] sticky top-[5.5rem] overflow-y-auto">
      <div className="p-3">
        <button
          onClick={() => onSelect('all')}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold mb-1 transition-colors ${active === 'all' ? 'bg-lime text-ink' : 'text-text hover:bg-surface-2'}`}
        >
          <Zap size={16} /> All Sports
        </button>
        <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-text-faint font-semibold flex items-center gap-1.5">
          <TrendingUp size={12} /> Popular
        </div>
        {SPORTS.map(s => (
          <button
            key={s.key}
            onClick={() => onSelect(s.key)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${
              active === s.key ? 'bg-surface-2 text-lime' : 'text-text-dim hover:bg-surface-2 hover:text-text'
            }`}
          >
            <span className="flex items-center gap-2.5">{s.icon} {s.label}</span>
            <span className="text-[10px] bg-surface-3 px-1.5 py-0.5 rounded text-text-faint">{s.count}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto p-3 border-t border-line-soft/60">
        <NavLink to="/casino" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-violet hover:bg-surface-2">
          <Star size={16} /> Casino Lobby
        </NavLink>
      </div>
    </aside>
  );
}
