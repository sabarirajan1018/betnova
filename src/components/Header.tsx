import { Link, NavLink } from 'react-router-dom';
import { Radio, Dices, Wallet, User2, Menu, Search, Zap } from 'lucide-react';
import { useState } from 'react';
import { CURRENT_USER } from '../data/mockData';

const NAV = [
  { to: '/sportsbook', label: 'Sportsbook' },
  { to: '/live', label: 'Live Betting' },
  { to: '/casino', label: 'Casino' },
  { to: '/promotions', label: 'Promotions' },
];

export default function Header({ loggedIn = true }: { loggedIn?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-void/95 backdrop-blur">
      <div className="flex items-center gap-4 px-3 md:px-5 h-14">
        <button className="lg:hidden text-text-dim" onClick={() => setMobileOpen(v => !v)} aria-label="menu">
          <Menu size={22} />
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime to-lime-dim flex items-center justify-center">
            <Zap size={18} className="text-ink" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
            BetNova <span className="text-lime">Pro</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-2">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'text-lime bg-surface-2' : 'text-text-dim hover:text-text hover:bg-surface'
                }`
              }
            >
              {item.label === 'Live Betting' ? (
                <span className="flex items-center gap-1.5">
                  <Radio size={14} className="text-red animate-pulse-live" /> {item.label}
                </span>
              ) : item.label === 'Casino' ? (
                <span className="flex items-center gap-1.5"><Dices size={14} /> {item.label}</span>
              ) : item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-4 flex-1 max-w-xs">
          <div className="flex items-center gap-2 bg-surface border border-line-soft rounded-lg px-3 py-1.5 w-full">
            <Search size={14} className="text-text-faint" />
            <input placeholder="Search teams, leagues, games…" className="bg-transparent text-xs outline-none w-full placeholder:text-text-faint" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {loggedIn ? (
            <>
              <Link to="/wallet" className="hidden sm:flex items-center gap-1.5 bg-surface-2 border border-line-soft rounded-lg px-3 py-1.5 text-xs font-semibold hover:border-lime/40 transition-colors">
                <Wallet size={14} className="text-lime" />
                ₹{CURRENT_USER.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Link>
              <Link to="/dashboard" className="flex items-center gap-1.5 bg-surface border border-line-soft rounded-lg px-2.5 py-1.5 text-xs font-medium hover:border-line transition-colors">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet to-violet-dim flex items-center justify-center text-[10px] font-bold">
                  {CURRENT_USER.username[0]}
                </div>
                <span className="hidden md:inline">{CURRENT_USER.username}</span>
              </Link>
            </>
          ) : (
            <>
              <button className="text-xs font-semibold px-3 py-2 rounded-lg text-text-dim hover:text-text transition-colors">Login</button>
              <button className="text-xs font-bold px-3.5 py-2 rounded-lg bg-lime text-ink hover:bg-lime-dim transition-colors">Register</button>
            </>
          )}
          <Link to="/profile" className="hidden sm:flex p-2 rounded-lg text-text-dim hover:text-text hover:bg-surface transition-colors">
            <User2 size={18} />
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden flex flex-col border-t border-line-soft bg-surface">
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `px-4 py-3 text-sm border-b border-line-soft/50 ${isActive ? 'text-lime' : 'text-text-dim'}`}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-text-dim border-b border-line-soft/50">Dashboard</Link>
          <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-text-dim">Admin</Link>
        </nav>
      )}

      <div className="hidden md:flex items-center gap-6 px-5 h-8 border-t border-line-soft/60 text-[11px] text-text-faint overflow-hidden">
        <span className="text-lime font-semibold shrink-0">TRENDING</span>
        <div className="flex gap-8 whitespace-nowrap animate-ticker">
          <span>⚽ Ironclad FC vs Riverside United — kicks off in 32 min</span>
          <span>🏀 Vortex Ballers vs Ironhawks — LIVE now</span>
          <span>🎾 A. Voss vs K. Nakamura — Set 2 in progress</span>
          <span>🎮 Nova Wolves vs Phantom Five — Best of 5</span>
          <span>⚽ Ironclad FC vs Riverside United — kicks off in 32 min</span>
          <span>🏀 Vortex Ballers vs Ironhawks — LIVE now</span>
          <span>🎾 A. Voss vs K. Nakamura — Set 2 in progress</span>
          <span>🎮 Nova Wolves vs Phantom Five — Best of 5</span>
        </div>
      </div>
    </header>
  );
}
