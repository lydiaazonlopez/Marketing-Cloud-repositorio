
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RefreshCcw, Award } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onComplete?: (passed: boolean) => void;
}

const Quiz: React.FC<Props> = ({ questions, onComplete }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    initQuiz();
  }, [questions]);

  const initQuiz = () => {
    const shuffled = [...questions]
      .sort(() => Math.random() - 0.5)
      .map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      }));
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleNext = () => {
    const currentQ = shuffledQuestions[currentQuestion];
    const isCorrect = currentQ.options[selectedOption!] === questions.find(q => q.id === currentQ.id)!.options[questions.find(q => q.id === currentQ.id)!.correctAnswer];
    
    if (isCorrect) setScore(score + 1);
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        const passed = finalScore / shuffledQuestions.length >= 0.8;
        setIsFinished(true);
        if (onComplete) onComplete(passed);
      }
    }, 1200);
  };

  if (shuffledQuestions.length === 0) return null;

  if (isFinished) {
    const percentage = (score / shuffledQuestions.length) * 100;
    const hasPassed = percentage >= 80;

    return (
      <div className="bg-white rounded-3xl shadow-sm p-12 text-center max-w-2xl mx-auto border border-slate-100 animate-in zoom-in-95 duration-500">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 ${hasPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {hasPassed ? <Award size={48} /> : <XCircle size={48} />}
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          {hasPassed ? '¡Examen Superado!' : 'No has alcanzado el 80%'}
        </h2>
        <p className="text-slate-500 mb-8">
          {hasPassed 
            ? '¡Excelente trabajo! Has demostrado dominio del tema y se ha registrado en tu progreso.' 
            : 'Necesitas un 80% para aprobar. Repasa el contenido e inténtalo de nuevo.'}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-slate-50 p-6 rounded-2xl">
            <p className={`text-4xl font-bold ${hasPassed ? 'text-green-600' : 'text-red-600'}`}>{score}/{shuffledQuestions.length}</p>
            <p className="text-xs font-bold text-slate-400 uppercase mt-1">Aciertos</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl">
            <p className="text-4xl font-bold text-slate-800">{Math.round(percentage)}%</p>
            <p className="text-xs font-bold text-slate-400 uppercase mt-1">Puntuación</p>
          </div>
        </div>

        <button 
          onClick={initQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-sf-blue text-white rounded-2xl font-bold hover:bg-sf-blue/90 transition-all mx-auto shadow-lg shadow-sf-blue/20"
        >
          <RefreshCcw size={20} />
          {hasPassed ? 'Repasar Preguntas' : 'Reintentar Examen'}
        </button>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const originalQ = questions.find(q => q.id === question.id)!;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Pregunta {currentQuestion + 1} / {shuffledQuestions.length}</span>
        <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sf-blue transition-all duration-500" 
            style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-10">
        <h3 className="text-2xl font-bold text-slate-800 mb-10 leading-snug">{question.question}</h3>
        
        <div className="space-y-4">
          {question.options.map((option, index) => {
            let bgColor = 'bg-white border-slate-100 hover:border-sf-blue/50';
            let icon = null;

            if (showResult) {
              const isCorrectOption = option === originalQ.options[originalQ.correctAnswer];
              if (isCorrectOption) {
                bgColor = 'bg-green-50 border-green-500 text-green-700 shadow-sm';
                icon = <CheckCircle2 size={20} className="text-green-500" />;
              } else if (index === selectedOption) {
                bgColor = 'bg-red-50 border-red-500 text-red-700';
                icon = <XCircle size={20} className="text-red-500" />;
              }
            } else if (selectedOption === index) {
              bgColor = 'bg-sf-blue/5 border-sf-blue text-sf-blue shadow-md';
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showResult}
                className={`w-full flex items-center justify-between p-5 border-2 rounded-2xl text-left transition-all ${bgColor}`}
              >
                <span className="font-semibold text-sm">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedOption === null || showResult}
          className={`mt-12 w-full py-5 rounded-2xl font-bold text-lg transition-all ${
            selectedOption === null || showResult
              ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
              : 'bg-sf-blue text-white shadow-xl shadow-sf-blue/20 hover:scale-[1.01]'
          }`}
        >
          {showResult ? 'Analizando...' : 'Confirmar Respuesta'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
