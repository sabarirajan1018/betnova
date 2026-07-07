import { useMemo, useState } from 'react';
import { Radio, Filter } from 'lucide-react';
import Layout from '../components/Layout';
import SportsSidebar from '../components/SportsSidebar';
import BetSlipPanel from '../components/BetSlipPanel';
import MatchRow from '../components/MatchRow';
import { EmptyState } from '../components/UI';
import { EVENTS } from '../data/mockData';
import type { SportKey } from '../types';

const TABS: { key: SportKey | 'all'; label: string }[] = [
  { key: 'all', label: 'All' }, { key: 'football', label: 'Football' }, { key: 'cricket', label: 'Cricket' },
  { key: 'tennis', label: 'Tennis' }, { key: 'basketball', label: 'Basketball' }, { key: 'baseball', label: 'Baseball' },
  { key: 'mma', label: 'MMA' }, { key: 'esports', label: 'Esports' },
];

export default function Sportsbook() {
  const [sport, setSport] = useState<SportKey | 'all'>('all');
  const [liveOnly, setLiveOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = EVENTS;
    if (sport !== 'all') list = list.filter(e => e.sport === sport);
    if (liveOnly) list = list.filter(e => e.isLive);
    return list.slice(0, 40);
  }, [sport, liveOnly]);

  return (
    <Layout noPadding>
      <div className="max-w-[1600px] mx-auto flex">
        <SportsSidebar active={sport} onSelect={setSport} />

        <div className="flex-1 min-w-0 px-3 md:px-5 py-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h1 className="font-display font-bold text-xl md:text-2xl">Sportsbook</h1>
              <p className="text-text-faint text-xs mt-0.5">{filtered.length} matches · mock odds data</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiveOnly(v => !v)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-colors ${
                  liveOnly ? 'bg-red/10 border-red/40 text-red' : 'border-line-soft text-text-dim hover:text-text'
                }`}
              >
                <Radio size={13} className={liveOnly ? 'animate-pulse-live' : ''} /> Live only
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-line-soft text-text-dim hover:text-text">
                <Filter size={13} /> Filters
              </button>
            </div>
          </div>

          <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 lg:hidden">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setSport(t.key)}
                className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  sport === t.key ? 'bg-lime text-ink border-lime' : 'border-line-soft text-text-dim'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="bg-surface border border-line-soft rounded-xl overflow-hidden">
            <div className="hidden md:flex items-center px-3 py-2 border-b border-line-soft bg-surface-2/50 text-[10px] uppercase tracking-wider text-text-faint font-semibold">
              <div className="flex-1">Match</div>
              <div className="flex gap-3 shrink-0">
                <div className="w-[168px] sm:w-[190px] text-center">1X2</div>
                <div className="hidden md:block w-[130px] text-center">Over/Under</div>
                <div className="hidden xl:block w-[130px] text-center">Handicap</div>
              </div>
            </div>
            {filtered.length === 0 ? (
              <EmptyState label="No matches found" sub="Try a different sport or clear the live filter" />
            ) : (
              filtered.map(ev => <MatchRow key={ev.id} event={ev} />)
            )}
          </div>
        </div>

        <BetSlipPanel />
      </div>
      <BetSlipPanel floating />
    </Layout>
  );
}
