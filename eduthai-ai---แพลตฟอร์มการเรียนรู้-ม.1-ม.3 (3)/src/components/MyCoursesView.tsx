import React from 'react';
import { Course } from '../types';
import { BookOpen, Play, CheckCircle2, Award, Clock, ArrowRight } from 'lucide-react';

interface MyCoursesViewProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onExploreMore: () => void;
}

export const MyCoursesView: React.FC<MyCoursesViewProps> = ({
  courses,
  onSelectCourse,
  onExploreMore
}) => {
  const enrolledCourses = courses.filter((c) => c.isEnrolled);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#1A1C1C] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#C2E114] text-[#1A1C1C] font-extrabold text-xs px-3 py-1 rounded-full mb-2">
            <BookOpen className="w-3.5 h-3.5" /> My Learning Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">คอร์สของฉัน (My Courses)</h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            คอร์สที่คุณลงทะเบียนไว้ทั้งหมด ({enrolledCourses.length} คอร์ส)
          </p>
        </div>

        <button
          onClick={onExploreMore}
          className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-3 rounded-xl border border-white/20 flex items-center gap-2 transition-all"
        >
          ค้นหาคอร์สเพิ่ม <ArrowRight className="w-4 h-4 text-[#C2E114]" />
        </button>
      </section>

      {/* Enrolled Courses Grid */}
      {enrolledCourses.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 space-y-4">
          <div className="w-16 h-16 bg-[#C2E114]/20 rounded-full flex items-center justify-center mx-auto text-[#1A1C1C]">
            <BookOpen className="w-8 h-8 text-[#8A9914]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">คุณยังไม่ได้ลงเรียนคอร์สใดๆ</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            สำรวจคอร์สเรียนฟรีในรายวิชาคณิตศาสตร์ วิทยาศาสตร์ ภาษาอังกฤษ โค้ดดิ้ง และอื่นๆ สะสม EXP และเหรียญรางวัลทันทีเมื่อลงเรียน!
          </p>
          <button
            onClick={onExploreMore}
            className="bg-[#C2E114] text-[#1A1C1C] font-bold text-sm px-6 py-3 rounded-2xl shadow-md shadow-[#C2E114]/20"
          >
            เริ่มลงเรียนคอร์สแรกฟรี
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-gray-100 p-5 shadow-soft-card hover:shadow-md transition-all flex flex-col sm:flex-row gap-5"
            >
              {/* Thumbnail */}
              <div className="relative sm:w-48 h-36 rounded-2xl overflow-hidden shrink-0 bg-gray-900">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#1A1C1C] text-[#C2E114] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {course.subject}
                </span>
              </div>

              {/* Course Info */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span className="font-bold text-[#8A9914]">{course.grade}</span>
                    <span>•</span>
                    <span className="truncate max-w-[150px]">{course.school}</span>
                  </div>

                  <h3
                    onClick={() => onSelectCourse(course)}
                    className="font-bold text-gray-900 text-base line-clamp-2 hover:text-[#8A9914] cursor-pointer transition-colors"
                  >
                    {course.title}
                  </h3>
                </div>

                {/* Progress Bar & Continue Button */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ความคืบหน้าการเรียน
                    </span>
                    <span>{course.progress}%</span>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C2E114] h-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full bg-[#1A1C1C] hover:bg-black text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all mt-2"
                  >
                    <Play className="w-3.5 h-3.5 text-[#C2E114] fill-[#C2E114]" /> เรียนต่อบทเรียนวิดีโอ
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
