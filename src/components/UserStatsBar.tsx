import React from 'react';
import { UserProfile, DailyQuest } from '../types';
import { Flame, Coins, Trophy, CheckCircle2, Award, Sparkles, ChevronRight, Crown } from 'lucide-react';

interface UserStatsBarProps {
  user: UserProfile;
  quests: DailyQuest[];
  onOpenQuests: () => void;
  onOpenAiTutor: () => void;
  onOpenProfile?: () => void;
}

export const UserStatsBar: React.FC<UserStatsBarProps> = ({
  user,
  quests,
  onOpenQuests,
  onOpenAiTutor,
  onOpenProfile
}) => {
  const levelExpTotal = user.level * 300;
  const currentLevelExp = user.exp % 300;
  const progressPercent = Math.min(Math.round((currentLevelExp / 300) * 100), 100);

  const completedQuestsCount = quests.filter(q => q.isCompleted).length;

  return (
    <div className="bg-white border-b border-[#E0E0E0] py-2.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* User Info & Level - Clickable to Profile */}
        <div 
          onClick={onOpenProfile}
          className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity"
          title="คลิกเพื่อเปิดหน้าโปรไฟล์ & แก้ไขข้อมูล"
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full bg-[#2D3436] border-2 border-[#C2E114] object-cover group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-1 -right-1 bg-[#2D3436] text-[#C2E114] text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
              Lv.{user.level}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#2D3436] text-xs sm:text-sm group-hover:text-[#8A9914] transition-colors">{user.name}</span>
              <span className="bg-[#F1F2F6] text-[#636E72] text-[11px] px-2 py-0.5 rounded-full font-semibold">
                {user.grade}
              </span>
              {user.subscriptionPass?.isActive && (
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-2 py-0.5 rounded-full font-extrabold flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {user.subscriptionPass.planName}
                </span>
              )}
            </div>

            {/* EXP Progress Bar */}
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-24 sm:w-32 bg-[#F1F2F6] h-2 rounded-full overflow-hidden border border-[#E0E0E0]">
                <div
                  className="bg-[#C2E114] h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-[#636E72]">
                {user.exp} EXP ({progressPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Gamification Counters */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          
          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 bg-[#F1F2F6] border border-[#E0E0E0] text-[#2D3436] px-3 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>สตรีค {user.streakDays} วัน</span>
          </div>

          {/* Coins Counter */}
          <div className="flex items-center gap-1.5 bg-[#F1F2F6] border border-[#E0E0E0] text-[#2D3436] px-3 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <Coins className="w-3.5 h-3.5 text-yellow-600 fill-yellow-400" />
            <span>{user.coins} เหรียญ</span>
          </div>

          {/* Daily Quests Trigger Button */}
          <button
            onClick={onOpenQuests}
            className="flex items-center gap-2 bg-[#2D3436] hover:bg-[#8A9914] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs group"
          >
            <Trophy className="w-3.5 h-3.5 text-[#C2E114]" />
            <span>ภารกิจ ({completedQuestsCount}/{quests.length})</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* AI Tutor Quick Ask */}
          <button
            onClick={onOpenAiTutor}
            className="hidden md:flex items-center gap-1.5 bg-[#C2E114] text-[#2D3436] hover:bg-[#8A9914] hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ถาม AI ครูผู้ช่วย</span>
          </button>

        </div>

      </div>
    </div>
  );
};
