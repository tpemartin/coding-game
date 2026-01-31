import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, RotateCcw, BookOpen, Brain, CheckCircle2, AlertCircle } from 'lucide-react';

const VERB_DATA = [
  { sp: "Abrocharse", en: "To button / To tie / To fasten / To zip" },
  { sp: "Aburrirse (de)", en: "To get bored (with)" },
  { sp: "Acordarse (de)", en: "To remember" },
  { sp: "Acostarse", en: "To lay down / To go to bed" },
  { sp: "Afeitarse", en: "To shave" },
  { sp: "Alegrarse (de)", en: "To be glad / happy / pleased (about)" },
  { sp: "Arreglarse", en: "To groom / To get ready" },
  { sp: "Bañarse", en: "To take a bath / shower" },
  { sp: "Cepillarse", en: "To brush (hair, teeth)" },
  { sp: "Darse cuenta de", en: "To realize" },
  { sp: "Despertarse", en: "To wake up" },
  { sp: "Divertirse (con)", en: "To have fun (with)" },
  { sp: "Dormirse", en: "To fall asleep / To oversleep" },
  { sp: "Ducharse", en: "To shower" },
  { sp: "Enamorarse (de)", en: "To fall in love (with)" },
  { sp: "Enojarse (con)", en: "To get or become angry (with)" },
  { sp: "Irse / Marcharse", en: "To leave / To go away" },
  { sp: "Lavarse", en: "To wash oneself" },
  { sp: "Levantarse", en: "To get up / To stand up" },
  { sp: "Llamarse", en: "To be named / To be called" },
  { sp: "Maquillarse", en: "To put makeup on" },
  { sp: "Olvidarse (de)", en: "To forget" },
  { sp: "Peinarse", en: "To comb your hair" },
  { sp: "Ponerse", en: "To put on (clothing) / To become" },
  { sp: "Preocuparse por", en: "To worry about" },
  { sp: "Quejarse de", en: "To complain about" },
  { sp: "Quedarse", en: "To remain / To stay" },
  { sp: "Quitarse", en: "To take off (clothing)" },
  { sp: "Sentarse", en: "To sit down" },
  { sp: "Sentirse", en: "To feel" },
  { sp: "Vestirse", en: "To get dressed" }
];

const App = () => {
  const [currentSet, setCurrentSet] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [feedback, setFeedback] = useState(null);

  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const startNewGame = () => {
    const fullPool = shuffleArray(VERB_DATA).slice(0, 8);
    const options = [
      ...fullPool.map(v => ({ id: `sp-${v.sp}`, text: v.sp, type: 'sp', pair: v.sp })),
      ...fullPool.map(v => ({ id: `en-${v.sp}`, text: v.en, type: 'en', pair: v.sp }))
    ];
    setCurrentSet(shuffleArray(options));
    setMatches([]);
    setSelectedItems([]);
    setMistakes(0);
    setGameState('playing');
    setFeedback(null);
  };

  const handleSelect = (item) => {
    if (matches.includes(item.pair) || selectedItems.find(i => i.id === item.id)) return;

    const newSelection = [...selectedItems, item];
    setSelectedItems(newSelection);

    if (newSelection.length === 2) {
      if (newSelection[0].pair === newSelection[1].pair && newSelection[0].type !== newSelection[1].type) {
        // Match found
        setMatches(prev => [...prev, newSelection[0].pair]);
        setSelectedItems([]);
        setFeedback({ type: 'success', text: '¡Excelente!' });
      } else {
        // Mistake
        setMistakes(prev => prev + 1);
        setFeedback({ 
          type: 'error', 
          text: `Not quite. ${newSelection.find(i => i.type === 'sp')?.text || 'That verb'} matches with its specific meaning.` 
        });
        setTimeout(() => setSelectedItems([]), 1000);
      }
    } else {
      setFeedback(null);
    }
  };

  useEffect(() => {
    if (matches.length === 8 && gameState === 'playing') {
      setGameState('finished');
    }
  }, [matches, gameState]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="max-w-4xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-3">
            <Brain className="text-blue-600" /> Verbos Reflexivos
          </h1>
          <p className="text-slate-600">Master the action of the self.</p>
        </header>

        {gameState === 'menu' && (
          <Card className="border-2 border-dashed border-slate-300 bg-white/50">
            <CardContent className="flex flex-col items-center py-12">
              <BookOpen className="w-16 h-16 text-blue-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Ready to test your memory?</h2>
              <p className="text-slate-500 text-center max-w-md mb-8">
                We've selected a subset of reflexive verbs for you. Match the Spanish verb to its English translation to clear the board.
              </p>
              <Button onClick={startNewGame} size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 text-lg rounded-full transition-all hover:scale-105">
                Start Review Session
              </Button>
            </CardContent>
          </Card>
        )}

        {gameState === 'playing' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
              <div className="flex-1 mr-4">
                <div className="flex justify-between mb-1 text-sm font-medium text-slate-700">
                  <span>Progress</span>
                  <span>{Math.round((matches.length / 8) * 100)}%</span>
                </div>
                <Progress value={(matches.length / 8) * 100} className="h-2" />
              </div>
              <div className="text-right">
                <span className="text-sm text-slate-500 uppercase tracking-wider block">Mistakes</span>
                <span className={`text-xl font-bold ${mistakes > 5 ? 'text-red-500' : 'text-slate-800'}`}>{mistakes}</span>
              </div>
            </div>

            {feedback && (
              <div className={`p-3 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
                feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span className="text-sm font-medium">{feedback.text}</span>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentSet.map((item) => {
                const isMatched = matches.includes(item.pair);
                const isSelected = selectedItems.find(i => i.id === item.id);
                
                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelect(item)}
                    className={`
                      h-32 p-3 rounded-xl text-sm md:text-base font-medium transition-all duration-200 shadow-sm flex items-center justify-center text-center
                      ${isMatched ? 'bg-slate-100 text-slate-300 opacity-0 cursor-default' : 
                        isSelected ? 'bg-blue-600 text-white scale-105 ring-4 ring-blue-200 z-10' : 
                        'bg-white text-slate-700 hover:border-blue-400 border-2 border-transparent hover:shadow-md'}
                    `}
                  >
                    {item.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <Card className="bg-white shadow-xl border-none overflow-hidden">
            <div className="bg-blue-600 p-8 text-center text-white">
              <Trophy className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold">¡Buen Trabajo!</h2>
              <p className="opacity-90">Session Complete</p>
            </div>
            <CardContent className="p-8 text-center">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <span className="block text-slate-500 text-sm">Verbs Mastered</span>
                  <span className="text-2xl font-bold">8</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <span className="block text-slate-500 text-sm">Mistakes</span>
                  <span className="text-2xl font-bold">{mistakes}</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button onClick={startNewGame} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                  Next Set of Verbs
                </Button>
                <Button onClick={() => setGameState('menu')} variant="outline" className="w-full h-12 text-lg flex gap-2">
                  <RotateCcw size={18} /> Back to Start
                </Button>
              </div>
              <div className="mt-8 text-left border-t pt-6">
                <h3 className="font-semibold text-slate-800 mb-2">Pedagogical Tip:</h3>
                <p className="text-sm text-slate-600 italic">
                  "Reflexive verbs show that the subject is both the doer and the receiver. Try saying the verb aloud with the pronoun 'Me' (e.g., 'Me cepillo') to reinforce the motor memory of the grammar pattern."
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;