import { useState } from 'react';
import { User2, ShieldCheck, Gauge, History, KeyRound, Smartphone, Monitor } from 'lucide-react';
import Layout from '../components/Layout';
import { StatusPill } from '../components/UI';
import { CURRENT_USER } from '../data/mockData';

const LOGIN_HISTORY = [
  { device: 'Chrome · Windows', location: 'Mumbai, IN', time: '2 hours ago', icon: <Monitor size={14} /> },
  { device: 'BetNova App · Android', location: 'Mumbai, IN', time: 'Yesterday', icon: <Smartphone size={14} /> },
  { device: 'Safari · macOS', location: 'Bengaluru, IN', time: '3 days ago', icon: <Monitor size={14} /> },
  { device: 'BetNova App · iOS', location: 'Delhi, IN', time: '5 days ago', icon: <Smartphone size={14} /> },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={`w-10 h-6 rounded-full p-0.5 transition-colors ${checked ? 'bg-lime' : 'bg-surface-3'}`}>
      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : ''}`} />
    </button>
  );
}

export default function Profile() {
  const [twoFA, setTwoFA] = useState(true);
  const [depositLimit, setDepositLimit] = useState(true);
  const [realityCheck, setRealityCheck] = useState(false);

  return (
    <Layout>
      <h1 className="font-display font-bold text-2xl mb-1">Profile & Security</h1>
      <p className="text-text-faint text-xs mb-6">All account data shown is fictional demo content.</p>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-surface border border-line-soft rounded-xl p-5 text-center h-fit">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet to-violet-dim mx-auto mb-3 flex items-center justify-center font-display font-bold text-xl">
            {CURRENT_USER.username[0]}
          </div>
          <h3 className="font-semibold">{CURRENT_USER.username}</h3>
          <p className="text-xs text-text-faint mb-3">{CURRENT_USER.email}</p>
          <span className="inline-block text-[10px] font-bold bg-amber/10 text-amber px-2.5 py-1 rounded-full">{CURRENT_USER.vipTier} Tier</span>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="bg-surface border border-line-soft rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-1.5"><User2 size={14} /> Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Username', value: CURRENT_USER.username },
                { label: 'Email', value: CURRENT_USER.email },
                { label: 'Country', value: CURRENT_USER.country },
                { label: 'Member Since', value: new Date(CURRENT_USER.joined).toLocaleDateString() },
              ].map((f, i) => (
                <div key={i}>
                  <label className="text-[10px] text-text-faint block mb-1">{f.label}</label>
                  <div className="bg-surface-2 border border-line-soft rounded-lg px-3 py-2 text-xs">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-line-soft rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-1.5"><ShieldCheck size={14} /> KYC Verification</h3>
            <div className="flex items-center justify-between bg-surface-2 rounded-lg px-4 py-3">
              <div>
                <p className="text-xs font-medium">Identity Verification</p>
                <p className="text-[10px] text-text-faint mt-0.5">Government ID + address proof (mock)</p>
              </div>
              <StatusPill status={CURRENT_USER.kyc} />
            </div>
          </div>

          <div className="bg-surface border border-line-soft rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-1.5"><Gauge size={14} /> Responsible Gaming Limits</h3>
            <div className="space-y-3">
              {[
                { label: 'Daily deposit limit', value: '₹5,000', state: depositLimit, set: setDepositLimit },
                { label: 'Session reality check every 60 min', value: 'Reminder popup', state: realityCheck, set: setRealityCheck },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">{item.label}</p>
                    <p className="text-[10px] text-text-faint">{item.value}</p>
                  </div>
                  <Toggle checked={item.state} onChange={item.set} />
                </div>
              ))}
              <button className="text-xs text-red font-semibold mt-2">Self-exclude account (demo)</button>
            </div>
          </div>

          <div className="bg-surface border border-line-soft rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-1.5"><KeyRound size={14} /> Security Settings</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium">Two-factor authentication</p>
                <p className="text-[10px] text-text-faint">Extra login verification step (mock)</p>
              </div>
              <Toggle checked={twoFA} onChange={setTwoFA} />
            </div>
            <button className="text-xs bg-surface-2 border border-line-soft rounded-lg px-4 py-2 font-semibold hover:border-line">Change Password (demo)</button>
          </div>

          <div className="bg-surface border border-line-soft rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-1.5"><History size={14} /> Login History</h3>
            <div className="space-y-2">
              {LOGIN_HISTORY.map((l, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-surface-2 rounded-lg px-3 py-2.5">
                  <div className="flex items-center gap-2 text-text-dim">{l.icon} {l.device}</div>
                  <div className="text-text-faint">{l.location}</div>
                  <div className="text-text-faint">{l.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
