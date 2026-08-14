import React, { useState } from 'react';
import { UserProfile, Course, Comment, LeaderboardUser, Badge, DailyQuest, UserRole, DecorItem, CartItem, SubscriptionPlanType, SubscriptionDuration } from './types';
import { INITIAL_COURSES, INITIAL_COMMENTS, LEADERBOARD_USERS, BADGES_LIST, DAILY_QUESTS } from './mockData';
import { DECOR_AVATARS, DECOR_FRAMES, DECOR_EFFECTS } from './data/decorShopData';
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
import { CoinShopView } from './components/CoinShopView';
import { DecorShopView } from './components/DecorShopView';
import { ProfileView } from './components/ProfileView';
import { LoginModal } from './components/LoginModal';
import { OnboardingModal } from './components/OnboardingModal';
import { DailyQuestsModal } from './components/DailyQuestsModal';
import { CartDrawerModal } from './components/CartDrawerModal';
import { DonationModal } from './components/DonationModal';
import { AiTutorFab } from './components/AiTutorFab';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('discover');
  
  // User Profile State
  const [user, setUser] = useState<UserProfile>({
    isLoggedIn: true,
    username: 'krupape_official',
    description: 'ครูผู้หลงใหลในเทคโนโลยี และการพัฒนาสื่อการเรียนรู้ EdTech สู่เด็กไทย',
    gender: 'ชาย',
    dateOfBirth: '15/08/1998',
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
    coins: 1850,
    streakDays: 14,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TeacherPae',
    equippedFrameId: 'frame-neon-glow',
    equippedEffectId: 'effect-none',
    ownedAvatars: ['avatar-default-1', 'avatar-default-2', 'avatar-cyber-hero'],
    ownedFrameIds: ['frame-none', 'frame-neon-glow'],
    ownedEffectIds: ['effect-none', 'effect-fire-aura'],
    subscriptionPass: {
      isActive: true,
      planName: 'EduPass VIP (รายเดือน)',
      expiresAt: '30 ก.ย. 2026',
      isMonthly: true
    },
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

  // Modals & Cart State
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const [questsModalOpen, setQuestsModalOpen] = useState(false);
  const [aiTutorFabOpen, setAiTutorFabOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Voluntary Donation State
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [donationTargetType, setDonationTargetType] = useState<'platform' | 'creator'>('platform');
  const [donationTargetName, setDonationTargetName] = useState<string>('โครงการเพื่อการศึกษาเท่าเทียม (JUMP TH Platform)');
  const [donationRecipientAvatar, setDonationRecipientAvatar] = useState<string | undefined>(undefined);
  const [donationCourseTitle, setDonationCourseTitle] = useState<string | undefined>(undefined);

  // Celebration Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Platform Donation
  const handleOpenDonatePlatform = () => {
    setDonationTargetType('platform');
    setDonationTargetName('โครงการเพื่อการศึกษาเท่าเทียม (JUMP TH Platform)');
    setDonationRecipientAvatar(undefined);
    setDonationCourseTitle(undefined);
    setDonationModalOpen(true);
  };

  // Open Creator Donation
  const handleOpenDonateCreator = (instructorName: string, courseTitle?: string) => {
    setDonationTargetType('creator');
    setDonationTargetName(instructorName);
    setDonationRecipientAvatar(undefined);
    setDonationCourseTitle(courseTitle || selectedCourse?.title);
    setDonationModalOpen(true);
  };

  // Confirm Donation Execution
  const handleConfirmDonation = (amount: number, message: string) => {
    if (user.coins < amount) {
      showToast(`⚠️ เหรียญสะสมไม่เพียงพอ (คุณมี ${user.coins} เหรียญ ขาดอีก ${(amount - user.coins).toLocaleString()} เหรียญ)`);
      return;
    }

    // Deduct coins & give generous kindness EXP bonus (+25 EXP per donation)
    setUser(prev => ({
      ...prev,
      coins: prev.coins - amount,
      exp: prev.exp + 25
    }));

    if (donationTargetType === 'platform') {
      showToast(`💖 ขอบคุณที่ร่วมสนับสนุนแพลตฟอร์ม ${amount} เหรียญ! (+25 EXP ค่าความดี)`);
    } else {
      showToast(`🎁 ส่งเหรียญ ${amount} เหรียญและข้อความให้ "${donationTargetName}" สำเร็จแล้ว! (+25 EXP)`);
    }
  };

  // Cart Handler Functions
  const handleAddToCart = (item: {
    itemId: string;
    type: 'course' | 'decor' | 'coinPackage';
    title: string;
    categoryName: string;
    price: number;
    currency: 'COINS' | 'THB';
    thumbnail?: string;
    originalItem?: any;
  }) => {
    // Check duplicate in cart
    const exists = cartItems.some(ci => ci.itemId === item.itemId);
    if (exists) {
      showToast(`🛒 "${item.title}" มีอยู่ในตะกร้าสินค้าแล้ว`);
      return;
    }

    // Check if course is already enrolled
    if (item.type === 'course') {
      const course = courses.find(c => c.id === item.itemId);
      if (course?.isEnrolled) {
        showToast(`คุณได้ลงเรียนคอร์ส "${item.title}" เรียบร้อยแล้ว`);
        return;
      }
    }

    const newCartItem: CartItem = {
      cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      itemId: item.itemId,
      type: item.type,
      title: item.title,
      categoryName: item.categoryName,
      price: item.price,
      currency: item.currency,
      thumbnail: item.thumbnail,
      originalItem: item.originalItem
    };

    setCartItems(prev => [...prev, newCartItem]);
    showToast(`🛒 เพิ่ม "${item.title}" ลงตะกร้าเรียบร้อยแล้ว`);
  };

  const handleAddCourseToCart = (course: Course) => {
    handleAddToCart({
      itemId: course.id,
      type: 'course',
      title: course.title,
      categoryName: 'คอร์สเรียน',
      price: 0, // Free course or coin price
      currency: 'COINS',
      thumbnail: course.thumbnail,
      originalItem: course
    });
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('ลบรายการออกจากตะกร้าแล้ว');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('ล้างรายการในตะกร้าทั้งหมดเรียบร้อยแล้ว');
  };

  const handleCheckoutCart = () => {
    if (cartItems.length === 0) return;

    const totalCoins = cartItems
      .filter(item => item.currency === 'COINS')
      .reduce((sum, item) => sum + item.price, 0);

    if (user.coins < totalCoins) {
      showToast(`⚠️ เหรียญไม่พอสำหรับการสั่งซื้อ (ขาดอีก ${(totalCoins - user.coins).toLocaleString()} เหรียญ)`);
      return;
    }

    // Deduct coins if any
    if (totalCoins > 0) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - totalCoins
      }));
    }

    // Process all cart items
    cartItems.forEach(cartItem => {
      if (cartItem.type === 'course') {
        setCourses(prevCourses =>
          prevCourses.map(c => c.id === cartItem.itemId ? { ...c, isEnrolled: true } : c)
        );
      } else if (cartItem.type === 'decor' && cartItem.originalItem) {
        const decorItem = cartItem.originalItem;
        setUser(prev => {
          if (decorItem.type === 'avatar') {
            const owned = prev.ownedAvatars || [];
            return {
              ...prev,
              avatar: decorItem.avatarUrl || prev.avatar,
              ownedAvatars: Array.from(new Set([...owned, decorItem.id]))
            };
          }
          if (decorItem.type === 'frame') {
            const owned = prev.ownedFrameIds || [];
            return {
              ...prev,
              equippedFrameId: decorItem.id,
              ownedFrameIds: Array.from(new Set([...owned, decorItem.id]))
            };
          }
          if (decorItem.type === 'effect') {
            const owned = prev.ownedEffectIds || [];
            return {
              ...prev,
              equippedEffectId: decorItem.id,
              ownedEffectIds: Array.from(new Set([...owned, decorItem.id]))
            };
          }
          return prev;
        });
      }
    });

    const itemsCount = cartItems.length;
    setCartItems([]);
    setCartModalOpen(false);
    showToast(`🎉 สั่งซื้อคอร์สเรียนและของตกแต่ง ${itemsCount} รายการเรียบร้อยแล้ว!`);
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
    const targetCourse = courses.find(c => c.id === courseId);
    if (!targetCourse) return;

    const hasBuffetPass = Boolean(user.subscriptionPass?.isActive && user.subscriptionPass?.canAccessBuffet);
    const isBuffetCourse = Boolean(targetCourse.isBuffetIncluded);

    // Check if course has price and user needs to pay (unless covered by buffet pass)
    if (targetCourse.priceCoins && targetCourse.priceCoins > 0 && !(isBuffetCourse && hasBuffetPass)) {
      if (user.coins < targetCourse.priceCoins) {
        showToast(`⚠️ คอร์สนี้ต้องใช้ ${targetCourse.priceCoins} เหรียญ หรือสมัครแพ็กเกจเรียนไม่อั้น`);
        return;
      }
      setUser(prev => ({
        ...prev,
        coins: prev.coins - (targetCourse.priceCoins || 0)
      }));
    }

    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          return { ...c, isEnrolled: true, progress: 10 };
        }
        return c;
      })
    );

    const isVIP = Boolean(user.subscriptionPass?.isActive && user.subscriptionPass?.isPremiumPerks);
    const earnedExp = isVIP ? (targetCourse.expReward * 2 || 300) : (targetCourse.expReward || 150);
    const earnedCoins = isVIP ? 100 : 50;

    setUser(prev => ({
      ...prev,
      exp: prev.exp + earnedExp,
      coins: prev.coins + earnedCoins
    }));

    if (isBuffetCourse && hasBuffetPass) {
      showToast(`⚡ ลงเรียนสำเร็จด้วยสิทธิ์บุฟเฟ่ต์เรียนไม่อั้น (Buffet Pass)! รับ +${earnedExp} EXP และ +${earnedCoins} เหรียญ 🪙`);
    } else {
      showToast(`ลงเรียนสำเร็จ! รับโบนัส +${earnedExp} EXP และ +${earnedCoins} เหรียญ 🪙`);
    }
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

  // Update Coins from CoinShop
  const handleUpdateUserCoins = (amount: number, reason: string) => {
    setUser(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
    showToast(`🎉 ${reason} (+${amount.toLocaleString()} เหรียญ)`);
  };

  // Subscribe Pass
  const handleSubscribePass = (
    planType: SubscriptionPlanType,
    duration: SubscriptionDuration,
    planName: string,
    days: number,
    paymentCurrency: 'THB' | 'COINS' = 'THB',
    price: number = 0
  ) => {
    if (paymentCurrency === 'COINS' && price > 0) {
      if (user.coins < price) {
        showToast('⚠️ เหรียญไม่เพียงพอสำหรับการสมัครแพ็กเกจ');
        return;
      }
      setUser(prev => ({ ...prev, coins: prev.coins - price }));
    }

    const durationLabels: Record<SubscriptionDuration, string> = {
      '1_week': '7 วัน',
      '1_month': '30 วัน',
      '3_months': '90 วัน',
      '1_year': '365 วัน'
    };

    const canAccessBuffet = planType === 'unlimited' || planType === 'premium';
    const canSkipAds = planType === 'no_ads' || planType === 'premium';
    const isPremiumPerks = planType === 'premium';

    setUser(prev => ({
      ...prev,
      subscriptionPass: {
        isActive: true,
        type: planType,
        duration,
        planName,
        expiresAt: `${durationLabels[duration] || '30 วัน'} นับจากวันนี้`,
        isMonthly: duration === '1_month',
        canAccessBuffet,
        canSkipAds,
        isPremiumPerks,
        daysRemaining: days
      }
    }));

    showToast(`👑 เปิดใช้งาน "${planName}" (${durationLabels[duration] || ''}) สำเร็จ! ${canAccessBuffet ? '⚡ ปลดล็อกคอร์สบุฟเฟ่ต์เรียนไม่อั้น' : ''} ${canSkipAds ? '🛡️ ข้ามโฆษณา 100%' : ''}`);
  };

  // Buy Decor Item
  const handleBuyDecorItem = (item: DecorItem) => {
    if (user.coins < item.price) {
      showToast('⚠️ เหรียญสะสมไม่เพียงพอ กรุณาเติมเหรียญเพิ่ม');
      return;
    }

    setUser(prev => {
      const updatedCoins = prev.coins - item.price;
      if (item.type === 'avatar') {
        const owned = prev.ownedAvatars || [];
        return {
          ...prev,
          coins: updatedCoins,
          avatar: item.avatarUrl || prev.avatar,
          ownedAvatars: Array.from(new Set([...owned, item.id]))
        };
      }
      if (item.type === 'frame') {
        const owned = prev.ownedFrameIds || [];
        return {
          ...prev,
          coins: updatedCoins,
          equippedFrameId: item.id,
          ownedFrameIds: Array.from(new Set([...owned, item.id]))
        };
      }
      if (item.type === 'effect') {
        const owned = prev.ownedEffectIds || [];
        return {
          ...prev,
          coins: updatedCoins,
          equippedEffectId: item.id,
          ownedEffectIds: Array.from(new Set([...owned, item.id]))
        };
      }
      return prev;
    });

    showToast(`🎉 ซื้อไอเทม "${item.name}" สำเร็จ! สวมใส่บนโปรไฟล์เรียบร้อยแล้ว`);
  };

  // Equip Decor Item
  const handleEquipDecorItem = (item: DecorItem) => {
    setUser(prev => {
      if (item.type === 'avatar' && item.avatarUrl) {
        return { ...prev, avatar: item.avatarUrl };
      }
      if (item.type === 'frame') {
        return { ...prev, equippedFrameId: item.id };
      }
      if (item.type === 'effect') {
        return { ...prev, equippedEffectId: item.id };
      }
      return prev;
    });
    showToast(`สวมใส่ "${item.name}" บนโปรไฟล์แล้ว`);
  };

  // Update Profile
  const handleUpdateProfile = (updatedFields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
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
        cartCount={cartItems.length}
        onOpenCart={() => setCartModalOpen(true)}
      />

      {/* Gamification Stats Bar (Always visible if logged in) */}
      {user.isLoggedIn && (
        <UserStatsBar
          user={user}
          quests={quests}
          onOpenQuests={() => setQuestsModalOpen(true)}
          onOpenAiTutor={() => setAiTutorFabOpen(true)}
          onOpenProfile={() => setCurrentTab('profile')}
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
            onOpenDonatePlatform={handleOpenDonatePlatform}
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
            onAddCourseToCart={handleAddCourseToCart}
            onOpenDonatePlatform={handleOpenDonatePlatform}
            onNavigateSubscription={() => setCurrentTab('coinshop')}
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
            onOpenDonateCreator={(instructor) => handleOpenDonateCreator(instructor, selectedCourse?.title)}
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

        {/* Tab: Coin Shop & Subscription */}
        {currentTab === 'coinshop' && (
          <CoinShopView
            user={user}
            onUpdateUserCoins={handleUpdateUserCoins}
            onSubscribePass={handleSubscribePass}
            onOpenDecorShop={() => setCurrentTab('shop')}
          />
        )}

        {/* Tab: Decor Shop */}
        {currentTab === 'shop' && (
          <DecorShopView
            user={user}
            onBuyItem={handleBuyDecorItem}
            onEquipItem={handleEquipDecorItem}
            onNavigateTopUp={() => setCurrentTab('coinshop')}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Tab: Profile & Edit Profile */}
        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            badges={badges}
            onUpdateProfile={handleUpdateProfile}
            onNavigateShop={() => setCurrentTab('shop')}
            onNavigateTopUp={() => setCurrentTab('coinshop')}
          />
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

      {/* Shopping Cart Drawer Modal */}
      <CartDrawerModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cartItems={cartItems}
        user={user}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckoutCart={handleCheckoutCart}
        onNavigateToShop={() => setCurrentTab('shop')}
      />

      {/* Voluntary Donation Modal (Platform & Creator) */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        user={user}
        targetType={donationTargetType}
        targetName={donationTargetName}
        courseTitle={donationCourseTitle}
        recipientAvatar={donationRecipientAvatar}
        onConfirmDonate={handleConfirmDonation}
        onNavigateTopUp={() => setCurrentTab('coinshop')}
      />

    </div>
  );
}
