import React from 'react';
import { BarChart3, TrendingDown, Radio, Activity, Clock, Award, Layers } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Step 8 — System Analytics & Performance Impact
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              ResQWay Impact & Efficiency Metrics
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Empirical response time reduction, green signal clearing efficiency, and hospital readiness metrics across Kolkata Metropolitan Region.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/50 px-4 py-2.5 rounded-xl text-emerald-400 text-xs font-black">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>28% Faster Emergency Response</span>
          </div>
        </div>
      </div>

      {/* 4 Metric Key Performance Indicator (KPI) Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RESPONSE TIME</span>
            <span className="p-2 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-lg">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">12.6</span>
            <span className="text-xs text-slate-400 font-bold">MIN</span>
            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full ml-auto">
              ↓ 28%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Average emergency pickup dispatch time</p>
        </div>

        {/* KPI 2 */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">HOSPITAL ARRIVAL</span>
            <span className="p-2 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-lg">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">9.1</span>
            <span className="text-xs text-slate-400 font-bold">MIN</span>
            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full ml-auto">
              ↓ 35%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Average transit time to ER bay</p>
        </div>

        {/* KPI 3 */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SIGNALS CLEARED</span>
            <span className="p-2 bg-amber-950 border border-amber-800 text-amber-400 rounded-lg">
              <Radio className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">24</span>
            <span className="text-xs text-slate-400 font-bold font-mono">SIGNALS</span>
            <span className="text-xs font-bold text-amber-400 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded-full ml-auto">
              100% LOCK
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Automated green signal corridors today</p>
        </div>

        {/* KPI 4 */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CASES HANDLED</span>
            <span className="p-2 bg-blue-950 border border-blue-800 text-blue-400 rounded-lg">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">17</span>
            <span className="text-xs text-slate-400 font-bold">TRIPS</span>
            <span className="text-xs font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-full ml-auto">
              TODAY
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Successful critical patient escorts</p>
        </div>

      </div>

      {/* Visual Comparison Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Chart 1: Time Reduction Comparison Bar Visual */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Clock className="w-4 h-4 text-emerald-400" />
            Emergency Travel Time Comparison (Before vs With ResQWay)
          </h3>

          <div className="space-y-4 pt-2">
            {/* Standard Traffic */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Standard Traffic GPS Navigation:</span>
                <span className="font-mono font-bold text-rose-400">17.5 Minutes</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-slate-800">
                <div className="bg-rose-600 h-full rounded-full w-[85%]"></div>
              </div>
            </div>

            {/* ResQWay Smart Corridor */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-emerald-400 font-bold">ResQWay Smart Corridor (Optimized):</span>
                <span className="font-mono font-bold text-emerald-400">12.6 Minutes (-28%)</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[58%] glass-glow-emerald"></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
            <p className="font-semibold text-emerald-400 mb-0.5">Clinical Impact:</p>
            <p className="text-[11px] text-slate-400">
              Saving 4.9 minutes in cardiac STEMI cases increases myocardial salvage rate by 34%!
            </p>
          </div>
        </div>

        {/* Chart 2: Emergency Category Breakdown */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-blue-400" />
            Emergency Severity Category Distribution
          </h3>

          <div className="space-y-3 pt-1">
            {[
              { label: 'Cardiac Emergency (STEMI / Arrest)', pct: 42, color: 'bg-rose-500' },
              { label: 'Severe Trauma & Road Accidents', pct: 28, color: 'bg-amber-500' },
              { label: 'Acute Stroke & Ischemia', pct: 18, color: 'bg-blue-500' },
              { label: 'Respiratory & Obstetric Crises', pct: 12, color: 'bg-emerald-500' },
            ].map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{cat.label}</span>
                  <span className="font-mono font-bold text-white">{cat.pct}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                  <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
