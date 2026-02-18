
// Added React to imports to resolve 'Cannot find namespace React' errors
import React, { useState, useRef } from 'react';
import { Upload, FileCode, CheckCircle2, Loader2, AlertCircle, Terminal, X } from 'lucide-react';
import { ExerciseType, GradingResult } from '../types';
import { gradeExercise } from '../services/geminiService';

interface Props {
  type: ExerciseType;
  title: string;
  description: string;
  onGraded?: (result: GradingResult) => void;
  expectedContent?: string;
}

const ExerciseUploader: React.FC<Props> = ({ type, title, description, onGraded, expectedContent }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setResult(null);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const evaluation = await gradeExercise(type, base64String, true, expectedContent);
        setResult(evaluation);
        setIsUploading(false);
        if (onGraded) onGraded(evaluation);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("No se pudo procesar la imagen.");
      setIsUploading(false);
    }
  };

  const handleCodeSubmit = async () => {
    if (!code.trim()) return;

    setIsUploading(true);
    setResult(null);
    setError(null);

    try {
      const evaluation = await gradeExercise(type, code, false, expectedContent);
      setResult(evaluation);
      if (onGraded) onGraded(evaluation);
    } catch (err) {
      setError("Error al evaluar el código.");
    } finally {
      setIsUploading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const isScale100 = type === 'EMAIL' || type === 'JOURNEY' || type === 'LANDING';
    const scoreDisplay = isScale100 ? `${result.score}%` : `${result.score}/10`;
    const isPassing = isScale100 ? result.score >= 90 : result.score >= 7;

    const resultCard = (
      <div className={`animate-in fade-in slide-in-from-bottom-8 duration-500 ${isScale100 ? '' : 'mt-10'}`}>
        <div className={`p-8 bg-slate-50 rounded-[32px] border border-slate-200 shadow-inner`}>
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-slate-800 text-lg">Resultado de la Validación</h4>
            <div className={`flex items-center gap-3 px-5 py-2 rounded-full border shadow-sm bg-white ${isPassing ? 'border-green-200' : 'border-orange-200'}`}>
              <span className="text-xs font-bold text-slate-400 uppercase">Puntuación</span>
              <span className={`text-xl font-black ${isPassing ? 'text-green-600' : 'text-orange-600'}`}>{scoreDisplay}</span>
            </div>
          </div>
          <div className="flex gap-6">
            <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl ${isPassing ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
              {isPassing ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
            </div>
            <div className="flex-1">
              <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{result.feedback}</p>
              {isPassing && (
                 <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                   <CheckCircle2 size={12} /> Ejercicio aprobado y guardado
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    if (isScale100) {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-300">
            <button onClick={() => setResult(null)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={28} />
            </button>
            {resultCard}
          </div>
        </div>
      );
    }

    return resultCard;
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{description}</p>
      </div>

      {type === 'EMAIL' || type === 'SQL' || type === 'LANDING' ? (
        <div className="space-y-6">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
            {type === 'SQL' ? 'Query SQL' : 'Código Fuente'}
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-80 p-6 font-mono text-xs bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-sf-blue/5 focus:border-sf-blue outline-none transition-all shadow-inner"
            placeholder={type === 'SQL' ? "SELECT Email FROM Subscribers..." : (type === 'LANDING' ? "Pega aquí tu HTML o CSS..." : "<!DOCTYPE html>...")}
          />
          <button
            onClick={handleCodeSubmit}
            disabled={isUploading || !code.trim()}
            className="flex items-center justify-center gap-3 w-full py-5 bg-sf-blue text-white rounded-2xl font-bold text-lg hover:bg-sf-blue/90 disabled:opacity-50 transition-all shadow-xl shadow-sf-blue/20"
          >
            {isUploading ? <Loader2 className="animate-spin" /> : (type === 'SQL' ? <Terminal size={24}/> : <FileCode size={24} />)}
            {type === 'SQL' ? 'Validar Consulta' : 'Evaluar Código'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-4 border-dashed border-slate-100 rounded-[40px] p-20 text-center hover:border-sf-blue hover:bg-sf-blue/5 cursor-pointer transition-all group relative overflow-hidden"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileUpload}
            />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl mb-6 group-hover:text-sf-blue group-hover:bg-white group-hover:shadow-lg transition-all">
                <Upload size={40} />
              </div>
              <p className="font-extrabold text-xl text-slate-800">Sube tu captura</p>
              <p className="text-sm text-slate-400 mt-2">Arrastra el archivo o haz clic para buscarlo</p>
            </div>
          </div>
          {isUploading && (
            <div className="flex items-center justify-center gap-4 text-sf-blue font-bold animate-pulse">
              <Loader2 className="animate-spin" />
              La IA está analizando tu configuración de Salesforce...
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-8 flex items-start gap-4 p-5 bg-red-50 text-red-700 rounded-2xl border border-red-100">
          <AlertCircle className="shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {renderResult()}
    </div>
  );
};

export default ExerciseUploader;
