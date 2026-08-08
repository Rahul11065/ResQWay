import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { ArrowLeft, Layers, Plus, Minus, Target, Siren } from 'lucide-react';

export const LiveTrackingView: React.FC = () => {
  const { setTab, isActive, ambulance, hospital, selectedRoute, progressPercent } = useEmergency();

  // Dynamic calculations based on progress percent
  const ambX = 15 + (progressPercent / 100) * 70;
  const ambY = 75 - (progressPercent / 100) * 45;
  const currentEtaMin = Math.max(0, Math.ceil(selectedRoute.estTimeMin * (1 - progressPercent / 100)));
  const distanceRemKm = Math.max(0, Math.round((selectedRoute.distanceKm * (1 - progressPercent / 100)) * 10) / 10);

  return (
    <div className="space-y-4">
      
      {/* Top Header Row matching image: Back arrow, Title, Emergency Active Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab('dashboard')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">Live Tracking</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-700">
                {ambulance.id}
              </span>
            </div>
            <p className="text-xs text-slate-500">Real-time tracking of ambulance and route</p>
          </div>
        </div>

        <div>
          {isActive ? (
            <span className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-black tracking-wide flex items-center gap-1.5 shadow-sm animate-pulse">
              <Siren className="w-4 h-4" />
              Emergency Active
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Standby / Ready
            </span>
          )}
        </div>
      </div>

      {/* Main Full-Width Dark Map Container */}
      <div className="relative w-full aspect-[16/9] min-h-[480px] dark-map-card rounded-2xl overflow-hidden shadow-xl bg-grid-pattern-dark flex flex-col justify-between">
        
        {/* Floating Map Controls on Top Right */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:bg-slate-800 shadow-md">
            <Layers className="w-4 h-4" />
          </button>
          <div className="flex flex-col bg-slate-900/90 border border-slate-700 rounded-xl overflow-hidden shadow-md">
            <button className="p-2.5 text-slate-300 hover:bg-slate-800 border-b border-slate-800">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2.5 text-slate-300 hover:bg-slate-800">
              <Minus className="w-4 h-4" />
            </button>
          </div>
          <button className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:bg-slate-800 shadow-md">
            <Target className="w-4 h-4" />
          </button>
        </div>

        {/* SVG Interactive Map Vector Surface */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <defs>
              <radialGradient id="greenPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="redPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* City Street Grid Roads */}
            <path d="M 50 450 L 950 450 M 50 200 L 950 200 M 200 50 L 200 550 M 500 50 L 500 550 M 800 50 L 800 550" stroke="#1e293b" strokeWidth="4" strokeDasharray="6 6" />

            {/* Multi-segment Colored Traffic Route Line (Green clear -> Yellow moderate -> Red heavy) */}
            {/* Clear Segment */}
            <path d="M 150 450 L 300 350 L 450 320" fill="none" stroke="#10b981" strokeWidth="9" strokeLinecap="round" className="glow-green-corridor" />
            {/* Moderate Segment */}
            <path d="M 450 320 L 600 240" fill="none" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round" />
            {/* Heavy Segment */}
            <path d="M 600 240 L 800 150" fill="none" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" />

            {/* Destination Hospital Pin */}
            <g transform="translate(800, 150)">
              <circle cx="0" cy="0" r="30" fill="url(#greenPulse)">
                <animate attributeName="r" values="24;36;24" dur="2s" repeatCount="indefinite" />
              </circle>
              <rect x="-18" y="-18" width="36" height="36" rx="8" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
              <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">H</text>
              <text x="0" y="-26" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">
                {hospital.name}
              </text>
            </g>

            {/* Origin Location Pin */}
            <g transform="translate(150, 450)">
              <circle cx="0" cy="0" r="10" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="24" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                {ambulance.currentLocationName}
              </text>
            </g>

            {/* Animated Live Ambulance Marker with Status Label */}
            <g transform={`translate(${ambX * 10}, ${ambY * 6})`}>
              <circle cx="0" cy="0" r="28" fill="url(#redPulse)">
                <animate attributeName="r" values="20;36;20" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="16" fill="#ef4444" stroke="#ffffff" strokeWidth="3" />
              <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">🚑</text>
              
              {/* Ambulance Tag matching image */}
              <foreignObject x="-45" y="-45" width="90" height="24">
                <div className="bg-slate-900/90 border border-emerald-500/80 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white text-center flex items-center justify-center gap-1 shadow-md">
                  <span>{ambulance.id}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[9px] text-emerald-400">Live</span>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>

        {/* Bottom Dark HUD Card Overlay matching bottom section of Screen 2 in image */}
        <div className="relative z-10 m-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md space-y-3">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-slate-800/80 pb-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Location</p>
              <p className="font-bold text-white mt-0.5">EM Bypass, Kolkata</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</p>
              <p className="font-bold text-white mt-0.5">{hospital.name}</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ETA</p>
              <p className="font-black text-amber-400 font-mono text-sm mt-0.5">{currentEtaMin} min</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Distance</p>
              <p className="font-black text-emerald-400 font-mono text-sm mt-0.5">{distanceRemKm} km</p>
            </div>
          </div>

          {/* Bottom Info Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency:</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                Critical
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Patient:</span>
              <span className="font-bold text-slate-200">Male, 45 Yrs</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Condition:</span>
              <span className="font-bold text-slate-200">Cardiac Arrest</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Priority:</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                High
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
