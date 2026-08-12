import React, { useState, useEffect } from 'react';
import { Gamepad2, Timer, Zap, Trophy, Heart, Star, Sparkles, Filter, PlusCircle, ArrowLeft, Play, Award, CheckCircle2, XCircle, Search, UserCheck } from 'lucide-react';
import { CreatorGame, SubjectType, GradeLevel } from '../types';
import { CREATOR_GAMES } from '../mockData';
import { AdModal } from './AdModal';

interface QuizGameArenaProps {
  onAwardCoinsAndExp: (exp: number, coins: number) => void;
}

export const QuizGameArena: React.FC<QuizGameArenaProps> = ({ onAwardCoinsAndExp }) => {
  // Creator Games list state
  const [games, setGames] = useState<CreatorGame[]>(CREATOR_GAMES);
  const [selectedSubject, setSelectedSubject] = useState<string>('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Ad Modal State before playing
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [pendingGameToStart, setPendingGameToStart] = useState<CreatorGame | null>(null);

  // Active playing game state
  const [activeGame, setActiveGame] = useState<CreatorGame | null>(null);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'ended'>('lobby');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  // Creator Studio Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newCreatorName, setNewCreatorName] = useState('');
  const [newCreatorSchool, setNewCreatorSchool] = useState('');
  const [newSubject, setNewSubject] = useState<SubjectType>('คณิตศาสตร์');
  const [newGrade, setNewGrade] = useState<GradeLevel>('ม.2');
  const [newQ1, setNewQ1] = useState('');
  const [newOpt1, setNewOpt1] = useState('');
  const [newOpt2, setNewOpt2] = useState('');
  const [newOpt3, setNewOpt3] = useState('');
  const [newAnsIdx, setNewAnsIdx] = useState(0);

  const subjects = ['ทั้งหมด', 'คณิตศาสตร์', 'วิทยาศาสตร์', 'เทคโนโลยี/Coding', 'ภาษาอังกฤษ', 'ภาษาไทย'];

  // Question Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && activeGame && timeLeft > 0 && selectedOpt === null) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing' && selectedOpt === null) {
      handleOptionClick(-1);
    }
    return () => clearInterval(interval);
  }, [gameState, activeGame, timeLeft, selectedOpt]);

  // Trigger Ad before Playing Game
  const handleStartGame = (game: CreatorGame) => {
    setPendingGameToStart(game);
    setIsAdOpen(true);
  };

  const handleProceedStartGame = () => {
    const game = pendingGameToStart;
    if (!game) return;
    setActiveGame(game);
    setGameState('playing');
    setCurrentQuestionIdx(0);
    setTimeLeft(game.timePerQuestion || 10);
    setScore(0);
    setSelectedOpt(null);

    // Increment play count
    setGames(prev =>
      prev.map(g => (g.id === game.id ? { ...g, playsCount: g.playsCount + 1 } : g))
    );
  };

  // Option Click inside Game
  const handleOptionClick = (optIdx: number) => {
    if (selectedOpt !== null || !activeGame) return;
    setSelectedOpt(optIdx);

    const currentQ = activeGame.questions[currentQuestionIdx];
    if (currentQ && optIdx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIdx < activeGame.questions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setTimeLeft(activeGame.timePerQuestion || 10);
        setSelectedOpt(null);
      } else {
        setGameState('ended');
      }
    }, 1200);
  };

  // Claim rewards
  const handleClaimRewards = () => {
    if (!activeGame) return;
    const earnedExp = score * 35 + 20;
    const earnedCoins = score * 12 + 10;
    onAwardCoinsAndExp(earnedExp, earnedCoins);
    setGameState('lobby');
    setActiveGame(null);
  };

  // Toggle Like on Creator Game
  const handleToggleLike = (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    setGames(prev =>
      prev.map(g => {
        if (g.id === gameId) {
          const newIsLiked = !g.isLiked;
          return {
            ...g,
            isLiked: newIsLiked,
            likesCount: newIsLiked ? g.likesCount + 1 : g.likesCount - 1
          };
        }
        return g;
      })
    );
  };

  // Submit New Game in Creator Studio
  const handleCreateGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameTitle || !newCreatorName || !newQ1 || !newOpt1 || !newOpt2) return;

    const createdGame: CreatorGame = {
      id: `game-custom-${Date.now()}`,
      title: newGameTitle,
      creatorName: newCreatorName,
      creatorSchool: newCreatorSchool || 'โรงเรียนสังกัด สพฐ.',
      creatorAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newCreatorName)}`,
      subject: newSubject,
      grade: newGrade,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      playsCount: 1,
      rating: 5.0,
      likesCount: 1,
      isLiked: true,
      expReward: 150,
      coinsReward: 45,
      timePerQuestion: 10,
      description: `มินิเกมพัฒนาความรู้สร้างโดย ${newCreatorName}`,
      tags: [newSubject, newGrade, 'Creator Game'],
      questions: [
        {
          id: `q-c1-${Date.now()}`,
          question: newQ1,
          options: [newOpt1, newOpt2, newOpt3 || 'ตัวเลือกเพิ่มเติม'].filter(Boolean),
          correctIndex: newAnsIdx,
          explanation: 'คำตอบที่ถูกต้องตามที่ครีเอเตอร์กำหนดไว้'
        }
      ]
    };

    setGames([createdGame, ...games]);
    setIsCreateModalOpen(false);

    // Reset Form
    setNewGameTitle('');
    setNewCreatorName('');
    setNewCreatorSchool('');
    setNewQ1('');
    setNewOpt1('');
    setNewOpt2('');
    setNewOpt3('');
    setNewAnsIdx(0);
  };

  // Filtered Games
  const filteredGames = games.filter(g => {
    const matchSub = selectedSubject === 'ทั้งหมด' || g.subject === selectedSubject;
    const matchSearch =
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchSub && matchSearch;
  });

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto px-4">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-xs px-3.5 py-1.5 rounded-xl">
              <Gamepad2 className="w-4 h-4 shrink-0" />
              <span>
                Creator Games Hub <br />
                (คลังมินิเกมจากครีเอเตอร์)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              มินิเกมท้าทายจากครู & ครีเอเตอร์
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              เลือกเล่นมินิเกมตอบคำถาม สปีดควิซ และพัซเซิลการเรียนรู้ที่สร้างสรรค์โดยครูผู้เชี่ยวชาญ เล่นฟรีสะสม EXP และเหรียญรางวัล!
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 text-center"
          >
            <PlusCircle className="w-5 h-5 shrink-0" />
            <span>
              สร้างมินิเกมของคุณ <br />
              (Creator Studio)
            </span>
          </button>
        </div>

        {/* Search & Subject Filters */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-gray-300 shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> วิชา:
            </span>
            {subjects.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedSubject === s
                    ? 'bg-[#C2E114] text-[#2D3436]'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="ค้นหาชื่อมินิเกม หรือชื่อครีเอเตอร์..."
              className="w-full pl-9 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C2E114]"
            />
          </div>
        </div>
      </section>

      {/* Mode 1: Games Gallery (Lobby) */}
      {gameState === 'lobby' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-[#2D3436] flex items-start sm:items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8A9914] shrink-0 mt-0.5 sm:mt-0" />
              <span>
                มินิเกมพร้อมเล่น <br className="sm:hidden" />
                <span className="text-base font-semibold text-[#8A9914]">({filteredGames.length} เกม)</span>
              </span>
            </h2>
            <span className="text-xs text-[#636E72]">อัปเดตเกมใหม่โดยครีเอเตอร์ทุกสัปดาห์</span>
          </div>

          {filteredGames.length === 0 ? (
            <div className="card p-12 text-center space-y-3">
              <Gamepad2 className="w-12 h-12 text-[#636E72] mx-auto opacity-50" />
              <h3 className="text-base font-bold text-[#2D3436]">ไม่พบมินิเกมที่ตรงตามเงื่อนไข</h3>
              <p className="text-xs text-[#636E72]">ลองเปลี่ยนวิชาหรือคำค้นหาเพื่อเลือกเล่นมินิเกมจากครีเอเตอร์ท่านอื่น</p>
              <button
                onClick={() => {
                  setSelectedSubject('ทั้งหมด');
                  setSearchTerm('');
                }}
                className="bg-[#2D3436] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                ล้างตัวกรอง
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <div
                  key={game.id}
                  className="bg-white rounded-[16px] border border-[#E0E0E0] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Thumbnail Container */}
                  <div className="relative h-44 overflow-hidden bg-[#2D3436]">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />

                    {/* Subject & Grade Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-[#2D3436] text-[#C2E114] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#C2E114]/30">
                        {game.subject} • {game.grade}
                      </span>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={e => handleToggleLike(e, game.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        game.isLiked
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${game.isLiked ? 'fill-white' : ''}`} />
                    </button>

                    {/* Reward Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                      <Award className="w-3.5 h-3.5 text-[#C2E114]" /> +{game.expReward} EXP
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Creator Info Header */}
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={game.creatorAvatar}
                          alt={game.creatorName}
                          className="w-6 h-6 rounded-full border border-[#E0E0E0] object-cover"
                        />
                        <div className="truncate text-xs font-semibold text-[#2D3436]">
                          {game.creatorName}
                        </div>
                        <UserCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      </div>

                      <h3 className="font-bold text-[#2D3436] text-sm leading-snug line-clamp-2 hover:text-[#8A9914] transition-colors">
                        {game.title}
                      </h3>

                      <p className="text-xs text-[#636E72] mt-1.5 line-clamp-2 leading-relaxed">
                        {game.description}
                      </p>
                    </div>

                    {/* Meta Footer */}
                    <div className="pt-3 border-t border-[#F1F2F6] space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#636E72] font-medium">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {game.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Gamepad2 className="w-3.5 h-3.5" /> เล่นแล้ว {game.playsCount.toLocaleString()} ครั้ง
                        </span>
                        <span className="flex items-center gap-1 text-rose-500 font-semibold">
                          <Heart className="w-3 h-3 fill-rose-500" /> {game.likesCount}
                        </span>
                      </div>

                      <button
                        onClick={() => handleStartGame(game)}
                        className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> เริ่มเล่นมินิเกมนี้
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Playing Game */}
      {gameState === 'playing' && activeGame && (
        <div className="max-w-2xl mx-auto space-y-6">
          <button
            onClick={() => {
              setGameState('lobby');
              setActiveGame(null);
            }}
            className="text-xs font-bold text-[#636E72] hover:text-[#2D3436] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ยกเลิกการเล่น / กลับไปเลือกมินิเกมอื่น
          </button>

          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header / Game Info */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F2F6]">
              <div className="flex items-center gap-2">
                <img
                  src={activeGame.creatorAvatar}
                  alt={activeGame.creatorName}
                  className="w-8 h-8 rounded-full border border-[#E0E0E0]"
                />
                <div>
                  <div className="text-xs font-bold text-[#2D3436]">{activeGame.creatorName}</div>
                  <div className="text-[10px] text-[#636E72]">{activeGame.creatorSchool}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                <Timer className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>{timeLeft} วินาที</span>
              </div>
            </div>

            {/* Question Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-[#636E72]">
                <span>{activeGame.title}</span>
                <span>คำถาม {currentQuestionIdx + 1} / {activeGame.questions.length}</span>
              </div>
              <div className="w-full bg-[#F1F2F6] h-2 rounded-full overflow-hidden border border-[#E0E0E0]">
                <div
                  className="bg-[#C2E114] h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / activeGame.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-lg font-bold text-[#2D3436] leading-snug">
              {activeGame.questions[currentQuestionIdx]?.question}
            </h2>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeGame.questions[currentQuestionIdx]?.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === activeGame.questions[currentQuestionIdx].correctIndex;

                let style = "bg-[#F8F9FA] border-[#E0E0E0] text-[#2D3436] hover:bg-[#F1F2F6]";
                if (selectedOpt !== null) {
                  if (isCorrect) style = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
                  else if (isSelected) style = "bg-rose-100 border-rose-400 text-rose-900 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={selectedOpt !== null}
                    className={`p-4 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition-all ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after selecting */}
            {selectedOpt !== null && (
              <div className="p-4 bg-[#F1F2F6] rounded-xl border border-[#E0E0E0] space-y-1 animate-fade-in text-xs">
                <div className="font-bold text-[#2D3436] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8A9914]" /> คำอธิบายจากครีเอเตอร์:
                </div>
                <p className="text-[#636E72] leading-relaxed">
                  {activeGame.questions[currentQuestionIdx]?.explanation}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Mode 3: Game Ended / Summary */}
      {gameState === 'ended' && activeGame && (
        <div className="max-w-md mx-auto card p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-[#C2E114] text-[#2D3436] rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-md">
            {score === activeGame.questions.length ? '🏆' : '💪'}
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#2D3436]">
              {score === activeGame.questions.length
                ? 'เก่งมาก! เล่นจบเกมแล้ว'
                : 'มาพยายามกันเพิ่มเถอะ'}
            </h2>
            <div className="text-xs text-[#636E72] mt-2 leading-relaxed space-y-1">
              {activeGame.title.includes(' โดย ') ? (
                <>
                  <div className="font-semibold">{activeGame.title.split(' โดย ')[0]}</div>
                  <div>โดย {activeGame.title.split(' โดย ').slice(1).join(' โดย ')}</div>
                </>
              ) : (
                <>
                  <div className="font-semibold">{activeGame.title}</div>
                  <div>โดย {activeGame.creatorName}</div>
                </>
              )}
            </div>
          </div>

          <div className="p-4 bg-[#F1F2F6] rounded-xl border border-[#E0E0E0] space-y-2">
            <div className="text-xs font-bold text-[#636E72]">ผลการทดสอบของคุณ</div>
            <div className="text-2xl font-black text-[#2D3436]">
              {score} / {activeGame.questions.length} ข้อ
            </div>
            <div className="text-xs text-[#8A9914] font-extrabold">
              +{score * 35 + 20} EXP 🌟 | +{score * 12 + 10} เหรียญ 🪙
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleClaimRewards}
              className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm shadow-xs transition-all"
            >
              รับรางวัลโบนัสเข้าไอดี
            </button>

            <button
              onClick={() => handleStartGame(activeGame)}
              className="w-full bg-[#F1F2F6] hover:bg-[#E4E6EB] text-[#2D3436] font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              เล่นเกมนี้อีกรอบ 🔄
            </button>
          </div>
        </div>
      )}

      {/* Modal: Creator Studio (Submit / Create Game) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#C2E114]/20 rounded-xl text-[#2D3436]">
                  <PlusCircle className="w-5 h-5 text-[#8A9914]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#2D3436] text-base">Creator Studio</h3>
                  <p className="text-xs text-[#636E72]">สร้างและแบ่งปันมินิเกมของคุณสู่ชุมชนนักเรียนไทย</p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#636E72] hover:text-[#2D3436]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGameSubmit} className="space-y-4 text-xs font-medium">
              
              <div>
                <label className="block text-[#2D3436] font-bold mb-1">ชื่อมินิเกมของคุณ *</label>
                <input
                  type="text"
                  required
                  value={newGameTitle}
                  onChange={e => setNewGameTitle(e.target.value)}
                  placeholder="เช่น Speed Quiz พีทาโกรัส ม.2, ทายศัพท์ Eng O-NET"
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436] focus:outline-none focus:ring-2 focus:ring-[#C2E114]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2D3436] font-bold mb-1">ชื่อครีเอเตอร์ / ครูผู้สร้าง *</label>
                  <input
                    type="text"
                    required
                    value={newCreatorName}
                    onChange={e => setNewCreatorName(e.target.value)}
                    placeholder="เช่น ครูพี่อาร์ต สายคำนวณ"
                    className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436] focus:outline-none focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>

                <div>
                  <label className="block text-[#2D3436] font-bold mb-1">โรงเรียน / สถาบัน</label>
                  <input
                    type="text"
                    value={newCreatorSchool}
                    onChange={e => setNewCreatorSchool(e.target.value)}
                    placeholder="เช่น โรงเรียนสวนกุหลาบวิทยาลัย"
                    className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436] focus:outline-none focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2D3436] font-bold mb-1">หมวดวิชา</label>
                  <select
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value as SubjectType)}
                    className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436]"
                  >
                    <option value="คณิตศาสตร์">คณิตศาสตร์</option>
                    <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
                    <option value="เทคโนโลยี/Coding">เทคโนโลยี/Coding</option>
                    <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
                    <option value="ภาษาไทย">ภาษาไทย</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#2D3436] font-bold mb-1">ระดับชั้น</label>
                  <select
                    value={newGrade}
                    onChange={e => setNewGrade(e.target.value as GradeLevel)}
                    className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436]"
                  >
                    <option value="ม.1">ม.1</option>
                    <option value="ม.2">ม.2</option>
                    <option value="ม.3">ม.3</option>
                  </select>
                </div>
              </div>

              {/* Sample Question Creation */}
              <div className="pt-3 border-t border-[#F1F2F6] space-y-3">
                <div className="font-bold text-[#2D3436]">คำถามข้อที่ 1 *</div>
                <input
                  type="text"
                  required
                  value={newQ1}
                  onChange={e => setNewQ1(e.target.value)}
                  placeholder="พิมพ์คำถามของคุณที่นี่..."
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436]"
                />

                <div className="space-y-2">
                  <div className="font-bold text-[#636E72]">ตัวเลือกคำตอบ</div>
                  <input
                    type="text"
                    required
                    value={newOpt1}
                    onChange={e => setNewOpt1(e.target.value)}
                    placeholder="ตัวเลือก 1"
                    className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={newOpt2}
                    onChange={e => setNewOpt2(e.target.value)}
                    placeholder="ตัวเลือก 2"
                    className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    value={newOpt3}
                    onChange={e => setNewOpt3(e.target.value)}
                    placeholder="ตัวเลือก 3 (ไม่บังคับ)"
                    className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#636E72] font-bold mb-1">ข้อใดเป็นคำตอบที่ถูกต้อง?</label>
                  <select
                    value={newAnsIdx}
                    onChange={e => setNewAnsIdx(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                  >
                    <option value={0}>ตัวเลือก 1</option>
                    <option value={1}>ตัวเลือก 2</option>
                    <option value={2}>ตัวเลือก 3</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E0E0E0]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 bg-[#F1F2F6] text-[#636E72] font-bold rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold rounded-xl shadow-xs transition-colors"
                >
                  เผยแพร่มินิเกมทันที! 🚀
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Ad Modal before game starts */}
      <AdModal
        isOpen={isAdOpen}
        onClose={() => setIsAdOpen(false)}
        onProceed={handleProceedStartGame}
        title="โฆษณาสนับสนุนก่อนเล่นมินิเกม"
      />

    </div>
  );
};
