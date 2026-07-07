export type SportKey = 'football' | 'cricket' | 'tennis' | 'basketball' | 'baseball' | 'mma' | 'esports';

export interface Team {
  name: string;
  short: string;
}

export interface MatchOdds {
  home: number;
  draw?: number;
  away: number;
}

export interface OverUnderOdds {
  line: number;
  over: number;
  under: number;
}

export interface HandicapOdds {
  line: number;
  home: number;
  away: number;
}

export interface SportEvent {
  id: string;
  sport: SportKey;
  league: string;
  home: Team;
  away: Team;
  startTime: string; // ISO
  isLive: boolean;
  minute?: number;
  scoreHome?: number;
  scoreAway?: number;
  trending: boolean;
  boosted: boolean;
  markets: number;
  odds1x2: MatchOdds;
  overUnder: OverUnderOdds;
  handicap: HandicapOdds;
}

export interface CasinoGame {
  id: string;
  name: string;
  category: 'Slots' | 'Live Casino' | 'Roulette' | 'Blackjack' | 'Baccarat' | 'Poker' | 'Crash Games';
  provider: 'Nova Evolve' | 'Prime Studio' | 'Skyline Games' | 'NetVegas' | 'Playtower';
  rtp: number;
  hot: boolean;
  isNew: boolean;
  color: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'Deposit' | 'Withdrawal' | 'Bet' | 'Win' | 'Bonus';
  method: 'Card' | 'Bank Transfer' | 'UPI' | 'Crypto' | 'System';
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export interface Bet {
  id: string;
  userId: string;
  eventName: string;
  market: string;
  selection: string;
  odds: number;
  stake: number;
  status: 'Open' | 'Won' | 'Lost' | 'Cashed Out';
  potentialReturn: number;
  date: string;
}

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  country: string;
  balance: number;
  bonusBalance: number;
  kyc: 'Verified' | 'Pending' | 'Unverified';
  joined: string;
  vipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  status: 'Active' | 'Suspended';
}

export interface Promotion {
  id: string;
  title: string;
  category: 'Welcome' | 'Free Bet' | 'Cashback' | 'VIP' | 'Referral' | 'Free Spins';
  description: string;
  terms: string;
  badge: string;
}

export interface BetSlipSelection {
  id: string;
  eventName: string;
  market: string;
  selection: string;
  odds: number;
}
