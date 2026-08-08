import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { RotateCcw, Sliders } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { soundEnabled, toggleSound, resetEmergency, simSpeed, setSimSpeed } = useEmergency();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="white-card p-6 rounded-2xl space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-600" />
          System Preferences & Audio Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-900">Emergency Audio Sirens</p>
              <p className="text-[11px] text-slate-500">Play web audio feedback tones during signal override events</p>
            </div>
            <button
              onClick={toggleSound}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                soundEnabled ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {soundEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-900">Simulation Travel Speed multiplier</p>
              <p className="text-[11px] text-slate-500">Accelerate demo movement along green corridor</p>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSimSpeed(speed)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                    simSpeed === speed ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-rose-50 border border-rose-100">
            <div>
              <p className="text-xs font-bold text-rose-900">Reset Emergency Simulation</p>
              <p className="text-[11px] text-rose-600">Revert all signals to standard cycle and reset telemetry</p>
            </div>
            <button
              onClick={resetEmergency}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
