import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Radio, Dices, Smartphone, ShieldCheck, TrendingUp, BarChart3, ArrowRight,
  Trophy, Zap, Gauge, Lock, Layers, Sparkles,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { EVENTS, CASINO_GAMES } from '../data/mockData';

const featuredEvents = EVENTS.filter(e => e.trending).slice(0, 4);
const featuredGames = CASINO_GAMES.slice(0, 6);

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`max-w-7xl mx-auto px-5 ${className}`}>{children}</section>;
}

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-void bg-noise">
      <Header loggedIn={false} />

      {/* HERO */}
      <div className="relative overflow-hidden border-b border-line-soft">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(198,255,61,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(139,107,255,0.10),transparent_50%)]" />
        <Section className="relative py-16 md:py-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-lime bg-lime/10 border border-lime/20 px-3 py-1 rounded-full mb-5">
              <Sparkles size={12} /> Software Portfolio Demo — Fictional Platform
            </span>
            <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-5">
              Sportsbook & casino,<br />
              built like a <span className="text-lime">real operator.</span>
            </h1>
            <p className="text-text-dim text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              BetNova Pro is a fully original, fictional betting platform concept — dense odds boards,
              live in-play markets, a casino lobby, wallet flows, and a full back-office admin console.
              Mock data throughout, zero real-money processing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/sportsbook" className="flex items-center gap-2 bg-lime hover:bg-lime-dim text-ink font-bold px-6 py-3 rounded-xl transition-colors">
                Explore Sportsbook <ArrowRight size={16} />
              </Link>
              <Link to="/casino" className="flex items-center gap-2 bg-surface-2 border border-line-soft hover:border-violet/50 font-bold px-6 py-3 rounded-xl transition-colors">
                <Dices size={16} className="text-violet" /> Visit Casino
              </Link>
            </div>
            <div className="flex gap-8 mt-10 text-sm">
              <div><div className="font-display font-bold text-2xl">200+</div><div className="text-text-faint text-xs">Mock events</div></div>
              <div><div className="font-display font-bold text-2xl">50</div><div className="text-text-faint text-xs">Casino titles</div></div>
              <div><div className="font-display font-bold text-2xl">7</div><div className="text-text-faint text-xs">Sports covered</div></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-line-soft rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-text-dim flex items-center gap-1.5"><Radio size={13} className="text-red animate-pulse-live" /> Live now</span>
              <span className="text-[10px] text-text-faint">Mock odds board</span>
            </div>
            <div className="space-y-2">
              {featuredEvents.map(ev => (
                <div key={ev.id} className="flex items-center justify-between bg-surface-2 rounded-lg px-3 py-2.5 border border-line-soft/60">
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{ev.home.name} <span className="text-text-faint">vs</span> {ev.away.name}</p>
                    <p className="text-[10px] text-text-faint">{ev.league}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {[ev.odds1x2.home, ev.odds1x2.draw, ev.odds1x2.away].filter(Boolean).map((o, i) => (
                      <span key={i} className="text-[11px] font-bold font-display bg-surface-3 rounded px-2 py-1">{o!.toFixed(2)}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </Section>
      </div>

      {/* FEATURES */}
      <Section className="py-16 md:py-20">
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Everything a sportsbook needs</h2>
        <p className="text-text-dim mb-10 max-w-2xl">A demo built to mirror the depth of enterprise betting products — from odds boards to back-office risk tooling.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <Layers size={20} />, title: 'Dense odds boards', desc: '1X2, Over/Under, Handicap & 100+ markets per fixture across 7 sports.', accent: 'text-lime bg-lime/10' },
            { icon: <Radio size={20} />, title: 'Live in-play betting', desc: 'Animated odds movement, live scorelines, timers and match stats.', accent: 'text-red bg-red/10' },
            { icon: <Dices size={20} />, title: 'Casino lobby', desc: 'Slots, live tables, crash games and provider filters with demo play.', accent: 'text-violet bg-violet/10' },
            { icon: <Smartphone size={20} />, title: 'Mobile-first betting', desc: 'Sticky bet slip, responsive odds grid and a mobile app concept.', accent: 'text-blue bg-blue/10' },
            { icon: <BarChart3 size={20} />, title: 'Back-office analytics', desc: 'Revenue, risk, KYC and bet-volume dashboards for operators.', accent: 'text-amber bg-amber/10' },
            { icon: <ShieldCheck size={20} />, title: 'Responsible gaming', desc: 'Deposit limits, self-exclusion and reality-check tooling built in.', accent: 'text-lime bg-lime/10' },
          ].map((f, i) => (
            <div key={i} className="bg-surface border border-line-soft rounded-xl p-5 hover:border-line transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${f.accent}`}>
                {f.icon}
              </div>
              <h3 className="font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm text-text-dim leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* LIVE BETTING CALLOUT */}
      <div className="bg-surface/40 border-y border-line-soft">
        <Section className="py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-red text-xs font-bold flex items-center gap-1.5 mb-3"><Radio size={13} className="animate-pulse-live" /> LIVE BETTING</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">In-play markets that move in real time</h2>
            <p className="text-text-dim mb-6 leading-relaxed">
              Simulated live odds refresh every few seconds with score updates, match timers and momentum indicators —
              designed to demonstrate the UX patterns real in-play products rely on.
            </p>
            <Link to="/live" className="inline-flex items-center gap-2 text-lime font-semibold hover:gap-3 transition-all">
              Watch it in action <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-surface border border-line-soft rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold">Ironclad FC <span className="text-lime">2</span> — <span className="text-lime">1</span> Riverside United</span>
              <span className="text-[10px] bg-red/10 text-red px-2 py-1 rounded font-bold flex items-center gap-1"><Radio size={10} className="animate-pulse-live" /> 67'</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {['Possession 58%', 'Shots 11', 'Corners 6'].map((s, i) => (
                <div key={i} className="bg-surface-2 rounded-lg py-3 text-xs text-text-dim">{s}</div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* CASINO */}
      <Section className="py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">A casino lobby worth exploring</h2>
            <p className="text-text-dim max-w-xl">Slots, live dealer tables, and crash games from fictional demo providers.</p>
          </div>
          <Link to="/casino" className="hidden md:flex items-center gap-1 text-violet font-semibold text-sm">Full lobby <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuredGames.map(g => (
            <div key={g.id} className={`rounded-xl overflow-hidden border border-line-soft bg-gradient-to-br ${g.color} p-3 h-32 flex flex-col justify-end relative group cursor-pointer`}>
              {g.hot && <span className="absolute top-2 left-2 text-[9px] font-bold bg-ink/40 backdrop-blur px-1.5 py-0.5 rounded text-white">HOT</span>}
              <p className="text-white text-xs font-bold leading-tight drop-shadow">{g.name}</p>
              <p className="text-white/70 text-[10px]">{g.provider}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MOBILE APP */}
      <div className="bg-surface/40 border-y border-line-soft">
        <Section className="py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 bg-surface border border-line-soft rounded-2xl p-6 max-w-xs mx-auto">
            <div className="rounded-xl bg-ink border border-line-soft p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-xs">BetNova <span className="text-lime">Pro</span></span>
                <Gauge size={14} className="text-text-faint" />
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between bg-surface-2 rounded-lg px-2.5 py-2 mb-1.5">
                  <div className="h-2 w-20 bg-surface-3 rounded" />
                  <div className="h-2 w-8 bg-lime/40 rounded" />
                </div>
              ))}
              <div className="h-8 bg-lime rounded-lg mt-2" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-blue text-xs font-bold flex items-center gap-1.5 mb-3"><Smartphone size={13} /> MOBILE BETTING</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">Designed mobile-first, from the odds grid up</h2>
            <p className="text-text-dim mb-6 leading-relaxed">
              Every screen in this demo — odds boards, bet slip, wallet, casino lobby — collapses gracefully
              into a compact mobile layout with a sticky slip drawer and touch-first controls.
            </p>
            <ul className="space-y-2 text-sm text-text-dim">
              {['Sticky mobile bet slip drawer', 'Swipeable sport tabs', 'One-tap odds selection'].map((t, i) => (
                <li key={i} className="flex items-center gap-2"><Zap size={13} className="text-lime shrink-0" /> {t}</li>
              ))}
            </ul>
          </div>
        </Section>
      </div>

      {/* ADMIN / BACK-OFFICE */}
      <Section className="py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-amber text-xs font-bold flex items-center gap-1.5 mb-3"><Lock size={13} /> BACK-OFFICE TECHNOLOGY</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">An admin console built for operators</h2>
            <p className="text-text-dim mb-6 leading-relaxed">
              Behind the player-facing product sits a full back-office concept: user management, bet-volume and
              revenue analytics, KYC review queues, odds & match management, and risk alerting.
            </p>
            <Link to="/admin" className="inline-flex items-center gap-2 bg-surface-2 border border-line-soft hover:border-amber/50 font-bold px-5 py-2.5 rounded-xl transition-colors">
              <BarChart3 size={16} className="text-amber" /> View Admin Dashboard
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Active Users', value: '100', icon: <Trophy size={16} /> },
              { label: 'Bet Volume', value: '300', icon: <TrendingUp size={16} /> },
              { label: 'KYC Pending', value: '18', icon: <ShieldCheck size={16} /> },
              { label: 'Risk Alerts', value: '4', icon: <Lock size={16} /> },
            ].map((s, i) => (
              <div key={i} className="bg-surface border border-line-soft rounded-xl p-4">
                <div className="text-amber mb-2">{s.icon}</div>
                <div className="font-display font-bold text-xl">{s.value}</div>
                <div className="text-xs text-text-faint">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-20">
        <div className="bg-gradient-to-br from-surface to-surface-2 border border-line-soft rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(198,255,61,0.08),transparent_60%)]" />
          <h2 className="font-display font-bold text-2xl md:text-4xl mb-4 relative">Explore the full demo platform</h2>
          <p className="text-text-dim max-w-lg mx-auto mb-8 relative">Sportsbook, live betting, casino, wallet, promotions and an admin console — all in one portfolio build.</p>
          <div className="flex flex-wrap justify-center gap-3 relative">
            <Link to="/sportsbook" className="bg-lime hover:bg-lime-dim text-ink font-bold px-6 py-3 rounded-xl transition-colors">Enter Sportsbook</Link>
            <Link to="/dashboard" className="bg-surface-2 border border-line-soft font-bold px-6 py-3 rounded-xl hover:border-line transition-colors">View Dashboard</Link>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
