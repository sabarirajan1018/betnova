import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { BetSlipSelection } from '../types';

interface BetSlipContextValue {
  selections: BetSlipSelection[];
  addSelection: (s: BetSlipSelection) => void;
  removeSelection: (id: string) => void;
  clearAll: () => void;
  stake: number;
  setStake: (n: number) => void;
  isOpenMobile: boolean;
  setOpenMobile: (v: boolean) => void;
  lastPlaced: boolean;
  placeBet: () => void;
}

const BetSlipContext = createContext<BetSlipContextValue | null>(null);

export function BetSlipProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<BetSlipSelection[]>([]);
  const [stake, setStake] = useState<number>(100);
  const [isOpenMobile, setOpenMobile] = useState(false);
  const [lastPlaced, setLastPlaced] = useState(false);

  const addSelection = (s: BetSlipSelection) => {
    setSelections(prev => {
      const exists = prev.find(p => p.eventName === s.eventName && p.market === s.market);
      if (exists) {
        return prev.map(p => (p.eventName === s.eventName && p.market === s.market ? s : p));
      }
      return [...prev, s];
    });
    setOpenMobile(true);
    setLastPlaced(false);
  };

  const removeSelection = (id: string) => setSelections(prev => prev.filter(p => p.id !== id));
  const clearAll = () => setSelections([]);

  const placeBet = () => {
    setLastPlaced(true);
    setTimeout(() => {
      setSelections([]);
      setLastPlaced(false);
    }, 2200);
  };

  const value = useMemo(() => ({
    selections, addSelection, removeSelection, clearAll, stake, setStake, isOpenMobile, setOpenMobile, lastPlaced, placeBet,
  }), [selections, stake, isOpenMobile, lastPlaced]);

  return <BetSlipContext.Provider value={value}>{children}</BetSlipContext.Provider>;
}

export function useBetSlip() {
  const ctx = useContext(BetSlipContext);
  if (!ctx) throw new Error('useBetSlip must be used within BetSlipProvider');
  return ctx;
}
