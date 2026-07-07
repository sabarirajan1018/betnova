import { Link } from 'react-router-dom';
import { Wallet, Ticket, CheckCircle2, Gift, Heart, Sparkles, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import { StatCard, StatusPill, EmptyState } from '../components/UI';
import { CURRENT_USER, BETS, TRANSACTIONS, CASINO_GAMES } from '../data/mockData';

const myBets = BETS.slice(0, 8);
const openBets = myBets.filter(b => b.status === 'Open');
const settledBets = myBets.filter(b => b.status !== 'Open');
const myTx = TRANSACTIONS.slice(0, 5);
const recommendedGames = CASINO_GAMES.slice(10, 15);
const favoriteSports = ['Football', 'Tennis', 'Esports'];

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl">Welcome back, {CURRENT_USER.username}</h1>
          <p className="text-text-faint text-xs mt-0.5">{CURRENT_USER.vipTier} tier member · Joined {new Date(CURRENT_USER.joined).toLocaleDateString()}</p>
        </div>
        <Link to="/wallet" className="flex items-center gap-1.5 bg-lime text-ink font-bold text-xs px-4 py-2.5 rounded-lg">
          <Wallet size={14} /> Manage Wallet
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Wallet Balance" value={`₹${CURRENT_USER.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} icon={<Wallet size={16} />} accent="lime" />
        <StatCard label="Bonus Balance" value={`₹${CURRENT_USER.bonusBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} icon={<Gift size={16} />} accent="violet" sub="20x wagering remaining" />
        <StatCard label="Open Bets" value={String(openBets.length)} icon={<Ticket size={16} />} accent="blue" />
        <StatCard label="Win Rate (30d)" value="54%" icon={<CheckCircle2 size={16} />} accent="amber" sub="Based on settled bets" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-surface border border-line-soft rounded-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
              <h3 className="font-semibold text-sm">Open Bets</h3>
              <span className="text-[11px] text-text-faint">{openBets.length} active</span>
            </div>
            {openBets.length === 0 ? <EmptyState label="No open bets" sub="Place a bet from the sportsbook to see it here" /> : (
              <div className="divide-y divide-line-soft/60">
                {openBets.map(b => (
                  <div key={b.id} className="px-4 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{b.eventName}</p>
                      <p className="text-[10px] text-text-faint truncate">{b.market} · {b.selection}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold font-display text-lime">{b.odds.toFixed(2)}</p>
                      <p className="text-[10px] text-text-faint">Stake ₹{b.stake.toFixed(0)}</p>
                    </div>
                    <StatusPill status={b.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface border border-line-soft rounded-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
              <h3 className="font-semibold text-sm">Settled Bets</h3>
              <span className="text-[11px] text-text-faint">Recent</span>
            </div>
            <div className="divide-y divide-line-soft/60">
              {settledBets.map(b => (
                <div key={b.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{b.eventName}</p>
                    <p className="text-[10px] text-text-faint truncate">{b.market} · {b.selection}</p>
                  </div>
                  <p className="text-[10px] text-text-faint shrink-0">₹{b.stake.toFixed(0)} @ {b.odds.toFixed(2)}</p>
                  <StatusPill status={b.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-line-soft rounded-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
              <h3 className="font-semibold text-sm">Recent Transactions</h3>
              <Link to="/wallet" className="text-[11px] text-lime flex items-center gap-0.5">View all <ArrowRight size={11} /></Link>
            </div>
            <div className="divide-y divide-line-soft/60">
              {myTx.map(t => (
                <div key={t.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium">{t.type}</p>
                    <p className="text-[10px] text-text-faint">{t.method} · {new Date(t.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`text-xs font-bold font-display ${t.type === 'Deposit' || t.type === 'Win' || t.type === 'Bonus' ? 'text-lime' : 'text-red'}`}>
                    {t.type === 'Deposit' || t.type === 'Win' || t.type === 'Bonus' ? '+' : '−'}₹{t.amount.toFixed(2)}
                  </p>
                  <StatusPill status={t.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-surface border border-line-soft rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-1.5"><Heart size={14} className="text-red" /> Favorite Sports</h3>
            <div className="flex flex-wrap gap-2">
              {favoriteSports.map(s => <span key={s} className="text-xs bg-surface-2 border border-line-soft px-2.5 py-1 rounded-full">{s}</span>)}
            </div>
          </div>

          <div className="bg-surface border border-line-soft rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-1.5"><Sparkles size={14} className="text-violet" /> Recommended Games</h3>
            <div className="grid grid-cols-2 gap-2">
              {recommendedGames.map(g => (
                <div key={g.id} className={`rounded-lg overflow-hidden bg-gradient-to-br ${g.color} h-20 flex items-end p-2`}>
                  <p className="text-white text-[10px] font-bold leading-tight">{g.name}</p>
                </div>
              ))}
            </div>
            <Link to="/casino" className="mt-3 flex items-center justify-center gap-1 text-xs text-violet font-semibold">Explore casino <ArrowRight size={12} /></Link>
          </div>

          <div className="bg-gradient-to-br from-lime/10 to-transparent border border-lime/20 rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-1">Bonus Wallet</h3>
            <p className="font-display font-bold text-2xl text-lime mb-1">₹{CURRENT_USER.bonusBalance.toFixed(2)}</p>
            <p className="text-[11px] text-text-faint mb-3">Wagering requirement: 20x (₹{(CURRENT_USER.bonusBalance * 20).toFixed(0)} remaining)</p>
            <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-lime" style={{ width: '32%' }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
