import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Building2, CheckCircle2, Loader2, Siren, UserCheck, Stethoscope, Bed, MapPin } from 'lucide-react';

export const HospitalDashboardView: React.FC = () => {
  const { hospital, ambulance, patient, selectedRoute, progressPercent, updateReadinessItem } = useEmergency();

  const currentEtaMin = Math.max(0, Math.ceil(selectedRoute.estTimeMin * (1 - progressPercent / 100)));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Incoming Ambulance Top Card matching Screen 5 in image */}
      <div className="white-card p-6 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-6">
        
        {/* Top Banner Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-rose-100 pb-6">
          
          {/* Left: Hospital Photo / Graphic */}
          <div className="md:col-span-1 bg-white p-4 rounded-xl border border-rose-100 flex flex-col items-center justify-center shadow-xs">
            <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center border border-slate-100">
              <Building2 className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-2">Belle Vue Hospital</h3>
            <p className="text-[11px] text-slate-500">Kolkata, West Bengal</p>
            
            <div className="flex items-center gap-2 mt-3 text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Active</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">12 Available</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">8 On Duty</span>
            </div>
          </div>

          {/* Right Center: Incoming Ambulance Telemetry Box */}
          <div className="md:col-span-2 space-y-4">
            
            <div className="p-4 rounded-xl bg-white border border-rose-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-600 text-white animate-pulse">
                  <Siren className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Incoming Ambulance</span>
                  <h2 className="text-lg font-black text-slate-900 font-mono">{ambulance.id}</h2>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] font-bold text-slate-400 block">ETA</span>
                <span className="text-xl font-black text-rose-600">{currentEtaMin} min</span>
              </div>
            </div>

            {/* Patient Matrix Row matching image */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block">Emergency</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700 inline-block mt-0.5">
                  Critical
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 block">Patient</span>
                <span className="font-bold text-slate-800 block mt-0.5">Male, 45 Yrs</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 block">Condition</span>
                <span className="font-bold text-slate-800 block mt-0.5">Cardiac Arrest</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 block">Department</span>
                <span className="font-bold text-blue-600 block mt-0.5">Cardiology</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Grid: Hospital Preparation & Live Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bottom Left: Hospital Preparation Checklist matching image */}
        <div className="white-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Hospital Preparation</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Click to update status</span>
          </div>

          <div className="space-y-3">
            {[
              { key: 'erAlerted', label: 'Emergency Room Alerted' },
              { key: 'specialistNotified', label: 'Cardiologist Notified' },
              { key: 'bedReserved', label: 'ICU Bed Reserved' },
              { key: 'nursingAlerted', label: 'Nursing Staff Alerted' },
              { key: 'traumaBayPrepped', label: 'Trauma Bay Prepped' },
              { key: 'bloodBankStandingBy', label: 'Blood Bank Standing By' },
            ].map((item) => {
              const isChecked = hospital.readinessChecklist[item.key as keyof typeof hospital.readinessChecklist];
              return (
                <div
                  key={item.key}
                  onClick={() => updateReadinessItem(item.key as keyof typeof hospital.readinessChecklist, !isChecked)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-slate-50 border-slate-100 hover:bg-slate-100/70'
                      : 'bg-amber-50/80 border-amber-200 hover:bg-amber-100/80'
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-800">{item.label}</span>
                  {isChecked ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                      <span>Completed</span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-800 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      In Progress
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Right: Live Location Snippet matching image */}
        <div className="white-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Live Location
            </h3>
            <span className="text-xs font-mono text-slate-400">0.8 km from Bay</span>
          </div>

          <div className="relative w-full h-48 dark-map-card rounded-xl overflow-hidden bg-grid-pattern-dark flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <path d="M 40 160 L 200 120 L 360 40" stroke="#10b981" strokeWidth="6" strokeLinecap="round" fill="none" className="glow-green-corridor" />
              <g transform="translate(360, 40)">
                <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#10b981" />
                <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">H</text>
              </g>
              <g transform="translate(200, 120)">
                <circle cx="0" cy="0" r="10" fill="#ef4444" opacity="0.3" />
                <circle cx="0" cy="0" r="6" fill="#ef4444" />
              </g>
            </svg>
          </div>
        </div>

      </div>

    </div>
  );
};
