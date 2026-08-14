import React from 'react';
import { Course, UserProfile } from '../types';
import { Star, Clock, BookOpen, Award, CheckCircle2, Play, ShoppingCart, Zap, Lock, Coins } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  user?: UserProfile;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (courseId: string) => void;
  onAddToCart?: (course: Course) => void;
  onNavigateSubscription?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  user,
  onSelectCourse,
  onEnrollCourse,
  onAddToCart,
  onNavigateSubscription
}) => {
  const hasBuffetPass = Boolean(user?.subscriptionPass?.isActive && user?.subscriptionPass?.canAccessBuffet);
  const isBuffetCourse = Boolean(course.isBuffetIncluded);
  const isFree = !course.priceCoins || course.priceCoins === 0;

  return (
    <div className="bg-white rounded-[20px] border border-[#E0E0E0] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group relative">
      
      {/* Thumbnail Container */}
      <div className="relative h-44 overflow-hidden bg-[#2D3436]">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
          <span className="bg-[#2D3436] text-[#C2E114] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#C2E114]/30 shadow-xs">
            {course.subject} • {course.grade}
          </span>
          {course.isRecommended && (
            <span className="bg-[#C2E114] text-[#2D3436] text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs">
              ✨ AI แนะนำ
            </span>
          )}
          {isBuffetCourse && (
            <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 border border-blue-400/40 animate-pulse">
              <Zap className="w-3 h-3 fill-amber-300 text-amber-300" /> บุฟเฟ่ต์เรียนไม่อั้น
            </span>
          )}
        </div>

        {/* EXP Reward Badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
          <Award className="w-3.5 h-3.5 text-[#C2E114]" /> +{course.expReward} EXP
        </div>

        {/* Price / Buffet Tag if not enrolled */}
        {!course.isEnrolled && (
          <div className="absolute bottom-3 left-3">
            {isBuffetCourse ? (
              <span className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                {hasBuffetPass ? 'สิทธิ์บุฟเฟ่ต์ฟรี' : `฿${course.priceCoins || 50} หรือ บุฟเฟ่ต์`}
              </span>
            ) : isFree ? (
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                เรียนฟรี
              </span>
            ) : (
              <span className="bg-amber-500 text-black text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Coins className="w-3 h-3 fill-black" /> {course.priceCoins} Coins
              </span>
            )}
          </div>
        )}
      </div>

      {/* Course Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-[#636E72] mb-1">
            <span className="font-medium truncate max-w-[180px]">{course.school}</span>
            <span className="flex items-center gap-1 font-bold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating}
            </span>
          </div>

          <h3
            onClick={() => onSelectCourse(course)}
            className="font-bold text-[#2D3436] text-sm sm:text-base leading-snug line-clamp-2 hover:text-[#8A9914] cursor-pointer transition-colors"
          >
            {course.title}
          </h3>

          <p className="text-xs text-[#636E72] mt-1.5 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Course Meta Info */}
        <div className="pt-3 border-t border-[#F1F2F6] space-y-3">
          <div className="flex items-center justify-between text-xs text-[#636E72] font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#636E72]" /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#636E72]" /> {course.lessonsCount} บทเรียน
            </span>
          </div>

          {/* Progress bar if enrolled, else Enroll button */}
          {course.isEnrolled ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-[#2D3436]">
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ลงเรียนแล้ว
                </span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-[#F1F2F6] h-2 rounded-full overflow-hidden border border-[#E0E0E0]">
                <div
                  className="bg-[#C2E114] h-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <button
                onClick={() => onSelectCourse(course)}
                className="w-full mt-2 bg-[#2D3436] hover:bg-[#8A9914] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#C2E114] fill-[#C2E114]" /> เรียนต่อทันที
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {onAddToCart && (
                <button
                  onClick={() => onAddToCart(course)}
                  className="p-2.5 bg-gray-100 hover:bg-gray-200 text-[#2D3436] rounded-xl font-bold transition-all cursor-pointer shrink-0"
                  title="เพิ่มคอร์สนี้ลงตะกร้า"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              )}

              {isBuffetCourse && hasBuffetPass ? (
                <button
                  onClick={() => onEnrollCourse(course.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all transform active:scale-98 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>เข้าเรียนด้วย Buffet Pass (ฟรี)</span>
                </button>
              ) : isBuffetCourse && !hasBuffetPass ? (
                <button
                  onClick={() => onEnrollCourse(course.id)}
                  className="flex-1 bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all transform active:scale-98 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>ลงเรียนคอร์สนี้ (หรือใช้ Buffet Pass)</span>
                </button>
              ) : isFree ? (
                <button
                  onClick={() => onEnrollCourse(course.id)}
                  className="flex-1 bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all transform active:scale-98 cursor-pointer"
                >
                  ลงเรียนฟรี (+{course.expReward} EXP)
                </button>
              ) : (
                <button
                  onClick={() => onEnrollCourse(course.id)}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-extrabold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all transform active:scale-98 cursor-pointer"
                >
                  <Coins className="w-3.5 h-3.5 fill-black" />
                  <span>ซื้อคอร์ส ({course.priceCoins} เหรียญ)</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
