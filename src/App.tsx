import React, { useState } from 'react';
import { UserProfile, Course, Comment, LeaderboardUser, Badge, DailyQuest, UserRole } from './types';
import { INITIAL_COURSES, INITIAL_COMMENTS, LEADERBOARD_USERS, BADGES_LIST, DAILY_QUESTS } from './mockData';
import { Navbar } from './components/Navbar';
import { UserStatsBar } from './components/UserStatsBar';
import { HeroLanding } from './components/HeroLanding';
import { DiscoverFeed } from './components/DiscoverFeed';
import { MyCoursesView } from './components/MyCoursesView';
import { ClassroomView } from './components/ClassroomView';
import { LeaderboardView } from './components/LeaderboardView';
import { QuizGameArena } from './components/QuizGameArena';
import { CreatorStudioView } from './components/CreatorStudioView';
import { AdminPortalView } from './components/AdminPortalView';
import { AboutView } from './components/AboutView';
import { LoginModal } from './components/LoginModal';
import { OnboardingModal } from './components/OnboardingModal';
import { DailyQuestsModal } from './components/DailyQuestsModal';
import { AiTutorFab } from './components/AiTutorFab';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('discover');
  
  // User Profile State
  const [user, setUser] = useState<UserProfile>({
    isLoggedIn: true,
    phone: '081-234-5678',
    email: 'creator.pae@eduthai.org',
    name: 'ครูพี่เป้ (Creator)',
    school: 'โรงเรียนไกลกังวล',
    grade: 'ม.2',
    role: 'creator',
    age: 28,
    strengths: ['คณิตศาสตร์', 'วิทยาศาสตร์'],
    interests: ['ปัญญาประดิษฐ์ AI', 'เกมการเรียนรู้'],
    exp: 3450,
    level: 8,
    coins: 18500,
    streakDays: 14,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TeacherPae',
    isOnboarded: true
  });

  // App Data State
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>(LEADERBOARD_USERS);
  const [badges, setBadges] = useState<Badge[]>(BADGES_LIST);
  const [quests, setQuests] = useState<DailyQuest[]>(DAILY_QUESTS);

  // Active View State
  const [selectedCourse, setSelectedCourse] = useState<Course>(INITIAL_COURSES[0]);

  // Modals State
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const [questsModalOpen, setQuestsModalOpen] = useState(false);
  const [aiTutorFabOpen, setAiTutorFabOpen] = useState(false);

  // Celebration Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Login handler
  const handleLoginSuccess = (userData: { name: string; phone: string; email: string; role: UserRole; school: string; grade: any }) => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: true,
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      role: userData.role,
      school: userData.school,
      grade: userData.grade
    }));
    setLoginModalOpen(false);

    const roleNameMap = {
      student: 'นักเรียน',
      creator: 'ครู / ครีเอเตอร์',
      admin: 'ผู้ดูแลระบบ / ผู้พัฒนา'
    };

    showToast(`เข้าสู่ระบบสิทธิ์ ${roleNameMap[userData.role]} เรียบร้อยแล้ว! ยินดีต้อนรับ ${userData.name}`);

    if (userData.role === 'creator') {
      setCurrentTab('creator');
    } else if (userData.role === 'admin') {
      setCurrentTab('admin');
    }

    if (!user.isOnboarded && userData.role === 'student') {
      setOnboardingModalOpen(true);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: false
    }));
    showToast('ออกจากระบบเรียบร้อยแล้ว');
  };

  // Onboarding Complete
  const handleOnboardingComplete = (updatedData: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
    setOnboardingModalOpen(false);
    showToast('🎉 ตั้งค่า AI Personalization สำเร็จ! รับโบนัสแรกเข้า +100 EXP');
  };

  // Course Enroll
  const handleEnrollCourse = (courseId: string) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          return { ...c, isEnrolled: true, progress: 10 };
        }
        return c;
      })
    );

    setUser(prev => ({
      ...prev,
      exp: prev.exp + 150,
      coins: prev.coins + 50
    }));

    showToast('ลงเรียนสำเร็จ! รับโบนัส +150 EXP และ +50 เหรียญ 🪙');
  };

  // Add Comment in Classroom
  const handleAddComment = (text: string) => {
    const newCmt: Comment = {
      id: `c-${Date.now()}`,
      userName: user.name,
      userAvatar: user.avatar,
      content: text,
      timestamp: 'เมื่อสักครู่',
      likes: 0
    };
    setComments([newCmt, ...comments]);
    showToast('ส่งความคิดเห็นเรียบร้อยแล้ว');
  };

  // Quiz completion award
  const handleCompleteQuiz = (earnedExp: number, earnedCoins: number) => {
    setUser(prev => ({
      ...prev,
      exp: prev.exp + earnedExp,
      coins: prev.coins + earnedCoins
    }));

    setQuests(prev =>
      prev.map(q => (q.id === 'q-1' ? { ...q, isCompleted: true, progress: 1 } : q))
    );

    showToast(`🎉 ทำควิซสำเร็จ! ได้รับ +${earnedExp} EXP และ +${earnedCoins} เหรียญ 🪙`);
  };

  // Quest Claim Reward
  const handleClaimQuestReward = (questId: string) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest) return;

    setQuests(prev =>
      prev.map(q => (q.id === questId ? { ...q, isCompleted: true } : q))
    );

    setUser(prev => ({
      ...prev,
      exp: prev.exp + targetQuest.expReward,
      coins: prev.coins + targetQuest.coinsReward
    }));

    showToast(`รับรางวัลภารกิจ! +${targetQuest.expReward} EXP และ +${targetQuest.coinsReward} เหรียญ`);
  };

  // Mini-game Awards
  const handleGameAward = (earnedExp: number, earnedCoins: number) => {
    setUser(prev => ({
      ...prev,
      exp: prev.exp + earnedExp,
      coins: prev.coins + earnedCoins
    }));
    showToast(`รางวัลเกม Speed Quiz! +${earnedExp} EXP และ +${earnedCoins} เหรียญ 🪙`);
  };

  // Creator Withdrawal Handler
  const handleRequestWithdrawal = (coins: number) => {
    setUser(prev => ({
      ...prev,
      coins: Math.max(0, prev.coins - coins)
    }));
    showToast(`ส่งคำขอถอนเงิน ${coins.toLocaleString()} เหรียญเรียบร้อยแล้ว!`);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C1C] flex flex-col selection:bg-[#C2E114] selection:text-[#1A1C1C]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#2D3436] text-white px-6 py-3.5 rounded-2xl shadow-2xl border-2 border-[#C2E114] flex items-center gap-3 animate-fade-in font-medium text-xs sm:text-sm">
          <Sparkles className="w-5 h-5 text-[#C2E114]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        user={user}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Gamification Stats Bar (Always visible if logged in) */}
      {user.isLoggedIn && (
        <UserStatsBar
          user={user}
          quests={quests}
          onOpenQuests={() => setQuestsModalOpen(true)}
          onOpenAiTutor={() => setAiTutorFabOpen(true)}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-8">
        
        {/* Landing Hero (shown if not logged in & on discover) */}
        {!user.isLoggedIn && currentTab === 'discover' && (
          <HeroLanding
            onStartFree={() => setLoginModalOpen(true)}
            onExploreCourses={() => setCurrentTab('discover')}
            onOpenAbout={() => setCurrentTab('about')}
          />
        )}

        {/* Tab 0: About Us / JUMP TH Project Info */}
        {currentTab === 'about' && (
          <AboutView
            onStartFree={() => setLoginModalOpen(true)}
            onExploreCourses={() => setCurrentTab('discover')}
          />
        )}

        {/* Tab 1: Discover / Home Feed */}
        {currentTab === 'discover' && (
          <DiscoverFeed
            courses={courses}
            user={user}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setCurrentTab('classroom');
            }}
            onEnrollCourse={handleEnrollCourse}
            onStartOnboarding={() => setOnboardingModalOpen(true)}
          />
        )}

        {/* Tab 2: My Courses */}
        {currentTab === 'mycourses' && (
          <MyCoursesView
            courses={courses}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setCurrentTab('classroom');
            }}
            onExploreMore={() => setCurrentTab('discover')}
          />
        )}

        {/* Tab 3: Classroom Video Player & Social Features */}
        {currentTab === 'classroom' && (
          <ClassroomView
            course={selectedCourse}
            comments={comments}
            user={user}
            onAddComment={handleAddComment}
            onCompleteQuiz={handleCompleteQuiz}
            onBackToFeed={() => setCurrentTab('discover')}
          />
        )}

        {/* Tab 4: Leaderboard & Badges */}
        {currentTab === 'leaderboard' && (
          <LeaderboardView
            users={leaderboardUsers}
            badges={badges}
            currentUser={user}
          />
        )}

        {/* Tab 5: Games Arena */}
        {currentTab === 'games' && (
          <QuizGameArena onAwardCoinsAndExp={handleGameAward} />
        )}

        {/* Tab 6: Creator Studio */}
        {currentTab === 'creator' && (
          <CreatorStudioView
            user={user}
            onRequestWithdrawal={handleRequestWithdrawal}
            onSendAdminTicket={(subject, message) => showToast(`ส่งคำถามหาแอดมิน: "${subject}" เรียบร้อยแล้ว`)}
          />
        )}

        {/* Tab 7: Admin & Developer Portal */}
        {currentTab === 'admin' && (
          <AdminPortalView
            user={user}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#2D3436] text-white border-t border-gray-800 py-10 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-lg text-white">EduThai AI</span>
              <span className="bg-[#C2E114] text-[#2D3436] text-[10px] font-bold px-2 py-0.5 rounded-full">
                ม.1 - ม.3
              </span>
            </div>
            <p className="text-xs text-gray-400">
              แพลตฟอร์มการศึกษาไทยเพื่อลดความเหลื่อมล้ำด้วย AI Personalization, Creator Studio และ Gamification
            </p>
          </div>

          <div className="text-xs text-gray-400">
            © 2026 EduThai AI Project • ได้รับการพัฒนาเพื่อการศึกษาโดยไม่มีค่าใช้จ่าย
          </div>
        </div>
      </footer>

      {/* Floating AI Tutor FAB */}
      <AiTutorFab
        isOpen={aiTutorFabOpen}
        onToggle={() => setAiTutorFabOpen(!aiTutorFabOpen)}
      />

      {/* Login & OTP Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Onboarding Wizard Modal */}
      <OnboardingModal
        isOpen={onboardingModalOpen}
        user={user}
        onComplete={handleOnboardingComplete}
      />

      {/* Daily Quests Drawer */}
      <DailyQuestsModal
        isOpen={questsModalOpen}
        onClose={() => setQuestsModalOpen(false)}
        quests={quests}
        onClaimReward={handleClaimQuestReward}
        onNavigateQuest={(target) => setCurrentTab(target)}
      />

    </div>
  );
}
