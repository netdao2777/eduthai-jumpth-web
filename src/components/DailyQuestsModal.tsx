import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DailyQuest } from '../types';
import { X, Trophy, CheckCircle2, Gift, Sparkles, ArrowRight } from 'lucide-react';

interface DailyQuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quests: DailyQuest[];
  onClaimReward: (questId: string) => void;
  onNavigateQuest: (targetView: string) => void;
}

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({
  isOpen,
  onClose,
  quests,
  onClaimReward,
  onNavigateQuest
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-[#1A1C1C] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#C2E114] text-[#1A1C1C] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> ภารกิจประจำวัน (Daily Quests)
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">ทำภารกิจสะสม EXP & เหรียญ</h2>
            <p className="text-gray-300 text-xs mt-1">
              ภารกิจจะถูกรีเซ็ตใหม่ทุกวันเวลา 00:00 น. เพื่อส่งเสริมวินัยการเรียนสม่ำเสมอ
            </p>
          </div>

          <div className="p-6 space-y-4">
            {quests.map((quest) => (
              <div
                key={quest.id}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  quest.isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      {quest.title}
                      {quest.isCompleted && (
                        <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> สำเร็จแล้ว
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">{quest.description}</p>
                  </div>

                  {/* Rewards Badge */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-white px-2.5 py-1 rounded-xl border border-gray-200 text-xs font-bold shadow-2xs">
                    <span className="text-[#8A9914]">+{quest.expReward} EXP</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-amber-600">+{quest.coinsReward} 🪙</span>
                  </div>
                </div>

                {/* Progress bar & Action */}
                <div className="flex items-center justify-between gap-4 mt-3 pt-2 border-t border-gray-200/60">
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] text-gray-500 font-medium mb-1">
                      <span>ความคืบหน้า</span>
                      <span>{quest.progress}/{quest.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          quest.isCompleted ? 'bg-emerald-500' : 'bg-[#C2E114]'
                        }`}
                        style={{ width: `${Math.min((quest.progress / quest.total) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {quest.isCompleted ? (
                    <button
                      disabled
                      className="bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-default"
                    >
                      รับรางวัลแล้ว
                    </button>
                  ) : quest.progress >= quest.total ? (
                    <button
                      onClick={() => onClaimReward(quest.id)}
                      className="bg-[#C2E114] hover:bg-[#b0cc10] text-[#1A1C1C] text-xs font-bold px-4 py-2 rounded-xl shadow-md flex items-center gap-1 animate-bounce"
                    >
                      <Gift className="w-3.5 h-3.5" /> กดรับรางวัล
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateQuest(quest.targetView);
                      }}
                      className="bg-[#1A1C1C] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition-all"
                    >
                      ไปทำภารกิจ <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
