import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const LiveSimulationMap: React.FC = () => {
  const {
    isActive,
    isPaused,
    ambulance,
    hospital,
    selectedRoute,
    signals,
    progressPercent,
    simSpeed,
    startEmergency,
    pauseEmergency,
    resumeEmergency,
    resetEmergency,
    setSimSpeed,
  } = useEmergency();

  // Helper to interpolate ambulance position (x, y) along selected route waypoints
  const getAmbulancePosition = () => {
    const waypoints = selectedRoute.waypoints;
    if (!waypoints || waypoints.length === 0) return { x: 10, y: 70 };

    const totalSegments = waypoints.length - 1;
    const progressFrac = Math.min(1, Math.max(0, progressPercent / 100));
    const scaledIndex = progressFrac * totalSegments;
    const currentIndex = Math.floor(scaledIndex);
    const nextIndex = Math.min(totalSegments, currentIndex + 1);
    const segmentProgress = scaledIndex - currentIndex;

    const p1 = waypoints[currentIndex];
    const p2 = waypoints[nextIndex];

    const currentX = p1.x + (p2.x - p1.x) * segmentProgress;
    const currentY = p1.y + (p2.y - p1.y) * segmentProgress;

    return { x: currentX, y: currentY };
  };

  const ambPos = getAmbulancePosition();
  const currentEtaMin = Math.max(0, Math.ceil(selectedRoute.estTimeMin * (1 - progressPercent / 100)));
  const distanceRemKm = Math.max(0, Math.round((selectedRoute.distanceKm * (1 - progressPercent / 100)) * 10) / 10);

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 relative overflow-hidden bg-[#0a0f1d] shadow-2xl">
        
        {/* Top Floating Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-xl mb-4 relative z-20">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE SMART CORRIDOR MAP CANVAS</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="text-xs text-slate-400 font-mono">
              Ambulance: <strong className="text-white">{ambulance.id}</strong>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="flex items-center gap-2">
            {!isActive ? (
              <button
                onClick={() => startEmergency('CRITICAL')}
                className="py-1.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-rose-950 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Emergency</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={resumeEmergency}
                className="py-1.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={pauseEmergency}
                className="py-1.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-all"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={resetEmergency}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Speed selector */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 ml-2">
              {[1, 2, 5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSimSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    simSpeed === speed
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* SVG Interactive Map Area */}
        <div className="relative w-full aspect-[16/9] bg-[#070b16] rounded-xl border border-slate-800/80 overflow-hidden bg-grid-pattern">
          
          <svg className="w-full h-full" viewBox="0 0 1000 562.5" preserveAspectRatio="none">
            <defs>
              {/* Radial gradient for glowing corridor */}
              <radialGradient id="emeraldGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="roseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* City Grid Road Geometry Background */}
            <path
              d="M 50 400 L 950 400 M 50 150 L 950 150 M 200 50 L 200 500 M 500 50 L 500 500 M 800 50 L 800 500"
              stroke="#1e293b"
              strokeWidth="4"
              strokeDasharray="6 6"
            />

            {/* Route A Path (Red) */}
            <path
              d="M 100 393 L 250 309 L 450 281 L 700 253 L 900 168"
              fill="none"
              stroke="#ef4444"
              strokeWidth={selectedRoute.id === 'route-a' ? '8' : '3'}
              strokeOpacity={selectedRoute.id === 'route-a' ? '0.9' : '0.3'}
              strokeDasharray={selectedRoute.id === 'route-a' ? 'none' : '4 4'}
            />

            {/* Route C Path (Amber) */}
            <path
              d="M 100 393 L 300 168 L 600 196 L 750 140 L 900 168"
              fill="none"
              stroke="#f59e0b"
              strokeWidth={selectedRoute.id === 'route-c' ? '8' : '3'}
              strokeOpacity={selectedRoute.id === 'route-c' ? '0.9' : '0.3'}
              strokeDasharray={selectedRoute.id === 'route-c' ? 'none' : '4 4'}
            />

            {/* Route B Path (Optimal Emerald Green) */}
            <path
              d="M 100 393 L 200 478 L 500 450 L 800 337 L 900 168"
              fill="none"
              stroke="#10b981"
              strokeWidth={selectedRoute.id === 'route-b' ? '9' : '4'}
              strokeOpacity={selectedRoute.id === 'route-b' ? '1' : '0.4'}
              className={selectedRoute.id === 'route-b' && isActive ? 'glow-green-corridor' : ''}
            />

            {/* Signal Nodes along the Corridor */}
            {signals.map((sig) => {
              const cx = sig.coords.x * 10;
              const cy = sig.coords.y * 5.625;
              const isGreen = sig.currentState === 'CORRIDOR_OVERRIDE' || sig.currentState === 'GREEN';

              return (
                <g key={sig.id} className="cursor-pointer">
                  {/* Outer pulse if overridden green */}
                  {isGreen && (
                    <circle cx={cx} cy={cy} r="24" fill="url(#emeraldGlow)">
                      <animate attributeName="r" values="18;28;18" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Signal Post Box */}
                  <rect x={cx - 10} y={cy - 20} width="20" height="40" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  {/* Red Light */}
                  <circle cx={cx} cy={cy - 10} r="5" fill={!isGreen ? '#ef4444' : '#334155'} />
                  {/* Green Light */}
                  <circle cx={cx} cy={cy + 10} r="5" fill={isGreen ? '#10b981' : '#334155'} />
                  {/* Text Label */}
                  <text x={cx} y={cy + 34} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                    {sig.name.split(':')[0]}
                  </text>
                </g>
              );
            })}

            {/* Destination Hospital Beacon Marker */}
            <g transform="translate(900, 168)">
              <circle cx="0" cy="0" r="32" fill="url(#emeraldGlow)" opacity="0.6">
                <animate attributeName="r" values="24;36;24" dur="2s" repeatCount="indefinite" />
              </circle>
              <rect x="-18" y="-18" width="36" height="36" rx="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="6" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">🏥</text>
              <text x="0" y="-24" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
                {hospital.name}
              </text>
            </g>

            {/* Origin Location Pin */}
            <g transform="translate(100, 393)">
              <circle cx="0" cy="0" r="14" fill="#3b82f6" opacity="0.3" />
              <circle cx="0" cy="0" r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="24" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                {ambulance.currentLocationName}
              </text>
            </g>

            {/* Animated Ambulance Marker */}
            <g transform={`translate(${ambPos.x * 10}, ${ambPos.y * 5.625})`}>
              {isActive && (
                <circle cx="0" cy="0" r="28" fill="url(#roseGlow)">
                  <animate attributeName="r" values="20;35;20" dur="0.8s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx="0" cy="0" r="16" fill="#ef4444" stroke="#ffffff" strokeWidth="3.5" className="shadow-2xl" />
              <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">🚑</text>
            </g>
          </svg>

          {/* Map Live HUD Overlay Card */}
          <div className="absolute top-4 left-4 bg-slate-950/90 border border-slate-800 p-3 rounded-xl backdrop-blur-md max-w-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">LIVE TELEMETRY HUD</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <p className="text-[9px] text-slate-400">SPEED</p>
                <p className="text-sm font-extrabold text-blue-400">{isActive ? '64 KM/H' : '0 KM/H'}</p>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <p className="text-[9px] text-slate-400">DISTANCE REMAINING</p>
                <p className="text-sm font-extrabold text-emerald-400">{distanceRemKm} KM</p>
              </div>
            </div>

            <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">ETA to Hospital:</span>
              <span className="text-sm font-extrabold text-amber-400">{currentEtaMin} MIN</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
