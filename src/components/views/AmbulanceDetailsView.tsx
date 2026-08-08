import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { ArrowLeft, Heart, Droplets, Activity, Thermometer, ShieldCheck, CheckCircle } from 'lucide-react';

export const AmbulanceDetailsView: React.FC = () => {
  const { setTab, ambulance } = useEmergency();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Header Bar matching Screen 4 in image */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab('dashboard')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Ambulance Details</h2>
            <p className="text-xs text-slate-500">Detailed information and status</p>
          </div>
        </div>

        <div>
          <span className="px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-extrabold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Active
          </span>
        </div>
      </div>

      {/* Top Section Card: Ambulance Image & Telemetry Grid */}
      <div className="white-card p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Left: Ambulance Graphic/Render */}
          <div className="md:col-span-1 bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col items-center justify-center">
            <div className="w-36 h-28 relative flex items-center justify-center">
              {/* Styled Vector Ambulance SVG */}
              <svg className="w-full h-full" viewBox="0 0 200 120">
                <rect x="20" y="40" width="120" height="50" rx="10" fill="#ef4444" />
                <path d="M 140 50 L 175 60 L 175 90 L 140 90 Z" fill="#dc2626" />
                <rect x="145" y="55" width="22" height="18" rx="3" fill="#93c5fd" />
                <circle cx="50" cy="90" r="14" fill="#1e293b" />
                <circle cx="50" cy="90" r="6" fill="#94a3b8" />
                <circle cx="145" cy="90" r="14" fill="#1e293b" />
                <circle cx="145" cy="90" r="6" fill="#94a3b8" />
                <rect x="65" y="55" width="30" height="8" rx="2" fill="#ffffff" />
                <rect x="76" y="44" width="8" height="30" rx="2" fill="#ffffff" />
                <circle cx="85" cy="34" r="5" fill="#3b82f6" className="animate-pulse" />
              </svg>
            </div>
            <p className="text-xs font-mono font-bold text-slate-700 mt-2">MODEL: MERCEDES SPRINTER ER</p>
          </div>

          {/* Right Info Grid matching image */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4 text-xs">
            
            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-semibold text-slate-400 block">Ambulance ID</span>
              <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">{ambulance.id}</span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-semibold text-slate-400 block">Driver</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block">Rohit Sharma</span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-semibold text-slate-400 block">Paramedic</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block">Anita Das</span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] font-semibold text-slate-400 block">Status</span>
              <span className="font-extrabold text-rose-600 text-sm mt-0.5 block">In Emergency</span>
            </div>

            <div className="col-span-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400">Last Updated</span>
              <span className="font-mono font-bold text-slate-700 text-xs">10:30 AM</span>
            </div>

          </div>

        </div>
      </div>

      {/* Middle Section: Vitals Monitor matching Screen 4 in image */}
      <div className="white-card p-6 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-500" />
          Vitals Monitor
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          {/* Heart Rate */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-rose-500">
              <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-slate-500">Heart Rate</span>
            </div>
            <p className="text-xl font-black text-slate-900 font-mono mt-1">
              96 <span className="text-xs font-normal text-slate-500">bpm</span>
            </p>
          </div>

          {/* SpO2 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-blue-500">
              <Droplets className="w-4 h-4 fill-blue-500" />
              <span className="text-[11px] font-semibold text-slate-500">SpO2</span>
            </div>
            <p className="text-xl font-black text-slate-900 font-mono mt-1">
              98 <span className="text-xs font-normal text-slate-500">%</span>
            </p>
          </div>

          {/* BP */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-purple-500">
              <Activity className="w-4 h-4" />
              <span className="text-[11px] font-semibold text-slate-500">BP</span>
            </div>
            <p className="text-xl font-black text-slate-900 font-mono mt-1">
              120/80 <span className="text-[10px] font-normal text-slate-500">mmHg</span>
            </p>
          </div>

          {/* Temperature */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-orange-500">
              <Thermometer className="w-4 h-4" />
              <span className="text-[11px] font-semibold text-slate-500">Temperature</span>
            </div>
            <p className="text-xl font-black text-slate-900 font-mono mt-1">
              98.6 <span className="text-xs font-normal text-slate-500">°F</span>
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Section: Equipment Status matching Screen 4 in image */}
      <div className="white-card p-6 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Equipment Status
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Ventilator', status: 'Available' },
            { label: 'Defibrillator', status: 'Available' },
            { label: 'Oxygen', status: 'Available' },
            { label: 'First Aid Kit', status: 'Available' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">{item.label}</span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
