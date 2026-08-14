import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Heart, Gift, Coins, Sparkles, X, Check, Coffee, BookOpen, Award, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

export interface DonationData {
  targetType: 'platform' | 'creator';
  targetName: string;
  targetAvatar?: string;
  coinsAmount: number;
  message?: string;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  targetType: 'platform' | 'creator';
  targetName: string;
  targetSubtitle?: string;
  courseTitle?: string;
  recipientAvatar?: string;
  targetAvatar?: string;
  onConfirmDonate?: (amount: number, message: string) => void;
  onConfirmDonation?: (data: DonationData) => void;
  onNavigateTopUp?: () => void;
  onNavigateToCoinShop?: () => void;
}

const PRESET_AMOUNTS = [
  { amount: 1, label: '1 เหรียญ', desc: 'ส่งกำลังใจเล็กๆ', icon: '✨' },
  { amount: 5, label: '5 เหรียญ', desc: 'เติมพลังให้ครู', icon: '🧋' },
  { amount: 10, label: '10 เหรียญ', desc: 'กาแฟ 1 แก้ว', icon: '☕' },
  { amount: 20, label: '20 เหรียญ', desc: 'สมุดและอุปกรณ์', icon: '📚' },
  { amount: 50, label: '50 เหรียญ', desc: 'ทุนพัฒนาสื่อการสอน', icon: '⭐' },
  { amount: 100, label: '100 เหรียญ', desc: 'Super Supporter', icon: '👑' },
];

const SUGGESTED_MESSAGES = {
  platform: [
    'ขอบคุณสำหรับแพลตฟอร์มการศึกษาฟรีดีๆ ครับ/ค่ะ',
    'ขอร่วมเป็นกำลังใจให้ทีมงานพัฒนาต่อไปครับ',
    'ชอบ AI ครูผู้ช่วยมากครับ ช่วยได้เยอะเลย',
    'ขอสนับสนุนให้เพื่อนๆ ทั่วประเทศได้เรียนฟรีครับ'
  ],
  creator: [
    'ขอบคุณคุณครูสำหรับบทเรียนดีๆ สอนเข้าใจง่ายมากครับ',
    'ชอบสไตล์การสอนมากครับ ขอเป็นกำลังใจให้ทำคลิปต่อๆ ไป',
    'ข้อสอบและชีทสรุปช่วยเตรียมสอบได้ดีมากครับ',
    'ขอบคุณที่คุณครูตั้งใจทำเนื้อหาฟรีให้นักเรียนครับ'
  ]
};

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  user,
  targetType,
  targetName,
  targetSubtitle,
  courseTitle,
  recipientAvatar,
  targetAvatar,
  onConfirmDonate,
  onConfirmDonation,
  onNavigateTopUp,
  onNavigateToCoinShop
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [customAmountStr, setCustomAmountStr] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const actualAmount = isCustom ? Math.max(1, parseInt(customAmountStr, 10) || 0) : selectedAmount;
  const hasEnoughCoins = user.coins >= actualAmount;
  const effectiveAvatar = targetAvatar || recipientAvatar;

  const handleSelectPreset = (amt: number) => {
    setSelectedAmount(amt);
    setIsCustom(false);
  };

  const handleCustomChange = (val: string) => {
    setCustomAmountStr(val);
    setIsCustom(true);
  };

  const handleTopUpClick = () => {
    onClose();
    if (onNavigateTopUp) onNavigateTopUp();
    else if (onNavigateToCoinShop) onNavigateToCoinShop();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (actualAmount < 1) {
      alert('จำนวนเหรียญขั้นต่ำในการสนับสนุนคือ 1 เหรียญ (1 บาท)');
      return;
    }

    if (!hasEnoughCoins) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      if (onConfirmDonate) {
        onConfirmDonate(actualAmount, message.trim());
      }
      if (onConfirmDonation) {
        onConfirmDonation({
          targetType,
          targetName,
          targetAvatar: effectiveAvatar,
          coinsAmount: actualAmount,
          message: message.trim() || undefined
        });
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setMessage('');
      }, 2200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-gray-100 overflow-hidden">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting || isSuccess}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full cursor-pointer transition-all disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-scaleUp">
            <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
              ❤️
            </div>
            
            <div className="space-y-1">
              <span className="bg-[#C2E114] text-[#2D3436] text-xs font-black px-3 py-1 rounded-full uppercase">
                ขอบคุณจากใจจริง
              </span>
              <h3 className="text-2xl font-black text-gray-900 mt-2">
                ส่งกำลังใจสำเร็จ!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                คุณได้ส่งมอบ <strong className="text-amber-600 font-extrabold">{actualAmount.toLocaleString()} เหรียญ</strong> ให้แก่{' '}
                <strong className="text-[#2D3436]">{targetName}</strong> เรียบร้อยแล้ว
              </p>
            </div>

            <div className="p-4 bg-lime-50/70 rounded-2xl border border-lime-200 text-xs text-gray-600 max-w-sm mx-auto">
              ✨ ทุกเหรียญของคุณเป็นพลังสำคัญที่ช่วยขับเคลื่อนการศึกษาที่มีคุณภาพและเท่าเทียมสำหรับทุกคน
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Header / Target Card */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-[#2D3436] to-[#3d4548] text-white p-4 sm:p-5 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                {effectiveAvatar ? (
                  <img src={effectiveAvatar} alt={targetName} className="w-full h-full object-cover" />
                ) : targetType === 'platform' ? (
                  <Sparkles className="w-7 h-7 text-[#C2E114]" />
                ) : (
                  <Heart className="w-7 h-7 text-rose-400 fill-rose-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-[#C2E114] text-[#2D3436] text-[10px] font-black px-2 py-0.5 rounded-full">
                    {targetType === 'platform' ? 'โครงการ / แพลตฟอร์ม' : 'ครูผู้สอน / ครีเอเตอร์'}
                  </span>
                  {courseTitle && (
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full truncate max-w-[180px]">
                      {courseTitle}
                    </span>
                  )}
                  <span className="text-[11px] text-gray-300 font-normal">
                    (สนับสนุนแบบไม่บังคับ)
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-white truncate mt-1">
                  {targetName}
                </h3>
                <p className="text-xs text-gray-300 truncate">
                  {targetSubtitle || (targetType === 'platform' ? 'ร่วมสมทบทุนดูแลเซิร์ฟเวอร์ & พัฒนา AI ครูผู้ช่วย' : 'มอบสินน้ำใจและกำลังใจในการสร้างสรรค์บทเรียน')}
                </p>
              </div>
            </div>

            {/* Current Coin Balance Indicator */}
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="text-gray-500 font-medium">เหรียญสะสมของคุณในปัจจุบัน:</span>
              <div className="flex items-center gap-1.5 font-black text-[#2D3436]">
                <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{user.coins.toLocaleString()} เหรียญ</span>
              </div>
            </div>

            {/* Amount Selection Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-gray-800">
                เลือกจำนวนเหรียญที่ต้องการสนับสนุน <span className="text-gray-400 font-normal">(ขั้นต่ำ 1 เหรียญ)</span>
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {PRESET_AMOUNTS.map((item) => {
                  const isSelected = !isCustom && selectedAmount === item.amount;
                  return (
                    <button
                      key={item.amount}
                      type="button"
                      onClick={() => handleSelectPreset(item.amount)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-[#C2E114] bg-lime-50/50 shadow-xs ring-2 ring-[#C2E114]/30'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs font-black text-[#2D3436] mt-0.5">{item.label}</span>
                      <span className="text-[10px] text-gray-500 truncate w-full">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700">หรือระบุจำนวนเหรียญเอง:</span>
                {isCustom && customAmountStr && (
                  <span className="text-emerald-600 font-black text-[11px]">
                    = {parseInt(customAmountStr, 10) || 0} บาท
                  </span>
                )}
              </div>

              <div className="relative">
                <Coins className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="1"
                  max="10000"
                  step="1"
                  value={customAmountStr}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  placeholder="พิมพ์จำนวนเหรียญ เช่น 15, 35, 250"
                  className={`w-full pl-10 pr-16 py-2.5 rounded-xl border text-xs font-bold transition-all outline-none ${
                    isCustom && customAmountStr
                      ? 'border-[#C2E114] ring-2 ring-[#C2E114]/20 bg-lime-50/20 text-[#2D3436]'
                      : 'border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:border-gray-300'
                  }`}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  เหรียญ
                </span>
              </div>
            </div>

            {/* Encouragement Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 flex items-center justify-between">
                <span>ข้อความให้กำลังใจ (ไม่บังคับ)</span>
                <span className="text-gray-400 font-normal text-[11px]">{message.length}/150</span>
              </label>

              {/* Quick message suggestions */}
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {(SUGGESTED_MESSAGES[targetType] || []).slice(0, 2).map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMessage(sug)}
                    className="text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-left"
                  >
                    💬 {sug}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                maxLength={150}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={targetType === 'platform' ? 'พิมพ์ข้อความฝากถึงทีมงานพัฒนา...' : 'พิมพ์คำขอบคุณหรือความประทับใจให้คุณครู...'}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C2E114] focus:bg-white resize-none"
              />
            </div>

            {/* Warning if Coins not enough */}
            {!hasEnoughCoins && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <div className="text-amber-800">
                  <p className="font-bold">เหรียญของคุณไม่เพียงพอ (ต้องการ {actualAmount} เหรียญ)</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">คุณมีอยู่ {user.coins} เหรียญ</p>
                </div>
                <button
                  type="button"
                  onClick={handleTopUpClick}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-3 py-2 rounded-xl shrink-0 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>เติมเหรียญ</span>
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl text-xs transition-all cursor-pointer"
              >
                ไว้คราวหน้า
              </button>

              <button
                type="submit"
                disabled={!hasEnoughCoins || actualAmount < 1 || isSubmitting}
                className="flex-2 py-3 bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-black rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Heart className="w-4 h-4 fill-current text-rose-600" />
                <span>
                  {isSubmitting
                    ? 'กำลังดำเนินการ...'
                    : `ยืนยันส่ง ${actualAmount.toLocaleString()} เหรียญ`}
                </span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
