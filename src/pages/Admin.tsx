import { useMemo, useState } from 'react';
import {
  Users, TrendingUp, DollarSign, ShieldAlert, BadgeCheck, Trophy, Sliders, Dices,
  ArrowLeftRight, FileBarChart, Gift, Search,
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Layout from '../components/Layout';
import { StatCard, StatusPill, EmptyState } from '../components/UI';
import { USERS, EVENTS, BETS, CASINO_GAMES, TRANSACTIONS, PROMOTIONS } from '../data/mockData';

const TABS = [
  { key: 'overview', label: 'Overview', icon: <FileBarChart size={14} /> },
  { key: 'users', label: 'Users & KYC', icon: <Users size={14} /> },
  { key: 'matches', label: 'Match & Odds', icon: <Trophy size={14} /> },
  { key: 'casino', label: 'Casino Games', icon: <Dices size={14} /> },
  { key: 'transactions', label: 'Transactions', icon: <ArrowLeftRight size={14} /> },
  { key: 'promotions', label: 'Promotions', icon: <Gift size={14} /> },
] as const;

const revenueData = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  revenue: Math.round(18000 + Math.sin(i / 2) * 5000 + i * 900 + (i % 3) * 1500),
  bets: Math.round(180 + Math.sin(i / 3) * 40 + i * 6),
}));

const sportSplit = [
  { name: 'Football', value: 42, color: '#c6ff3d' },
  { name: 'Cricket', value: 21, color: '#8b6bff' },
  { name: 'Tennis', value: 14, color: '#3ea0ff' },
  { name: 'Basketball', value: 11, color: '#ff8a1e' },
  { name: 'Esports', value: 7, color: '#ff4d5e' },
  { name: 'Other', value: 5, color: '#5d6577' },
];

const riskAlerts = [
  { id: 'RSK-001', user: 'JamieOkafor42', type: 'Unusual stake pattern', severity: 'High' },
  { id: 'RSK-002', user: 'CaseySilva77', type: 'Rapid deposit-withdrawal cycle', severity: 'Medium' },
  { id: 'RSK-003', user: 'DrewIvanov15', type: 'Multiple accounts, shared device', severity: 'High' },
  { id: 'RSK-004', user: 'MorganRossi63', type: 'Bonus abuse pattern', severity: 'Low' },
];

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${active ? 'bg-lime text-ink' : 'text-text-dim hover:bg-surface-2'}`}>
      {children}
    </button>
  );
}

export default function Admin() {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('overview');
  const [search, setSearch] = useState('');

  const kycPending = useMemo(() => USERS.filter(u => u.kyc === 'Pending'), []);
  const filteredUsers = useMemo(() => USERS.filter(u => u.username.toLowerCase().includes(search.toLowerCase())).slice(0, 20), [search]);
  const totalRevenue = useMemo(() => TRANSACTIONS.filter(t => t.type === 'Bet').reduce((a, t) => a + t.amount, 0), []);
  const suspendedUsers = USERS.filter(u => u.status === 'Suspended').length;

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl mb-1">Admin Console</h1>
        <p className="text-text-faint text-xs">Back-office demo — synthetic data for operator-side workflows.</p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-6 border-b border-line-soft">
        {TABS.map(t => (
          <TabButton key={t.key} active={tab === t.key} onClick={() => setTab(t.key)}>{t.icon} {t.label}</TabButton>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Total Users" value={USERS.length.toString()} icon={<Users size={16} />} accent="lime" sub={`${suspendedUsers} suspended`} />
            <StatCard label="Bet Volume (300)" value={BETS.length.toString()} icon={<TrendingUp size={16} />} accent="blue" sub="Last 30 days" />
            <StatCard label="Simulated Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}k`} icon={<DollarSign size={16} />} accent="amber" sub="Bet turnover, mock" />
            <StatCard label="Risk Alerts" value={riskAlerts.length.toString()} icon={<ShieldAlert size={16} />} accent="red" sub="Needs review" />
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-surface border border-line-soft rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-4">Revenue & Bet Volume (14 days)</h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c6ff3d" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#c6ff3d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a202b" vertical={false} />
                  <XAxis dataKey="day" stroke="#5d6577" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#5d6577" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#161b24', border: '1px solid #262d3a', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" stroke="#c6ff3d" fill="url(#rev)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-surface border border-line-soft rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-4">Bet Volume by Sport</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={sportSplit} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                    {sportSplit.map((s, i) => <Cell key={i} fill={s.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#161b24', border: '1px solid #262d3a', borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
                {sportSplit.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px] text-text-dim">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} /> {s.name} {s.value}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="bg-surface border border-line-soft rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-4">Daily Bets Placed</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a202b" vertical={false} />
                  <XAxis dataKey="day" stroke="#5d6577" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#5d6577" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#161b24', border: '1px solid #262d3a', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="bets" fill="#8b6bff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-surface border border-line-soft rounded-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
                <h3 className="font-semibold text-sm flex items-center gap-1.5"><ShieldAlert size={14} className="text-red" /> Risk Alerts</h3>
              </div>
              <div className="divide-y divide-line-soft/60">
                {riskAlerts.map(r => (
                  <div key={r.id} className="px-4 py-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{r.user}</p>
                      <p className="text-[10px] text-text-faint truncate">{r.type}</p>
                    </div>
                    <StatusPill status={r.severity === 'High' ? 'Failed' : r.severity === 'Medium' ? 'Pending' : 'Completed'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-3 gap-3">
            <StatCard label="Verified" value={USERS.filter(u => u.kyc === 'Verified').length.toString()} icon={<BadgeCheck size={16} />} accent="lime" />
            <StatCard label="KYC Pending" value={kycPending.length.toString()} icon={<ShieldAlert size={16} />} accent="amber" />
            <StatCard label="Unverified" value={USERS.filter(u => u.kyc === 'Unverified').length.toString()} icon={<Users size={16} />} accent="red" />
          </div>
          <div className="bg-surface border border-line-soft rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft gap-3">
              <h3 className="font-semibold text-sm">User Management</h3>
              <div className="flex items-center gap-2 bg-surface-2 border border-line-soft rounded-lg px-2.5 py-1.5">
                <Search size={13} className="text-text-faint" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search username…" className="bg-transparent text-xs outline-none w-40" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-text-faint border-b border-line-soft">
                    <th className="px-4 py-2 font-medium">User</th>
                    <th className="px-4 py-2 font-medium">Country</th>
                    <th className="px-4 py-2 font-medium">Balance</th>
                    <th className="px-4 py-2 font-medium">VIP</th>
                    <th className="px-4 py-2 font-medium">KYC</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr><td colSpan={6}><EmptyState label="No users found" /></td></tr>
                  ) : filteredUsers.map(u => (
                    <tr key={u.id} className="border-b border-line-soft/50 hover:bg-surface-2/50">
                      <td className="px-4 py-2.5 font-medium">{u.username}</td>
                      <td className="px-4 py-2.5 text-text-dim">{u.country}</td>
                      <td className="px-4 py-2.5 font-display font-bold">₹{u.balance.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-text-dim">{u.vipTier}</td>
                      <td className="px-4 py-2.5"><StatusPill status={u.kyc} /></td>
                      <td className="px-4 py-2.5"><StatusPill status={u.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'matches' && (
        <div className="bg-surface border border-line-soft rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
            <h3 className="font-semibold text-sm flex items-center gap-1.5"><Sliders size={14} /> Match & Odds Management</h3>
            <span className="text-[11px] text-text-faint">{EVENTS.length} events</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-text-faint border-b border-line-soft">
                  <th className="px-4 py-2 font-medium">Match</th>
                  <th className="px-4 py-2 font-medium">Sport</th>
                  <th className="px-4 py-2 font-medium">1</th>
                  <th className="px-4 py-2 font-medium">X</th>
                  <th className="px-4 py-2 font-medium">2</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {EVENTS.slice(0, 20).map(ev => (
                  <tr key={ev.id} className="border-b border-line-soft/50 hover:bg-surface-2/50">
                    <td className="px-4 py-2.5 font-medium">{ev.home.name} vs {ev.away.name}</td>
                    <td className="px-4 py-2.5 text-text-dim capitalize">{ev.sport}</td>
                    <td className="px-4 py-2.5 font-display">{ev.odds1x2.home.toFixed(2)}</td>
                    <td className="px-4 py-2.5 font-display">{ev.odds1x2.draw?.toFixed(2) ?? '—'}</td>
                    <td className="px-4 py-2.5 font-display">{ev.odds1x2.away.toFixed(2)}</td>
                    <td className="px-4 py-2.5"><StatusPill status={ev.isLive ? 'Open' : 'Pending'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'casino' && (
        <div className="bg-surface border border-line-soft rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
            <h3 className="font-semibold text-sm flex items-center gap-1.5"><Dices size={14} /> Casino Game Management</h3>
            <span className="text-[11px] text-text-faint">{CASINO_GAMES.length} titles</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-text-faint border-b border-line-soft">
                  <th className="px-4 py-2 font-medium">Game</th>
                  <th className="px-4 py-2 font-medium">Category</th>
                  <th className="px-4 py-2 font-medium">Provider</th>
                  <th className="px-4 py-2 font-medium">RTP</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {CASINO_GAMES.slice(0, 20).map(g => (
                  <tr key={g.id} className="border-b border-line-soft/50 hover:bg-surface-2/50">
                    <td className="px-4 py-2.5 font-medium">{g.name}</td>
                    <td className="px-4 py-2.5 text-text-dim">{g.category}</td>
                    <td className="px-4 py-2.5 text-text-dim">{g.provider}</td>
                    <td className="px-4 py-2.5 font-display">{g.rtp}%</td>
                    <td className="px-4 py-2.5"><StatusPill status="Active" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'transactions' && (
        <div className="bg-surface border border-line-soft rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
            <h3 className="font-semibold text-sm flex items-center gap-1.5"><ArrowLeftRight size={14} /> Transaction Monitoring</h3>
            <span className="text-[11px] text-text-faint">{TRANSACTIONS.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-text-faint border-b border-line-soft">
                  <th className="px-4 py-2 font-medium">ID</th>
                  <th className="px-4 py-2 font-medium">User</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Amount</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.slice(0, 20).map(t => (
                  <tr key={t.id} className="border-b border-line-soft/50 hover:bg-surface-2/50">
                    <td className="px-4 py-2.5 text-text-faint">{t.id}</td>
                    <td className="px-4 py-2.5 font-medium">{t.userId}</td>
                    <td className="px-4 py-2.5 text-text-dim">{t.type}</td>
                    <td className="px-4 py-2.5 font-display font-bold">₹{t.amount.toFixed(2)}</td>
                    <td className="px-4 py-2.5"><StatusPill status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'promotions' && (
        <div className="bg-surface border border-line-soft rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
            <h3 className="font-semibold text-sm flex items-center gap-1.5"><Gift size={14} /> Promotions Management</h3>
            <span className="text-[11px] text-text-faint">{PROMOTIONS.length} active campaigns</span>
          </div>
          <div className="divide-y divide-line-soft/60">
            {PROMOTIONS.map(p => (
              <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{p.title}</p>
                  <p className="text-[10px] text-text-faint">{p.category}</p>
                </div>
                <StatusPill status="Active" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
