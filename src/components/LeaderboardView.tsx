import React from 'react';
import { LeaderboardUser, Badge, UserProfile } from '../types';
import { Trophy, Award, Flame, Star, ShieldCheck, Sparkles, Calculator, Code, FlaskConical } from 'lucide-react';

interface LeaderboardViewProps {
  users: LeaderboardUser[];
  badges: Badge[];
  currentUser: UserProfile;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  users,
  badges,
  currentUser
}) => {
  const top1 = users[0];
  const top2 = users[1];
  const top3 = users[2];
  const otherUsers = users.slice(3);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-xs px-3.5 py-1 rounded-full">
          <Trophy className="w-4 h-4" /> ตารางอันดับ & ตราเกียรติยศ (Leaderboard & Badges)
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          เชิดชูเกียรติตะลุยเรียนประจำสัปดาห์
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
          คำนวณจากคะแนน EXP ที่สะสมได้จากการเรียนบทเรียนวิดีโอ การตอบ Adaptive Quiz และการทำภารกิจประจำวัน
        </p>
      </section>

      {/* Podium Top 3 */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-8">
          
          {/* Rank 2 Podium */}
          {top2 && (
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E0E0E0] shadow-xs text-center space-y-2 order-1 sm:order-1 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-800 text-xs font-bold px-3 py-0.5 rounded-full shadow-2xs">
                🥈 อันดับ 2
              </div>
              <img
                src={top2.avatar}
                alt={top2.name}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full mx-auto border-2 border-slate-300 bg-[#2D3436] object-cover"
              />
              <div className="font-bold text-xs sm:text-sm text-[#2D3436] truncate">{top2.name}</div>
              <div className="text-[10px] sm:text-xs text-[#636E72] truncate">{top2.school}</div>
              <div className="bg-[#F1F2F6] text-[#2D3436] text-xs font-bold py-1.5 rounded-xl">
                {top2.exp} EXP
              </div>
            </div>
          )}

          {/* Rank 1 Podium (Tallest) */}
          {top1 && (
            <div className="bg-gradient-to-b from-[#2D3436] to-[#3d4548] text-white p-5 sm:p-8 rounded-2xl border-2 border-[#C2E114] shadow-lg text-center space-y-3 order-2 sm:order-2 relative -translate-y-4">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#C2E114] text-[#2D3436] text-xs font-extrabold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                🥇 แชมป์อันดับ 1
              </div>
              <img
                src={top1.avatar}
                alt={top1.name}
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto border-4 border-[#C2E114] bg-[#2D3436] object-cover shadow-md"
              />
              <div>
                <div className="font-extrabold text-sm sm:text-base text-white truncate">{top1.name}</div>
                <div className="text-[11px] text-[#C2E114] font-medium truncate">{top1.school}</div>
              </div>
              <div className="bg-[#C2E114] text-[#2D3436] text-xs sm:text-sm font-black py-2 rounded-xl shadow-xs">
                {top1.exp} EXP
              </div>
            </div>
          )}

          {/* Rank 3 Podium */}
          {top3 && (
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E0E0E0] shadow-xs text-center space-y-2 order-3 sm:order-3 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-2xs">
                🥉 อันดับ 3
              </div>
              <img
                src={top3.avatar}
                alt={top3.name}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full mx-auto border-2 border-amber-600 bg-[#2D3436] object-cover"
              />
              <div className="font-bold text-xs sm:text-sm text-[#2D3436] truncate">{top3.name}</div>
              <div className="text-[10px] sm:text-xs text-[#636E72] truncate">{top3.school}</div>
              <div className="bg-amber-50 text-amber-900 text-xs font-bold py-1.5 rounded-xl">
                {top3.exp} EXP
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[16px] border border-[#E0E0E0] shadow-xs overflow-hidden">
          <div className="p-4 bg-[#F1F2F6] border-b border-[#E0E0E0] flex items-center justify-between text-xs font-bold text-[#636E72] uppercase tracking-wider">
            <span>อันดับ & นักเรียน</span>
            <span>โรงเรียน / ระดับชั้น</span>
            <span>คะแนนสะสม EXP</span>
          </div>

          <div className="divide-y divide-[#F1F2F6]">
            {users.map((userRow) => (
              <div
                key={userRow.rank}
                className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                  userRow.isCurrentUser
                    ? 'bg-[#C2E114]/20 font-bold border-l-4 border-l-[#C2E114]'
                    : 'hover:bg-[#F1F2F6]/50'
                }`}
              >
                {/* Rank & User Info */}
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      userRow.rank === 1
                        ? 'bg-[#C2E114] text-[#2D3436]'
                        : userRow.rank === 2
                        ? 'bg-slate-200 text-slate-800'
                        : userRow.rank === 3
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-[#F1F2F6] text-[#636E72]'
                    }`}
                  >
                    {userRow.rank}
                  </span>

                  <img
                    src={userRow.avatar}
                    alt={userRow.name}
                    className="w-10 h-10 rounded-full bg-[#2D3436] object-cover shrink-0"
                  />

                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#2D3436] flex items-center gap-2">
                      {userRow.name}
                      {userRow.isCurrentUser && (
                        <span className="bg-[#2D3436] text-[#C2E114] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          คุณ
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#636E72] font-normal">{userRow.badgeTitle}</div>
                  </div>
                </div>

                {/* School */}
                <div className="hidden sm:block text-xs text-[#636E72] truncate max-w-[200px]">
                  {userRow.school} ({userRow.grade})
                </div>

                {/* EXP */}
                <div className="text-right shrink-0">
                  <div className="font-bold text-xs sm:text-sm text-[#2D3436]">{userRow.exp} EXP</div>
                  <div className="text-[10px] text-amber-600">{userRow.coins} 🪙</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> ตราประทับเกียรติยศ (Badges & Achievement)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              ปลดล็อกตราเกียรติยศเมื่อทำภารกิจและผ่านคอร์สเรียนตามเงื่อนไข
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
                b.isUnlocked
                  ? 'bg-white border-gray-200 shadow-soft-card'
                  : 'bg-gray-50/60 border-gray-200/60 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 ${
                  b.isUnlocked ? 'bg-[#C2E114] text-[#1A1C1C] shadow-md' : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Award className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm">{b.title}</h3>
                  {b.isUnlocked && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      ปลดล็อกแล้ว
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{b.description}</p>
                {b.unlockedDate && (
                  <p className="text-[10px] text-gray-400">ปลดล็อกเมื่อ: {b.unlockedDate}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
