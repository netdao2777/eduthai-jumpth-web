import React, { useState } from 'react';
import { Course, SubjectType, GradeLevel, UserProfile } from '../types';
import { CourseCard } from './CourseCard';
import { Search, Sparkles, Filter, BookOpen, Heart, Coins, Zap, Crown } from 'lucide-react';

interface DiscoverFeedProps {
  courses: Course[];
  user: UserProfile;
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (courseId: string) => void;
  onStartOnboarding: () => void;
  onAddCourseToCart?: (course: Course) => void;
  onOpenDonatePlatform?: () => void;
  onNavigateSubscription?: () => void;
}

export const DiscoverFeed: React.FC<DiscoverFeedProps> = ({
  courses,
  user,
  onSelectCourse,
  onEnrollCourse,
  onStartOnboarding,
  onAddCourseToCart,
  onOpenDonatePlatform,
  onNavigateSubscription
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ทั้งหมด');
  const [selectedGrade, setSelectedGrade] = useState<string>('ทั้งหมด');
  const [filterBuffetOnly, setFilterBuffetOnly] = useState<boolean>(false);

  const subjects: string[] = ['ทั้งหมด', 'คณิตศาสตร์', 'วิทยาศาสตร์', 'ภาษาอังกฤษ', 'ภาษาไทย', 'เทคโนโลยี/Coding', 'สังคมศึกษา'];
  const grades: string[] = ['ทั้งหมด', 'ม.1', 'ม.2', 'ม.3'];

  // Filter courses based on subject, grade, buffet flag, and search term
  const filteredCourses = courses.filter((course) => {
    const matchesSubject = selectedSubject === 'ทั้งหมด' || course.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'ทั้งหมด' || course.grade === selectedGrade;
    const matchesBuffet = !filterBuffetOnly || course.isBuffetIncluded === true;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesGrade && matchesBuffet && matchesSearch;
  });

  const recommendedCourses = courses.filter((c) => c.isRecommended);
  const buffetCoursesCount = courses.filter((c) => c.isBuffetIncluded).length;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Search & AI Recommendation Banner */}
      <section className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-xs px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> AI Personalization Feed
            </div>
            {user.subscriptionPass?.isActive && (
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-black font-extrabold text-xs px-3 py-1 rounded-full">
                <Crown className="w-3.5 h-3.5 fill-black" /> {user.subscriptionPass.planName}
              </div>
            )}
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
              className="mt-2 bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
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

      {/* Buffet Campaign Highlight Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#2D3436] text-white p-5 sm:p-6 rounded-3xl border border-blue-500/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 fill-amber-300 text-amber-300" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                ⚡ แคมเปญบุฟเฟ่ต์เรียนไม่อั้น
              </span>
              <span className="text-xs text-amber-300 font-bold">{buffetCoursesCount} คอร์สร่วมรายการ</span>
            </div>
            <h3 className="text-base font-extrabold text-white">
              สมัครแพ็กเกจเรียนไม่อั้น เข้าถึงทุกคอร์สที่ร่วมรายการได้ทันที!
            </h3>
            <p className="text-xs text-blue-200/90 max-w-xl">
              จ่ายราคาเดียวเริ่มต้นเพียงสัปดาห์ละ 49 บาท หรือเดือนละ 149 บาท เรียนได้ไม่อั้นจากครูผู้สอนชั้นนำ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setFilterBuffetOnly(!filterBuffetOnly)}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              filterBuffetOnly
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{filterBuffetOnly ? 'แสดงคอร์สทั้งหมด' : 'ดูเฉพาะคอร์สบุฟเฟ่ต์'}</span>
          </button>

          {onNavigateSubscription && (
            <button
              onClick={onNavigateSubscription}
              className="flex-1 md:flex-none bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>ดูแพ็กเกจสมาชิก</span>
            </button>
          )}
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
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C2E114] text-[#2D3436] shadow-2xs font-extrabold'
                    : 'bg-white text-[#636E72] hover:bg-[#F1F2F6] border border-[#E0E0E0]'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Grade Filter Pills & Buffet Toggle */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#636E72] uppercase shrink-0 mr-1">ระดับชั้น:</span>
            {grades.map((g) => {
              const isActive = selectedGrade === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
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

          <button
            onClick={() => setFilterBuffetOnly(!filterBuffetOnly)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterBuffetOnly
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>กรองเฉพาะคอร์สบุฟเฟ่ต์เรียนไม่อั้น {filterBuffetOnly ? '✓' : ''}</span>
          </button>
        </div>
      </section>

      {/* AI Recommended Section */}
      {selectedSubject === 'ทั้งหมด' && selectedGrade === 'ทั้งหมด' && !searchTerm && !filterBuffetOnly && (
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
                user={user}
                onSelectCourse={onSelectCourse}
                onEnrollCourse={onEnrollCourse}
                onAddToCart={onAddCourseToCart}
                onNavigateSubscription={onNavigateSubscription}
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
          {filterBuffetOnly && (
            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full">
              กำลังแสดงเฉพาะคอร์สในแคมเปญบุฟเฟ่ต์
            </span>
          )}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="card p-12 text-center space-y-3 bg-white rounded-3xl border border-gray-200">
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
                setFilterBuffetOnly(false);
              }}
              className="bg-[#2D3436] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
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
                user={user}
                onSelectCourse={onSelectCourse}
                onEnrollCourse={onEnrollCourse}
                onAddToCart={onAddCourseToCart}
                onNavigateSubscription={onNavigateSubscription}
              />
            ))}
          </div>
        )}
      </section>

      {/* Support Platform Card */}
      {onOpenDonatePlatform && (
        <section className="bg-gradient-to-r from-[#2D3436] via-[#384144] to-[#2D3436] text-white p-6 sm:p-7 rounded-3xl border border-white/10 shadow-md flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-400 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 fill-rose-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#C2E114] text-[#2D3436] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  โครงการเพื่อการศึกษาเท่าเทียม
                </span>
                <span className="text-[11px] text-gray-300">สนับสนุนแบบไม่บังคับ</span>
              </div>
              <h3 className="text-base font-extrabold text-white">
                ร่วมสนับสนุนแพลตฟอร์มด้วยเหรียญ (ขั้นต่ำ 1 เหรียญ)
              </h3>
              <p className="text-xs text-gray-300 max-w-xl">
                ร่วมเป็นส่วนหนึ่งในการสนับสนุนค่าดูแลระบบและสร้างสื่อการสอนใหม่ๆ ให้นักเรียน ม.1 - ม.3 ได้เรียนฟรีอย่างทั่วถึง
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDonatePlatform}
            className="w-full sm:w-auto bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-black px-6 py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>โดเนทสนับสนุนแพลตฟอร์ม</span>
          </button>
        </section>
      )}

    </div>
  );
};
