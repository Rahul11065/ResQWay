import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  Ambulance, 
  Siren, 
  Heart, 
  Clock, 
  Activity, 
  Radio, 
  Building2, 
  AlertTriangle, 
  Droplets, 
  HeartPulse, 
  MapPin, 
  Wifi, 
  ChevronDown 
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { setTab, ambulance, signals, progressPercent } = useEmergency();

  // Helper for map position interpolation
  const ambX = 10 + (progressPercent / 100) * 80;
  const ambY = 70 - (progressPercent / 100) * 40;

  return (
    <div className="space-y-6">
      
      {/* 1. Hero Welcome Banner */}
      <div className="white-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d1b3e] via-[#102456] to-[#0a1430] text-white border border-blue-900/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40">
              <Siren className="w-8 h-8 text-blue-300 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome, Operator!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                You are now connected to the <strong className="text-white font-bold">Emergency Network Portal</strong>.
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  System Active
                </span>
                <span className="text-slate-500">|</span>
                <span className="flex items-center gap-1.5 text-blue-300">
                  <Wifi className="w-3.5 h-3.5" />
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>

          {/* Right Banner Graphic Illustration */}
          <div className="hidden md:flex items-center justify-end shrink-0">
            <div className="relative w-72 h-24 rounded-2xl bg-gradient-to-r from-blue-950/80 to-slate-900/90 border border-blue-800/50 overflow-hidden flex items-center justify-between px-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  🟢 GREEN CORRIDOR
                </span>
                <p className="text-xs font-extrabold text-white">Automated Signal Override</p>
                <p className="text-[10px] text-slate-400">GPS Telemetry Stream</p>
              </div>

              {/* Graphic Signals & Vehicle icon */}
              <div className="relative flex items-center gap-2">
                <div className="w-3 h-10 rounded-full bg-slate-950 border border-slate-700 flex flex-col items-center justify-around p-0.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500/30"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse"></div>
                </div>
                <div className="p-2 rounded-xl bg-rose-600 text-white shadow-lg animate-bounce">
                  <Ambulance className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Top 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Ambulances */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs bg-white border border-slate-200/80">
          <div>
            <p className="text-xs font-semibold text-slate-500">Active Ambulances</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">12</h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">On Duty Telemetry</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Ambulance className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Emergencies Today */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs bg-white border border-slate-200/80">
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
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Siren className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Card 3: Patients Saved */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs bg-white border border-slate-200/80">
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
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 fill-emerald-100" />
          </div>
        </div>

        {/* Card 4: Avg. Response Time */}
        <div className="white-card p-5 rounded-2xl flex items-center justify-between shadow-xs bg-white border border-slate-200/80">
          <div>
            <p className="text-xs font-semibold text-slate-500">Avg. Response Time</p>
            <h3 className="text-2xl font-black text-slate-900 font-mono mt-1">08:42</h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">Minutes</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 3. Middle Section: Live Corridor Activity & Recent Dispatches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Live Corridor Activity */}
        <div className="lg:col-span-7 white-card p-6 rounded-3xl space-y-4 bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Live Corridor Activity
            </h2>
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl cursor-pointer">
              <span>All Corridors</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            {/* Map Canvas Box (7 cols) */}
            <div className="sm:col-span-7 relative w-full aspect-[16/11] dark-map-card rounded-2xl overflow-hidden bg-grid-pattern-dark border border-slate-800 shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="dashGreenGlowMain" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Roads */}
                <path d="M 50 350 L 750 350 M 50 120 L 750 120 M 150 50 L 150 400 M 400 50 L 400 400 M 650 50 L 650 400" stroke="#1e293b" strokeWidth="3" strokeDasharray="5 5" />

                {/* Green Corridor Path */}
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
                  <circle cx="0" cy="0" r="22" fill="url(#dashGreenGlowMain)" />
                  <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">H</text>
                </g>

                {/* Ambulance Marker */}
                <g transform={`translate(${ambX * 7.5}, ${ambY * 4.5})`}>
                  <circle cx="0" cy="0" r="18" fill="#10b981" opacity="0.4" />
                  <circle cx="0" cy="0" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                  <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">🚑</text>
                </g>
              </svg>

              {/* Map Bottom Legend */}
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center justify-between text-[10px] text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Ambulance
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Traffic Signal
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Hospital
                </span>
              </div>
            </div>

            {/* Corridor Statistics Column (5 cols) */}
            <div className="sm:col-span-5 space-y-4 text-xs font-semibold text-slate-600">
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Corridors Active</span>
                  <span className="font-extrabold text-slate-900 font-mono">5 / 8</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="bg-emerald-500 h-full rounded-full w-[62.5%]"></div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    🟢
                  </div>
                  <span className="font-bold text-slate-800">Green Signals</span>
                </div>
                <span className="font-mono font-extrabold text-emerald-600 text-sm">18</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    💥
                  </div>
                  <span className="font-bold text-slate-800">Red Signals</span>
                </div>
                <span className="font-mono font-extrabold text-rose-600 text-sm">6</span>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Traffic Cleared</span>
                  <span className="font-extrabold text-indigo-600 font-mono">78%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="bg-indigo-600 h-full rounded-full w-[78%]"></div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right 5 Cols: Recent Dispatches */}
        <div className="lg:col-span-5 white-card p-6 rounded-3xl space-y-4 bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-extrabold text-slate-900">Recent Dispatches</h2>
            <button
              onClick={() => setTab('ambulance')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px] pr-1">
            {[
              { id: '#ER-2026-1287', cause: 'Cardiac Arrest • Salt Lake Sector V', status: 'Dispatched', time: '12:08 PM' },
              { id: '#ER-2026-1286', cause: 'Road Accident • VIP Road', status: 'Dispatched', time: '11:56 AM' },
              { id: '#ER-2026-1285', cause: 'Stroke • New Town', status: 'Dispatched', time: '11:42 AM' },
              { id: '#ER-2026-1284', cause: 'Trauma • Ultadanga', status: 'Dispatched', time: '11:28 AM' },
              { id: '#ER-2026-1283', cause: 'Breathing Difficulty • Park Street', status: 'Dispatched', time: '11:15 AM' },
            ].map((dispatch) => (
              <div key={dispatch.id} className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 flex items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <Siren className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 truncate">Emergency {dispatch.id}</p>
                    <p className="text-[11px] text-slate-500 truncate">{dispatch.cause}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    {dispatch.status}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">{dispatch.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Bottom 3 Panels Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Panel 1: Critical Alerts */}
        <div className="white-card p-6 rounded-3xl space-y-4 bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900">Critical Alerts</h3>
            <button onClick={() => setTab('alerts')} className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-rose-500 text-white shrink-0 mt-0.5">
                  <Siren className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">High Traffic Congestion</p>
                  <p className="text-[11px] text-slate-500">VIP Road near City Centre</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-slate-400 font-mono">12:10 PM</p>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 mt-1 inline-block">High</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Signal Malfunction</p>
                  <p className="text-[11px] text-slate-500">Sector V, Block EP</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-slate-400 font-mono">12:05 PM</p>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 mt-1 inline-block">Medium</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Hospital ER Capacity High</p>
                  <p className="text-[11px] text-slate-500">Belle Vue Hospital</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-slate-400 font-mono">12:01 PM</p>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 mt-1 inline-block">Info</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Hospitals Status */}
        <div className="white-card p-6 rounded-3xl space-y-4 bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900">Hospitals Status</h3>
            <button onClick={() => setTab('hospital')} className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Belle Vue Hospital', cap: '90%', badge: 'High', color: 'bg-rose-100 text-rose-700' },
              { name: 'AMRI Hospital', cap: '65%', badge: 'Moderate', color: 'bg-amber-100 text-amber-800' },
              { name: 'Apollo Gleneagles', cap: '40%', badge: 'Normal', color: 'bg-emerald-100 text-emerald-700' },
              { name: 'NRS Medical College', cap: '85%', badge: 'High', color: 'bg-rose-100 text-rose-700' },
            ].map((hosp, i) => (
              <div key={i} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">{hosp.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">ER Capacity {hosp.cap}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${hosp.color}`}>
                  {hosp.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Live Telemetry Feed */}
        <div className="white-card p-6 rounded-3xl space-y-4 bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900">Live Telemetry Feed</h3>
            <button onClick={() => setTab('tracking')} className="text-xs font-bold text-blue-600 hover:underline">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Dark ECG Box (7 cols) */}
            <div className="sm:col-span-7 aspect-[16/12] bg-[#070b16] rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-2">
              <svg className="w-full h-full" viewBox="0 0 300 150">
                <path
                  d="M 0 75 L 40 75 L 50 40 L 60 110 L 70 20 L 80 90 L 90 75 L 140 75 L 150 40 L 160 110 L 170 20 L 180 90 L 190 75 L 240 75 L 250 40 L 260 110 L 270 20 L 280 90 L 290 75 L 300 75"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="glow-green-corridor"
                />
              </svg>
            </div>

            {/* Vitals Telemetry Stack (5 cols) */}
            <div className="sm:col-span-5 space-y-2.5 text-xs font-semibold text-slate-700">
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Heart Rate</p>
                  <p className="text-sm font-mono font-extrabold text-slate-900">72 <span className="text-[10px] font-normal text-slate-500">bpm</span></p>
                </div>
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-emerald-100" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Oxygen Level</p>
                  <p className="text-sm font-mono font-extrabold text-slate-900">98%</p>
                </div>
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">BP</p>
                  <p className="text-sm font-mono font-extrabold text-slate-900">120/80</p>
                </div>
                <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Location</p>
                  <p className="text-[11px] font-bold text-slate-900 truncate">Sector V Corridor</p>
                </div>
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
