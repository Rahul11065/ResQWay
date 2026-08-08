import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Ambulance, Siren, Heart, Clock, ArrowRight, Bell, AlertTriangle, Radio, Building2 } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { setTab, ambulance, hospital, selectedRoute, signals, isActive, progressPercent } = useEmergency();

  // Helper for ambulance map interpolation in preview
  const ambX = 10 + (progressPercent / 100) * 80;
  const ambY = 70 - (progressPercent / 100) * 40;

  // Helper for live real-time alert timestamps
  const getAlertTimeStr = (minutesAgo: number) => {
    const d = new Date(Date.now() - minutesAgo * 60 * 1000);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="space-y-6">
      
      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Ambulances */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <p className="text-xs font-semibold text-slate-500">Active Ambulances</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">12</h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">On Duty</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Ambulance className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Emergencies Today */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs">
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
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs">
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
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs">
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

      {/* Main Grid: Live Map Overview & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Map Overview */}
        <div className="lg:col-span-2 white-card p-5 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Live Map Overview</h2>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Real-time GPS Active
            </span>
          </div>

          {/* Embedded Map Canvas Dark Card */}
          <div className="relative w-full aspect-[16/9] dark-map-card rounded-xl overflow-hidden bg-grid-pattern-dark">
            <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
              <defs>
                <radialGradient id="dashGreenGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid Roads */}
              <path d="M 50 350 L 750 350 M 50 120 L 750 120 M 150 50 L 150 400 M 400 50 L 400 400 M 650 50 L 650 400" stroke="#1e293b" strokeWidth="3" strokeDasharray="5 5" />

              {/* Route Line */}
              <path d="M 100 350 L 220 280 L 400 240 L 580 180 L 700 120" fill="none" stroke="#10b981" strokeWidth="7" strokeLinecap="round" className="glow-green-corridor" />
              <path d="M 400 240 L 580 180" fill="none" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" />

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
                <circle cx="0" cy="0" r="22" fill="url(#dashGreenGlow)" />
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

            {/* View Live Tracking Action Button matching image bottom right */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => setTab('tracking')}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <span>View Live Tracking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Recent Alerts */}
        <div className="white-card p-5 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              Recent Alerts
            </h2>
            <button
              onClick={() => setTab('alerts')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px] pr-1">
            
            {/* Alert 1 */}
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-500 text-white shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">Critical Emergency</p>
                  <span className="text-[10px] text-slate-400 font-mono">{getAlertTimeStr(2)}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">Ambulance {ambulance.id} dispatched</p>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">High Traffic Alert</p>
                  <span className="text-[10px] text-slate-400 font-mono">{getAlertTimeStr(5)}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">On EM Bypass, Kolkata</p>
              </div>
            </div>

            {/* Alert 3 */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500 text-white shrink-0 mt-0.5">
                <Radio className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">Signal Priority Activated</p>
                  <span className="text-[10px] text-slate-400 font-mono">{getAlertTimeStr(8)}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">Ambulance {ambulance.id}</p>
              </div>
            </div>

            {/* Alert 4 */}
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500 text-white shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">Hospital Alert</p>
                  <span className="text-[10px] text-slate-400 font-mono">{getAlertTimeStr(12)}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">Belle Vue Hospital prepped</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Banner Card (matching bottom banner in image) */}
      <div className="white-card p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-black text-slate-900">Next Generation Emergency Response System</h3>
          <p className="text-xs font-medium text-slate-600">
            Smart routing • Traffic optimization • Hospital coordination
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>AI Corridor Engine Active</span>
          </div>

          <button
            onClick={() => setTab('routes')}
            className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all shrink-0"
          >
            <span>Explore Route Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
