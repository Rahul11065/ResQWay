import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Radio, Zap, CheckCircle2, AlertOctagon, RefreshCw, Sliders, ArrowRight } from 'lucide-react';

export const SignalController: React.FC = () => {
  const { signals, toggleSignalOverride, ambulance, setTab } = useEmergency();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4 text-amber-400" />
              Step 4 — Smart Traffic Signal Control Matrix
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Green Corridor Automation & Signals
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              As Ambulance <strong className="text-white">{ambulance.id}</strong> approaches within 500 meters, ResQWay automatically overrides red traffic lights to 🟢 GREEN to clear the intersection.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-950/80 border border-amber-500/50 p-4 rounded-xl">
            <div className="p-3 bg-amber-600 rounded-lg text-white">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-amber-300 font-bold uppercase">CORRIDOR LOCK STATUS</p>
              <p className="text-sm font-black text-white">
                {signals.filter((s) => s.currentState === 'CORRIDOR_OVERRIDE').length} / 4 Signals Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Signal Automation Flow Timeline Diagram */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" />
          Automated Signal Override Protocol Workflow
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-blue-900 text-blue-300 mx-auto mb-1.5 flex items-center justify-center font-bold text-xs">1</div>
            <p className="text-xs font-bold text-white">Ambulance Detected</p>
            <p className="text-[10px] text-slate-400 mt-0.5">GPS telemetry broadcast</p>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-blue-900 text-blue-300 mx-auto mb-1.5 flex items-center justify-center font-bold text-xs">2</div>
            <p className="text-xs font-bold text-white">Upcoming Signals</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Find 4 corridor gates</p>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-blue-900 text-blue-300 mx-auto mb-1.5 flex items-center justify-center font-bold text-xs">3</div>
            <p className="text-xs font-bold text-white">ETA Calculated</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Speed & distance matrix</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/50 glass-glow-emerald">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white mx-auto mb-1.5 flex items-center justify-center font-bold text-xs">4</div>
            <p className="text-xs font-bold text-emerald-400">Light 🔴 → 🟢 GREEN</p>
            <p className="text-[10px] text-emerald-300 mt-0.5">Corridor pre-clearance</p>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-blue-900 text-blue-300 mx-auto mb-1.5 flex items-center justify-center font-bold text-xs">5</div>
            <p className="text-xs font-bold text-white">Normal Reset</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Reverts after passage</p>
          </div>
        </div>
      </div>

      {/* 4 Signals Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {signals.map((signal, idx) => {
          const isGreen = signal.currentState === 'CORRIDOR_OVERRIDE' || signal.currentState === 'GREEN';

          return (
            <div
              key={signal.id}
              className={`glass-card p-6 rounded-2xl border transition-all space-y-4 ${
                isGreen
                  ? 'border-emerald-500 bg-slate-900/90 glass-glow-emerald'
                  : 'border-slate-800 bg-slate-900/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded">
                    INTERSECTION #{idx + 1} ({signal.id})
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1.5">{signal.name}</h3>
                  <p className="text-xs text-slate-400">Corridor Position: {signal.locationKm} km mark</p>
                </div>

                {/* Simulated Traffic Signal Light Housing */}
                <div className="flex items-center gap-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800">
                  <div
                    className={`w-4 h-4 rounded-full transition-all ${
                      !isGreen ? 'bg-rose-500 shadow-lg shadow-rose-500/80 animate-pulse' : 'bg-slate-800'
                    }`}
                  ></div>
                  <div className="w-4 h-4 rounded-full bg-slate-800"></div>
                  <div
                    className={`w-4 h-4 rounded-full transition-all ${
                      isGreen ? 'bg-emerald-400 shadow-lg shadow-emerald-400/80 animate-pulse' : 'bg-slate-800'
                    }`}
                  ></div>
                </div>
              </div>

              {/* Status & Distance Telemetry */}
              <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">DISTANCE TO AMBULANCE</p>
                  <p className={`text-base font-extrabold mt-0.5 ${signal.ambulanceDistanceMeters < 500 ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {Math.max(0, signal.ambulanceDistanceMeters)} M
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">PREDICTED ARRIVAL ETA</p>
                  <p className="text-base font-extrabold text-amber-400 mt-0.5">
                    {signal.etaSecondsToSignal} SEC
                  </p>
                </div>
              </div>

              {/* Override Toggle Action */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {isGreen ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-extrabold bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                      🟢 GREEN CORRIDOR LOCKED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-rose-400 font-extrabold bg-rose-950/80 border border-rose-800/60 px-3 py-1 rounded-lg">
                      <AlertOctagon className="w-4 h-4" />
                      🔴 RED (STANDBY FOR OVERRIDE)
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleSignalOverride(signal.id)}
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Manual Override</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Hospital Pre-Notification Callout */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            🏥 Check the Destination Hospital ER Command Center
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            See how the hospital ER receives real-time incoming ambulance alerts, live ETA counters, and pre-reserves doctors and ICU beds!
          </p>
        </div>

        <button
          onClick={() => setTab('hospital')}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg shrink-0"
        >
          <span>Open Hospital ER Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
