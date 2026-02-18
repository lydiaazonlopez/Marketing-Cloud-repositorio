
import React, { useState } from 'react';
import { User, Rocket, GraduationCap, ArrowRight, UserCircle, Mail } from 'lucide-react';

interface Props {
  onRegister: (name: string, email: string) => void;
}

const Registration: React.FC<Props> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onRegister(name, email);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sf-blue text-white rounded-2xl shadow-xl shadow-sf-blue/20 mb-4">
          <GraduationCap size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">SFMC Academy</h1>
        <p className="text-slate-500 mt-2">Accede al hub de aprendizaje profesional</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 w-full max-w-md animate-in zoom-in-95 duration-500">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sf-blue/20 focus:border-sf-blue outline-none transition-all"
                placeholder="Ej. Juan Pérez"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Correo Corporativo</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sf-blue/20 focus:border-sf-blue outline-none transition-all"
                placeholder="juan@empresa.com"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-sf-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sf-blue/90 transition-all shadow-lg shadow-sf-blue/20 group"
          >
            Empezar a aprender
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4 text-slate-400">
          <div className="bg-sf-blue/10 p-2 rounded-lg text-sf-blue">
            <Rocket size={16} />
          </div>
          <p className="text-xs leading-relaxed">
            Tus datos se guardarán localmente para mantener tu progreso personalizado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
