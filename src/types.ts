export type GradeLevel = 'ม.1' | 'ม.2' | 'ม.3';

export type SubjectType = 'คณิตศาสตร์' | 'วิทยาศาสตร์' | 'ภาษาอังกฤษ' | 'ภาษาไทย' | 'เทคโนโลยี/Coding' | 'สังคมศึกษา';

export type UserRole = 'student' | 'creator' | 'admin';

export interface UserProfile {
  isLoggedIn: boolean;
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
  avatar: string;
  isOnboarded: boolean;
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

