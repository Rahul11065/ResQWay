import React, { useState } from 'react';
import { EmergencyProvider, useEmergency } from './context/EmergencyContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginPage } from './components/LoginPage';
import { DashboardView } from './components/views/DashboardView';
import { AmbulanceDetailsView } from './components/views/AmbulanceDetailsView';
import { LiveTrackingView } from './components/views/LiveTrackingView';
import { RouteAnalysisView } from './components/views/RouteAnalysisView';
import { HospitalDashboardView } from './components/views/HospitalDashboardView';
import { TrafficSignalsView } from './components/views/TrafficSignalsView';
import { AlertsView } from './components/views/AlertsView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { MasterDemoController } from './components/MasterDemoController';

const MainAppLayout: React.FC = () => {
  const { currentTab, appViewMode } = useEmergency();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex font-sans selection:bg-indigo-600 selection:text-white">
      {/* Sidebar Navigation matching image */}
      <Sidebar 
        mobileOpen={mobileSidebarOpen} 
        setMobileOpen={setMobileSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header Bar */}
        <TopHeader onOpenMobileMenu={() => setMobileSidebarOpen(true)} />

        {/* View Content Canvas */}
        <main className="flex-1 p-4 lg:p-8 space-y-6 pb-20">
          {appViewMode === 'login' ? (
            <LoginPage />
          ) : (
            <>
              {currentTab === 'dashboard' && <DashboardView />}
              {currentTab === 'ambulance' && <AmbulanceDetailsView />}
              {currentTab === 'tracking' && <LiveTrackingView />}
              {currentTab === 'routes' && <RouteAnalysisView />}
              {currentTab === 'hospital' && <HospitalDashboardView />}
              {currentTab === 'signals' && <TrafficSignalsView />}
              {currentTab === 'alerts' && <AlertsView />}
              {currentTab === 'reports' && <ReportsView />}
              {currentTab === 'settings' && <SettingsView />}
            </>
          )}
        </main>

        {/* Floating Master Demo Controller at bottom */}
        <MasterDemoController />

        {/* Clean Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-6 text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium">
              <span className="font-bold text-slate-900">ResQWay</span>
              <span>— Smart Ambulance & Intelligent Green Corridor System</span>
            </div>
            <p className="text-[11px] text-slate-400">© 2026 ResQWay Prototype. Designed for Emergency Operations.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { appViewMode } = useEmergency();

  if (appViewMode === 'welcome') {
    return <WelcomeScreen />;
  }

  return <MainAppLayout />;
};

export default function App() {
  return (
    <EmergencyProvider>
      <AppContent />
    </EmergencyProvider>
  );
}
