import type { Ambulance, Hospital, PatientInfo, RouteOption, TrafficSignal } from '../types';

export const INITIAL_AMBULANCE: Ambulance = {
  id: 'WB-01-A102',
  driverName: 'Rajesh Kumar',
  phone: '+91 98301 44210',
  currentLocationName: 'Sector V, Salt Lake (Tech Hub)',
  gpsCoords: { lat: 22.5726, lng: 88.4331 },
  status: 'IDLE',
};

export const INITIAL_PATIENT: PatientInfo = {
  name: 'Anish Mukherjee',
  age: 54,
  gender: 'Male',
  conditionCategory: 'Cardiac Emergency',
  chiefComplaint: 'Acute chest pain radiating to left arm, dyspnea & diaphoresis.',
  vitals: {
    heartRate: 124,
    bloodPressure: '158/96',
    spO2: 91,
    respirationRate: 24,
    temperature: 37.2,
  },
  paramedicNotes: 'ECG indicates ST-elevation in lead II, III & aVF. IV line established, 300mg Aspirin administered.',
};

export const INITIAL_HOSPITAL: Hospital = {
  id: 'HOSP-APOLLO-01',
  name: 'Apollo Gleneagles Hospital',
  locationName: '58 Canal Circular Road, Kadamgachi',
  coords: { lat: 22.5786, lng: 88.4012 },
  erBayAvailable: true,
  icuBedsAvailable: 3,
  specialistOnDuty: 'Dr. S. Roy (Senior Interventional Cardiologist)',
  readinessChecklist: {
    erAlerted: true,
    specialistNotified: true,
    bedReserved: true,
    nursingAlerted: true,
    traumaBayPrepped: false,
    bloodBankStandingBy: false,
  },
};

export const ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'route-a',
    name: 'Route A — Direct Central Avenue',
    via: 'Via Main Salt Lake Bypass & Karunamoyee Junction',
    distanceKm: 5.2,
    trafficDensity: 'HIGH',
    trafficDelayMin: 8,
    redSignalCount: 4,
    estTimeMin: 18,
    score: 45,
    isRecommended: false,
    color: '#ef4444', // Red
    highlights: ['Shortest geographic length', 'Heavy peak hour congestion', '4 major signal halts'],
    waypoints: [
      { x: 10, y: 70 },
      { x: 25, y: 55 },
      { x: 45, y: 50 },
      { x: 70, y: 45 },
      { x: 90, y: 30 },
    ],
  },
  {
    id: 'route-b',
    name: 'Route B — Smart Corridor (Recommended)',
    via: 'Via New Town Express Corridor & Ring Road flyover',
    distanceKm: 6.4,
    trafficDensity: 'LOW',
    trafficDelayMin: 1,
    redSignalCount: 1,
    estTimeMin: 11,
    score: 94,
    isRecommended: true,
    color: '#10b981', // Emerald Green
    highlights: ['Lowest estimated emergency travel time', 'Low congestion density', 'Only 1 signal (Automated Override enabled)'],
    waypoints: [
      { x: 10, y: 70 },
      { x: 20, y: 85 },
      { x: 50, y: 80 },
      { x: 80, y: 60 },
      { x: 90, y: 30 },
    ],
  },
  {
    id: 'route-c',
    name: 'Route C — EM Bypass Outer Link',
    via: 'Via Chingrighata Flyover & Nicco Park Road',
    distanceKm: 4.8,
    trafficDensity: 'MEDIUM',
    trafficDelayMin: 5,
    redSignalCount: 3,
    estTimeMin: 15,
    score: 68,
    isRecommended: false,
    color: '#f59e0b', // Amber
    highlights: ['Moderate traffic flow', '3 traffic signals', 'Construction work at Nicco Park junction'],
    waypoints: [
      { x: 10, y: 70 },
      { x: 30, y: 30 },
      { x: 60, y: 35 },
      { x: 75, y: 25 },
      { x: 90, y: 30 },
    ],
  },
];

export const INITIAL_TRAFFIC_SIGNALS: TrafficSignal[] = [
  {
    id: 'SIG-1',
    name: 'Junction 1: Wipro Circle Signal',
    locationKm: 1.2,
    normalState: 'RED',
    currentState: 'RED',
    ambulanceDistanceMeters: 1200,
    etaSecondsToSignal: 90,
    isOverridden: false,
    coords: { x: 25, y: 84 },
  },
  {
    id: 'SIG-2',
    name: 'Junction 2: Eco Park Outer Crossing',
    locationKm: 3.1,
    normalState: 'RED',
    currentState: 'RED',
    ambulanceDistanceMeters: 3100,
    etaSecondsToSignal: 220,
    isOverridden: false,
    coords: { x: 52, y: 79 },
  },
  {
    id: 'SIG-3',
    name: 'Junction 3: Chinar Park Flyover Gate',
    locationKm: 4.8,
    normalState: 'YELLOW',
    currentState: 'YELLOW',
    ambulanceDistanceMeters: 4800,
    etaSecondsToSignal: 340,
    isOverridden: false,
    coords: { x: 76, y: 64 },
  },
  {
    id: 'SIG-4',
    name: 'Junction 4: Apollo Emergency Entry',
    locationKm: 6.1,
    normalState: 'RED',
    currentState: 'RED',
    ambulanceDistanceMeters: 6100,
    etaSecondsToSignal: 450,
    isOverridden: false,
    coords: { x: 87, y: 38 },
  },
];
