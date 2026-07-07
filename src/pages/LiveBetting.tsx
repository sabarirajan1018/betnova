import { useEffect, useState } from 'react';
import { Radio, Activity } from 'lucide-react';
import Layout from '../components/Layout';
import BetSlipPanel from '../components/BetSlipPanel';
import MatchRow from '../components/MatchRow';
import { EmptyState, LoadingBlock } from '../components/UI';
import { EVENTS } from '../data/mockData';
import { useBetSlip } from '../context/BetSlipContext';

const liveEvents = EVENTS.filter(e => e.isLive).slice(0, 16);
const featured = liveEvents[0];

function StatBar({ label, home, away }: { label: string; home: number; away: number }) {
  const total = home + away || 1;
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-[11px] text-text-dim mb-1">
        <span>{home}</span><span className="text-text-faint">{label}</span><span>{away}</span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden bg-surface-3">
        <div className="bg-lime" style={{ width: `${(home / total) * 100}%` }} />
        <div className="bg-violet" style={{ width: `${(away / total) * 100}%` }} />
      </div>
    </div>
  );
}

export default function LiveBetting() {
  const [loading, setLoading] = useState(true);
  const [minute, setMinute] = useState(featured?.minute ?? 0);
  const { addSelection } = useBetSlip();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!featured) return;
    const i = setInterval(() => setMinute(m => (m < 90 ? m + 1 : 0)), 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <Layout noPadding>
      <div className="max-w-[1600px] mx-auto flex">
        <div className="flex-1 min-w-0 px-3 md:px-5 py-4">
          <div className="flex items-center gap-2 mb-1">
            <Radio size={18} className="text-red animate-pulse-live" />
            <h1 className="font-display font-bold text-xl md:text-2xl">Live Betting</h1>
          </div>
          <p className="text-text-faint text-xs mb-5">{liveEvents.length} events in-play · odds refresh automatically</p>

          {loading ? (
            <LoadingBlock label="Connecting to live feed…" />
          ) : liveEvents.length === 0 ? (
            <EmptyState label="No live events right now" sub="Check back soon — new in-play matches appear regularly" />
          ) : (
            <>
              {featured && (
                <div className="bg-gradient-to-br from-surface to-surface-2 border border-line-soft rounded-2xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-red bg-red/10 px-2 py-1 rounded flex items-center gap-1">
                      <Radio size={10} className="animate-pulse-live" /> LIVE
                    </span>
                    <span className="text-xs text-text-faint">{featured.league}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-center flex-1">
                          <div className="w-10 h-10 rounded-full bg-lime/15 mx-auto mb-2 flex items-center justify-center font-display font-bold text-lime text-sm">{featured.home.short}</div>
                          <p className="text-xs font-medium">{featured.home.name}</p>
                        </div>
                        <div className="px-4 text-center">
                          <div className="font-display font-bold text-3xl">{featured.scoreHome} - {featured.scoreAway}</div>
                          <div className="text-[10px] text-red font-semibold mt-1">{minute}'</div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="w-10 h-10 rounded-full bg-violet/15 mx-auto mb-2 flex items-center justify-center font-display font-bold text-violet text-sm">{featured.away.short}</div>
                          <p className="text-xs font-medium">{featured.away.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-text-faint justify-center">
                        <Activity size={12} /> Live statistics updating in real time
                      </div>
                    </div>
                    <div className="bg-surface-2 rounded-xl p-4 flex flex-col justify-center">
                      <StatBar label="Possession %" home={58} away={42} />
                      <StatBar label="Shots on Target" home={6} away={3} />
                      <StatBar label="Corners" home={7} away={4} />
                      <StatBar label="Fouls" home={9} away={12} />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-line-soft flex gap-2 flex-wrap">
                    {[
                      { label: `1: ${featured.odds1x2.home.toFixed(2)}`, sel: featured.home.name, odds: featured.odds1x2.home },
                      featured.odds1x2.draw ? { label: `X: ${featured.odds1x2.draw.toFixed(2)}`, sel: 'Draw', odds: featured.odds1x2.draw } : null,
                      { label: `2: ${featured.odds1x2.away.toFixed(2)}`, sel: featured.away.name, odds: featured.odds1x2.away },
                    ].filter(Boolean).map((b, i) => (
                      <button key={i} onClick={() => addSelection({ id: `${featured.id}-feat-${i}`, eventName: `${featured.home.name} vs ${featured.away.name}`, market: 'Match Winner (1X2)', selection: b!.sel, odds: b!.odds })}
                        className="odds-btn bg-surface-3 hover:bg-lime hover:text-ink font-bold text-xs px-4 py-2 rounded-lg transition-colors">
                        {b!.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-surface border border-line-soft rounded-xl overflow-hidden">
                {liveEvents.map(ev => <MatchRow key={ev.id} event={ev} />)}
              </div>
            </>
          )}
        </div>
        <BetSlipPanel />
      </div>
      <BetSlipPanel floating />
    </Layout>
  );
}
