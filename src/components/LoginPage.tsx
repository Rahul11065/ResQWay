import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import type { UserRole } from '../types';
import { 
  Siren, 
  User, 
  Ambulance, 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Clock, 
  CheckCircle2, 
  Activity,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginRole, setAppViewMode, signals, progressPercent } = useEmergency();
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginRole(selectedRole, undefined, email || undefined);
  };

  const getRoleDetails = (role: UserRole) => {
    switch (role) {
      case 'user':
        return {
          title: 'Citizen / Patient Portal',
          desc: 'Request immediate emergency response, track live ambulance dispatch, and view regional hospital ER status.',
          defaultEmail: 'user@resqway.org',
          icon: User,
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
          btnBg: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20',
          features: [
            '1-Tap Emergency Ambulance Dispatch Request',
            'Real-Time GPS Tracking & Signal ETA Telemetry',
            'Regional ER Bed Availability & Pre-Admission'
          ]
        };
      case 'driver':
        return {
          title: 'Ambulance Paramedic Portal',
          desc: 'Vehicle GPS telemetry, real-time route optimization engine, and automated traffic light green corridor lock.',
          defaultEmail: 'driver.wb01@resqway.org',
          icon: Ambulance,
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          btnBg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20',
          features: [
            'Automatic 500m Green Corridor Signal Override',
            'Live Dynamic Traffic Re-routing Algorithm',
            'Patient Vital Telemetry Stream to ER Doctors'
          ]
        };
      case 'hospital':
        return {
          title: 'Hospital ER Command Center',
          desc: 'Belle Vue Hospital incoming ambulance pre-notification, live ETA telemetry, and ICU bed reservations.',
          defaultEmail: 'admin@bellevue.org',
          icon: Building2,
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20',
          features: [
            'Incoming Paramedic Patient Pre-Notification',
            'Trauma Bay Preparation & Blood Bank Alert',
            'ICU & Emergency Room Bed Lock System'
          ]
        };
    }
  };

  const currentRole = getRoleDetails(selectedRole);

  // Helper for map position
  const ambX = 10 + (progressPercent / 100) * 80;
  const ambY = 70 - (progressPercent / 100) * 40;

  return (
    <div className="space-y-6">
      
      {/* Top Welcome / System Status Banner Card */}
      <div className="white-card p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>ResQWay Authorization Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Intelligent Emergency Corridor Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Select your authorization role to enter the real-time green light corridor control network, hospital ER dispatch, and GPS telemetry system.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase">System Status</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ONLINE & ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards (Matching Dashboard View layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Ambulances */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs bg-white border border-slate-200">
          <div>
            <p className="text-xs font-semibold text-slate-500">Active Ambulances</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">12</h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">On Duty Telemetry</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Ambulance className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Emergencies Today */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs bg-white border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-slate-500">Emergencies Today</p>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                +15%
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-1">28</h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">Dispatched</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Siren className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Card 3: Patients Saved */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs bg-white border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-slate-500">Patients Saved</p>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                +15%
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-1">23</h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">Critical Success</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-emerald-100" />
          </div>
        </div>

        {/* Card 4: Avg. Response Time */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs bg-white border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-slate-500">Avg. Response Time</p>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                -12%
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-mono mt-1">08:42</h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">Minutes:Seconds</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Dashboard Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: High-Tech Login Card */}
        <div className="lg:col-span-7 white-card p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 bg-white border border-slate-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Sign In to Emergency Network</h2>
              <p className="text-xs text-slate-500 mt-0.5">Choose your operational role to access system controls</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          {/* 3 Role Selection Tabs */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Your Access Role
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              {(['user', 'driver', 'hospital'] as const).map((role) => {
                const isSelected = selectedRole === role;
                const Icon = role === 'user' ? User : role === 'driver' ? Ambulance : Building2;
                const label = role === 'user' ? 'User' : role === 'driver' ? 'Driver' : 'Hospital Admin';
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      setEmail(getRoleDetails(role).defaultEmail);
                    }}
                    className={`py-3 px-3 rounded-xl text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? role === 'driver'
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                          : role === 'hospital'
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                          : 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Role Info Banner matching dashboard callout */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${currentRole.badgeBg}`}>
            <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
              <currentRole.icon className="w-4 h-4 text-slate-800" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-extrabold">{currentRole.title}</p>
              <p className="text-[11px] opacity-90 leading-relaxed">{currentRole.desc}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                EMAIL ADDRESS / SYSTEM ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email || currentRole.defaultEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={currentRole.defaultEmail}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 font-mono font-medium focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  PASSWORD
                </label>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] font-semibold text-indigo-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password || '••••••••••••'}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 font-mono font-medium focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span>Keep me signed in</span>
              </label>
              <span className="flex items-center gap-1 text-emerald-600 font-mono font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Encrypted Session
              </span>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all ${currentRole.btnBg}`}
            >
              <span>Sign In as {selectedRole === 'user' ? 'Citizen User' : selectedRole === 'driver' ? 'Ambulance Driver' : 'Hospital Admin'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo Login Presets */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
              ⚡ Quick 1-Click Demo Logins
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => loginRole('user')}
                className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login User</span>
              </button>

              <button
                type="button"
                onClick={() => loginRole('driver')}
                className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Ambulance className="w-3.5 h-3.5" />
                <span>Login Driver</span>
              </button>

              <button
                type="button"
                onClick={() => loginRole('hospital')}
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Login Admin</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right 5 Cols: Dashboard Live Preview & Role Capabilities */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          
          {/* Live Map Preview Card */}
          <div className="white-card p-5 rounded-3xl space-y-3 bg-white border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                Live Corridor Telemetry
              </h3>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                GPS Active
              </span>
            </div>

            {/* Dark Map SVG Canvas */}
            <div className="relative w-full aspect-[16/10] dark-map-card rounded-2xl overflow-hidden bg-grid-pattern-dark">
              <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="dashGreenGlowLogin" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Roads */}
                <path d="M 50 350 L 750 350 M 50 120 L 750 120 M 150 50 L 150 400 M 400 50 L 400 400 M 650 50 L 650 400" stroke="#1e293b" strokeWidth="3" strokeDasharray="5 5" />

                {/* Corridor Path */}
                <path d="M 100 350 L 220 280 L 400 240 L 580 180 L 700 120" fill="none" stroke="#10b981" strokeWidth="7" strokeLinecap="round" className="glow-green-corridor" />

                {/* Signals */}
                {signals.map((sig, idx) => {
                  const cx = (idx + 1) * 160;
                  const cy = 300 - idx * 40;
                  return (
                    <g key={sig.id}>
                      <circle cx={cx} cy={cy} r="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <circle cx={cx} cy={cy} r="4" fill={sig.currentState === 'CORRIDOR_OVERRIDE' || sig.currentState === 'GREEN' ? '#10b981' : '#ef4444'} />
                    </g>
                  );
                })}

                {/* Hospital Pin */}
                <g transform="translate(700, 120)">
                  <circle cx="0" cy="0" r="22" fill="url(#dashGreenGlowLogin)" />
                  <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">H</text>
                </g>

                {/* Ambulance Marker */}
                <g transform={`translate(${ambX * 7.5}, ${ambY * 4.5})`}>
                  <circle cx="0" cy="0" r="18" fill="#ef4444" opacity="0.3" />
                  <circle cx="0" cy="0" r="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🚑</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Role Capabilities Breakdown Card */}
          <div className="white-card p-5 rounded-3xl space-y-3 bg-white border border-slate-200 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                {selectedRole === 'user' ? 'Citizen' : selectedRole === 'driver' ? 'Driver' : 'Hospital'} Capabilities Overview
              </h3>
              <ul className="space-y-2.5">
                {currentRole.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-[11px] text-indigo-900 font-medium">
              💡 Tip: Click any of the 1-Click Demo Logins above to instantly test the portal features without typing credentials!
            </div>
          </div>

        </div>

      </div>

      {/* Back to Welcome Screen Link */}
      <div className="text-center pt-2">
        <button
          onClick={() => setAppViewMode('welcome')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline transition-colors"
        >
          ← View Welcome Screen & 3s Countdown Animation
        </button>
      </div>

    </div>
  );
};
