import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Siren, Activity, Navigation, Radio, Building2, BarChart3, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isActive, currentTab, setTab, soundEnabled, toggleSound, progressPercent, ambulance } = useEmergency();

  const tabs = [
    { id: 'dashboard', label: 'Live Simulation', icon: Activity },
    { id: 'ambulance', label: '1. Ambulance Portal', icon: Siren },
    { id: 'routes', label: '2. Route Engine', icon: Navigation },
    { id: 'signals', label: '3. Signals Control', icon: Radio },
    { id: 'hospital', label: '4. Hospital ER', icon: Building2 },
    { id: 'reports', label: '5. Analytics', icon: BarChart3 },
  ] as const;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Live Emergency Badge */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div 
            onClick={() => setTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-rose-600 to-blue-600 shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
              <Siren className="w-6 h-6 text-white animate-pulse" />
              {isActive && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  ResQ<span className="text-emerald-400">Way</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-blue-950 text-blue-400 border border-blue-800">
                  PROTOTYPE v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                Smart Ambulance & Green Corridor Platform
              </p>
            </div>
          </div>

          {/* Emergency Active Banner (Mobile/Desktop) */}
          {isActive ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-600/50 text-rose-300 text-xs font-semibold animate-pulse glass-glow-rose">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>ACTIVE CORRIDOR ({Math.round(progressPercent)}%)</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 text-slate-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>SYSTEM READY ({ambulance.id})</span>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id as typeof currentTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 border border-blue-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Tools */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Disable Siren Audio' : 'Enable Siren Audio'}
            className={`p-2.5 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-blue-950/60 border-blue-700/50 text-blue-400 hover:bg-blue-900/60'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
