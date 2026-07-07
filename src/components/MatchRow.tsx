import { useState, useEffect, useRef } from 'react';
import { Radio, Flame, ChevronRight, Sparkles } from 'lucide-react';
import type { SportEvent } from '../types';
import { useBetSlip } from '../context/BetSlipContext';

function OddsButton({ label, value, onPick, flashKey }: { label?: string; value: number; onPick: () => void; flashKey: string }) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlash(value > prevRef.current ? 'up' : 'down');
      prevRef.current = value;
      const t = setTimeout(() => setFlash(null), 900);
      return () => clearTimeout(t);
    }
  }, [value, flashKey]);

  return (
    <button
      onClick={onPick}
      className={`odds-btn flex-1 min-w-[58px] flex flex-col items-center justify-center rounded-md border border-line-soft bg-surface-2 hover:border-lime/50 hover:bg-surface-3 py-1.5 px-1 ${flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''}`}
    >
      {label && <span className="text-[9px] text-text-faint mb-0.5">{label}</span>}
      <span className="text-xs font-bold font-display">{value.toFixed(2)}</span>
    </button>
  );
}

function timeLabel(iso: string, isLive?: boolean, minute?: number) {
  if (isLive) return `${minute}'`;
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  return sameDay
    ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString([], { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MatchRow({ event, dense = false }: { event: SportEvent; dense?: boolean }) {
  const { addSelection } = useBetSlip();
  const [odds, setOdds] = useState(event.odds1x2);

  useEffect(() => {
    if (!event.isLive) return;
    const interval = setInterval(() => {
      setOdds(prev => ({
        home: Math.max(1.05, +(prev.home + (Math.random() - 0.5) * 0.12).toFixed(2)),
        draw: prev.draw ? Math.max(1.05, +(prev.draw + (Math.random() - 0.5) * 0.1).toFixed(2)) : undefined,
        away: Math.max(1.05, +(prev.away + (Math.random() - 0.5) * 0.12).toFixed(2)),
      }));
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [event.isLive]);

  const pickSelection = (market: string, selection: string, value: number) => {
    addSelection({
      id: `${event.id}-${market}-${selection}`,
      eventName: `${event.home.name} vs ${event.away.name}`,
      market,
      selection,
      odds: value,
    });
  };

  return (
    <div className={`grid grid-cols-[1fr_auto] gap-3 items-center px-3 py-3 border-b border-line-soft/70 hover:bg-surface/60 transition-colors ${dense ? '' : ''}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {event.isLive && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-red bg-red/10 px-1.5 py-0.5 rounded">
              <Radio size={10} className="animate-pulse-live" /> LIVE {timeLabel(event.startTime, true, event.minute)}
            </span>
          )}
          {!event.isLive && <span className="text-[10px] text-text-faint">{timeLabel(event.startTime)}</span>}
          <span className="text-[10px] text-text-faint truncate">{event.league}</span>
          {event.trending && <span className="flex items-center gap-0.5 text-[9px] text-amber font-semibold"><Flame size={10} /> Trending</span>}
          {event.boosted && <span className="flex items-center gap-0.5 text-[9px] text-violet font-semibold"><Sparkles size={10} /> Boosted</span>}
        </div>
        <div className="text-sm font-medium truncate">
          {event.home.name}
          {event.isLive && <span className="text-text-dim font-display ml-1.5">{event.scoreHome}</span>}
          <span className="text-text-faint mx-1.5">vs</span>
          {event.away.name}
          {event.isLive && <span className="text-text-dim font-display ml-1.5">{event.scoreAway}</span>}
        </div>
        <button className="mt-1 flex items-center gap-0.5 text-[10px] text-text-faint hover:text-lime">
          +{event.markets} more markets <ChevronRight size={11} />
        </button>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex gap-1 w-[168px] sm:w-[190px]">
          <OddsButton label="1" value={odds.home} flashKey={event.id + 'h'} onPick={() => pickSelection('Match Winner (1X2)', event.home.name, odds.home)} />
          {odds.draw !== undefined && (
            <OddsButton label="X" value={odds.draw} flashKey={event.id + 'd'} onPick={() => pickSelection('Match Winner (1X2)', 'Draw', odds.draw!)} />
          )}
          <OddsButton label="2" value={odds.away} flashKey={event.id + 'a'} onPick={() => pickSelection('Match Winner (1X2)', event.away.name, odds.away)} />
        </div>
        <div className="hidden md:flex gap-1 w-[130px]">
          <OddsButton label={`O ${event.overUnder.line}`} value={event.overUnder.over} flashKey={event.id + 'o'} onPick={() => pickSelection(`Over/Under ${event.overUnder.line}`, 'Over', event.overUnder.over)} />
          <OddsButton label={`U ${event.overUnder.line}`} value={event.overUnder.under} flashKey={event.id + 'u'} onPick={() => pickSelection(`Over/Under ${event.overUnder.line}`, 'Under', event.overUnder.under)} />
        </div>
        <div className="hidden xl:flex gap-1 w-[130px]">
          <OddsButton label={`H ${event.handicap.line > 0 ? '+' : ''}${event.handicap.line}`} value={event.handicap.home} flashKey={event.id + 'hh'} onPick={() => pickSelection(`Handicap ${event.handicap.line}`, event.home.name, event.handicap.home)} />
          <OddsButton label={`H ${event.handicap.line > 0 ? '-' : '+'}${Math.abs(event.handicap.line)}`} value={event.handicap.away} flashKey={event.id + 'ha'} onPick={() => pickSelection(`Handicap ${event.handicap.line}`, event.away.name, event.handicap.away)} />
        </div>
      </div>
    </div>
  );
}
