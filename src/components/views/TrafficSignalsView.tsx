import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Radio, Zap, CheckCircle2, AlertOctagon } from 'lucide-react';

export const TrafficSignalsView: React.FC = () => {
  const { signals, toggleSignalOverride, ambulance } = useEmergency();
  const [autoPriority, setAutoPriority] = useState(true);

  const signalItems = [
    { id: 'SIG-1', name: 'Signal 1', junction: 'EM Bypass', isGreen: true, status: 'Normal', statusColor: 'text-slate-600 bg-slate-100 border-slate-200' },
    { id: 'SIG-2', name: 'Signal 2', junction: 'Park Circus', isGreen: true, status: 'Priority Active', statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-200' },
    { id: 'SIG-3', name: 'Signal 3', junction: 'AJC Bose Road', isGreen: false, status: 'Normal', statusColor: 'text-slate-600 bg-slate-100 border-slate-200' },
    { id: 'SIG-4', name: 'Signal 4', junction: 'Minto Park', isGreen: false, status: 'Normal', statusColor: 'text-slate-600 bg-slate-100 border-slate-200' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Bar matching Screen 6 in image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Traffic Signals</h2>
          <p className="text-xs text-slate-500">Real-time signal status and priority control</p>
        </div>

        {/* Auto Priority Toggle Switch matching image top right */}
        <div className="flex items-center gap-3 bg-white p-2 px-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-700">Auto Priority</span>
          <button
            onClick={() => setAutoPriority(!autoPriority)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              autoPriority ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                autoPriority ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-xs font-extrabold text-emerald-600 font-mono">
            {autoPriority ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      {/* Grid of 4 Signals (Visual Traffic Light Boxes matching image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {signalItems.map((sig) => {
          const liveSig = signals.find((s) => s.id === sig.id);
          const isGreenActive = liveSig
            ? liveSig.currentState === 'CORRIDOR_OVERRIDE' || liveSig.currentState === 'GREEN'
            : sig.isGreen;

          return (
            <div
              key={sig.id}
              onClick={() => toggleSignalOverride(sig.id)}
              className={`white-card p-5 rounded-2xl space-y-4 flex flex-col items-center text-center cursor-pointer transition-all ${
                isGreenActive ? 'ring-2 ring-emerald-500/30 border-emerald-300 bg-emerald-50/20' : ''
              }`}
            >
              <div>
                <h3 className="text-base font-black text-slate-900">{sig.name}</h3>
                <p className="text-xs font-semibold text-slate-500">{sig.junction}</p>
              </div>

              {/* Realistic Traffic Light Box matching graphic in image */}
              <div className="w-16 h-36 bg-slate-900 rounded-2xl p-2.5 flex flex-col items-center justify-between border-2 border-slate-700 shadow-inner">
                {/* Red Bulb */}
                <div
                  className={`w-8 h-8 rounded-full transition-all ${
                    !isGreenActive ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.9)] animate-pulse' : 'bg-slate-800'
                  }`}
                />
                {/* Yellow Bulb */}
                <div className="w-8 h-8 rounded-full bg-slate-800" />
                {/* Green Bulb */}
                <div
                  className={`w-8 h-8 rounded-full transition-all ${
                    isGreenActive ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.9)] animate-pulse' : 'bg-slate-800'
                  }`}
                />
              </div>

              {/* Status Badge matching image */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Status</span>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border ${
                    isGreenActive ? 'text-emerald-700 bg-emerald-100 border-emerald-200' : sig.statusColor
                  }`}
                >
                  {isGreenActive ? 'Priority Active' : 'Normal'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Priority Control Card matching Screen 6 in image */}
      <div className="white-card p-6 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          {/* Traffic light icon graphic */}
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Priority Control</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Ambulance <strong className="text-slate-900 font-mono">{ambulance.id}</strong> approaching • Next Signal: <span className="font-bold text-blue-600">Park Circus (0.4 km)</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => toggleSignalOverride('SIG-2')}
          className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all shrink-0"
        >
          Extend Green Time
        </button>

      </div>

    </div>
  );
};
