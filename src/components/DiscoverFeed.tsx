import React, { useState } from 'react';
import { Course, SubjectType, GradeLevel, UserProfile } from '../types';
import { CourseCard } from './CourseCard';
import { Search, Sparkles, Filter, BookOpen } from 'lucide-react';

interface DiscoverFeedProps {
  courses: Course[];
  user: UserProfile;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (courseId: string) => void;
  onStartOnboarding: () => void;
  onAddCourseToCart?: (course: Course) => void;
}

export const DiscoverFeed: React.FC<DiscoverFeedProps> = ({
  courses,
  user,
  onSelectCourse,
  onEnrollCourse,
  onStartOnboarding,
  onAddCourseToCart
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ทั้งหมด');
  const [selectedGrade, setSelectedGrade] = useState<string>('ทั้งหมด');

  const subjects: string[] = ['ทั้งหมด', 'คณิตศาสตร์', 'วิทยาศาสตร์', 'ภาษาอังกฤษ', 'ภาษาไทย', 'เทคโนโลยี/Coding', 'สังคมศึกษา'];
  const grades: string[] = ['ทั้งหมด', 'ม.1', 'ม.2', 'ม.3'];

  // Filter courses based on subject, grade, and search term
  const filteredCourses = courses.filter((course) => {
    const matchesSubject = selectedSubject === 'ทั้งหมด' || course.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'ทั้งหมด' || course.grade === selectedGrade;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesGrade && matchesSearch;
  });

  const recommendedCourses = courses.filter((c) => c.isRecommended);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Search & AI Recommendation Banner */}
      <section className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-xs px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> AI Personalization Feed
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            คอร์สเรียนสไตล์ปรับระดับส่วนบุคคล สำหรับ {user.isLoggedIn ? user.name : 'นักเรียน ม.1 - ม.3'}
          </h1>

          <p className="text-xs sm:text-sm text-gray-300">
            {user.isOnboarded ? (
              <>อ้างอิงจากระดับชั้น <span className="text-[#C2E114] font-bold">{user.grade}</span> และวิชาที่คุณถนัด <span className="text-[#C2E114] font-bold">{user.strengths.join(', ')}</span></>
            ) : (
              'ทำแบบสำรวจสั้นๆ เพื่อให้ AI แนะนำบทเรียนที่ตรงกับระดับความรู้และสิ่งที่สนใจของคุณ'
            )}
          </p>

          {!user.isOnboarded && user.isLoggedIn && (
            <button
              onClick={onStartOnboarding}
              className="mt-2 bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" /> เริ่มทำแบบสำรวจความสนใจส่วนบุคคล
            </button>
          )}

          {/* Search Box */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาชื่อวิชา เช่น สมการ ม.2, การสังเคราะห์ด้วยแสง, Python..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C2E114] focus:bg-white/20 text-sm font-medium transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Area */}
      <section className="space-y-4">
        
        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <span className="text-xs font-bold text-[#636E72] uppercase shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> วิชา:
          </span>
          {subjects.map((sub) => {
            const isActive = selectedSubject === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#C2E114] text-[#2D3436] shadow-2xs'
                    : 'bg-white text-[#636E72] hover:bg-[#F1F2F6] border border-[#E0E0E0]'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Grade Filter Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#636E72] uppercase shrink-0 mr-1">ระดับชั้น:</span>
          {grades.map((g) => {
            const isActive = selectedGrade === g;
            return (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#8A9914] text-white'
                    : 'bg-[#F1F2F6] text-[#636E72] hover:bg-[#E4E6EB] border border-[#E0E0E0]'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </section>

      {/* AI Recommended Section */}
      {selectedSubject === 'ทั้งหมด' && selectedGrade === 'ทั้งหมด' && !searchTerm && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D3436] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8A9914]" /> คอร์สแนะนำพิเศษประจำสัปดาห์
            </h2>
            <span className="text-xs text-[#636E72] font-medium">อัปเดตทุกวันจันทร์</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard
                key={`rec-${course.id}`}
                course={course}
                onSelectCourse={onSelectCourse}
                onEnrollCourse={onEnrollCourse}
                onAddToCart={onAddCourseToCart}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Catalog Courses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#2D3436] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2D3436]" /> รายวิชาเรียนทั้งหมด ({filteredCourses.length})
          </h2>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="card p-12 text-center space-y-3">
            <div className="w-16 h-16 bg-[#F1F2F6] rounded-full flex items-center justify-center mx-auto text-[#636E72] text-xl font-bold">
              ?
            </div>
            <h3 className="text-base font-bold text-[#2D3436]">ไม่พบคอร์สที่ตรงตามเงื่อนไข</h3>
            <p className="text-xs text-[#636E72] max-w-sm mx-auto">
              ลองเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองเพื่อดูคอร์สเรียนวิชาอื่นในระดับชั้น ม.1 - ม.3
            </p>
            <button
              onClick={() => {
                setSelectedSubject('ทั้งหมด');
                setSelectedGrade('ทั้งหมด');
                setSearchTerm('');
              }}
              className="bg-[#2D3436] text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelectCourse={onSelectCourse}
                onEnrollCourse={onEnrollCourse}
                onAddToCart={onAddCourseToCart}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
