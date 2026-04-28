'use client';
import { useState } from 'react';
import {
  Shield, User, Lock, Eye, EyeOff, LayoutDashboard, FileText, Users,
  IndianRupee, LogOut, Plus, Search, Download, Printer, ChevronRight,
  TrendingUp, CheckCircle2, Clock, AlertCircle, Filter, Phone, Mail,
  Globe, MapPin, Car, Bike, Calendar, FileCheck, ArrowUpRight, X,
  Menu
} from 'lucide-react';

// Sample seed data
const seedCertificates = [
  {
    id: 'MA202512011008', customerName: 'ANKUR SALUNKHE', mobile: '9325138589',
    vehicleType: 'Two Wheeler', makeModel: 'HONDA CB350RS', engineNo: 'NC58EA3025933',
    startDate: '2025-12-01', endDate: '2026-11-30', amount: 1500, status: 'approved',
    agent: 'kolhapur_01', createdAt: '2025-12-01'
  },
  {
    id: 'MA202511281007', customerName: 'PRIYA DESAI', mobile: '9823456712',
    vehicleType: 'Four Wheeler', makeModel: 'MARUTI SWIFT VXI', engineNo: 'K12MH2847102',
    startDate: '2025-11-28', endDate: '2026-11-27', amount: 1800, status: 'approved',
    agent: 'pune_03', createdAt: '2025-11-28'
  },
  {
    id: 'MA202511251006', customerName: 'RAHUL JADHAV', mobile: '9876543210',
    vehicleType: 'Two Wheeler', makeModel: 'ROYAL ENFIELD CLASSIC 350', engineNo: 'RE350MH9921',
    startDate: '2025-11-25', endDate: '2026-11-24', amount: 1500, status: 'pending',
    agent: 'kolhapur_01', createdAt: '2025-11-25'
  },
  {
    id: 'MA202511221005', customerName: 'MEERA PATIL', mobile: '9912345678',
    vehicleType: 'Four Wheeler', makeModel: 'HYUNDAI CRETA SX', engineNo: 'HY2024CR8812',
    startDate: '2025-11-22', endDate: '2026-11-21', amount: 2200, status: 'approved',
    agent: 'mumbai_02', createdAt: '2025-11-22'
  },
  {
    id: 'MA202511201004', customerName: 'VIKRAM SHINDE', mobile: '9988776655',
    vehicleType: 'Two Wheeler', makeModel: 'BAJAJ PULSAR NS200', engineNo: 'BJP200NS7722',
    startDate: '2025-11-20', endDate: '2026-11-19', amount: 1200, status: 'approved',
    agent: 'pune_03', createdAt: '2025-11-20'
  },
];

const seedUsers = [
  { id: 'kolhapur_01', name: 'Rajesh Kulkarni', location: 'Kolhapur', role: 'Dealer', certs: 47, prices: [1200, 1500, 1800] },
  { id: 'pune_03', name: 'Sneha Kamble', location: 'Pune', role: 'Agent', certs: 62, prices: [1500, 1800, 2200] },
  { id: 'mumbai_02', name: 'Arjun Mehta', location: 'Mumbai', role: 'Dealer', certs: 38, prices: [1800, 2200, 2500] },
  { id: 'nashik_04', name: 'Deepa Shah', location: 'Nashik', role: 'Agent', certs: 29, prices: [1200, 1500] },
];

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
`;

export default function App() {
  const [screen, setScreen] = useState('login'); // login | admin | agent | createCert | certPreview
  const [role, setRole] = useState(null); // 'admin' | 'agent'
  const [adminTab, setAdminTab] = useState('dashboard'); // dashboard | certificates | users | pricing
  const [agentTab, setAgentTab] = useState('mycerts');
  const [certificates, setCertificates] = useState(seedCertificates);
  const [activeCert, setActiveCert] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setScreen(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
    setScreen('login');
    setAdminTab('dashboard');
    setAgentTab('mycerts');
  };

  return (
    <>
      <style>{fonts}</style>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="min-h-screen bg-stone-50 text-slate-900">
        {screen === 'login' && <LoginScreen onLogin={handleLogin} />}
        {screen === 'admin' && (
          <AdminPanel
            tab={adminTab} setTab={setAdminTab}
            certificates={certificates} setCertificates={setCertificates}
            onLogout={handleLogout}
            onViewCert={(c) => { setActiveCert(c); setScreen('certPreview'); }}
            sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
          />
        )}
        {screen === 'agent' && (
          <AgentPanel
            tab={agentTab} setTab={setAgentTab}
            certificates={certificates.filter(c => c.agent === 'kolhapur_01')}
            onCreateNew={() => setScreen('createCert')}
            onLogout={handleLogout}
            onViewCert={(c) => { setActiveCert(c); setScreen('certPreview'); }}
            sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
          />
        )}
        {screen === 'createCert' && (
          <CreateCertificate
            onBack={() => setScreen('agent')}
            onSubmit={(newCert) => {
              setCertificates([newCert, ...certificates]);
              setActiveCert(newCert);
              setScreen('certPreview');
            }}
          />
        )}
        {screen === 'certPreview' && activeCert && (
          <CertificatePreview
            cert={activeCert}
            onBack={() => setScreen(role)}
          />
        )}
      </div>
    </>
  );
}

// ============================================================
// LOGIN SCREEN
// ============================================================
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin');

  return (
    <div className="min-h-screen flex">
      {/* Left side — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2744 60%, #0a1628 100%)' }}>
        {/* decorative grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        {/* amber glow */}
        <div className="absolute top-20 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: '#f59e0b' }} />
        <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#dc2626' }} />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)' }}>
              <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight">MitraAssist</div>
              <div className="text-xs text-amber-200/70 tracking-[0.2em] uppercase">Service Certificate Portal</div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              System operational — 4,847 certificates issued this month
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-6xl leading-[1.05] tracking-tight mb-4">
              Protection for <em className="text-amber-300">every mile</em>.
            </h1>
            <p className="text-stone-300 text-lg max-w-md leading-relaxed">
              Issue, manage, and track road-side assistance certificates across your dealer network — all from one secure portal.
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm text-stone-400">
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs uppercase tracking-wider">Toll-free support</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <div className="text-2xl font-bold text-white">180+</div>
              <div className="text-xs uppercase tracking-wider">Partner dealers</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-xs uppercase tracking-wider">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)' }}>
              <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight">MitraAssist</div>
              <div className="text-xs text-stone-500 tracking-[0.15em] uppercase">Certificate Portal</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl tracking-tight mb-2">Welcome back.</h2>
            <p className="text-stone-500">Sign in to manage your service certificates.</p>
          </div>

          {/* Role toggle */}
          <div className="flex gap-2 p-1 bg-stone-100 rounded-lg mb-6">
            {[
              { v: 'admin', label: 'Admin' },
              { v: 'agent', label: 'Dealer / Agent' },
            ].map(opt => (
              <button
                key={opt.v}
                onClick={() => setSelectedRole(opt.v)}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                  selectedRole === opt.v
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-stone-500 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-stone-500 mb-2">User ID</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={selectedRole === 'admin' ? 'admin@mitraassist' : 'kolhapur_01'}
                  className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-500">Password</label>
                <button className="text-xs text-slate-900 hover:underline font-medium">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-slate-900"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => onLogin(selectedRole)}
              className="w-full py-3.5 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-[0.99]"
              style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2744 100%)' }}
            >
              Sign in as {selectedRole === 'admin' ? 'Admin' : 'Dealer / Agent'}
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 py-3">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400 uppercase tracking-wider">Secured by</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-stone-500">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />256-bit SSL</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />OTP enabled</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" />RBAC</span>
            </div>
          </div>

          <p className="text-center text-xs text-stone-400 mt-10">
            SWR Solutions Private Limited · Kolhapur, Maharashtra · © 2026
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SIDEBAR LAYOUT (shared shell)
// ============================================================
function Sidebar({ items, activeTab, setTab, userName, userRole, onLogout, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-20" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)' }}>
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-bold tracking-tight">MitraAssist</div>
              <div className="text-[10px] text-stone-400 tracking-[0.2em] uppercase">Portal v2.4</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {items.map(item => (
            <button
              key={item.key}
              onClick={() => { setTab(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === item.key
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.badge && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-900 font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-lg mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center font-bold text-sm">
              {userName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{userName}</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider">{userRole}</div>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-stone-400 hover:text-white hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

function TopBar({ title, subtitle, action, onToggleSidebar }) {
  return (
    <div className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-stone-200 bg-white">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 -ml-2">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl tracking-tight leading-none">{title}</h1>
          {subtitle && <p className="text-sm text-stone-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

// ============================================================
// ADMIN PANEL
// ============================================================
function AdminPanel({ tab, setTab, certificates, setCertificates, onLogout, onViewCert, sidebarOpen, setSidebarOpen }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'certificates', label: 'Certificates', icon: FileText, badge: certificates.filter(c => c.status === 'pending').length || null },
    { key: 'users', label: 'Users & Roles', icon: Users },
    { key: 'pricing', label: 'Pricing Rules', icon: IndianRupee },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={items} activeTab={tab} setTab={setTab}
        userName="Management" userRole="Admin"
        onLogout={onLogout}
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 min-w-0">
        {tab === 'dashboard' && <AdminDashboard certificates={certificates} onToggleSidebar={() => setSidebarOpen(true)} onViewCert={onViewCert} />}
        {tab === 'certificates' && <AdminCertificates certificates={certificates} setCertificates={setCertificates} onToggleSidebar={() => setSidebarOpen(true)} onViewCert={onViewCert} />}
        {tab === 'users' && <AdminUsers onToggleSidebar={() => setSidebarOpen(true)} />}
        {tab === 'pricing' && <AdminPricing onToggleSidebar={() => setSidebarOpen(true)} />}
      </main>
    </div>
  );
}

function AdminDashboard({ certificates, onToggleSidebar, onViewCert }) {
  const total = certificates.length;
  const approved = certificates.filter(c => c.status === 'approved').length;
  const pending = certificates.filter(c => c.status === 'pending').length;
  const revenue = certificates.filter(c => c.status === 'approved').reduce((s, c) => s + c.amount, 0);

  const stats = [
    { label: 'Total Certificates', value: total.toLocaleString(), trend: '+12%', icon: FileText, accent: 'bg-slate-900' },
    { label: 'Approved', value: approved.toLocaleString(), trend: '+8%', icon: CheckCircle2, accent: 'bg-emerald-600' },
    { label: 'Pending Review', value: pending.toLocaleString(), trend: '—', icon: Clock, accent: 'bg-amber-500' },
    { label: 'Revenue (MTD)', value: `₹${(revenue / 1000).toFixed(1)}k`, trend: '+18%', icon: IndianRupee, accent: 'bg-red-600' },
  ];

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Overview of certificate operations across your network"
        onToggleSidebar={onToggleSidebar}
        action={
          <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 px-3 py-2 bg-stone-100 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live · synced 2s ago
          </div>
        }
      />
      <div className="p-6 lg:p-10 space-y-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-stone-200 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.accent}`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-semibold ${s.trend.startsWith('+') ? 'text-emerald-600' : 'text-stone-400'}`}>
                  {s.trend}
                </span>
              </div>
              <div style={{ fontFamily: "'Instrument Serif', serif" }} className="text-4xl tracking-tight mb-1">{s.value}</div>
              <div className="text-xs text-stone-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent certificates */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <div>
                <h3 className="font-semibold">Recent Certificates</h3>
                <p className="text-xs text-stone-500">Last 5 issuances</p>
              </div>
              <button className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-stone-100">
              {certificates.slice(0, 5).map(c => (
                <button
                  key={c.id}
                  onClick={() => onViewCert(c)}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center">
                    {c.vehicleType === 'Two Wheeler' ? <Bike className="w-4 h-4 text-stone-600" /> : <Car className="w-4 h-4 text-stone-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{c.customerName}</div>
                    <div className="text-xs text-stone-500 truncate">{c.makeModel} · <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{c.id}</span></div>
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="font-semibold text-sm">₹{c.amount.toLocaleString()}</div>
                    <StatusBadge status={c.status} />
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick panel */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2744 100%)' }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl" style={{ background: '#f59e0b' }} />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-4">
                  <TrendingUp className="w-3 h-3" /> This month
                </div>
                <div style={{ fontFamily: "'Instrument Serif', serif" }} className="text-5xl tracking-tight mb-1">
                  ₹{(certificates.reduce((s, c) => s + c.amount, 0) / 1000).toFixed(1)}k
                </div>
                <p className="text-stone-300 text-sm mb-6">Gross revenue from certificate issuance</p>
                <div className="h-16 flex items-end gap-1">
                  {[40, 65, 45, 80, 60, 90, 72, 85, 95, 70, 88, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{ height: `${h}%`, background: i === 11 ? '#f59e0b' : 'rgba(255,255,255,0.2)' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5">
              <h3 className="font-semibold mb-4 text-sm">Top Dealers</h3>
              <div className="space-y-3">
                {seedUsers.slice(0, 3).map((u, i) => (
                  <div key={u.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-stone-400' : 'bg-amber-700'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{u.name}</div>
                      <div className="text-xs text-stone-500">{u.location}</div>
                    </div>
                    <div className="text-sm font-semibold">{u.certs}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }) {
  const config = {
    approved: { label: 'Approved', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    pending: { label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    rejected: { label: 'Rejected', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  }[status] || { label: status, bg: 'bg-stone-100', text: 'text-stone-600', dot: 'bg-stone-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function AdminCertificates({ certificates, setCertificates, onToggleSidebar, onViewCert }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = certificates.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (search && !(c.customerName.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const updateStatus = (id, newStatus) => {
    setCertificates(certificates.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <>
      <TopBar
        title="Certificates"
        subtitle={`${filtered.length} of ${certificates.length} records`}
        onToggleSidebar={onToggleSidebar}
        action={
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800">
            <Download className="w-4 h-4" /> Export
          </button>
        }
      />
      <div className="p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or certificate number..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-slate-900 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'approved', 'pending'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
                  filter === f ? 'bg-slate-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr className="text-left text-xs uppercase tracking-wider text-stone-500">
                  <th className="px-6 py-3 font-semibold">Certificate</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold hidden md:table-cell">Vehicle</th>
                  <th className="px-6 py-3 font-semibold hidden lg:table-cell">Agent</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs font-semibold">{c.id}</div>
                      <div className="text-xs text-stone-400">{c.createdAt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{c.customerName}</div>
                      <div className="text-xs text-stone-500">{c.mobile}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="font-medium text-xs">{c.makeModel}</div>
                      <div className="text-xs text-stone-500">{c.vehicleType}</div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-xs text-stone-600">{c.agent}</td>
                    <td className="px-6 py-4 font-semibold">₹{c.amount.toLocaleString()}</td>
                    <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        {c.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(c.id, 'approved')} className="p-1.5 rounded hover:bg-emerald-50 text-emerald-600" title="Approve">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => updateStatus(c.id, 'rejected')} className="p-1.5 rounded hover:bg-red-50 text-red-600" title="Reject">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button onClick={() => onViewCert(c)} className="p-1.5 rounded hover:bg-stone-100" title="View">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminUsers({ onToggleSidebar }) {
  return (
    <>
      <TopBar
        title="Users & Roles"
        subtitle="Manage dealers, agents, and their permissions"
        onToggleSidebar={onToggleSidebar}
        action={
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800">
            <Plus className="w-4 h-4" /> New user
          </button>
        }
      />
      <div className="p-6 lg:p-10">
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr className="text-left text-xs uppercase tracking-wider text-stone-500">
                <th className="px-6 py-3 font-semibold">User</th>
                <th className="px-6 py-3 font-semibold hidden sm:table-cell">Role</th>
                <th className="px-6 py-3 font-semibold hidden md:table-cell">Location</th>
                <th className="px-6 py-3 font-semibold">Certificates</th>
                <th className="px-6 py-3 font-semibold hidden lg:table-cell">Allowed Prices</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {seedUsers.map(u => (
                <tr key={u.id} className="hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center font-bold text-white text-xs">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold">{u.name}</div>
                        <div className="text-xs text-stone-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-900 text-white">{u.role}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-stone-600">
                    <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{u.location}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold">{u.certs}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex gap-1">
                      {u.prices.map(p => (
                        <span key={p} className="text-xs px-2 py-1 rounded bg-stone-100 font-medium">₹{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-semibold text-slate-900 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AdminPricing({ onToggleSidebar }) {
  return (
    <>
      <TopBar
        title="Pricing Rules"
        subtitle="Control which certificate prices each user can select"
        onToggleSidebar={onToggleSidebar}
      />
      <div className="p-6 lg:p-10">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 lg:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div>
              <h3 className="font-semibold mb-1">Default Price Tiers</h3>
              <p className="text-sm text-stone-500">Available price points across the platform</p>
            </div>
            <div className="sm:ml-auto flex gap-2">
              {[1200, 1500, 1800, 2200, 2500].map(p => (
                <div key={p} className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-sm font-semibold">₹{p}</div>
              ))}
            </div>
          </div>
          <div className="text-xs text-stone-500 p-3 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Dealers can only select from prices assigned to them. They cannot enter custom amounts.</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100">
            <h3 className="font-semibold">Per-User Assignments</h3>
          </div>
          <div className="divide-y divide-stone-100">
            {seedUsers.map(u => (
              <div key={u.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center font-bold text-white text-xs">
                    {u.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{u.name}</div>
                    <div className="text-xs text-stone-500">{u.location}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[1200, 1500, 1800, 2200, 2500].map(p => {
                    const active = u.prices.includes(p);
                    return (
                      <button key={p} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        active ? 'bg-slate-900 text-white' : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                      }`}>
                        ₹{p}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// AGENT PANEL
// ============================================================
function AgentPanel({ tab, setTab, certificates, onCreateNew, onLogout, onViewCert, sidebarOpen, setSidebarOpen }) {
  const items = [
    { key: 'mycerts', label: 'My Certificates', icon: FileText },
    { key: 'create', label: 'Create New', icon: Plus },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={items}
        activeTab={tab}
        setTab={(k) => { if (k === 'create') onCreateNew(); else setTab(k); }}
        userName="Rajesh Kulkarni" userRole="Dealer · Kolhapur"
        onLogout={onLogout}
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 min-w-0">
        <TopBar
          title="My Certificates"
          subtitle={`${certificates.length} certificates issued · ₹${certificates.reduce((s, c) => s + c.amount, 0).toLocaleString()} in revenue`}
          onToggleSidebar={() => setSidebarOpen(true)}
          action={
            <button
              onClick={onCreateNew}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)' }}
            >
              <Plus className="w-4 h-4" /> New certificate
            </button>
          }
        />
        <div className="p-6 lg:p-10">
          {certificates.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
              <FileText className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">No certificates yet</h3>
              <p className="text-sm text-stone-500 mb-5">Create your first certificate to get started.</p>
              <button onClick={onCreateNew} className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold">
                Create certificate
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {certificates.map(c => (
                <button
                  key={c.id}
                  onClick={() => onViewCert(c)}
                  className="bg-white rounded-2xl border border-stone-200 p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                      {c.vehicleType === 'Two Wheeler' ? <Bike className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[10px] text-stone-400 mb-1">{c.id}</div>
                  <div className="font-semibold mb-0.5">{c.customerName}</div>
                  <div className="text-xs text-stone-500 mb-4">{c.makeModel}</div>
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div className="text-xs text-stone-500">Valid till {c.endDate}</div>
                    <div className="font-bold">₹{c.amount.toLocaleString()}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// CREATE CERTIFICATE
// ============================================================
function CreateCertificate({ onBack, onSubmit }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    customerName: '', dob: '', mobile: '', email: '', address: '',
    vehicleType: 'Two Wheeler', regNo: 'New', makeModel: '', variant: '',
    engineNo: '', chassisNo: '', fuelType: 'Petrol', year: '2025',
    startDate: '', endDate: '', amount: 1500
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const allowedPrices = [1200, 1500, 1800];

  const handleSubmit = () => {
    const newCert = {
      id: 'MA' + new Date().getFullYear() + String(Math.floor(Math.random() * 90000) + 10000),
      ...form,
      status: 'pending',
      agent: 'kolhapur_01',
      createdAt: new Date().toISOString().split('T')[0],
    };
    onSubmit(newCert);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200 px-6 lg:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-lg">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl leading-none tracking-tight">New Certificate</h1>
            <p className="text-xs text-stone-500 mt-1">Step {step} of 3</p>
          </div>
        </div>
        <div className="hidden sm:flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-8 h-1 rounded-full transition-all ${
              i <= step ? 'bg-slate-900' : 'bg-stone-200'
            }`} />
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 lg:p-10">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-2xl mb-1">Customer details</h2>
              <p className="text-sm text-stone-500">Who is this certificate for?</p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
              <Field label="Full name" value={form.customerName} onChange={(v) => update('customerName', v)} placeholder="ANKUR SALUNKHE" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Date of birth" type="date" value={form.dob} onChange={(v) => update('dob', v)} />
                <Field label="Mobile number" value={form.mobile} onChange={(v) => update('mobile', v)} placeholder="9325138589" />
              </div>
              <Field label="Email" value={form.email} onChange={(v) => update('email', v)} placeholder="customer@example.com" />
              <Field label="Address" value={form.address} onChange={(v) => update('address', v)} placeholder="Full postal address" textarea />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-2xl mb-1">Vehicle information</h2>
              <p className="text-sm text-stone-500">Details of the vehicle being insured</p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-500 mb-2">Vehicle type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Two Wheeler', 'Four Wheeler'].map(v => (
                    <button
                      key={v}
                      onClick={() => update('vehicleType', v)}
                      className={`p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                        form.vehicleType === v ? 'border-slate-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {v === 'Two Wheeler' ? <Bike className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                      <span className="font-semibold text-sm">{v}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Registration no" value={form.regNo} onChange={(v) => update('regNo', v)} placeholder="MH09 AB 1234 or 'New'" />
                <Field label="Make & Model" value={form.makeModel} onChange={(v) => update('makeModel', v)} placeholder="HONDA CB350RS" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Variant" value={form.variant} onChange={(v) => update('variant', v)} placeholder="DLX PRO DUAL TONE" />
                <Field label="Manufacturing year" value={form.year} onChange={(v) => update('year', v)} placeholder="2025" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Engine no" value={form.engineNo} onChange={(v) => update('engineNo', v)} placeholder="NC58EA3025933" />
                <Field label="Chassis no" value={form.chassisNo} onChange={(v) => update('chassisNo', v)} placeholder="ME4NC681JSA006238" />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-500 mb-2">Fuel type</label>
                <div className="flex gap-2">
                  {['Petrol', 'Diesel', 'Electric', 'CNG'].map(f => (
                    <button
                      key={f}
                      onClick={() => update('fuelType', f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        form.fuelType === f ? 'bg-slate-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-2xl mb-1">Plan & pricing</h2>
              <p className="text-sm text-stone-500">Select the coverage period and premium</p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Start date" type="date" value={form.startDate} onChange={(v) => update('startDate', v)} />
                <Field label="End date" type="date" value={form.endDate} onChange={(v) => update('endDate', v)} />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-500 mb-2">Premium amount</label>
                <div className="grid grid-cols-3 gap-2">
                  {allowedPrices.map(p => (
                    <button
                      key={p}
                      onClick={() => update('amount', p)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        form.amount === p ? 'border-slate-900 bg-slate-900 text-white' : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div style={{ fontFamily: "'Instrument Serif', serif" }} className="text-2xl">₹{p}</div>
                      <div className="text-[10px] uppercase tracking-wider opacity-70 mt-1">
                        GST incl.
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-2">Your admin has assigned these price tiers to you</p>
              </div>
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-stone-500">Base premium</span>
                  <span>₹{(form.amount * 0.82).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-stone-500">GST @ 18%</span>
                  <span>₹{(form.amount * 0.18).toFixed(0)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-stone-200 pt-3">
                  <span>Total</span>
                  <span>₹{form.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="px-5 py-2.5 rounded-lg border border-stone-300 text-sm font-semibold hover:bg-white">
              Back
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
            className="flex-1 sm:flex-initial ml-auto px-6 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 flex items-center justify-center gap-2"
          >
            {step < 3 ? 'Continue' : 'Generate certificate'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', textarea = false }) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-wider uppercase text-stone-500 mb-2">{label}</label>
      {textarea ? (
        <textarea
          value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} rows={3}
          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-slate-900 text-sm"
        />
      ) : (
        <input
          type={type}
          value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-slate-900 text-sm"
        />
      )}
    </div>
  );
}

// ============================================================
// CERTIFICATE PREVIEW (styled like the real PDF)
// ============================================================
function CertificatePreview({ cert, onBack }) {
  return (
    <div className="min-h-screen bg-stone-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto mb-4 flex flex-wrap items-center gap-3 justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold bg-white px-4 py-2 rounded-lg border border-stone-300 hover:bg-stone-50">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back
        </button>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-sm font-semibold bg-white px-4 py-2 rounded-lg border border-stone-300 hover:bg-stone-50">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div className="p-8 border-b-2 border-slate-900 flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)' }}>
              <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-bold text-2xl tracking-tight">MitraAssist</div>
              <div className="text-[10px] text-stone-500 tracking-[0.15em] uppercase">Protection for every mile</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">Tax Invoice cum Certificate</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="font-bold text-lg">{cert.id}</div>
          </div>
        </div>

        {/* Issuer */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-stone-200">
          <div className="p-6 border-b md:border-b-0 md:border-r border-stone-200">
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-2">Certificate issuer & servicing office</div>
            <div className="font-semibold">SWR SOLUTIONS PRIVATE LIMITED</div>
            <div className="text-xs text-stone-600 mt-1">297/2, Tal- Karveer, Kolhapur RS,<br />Kolhapur, Karvir, Maharashtra 416001</div>
          </div>
          <div className="p-6">
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-2">Road-side assistance</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-stone-400" />Toll free: <span className="font-semibold">9307187878</span></div>
              <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-stone-400" />Care@Mitraassist.com</div>
              <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-stone-400" />Mitraassist.com</div>
            </div>
          </div>
        </div>

        {/* Customer + period */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-stone-200">
          <InfoBox label="Holder name" value={cert.customerName} />
          <InfoBox label="Mobile" value={cert.mobile} />
          <InfoBox label="Start date" value={cert.startDate} />
          <InfoBox label="End date" value={cert.endDate} />
        </div>

        {/* Vehicle */}
        <div className="bg-stone-50 px-6 py-2 text-center text-xs font-semibold uppercase tracking-wider">Vehicle Details</div>
        <div className="grid grid-cols-2 md:grid-cols-3 border-b border-stone-200">
          <InfoBox label="Registration no" value={cert.regNo || 'New'} />
          <InfoBox label="Vehicle type" value={cert.vehicleType} />
          <InfoBox label="Make & Model" value={cert.makeModel} />
          <InfoBox label="Engine no" value={cert.engineNo} mono />
          <InfoBox label="Chassis no" value={cert.chassisNo || '—'} mono />
          <InfoBox label="Fuel type" value={cert.fuelType || 'Petrol'} />
        </div>

        {/* Coverages */}
        <div className="bg-stone-50 px-6 py-2 text-center text-xs font-semibold uppercase tracking-wider">Coverages of Road-side Assistance</div>
        <div className="px-6 py-4">
          {[
            ['Battery check-up & jump start', 'Technician arranged for jumpstart'],
            ['Flat tyre', 'Technician arranged; repair cost on actuals'],
            ['Fuel arrangement assistance', 'Fuel delivery; fuel cost on actuals'],
            ['Relay of urgent messages', 'Message passed to rider\'s family'],
            ['Vehicle breakdown phone support', 'Technical guidance over phone'],
            ['Towing assistance', 'To and fro up to 15 km from breakdown spot'],
          ].map(([title, desc], i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-stone-100 last:border-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs text-stone-500">{desc}</div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">YES</span>
            </div>
          ))}
        </div>

        {/* Premium breakup */}
        <div className="bg-slate-900 text-white p-6">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber-300 mb-3">RSA Premium Breakup</div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-[10px] text-stone-400 uppercase">Plan</div>
              <div className="font-semibold mt-1">MitraAssist</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 uppercase">Base amount</div>
              <div className="font-semibold mt-1">₹{(cert.amount * 0.82).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 uppercase">GST @ 18%</div>
              <div className="font-semibold mt-1">₹{(cert.amount * 0.18).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-[10px] text-amber-300 uppercase">Total premium</div>
              <div style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl mt-0 leading-none">₹{cert.amount}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-[10px] text-stone-500 leading-relaxed">
          <strong>Special conditions (applicable to all coverages):</strong> (a) All additional expenses regarding replacement of a part, additional fuel and any other service which does not form a part of the standard services provided would be on chargeable basis to the certificate holder. (b) This certificate is valid subject to realisation of the payment and is effective from the payment realisation date or certificate issue date, whichever is later.
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value, mono }) {
  return (
    <div className="p-4 border-r border-b border-stone-200 last:border-r-0">
      <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-sm font-semibold ${mono ? '' : ''}`} style={mono ? { fontFamily: "'JetBrains Mono', monospace" } : {}}>{value || '—'}</div>
    </div>
  );
}
