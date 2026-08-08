import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { EmergencyState, RouteOption, TrafficSignal, EmergencySeverity, UserRole, UserAuth } from '../types';
import { INITIAL_AMBULANCE, INITIAL_HOSPITAL, INITIAL_PATIENT, INITIAL_TRAFFIC_SIGNALS, ROUTE_OPTIONS } from '../data/mockData';

export type AppViewMode = 'welcome' | 'login' | 'app';

interface EmergencyContextType extends EmergencyState {
  appViewMode: AppViewMode;
  userAuth: UserAuth | null;
  setAppViewMode: (mode: AppViewMode) => void;
  loginRole: (role: UserRole, name?: string, email?: string) => void;
  logout: () => void;
  startEmergency: (severity: EmergencySeverity) => void;
  pauseEmergency: () => void;
  resumeEmergency: () => void;
  resetEmergency: () => void;
  selectRoute: (routeId: string) => void;
  toggleSignalOverride: (signalId: string) => void;
  updateReadinessItem: (key: keyof EmergencyState['hospital']['readinessChecklist'], val: boolean) => void;
  setSimSpeed: (speed: number) => void;
  setTab: (tab: EmergencyState['currentTab']) => void;
  toggleSound: () => void;
  triggerAudioBeep: (frequency?: number, type?: OscillatorType) => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appViewMode, setAppViewMode] = useState<AppViewMode>('welcome');
  const [userAuth, setUserAuth] = useState<UserAuth | null>(null);

  const loginRole = (role: UserRole, name?: string, email?: string) => {
    let defaultName = 'Citizen User';
    let defaultEmail = 'user@resqway.org';
    if (role === 'driver') {
      defaultName = 'Rohit Sharma (Ambulance Driver)';
      defaultEmail = 'driver.wb01@resqway.org';
    } else if (role === 'hospital') {
      defaultName = 'Dr. S. Roy (Belle Vue Hospital Admin)';
      defaultEmail = 'admin@bellevue.org';
    }
    setUserAuth({
      role,
      name: name || defaultName,
      email: email || defaultEmail,
    });
    if (role === 'driver') {
      setCurrentTab('tracking');
    } else if (role === 'hospital') {
      setCurrentTab('hospital');
    } else {
      setCurrentTab('dashboard');
    }
    setAppViewMode('app');
  };

  const logout = () => {
    setUserAuth(null);
    setAppViewMode('login');
  };
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [ambulance, setAmbulance] = useState(INITIAL_AMBULANCE);
  const [patient] = useState(INITIAL_PATIENT);
  const [hospital, setHospital] = useState(INITIAL_HOSPITAL);
  const [availableRoutes] = useState<RouteOption[]>(ROUTE_OPTIONS);

  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(ROUTE_OPTIONS[1]); // Route B default
  const [signals, setSignals] = useState<TrafficSignal[]>(INITIAL_TRAFFIC_SIGNALS);
  const [progressPercent, setProgressPercent] = useState(0);
  const [simSpeed, setSimSpeedState] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTab, setCurrentTab] = useState<EmergencyState['currentTab']>('dashboard');
  const [logs, setLogs] = useState<EmergencyState['logs']>([
    {
      timestamp: new Date().toLocaleTimeString(),
      message: 'System Initialized. ResQWay Smart Corridor Standby.',
      type: 'info',
    },
  ]);

  const addLog = useCallback((message: string, type: 'info' | 'warning' | 'alert' | 'success' = 'info') => {
    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        message,
        type,
      },
      ...prev.slice(0, 49),
    ]);
  }, []);

  // Web Audio API helper for sound alerts
  const triggerAudioBeep = useCallback((frequency = 880, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio context fallback ignored if not allowed by browser autoplay
    }
  }, [soundEnabled]);

  const startEmergency = (severity: EmergencySeverity) => {
    setIsActive(true);
    setIsPaused(false);
    setStartTime(Date.now());
    setProgressPercent(0);
    setAmbulance((prev) => ({ ...prev, status: 'GREEN_CORRIDOR_ACTIVE' }));
    
    // Automatically auto-check ER notification on start
    setHospital((prev) => ({
      ...prev,
      readinessChecklist: {
        erAlerted: true,
        specialistNotified: true,
        bedReserved: true,
        nursingAlerted: true,
        traumaBayPrepped: false,
        bloodBankStandingBy: false,
      },
    }));

    addLog(`🚨 EMERGENCY DISPATCH ACTIVATED! Ambulance ${ambulance.id} en route to ${hospital.name} [Severity: ${severity}]`, 'alert');
    addLog(`🧠 Smart Route Engine selected: ${selectedRoute.name} (${selectedRoute.via})`, 'success');
    addLog(`🚦 Transmitting signal corridor lock requests to 4 upcoming intersections...`, 'info');
    triggerAudioBeep(660, 'sawtooth');
  };

  const pauseEmergency = () => {
    setIsPaused(true);
    addLog('Simulation Paused.', 'warning');
  };

  const resumeEmergency = () => {
    setIsPaused(false);
    addLog('Simulation Resumed.', 'info');
  };

  const resetEmergency = () => {
    setIsActive(false);
    setIsPaused(false);
    setStartTime(null);
    setProgressPercent(0);
    setAmbulance(INITIAL_AMBULANCE);
    setHospital(INITIAL_HOSPITAL);
    setSignals(INITIAL_TRAFFIC_SIGNALS);
    addLog('System Reset. Ready for next emergency simulation.', 'info');
  };

  const selectRoute = (routeId: string) => {
    const found = availableRoutes.find((r) => r.id === routeId);
    if (found) {
      setSelectedRoute(found);
      addLog(`Route changed to: ${found.name}`, 'info');
    }
  };

  const toggleSignalOverride = (signalId: string) => {
    setSignals((prev) =>
      prev.map((sig) => {
        if (sig.id === signalId) {
          const newState = sig.currentState === 'CORRIDOR_OVERRIDE' || sig.currentState === 'GREEN' ? 'RED' : 'CORRIDOR_OVERRIDE';
          addLog(`Manual Override triggered on ${sig.name}: Light changed to ${newState}`, 'warning');
          return {
            ...sig,
            currentState: newState,
            isOverridden: newState === 'CORRIDOR_OVERRIDE',
          };
        }
        return sig;
      })
    );
    triggerAudioBeep(1200, 'sine');
  };

  const updateReadinessItem = (key: keyof EmergencyState['hospital']['readinessChecklist'], val: boolean) => {
    setHospital((prev) => ({
      ...prev,
      readinessChecklist: {
        ...prev.readinessChecklist,
        [key]: val,
      },
    }));
    addLog(`Hospital Preparation Updated: ${key} = ${val ? 'READY' : 'PENDING'}`, 'info');
  };

  const setSimSpeed = (speed: number) => {
    setSimSpeedState(speed);
    addLog(`Simulation speed updated to ${speed}x`, 'info');
  };

  const setTab = (tab: EmergencyState['currentTab']) => {
    setCurrentTab(tab);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // Main simulation loop ticker
  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setProgressPercent((prevProgress) => {
        const nextProgress = prevProgress + 0.8 * simSpeed;

        if (nextProgress >= 100) {
          setIsActive(false);
          setAmbulance((prev) => ({ ...prev, status: 'ARRIVED_HOSPITAL' }));
          setHospital((prev) => ({
            ...prev,
            readinessChecklist: {
              erAlerted: true,
              specialistNotified: true,
              bedReserved: true,
              nursingAlerted: true,
              traumaBayPrepped: true,
              bloodBankStandingBy: true,
            },
          }));
          addLog(`🏥 AMBULANCE ARRIVED AT ${hospital.name}! Green Corridor trip completed safely.`, 'success');
          triggerAudioBeep(1046.5, 'sine'); // High C
          return 100;
        }

        // Update signals based on ambulance distance
        const totalDistanceMeters = selectedRoute.distanceKm * 1000;
        const currentDistanceMeters = (nextProgress / 100) * totalDistanceMeters;

        setSignals((prevSignals) =>
          prevSignals.map((signal) => {
            const signalPosMeters = signal.locationKm * 1000;
            const distanceToSignal = signalPosMeters - currentDistanceMeters;
            const etaSec = Math.max(0, Math.round(distanceToSignal / 18)); // ~65km/h

            // If ambulance is within 500m of signal and signal isn't green yet -> trigger automatic green corridor!
            let newState = signal.currentState;
            let newlyOverridden = signal.isOverridden;

            if (distanceToSignal <= 500 && distanceToSignal > -100) {
              if (signal.currentState !== 'CORRIDOR_OVERRIDE') {
                newState = 'CORRIDOR_OVERRIDE';
                newlyOverridden = true;
                addLog(`🚦 GREEN CORRIDOR AUTOMATION: ${signal.name} switched to 🟢 GREEN! (Ambulance ${Math.round(distanceToSignal)}m away)`, 'alert');
                triggerAudioBeep(880, 'triangle');
              }
            } else if (distanceToSignal <= -100) {
              // After ambulance passes signal, revert back to normal red/yellow
              if (signal.currentState === 'CORRIDOR_OVERRIDE') {
                newState = signal.normalState;
                newlyOverridden = false;
                addLog(`🚦 ${signal.name} ambulance cleared -> Reverting light back to standard signal cycle.`, 'info');
              }
            }

            return {
              ...signal,
              ambulanceDistanceMeters: Math.round(distanceToSignal),
              etaSecondsToSignal: etaSec,
              currentState: newState,
              isOverridden: newlyOverridden,
            };
          })
        );

        return nextProgress;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isActive, isPaused, simSpeed, selectedRoute.distanceKm, hospital.name, addLog, triggerAudioBeep]);

  return (
    <EmergencyContext.Provider
      value={{
        appViewMode,
        userAuth,
        setAppViewMode,
        loginRole,
        logout,
        isActive,
        isPaused,
        startTime,
        ambulance,
        patient,
        hospital,
        selectedRoute,
        availableRoutes,
        signals,
        progressPercent,
        simSpeed,
        logs,
        soundEnabled,
        currentTab,
        startEmergency,
        pauseEmergency,
        resumeEmergency,
        resetEmergency,
        selectRoute,
        toggleSignalOverride,
        updateReadinessItem,
        setSimSpeed,
        setTab,
        toggleSound,
        triggerAudioBeep,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) throw new Error('useEmergency must be used within an EmergencyProvider');
  return context;
};
