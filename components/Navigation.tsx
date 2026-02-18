import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  ClipboardCheck, 
  Database, 
  Mail, 
  GitFork, 
  ChevronRight,
  GraduationCap,
  Terminal,
  CircleDot,
  ChevronDown,
  Home,
  Lock,
  BarChart3,
  Layout
} from 'lucide-react';
import { NavigationSection } from '../types';

interface Props {
  activeSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
  unlockedSections: Record<NavigationSection, boolean>;
  progress: number;
}

const Navigation: React.FC<Props> = ({ activeSection, onNavigate, unlockedSections, progress }) => {
  const [journeyOpen, setJourneyOpen] = useState(false);

  const mainNavItems = [
    { id: NavigationSection.HOME, label: 'Página de inicio', icon: Home },
    { id: NavigationSection.DOCS, label: 'Documentación', icon: BookOpen },
    { id: NavigationSection.QUIZ, label: 'Test Inicial', icon: ClipboardCheck },
    { id: NavigationSection.VIDEOS, label: 'Vídeos Formativos', icon: Video },
    { id: NavigationSection.PRACTICAL_DE, label: 'Ejercicios DE', icon: Database },
    { id: NavigationSection.SQL, label: 'Módulo SQL', icon: Terminal },
    { id: NavigationSection.PRACTICAL_EMAIL, label: 'Ejercicios Emails', icon: Mail },
  ];

  const journeyItems = [
    { id: NavigationSection.JOURNEY_1, label: 'Ejercicio 1: Segmentación' },
    { id: NavigationSection.JOURNEY_2, label: 'Ejercicio 2: Quién es' },
    { id: NavigationSection.JOURNEY_3, label: 'Ejercicio 3: Qué se hace' },
    { id: NavigationSection.JOURNEY_4, label: 'Ejercicio 4: Test A/B' },
    { id: NavigationSection.JOURNEY_5, label: 'Ejercicio 5: Evento API' },
    { id: NavigationSection.JOURNEY_6, label: 'Ejercicio 6: Evento Automation' },
  ];

  const isJourneyActive = journeyItems.some(item => activeSection === item.id);
  const isJourneyLocked = !unlockedSections[NavigationSection.JOURNEY_1];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto hidden md:flex flex-col shrink-0">
      <div 
        onClick={() => onNavigate(NavigationSection.HOME)}
        className="p-6 border-b border-slate-100 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
      >
        <div className="bg-sf-blue p-2 rounded-lg text-white">
          <GraduationCap size={24} />
        </div>
        <h1 className="font-bold text-slate-800 text-lg leading-tight">SFMC Academy</h1>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1">
        <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Módulos</p>
        {mainNavItems.map((item) => {
          const isActive = activeSection === item.id;
          const isLocked = !unlockedSections[item.id];
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                isActive 
                  ? 'bg-sf-blue/10 text-sf-blue' 
                  : isLocked 
                    ? 'text-slate-300 cursor-not-allowed' 
                    : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {isLocked ? <Lock size={16} className="shrink-0" /> : <item.icon size={18} className="shrink-0" />}
              <span className="flex-1 text-left line-clamp-1">{item.label}</span>
            </button>
          );
        })}

        <div className="pt-2">
          <button
            onClick={() => setJourneyOpen(!journeyOpen)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
              isJourneyLocked ? 'text-slate-300 cursor-not-allowed' : (isJourneyActive ? 'text-sf-blue' : 'text-slate-600 hover:bg-slate-50')
            }`}
          >
            {isJourneyLocked ? <Lock size={16} className="shrink-0" /> : <GitFork size={18} className="shrink-0" />}
            <span className="flex-1 text-left">Ejercicios journey builder</span>
            {journeyOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {((journeyOpen || isJourneyActive) && !isJourneyLocked) && (
            <div className="mt-1 ml-6 border-l-2 border-slate-100 space-y-1 animate-in slide-in-from-top-2 duration-200">
              {journeyItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-r-lg transition-all text-xs font-medium ${
                      isActive 
                        ? 'bg-sf-blue/5 text-sf-blue' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <CircleDot size={12} className={isActive ? 'text-sf-blue' : 'text-slate-300'} />
                    <span className="flex-1 text-left line-clamp-1">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={() => onNavigate(NavigationSection.PRACTICAL_REPORTING)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
            activeSection === NavigationSection.PRACTICAL_REPORTING
              ? 'bg-sf-blue/10 text-sf-blue'
              : !unlockedSections[NavigationSection.PRACTICAL_REPORTING]
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          {!unlockedSections[NavigationSection.PRACTICAL_REPORTING] ? <Lock size={16} className="shrink-0" /> : <BarChart3 size={18} className="shrink-0" />}
          <span className="flex-1 text-left line-clamp-1">Ejercicios Reporting</span>
        </button>

        <button
          onClick={() => onNavigate(NavigationSection.PRACTICAL_LANDINGS)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
            activeSection === NavigationSection.PRACTICAL_LANDINGS
              ? 'bg-sf-blue/10 text-sf-blue'
              : !unlockedSections[NavigationSection.PRACTICAL_LANDINGS]
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          {!unlockedSections[NavigationSection.PRACTICAL_LANDINGS] ? <Lock size={16} className="shrink-0" /> : <Layout size={18} className="shrink-0" />}
          <span className="flex-1 text-left line-clamp-1">Ejercicios Landing Pages</span>
        </button>

        <div className="pt-6">
          <button
            onClick={() => onNavigate(NavigationSection.PROGRESS)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-bold ${
              activeSection === NavigationSection.PROGRESS 
                ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BarChart3 size={18} className="shrink-0" />
            <span className="flex-1 text-left">Mi Progreso</span>
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs text-slate-500">Global</p>
            <p className="text-xs font-bold text-sf-blue">{Math.round(progress)}%</p>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-sf-blue transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;