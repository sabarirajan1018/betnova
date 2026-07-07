import { useState } from 'react';
import { CreditCard, Landmark, Smartphone, Bitcoin, ArrowDownCircle, ArrowUpCircle, ShieldAlert, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { StatCard, StatusPill } from '../components/UI';
import { CURRENT_USER, TRANSACTIONS } from '../data/mockData';

const METHODS = [
  { key: 'Card', label: 'Card', icon: <CreditCard size={18} /> },
  { key: 'Bank Transfer', label: 'Bank Transfer', icon: <Landmark size={18} /> },
  { key: 'UPI', label: 'UPI', icon: <Smartphone size={18} /> },
  { key: 'Crypto', label: 'Crypto', icon: <Bitcoin size={18} /> },
] as const;

export default function WalletPage() {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [method, setMethod] = useState<(typeof METHODS)[number]['key']>('Card');
  const [amount, setAmount] = useState(1000);
  const [confirmed, setConfirmed] = useState(false);

  const submit = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2500);
  };

  return (
    <Layout>
      <h1 className="font-display font-bold text-2xl mb-1">Wallet</h1>
      <p className="text-text-faint text-xs mb-6">All balances and transactions on this page are simulated. Demo only.</p>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <StatCard label="Main Balance" value={`₹${CURRENT_USER.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} icon={<ArrowDownCircle size={16} />} accent="lime" />
        <StatCard label="Bonus Wallet" value={`₹${CURRENT_USER.bonusBalance.toFixed(2)}`} icon={<Gift size={16} />} accent="violet" sub="Locked until wagering complete" />
        <StatCard label="Pending Withdrawals" value="₹0.00" icon={<ArrowUpCircle size={16} />} accent="amber" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-surface border border-line-soft rounded-xl p-5">
          <div className="flex bg-surface-2 rounded-lg p-1 mb-5">
            {(['deposit', 'withdraw'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 text-xs font-bold py-2 rounded-md capitalize transition-colors ${tab === t ? 'bg-lime text-ink' : 'text-text-dim'}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="bg-amber/10 border border-amber/30 text-amber text-[11px] rounded-lg px-3 py-2 mb-4 flex gap-2">
            <ShieldAlert size={14} className="shrink-0 mt-0.5" />
            Demo only — this form does not connect to any real payment gateway or crypto network.
          </div>

          <label className="text-[11px] text-text-faint mb-1.5 block">Payment method</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {METHODS.map(m => (
              <button
                key={m.key}
                onClick={() => setMethod(m.key)}
                className={`flex items-center gap-2 border rounded-lg px-3 py-2.5 text-xs font-medium transition-colors ${method === m.key ? 'border-lime bg-lime/10 text-lime' : 'border-line-soft text-text-dim'}`}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>

          <label className="text-[11px] text-text-faint mb-1.5 block">Amount (₹)</label>
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} min={100}
            className="w-full bg-surface-2 border border-line-soft rounded-lg px-3 py-2.5 text-sm font-semibold outline-none focus:border-lime/50 mb-3" />

          <div className="flex gap-2 mb-4">
            {[500, 1000, 2500, 5000].map(v => (
              <button key={v} onClick={() => setAmount(v)} className="flex-1 text-[11px] bg-surface-2 border border-line-soft rounded-md py-1.5 hover:border-lime/40">₹{v}</button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-lime/10 border border-lime/40 text-lime text-sm font-bold text-center rounded-lg py-2.5">
                Mock {tab} of ₹{amount} confirmed
              </motion.div>
            ) : (
              <motion.button key="btn" onClick={submit} className="w-full bg-lime hover:bg-lime-dim text-ink font-bold py-2.5 rounded-lg text-sm transition-colors capitalize">
                Confirm Mock {tab}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-2 bg-surface border border-line-soft rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
            <h3 className="font-semibold text-sm">Transaction History</h3>
            <span className="text-[11px] text-text-faint">{TRANSACTIONS.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-text-faint border-b border-line-soft">
                  <th className="px-4 py-2 font-medium">ID</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Method</th>
                  <th className="px-4 py-2 font-medium">Amount</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.slice(0, 25).map(t => (
                  <tr key={t.id} className="border-b border-line-soft/50 hover:bg-surface-2/50">
                    <td className="px-4 py-2.5 text-text-faint">{t.id}</td>
                    <td className="px-4 py-2.5 font-medium">{t.type}</td>
                    <td className="px-4 py-2.5 text-text-dim">{t.method}</td>
                    <td className={`px-4 py-2.5 font-bold font-display ${t.type === 'Deposit' || t.type === 'Win' || t.type === 'Bonus' ? 'text-lime' : 'text-red'}`}>
                      {t.type === 'Deposit' || t.type === 'Win' || t.type === 'Bonus' ? '+' : '−'}₹{t.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5"><StatusPill status={t.status} /></td>
                    <td className="px-4 py-2.5 text-text-faint">{new Date(t.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
