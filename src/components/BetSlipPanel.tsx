import { X, Trash2, Ticket, CheckCircle2 } from 'lucide-react';
import { useBetSlip } from '../context/BetSlipContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function BetSlipPanel({ floating = false }: { floating?: boolean }) {
  const { selections, removeSelection, clearAll, stake, setStake, lastPlaced, placeBet, isOpenMobile, setOpenMobile } = useBetSlip();

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);
  const potentialReturn = selections.length ? stake * totalOdds : 0;
  const isMulti = selections.length > 1;

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-line-soft">
        <div className="flex items-center gap-2 font-display font-bold text-sm">
          <Ticket size={16} className="text-lime" /> Bet Slip
          {selections.length > 0 && <span className="text-[10px] bg-lime text-ink px-1.5 py-0.5 rounded-full font-bold">{selections.length}</span>}
        </div>
        <div className="flex items-center gap-2">
          {selections.length > 0 && (
            <button onClick={clearAll} className="text-[11px] text-text-faint hover:text-red flex items-center gap-1">
              <Trash2 size={12} /> Clear all
            </button>
          )}
          {floating && (
            <button onClick={() => setOpenMobile(false)} className="lg:hidden text-text-dim"><X size={18} /></button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {selections.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-14 px-6 text-center">
              <Ticket size={34} className="text-text-faint mb-3" />
              <p className="text-sm text-text-dim font-medium">Your bet slip is empty</p>
              <p className="text-xs text-text-faint mt-1">Click any odds to add a selection</p>
            </div>
          )}
          {selections.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="px-4 py-3 border-b border-line-soft/60"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{s.selection}</p>
                  <p className="text-[10px] text-text-faint truncate">{s.market}</p>
                  <p className="text-[10px] text-text-faint truncate">{s.eventName}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold font-display text-lime">{s.odds.toFixed(2)}</span>
                  <button onClick={() => removeSelection(s.id)} className="text-text-faint hover:text-red">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selections.length > 0 && (
        <div className="p-4 border-t border-line-soft space-y-3">
          {isMulti && (
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">Combined odds</span>
              <span className="font-bold font-display text-lime">{totalOdds.toFixed(2)}</span>
            </div>
          )}
          <div>
            <label className="text-[11px] text-text-faint mb-1 block">Stake (₹)</label>
            <input
              type="number"
              min={10}
              value={stake}
              onChange={e => setStake(Number(e.target.value))}
              className="w-full bg-surface-2 border border-line-soft rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-lime/50"
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-dim">Potential return</span>
            <span className="font-bold font-display text-lime">₹{potentialReturn.toFixed(2)}</span>
          </div>
          <AnimatePresence mode="wait">
            {lastPlaced ? (
              <motion.div
                key="placed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 bg-lime/10 border border-lime/40 text-lime rounded-lg py-2.5 text-sm font-bold"
              >
                <CheckCircle2 size={16} /> Bet placed (demo)
              </motion.div>
            ) : (
              <motion.button
                key="place"
                onClick={placeBet}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-lime hover:bg-lime-dim text-ink font-bold py-2.5 rounded-lg text-sm transition-colors"
              >
                Place Mock Bet
              </motion.button>
            )}
          </AnimatePresence>
          <p className="text-[10px] text-text-faint text-center">Demo only — no real money is wagered</p>
        </div>
      )}
    </div>
  );

  if (!floating) {
    return (
      <aside className="hidden lg:flex flex-col w-80 shrink-0 border-l border-line-soft bg-surface/40 h-[calc(100vh-3.5rem-2rem)] sticky top-[5.5rem]">
        {content}
      </aside>
    );
  }

  return (
    <AnimatePresence>
      {isOpenMobile && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-surface border-t border-line-soft rounded-t-2xl h-[75vh] shadow-2xl"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
