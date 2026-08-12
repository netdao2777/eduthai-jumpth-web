import React, { useState } from 'react';
import { Course, Lesson, QuizQuestion, Comment, UserProfile } from '../types';
import { Play, Pause, CheckCircle2, Lock, Award, Heart, MessageSquare, Flag, Send, HelpCircle, Download, FileText, ChevronRight, Sparkles, X, Check, ThumbsUp, AlertCircle } from 'lucide-react';

interface ClassroomViewProps {
  course: Course;
  comments: Comment[];
  user: UserProfile;
  onAddComment: (text: string) => void;
  onCompleteQuiz: (exp: number, coins: number) => void;
  onBackToFeed: () => void;
}

export const ClassroomView: React.FC<ClassroomViewProps> = ({
  course,
  comments,
  user,
  onAddComment,
  onCompleteQuiz,
  onBackToFeed
}) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(
    course.lessons[1] || course.lessons[0] || {
      id: 'default',
      courseId: course.id,
      title: 'บทเรียนที่ 1: การปูพื้นฐานการเรียน',
      duration: '15:00 นาที',
      isCompleted: false,
      isLocked: false,
      description: 'คำอธิบายบทเรียนสั้นๆ สำหรับฝึกฝน'
    }
  );

  // Video Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35); // 35%

  // Like Button State
  const [likesCount, setLikesCount] = useState(128);
  const [isLiked, setIsLiked] = useState(false);

  // Comment input state
  const [commentText, setCommentText] = useState('');

  // Adaptive Quiz Modal state
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Report Modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('เนื้อหาไม่อัปเดต/มีข้อผิดพลาด');
  const [reportSuccessToast, setReportSuccessToast] = useState(false);

  const defaultQuizQuestions: QuizQuestion[] = selectedLesson.quiz || [
    {
      id: 'q1',
      question: 'ถ้า 2x + 4 = 10 แล้วค่าของ x ตรงกับข้อใด?',
      options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
      correctAnswerIndex: 1,
      explanation: 'ย้าย 4 ไปลบจาก 10 ได้ 2x = 6 จากนั้นนำ 2 ไปหาร 6 ได้ x = 3'
    },
    {
      id: 'q2',
      question: 'ข้อใดเป็นสมการเชิงเส้นตัวแปรเดียว?',
      options: ['x + y = 5', '3x² + 2 = 11', '5m - 7 = 18', '2a + 3b = c'],
      correctAnswerIndex: 2,
      explanation: '5m - 7 = 18 มีตัวแปรเดียวคือ m และกำลังของตัวแปรเป็น 1'
    },
    {
      id: 'q3',
      question: 'ผลบวกของเลขสองจำนวนเท่ากับ 20 ถ้าจำนวนหนึ่งมากกว่าอีกจำนวนอยู่ 4 เลขจำนวนมากคือเท่าใด?',
      options: ['10', '12', '14', '16'],
      correctAnswerIndex: 1,
      explanation: 'ให้ x เป็นจำนวนน้อย x + (x + 4) = 20 -> 2x = 16 -> x = 8 ดังนั้นจำนวนมากคือ 8 + 4 = 12'
    }
  ];

  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText);
    setCommentText('');
  };

  const handleAnswerSelect = (optionIdx: number) => {
    if (selectedAnswer !== null) return; // Answered
    setSelectedAnswer(optionIdx);

    const q = defaultQuizQuestions[currentQuestionIndex];
    if (optionIdx === q.correctAnswerIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < defaultQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizSubmitted(true);
    }
  };

  const handleFinishQuiz = () => {
    setQuizModalOpen(false);
    onCompleteQuiz(100, 30); // Award +100 EXP, +30 coins
    // Reset quiz state
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizSubmitted(false);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportModalOpen(false);
    setReportSuccessToast(true);
    setTimeout(() => setReportSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Toast Confirmation for Report */}
      {reportSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1A1C1C] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#C2E114] flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#C2E114]" />
          <div className="text-xs">
            <p className="font-bold">ส่งรายงานเรียบร้อยแล้ว!</p>
            <p className="text-gray-300">ทีมงานจะตรวจสอบเนื้อหานี้ภายใน 24 ชั่วโมง</p>
          </div>
        </div>
      )}

      {/* Course Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToFeed}
          className="text-xs font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-4 py-2 rounded-xl transition-all"
        >
          ← ย้อนกลับไปหน้ารายวิชา
        </button>

        <div className="flex items-center gap-2">
          <span className="bg-[#1A1C1C] text-[#C2E114] text-xs font-bold px-3 py-1 rounded-full">
            {course.subject} • {course.grade}
          </span>
          <span className="text-xs text-gray-500 font-medium hidden sm:inline">
            ผู้สอน: {course.instructor}
          </span>
        </div>
      </div>

      {/* Main Grid: Player on left, Playlist on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Video Player & Controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Custom Video Player Canvas Component */}
          <div className="relative aspect-video bg-gray-950 rounded-3xl overflow-hidden shadow-2xl group border border-gray-800 flex flex-col justify-between p-4">
            
            {/* Mock Animated Video Screen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 text-center">
              
              {/* Educational Chalkboard Illustration */}
              <div className="w-full max-w-md bg-emerald-950/80 border-4 border-amber-900/60 rounded-2xl p-6 shadow-inner text-emerald-100 font-mono text-xs sm:text-sm space-y-3 relative overflow-hidden">
                <div className="text-[#C2E114] font-bold text-xs uppercase tracking-wider">
                  📐 [คณิตศาสตร์ ม.2] {selectedLesson.title}
                </div>
                <div className="py-2 text-left space-y-1">
                  <p className="text-white font-bold text-lg">โจทย์: 2x + 4 = 10</p>
                  <p className="text-emerald-300">ขั้นที่ 1: ย้าย 4 ไปลบทั้งสองข้าง → 2x = 10 - 4</p>
                  <p className="text-emerald-300">ขั้นที่ 2: 2x = 6 → ย้าย 2 ไปหาร</p>
                  <p className="text-[#C2E114] font-bold text-base">คำตอบ: x = 3 🎉</p>
                </div>
              </div>

              {/* Central Play/Pause Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="mt-4 bg-[#C2E114] hover:bg-[#b0cc10] text-[#1A1C1C] p-4 rounded-full shadow-2xl transition-transform transform hover:scale-110 active:scale-95 flex items-center justify-center"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-[#1A1C1C] translate-x-0.5" />}
              </button>
            </div>

            {/* Video Controls Bar */}
            <div className="relative z-20 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col gap-2 mt-auto">
              {/* Timeline Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setVideoProgress(Math.round((clickX / rect.width) * 100));
                }}
                className="w-full bg-gray-700 h-2 rounded-full cursor-pointer overflow-hidden relative"
              >
                <div
                  className="bg-[#C2E114] h-full transition-all"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-[#C2E114] font-bold"
                  >
                    {isPlaying ? 'พักคลิป' : 'เล่นวิดีโอ'}
                  </button>
                  <span className="text-gray-400">06:20 / {selectedLesson.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">1080p HD</span>
                  <span className="bg-[#C2E114] text-[#1A1C1C] font-bold px-2 py-0.5 rounded text-[10px]">
                    ความเร็ว 1.0x
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Lesson Details & Social Action Bar */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <h1 className="text-xl font-extrabold text-gray-900">{selectedLesson.title}</h1>
                <p className="text-xs text-gray-500 mt-1">{course.title} • {course.school}</p>
              </div>

              {/* Social Buttons: Like, Share, Report */}
              <div className="flex items-center gap-2 shrink-0">
                
                {/* Like Button */}
                <button
                  onClick={handleToggleLike}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                    isLiked
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{likesCount} ถูกใจ</span>
                </button>

                {/* Report Content Button */}
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-2xl text-xs font-bold border border-gray-200 transition-all"
                  title="รายงานเนื้อหาไม่เหมาะสม"
                >
                  <Flag className="w-3.5 h-3.5" /> รายงาน
                </button>

              </div>
            </div>

            {/* Lesson Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {selectedLesson.description || course.description}
            </p>

            {/* Downloads & Notes Sheet */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C2E114]/20 text-[#1A1C1C] rounded-xl flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5 text-[#8A9914]" />
                </div>
                <div>
                  <div className="font-bold text-xs text-gray-900">เอกสารชีทสรุปเนื้อหา PDF (สำหรับดาวน์โหลด)</div>
                  <div className="text-[10px] text-gray-500">ขนาดไฟล์ 2.4 MB • สรุปสูตรและแนวข้อสอบ</div>
                </div>
              </div>
              <button className="bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all">
                <Download className="w-3.5 h-3.5 text-[#C2E114]" /> โหลดชีท
              </button>
            </div>

            {/* Gamification Action: Adaptive Quiz Button */}
            <div className="bg-gradient-to-r from-[#1A1C1C] to-[#2D3131] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-[#C2E114] flex items-center justify-center sm:justify-start gap-1">
                  <Sparkles className="w-4 h-4" /> AI Adaptive Quiz Engine
                </div>
                <div className="font-bold text-sm">พร้อมทดสอบความเข้าใจสะสม EXP รึยัง?</div>
                <div className="text-[11px] text-gray-300">ทำควิซ 3 ข้อ รับทันที +100 EXP และ +30 เหรียญ</div>
              </div>

              <button
                onClick={() => setQuizModalOpen(true)}
                className="w-full sm:w-auto bg-[#C2E114] hover:bg-[#b0cc10] text-[#1A1C1C] font-extrabold px-6 py-3 rounded-xl text-xs shadow-md shadow-[#C2E114]/30 flex items-center justify-center gap-2 transition-all transform active:scale-98 shrink-0"
              >
                <HelpCircle className="w-4 h-4" /> เริ่มทำ Adaptive Quiz (+100 EXP)
              </button>
            </div>

          </div>

          {/* Social Comment Section */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft-card space-y-6">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-700" />
              ความคิดเห็นและคำถามจากเพื่อนนักเรียน ({comments.length})
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full bg-[#1A1C1C] border border-[#C2E114] object-cover shrink-0"
                />
                <textarea
                  rows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="พิมพ์ความคิดเห็น หรือถามข้อสงสัยในบทเรียนนี้..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C2E114] focus:bg-white resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="bg-[#1A1C1C] hover:bg-black disabled:opacity-40 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#C2E114]" /> ส่งความคิดเห็น
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              {comments.map((cmt) => (
                <div key={cmt.id} className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <img
                    src={cmt.userAvatar}
                    alt={cmt.userName}
                    className="w-9 h-9 rounded-full bg-gray-200 object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-gray-900">{cmt.userName}</span>
                      <span className="text-[10px] text-gray-400">{cmt.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">{cmt.content}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500 font-medium">
                      <button className="hover:text-rose-600 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {cmt.likes} ถูกใจ
                      </button>
                      <button className="hover:underline">ตอบกลับ</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column: Playlist Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft-card space-y-4 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">สารบัญบทเรียน (Playlist)</h3>
              <span className="text-xs font-bold text-[#8A9914] bg-[#C2E114]/20 px-2.5 py-0.5 rounded-full">
                {course.lessons.length} บท
              </span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {course.lessons.map((les, index) => {
                const isSelected = selectedLesson.id === les.id;
                return (
                  <button
                    key={les.id}
                    onClick={() => {
                      if (!les.isLocked) setSelectedLesson(les);
                    }}
                    disabled={les.isLocked}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#1A1C1C] text-white border-[#1A1C1C] shadow-md'
                        : les.isLocked
                        ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-[#C2E114] text-[#1A1C1C]'
                          : les.isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {les.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs truncate">{les.title}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                        {les.duration}
                      </div>
                    </div>

                    {les.isLocked && <Lock className="w-4 h-4 text-gray-400 shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Adaptive Quiz Modal */}
      {quizModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            
            {/* Header */}
            <div className="bg-[#1A1C1C] text-white p-6 relative">
              <button
                onClick={() => setQuizModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/10 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="bg-[#C2E114] text-[#1A1C1C] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                AI Adaptive Quiz
              </span>
              <h2 className="text-xl font-bold mt-2">แบบทดสอบวัดระดับ {selectedLesson.title}</h2>
            </div>

            <div className="p-6 space-y-6">
              {!quizSubmitted ? (
                <>
                  <div className="flex items-center justify-between text-xs text-gray-500 font-bold">
                    <span>ข้อที่ {currentQuestionIndex + 1} / {defaultQuizQuestions.length}</span>
                    <span>คะแนนสะสม: {quizScore}</span>
                  </div>

                  {/* Question Title */}
                  <h3 className="font-bold text-gray-900 text-base">
                    {defaultQuizQuestions[currentQuestionIndex].question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {defaultQuizQuestions[currentQuestionIndex].options.map((opt, optionIdx) => {
                      const isSelected = selectedAnswer === optionIdx;
                      const isCorrect = optionIdx === defaultQuizQuestions[currentQuestionIndex].correctAnswerIndex;
                      
                      let btnStyle = "bg-gray-50 border-gray-200 text-gray-800 hover:border-gray-300";
                      if (selectedAnswer !== null) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-100 border-rose-400 text-rose-900 font-bold";
                        }
                      }

                      return (
                        <button
                          key={optionIdx}
                          onClick={() => handleAnswerSelect(optionIdx)}
                          className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedAnswer !== null && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback after answering */}
                  {selectedAnswer !== null && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                      <p className="font-bold flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-amber-600" /> คำอธิบายจาก AI ครูผู้ช่วย:
                      </p>
                      <p>{defaultQuizQuestions[currentQuestionIndex].explanation}</p>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="bg-[#1A1C1C] hover:bg-black disabled:opacity-40 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2"
                    >
                      {currentQuestionIndex < defaultQuizQuestions.length - 1 ? 'ข้อถัดไป →' : 'สรุปคะแนนควิซ'}
                    </button>
                  </div>
                </>
              ) : (
                /* Quiz Complete Celebration */
                <div className="text-center space-y-4 py-4">
                  <div className="w-20 h-20 bg-[#C2E114] text-[#1A1C1C] rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-lg shadow-[#C2E114]/40 animate-bounce">
                    🎉
                  </div>

                  <h3 className="text-2xl font-black text-gray-900">เก่งมาก! ทำควิซสำเร็จแล้ว</h3>
                  <p className="text-xs text-gray-600">
                    ตอบถูกต้อง <span className="font-bold text-gray-900">{quizScore}</span> จาก {defaultQuizQuestions.length} ข้อ
                  </p>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 inline-flex items-center gap-4 text-sm font-bold">
                    <span className="text-[#8A9914]">+100 EXP 🌟</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-amber-600">+30 เหรียญ 🪙</span>
                  </div>

                  <button
                    onClick={handleFinishQuiz}
                    className="w-full bg-[#C2E114] hover:bg-[#b0cc10] text-[#1A1C1C] font-extrabold py-3.5 rounded-2xl text-sm shadow-md"
                  >
                    รับรางวัล & กลับสู่บทเรียน
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Flag className="w-5 h-5 text-red-500" /> รายงานปัญหาบทเรียนนี้
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              ระบุเหตุผลเพื่อช่วยทีมงานปรับปรุงคุณภาพบทเรียนให้ดียิ่งขึ้น
            </p>

            <form onSubmit={handleSendReport} className="space-y-4 mt-4">
              <div className="space-y-2">
                {[
                  'เนื้อหาไม่อัปเดต/มีข้อผิดพลาด',
                  'วิดีโอไม่เล่นหรือไม่มีเสียง',
                  'คำถามควิซไม่ตรงบทเรียน',
                  'เนื้อหาไม่เหมาะสมสำหรับนักเรียน'
                ].map((reason, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={reportReason === reason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="accent-[#1A1C1C]"
                    />
                    {reason}
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A1C1C] hover:bg-black text-white font-bold py-3 rounded-xl text-xs transition-all"
              >
                ยืนยันส่งรายงานให้ทีมงาน
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
