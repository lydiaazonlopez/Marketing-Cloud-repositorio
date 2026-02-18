
import React, { useEffect, useState } from 'react';
import { UserProgress } from '../types';
import { 
  DOC_LINKS, 
  VIDEOS_DATA, 
  QUIZZES, 
  SQL_EXERCISES, 
  EMAIL_EXERCISES, 
  JOURNEY_EXERCISES_TEXT 
} from '../constants';
import { CheckCircle2, Trophy, Users, Star, Target, Sparkles, UserCircle } from 'lucide-react';

interface Props {
  progress: UserProgress;
}

const ProgressView: React.FC<Props> = ({ progress }) => {
  const [community, setCommunity] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('sfmc_community') || '[]');
    setCommunity(data.sort((a: any, b: any) => b.progress - a.progress));
  }, []);

  const totalDocs = DOC_LINKS.length;
  const totalVideos = VIDEOS_DATA.length;
  const totalQuizzes = Object.keys(QUIZZES).length;
  const totalExercises = SQL_EXERCISES.length + EMAIL_EXERCISES.length + Object.keys(JOURNEY_EXERCISES_TEXT).length + 1;

  const stats = [
    { label: 'Teoría (Docs)', current: progress.visitedDocs.length, total: totalDocs, color: 'bg-blue-500' },
    { label: 'Vídeo Tutoriales', current: progress.visitedVideos.length, total: totalVideos, color: 'bg-purple-500' },
    { label: 'Validaciones Test', current: progress.passedQuizzes.length, total: totalQuizzes, color: 'bg-green-500' },
    { label: 'Casos Prácticos', current: progress.completedExercises.length, total: totalExercises, color: 'bg-amber-500' },
  ];

  const overallProgress = (stats.reduce((acc, s) => acc + s.current, 0) / stats.reduce((acc, s) => acc + s.total, 0)) * 100;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3"><Target className="text-sf-blue" /> Desglose de Habilidades</h3>
              <div className="space-y-6 mt-8">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-700">{stat.label}</span>
                      <span className="text-xs font-bold text-slate-400">{stat.current} / {stat.total}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${(stat.current / stat.total) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Reduced trophy size from 64 to 32 and moved to the corner */}
            <div className="absolute top-6 right-6 p-2 text-sf-blue/20"><Trophy size={32} /></div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Users className="text-sf-blue" size={20} /> Comunidad de Alumnos</h3>
            <div className="space-y-3">
              {community.length > 0 ? community.map((u: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-sf-blue"><UserCircle size={24} /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{u.name}</p>
                      <p className="text-[10px] text-slate-400">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-sf-blue">{Math.round(u.progress)}%</p>
                    <div className="w-24 h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-sf-blue" style={{ width: `${u.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-slate-400 text-center py-4 text-sm">Aún no hay más miembros registrados.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-sf-blue p-8 rounded-3xl text-white shadow-lg shadow-sf-blue/20 relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4"><Users size={20} className="text-blue-200" /><span className="text-sm font-bold opacity-80 uppercase tracking-widest">Global</span></div>
                <p className="text-3xl font-extrabold mb-1">{Math.round(overallProgress)}%</p>
                <p className="text-xs opacity-70 mb-6 leading-relaxed">Tu progreso total verificado.</p>
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white" style={{ width: `${overallProgress}%` }}></div></div>
             </div>
             <div className="absolute -bottom-8 -right-8 opacity-10"><Sparkles size={160} /></div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <h4 className="font-bold text-slate-800 mb-4 text-sm">Estado de Logros</h4>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Teoría', active: progress.visitedDocs.length === totalDocs },
                  { label: 'Vídeos', active: progress.visitedVideos.length === totalVideos },
                  { label: 'Tests', active: progress.passedQuizzes.length > 0 },
                  { label: 'Práctica', active: progress.completedExercises.length > 0 },
                ].map((l, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-center transition-all ${l.active ? 'bg-green-50 border-green-200 text-green-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <CheckCircle2 size={16} className="mx-auto mb-1" />
                    <span className="text-[10px] font-bold uppercase">{l.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
