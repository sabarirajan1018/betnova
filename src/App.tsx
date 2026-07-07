import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BetSlipProvider } from './context/BetSlipContext';
import Landing from './pages/Landing';
import Sportsbook from './pages/Sportsbook';
import LiveBetting from './pages/LiveBetting';
import Casino from './pages/Casino';
import Dashboard from './pages/Dashboard';
import WalletPage from './pages/Wallet';
import Promotions from './pages/Promotions';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <BetSlipProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sportsbook" element={<Sportsbook />} />
          <Route path="/live" element={<LiveBetting />} />
          <Route path="/casino" element={<Casino />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BetSlipProvider>
    </BrowserRouter>
  );
}
