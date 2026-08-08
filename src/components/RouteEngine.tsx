import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Navigation, ShieldCheck, Zap, AlertTriangle, Route as RouteIcon, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export const RouteEngine: React.FC = () => {
  const { availableRoutes, selectedRoute, selectRoute, setTab } = useEmergency();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <Navigation className="w-4 h-4 text-emerald-400" />
              Step 2 & 3 — Smart Route Optimization Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Multi-Route Emergency Evaluation
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              ResQWay compares real-time distance, traffic density, and signal delays. The algorithm prioritizes minimum emergency travel time over simple shortest distance.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-xl glass-glow-emerald">
            <div className="p-3 bg-emerald-600 rounded-lg text-white">
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <p className="text-[10px] text-emerald-300 font-bold uppercase">SELECTED OPTIMAL ROUTE</p>
              <p className="text-sm font-black text-white">{selectedRoute.name}</p>
              <p className="text-xs text-emerald-400 font-semibold">{selectedRoute.estTimeMin} min total ETA ({selectedRoute.distanceKm} km)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Innovation Explanation Banner */}
      <div className="glass-card p-5 rounded-2xl border border-blue-800/40 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-emerald-950/30">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-600/20 border border-blue-500/40 rounded-xl text-blue-400 mt-0.5">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              💡 Core Innovation: Weighted Time Score Algorithm
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard GPS selects <strong>Route C (4.8 km)</strong> as shortest. However, ResQWay detects 3 red signals and medium congestion. 
              ResQWay selects <strong>Route B (6.4 km)</strong> because its low traffic density and 1 automated green signal corridor saves <strong className="text-emerald-400">7 full minutes</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* 3 Routes Grid Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availableRoutes.map((route) => {
          const isSelected = selectedRoute.id === route.id;
          return (
            <div
              key={route.id}
              onClick={() => selectRoute(route.id)}
              className={`glass-card p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-slate-900/90 ring-2 ring-emerald-500/40 shadow-2xl glass-glow-emerald scale-[1.02]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {route.isRecommended && (
                <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  RECOMMENDED BEST ROUTE
                </div>
              )}

              <div className="space-y-4">
                {/* Title & Via */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}></span>
                    <h3 className="text-base font-extrabold text-white">{route.name}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 italic">{route.via}</p>
                </div>

                {/* Score & ETA Big Display */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ESTIMATED TIME</p>
                    <p className={`text-2xl font-black font-mono ${route.isRecommended ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {route.estTimeMin} <span className="text-xs font-normal">MIN</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ALGORITHM SCORE</p>
                    <p className={`text-xl font-black font-mono ${route.score > 80 ? 'text-emerald-400' : route.score > 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {route.score}/100
                    </p>
                  </div>
                </div>

                {/* Detailed Breakdown Matrix Table */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <RouteIcon className="w-3.5 h-3.5 text-blue-400" />
                      Distance
                    </span>
                    <span className="font-mono font-bold text-white">{route.distanceKm} km</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Traffic Density
                    </span>
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        route.trafficDensity === 'LOW'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : route.trafficDensity === 'MEDIUM'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {route.trafficDensity} ({route.trafficDelayMin}m delay)
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Red Signals
                    </span>
                    <span className="font-mono font-bold text-white">{route.redSignalCount} Signals</span>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <div className="space-y-1 pt-1">
                  {route.highlights.map((h, i) => (
                    <p key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                      {h}
                    </p>
                  ))}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectRoute(route.id);
                }}
                className={`w-full mt-5 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isSelected ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Selected for Corridor</span>
                  </>
                ) : (
                  <span>Select This Route</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Route Decision Summary & Next Step */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            🚦 Ready to simulate interactive live map movement & traffic light changes?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Proceed to the Live Simulation Map to see the ambulance move and traffic signals automatically switch to GREEN as it approaches!
          </p>
        </div>

        <button
          onClick={() => setTab('tracking')}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg shrink-0"
        >
          <span>Launch Live Map Simulation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
