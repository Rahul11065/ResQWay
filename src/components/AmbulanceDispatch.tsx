import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import type { EmergencySeverity } from '../types';
import { Siren, MapPin, Building, AlertTriangle, HeartPulse, UserCheck, PhoneCall, ShieldAlert, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

export const AmbulanceDispatch: React.FC = () => {
  const { ambulance, patient, hospital, isActive, startEmergency, resetEmergency, setTab } = useEmergency();

  const [ambulanceId, setAmbulanceId] = useState(ambulance.id);
  const [driverName, setDriverName] = useState(ambulance.driverName);
  const [locationName, setLocationName] = useState(ambulance.currentLocationName);
  const [destinationHospital, setDestinationHospital] = useState(hospital.name);
  const [severity, setSeverity] = useState<EmergencySeverity>('CRITICAL');
  const [patientCondition, setPatientCondition] = useState(patient.conditionCategory);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    startEmergency(severity);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <Siren className="w-4 h-4 animate-bounce text-rose-500" />
              Step 1 — Ambulance Emergency Selection Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Dispatch & Emergency Activation
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Configure ambulance telemetry, patient triage severity level, and destination hospital to trigger the automated Green Corridor smart traffic routing engine.
            </p>
          </div>

          {isActive ? (
            <div className="flex items-center gap-3 bg-rose-950/80 border border-rose-600/60 p-4 rounded-xl">
              <div className="p-3 bg-rose-600 rounded-lg text-white animate-pulse">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-rose-300 font-bold uppercase">CORRIDOR ACTIVE</p>
                <p className="text-sm font-extrabold text-white">En Route to {hospital.name}</p>
                <button
                  onClick={resetEmergency}
                  className="mt-1 text-xs text-rose-400 underline hover:text-rose-200"
                >
                  Cancel / Reset Emergency
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-800/40 px-4 py-3 rounded-xl text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Smart Corridor Engine Operational & Standing By</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Form Configurator */}
        <form onSubmit={handleStart} className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Ambulance & Location Info */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <UserCheck className="w-5 h-5 text-blue-400" />
              1. Ambulance Vehicle & Driver Telemetry
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  AMBULANCE VEHICLE ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={ambulanceId}
                    onChange={(e) => setAmbulanceId(e.target.value)}
                    required
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-blue-400 font-mono font-semibold">GPS ACTIVE</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  PARAMEDIC DRIVER NAME
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    required
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                  <PhoneCall className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  CURRENT DISPATCH LOCATION
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  required
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  DESTINATION HOSPITAL
                </label>
                <select
                  value={destinationHospital}
                  onChange={(e) => setDestinationHospital(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Apollo Gleneagles Hospital">Apollo Gleneagles Hospital (EM Bypass)</option>
                  <option value="Fortis Hospital Anandapur">Fortis Hospital (Anandapur)</option>
                  <option value="AMRI Hospital Salt Lake">AMRI Hospital (Salt Lake)</option>
                  <option value="RN Tagore Cardiac Sciences">RN Tagore International Institute</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Emergency Severity & Patient Details */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              2. Patient Emergency Severity Triage
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                EMERGENCY SEVERITY LEVEL (DETERMINES SIGNAL CORRIDOR PRIORITY)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['CRITICAL', 'HIGH', 'MEDIUM'] as const).map((lvl) => {
                  const isSelected = severity === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeverity(lvl)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? lvl === 'CRITICAL'
                            ? 'bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500/50 shadow-lg shadow-rose-950'
                            : lvl === 'HIGH'
                            ? 'bg-amber-950/90 border-amber-500 text-amber-200 ring-2 ring-amber-500/50'
                            : 'bg-blue-950/90 border-blue-500 text-blue-200 ring-2 ring-blue-500/50'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5 text-xs font-black tracking-wide">
                        {lvl === 'CRITICAL' && <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />}
                        {lvl}
                      </div>
                      <p className="text-[11px] opacity-75 mt-1 font-sans">
                        {lvl === 'CRITICAL' ? 'Immediate Corridor' : lvl === 'HIGH' ? 'Priority Signal' : 'Standard Escort'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  CONDITION CATEGORY
                </label>
                <select
                  value={patientCondition}
                  onChange={(e) => setPatientCondition(e.target.value as typeof patientCondition)}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Cardiac Emergency">Cardiac Emergency (STEMI / Arrest)</option>
                  <option value="Severe Trauma">Severe Multi-Trauma / Accident</option>
                  <option value="Stroke">Acute Ischemic Stroke</option>
                  <option value="Respiratory Distress">Acute Respiratory Distress</option>
                  <option value="Obstetric">High-Risk Obstetric Crisis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  PATIENT NAME & AGE
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${patient.name}, ${patient.age} yrs (${patient.gender})`}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-300 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Start Emergency Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isActive}
              className={`w-full py-4 px-6 rounded-2xl font-black text-lg text-white flex items-center justify-center gap-3 transition-all shadow-2xl ${
                isActive
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-600 border border-rose-400/40 glass-glow-rose hover:scale-[1.01]'
              }`}
            >
              <Siren className="w-7 h-7 animate-pulse" />
              <span>{isActive ? 'EMERGENCY CORRIDOR IN PROGRESS...' : '🚨 START EMERGENCY & LOCK GREEN CORRIDOR'}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

        </form>

        {/* Right 1 Col: Live Vitals & System Readiness Box */}
        <div className="space-y-6">
          
          {/* Patient Vitals Monitor */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Live Patient Telemetry
              </h3>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase">HEART RATE</p>
                <p className="text-xl font-extrabold text-rose-400 font-mono mt-0.5">
                  {patient.vitals.heartRate} <span className="text-xs text-slate-500">BPM</span>
                </p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase">BLOOD PRESSURE</p>
                <p className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">
                  {patient.vitals.bloodPressure}
                </p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase">OXYGEN SpO2</p>
                <p className="text-xl font-extrabold text-blue-400 font-mono mt-0.5">
                  {patient.vitals.spO2}%
                </p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase">RESPIRATION</p>
                <p className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">
                  {patient.vitals.respirationRate} <span className="text-xs text-slate-500">/m</span>
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              <p className="text-[11px] font-semibold text-slate-400 mb-1">Chief Complaint:</p>
              <p className="text-xs text-slate-200 italic">{patient.chiefComplaint}</p>
            </div>
          </div>

          {/* Quick Flow Navigator Card */}
          <div className="glass-panel p-5 rounded-2xl border border-blue-900/50 bg-gradient-to-b from-blue-950/20 to-slate-900/40 space-y-3">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              🧑💻 Next Steps in Demonstration
            </h3>
            <ol className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Click <strong>Start Emergency</strong> above</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Engine evaluates 3 routes (Route B is best)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold text-[10px]">3</span>
                <span>Signals switch 🔴 → 🟢 automatically</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold text-[10px]">4</span>
                <span>Hospital ER receives live ETA & preps bed</span>
              </li>
            </ol>

            <button
              onClick={() => setTab('routes')}
              className="w-full mt-2 py-2 px-3 bg-blue-900/40 hover:bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Route Calculation Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
