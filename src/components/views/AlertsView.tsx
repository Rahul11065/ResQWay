import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Bell, Siren, Radio, Building2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AlertsView: React.FC = () => {
  const { logs } = useEmergency();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="white-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Recent Alerts & Notification Logs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Automated signal corridor locks, telemetry alerts, and ER hospital notifications</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold font-mono">
            {logs.length} Logged Events
          </span>
        </div>

        <div className="space-y-3">
          {logs.map((log, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className={`p-2 rounded-lg text-white shrink-0 mt-0.5 ${
                log.type === 'alert' ? 'bg-rose-500' : log.type === 'success' ? 'bg-emerald-500' : log.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
              }`}>
                {log.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> : log.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Radio className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">{log.message}</p>
                  <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
