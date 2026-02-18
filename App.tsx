
import React, { useState, useEffect } from 'react';
import { NavigationSection, User, UserProgress } from './types';
import { 
  DOC_LINKS, 
  VIDEOS_DATA, 
  QUIZZES, 
  SQL_RESOURCES,
  SQL_EXERCISES,
  EMAIL_EXERCISES,
  EMAIL_EXERCISE_TEMPLATE,
  JOURNEY_EXERCISES_TEXT,
  REPORTING_EXERCISES_TEXT,
  LANDING_EXERCISES,
  LANDING_TEMPLATE,
  EMAIL_1_CORRECT_HTML,
  EMAIL_2_CORRECT_HTML,
  LANDING_1_CORRECT_HTML,
  LANDING_2_CORRECT_HTML,
  LANDING_3_CORRECT_HTML
} from './constants';
import Navigation from './components/Navigation';
import Quiz from './components/Quiz';
import ExerciseUploader from './components/ExerciseUploader';
import Registration from './components/Registration';
import ProgressView from './components/ProgressView';
import { 
  ExternalLink, 
  PlayCircle, 
  CheckCircle, 
  Circle,
  ArrowRight, 
  Book, 
  Terminal,
  ChevronRight,
  Info,
  Layers,
  Code,
  Mail,
  Home,
  Rocket,
  Shield,
  FileCode,
  HelpCircle,
  Target,
  Zap,
  Lock,
  X,
  Trophy,
  PartyPopper,
  Sparkles,
  Unlock,
  Video,
  ClipboardCheck,
  BarChart3,
  Layout
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<NavigationSection>(NavigationSection.HOME);
  const [currentSqlExercise, setCurrentSqlExercise] = useState(0);
  const [currentReportingExercise, setCurrentReportingExercise] = useState(0);
  
  const [progress, setProgress] = useState<UserProgress>({
    visitedVideos: [],
    visitedDocs: [],
    passedQuizzes: [],
    completedExercises: []
  });

  const [showLockModal, setShowLockModal] = useState<{show: boolean, msg: string}>({show: false, msg: ''});
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isFullyCompleted, setIsFullyCompleted] = useState(false);
  
  const [activeUnlockModal, setActiveUnlockModal] = useState<{section: NavigationSection, label: string} | null>(null);
  const [shownUnlocks, setShownUnlocks] = useState<NavigationSection[]>([]);

  // Persistence and Community Logic
  useEffect(() => {
    const savedUser = localStorage.getItem('sfmc_user');
    const savedProgress = localStorage.getItem('sfmc_progress');
    const savedShownUnlocks = localStorage.getItem('sfmc_shown_unlocks');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedShownUnlocks) setShownUnlocks(JSON.parse(savedShownUnlocks));
  }, []);

  // UI Weight calculations
  const totalWeight = DOC_LINKS.length + VIDEOS_DATA.length + Object.keys(QUIZZES).length + (SQL_EXERCISES.length + EMAIL_EXERCISES.length + Object.keys(JOURNEY_EXERCISES_TEXT).length + Object.keys(REPORTING_EXERCISES_TEXT).length + LANDING_EXERCISES.length + 1);
  const currentWeight = progress.visitedDocs.length + progress.visitedVideos.length + progress.passedQuizzes.length + progress.completedExercises.length;
  const progressPercent = totalWeight > 0 ? (currentWeight / totalWeight) * 100 : 0;

  useEffect(() => {
    if (user) {
      localStorage.setItem('sfmc_user', JSON.stringify(user));
      const community = JSON.parse(localStorage.getItem('sfmc_community') || '[]');
      const userIndex = community.findIndex((u: any) => u.email === user.email);
      const userRecord = { ...user, progress: progressPercent };
      
      if (userIndex > -1) community[userIndex] = userRecord;
      else community.push(userRecord);
      
      localStorage.setItem('sfmc_community', JSON.stringify(community));
    }
    if (progress) localStorage.setItem('sfmc_progress', JSON.stringify(progress));
    localStorage.setItem('sfmc_shown_unlocks', JSON.stringify(shownUnlocks));
  }, [user, progress, progressPercent, shownUnlocks]);

  useEffect(() => {
    if (progressPercent === 100 && !isFullyCompleted) {
      setIsFullyCompleted(true);
      setShowCompletionModal(true);
    }
  }, [progressPercent, isFullyCompleted]);

  const handleRegister = (name: string, email: string) => setUser({ name, email });

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => ({
      ...prev,
      visitedVideos: updates.visitedVideos ? Array.from(new Set([...prev.visitedVideos, ...updates.visitedVideos])) : prev.visitedVideos,
      visitedDocs: updates.visitedDocs ? Array.from(new Set([...prev.visitedDocs, ...updates.visitedDocs])) : prev.visitedDocs,
      passedQuizzes: updates.passedQuizzes ? Array.from(new Set([...prev.passedQuizzes, ...updates.passedQuizzes])) : prev.passedQuizzes,
      completedExercises: updates.completedExercises ? Array.from(new Set([...prev.completedExercises, ...updates.completedExercises])) : prev.completedExercises,
    }));
  };

  const unlockedSections: Record<NavigationSection, boolean> = {
    [NavigationSection.HOME]: true,
    [NavigationSection.DOCS]: true,
    [NavigationSection.VIDEOS]: true,
    [NavigationSection.PROGRESS]: true,
    [NavigationSection.SQL]: progress.visitedVideos.includes(4),
    [NavigationSection.PRACTICAL_DE]: progress.visitedVideos.includes(2) && progress.visitedVideos.includes(3),
    [NavigationSection.PRACTICAL_EMAIL]: [1,2,3,4,5,6,7].every(id => progress.visitedVideos.includes(id)),
    [NavigationSection.JOURNEY_1]: [1,2,3,4,5,6,7].every(id => progress.visitedVideos.includes(id)),
    [NavigationSection.JOURNEY_2]: [1,2,3,4,5,6,7].every(id => progress.visitedVideos.includes(id)),
    [NavigationSection.JOURNEY_3]: [1,2,3,4,5,6,7].every(id => progress.visitedVideos.includes(id)),
    [NavigationSection.JOURNEY_4]: [1,2,3,4,5,6,7].every(id => progress.visitedVideos.includes(id)),
    [NavigationSection.JOURNEY_5]: [1,2,3,4,5,6,7].every(id => progress.visitedVideos.includes(id)),
    [NavigationSection.JOURNEY_6]: [1,2,3,4,5,6,7].every(id => progress.visitedVideos.includes(id)),
    [NavigationSection.PRACTICAL_REPORTING]: progress.visitedVideos.includes(9) && progress.visitedVideos.includes(10),
    [NavigationSection.PRACTICAL_LANDINGS]: VIDEOS_DATA.every(v => progress.visitedVideos.includes(v.id)),
    [NavigationSection.QUIZ]: DOC_LINKS.every(doc => progress.visitedDocs.includes(doc.url))
  };

  // Logic to show unlock popups
  useEffect(() => {
    const potentialUnlocks = [
      { id: NavigationSection.PRACTICAL_DE, label: 'Ejercicios DE' },
      { id: NavigationSection.SQL, label: 'Módulo SQL' },
      { id: NavigationSection.PRACTICAL_EMAIL, label: 'Ejercicios Emails' },
      { id: NavigationSection.JOURNEY_1, label: 'Ejercicios Journey Builder' },
      { id: NavigationSection.PRACTICAL_REPORTING, label: 'Ejercicios Reporting' },
      { id: NavigationSection.PRACTICAL_LANDINGS, label: 'Ejercicios Landing Pages' },
      { id: NavigationSection.QUIZ, label: 'Test Inicial' },
    ];

    for (const item of potentialUnlocks) {
      if (unlockedSections[item.id] && !shownUnlocks.includes(item.id)) {
        setActiveUnlockModal(item);
        setShownUnlocks(prev => [...prev, item.id]);
        break; // Show one at a time
      }
    }
  }, [unlockedSections, shownUnlocks]);

  const handleNavigate = (section: NavigationSection) => {
    if (unlockedSections[section]) {
      setActiveSection(section);
      window.scrollTo(0, 0);
    } else {
      let message = "Módulo bloqueado.";
      if (section === NavigationSection.QUIZ) message = "Explora todos los enlaces en 'Documentación' primero.";
      else if (section === NavigationSection.SQL) message = "Mira el vídeo '3. SQL' primero.";
      else if (section === NavigationSection.PRACTICAL_DE) message = "Mira los vídeos de 'Segmentación' primero.";
      else if (section === NavigationSection.PRACTICAL_REPORTING) message = "Debes ver los vídeos de '8. Tracking' y '9. Reporting' primero.";
      else if (section === NavigationSection.PRACTICAL_LANDINGS) message = "Debes completar la visualización de todos los vídeos formativos.";
      else message = "Debes ver los primeros 7 vídeos formativos.";
      setShowLockModal({ show: true, msg: message });
    }
  };

  const getDocIcon = (type?: string, visited?: boolean) => {
    if (visited) return <CheckCircle className="text-green-500" size={20} />;
    switch (type) {
      case 'api': return <Zap className="text-amber-500" size={20} />;
      case 'code': return <FileCode className="text-blue-500" size={20} />;
      case 'help': return <HelpCircle className="text-green-500" size={20} />;
      case 'official': return <Shield className="text-sf-blue" size={20} />;
      case 'guide': return <Rocket className="text-purple-500" size={20} />;
      case 'learning': return <Target className="text-rose-500" size={20} />;
      default: return <Book className="text-slate-400" size={20} />;
    }
  };

  if (!user) return <Registration onRegister={handleRegister} />;

  const renderContent = () => {
    switch (activeSection) {
      case NavigationSection.HOME:
        return (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-sm">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sf-blue/10 text-sf-blue text-xs font-bold mb-6">
                  <Zap size={14} /> Bienvenido, {user.name}
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                  Domina <span className="text-sf-blue">Salesforce Marketing Cloud</span> de principio a fin.
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Tu plataforma centralizada para aprender, practicar y validar tus conocimientos en la herramienta líder de automatización de marketing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => handleNavigate(NavigationSection.DOCS)} className="px-6 py-3 bg-sf-blue text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-sf-blue/20">
                    Comenzar ahora
                  </button>
                  <button onClick={() => handleNavigate(NavigationSection.VIDEOS)} className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">
                    Ver vídeos
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-sf-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-sf-blue/10 text-sf-blue rounded-xl flex items-center justify-center mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Nuestro Objetivo</h3>
                <p className="text-slate-600 leading-relaxed">
                  Proporcionar un entorno de aprendizaje dinámico donde los especialistas en marketing y desarrolladores puedan adquirir habilidades prácticas en SFMC. 
                  Queremos que pases de la teoría a la implementación real mediante validación asistida por IA.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">¿Qué encontrarás aquí?</h3>
                <ul className="space-y-3">
                  {["Docs oficiales curados", "Ejercicios SQL interactivos", "Videos paso a paso", "Validación AMPscript", "Simulación Journey Builder"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                      <CheckCircle className="text-green-500" size={16} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case NavigationSection.DOCS:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-slate-800">Documentación Oficial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOC_LINKS.map((doc, idx) => {
                const isVisited = progress.visitedDocs.includes(doc.url);
                return (
                  <a 
                    key={idx} href={doc.url} target="_blank" rel="noopener noreferrer"
                    onClick={() => updateProgress({ visitedDocs: [doc.url] })}
                    className={`group bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full ${isVisited ? 'border-green-200' : 'border-slate-100 hover:border-sf-blue/50'}`}
                  >
                    <div className={`${isVisited ? 'bg-green-50' : 'bg-slate-50'} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors`}>
                      {getDocIcon(doc.iconType, isVisited)}
                    </div>
                    <h3 className={`font-bold text-slate-800 mb-3 group-hover:text-sf-blue transition-colors text-sm ${isVisited ? 'text-green-800' : ''}`}>{doc.title}</h3>
                    <p className="text-xs text-slate-500 mb-6 flex-1">{doc.description}</p>
                    <div className={`flex items-center font-bold text-[10px] gap-1 uppercase tracking-wider ${isVisited ? 'text-green-600' : 'text-sf-blue'}`}>
                      {isVisited ? 'Documentación Revisada' : 'Explorar documentación'} <ExternalLink size={12} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        );

      case NavigationSection.SQL:
        const sqlEx = SQL_EXERCISES[currentSqlExercise];
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {SQL_EXERCISES.map((_, i) => (
                <button
                  key={i} onClick={() => setCurrentSqlExercise(i)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${currentSqlExercise === i ? 'bg-sf-blue text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <span className="px-2 py-1 bg-sf-blue/10 text-sf-blue text-[10px] font-bold rounded uppercase mb-4 inline-block">{sqlEx.level}</span>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">{sqlEx.title}</h3>
                  <p className="text-sm text-slate-600 mb-6">{sqlEx.task}</p>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800 italic">Pista: {sqlEx.hint}</div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <ExerciseUploader 
                  type="SQL" title="Consola SQL" description={`Ejercicio ${sqlEx.id}`}
                  onGraded={(res) => res.score >= 7 && updateProgress({ completedExercises: [`SQL_${sqlEx.id}`] })}
                />
              </div>
            </div>
          </div>
        );

      case NavigationSection.PRACTICAL_DE:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-4xl mx-auto">
              <h3 className="font-bold text-sf-blue mb-4">Requisitos de la Data Extension</h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li>1. Nombre: <strong>Master_Subscribers</strong></li>
                <li>2. Campos: <strong>SubscriberKey</strong> (PK, Texto), <strong>Email</strong> (Email), <strong>Nombre</strong> (Texto).</li>
                <li>3. Configuración: Marcar como <strong>Is Sendable</strong>.</li>
              </ul>
            </div>
            <ExerciseUploader 
              type="DATA_EXTENSION" title="Captura de DE" description="Sube la captura de la pestaña 'Fields'"
              onGraded={(res) => res.score >= 7 && updateProgress({ completedExercises: ['DATA_EXTENSION'] })}
            />
          </div>
        );

      case NavigationSection.PRACTICAL_EMAIL:
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {EMAIL_EXERCISES.map(email => (
                <div key={email.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col group hover:border-sf-blue/30">
                  <div className="bg-sf-blue/5 w-10 h-10 rounded-lg flex items-center justify-center text-sf-blue mb-4"><Mail size={20} /></div>
                  <h3 className="font-bold text-slate-800 mb-2">{email.title}</h3>
                  <p className="text-xs text-slate-500 mb-6 flex-1">{email.description}</p>
                  <a href={email.docUrl} target="_blank" className="text-xs font-bold text-sf-blue hover:underline">Acceder a recursos Email {email.id} →</a>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <a 
                href={EMAIL_EXERCISE_TEMPLATE} 
                target="_blank" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-sf-blue/20"
              >
                Acceder a plantilla base de HTML <ExternalLink size={18} />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-full">
              <div className="space-y-4">
                <div className="max-w-4xl mx-auto px-4">
                  <h3 className="text-xl font-bold text-slate-800 border-l-4 border-sf-blue pl-4">Validación Email 1</h3>
                </div>
                <ExerciseUploader 
                  type="EMAIL" title="Evaluación Email 1" description="Pega tu código HTML para validar la estructura del Email 1"
                  expectedContent={EMAIL_1_CORRECT_HTML}
                  onGraded={(res) => res.score >= 90 && updateProgress({ completedExercises: ['EMAIL_1'] })}
                />
              </div>

              <div className="space-y-4">
                <div className="max-w-4xl mx-auto px-4">
                  <h3 className="text-xl font-bold text-slate-800 border-l-4 border-rose-500 pl-4">Validación Email 2</h3>
                </div>
                <ExerciseUploader 
                  type="EMAIL" title="Evaluación Email 2" description="Pega tu código HTML para validar la estructura del Email 2"
                  expectedContent={EMAIL_2_CORRECT_HTML}
                  onGraded={(res) => res.score >= 90 && updateProgress({ completedExercises: ['EMAIL_2'] })}
                />
              </div>
            </div>
          </div>
        );

      case NavigationSection.PROGRESS:
        return <ProgressView progress={progress} />;

      case NavigationSection.JOURNEY_1: 
      case NavigationSection.JOURNEY_2: 
      case NavigationSection.JOURNEY_3: 
      case NavigationSection.JOURNEY_4: 
      case NavigationSection.JOURNEY_5: 
      case NavigationSection.JOURNEY_6: 
        const jKey = (activeSection || '').toUpperCase().replace('-', '_') as keyof typeof JOURNEY_EXERCISES_TEXT;
        const jData = JOURNEY_EXERCISES_TEXT[jKey];
        const jNumber = activeSection.split('-')[1];
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-4xl mx-auto">
              <h3 className="font-bold text-sf-blue mb-4">Enunciado Journey {jNumber}</h3>
              <ul className="space-y-4 text-slate-700 text-sm">
                {jData?.content.map((c, i) => <li key={i} className="flex gap-3"><span className="font-bold text-sf-blue">{i+1}.</span>{c}</li>)}
              </ul>
            </div>
            <ExerciseUploader 
              key={jKey}
              type="JOURNEY" 
              title="Entrega de Journey" 
              description="Sube captura del flujo configurado"
              expectedContent={jData?.ref}
              onGraded={(res) => res.score >= 90 && updateProgress({ completedExercises: [jKey] })}
            />
          </div>
        );

      case NavigationSection.PRACTICAL_REPORTING:
        const rKeys = Object.keys(REPORTING_EXERCISES_TEXT) as (keyof typeof REPORTING_EXERCISES_TEXT)[];
        const rKey = rKeys[currentReportingExercise];
        const rData = REPORTING_EXERCISES_TEXT[rKey];
        return (
          <div className="space-y-12 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {rKeys.map((_, i) => (
                <button
                  key={i} onClick={() => setCurrentReportingExercise(i)}
                  className={`px-8 h-14 rounded-2xl font-black text-lg transition-all border-2 ${currentReportingExercise === i ? 'bg-sf-blue text-white border-sf-blue scale-105' : 'bg-white text-slate-400 border-slate-100 hover:border-sf-blue/30'}`}
                >
                  EJERCICIO {i + 1}
                </button>
              ))}
            </div>
            <div className="max-w-4xl mx-auto">
              {rData.content.map((partText, partIdx) => (
                <div key={partIdx} className="space-y-6 mb-16">
                   <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-3 h-full bg-sf-blue"></div>
                      <div className="mb-6 inline-flex px-6 py-2 bg-sf-blue/10 text-sf-blue rounded-full text-sm font-black uppercase tracking-widest border border-sf-blue/20">
                        Parte {partIdx + 1}
                      </div>
                      <p className="text-slate-800 text-lg font-bold leading-relaxed">{partText}</p>
                   </div>
                   <ExerciseUploader 
                      type="REPORTING" 
                      title={`Entrega Parte ${partIdx + 1}`} 
                      description="Sube la evidencia solicitada (Captura o SQL)"
                      onGraded={(res) => res.score >= 7 && updateProgress({ completedExercises: [`${rKey}_PART_${partIdx + 1}`] })}
                    />
                </div>
              ))}
            </div>
          </div>
        );

      case NavigationSection.PRACTICAL_LANDINGS:
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ejercicios Landing Pages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {LANDING_EXERCISES.map(landing => (
                <div key={landing.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col group hover:border-sf-blue/30">
                  <div className="bg-sf-blue/5 w-10 h-10 rounded-lg flex items-center justify-center text-sf-blue mb-4"><Layout size={20} /></div>
                  <h3 className="font-bold text-slate-800 mb-2">{landing.title}</h3>
                  <p className="text-xs text-slate-500 mb-6 flex-1">{landing.description}</p>
                  <a href={landing.docUrl} target="_blank" className="text-xs font-bold text-sf-blue hover:underline">Acceder a materiales Landing {landing.id} →</a>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <a 
                href={LANDING_TEMPLATE} 
                target="_blank" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all shadow-lg shadow-purple-500/20"
              >
                Acceder a plantilla base de Landing <ExternalLink size={18} />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-full">
              <div className="space-y-4">
                <div className="max-w-4xl mx-auto px-4">
                  <h3 className="text-xl font-bold text-slate-800 border-l-4 border-sf-blue pl-4">Validación Landing 1</h3>
                </div>
                <ExerciseUploader 
                  type="LANDING" title="Evaluación Landing 1" description="Pega tu código HTML para validar la Landing 1"
                  expectedContent={LANDING_1_CORRECT_HTML}
                  onGraded={(res) => res.score >= 90 && updateProgress({ completedExercises: ['LANDING_1'] })}
                />
              </div>

              <div className="space-y-4">
                <div className="max-w-4xl mx-auto px-4">
                  <h3 className="text-xl font-bold text-slate-800 border-l-4 border-rose-500 pl-4">Validación Landing 2</h3>
                </div>
                <ExerciseUploader 
                  type="LANDING" title="Evaluación Landing 2" description="Pega tu código HTML para validar la Landing 2"
                  expectedContent={LANDING_2_CORRECT_HTML}
                  onGraded={(res) => res.score >= 90 && updateProgress({ completedExercises: ['LANDING_2'] })}
                />
              </div>

              <div className="space-y-4">
                <div className="max-w-4xl mx-auto px-4">
                  <h3 className="text-xl font-bold text-slate-800 border-l-4 border-amber-500 pl-4">Validación Landing 3</h3>
                </div>
                <ExerciseUploader 
                  type="LANDING" title="Evaluación Landing 3" description="Pega tu código HTML para validar la Landing 3"
                  expectedContent={LANDING_3_CORRECT_HTML}
                  onGraded={(res) => res.score >= 90 && updateProgress({ completedExercises: ['LANDING_3'] })}
                />
              </div>
            </div>
          </div>
        );

      case NavigationSection.VIDEOS:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Nº</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Título y Descripción</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {VIDEOS_DATA.map((video) => {
                    const isVisited = progress.visitedVideos.includes(video.id);
                    return (
                      <tr key={video.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-400 text-sm whitespace-nowrap">Video {video.id}</td>
                        <td className="px-6 py-4">
                          <div className={`font-semibold text-sm mb-1 ${isVisited ? 'text-green-700' : 'text-slate-800'}`}>{video.title}</div>
                          <div className="text-xs text-slate-500 leading-relaxed">{video.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <a href={video.url} target="_blank" onClick={() => updateProgress({ visitedVideos: [video.id] })} className={`flex items-center gap-2 text-xs font-bold ${isVisited ? 'text-green-600' : 'text-sf-blue'} hover:underline`}>
                            {isVisited ? <CheckCircle size={14} /> : <PlayCircle size={14} />} {isVisited ? 'Vídeo Visto' : 'Ver Vídeo'}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );

      case NavigationSection.QUIZ:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <Quiz questions={QUIZZES.GENERAL} onComplete={(passed) => passed && updateProgress({ passedQuizzes: ['GENERAL'] })} />
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} unlockedSections={unlockedSections} progress={progressPercent} />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-8 sticky top-0 z-20">
          <div className="flex-1">
            <nav className="flex items-center text-[10px] font-medium text-slate-400 gap-2">
              <span>SFMC Academy</span>
              <ChevronRight size={10} />
              <span className="text-slate-800 capitalize">{(activeSection || '').replace('-', ' ')}</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-50 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 border border-slate-100">{user.email}</div>
            <div className="w-8 h-8 rounded-full bg-sf-blue text-white flex items-center justify-center font-bold text-xs">{user.name.charAt(0).toUpperCase()}</div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">{renderContent()}</div>
      </main>

      {activeUnlockModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] p-10 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-sf-blue" />
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sf-blue/10 text-sf-blue rounded-3xl mb-6"><Unlock size={40} /></div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">¡Enhorabuena!</h2>
            <p className="text-slate-600 mb-8 font-medium">Has desbloqueado el apartado de <span className="text-sf-blue font-bold">{activeUnlockModal.label}</span>.</p>
            <button onClick={() => setActiveUnlockModal(null)} className="w-full py-4 bg-sf-blue text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:bg-sf-blue/90 transition-all">Continuar <ArrowRight size={20} /></button>
          </div>
        </div>
      )}

      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-indigo-900/90 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white rounded-[40px] p-12 max-w-2xl w-full text-center shadow-2xl relative overflow-hidden animate-in zoom-in-90 duration-500">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sf-blue via-indigo-500 to-purple-500" />
            <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-100 text-amber-600 rounded-full mb-8 relative"><Trophy size={48} /></div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">¡Enhorabuena, {user.name}!</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">Has completado el 100% del programa de formación.</p>
            <button onClick={() => setShowCompletionModal(false)} className="w-full py-4 bg-sf-blue text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3"><PartyPopper size={24} /> Continuar explorando</button>
          </div>
        </div>
      )}

      {showLockModal.show && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6"><div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center"><Lock size={24} /></div><button onClick={() => setShowLockModal({show: false, msg: ''})} className="text-slate-400"><X size={20}/></button></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Sección Bloqueada</h3>
            <p className="text-slate-600 mb-8">{showLockModal.msg}</p>
            <button onClick={() => setShowLockModal({show: false, msg: ''})} className="w-full py-4 bg-sf-blue text-white rounded-xl font-bold">Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
