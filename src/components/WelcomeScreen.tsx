import React, { useState, useEffect } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Siren, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { setAppViewMode } = useEmergency();
  const [countdown, setCountdown] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // 3-second countdown timer to redirect to login page
  useEffect(() => {
    if (countdown <= 0) {
      setAppViewMode('login');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, setAppViewMode]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
      {/* Animated Glowing Radial Gradient Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Main Glass Card Container */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 max-w-2xl w-full bg-slate-900/80 border border-slate-800 p-8 sm:p-12 rounded-3xl backdrop-blur-2xl shadow-2xl text-center space-y-8 transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-900/20"
      >
        {/* Animated Brand Logo View */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative p-5 rounded-3xl bg-gradient-to-br from-rose-600 via-red-600 to-indigo-600 shadow-2xl shadow-rose-900/40 ring-4 ring-rose-500/20 animate-bounce">
            <Siren className="w-12 h-12 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
          </div>

          {/* Website Name Display */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-center justify-center gap-1">
              ResQ<span className="text-emerald-400">Way</span>
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1">
              Smart Ambulance & Intelligent Green Corridor System
            </p>
          </div>
        </div>

        {/* Hover / Welcome Message Box */}
        <div className={`p-5 rounded-2xl border transition-all duration-500 ${
          isHovered 
            ? 'bg-blue-950/80 border-blue-500/60 text-blue-200 shadow-lg shadow-blue-950 scale-[1.02]' 
            : 'bg-slate-950/60 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Emergency Response Platform</span>
          </div>
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            "Welcome to <span className="text-emerald-400 font-bold">ResQWay</span> — Saving lives through real-time traffic signal automation, smart ambulance dispatching, and ER hospital coordination."
          </p>
          {isHovered && (
            <p className="text-xs text-blue-300 mt-2 font-mono animate-pulse">
              ✨ Hover active: Redirecting to login terminal in {countdown}s...
            </p>
          )}
        </div>

        {/* Countdown & Redirect Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-400">
            <Activity className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Redirecting in: <strong className="text-white font-extrabold text-sm">{countdown}s</strong></span>
          </div>

          <button
            onClick={() => setAppViewMode('login')}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all group"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-4 text-center text-xs text-slate-500 font-mono">
        ResQWay © 2026 Emergency Telemetry Engine
      </div>
    </div>
  );
};
