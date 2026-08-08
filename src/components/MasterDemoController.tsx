import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Play, Pause, RotateCcw, Sparkles, Radio, Building2, Siren, Navigation } from 'lucide-react';

export const MasterDemoController: React.FC = () => {
  const { isActive, isPaused, startEmergency, pauseEmergency, resumeEmergency, resetEmergency, simSpeed, setSimSpeed, setTab, currentTab } = useEmergency();

  const handleAutoDemo = () => {
    resetEmergency();
    setTimeout(() => {
      startEmergency('CRITICAL');
      setTab('dashboard');
    }, 200);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-none">
      <div className="pointer-events-auto glass-panel p-3 rounded-2xl border border-blue-500/40 shadow-2xl bg-slate-950/95 backdrop-blur-xl flex items-center justify-between gap-3 text-xs">
        
        {/* Quick Demo Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoDemo}
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:scale-105 text-white font-extrabold flex items-center gap-2 shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>1-Click Hackathon Demo</span>
          </button>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          {isActive && !isPaused ? (
            <button
              onClick={pauseEmergency}
              className="py-1 px-3 rounded-lg bg-amber-600 text-white font-bold flex items-center gap-1 hover:bg-amber-500"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </button>
          ) : isActive && isPaused ? (
            <button
              onClick={resumeEmergency}
              className="py-1 px-3 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-1 hover:bg-emerald-500"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume</span>
            </button>
          ) : null}

          <button
            onClick={resetEmergency}
            title="Reset Simulation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <span className="text-slate-700">|</span>

          {/* Speed Selector */}
          {[1, 2, 5].map((spd) => (
            <button
              key={spd}
              onClick={() => setSimSpeed(spd)}
              className={`px-2 py-1 rounded font-mono text-[10px] font-bold transition-all ${
                simSpeed === spd ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* Tab Quick Shortcuts */}
        <div className="hidden md:flex items-center gap-1 text-[11px]">
          <button
            onClick={() => setTab('ambulance')}
            className={`p-1.5 rounded-lg border transition-colors ${currentTab === 'ambulance' ? 'border-rose-500 bg-rose-950/80 text-rose-300' : 'border-slate-800 text-slate-400 hover:bg-slate-900'}`}
            title="Ambulance Dispatch"
          >
            <Siren className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTab('routes')}
            className={`p-1.5 rounded-lg border transition-colors ${currentTab === 'routes' ? 'border-emerald-500 bg-emerald-950/80 text-emerald-300' : 'border-slate-800 text-slate-400 hover:bg-slate-900'}`}
            title="Route Engine"
          >
            <Navigation className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTab('signals')}
            className={`p-1.5 rounded-lg border transition-colors ${currentTab === 'signals' ? 'border-amber-500 bg-amber-950/80 text-amber-300' : 'border-slate-800 text-slate-400 hover:bg-slate-900'}`}
            title="Signal Controls"
          >
            <Radio className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTab('hospital')}
            className={`p-1.5 rounded-lg border transition-colors ${currentTab === 'hospital' ? 'border-blue-500 bg-blue-950/80 text-blue-300' : 'border-slate-800 text-slate-400 hover:bg-slate-900'}`}
            title="Hospital ER"
          >
            <Building2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
