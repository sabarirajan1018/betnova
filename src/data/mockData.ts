import type {
  SportEvent, SportKey, CasinoGame, Transaction, Bet, UserAccount, Promotion,
} from '../types';

// ---- seeded PRNG so the demo looks the same on every load ----
let seed = 42;
function rand(): number {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}
function randInt(min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function randOdds(min = 1.2, max = 8.5): number {
  return Math.round((min + rand() * (max - min)) * 100) / 100;
}
function id(prefix: string, n: number) {
  return `${prefix}-${String(n).padStart(4, '0')}`;
}

const SPORT_LEAGUES: Record<SportKey, string[]> = {
  football: ['Continental Premier League', 'Atlantic Cup', 'Northgate Division 1', 'Golden Valley League', 'Pan-Union Cup'],
  cricket: ['Trophy Premier League', 'Coastal T20 Series', 'International Test Circuit', 'Metro Cricket League'],
  tennis: ['Grand Slam Series', 'ATP Masters Circuit', 'WTA Tour Finals', 'Continental Open'],
  basketball: ['National Hoops League', 'Euro Basket Championship', 'Metro 3x3 League'],
  baseball: ['Diamond League', 'National Baseball Circuit', 'Coastal Series'],
  mma: ['Apex Fighting Championship', 'Iron Cage League', 'Global Combat Series'],
  esports: ['Nova Esports League', 'Global Arena Championship', 'Rift Masters Series'],
};

const TEAM_NAMES: Record<SportKey, string[]> = {
  football: ['Ironclad FC', 'Riverside United', 'Sable Athletic', 'Crescent City', 'Vortex FC', 'Highland Rangers', 'Solaris United', 'Blackwood FC', 'Meridian City', 'Falcon Point', 'Granite FC', 'Steel Harbor', 'Obsidian United', 'Cobalt City', 'North Star FC', 'Emberfield'],
  cricket: ['Royal Strikers', 'Coastal Titans', 'Desert Falcons', 'Highland Warriors', 'Metro Kings', 'River Panthers', 'Storm Riders', 'Sunset Gladiators'],
  tennis: ['A. Voss', 'M. Delacroix', 'K. Nakamura', 'J. Okafor', 'L. Petrov', 'S. Alvarado', 'R. Kimura', 'T. Larsson'],
  basketball: ['Vortex Ballers', 'Ironhawks', 'Nova Titans', 'Crimson Wolves', 'Skyline Runners', 'Granite Giants'],
  baseball: ['Harbor Sharks', 'Redline Sox', 'Ember Hawks', 'Steel City Bats', 'Coastal Marlins'],
  mma: ['B. Okonkwo', 'D. Silveira', 'M. Kowalski', 'R. Tanaka', 'A. Volkova', 'J. Marchetti'],
  esports: ['Nova Wolves', 'Phantom Five', 'Crimson Circuit', 'Vortex Gaming', 'Obsidian Esports', 'Skyline Five'],
};

const SPORTS: SportKey[] = ['football', 'cricket', 'tennis', 'basketball', 'baseball', 'mma', 'esports'];

function makeTeam(sport: SportKey, exclude?: string) {
  const pool = TEAM_NAMES[sport];
  let name = pick(pool);
  let guard = 0;
  while (name === exclude && guard < 10) { name = pick(pool); guard++; }
  return { name, short: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 3) };
}

export function generateEvents(count: number): SportEvent[] {
  const events: SportEvent[] = [];
  for (let i = 0; i < count; i++) {
    const sport = SPORTS[i % SPORTS.length];
    const home = makeTeam(sport);
    const away = makeTeam(sport, home.name);
    const isLive = rand() < 0.18;
    const startOffsetMin = isLive ? -randInt(1, 70) : randInt(10, 60 * 48);
    const start = new Date(Date.now() + startOffsetMin * 60000);
    const home1x2 = randOdds(1.4, 5.2);
    const away1x2 = randOdds(1.4, 5.2);
    events.push({
      id: id('EVT', i + 1),
      sport,
      league: pick(SPORT_LEAGUES[sport]),
      home,
      away,
      startTime: start.toISOString(),
      isLive,
      minute: isLive ? Math.min(90, Math.abs(startOffsetMin)) : undefined,
      scoreHome: isLive ? randInt(0, 4) : undefined,
      scoreAway: isLive ? randInt(0, 4) : undefined,
      trending: rand() < 0.15,
      boosted: rand() < 0.08,
      markets: randInt(45, 180),
      odds1x2: { home: home1x2, draw: sport === 'football' || sport === 'cricket' ? randOdds(2.8, 4.5) : undefined, away: away1x2 },
      overUnder: { line: Math.round((1.5 + rand() * 4) * 2) / 2, over: randOdds(1.6, 2.3), under: randOdds(1.6, 2.3) },
      handicap: { line: Math.round((rand() * 3) * 2) / 2 * (rand() > 0.5 ? 1 : -1), home: randOdds(1.7, 2.1), away: randOdds(1.7, 2.1) },
    });
  }
  return events;
}

const GAME_NAMES = [
  'Comet Riches', 'Solar Fortune', 'Neon Reels', 'Vault Breaker', 'Midnight Jaguar', 'Frost Vault', 'Golden Serpent',
  'Skyfall Riches', 'Aurora Nights', 'Diamond Cascade', 'Rogue Pirates', 'Crystal Kingdom', 'Wild Prospector', 'Lucky Nova',
  'Emberstone', 'Starship Loot', 'Jade Temple', 'Phoenix Ascend', 'Thunder Reel', 'Velvet Fortune', 'Rocket Multiplier',
  'Crash Nova x100', 'Astro Crash', 'Meteor Multiplier', 'Blackjack Elite', 'Speed Blackjack', 'VIP Blackjack Lounge',
  'European Roulette Gold', 'Lightning Roulette Live', 'Auto Roulette', 'Baccarat Squeeze', 'Speed Baccarat',
  'Texas Hold\'em Pro', 'Caribbean Poker', 'Live Dealer Studio A', 'Live Dealer Studio B', 'Immersive Roulette',
  'Dragon Baccarat', 'Fortune Blackjack', 'Poker Royale', 'Nova Crash', 'Rocket Runner', 'Multiplier Mayhem',
  'Sunset Reels', 'Bounty Hunter Slots', 'Treasure Abyss', 'Wild West Nova', 'Ice Kingdom Slots', 'Gemstone Rush',
  'Royal Flush Poker', 'Infinity Wheel',
];

const CATEGORIES: CasinoGame['category'][] = ['Slots', 'Live Casino', 'Roulette', 'Blackjack', 'Baccarat', 'Poker', 'Crash Games'];
const PROVIDERS: CasinoGame['provider'][] = ['Nova Evolve', 'Prime Studio', 'Skyline Games', 'NetVegas', 'Playtower'];
const CARD_COLORS = ['from-violet-600 to-fuchsia-600', 'from-lime-500 to-emerald-600', 'from-amber-500 to-orange-600', 'from-sky-500 to-blue-600', 'from-rose-500 to-red-600', 'from-teal-400 to-cyan-600'];

export function generateCasinoGames(count: number): CasinoGame[] {
  const games: CasinoGame[] = [];
  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    games.push({
      id: id('GAME', i + 1),
      name: GAME_NAMES[i % GAME_NAMES.length] + (i >= GAME_NAMES.length ? ` ${Math.floor(i / GAME_NAMES.length) + 1}` : ''),
      category,
      provider: pick(PROVIDERS),
      rtp: Math.round((94 + rand() * 4.5) * 10) / 10,
      hot: rand() < 0.22,
      isNew: rand() < 0.15,
      color: CARD_COLORS[i % CARD_COLORS.length],
    });
  }
  return games;
}

const FIRST_NAMES = ['Alex', 'Jordan', 'Sam', 'Riley', 'Taylor', 'Morgan', 'Casey', 'Jamie', 'Drew', 'Reese', 'Quinn', 'Rowan', 'Avery', 'Skyler', 'Devon'];
const LAST_NAMES = ['Carter', 'Nguyen', 'Patel', 'Kowalski', 'Silva', 'Okafor', 'Larsson', 'Ivanov', 'Rossi', 'Kimura', 'Haddad', 'Novak'];
const COUNTRIES = ['IN', 'BR', 'NG', 'PH', 'DE', 'PL', 'ZA', 'MX', 'ID', 'KE', 'GB', 'CA'];

export function generateUsers(count: number): UserAccount[] {
  const users: UserAccount[] = [];
  for (let i = 0; i < count; i++) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const joined = new Date(Date.now() - randInt(1, 700) * 86400000);
    users.push({
      id: id('USR', i + 1),
      username: `${first}${last}${randInt(10, 99)}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@mail.demo`,
      country: pick(COUNTRIES),
      balance: Math.round(rand() * 5000 * 100) / 100,
      bonusBalance: Math.round(rand() * 400 * 100) / 100,
      kyc: pick(['Verified', 'Verified', 'Verified', 'Pending', 'Unverified']),
      joined: joined.toISOString(),
      vipTier: pick(['Bronze', 'Bronze', 'Silver', 'Silver', 'Gold', 'Platinum']),
      status: rand() < 0.05 ? 'Suspended' : 'Active',
    });
  }
  return users;
}

const TX_METHODS: Transaction['method'][] = ['Card', 'Bank Transfer', 'UPI', 'Crypto'];
export function generateTransactions(count: number, users: UserAccount[]): Transaction[] {
  const txs: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    const type = pick<Transaction['type']>(['Deposit', 'Withdrawal', 'Bet', 'Win', 'Bonus']);
    const date = new Date(Date.now() - randInt(0, 60) * 86400000 - randInt(0, 86000) * 1000);
    txs.push({
      id: id('TXN', i + 1),
      userId: pick(users).id,
      type,
      method: type === 'Bet' || type === 'Win' || type === 'Bonus' ? 'System' : pick(TX_METHODS),
      amount: Math.round((10 + rand() * 990) * 100) / 100,
      status: pick(['Completed', 'Completed', 'Completed', 'Pending', 'Failed']),
      date: date.toISOString(),
    });
  }
  return txs.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

const MARKETS = ['Match Winner (1X2)', 'Over/Under 2.5', 'Asian Handicap', 'Both Teams to Score', 'Correct Score', 'Total Points'];
export function generateBets(count: number, users: UserAccount[], events: SportEvent[]): Bet[] {
  const bets: Bet[] = [];
  for (let i = 0; i < count; i++) {
    const ev = pick(events);
    const odds = randOdds(1.3, 6.5);
    const stake = Math.round((5 + rand() * 195) * 100) / 100;
    const status = pick<Bet['status']>(['Open', 'Won', 'Lost', 'Lost', 'Won', 'Cashed Out']);
    bets.push({
      id: id('BET', i + 1),
      userId: pick(users).id,
      eventName: `${ev.home.name} vs ${ev.away.name}`,
      market: pick(MARKETS),
      selection: pick([ev.home.name, ev.away.name, 'Draw', 'Over', 'Under']),
      odds,
      stake,
      status,
      potentialReturn: Math.round(stake * odds * 100) / 100,
      date: new Date(Date.now() - randInt(0, 30) * 86400000).toISOString(),
    });
  }
  return bets.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function generatePromotions(): Promotion[] {
  return [
    { id: 'PROMO-01', title: '100% Welcome Bonus up to ₹20,000', category: 'Welcome', description: 'New players get a matched deposit bonus on their first deposit, credited instantly to the bonus wallet.', terms: '20x wagering requirement. Valid for 7 days. Demo bonus only.', badge: 'New Player' },
    { id: 'PROMO-02', title: '₹500 Free Bet Every Friday', category: 'Free Bet', description: 'Place a qualifying bet of ₹500+ on any football match and receive a free bet token.', terms: 'Minimum odds 1.80. One per account per week.', badge: 'Weekly' },
    { id: 'PROMO-03', title: '10% Weekly Cashback', category: 'Cashback', description: 'Get 10% of net losses back as bonus credit every Monday, up to ₹5,000.', terms: 'Applies to sportsbook and casino losses combined.', badge: 'Auto Credit' },
    { id: 'PROMO-04', title: 'Platinum VIP Rewards Club', category: 'VIP', description: 'Unlock personal account managers, faster mock withdrawals, and exclusive event tickets as you climb VIP tiers.', terms: 'Tier based on monthly turnover. Demo simulation only.', badge: 'Invite Only' },
    { id: 'PROMO-05', title: 'Refer a Friend — ₹1,000 Bonus', category: 'Referral', description: 'Invite friends to BetNova Pro and earn ₹1,000 in bonus credit when they place their first bet.', terms: 'Referred friend must complete mock KYC.', badge: 'Unlimited' },
    { id: 'PROMO-06', title: '50 Free Spins on Comet Riches', category: 'Free Spins', description: 'Claim 50 free spins on our featured slot title, no deposit required.', terms: 'Winnings capped at ₹2,000. 35x wagering.', badge: 'No Deposit' },
    { id: 'PROMO-07', title: 'Acca Insurance — Money Back on 5 Folds', category: 'Free Bet', description: 'If one leg of your 5+ fold accumulator lets you down, get your stake back as a free bet.', terms: 'Max refund ₹2,500. All legs must have odds 1.20+.', badge: 'Accumulator' },
    { id: 'PROMO-08', title: 'Live Casino Cashback Tuesdays', category: 'Cashback', description: 'Every Tuesday, receive 15% cashback on live dealer table losses.', terms: 'Minimum ₹1,000 turnover required. Credited within 24 hours.', badge: 'Live Casino' },
    { id: 'PROMO-09', title: 'Reload Bonus — 50% up to ₹10,000', category: 'Welcome', description: 'Existing players can claim a 50% reload bonus on any deposit made over the weekend.', terms: '15x wagering. Available Saturday–Sunday.', badge: 'Weekend' },
    { id: 'PROMO-10', title: 'Gold Tier Birthday Spins', category: 'VIP', description: 'Gold and Platinum members receive 100 free spins automatically on their account anniversary.', terms: 'Automatically credited. Demo simulation only.', badge: 'Automatic' },
  ];
}

export const USERS = generateUsers(100);
export const EVENTS = generateEvents(200);
export const CASINO_GAMES = generateCasinoGames(50);
export const TRANSACTIONS = generateTransactions(100, USERS);
export const BETS = generateBets(300, USERS, EVENTS);
export const PROMOTIONS = generatePromotions();

export const CURRENT_USER: UserAccount = {
  ...USERS[0],
  username: 'DemoPlayer_01',
  balance: 12480.5,
  bonusBalance: 620,
  kyc: 'Verified',
  vipTier: 'Gold',
};
