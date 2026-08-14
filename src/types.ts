export interface CartItem {
  cartItemId: string;
  itemId: string;
  type: 'course' | 'decor' | 'coinPackage';
  title: string;
  categoryName: string;
  price: number;
  currency: 'COINS' | 'THB';
  thumbnail?: string;
  originalItem?: any;
}

export type GradeLevel = 'ม.1' | 'ม.2' | 'ม.3';

export type SubjectType = 'คณิตศาสตร์' | 'วิทยาศาสตร์' | 'ภาษาอังกฤษ' | 'ภาษาไทย' | 'เทคโนโลยี/Coding' | 'สังคมศึกษา';

export type UserRole = 'student' | 'creator' | 'admin';

export type SubscriptionPlanType = 'unlimited' | 'no_ads' | 'premium';
export type SubscriptionDuration = '1_week' | '1_month' | '3_months' | '1_year';

export interface SubscriptionPass {
  isActive: boolean;
  type: SubscriptionPlanType; // 'unlimited' (เรียนไม่อั้น) | 'no_ads' (ข้ามโฆษณา) | 'premium' (ครบทุกอย่าง)
  duration: SubscriptionDuration; // '1_week' | '1_month' | '3_months' | '1_year'
  planName: string;
  expiresAt: string;
  daysRemaining?: number;
  canAccessBuffet: boolean; // เข้าเรียนคอร์สที่ร่วมรายการบุฟเฟ่ต์ได้ฟรี
  canSkipAds: boolean; // ข้ามโฆษณาคั่นได้ทั้งหมด
  isPremiumPerks?: boolean; // สิทธิประโยชน์พิเศษ VIP เช่น โบนัส EXP x2, โหลดชีท PDF HD, มงกุฎทอง
  isMonthly?: boolean;
}

export interface DecorItem {
  id: string;
  name: string;
  type: 'avatar' | 'frame' | 'effect';
  price: number; // 0 = default/free
  description: string;
  avatarUrl?: string; // for avatar items
  frameBorderClass?: string; // css classes for border/glow
  frameBadge?: string;
  effectClass?: string; // animation/glow effect
  effectBadge?: string;
  tag?: string; // e.g. 'HOT', 'NEW', 'VIP', 'RERENDER'
}

export interface UserProfile {
  isLoggedIn: boolean;
  username?: string;
  description?: string;
  gender?: string;
  dateOfBirth?: string;
  phone: string;
  email?: string;
  name: string;
  school: string;
  grade: GradeLevel;
  role: UserRole;
  age: number;
  strengths: string[];
  interests: string[];
  exp: number;
  level: number;
  coins: number;
  streakDays: number;
  avatar: string; // Active primary avatar image
  isOnboarded: boolean;
  
  // Customization & Shop Inventory
  equippedFrameId?: string;
  equippedEffectId?: string;
  ownedAvatars?: string[];
  ownedFrameIds?: string[];
  ownedEffectIds?: string[];
  subscriptionPass?: SubscriptionPass;

  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface CreatorContent {
  id: string;
  title: string;
  type: 'course' | 'game' | 'video';
  subject: SubjectType;
  grade: GradeLevel;
  priceCoins: number; // 0 = Free
  status: 'approved' | 'pending' | 'rejected';
  adminNote?: string;
  views: number;
  studentsEnrolled: number;
  rating: number;
  createdDate: string;
  thumbnail: string;
  creatorName: string;
  isBuffetIncluded?: boolean; // เข้าร่วมแคมเปญบุฟเฟ่ต์เรียนไม่อั้น
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchName?: string;
  isVerified: boolean;
  updatedAt?: string;
}

export interface MonthlyPayoutRecord {
  id: string;
  monthPeriod: string; // e.g. 'สิงหาคม 2026'
  payoutDate: string; // e.g. '01 ก.ย. 2026'
  courseRevenueThb: number; // รายได้จากคอร์สเรียน
  donationRevenueThb: number; // รายได้จากโดเนท
  totalGrossThb: number; // รวมรายได้ทั้งหมด (คอร์ส + โดเนท)
  commissionFeeThb: number; // หักคอมมิชชั่น 4%
  platformMaintenanceFeeThb: number; // หักค่าบำรุงแพลตฟอร์ม 2%
  totalDeductionsThb: number; // รวมหัก 6%
  netPayoutThb: number; // ยอดสุทธิที่จะโอนเข้าบัญชี
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'scheduled' | 'processing' | 'completed';
  transactionRef?: string;
}

export interface WithdrawalRequest {
  id: string;
  coinsAmount: number;
  thbAmount: number;
  commissionThb: number;
  netThb: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'completed' | 'pending' | 'rejected';
  requestedDate: string;
}

export interface AdminTicket {
  id: string;
  senderName: string;
  senderRole: 'student' | 'creator';
  senderEmailOrPhone: string;
  subject: string;
  message: string;
  status: 'open' | 'resolved';
  createdDate: string;
  reply?: string;
}

export interface DonationRecord {
  id: string;
  targetType: 'platform' | 'creator';
  targetName: string;
  donorName: string;
  coinsAmount: number;
  message?: string;
  timestamp: string;
}


export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isCompleted: boolean;
  isLocked: boolean;
  description: string;
  pdfNotesUrl?: string;
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  subject: SubjectType;
  grade: GradeLevel;
  instructor: string;
  school: string;
  thumbnail: string;
  duration: string;
  lessonsCount: number;
  expReward: number;
  coinsReward: number;
  progress: number; // 0 to 100
  description: string;
  rating: number;
  isEnrolled: boolean;
  isRecommended?: boolean;
  priceCoins?: number; // 0 = Free, or coin price for single purchase
  isBuffetIncluded?: boolean; // เข้าร่วมแคมเปญบุฟเฟ่ต์เรียนไม่อั้น (Unlimited Buffet Pass)
  lessons: Lesson[];
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  school: string;
  grade: GradeLevel;
  exp: number;
  coins: number;
  avatar: string;
  badgeTitle: string;
  isCurrentUser?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  category: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  expReward: number;
  coinsReward: number;
  isCompleted: boolean;
  progress: number;
  total: number;
  targetView: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

export interface CreatorGameQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CreatorGame {
  id: string;
  title: string;
  creatorName: string;
  creatorSchool: string;
  creatorAvatar: string;
  subject: SubjectType;
  grade: GradeLevel;
  thumbnail: string;
  playsCount: number;
  rating: number;
  likesCount: number;
  isLiked?: boolean;
  expReward: number;
  coinsReward: number;
  timePerQuestion: number; // in seconds
  description: string;
  tags: string[];
  questions: CreatorGameQuestion[];
}

