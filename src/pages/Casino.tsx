import { useMemo, useState } from 'react';
import { X, Play, Heart, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { EmptyState } from '../components/UI';
import { CASINO_GAMES } from '../data/mockData';
import type { CasinoGame } from '../types';

const CATEGORIES: (CasinoGame['category'] | 'All')[] = ['All', 'Slots', 'Live Casino', 'Roulette', 'Blackjack', 'Baccarat', 'Poker', 'Crash Games'];
const PROVIDERS: (CasinoGame['provider'] | 'All')[] = ['All', 'Nova Evolve', 'Prime Studio', 'Skyline Games', 'NetVegas', 'Playtower'];

function GameCard({ game, favorited, onToggleFav, onPlay }: { game: CasinoGame; favorited: boolean; onToggleFav: () => void; onPlay: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative rounded-xl overflow-hidden border border-line-soft bg-gradient-to-br ${game.color} h-40 flex flex-col justify-end p-3 cursor-pointer`}
      onClick={onPlay}
    >
      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-ink text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <Play size={12} fill="currentColor" /> Play Demo
        </span>
      </div>
      <div className="absolute top-2 left-2 flex gap-1">
        {game.hot && <span className="text-[9px] font-bold bg-ink/50 backdrop-blur px-1.5 py-0.5 rounded text-white flex items-center gap-0.5"><Flame size={9} /> HOT</span>}
        {game.isNew && <span className="text-[9px] font-bold bg-lime/90 px-1.5 py-0.5 rounded text-ink flex items-center gap-0.5"><Sparkles size={9} /> NEW</span>}
      </div>
      <button
        onClick={e => { e.stopPropagation(); onToggleFav(); }}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-ink/40 backdrop-blur flex items-center justify-center z-10"
      >
        <Heart size={12} className={favorited ? 'text-red fill-red' : 'text-white'} />
      </button>
      <p className="text-white text-xs font-bold leading-tight drop-shadow relative z-[1]">{game.name}</p>
      <p className="text-white/70 text-[10px] relative z-[1]">{game.provider} · RTP {game.rtp}%</p>
    </motion.div>
  );
}

export default function Casino() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]>('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeGame, setActiveGame] = useState<CasinoGame | null>(null);
  const [showFavOnly, setShowFavOnly] = useState(false);

  const toggleFav = (id: string) => setFavorites(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const filtered = useMemo(() => {
    let list = CASINO_GAMES;
    if (category !== 'All') list = list.filter(g => g.category === category);
    if (provider !== 'All') list = list.filter(g => g.provider === provider);
    if (showFavOnly) list = list.filter(g => favorites.has(g.id));
    return list;
  }, [category, provider, showFavOnly, favorites]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl">Casino Lobby</h1>
          <p className="text-text-faint text-xs mt-0.5">{CASINO_GAMES.length} demo titles across {CATEGORIES.length - 1} categories</p>
        </div>
        <button
          onClick={() => setShowFavOnly(v => !v)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-colors ${showFavOnly ? 'bg-red/10 border-red/40 text-red' : 'border-line-soft text-text-dim'}`}
        >
          <Heart size={13} className={showFavOnly ? 'fill-red' : ''} /> Favorites ({favorites.size})
        </button>
      </div>

      {/* Promo banner */}
      <div className="bg-gradient-to-r from-violet/20 via-surface to-surface border border-violet/30 rounded-2xl p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-[10px] font-bold text-violet bg-violet/15 px-2 py-1 rounded-full">CASINO PROMO</span>
          <h3 className="font-display font-bold text-lg mt-2">50 Free Spins on Comet Riches</h3>
          <p className="text-text-dim text-xs mt-1">No deposit required · demo bonus simulation</p>
        </div>
        <button className="bg-violet hover:bg-violet-dim text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors">Claim Demo Bonus</button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-3">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${category === c ? 'bg-violet text-white border-violet' : 'border-line-soft text-text-dim'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-6">
        {PROVIDERS.map(p => (
          <button key={p} onClick={() => setProvider(p)} className={`shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-md border transition-colors ${provider === p ? 'bg-surface-3 border-line text-text' : 'border-line-soft/60 text-text-faint'}`}>
            {p}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState label="No games match your filters" sub="Try a different category or provider" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(g => (
            <GameCard key={g.id} game={g} favorited={favorites.has(g.id)} onToggleFav={() => toggleFav(g.id)} onPlay={() => setActiveGame(g)} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveGame(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
              onClick={e => e.stopPropagation()}
              className="bg-surface border border-line-soft rounded-2xl max-w-md w-full overflow-hidden"
            >
              <div className={`h-48 bg-gradient-to-br ${activeGame.color} flex items-center justify-center relative`}>
                <button onClick={() => setActiveGame(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink/40 flex items-center justify-center text-white"><X size={16} /></button>
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Play size={26} className="text-white" fill="currentColor" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg mb-1">{activeGame.name}</h3>
                <p className="text-xs text-text-faint mb-4">{activeGame.provider} · {activeGame.category} · RTP {activeGame.rtp}%</p>
                <div className="bg-amber/10 border border-amber/30 text-amber text-[11px] rounded-lg px-3 py-2 mb-4">
                  Demo mode — no real wagers, winnings or crypto/payment processing occur.
                </div>
                <button onClick={() => setActiveGame(null)} className="w-full bg-lime hover:bg-lime-dim text-ink font-bold py-2.5 rounded-lg transition-colors">
                  Launch Demo Play
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
