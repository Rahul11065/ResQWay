import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import type { TabType } from '../types';
import { LayoutDashboard, Ambulance, MapPin, Building2, Radio } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentTab, setTab, appViewMode, loginRole } = useEmergency();

  if (appViewMode === 'login') return null;

  const mobileTabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'ambulance', label: 'Ambulance', icon: Ambulance },
    { id: 'tracking', label: 'Live Map', icon: MapPin },
    { id: 'signals', label: 'Signals', icon: Radio },
    { id: 'hospital', label: 'Hospital', icon: Building2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 lg:hidden px-2 py-1.5 pb-safe shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-h-[44px] min-w-[56px] ${
                isSelected
                  ? 'text-indigo-600 font-extrabold scale-105'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isSelected ? 'bg-indigo-50 text-indigo-600' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
