import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Building2, Siren, CheckSquare, Square, AlertCircle, Clock, ShieldCheck, Stethoscope, Phone, ArrowRight } from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const { hospital, ambulance, patient, selectedRoute, isActive, progressPercent, updateReadinessItem, logs, setTab } = useEmergency();

  const currentEtaMin = Math.max(0, Math.ceil(selectedRoute.estTimeMin * (1 - progressPercent / 100)));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-blue-400" />
              Step 5 — Hospital Emergency Response Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {hospital.name} — ER Command Center
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-time incoming ambulance pre-notification. Preps emergency room, reserves ICU beds, and alerts specialist doctors prior to vehicle arrival.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-blue-950/80 border border-blue-500/50 p-4 rounded-xl">
            <div className="p-3 bg-blue-600 rounded-lg text-white">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-blue-300 font-bold uppercase">LIVE INCOMING ETA</p>
              <p className="text-xl font-black text-white font-mono">{currentEtaMin} MINUTES</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Alert Card: Incoming Ambulance Telemetry */}
      <div className={`glass-card p-6 rounded-2xl border transition-all space-y-6 ${
        isActive ? 'border-rose-500 bg-slate-900/90 glass-glow-rose' : 'border-slate-800 bg-slate-900/60'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-600 text-white animate-pulse">
              <Siren className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950 border border-rose-800 px-2 py-0.5 rounded">
                CRITICAL INCOMING AMBULANCE ALERT
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                AMBULANCE #{ambulance.id}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-rose-950 border border-rose-700 text-rose-300 text-xs font-black uppercase tracking-wide flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              EMERGENCY: {patient.conditionCategory}
            </span>
          </div>
        </div>

        {/* Patient Details & Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase">PATIENT PROFILE</p>
            <p className="text-base font-bold text-white">{patient.name}</p>
            <p className="text-xs text-slate-400">{patient.age} Yrs, {patient.gender}</p>
            <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-900 mt-2">
              "{patient.chiefComplaint}"
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase">PARAMEDIC VITALS REPORT</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-slate-500">Heart Rate:</span>
                <p className="text-sm font-bold text-rose-400">{patient.vitals.heartRate} BPM</p>
              </div>
              <div>
                <span className="text-slate-500">Blood Pressure:</span>
                <p className="text-sm font-bold text-amber-400">{patient.vitals.bloodPressure}</p>
              </div>
              <div>
                <span className="text-slate-500">SpO2:</span>
                <p className="text-sm font-bold text-blue-400">{patient.vitals.spO2}%</p>
              </div>
              <div>
                <span className="text-slate-500">Resp Rate:</span>
                <p className="text-sm font-bold text-emerald-400">{patient.vitals.respirationRate} /m</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase">CORRIDOR & SPECIALIST</p>
            <div>
              <span className="text-xs text-slate-400">Assigned Specialist:</span>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                <Stethoscope className="w-3.5 h-3.5" />
                {hospital.specialistOnDuty}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-900">
              <span className="text-xs text-slate-400">Route Selected:</span>
              <p className="text-xs font-bold text-white">{selectedRoute.name}</p>
            </div>
          </div>
        </div>

        {/* Hospital Preparation Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Hospital Pre-Arrival Preparation Protocol Checklist
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { key: 'erAlerted', label: 'Emergency Room Team Alerted' },
              { key: 'specialistNotified', label: 'Cardiologist On-Duty Notified' },
              { key: 'bedReserved', label: 'ICU Bed #4 Reserved' },
              { key: 'traumaBayPrepped', label: 'Trauma Bay 1 Equipment Prepped' },
              { key: 'bloodBankStandingBy', label: 'Blood Bank Standing By (O-Neg)' },
            ].map((item) => {
              const isChecked = hospital.readinessChecklist[item.key as keyof typeof hospital.readinessChecklist];
              return (
                <div
                  key={item.key}
                  onClick={() => updateReadinessItem(item.key as keyof typeof hospital.readinessChecklist, !isChecked)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-950/60 border-emerald-700/80 text-emerald-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Real-time Dispatch Communication Log */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-400" />
          Live Ambulance ➔ Hospital Transmission Dispatch Log
        </h3>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-48 overflow-y-auto space-y-2 font-mono text-xs">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2 border-b border-slate-900/80 pb-1.5">
              <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
              <span
                className={
                  log.type === 'alert'
                    ? 'text-rose-400 font-bold'
                    : log.type === 'success'
                    ? 'text-emerald-400 font-bold'
                    : log.type === 'warning'
                    ? 'text-amber-400'
                    : 'text-slate-300'
                }
              >
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Next Step */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            📊 View System Performance & Response Analytics
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            See the average 28% response time reduction, signal clearing counts, and emergency case stats!
          </p>
        </div>

        <button
          onClick={() => setTab('reports')}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg shrink-0"
        >
          <span>Open Analytics Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
