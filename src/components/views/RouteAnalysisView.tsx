import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { ArrowLeft, Sparkles, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const RouteAnalysisView: React.FC = () => {
  const { setTab, selectRoute, selectedRoute } = useEmergency();

  const routes = [
    {
      id: 'route-a',
      name: 'Route A',
      via: 'Via EM Bypass',
      time: '18 min',
      distance: '5.0 km',
      traffic: 'High',
      trafficColor: 'bg-rose-100 text-rose-700 border-rose-200',
      signals: 4,
      condition: 'Moderate',
      conditionColor: 'bg-amber-100 text-amber-700 border-amber-200',
      isRecommended: false,
    },
    {
      id: 'route-b',
      name: 'Route B',
      via: 'Via Park Circus Connector',
      time: '11 min',
      distance: '6.2 km',
      traffic: 'Low',
      trafficColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      signals: 1,
      condition: 'Good',
      conditionColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      isRecommended: true,
    },
    {
      id: 'route-c',
      name: 'Route C',
      via: 'Via AJC Bose Road',
      time: '15 min',
      distance: '4.3 km',
      traffic: 'Medium',
      trafficColor: 'bg-amber-100 text-amber-700 border-amber-200',
      signals: 3,
      condition: 'Moderate',
      conditionColor: 'bg-amber-100 text-amber-700 border-amber-200',
      isRecommended: false,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Bar matching Screen 3 in image */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTab('dashboard')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Route Analysis</h2>
          <p className="text-xs text-slate-500">Select the best route for fastest arrival</p>
        </div>
      </div>

      {/* AI Sparkle Sub-banner matching image */}
      <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center gap-2.5 text-xs font-semibold text-blue-700">
        <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Based on real-time traffic & signal data</span>
      </div>

      {/* Stacked Route Cards Grid */}
      <div className="space-y-4">
        {routes.map((route) => {
          const isSelected = selectedRoute.id === route.id;
          return (
            <div
              key={route.id}
              onClick={() => selectRoute(route.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative ${
                route.isRecommended
                  ? 'bg-emerald-50/30 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : isSelected
                  ? 'bg-white border-blue-500 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left Route Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{route.name}</h3>
                    {route.isRecommended && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-500">{route.via}</p>
                </div>

                {/* Right Time & Distance */}
                <div className="flex items-baseline gap-4 sm:text-right">
                  <div>
                    <span className={`text-2xl font-black font-mono ${route.isRecommended ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {route.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 font-mono">{route.distance}</span>
                  </div>
                </div>

              </div>

              {/* Status Pills Matrix Row matching image layout */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
                
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">Traffic</span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border inline-block ${route.trafficColor}`}>
                    {route.traffic}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">Signals</span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 inline-block">
                    🚦 {route.signals}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">Road Condition</span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border inline-block ${route.conditionColor}`}>
                    {route.condition}
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Primary Action Button matching image */}
      <div className="pt-2">
        <button
          onClick={() => {
            selectRoute('route-b');
            setTab('tracking');
          }}
          className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
        >
          <span>Choose Route B</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
