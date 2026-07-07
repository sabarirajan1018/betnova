import { Link } from 'react-router-dom';
import { Zap, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-line-soft bg-ink mt-auto">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-lime to-lime-dim flex items-center justify-center">
              <Zap size={16} className="text-ink" />
            </div>
            <span className="font-display font-bold">BetNova <span className="text-lime">Pro</span></span>
          </div>
          <p className="text-text-faint text-xs leading-relaxed max-w-xs">
            A fictional sportsbook & casino UI built as a software portfolio demonstration.
            All odds, matches, players, and balances are synthetic.
          </p>
        </div>
        <div>
          <h4 className="text-text-dim font-semibold text-xs uppercase tracking-wider mb-3">Product</h4>
          <ul className="space-y-2 text-text-faint text-xs">
            <li><Link to="/sportsbook" className="hover:text-lime">Sportsbook</Link></li>
            <li><Link to="/live" className="hover:text-lime">Live Betting</Link></li>
            <li><Link to="/casino" className="hover:text-lime">Casino</Link></li>
            <li><Link to="/promotions" className="hover:text-lime">Promotions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-text-dim font-semibold text-xs uppercase tracking-wider mb-3">Account</h4>
          <ul className="space-y-2 text-text-faint text-xs">
            <li><Link to="/dashboard" className="hover:text-lime">Dashboard</Link></li>
            <li><Link to="/wallet" className="hover:text-lime">Wallet</Link></li>
            <li><Link to="/profile" className="hover:text-lime">Profile & Security</Link></li>
            <li><Link to="/admin" className="hover:text-lime">Admin Console</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-text-dim font-semibold text-xs uppercase tracking-wider mb-3">Responsible Play</h4>
          <ul className="space-y-2 text-text-faint text-xs">
            <li className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-lime" /> Deposit limits</li>
            <li className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-lime" /> Self-exclusion tools</li>
            <li className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-lime" /> Reality checks</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-soft/60">
        <div className="max-w-7xl mx-auto px-5 py-4 text-[11px] text-text-faint leading-relaxed">
          <p className="mb-1">
            <strong className="text-amber">Demo Notice:</strong> This is a software demo platform using mock data only.
            No real-money betting, gambling, payment processing, or withdrawals are implemented.
          </p>
          <p>© {new Date().getFullYear()} BetNova Pro — fictional brand created for a UI/UX portfolio demo. Not a licensed gambling operator.</p>
        </div>
      </div>
    </footer>
  );
}
