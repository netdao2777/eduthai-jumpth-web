import React, { useState } from 'react';
import { UserProfile, SubscriptionPlanType, SubscriptionDuration } from '../types';
import {
  Coins,
  Crown,
  Sparkles,
  Check,
  X,
  QrCode,
  CreditCard,
  ShieldCheck,
  Zap,
  ArrowRight,
  Gift,
  CheckCircle2,
  Clock,
  Calculator,
  Percent,
  PlaySquare,
  ShieldOff,
  Flame,
  FileText,
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';

interface CoinShopViewProps {
  user: UserProfile;
  onUpdateUserCoins: (amount: number, reason: string) => void;
  onSubscribePass: (
    planType: SubscriptionPlanType,
    duration: SubscriptionDuration,
    planName: string,
    days: number,
    paymentCurrency?: 'THB' | 'COINS',
    price?: number
  ) => void;
  onOpenDecorShop: () => void;
}

export interface CoinPackage {
  id: string;
  priceThb: number;
  baseCoins: number;
  bonusCoins: number;
  bonusPercentText: string;
  badge: string | null;
  isPopular?: boolean;
}

// Maximum bonus limit per top-up transaction (600 coins cap)
export const MAX_BONUS_COINS = 600;

// 1 Baht = 1 Coin + Tiered bonus for top-ups >= 100 Baht (Capped at 600 bonus coins)
const COIN_PACKAGES: CoinPackage[] = [
  { id: 'c-20', priceThb: 20, baseCoins: 20, bonusCoins: 0, bonusPercentText: '0%', badge: null },
  { id: 'c-50', priceThb: 50, baseCoins: 50, bonusCoins: 0, bonusPercentText: '0%', badge: 'เริ่มต้น' },
  { id: 'c-100', priceThb: 100, baseCoins: 100, bonusCoins: 10, bonusPercentText: '+10%', badge: '✨ เริ่มต้นรับโบนัส' },
  { id: 'c-200', priceThb: 200, baseCoins: 200, bonusCoins: 30, bonusPercentText: '+15%', badge: 'คุ้มค่า' },
  { id: 'c-300', priceThb: 300, baseCoins: 300, bonusCoins: 45, bonusPercentText: '+15%', badge: '🔥 ขายดีที่สุด', isPopular: true },
  { id: 'c-500', priceThb: 500, baseCoins: 500, bonusCoins: 100, bonusPercentText: '+20%', badge: '🌟 โบนัสจุใจ' },
  { id: 'c-1000', priceThb: 1000, baseCoins: 1000, bonusCoins: 250, bonusPercentText: '+25%', badge: '👑 VIP ซูเปอร์คุ้ม' },
  { id: 'c-2000', priceThb: 2000, baseCoins: 2000, bonusCoins: 600, bonusPercentText: '+30% (สูงสุด)', badge: '🚀 คุ้มที่สุด (โบนัสสูงสุด 600)' },
];

export interface SubscriptionPlanDefinition {
  type: SubscriptionPlanType;
  title: string;
  thaiTitle: string;
  subtitle: string;
  badge: string;
  popular?: boolean;
  accentColor: string;
  pricing: Record<
    SubscriptionDuration,
    {
      priceThb: number;
      priceCoins: number;
      days: number;
      label: string;
      savingsBadge?: string;
      perDay: string;
    }
  >;
  features: {
    name: string;
    included: boolean;
    highlight?: boolean;
    note?: string;
  }[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlanDefinition[] = [
  {
    type: 'unlimited',
    title: 'Unlimited Learning Buffet',
    thaiTitle: 'แพ็กเกจเรียนไม่อั้น (บุฟเฟ่ต์)',
    subtitle: 'เข้าถึงทุกคอร์สที่ร่วมแคมเปญบุฟเฟ่ต์ได้ไม่อั้น ไม่ต้องซื้อรายคอร์สแยก',
    badge: '⚡ เรียนบุฟเฟ่ต์ไม่อั้น',
    popular: false,
    accentColor: 'blue',
    pricing: {
      '1_week': { priceThb: 49, priceCoins: 49, days: 7, label: '1 สัปดาห์ (7 วัน)', perDay: '฿7.0/วัน' },
      '1_month': { priceThb: 149, priceCoins: 149, days: 30, label: '1 เดือน (30 วัน)', savingsBadge: 'แนะนำ', perDay: '฿4.9/วัน' },
      '3_months': { priceThb: 399, priceCoins: 399, days: 90, label: '3 เดือน (90 วัน)', savingsBadge: 'ประหยัด 11%', perDay: '฿4.4/วัน' },
      '1_year': { priceThb: 1390, priceCoins: 1390, days: 365, label: '1 ปี (365 วัน)', savingsBadge: 'ประหยัด 22%', perDay: '฿3.8/วัน' },
    },
    features: [
      { name: 'เข้าเรียนคอร์สทั้งหมดที่ร่วมแคมเปญบุฟเฟ่ต์ได้ไม่อั้น', included: true, highlight: true, note: 'คอร์สที่ร่วมรายการจากครูชั้นนำ' },
      { name: 'เรียนบทเรียนวิดีโอและทำควิซแบบปรับระดับ AI', included: true },
      { name: 'ไม่มีจำกัดจำนวนครั้งในการเรียนซ้ำ', included: true },
      { name: 'โฆษณาสนับสนุนคั่นก่อนเริ่มบทเรียนและควิซ', included: false, note: 'ยังมีโฆษณาคั่น' },
      { name: 'สิทธิประโยชน์ VIP พิเศษ (มงกุฎทอง, EXP x2)', included: false },
    ]
  },
  {
    type: 'no_ads',
    title: 'Ad-Free Pass',
    thaiTitle: 'แพ็กเกจข้ามโฆษณา (ไร้โฆษณากวนใจ)',
    subtitle: 'เรียนต่อเนื่องลื่นไหล ไม่มีโฆษณาคั่นทุกบทเรียนและควิซฝึกฝน',
    badge: '🛡️ ข้ามโฆษณา 100%',
    popular: false,
    accentColor: 'emerald',
    pricing: {
      '1_week': { priceThb: 29, priceCoins: 29, days: 7, label: '1 สัปดาห์ (7 วัน)', perDay: '฿4.1/วัน' },
      '1_month': { priceThb: 89, priceCoins: 89, days: 30, label: '1 เดือน (30 วัน)', savingsBadge: 'คุ้มค่า', perDay: '฿2.9/วัน' },
      '3_months': { priceThb: 239, priceCoins: 239, days: 90, label: '3 เดือน (90 วัน)', savingsBadge: 'ประหยัด 10%', perDay: '฿2.6/วัน' },
      '1_year': { priceThb: 790, priceCoins: 790, days: 365, label: '1 ปี (365 วัน)', savingsBadge: 'ประหยัด 26%', perDay: '฿2.1/วัน' },
    },
    features: [
      { name: 'ข้ามโฆษณาสนับสนุนทั้งหมด 100% (ไม่มีโฆษณาคั่น)', included: true, highlight: true, note: 'ดูวิดีโอและทำควิซได้ทันทีไม่สะดุด' },
      { name: 'เข้าเรียนคอร์สฟรีและคอร์สที่ลงทะเบียนไว้เดิมได้เต็มที่', included: true },
      { name: 'เข้าถึงคอร์สที่ร่วมรายการบุฟเฟ่ต์เรียนไม่อั้น', included: false, note: 'คอร์สบุฟเฟ่ต์/ซื้อเดี่ยวต้องซื้อแยก' },
      { name: 'สิทธิประโยชน์ VIP พิเศษ (มงกุฎทอง, EXP x2)', included: false },
    ]
  },
  {
    type: 'premium',
    title: 'VIP Premium All-Inclusive',
    thaiTitle: 'แพ็กเกจ Premium VIP (ครบทุกสิทธิ์)',
    subtitle: 'ได้ทั้ง เรียนไม่อั้น + ข้ามโฆษณา 100% พร้อมสิทธิประโยชน์ VIP เต็มรูปแบบ',
    badge: '👑 คุ้มค่าที่สุด (VIP ครบวงจร)',
    popular: true,
    accentColor: 'amber',
    pricing: {
      '1_week': { priceThb: 69, priceCoins: 69, days: 7, label: '1 สัปดาห์ (7 วัน)', perDay: '฿9.8/วัน' },
      '1_month': { priceThb: 199, priceCoins: 199, days: 30, label: '1 เดือน (30 วัน)', savingsBadge: '🔥 ยอดนิยม', perDay: '฿6.6/วัน' },
      '3_months': { priceThb: 529, priceCoins: 529, days: 90, label: '3 เดือน (90 วัน)', savingsBadge: 'ประหยัด 11%', perDay: '฿5.8/วัน' },
      '1_year': { priceThb: 1890, priceCoins: 1890, days: 365, label: '1 ปี (365 วัน)', savingsBadge: 'ประหยัด 21%', perDay: '฿5.1/วัน' },
    },
    features: [
      { name: 'เข้าเรียนคอร์สทั้งหมดที่ร่วมแคมเปญบุฟเฟ่ต์ได้ไม่อั้น', included: true, highlight: true },
      { name: 'ข้ามโฆษณาสนับสนุนทั้งหมด 100% (ไม่มีโฆษณาคั่น)', included: true, highlight: true },
      { name: 'รับโบนัสค่าประสบการณ์ EXP & เหรียญ Coins x2 เท่า', included: true, highlight: true },
      { name: 'ปลดล็อกดาวน์โหลดเอกสารสรุป PDF HD คุณภาพสูง', included: true },
      { name: 'ตราสัญลักษณ์มงกุฎทอง Golden VIP บนโปรไฟล์', included: true },
    ]
  }
];

export const CoinShopView: React.FC<CoinShopViewProps> = ({
  user,
  onUpdateUserCoins,
  onSubscribePass,
  onOpenDecorShop
}) => {
  const [activeTab, setActiveTab] = useState<'coins' | 'subscription'>('coins');
  
  // Subscription Duration Selector: '1_week' | '1_month' | '3_months' | '1_year'
  const [selectedDuration, setSelectedDuration] = useState<SubscriptionDuration>('1_month');

  // Checkout states for Coins
  const [selectedPackage, setSelectedPackage] = useState<{
    priceThb: number;
    baseCoins: number;
    bonusCoins: number;
    totalCoins: number;
    title: string;
  } | null>(null);

  // Checkout states for Subscriptions
  const [selectedSubPlan, setSelectedSubPlan] = useState<{
    planType: SubscriptionPlanType;
    duration: SubscriptionDuration;
    planName: string;
    priceThb: number;
    priceCoins: number;
    days: number;
  } | null>(null);

  // Custom amount top-up calculator state
  const [customAmountStr, setCustomAmountStr] = useState<string>('150');

  // Checkout Modal
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card' | 'coins'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Helper to calculate bonus for any amount (1 Baht = 1 Coin base), capped at MAX_BONUS_COINS (600)
  const calculateBonus = (amountThb: number) => {
    if (amountThb < 100) return { bonus: 0, percent: 0, text: '0%', isCapped: false, rawBonus: 0 };

    let rawBonus = 0;
    let percent = 0;
    let text = '0%';

    if (amountThb < 200) {
      rawBonus = Math.floor(amountThb * 0.10);
      percent = 10;
      text = '+10%';
    } else if (amountThb < 500) {
      rawBonus = Math.floor(amountThb * 0.15);
      percent = 15;
      text = '+15%';
    } else if (amountThb < 1000) {
      rawBonus = Math.floor(amountThb * 0.20);
      percent = 20;
      text = '+20%';
    } else if (amountThb < 2000) {
      rawBonus = Math.floor(amountThb * 0.25);
      percent = 25;
      text = '+25%';
    } else {
      rawBonus = Math.floor(amountThb * 0.30);
      percent = 30;
      text = '+30%';
    }

    const isCapped = rawBonus >= MAX_BONUS_COINS;
    const bonus = Math.min(MAX_BONUS_COINS, rawBonus);

    return {
      bonus,
      percent,
      text: isCapped ? `${text} (จำกัดสูงสุด ${MAX_BONUS_COINS} เหรียญ)` : text,
      isCapped,
      rawBonus
    };
  };

  const parsedCustomAmount = Math.max(1, parseInt(customAmountStr, 10) || 0);
  const customBonusData = calculateBonus(parsedCustomAmount);
  const customTotalCoins = parsedCustomAmount + customBonusData.bonus;

  const handleOpenCoinCheckout = (pkg: CoinPackage) => {
    setSelectedPackage({
      priceThb: pkg.priceThb,
      baseCoins: pkg.baseCoins,
      bonusCoins: pkg.bonusCoins,
      totalCoins: pkg.baseCoins + pkg.bonusCoins,
      title: `แพ็กเกจ ฿${pkg.priceThb.toLocaleString()}`
    });
    setSelectedSubPlan(null);
    setPaymentMethod('qr');
    setPaymentError(null);
    setPaymentModalOpen(true);
    setPaymentSuccess(false);
  };

  const handleOpenCustomCoinCheckout = () => {
    if (parsedCustomAmount < 10) {
      alert('จำนวนเงินขั้นต่ำในการเติมเหรียญคือ 10 บาท');
      return;
    }
    setSelectedPackage({
      priceThb: parsedCustomAmount,
      baseCoins: parsedCustomAmount,
      bonusCoins: customBonusData.bonus,
      totalCoins: customTotalCoins,
      title: `เติมตามใจ ฿${parsedCustomAmount.toLocaleString()}`
    });
    setSelectedSubPlan(null);
    setPaymentMethod('qr');
    setPaymentError(null);
    setPaymentModalOpen(true);
    setPaymentSuccess(false);
  };

  const handleOpenSubCheckout = (
    planDef: SubscriptionPlanDefinition,
    duration: SubscriptionDuration
  ) => {
    const pricing = planDef.pricing[duration];
    const planName = `${planDef.thaiTitle} (${pricing.label})`;

    setSelectedSubPlan({
      planType: planDef.type,
      duration: duration,
      planName: planName,
      priceThb: pricing.priceThb,
      priceCoins: pricing.priceCoins,
      days: pricing.days
    });
    setSelectedPackage(null);
    setPaymentMethod('qr');
    setPaymentError(null);
    setPaymentModalOpen(true);
    setPaymentSuccess(false);
  };

  const handleConfirmPayment = () => {
    setPaymentError(null);

    // If paying via Coins, check balance
    if (selectedSubPlan && paymentMethod === 'coins') {
      if (user.coins < selectedSubPlan.priceCoins) {
        setPaymentError(`เหรียญของคุณไม่เพียงพอ (มี ${user.coins.toLocaleString()} เหรียญ, ต้องการ ${selectedSubPlan.priceCoins.toLocaleString()} เหรียญ)`);
        return;
      }
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      if (selectedPackage) {
        onUpdateUserCoins(
          selectedPackage.totalCoins,
          `เติมเหรียญ ${selectedPackage.title} (฿${selectedPackage.priceThb.toLocaleString()} ได้รับ ${selectedPackage.totalCoins.toLocaleString()} เหรียญ)`
        );
      } else if (selectedSubPlan) {
        if (paymentMethod === 'coins') {
          onSubscribePass(
            selectedSubPlan.planType,
            selectedSubPlan.duration,
            selectedSubPlan.planName,
            selectedSubPlan.days,
            'COINS',
            selectedSubPlan.priceCoins
          );
        } else {
          onSubscribePass(
            selectedSubPlan.planType,
            selectedSubPlan.duration,
            selectedSubPlan.planName,
            selectedSubPlan.days,
            'THB',
            selectedSubPlan.priceThb
          );
        }
      }

      setTimeout(() => {
        setPaymentModalOpen(false);
        setPaymentSuccess(false);
      }, 2000);
    }, 1200);
  };

  const isSubActive = user.subscriptionPass?.isActive;

  const durationOptions: { id: SubscriptionDuration; label: string; badge?: string }[] = [
    { id: '1_week', label: '1 สัปดาห์ (7 วัน)' },
    { id: '1_month', label: '1 เดือน (30 วัน)', badge: '🔥 ยอดนิยม' },
    { id: '3_months', label: '3 เดือน (90 วัน)', badge: 'ประหยัด 10%' },
    { id: '1_year', label: '1 ปี (365 วัน)', badge: 'ประหยัดสูงสุด' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-gray-700">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C2E114]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4" /> ศูนย์เติมเหรียญ (1 บาท = 1 เหรียญ) & แพ็กเกจสมาชิก EduPass
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              เติมเหรียญ & สมัครแพ็กเกจสมาชิก
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              อัตราแลกเปลี่ยนมาตรฐาน <strong className="text-[#C2E114]">1 บาท = 1 เหรียญ</strong> พิเศษเมื่อเติม <strong className="text-amber-300">100 บาทขึ้นไป รับเหรียญโบนัสฟรีสูงสุดถึง 30% (จำกัดโบนัสสูงสุด 600 เหรียญ)!</strong> หรือเลือกสมัครแพ็กเกจเรียนไม่อั้นและข้ามโฆษณาเพื่อการเรียนรู้ไร้ขีดจำกัด
            </p>
          </div>

          {/* User Current Coin & Pass Status */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col items-center sm:items-end gap-2 text-center sm:text-right shrink-0">
            <div className="text-xs text-gray-300">ยอดเหรียญสะสมของคุณ</div>
            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-amber-400">
              <Coins className="w-7 h-7 fill-amber-400" />
              <span>{user.coins.toLocaleString()} เหรียญ</span>
            </div>

            {isSubActive ? (
              <div className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-2xl border border-emerald-500/40 flex flex-col items-center sm:items-end gap-0.5 mt-1 text-center sm:text-right">
                <div className="flex items-center gap-1.5 font-extrabold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{user.subscriptionPass?.planName}</span>
                </div>
                <div className="text-[11px] text-emerald-200/90 font-medium">
                  (ใช้งานได้ถึง {user.subscriptionPass?.expiresAt})
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenDecorShop}
                className="text-xs font-bold text-[#C2E114] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
              >
                <span>เลือกช้อปของตกแต่งโปรไฟล์</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('coins')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'coins'
              ? 'bg-[#2D3436] text-[#C2E114] shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>เติมเหรียญ (Coins Shop)</span>
        </button>

        <button
          onClick={() => setActiveTab('subscription')}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'subscription'
              ? 'bg-[#2D3436] text-[#C2E114] shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>แพ็กเกจสมาชิก (EduPass Memberships)</span>
          <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
            3 แพ็กเกจ
          </span>
        </button>
      </div>

      {/* TAB 1: COINS SHOP */}
      {activeTab === 'coins' && (
        <div className="space-y-8">
          {/* Rate Notice Banner */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                ฿
              </div>
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-sm text-[#2D3436] flex items-center gap-2">
                  <span>อัตราแลกเปลี่ยน: 1 บาท (THB) = 1 เหรียญ (Coins)</span>
                  <span className="bg-amber-500/10 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-500/30">
                    โบนัสสูงสุด 600 เหรียญ
                  </span>
                </h3>
                <p className="text-xs text-gray-500">
                  เติมครบ 100 บาทขึ้นไป รับเหรียญโบนัสฟรีทันที +10% ถึง +30% (จำกัดโบนัสสูงสุดไม่เกิน 600 เหรียญต่อรายการ)
                </p>
              </div>
            </div>

            <div className="text-xs text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl font-bold border border-emerald-200 shrink-0">
              ✓ เหรียญไม่มีวันหมดอายุ • ใช้ซื้อคอร์สและของตกแต่งได้ตลอดชีพ
            </div>
          </div>

          {/* Preset Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {COIN_PACKAGES.map((pkg) => {
              const totalCoins = pkg.baseCoins + pkg.bonusCoins;
              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between relative shadow-sm hover:shadow-lg group ${
                    pkg.isPopular
                      ? 'border-[#C2E114] bg-gradient-to-b from-[#C2E114]/5 to-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 left-4">
                      <span className="bg-[#2D3436] text-[#C2E114] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform">
                        <Coins className="w-5 h-5 fill-amber-400" />
                      </div>

                      {pkg.bonusCoins > 0 && (
                        <span className="text-[11px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          โบนัส {pkg.bonusPercentText}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-[#2D3436]">
                          {totalCoins.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-gray-500">เหรียญ</span>
                      </div>

                      {pkg.bonusCoins > 0 ? (
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          (ยอดเติม {pkg.baseCoins.toLocaleString()} + โบนัส{' '}
                          <span className="text-emerald-600 font-extrabold">
                            +{pkg.bonusCoins.toLocaleString()}
                          </span>)
                        </p>
                      ) : (
                        <p className="text-[11px] text-gray-400 mt-0.5">รับเหรียญตามยอดชำระ</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleOpenCoinCheckout(pkg)}
                      className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                        pkg.isPopular
                          ? 'bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white'
                          : 'bg-gray-100 hover:bg-[#2D3436] text-[#2D3436] hover:text-white'
                      }`}
                    >
                      <span>฿{pkg.priceThb.toLocaleString()}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Amount Calculator & Top Up */}
          <div className="bg-gradient-to-br from-gray-50 to-amber-50/40 p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 text-[#2D3436] rounded-2xl flex items-center justify-center shadow-xs shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#2D3436]">
                  คำนวณและเติมเหรียญตามใจคุณ (Custom Top-Up)
                </h3>
                <p className="text-xs text-gray-500">
                  ระบุจำนวนเงินบาทที่ต้องการเติม ระบบจะคำนวณโบนัสและเหรียญสุทธิให้ทันที
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-3">
                <label className="text-xs font-bold text-gray-700 block">
                  ระบุจำนวนเงินที่ต้องการเติม (บาท) ขั้นต่ำ 10 บาท
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                    ฿
                  </span>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={customAmountStr}
                    onChange={(e) => setCustomAmountStr(e.target.value)}
                    placeholder="เช่น 150, 450, 1500..."
                    className="w-full pl-8 pr-4 py-3 bg-white border-2 border-gray-300 focus:border-[#C2E114] rounded-2xl font-black text-lg text-[#2D3436] outline-none shadow-xs"
                  />
                </div>

                {/* Quick select presets */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[11px] font-bold text-gray-500">ยอดด่วน:</span>
                  {[50, 150, 250, 450, 800, 1500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCustomAmountStr(amt.toString())}
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg border border-gray-200 transition-colors cursor-pointer"
                    >
                      ฿{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>ยอดเงินที่ระบุ:</span>
                  <span className="font-bold text-gray-800">฿{parsedCustomAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>เหรียญพื้นฐาน:</span>
                  <span className="font-bold text-gray-800">{parsedCustomAmount.toLocaleString()} เหรียญ</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-600 font-bold">
                  <span>เหรียญโบนัส ({customBonusData.text}):</span>
                  <span>+{customBonusData.bonus.toLocaleString()} เหรียญ</span>
                </div>

                {customBonusData.isCapped && (
                  <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200 font-medium">
                    ⚠️ โบนัสถูกจำกัดที่เพดานสูงสุด <strong>600 เหรียญ</strong> ตามนโยบายระบบ
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400">เหรียญรวมที่จะได้รับสุทธิ</div>
                    <div className="text-xl font-black text-[#2D3436] flex items-center gap-1">
                      <Coins className="w-5 h-5 text-amber-500 fill-amber-400" />
                      <span>{customTotalCoins.toLocaleString()} เหรียญ</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenCustomCoinCheckout}
                    className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-black px-5 py-3 rounded-xl text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>ชำระเงิน ฿{parsedCustomAmount.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUBSCRIPTION PACKAGES */}
      {activeTab === 'subscription' && (
        <div className="space-y-8">
          {/* Top Banner introducing the 3 Plans & Duration Options */}
          <div className="bg-gradient-to-r from-[#2D3436] via-[#3a4447] to-[#2D3436] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-700 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-[11px] px-3 py-1 rounded-full">
                  <Crown className="w-3.5 h-3.5 fill-[#2D3436]" /> สิทธิพิเศษสมาชิก EduPass VIP
                </div>
                <h2 className="text-xl sm:text-2xl font-black">
                  เลือกแพ็กเกจสมาชิกที่ตอบโจทย์การเรียนรู้ของคุณ
                </h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  มีให้เลือก 3 รูปแบบตามความต้องการ: <strong>1. เรียนไม่อั้น (บุฟเฟ่ต์)</strong>, <strong>2. ข้ามโฆษณา 100%</strong> หรือ <strong>3. VIP Premium (ครบทุกสิทธิ์)</strong> พร้อมตัวเลือกระยะเวลาที่ยืดหยุ่น
                </p>
              </div>

              {isSubActive && (
                <div className="bg-emerald-500/20 border border-emerald-400/40 p-4 rounded-2xl text-left sm:text-right shrink-0">
                  <div className="text-[11px] text-emerald-300 font-bold">แพ็กเกจปัจจุบันของคุณ</div>
                  <div className="text-sm font-black text-white">{user.subscriptionPass?.planName}</div>
                  <div className="text-[11px] text-emerald-200">หมดอายุ: {user.subscriptionPass?.expiresAt}</div>
                </div>
              )}
            </div>

            {/* Duration Selector Tabs */}
            <div className="pt-2 border-t border-gray-700/80">
              <div className="text-xs font-bold text-gray-300 mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C2E114]" /> เลือกระยะเวลาแพ็กเกจ:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {durationOptions.map((opt) => {
                  const isSelected = selectedDuration === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedDuration(opt.id)}
                      className={`p-3.5 rounded-2xl text-xs font-extrabold transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#C2E114] text-[#2D3436] shadow-md ring-2 ring-white/50 scale-[1.02]'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                    >
                      {opt.badge && (
                        <span
                          className={`text-[9px] font-black px-2 py-0.2 rounded-full absolute -top-2 ${
                            isSelected
                              ? 'bg-[#2D3436] text-[#C2E114]'
                              : 'bg-amber-400 text-black'
                          }`}
                        >
                          {opt.badge}
                        </span>
                      )}
                      <span className="text-sm">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3 SUBSCRIPTION PLAN CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const pricing = plan.pricing[selectedDuration];
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.type}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all border-2 ${
                    isPopular
                      ? 'bg-gradient-to-b from-gray-900 to-[#2D3436] text-white border-[#C2E114] shadow-xl'
                      : 'bg-white text-[#2D3436] border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-black px-3 py-1 rounded-full ${
                        isPopular
                          ? 'bg-[#C2E114] text-[#2D3436]'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {plan.badge}
                    </span>

                    {pricing.savingsBadge && (
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          isPopular
                            ? 'bg-amber-400 text-black'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {pricing.savingsBadge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Desc */}
                  <div className="space-y-2">
                    <h3
                      className={`text-xl font-black ${
                        isPopular ? 'text-white' : 'text-[#2D3436]'
                      }`}
                    >
                      {plan.thaiTitle}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed min-h-[36px] ${
                        isPopular ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="my-5 py-4 border-y border-gray-200/20">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={`text-3xl sm:text-4xl font-black ${
                          isPopular ? 'text-[#C2E114]' : 'text-[#2D3436]'
                        }`}
                      >
                        ฿{pricing.priceThb.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs ${
                          isPopular ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        / {pricing.label.split(' ')[0]} ({pricing.perDay})
                      </span>
                    </div>
                    <div
                      className={`text-[11px] mt-1 font-semibold ${
                        isPopular ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      หรือชำระด้วย 🪙 {pricing.priceCoins.toLocaleString()} Coins
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 flex-1 mb-6">
                    <div
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isPopular ? 'text-gray-400' : 'text-gray-400'
                      }`}
                    >
                      สิทธิประโยชน์ในแพ็กเกจนี้:
                    </div>

                    <ul className="space-y-2.5 text-xs">
                      {plan.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2 ${
                            feat.included
                              ? isPopular
                                ? 'text-gray-200'
                                : 'text-gray-700'
                              : 'text-gray-400 line-through opacity-70'
                          }`}
                        >
                          {feat.included ? (
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isPopular ? 'text-[#C2E114]' : 'text-emerald-600'
                              }`}
                            />
                          ) : (
                            <X className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                          )}
                          <div>
                            <span className={feat.highlight ? 'font-black' : 'font-medium'}>
                              {feat.name}
                            </span>
                            {feat.note && (
                              <span
                                className={`block text-[10px] ${
                                  isPopular ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                ({feat.note})
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTA Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenSubCheckout(plan, selectedDuration)}
                    className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-[#C2E114] hover:bg-white text-[#2D3436]'
                        : 'bg-[#2D3436] hover:bg-[#8A9914] text-white'
                    }`}
                  >
                    {isPopular ? (
                      <Crown className="w-4 h-4 fill-current" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>
                      สมัคร {plan.thaiTitle.split(' ')[0]} ฿{pricing.priceThb.toLocaleString()}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Feature Matrix Table for Ultimate Clarity */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2D3436] text-[#C2E114] flex items-center justify-center font-black">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#2D3436]">
                    ตารางเปรียบเทียบคุณสมบัติ 3 แพ็กเกจสมาชิก
                  </h3>
                  <p className="text-xs text-gray-500">
                    สรุปความแตกต่างที่ชัดเจนระหว่างแพ็กเกจเรียนไม่อั้น, ข้ามโฆษณา และ VIP Premium
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="p-3 font-bold text-gray-700">คุณสมบัติ / สิทธิ์การใช้งาน</th>
                    <th className="p-3 font-bold text-blue-700 text-center">
                      ⚡ เรียนไม่อั้น (บุฟเฟ่ต์)
                    </th>
                    <th className="p-3 font-bold text-emerald-700 text-center">
                      🛡️ ข้ามโฆษณา (Ad-Free)
                    </th>
                    <th className="p-3 font-bold text-amber-700 text-center bg-amber-50/60">
                      👑 VIP Premium (ครบทุกสิทธิ์)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-semibold text-gray-800">
                      เข้าเรียนคอร์สที่ร่วมแคมเปญบุฟเฟ่ต์ได้ไม่อั้น
                      <span className="block text-[10px] text-gray-400 font-normal">
                        (ไม่ต้องซื้อรายคอร์สแยก)
                      </span>
                    </td>
                    <td className="p-3 text-center text-emerald-600 font-black">✓ มีสิทธิ์</td>
                    <td className="p-3 text-center text-gray-400">✗ ไม่มี (ต้องซื้อแยก)</td>
                    <td className="p-3 text-center text-emerald-600 font-black bg-amber-50/30">
                      ✓ มีสิทธิ์เต็มที่
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-gray-800">
                      ข้ามโฆษณาคั่นทั้งหมด 100%
                      <span className="block text-[10px] text-gray-400 font-normal">
                        (ไม่มีโฆษณากวนใจก่อนเริ่มคลิปหรือทำควิซ)
                      </span>
                    </td>
                    <td className="p-3 text-center text-gray-400">✗ ยังมีโฆษณาคั่น</td>
                    <td className="p-3 text-center text-emerald-600 font-black">✓ ปิดโฆษณา 100%</td>
                    <td className="p-3 text-center text-emerald-600 font-black bg-amber-50/30">
                      ✓ ปิดโฆษณา 100%
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-gray-800">
                      โบนัสค่าประสบการณ์ EXP & เหรียญ x2
                      <span className="block text-[10px] text-gray-400 font-normal">
                        (ไต่อันดับกระดานผู้นำเร็วขึ้น)
                      </span>
                    </td>
                    <td className="p-3 text-center text-gray-400">✗ ปกติ (x1)</td>
                    <td className="p-3 text-center text-gray-400">✗ ปกติ (x1)</td>
                    <td className="p-3 text-center text-emerald-600 font-black bg-amber-50/30">
                      ✓ รับโบนัส x2 เท่า
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-gray-800">
                      ดาวน์โหลดเอกสารสรุป PDF HD คุณภาพสูง
                    </td>
                    <td className="p-3 text-center text-gray-500">เอกสารทั่วไป</td>
                    <td className="p-3 text-center text-gray-500">เอกสารทั่วไป</td>
                    <td className="p-3 text-center text-emerald-600 font-black bg-amber-50/30">
                      ✓ ปลดล็อก PDF HD พิเศษ
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold text-gray-800">
                      ตราสัญลักษณ์มงกุฎทอง Golden VIP
                    </td>
                    <td className="p-3 text-center text-gray-400">-</td>
                    <td className="p-3 text-center text-gray-400">-</td>
                    <td className="p-3 text-center text-amber-600 font-black bg-amber-50/30">
                      👑 ปลดล็อกทันที
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative border border-gray-200">
            <button
              type="button"
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full cursor-pointer transition-colors"
            >
              ✕
            </button>

            {paymentSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-gray-900">ทำรายการสำเร็จ!</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedPackage
                    ? `เติม ${selectedPackage.totalCoins.toLocaleString()} เหรียญ (ยอด ฿${selectedPackage.priceThb.toLocaleString()} + โบนัส ${selectedPackage.bonusCoins.toLocaleString()} เหรียญ) เรียบร้อยแล้ว`
                    : `เปิดใช้งาน ${selectedSubPlan?.planName} เรียบร้อยแล้ว! สิทธิ์ของคุณพร้อมใช้งานทันที`}
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                    ขั้นตอนชำระเงินปลอดภัย 100%
                  </span>
                  <h3 className="text-xl font-black text-[#2D3436] mt-1.5">
                    {selectedPackage
                      ? `เติมเหรียญ ${selectedPackage.totalCoins.toLocaleString()} Coins`
                      : `สมัคร ${selectedSubPlan?.planName}`}
                  </h3>

                  {selectedPackage && selectedPackage.bonusCoins > 0 && (
                    <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold mt-2">
                      🎉 แถมเหรียญโบนัสฟรี +{selectedPackage.bonusCoins.toLocaleString()} เหรียญ (จากยอด ฿{selectedPackage.priceThb.toLocaleString()})
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    ยอดชำระสุทธิ:{' '}
                    <span className="font-extrabold text-[#2D3436] text-base">
                      {paymentMethod === 'coins' && selectedSubPlan
                        ? `🪙 ${selectedSubPlan.priceCoins.toLocaleString()} เหรียญ`
                        : `฿${selectedPackage ? selectedPackage.priceThb.toLocaleString() : selectedSubPlan?.priceThb.toLocaleString()}`}
                    </span>
                  </p>
                </div>

                {/* Error Message if any */}
                {paymentError && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-bold">
                    ⚠️ {paymentError}
                  </div>
                )}

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">เลือกช่องทางชำระเงิน:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('qr');
                        setPaymentError(null);
                      }}
                      className={`p-3 rounded-2xl border-2 text-[11px] font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'qr'
                          ? 'border-[#C2E114] bg-[#C2E114]/15 text-[#2D3436]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-emerald-600" />
                      <span>PromptPay QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('card');
                        setPaymentError(null);
                      }}
                      className={`p-3 rounded-2xl border-2 text-[11px] font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#C2E114] bg-[#C2E114]/15 text-[#2D3436]'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>บัตรเครดิต/เดบิต</span>
                    </button>

                    {selectedSubPlan && (
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('coins');
                          setPaymentError(null);
                        }}
                        className={`p-3 rounded-2xl border-2 text-[11px] font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                          paymentMethod === 'coins'
                            ? 'border-amber-400 bg-amber-50 text-amber-900'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
                        <span>ใช้เหรียญ Coins</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Simulated Payment Details */}
                {paymentMethod === 'qr' && (
                  <div className="bg-gray-50 p-4 rounded-2xl text-center space-y-3 border border-gray-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=EduThaiPromptPay_${selectedPackage ? selectedPackage.priceThb : selectedSubPlan?.priceThb || 100}`}
                      alt="PromptPay QR Code"
                      className="w-36 h-36 mx-auto rounded-xl border border-gray-300 shadow-xs"
                    />
                    <p className="text-[11px] text-gray-500">
                      เปิดแอปธนาคารของคุณและสแกน QR Code ยอด ฿{selectedPackage ? selectedPackage.priceThb.toLocaleString() : selectedSubPlan?.priceThb.toLocaleString()} เพื่อชำระเงิน
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700">หมายเลขบัตร</label>
                      <input
                        type="text"
                        placeholder="4123 •••• •••• 9876"
                        defaultValue="4123 8888 9999 1234"
                        className="w-full mt-1 p-2.5 rounded-xl border border-gray-300 bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700">วันหมดอายุ</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/28"
                          className="w-full mt-1 p-2.5 rounded-xl border border-gray-300 bg-white text-center font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-700">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          defaultValue="888"
                          className="w-full mt-1 p-2.5 rounded-xl border border-gray-300 bg-white text-center font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'coins' && selectedSubPlan && (
                  <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-xs space-y-2">
                    <div className="flex items-center justify-between text-amber-900 font-bold">
                      <span>ยอดเหรียญสะสมของคุณ:</span>
                      <span className="text-sm">{user.coins.toLocaleString()} เหรียญ</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>ราคาแพ็กเกจ:</span>
                      <span className="font-bold text-red-600">-{selectedSubPlan.priceCoins.toLocaleString()} เหรียญ</span>
                    </div>
                    <div className="pt-2 border-t border-amber-200 flex items-center justify-between font-extrabold text-gray-900">
                      <span>คงเหลือหลังสมัคร:</span>
                      <span>
                        {(user.coins - selectedSubPlan.priceCoins).toLocaleString()} เหรียญ
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin" /> กำลังประมวลผลการชำระเงิน...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> ยืนยันการชำระเงิน ({paymentMethod === 'coins' && selectedSubPlan ? `🪙 ${selectedSubPlan.priceCoins.toLocaleString()} เหรียญ` : `฿${selectedPackage ? selectedPackage.priceThb.toLocaleString() : selectedSubPlan?.priceThb.toLocaleString()}`})
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
