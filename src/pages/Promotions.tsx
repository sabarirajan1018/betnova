import { useState } from 'react';
import { Gift, Ticket, RefreshCw, Crown, Users, Sparkles } from 'lucide-react';
import Layout from '../components/Layout';
import { PROMOTIONS } from '../data/mockData';
import type { Promotion } from '../types';

const ICONS: Record<Promotion['category'], React.ReactNode> = {
  Welcome: <Gift size={20} />, 'Free Bet': <Ticket size={20} />, Cashback: <RefreshCw size={20} />,
  VIP: <Crown size={20} />, Referral: <Users size={20} />, 'Free Spins': <Sparkles size={20} />,
};
const COLORS: Record<Promotion['category'], string> = {
  Welcome: 'text-lime bg-lime/10', 'Free Bet': 'text-blue bg-blue/10', Cashback: 'text-amber bg-amber/10',
  VIP: 'text-violet bg-violet/10', Referral: 'text-red bg-red/10', 'Free Spins': 'text-violet bg-violet/10',
};

const FILTERS: (Promotion['category'] | 'All')[] = ['All', 'Welcome', 'Free Bet', 'Cashback', 'VIP', 'Referral', 'Free Spins'];

export default function Promotions() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const list = filter === 'All' ? PROMOTIONS : PROMOTIONS.filter(p => p.category === filter);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl mb-1">Promotions</h1>
        <p className="text-text-faint text-xs">All bonuses are simulated for demo purposes — no real funds are credited.</p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-6">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${filter === f ? 'bg-lime text-ink border-lime' : 'border-line-soft text-text-dim'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(p => (
          <div key={p.id} className="bg-surface border border-line-soft rounded-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${COLORS[p.category]}`}>{ICONS[p.category]}</div>
              <span className="text-[10px] font-semibold bg-surface-2 border border-line-soft px-2 py-0.5 rounded-full text-text-dim">{p.badge}</span>
            </div>
            <h3 className="font-semibold text-sm mb-2 leading-snug">{p.title}</h3>
            <p className="text-xs text-text-dim leading-relaxed mb-3 flex-1">{p.description}</p>
            <p className="text-[10px] text-text-faint border-t border-line-soft pt-3 mb-3">{p.terms}</p>
            <button className="w-full bg-surface-2 hover:bg-lime hover:text-ink border border-line-soft rounded-lg py-2 text-xs font-bold transition-colors">
              Claim Demo Offer
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
