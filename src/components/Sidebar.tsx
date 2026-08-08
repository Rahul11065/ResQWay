import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import type { TabType } from '../types';
import { 
  LayoutDashboard, 
  Ambulance, 
  MapPin, 
  Building2, 
  Radio, 
  Bell, 
  BarChart3, 
  Settings, 
  Route, 
  Siren,
  Menu,
  X,
  LogOut,
  UserCheck,
  Lock
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { currentTab, setTab, isActive, ambulance, userAuth, logout, appViewMode, setAppViewMode, loginRole } = useEmergency();

  const navItems: { id: TabType; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ambulance', label: 'Ambulances', icon: Ambulance },
    { id: 'tracking', label: 'Live Tracking', icon: MapPin, badge: isActive ? 'LIVE' : undefined },
    { id: 'routes', label: 'Route Analysis', icon: Route },
    { id: 'hospital', label: 'Hospitals', icon: Building2 },
    { id: 'signals', label: 'Traffic Signals', icon: Radio },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div 
            onClick={() => {
              setTab('dashboard');
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Siren className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">ResQ<span className="text-emerald-500">Way</span></span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Emergency & Green Corridor
              </p>
            </div>
          </div>

          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Active Banner inside Sidebar */}
        {isActive && (
          <div className="mx-4 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs font-semibold text-rose-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span>Emergency Active ({ambulance.id})</span>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  if (appViewMode === 'login') {
                    // Auto login as default citizen user if clicking navigation item directly
                    loginRole('user');
                  }
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isCurrent && appViewMode !== 'login'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isCurrent && appViewMode !== 'login' ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                    isCurrent && appViewMode !== 'login' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Auth Profile & Logout */}
        {userAuth ? (
          <div className="p-3 mx-3 mb-2 rounded-xl bg-slate-100/80 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                {userAuth.role.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 truncate text-[11px]">{userAuth.name}</p>
                <p className="text-[9px] text-slate-500 font-mono capitalize">{userAuth.role} Role</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-3 mx-3 mb-2 rounded-xl bg-amber-50/90 border border-amber-200 flex items-center gap-2.5 text-xs">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-amber-950 truncate text-[11px]">Portal Authorization</p>
              <p className="text-[9px] text-amber-700 font-medium">Select Role Below</p>
            </div>
          </div>
        )}

        {/* Footer / Telemetry info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center justify-between font-mono">
            <span>System Status:</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              ONLINE
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            ResQWay v2.4 • Hackathon Edition
          </div>
        </div>
      </aside>
    </>
  );
};
