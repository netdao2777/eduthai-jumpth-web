import React from 'react';
import { Course } from '../types';
import { Star, Clock, BookOpen, Award, CheckCircle2, Play } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse,
  onEnrollCourse
}) => {
  return (
    <div className="bg-white rounded-[16px] border border-[#E0E0E0] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group">
      
      {/* Thumbnail Container */}
      <div className="relative h-44 overflow-hidden bg-[#2D3436]">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-[#2D3436] text-[#C2E114] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#C2E114]/30">
            {course.subject} • {course.grade}
          </span>
          {course.isRecommended && (
            <span className="bg-[#C2E114] text-[#2D3436] text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs">
              ✨ AI แนะนำ
            </span>
          )}
        </div>

        {/* EXP Reward Badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
          <Award className="w-3.5 h-3.5 text-[#C2E114]" /> +{course.expReward} EXP
        </div>
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
                className="w-full mt-2 bg-[#2D3436] hover:bg-[#8A9914] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-[#C2E114] fill-[#C2E114]" /> เรียนต่อทันที
              </button>
            </div>
          ) : (
            <button
              onClick={() => onEnrollCourse(course.id)}
              className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all transform active:scale-98"
            >
              ลงเรียนฟรี (+{course.expReward} EXP)
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
