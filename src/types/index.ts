export type EmergencySeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM';

export interface PatientVitals {
  heartRate: number; // bpm
  bloodPressure: string; // e.g. "140/90"
  spO2: number; // %
  respirationRate: number; // bpm
  temperature: number; // °C
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  conditionCategory: 'Cardiac Emergency' | 'Severe Trauma' | 'Stroke' | 'Respiratory Distress' | 'Obstetric';
  chiefComplaint: string;
  vitals: PatientVitals;
  paramedicNotes: string;
}

export interface Ambulance {
  id: string; // e.g. WB-01-A102
  driverName: string;
  phone: string;
  currentLocationName: string;
  gpsCoords: { lat: number; lng: number };
  status: 'IDLE' | 'EN_ROUTE_DISPATCH' | 'GREEN_CORRIDOR_ACTIVE' | 'ARRIVED_HOSPITAL';
}

export interface RouteOption {
  id: 'route-a' | 'route-b' | 'route-c';
  name: string; // e.g. "EM Bypass Corridor"
  via: string; // e.g. "Via Sector V -> Salt Lake Bypass"
  distanceKm: number;
  trafficDensity: 'LOW' | 'MEDIUM' | 'HIGH';
  trafficDelayMin: number;
  redSignalCount: number;
  estTimeMin: number;
  score: number; // 0-100 calculated score
  isRecommended: boolean;
  color: string;
  highlights: string[];
  waypoints: { x: number; y: number }[]; // Canvas SVG percentage coords
}

export interface TrafficSignal {
  id: string;
  name: string;
  locationKm: number; // Distance along route
  normalState: 'RED' | 'GREEN' | 'YELLOW';
  currentState: 'RED' | 'GREEN' | 'YELLOW' | 'CORRIDOR_OVERRIDE';
  ambulanceDistanceMeters: number;
  etaSecondsToSignal: number;
  isOverridden: boolean;
  coords: { x: number; y: number };
}

export interface Hospital {
  id: string;
  name: string;
  locationName: string;
  coords: { lat: number; lng: number };
  erBayAvailable: boolean;
  icuBedsAvailable: number;
  specialistOnDuty: string; // e.g., "Dr. S. Roy (Cardiologist)"
  readinessChecklist: {
    erAlerted: boolean;
    specialistNotified: boolean;
    bedReserved: boolean;
    nursingAlerted: boolean;
    traumaBayPrepped: boolean;
    bloodBankStandingBy: boolean;
  };
}

export type UserRole = 'user' | 'driver' | 'hospital';

export interface UserAuth {
  role: UserRole;
  name: string;
  email: string;
}

export type TabType = 
  | 'dashboard'
  | 'ambulance'
  | 'tracking'
  | 'routes'
  | 'hospital'
  | 'signals'
  | 'alerts'
  | 'reports'
  | 'settings';

export interface EmergencyState {
  isActive: boolean;
  startTime: number | null;
  ambulance: Ambulance;
  patient: PatientInfo;
  hospital: Hospital;
  selectedRoute: RouteOption;
  availableRoutes: RouteOption[];
  signals: TrafficSignal[];
  progressPercent: number; // 0 to 100
  simSpeed: number; // 1x, 2x, 5x
  isPaused: boolean;
  logs: { timestamp: string; message: string; type: 'info' | 'warning' | 'alert' | 'success' }[];
  soundEnabled: boolean;
  currentTab: TabType;
}
