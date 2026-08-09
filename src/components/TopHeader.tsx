import React, { useState, useEffect } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Menu, Calendar, Clock, Siren, LogOut, UserCheck, Lock } from 'lucide-react';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    isActive,
    isPaused,
    startEmergency,
    pauseEmergency,
    resumeEmergency,
    resetEmergency,
    soundEnabled,
    toggleSound,
    simSpeed,
    setSimSpeed,
    currentTab,
    appViewMode,
    userAuth,
    logout,
  } = useEmergency();

  // Live real-time date & time clock state
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const getPageTitle = () => {
    if (appViewMode === 'login') {
      return { title: 'Emergency Network Portal', sub: 'Sign in to access real-time ambulance dispatch, green corridor lock, and ER telemetry' };
    }
    switch (currentTab) {
      case 'dashboard':
        return { title: 'Dashboard', sub: 'Real-time overview of all emergency operations' };
      case 'ambulance':
        return { title: 'Ambulance Details', sub: 'Detailed information and status' };
      case 'tracking':
        return { title: 'Live Tracking', sub: 'Real-time tracking of ambulance and route' };
      case 'routes':
        return { title: 'Route Analysis', sub: 'Select the best route for fastest arrival' };
      case 'hospital':
        return { title: 'Hospital Dashboard', sub: 'Incoming ambulance and hospital status' };
      case 'signals':
        return { title: 'Traffic Signals', sub: 'Real-time signal status and priority control' };
      case 'alerts':
        return { title: 'Recent Alerts', sub: 'Real-time log of emergency notifications & signal overrides' };
      case 'reports':
        return { title: 'Reports & Analytics', sub: 'Key performance indicators and emergency travel time reduction' };
      case 'settings':
        return { title: 'System Settings', sub: 'Simulation parameters and audio alert settings' };
      default:
        return { title: 'Dashboard', sub: 'Real-time overview of all emergency operations' };
    }
  };

  const { title, sub } = getPageTitle();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Title & Subtitle + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              Welcome to ResQ<span className="text-emerald-500">Way</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Your central hub for real-time ambulance dispatch, green corridor control, and ER telemetry.
            </p>
          </div>
        </div>

        {/* Right Tools & Live Telemetry Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          
          {/* User Auth Role Badge / Auth Required */}
          {userAuth ? (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold flex items-center gap-1.5 capitalize">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>{userAuth.role} Portal</span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-800 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Auth Required</span>
              </span>
            </div>
          )}

          {/* Live Date & Time Cards */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/60 border border-blue-200/60 text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/60 border border-blue-200/60 text-slate-700 font-mono">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{formattedTime}</span>
            </div>
          </div>

          {/* Red Logout Button */}
          <button
            onClick={userAuth ? logout : () => setSimSpeed(1)}
            title="Exit / Logout"
            className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Interactive Simulation Controls */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {!isActive ? (
              <button
                onClick={() => startEmergency('CRITICAL')}
                className="py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Siren className="w-3.5 h-3.5 animate-pulse" />
                <span>Start Demo</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={resumeEmergency}
                className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={pauseEmergency}
                className="py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={resetEmergency}
              title="Reset Simulation"
              className="p-1.5 rounded-lg text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Sim Speed selector */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 ml-1">
              {[1, 2, 5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSimSpeed(speed)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    simSpeed === speed
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Siren sound toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Audio Siren' : 'Enable Audio Siren'}
              className={`p-1.5 rounded-lg border transition-colors ${
                soundEnabled ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
