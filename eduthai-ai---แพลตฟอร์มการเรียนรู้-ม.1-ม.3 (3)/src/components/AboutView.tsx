import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Heart, Brain, Zap, CheckCircle2, Rocket, Users, BookOpen, Target, Gift, HelpCircle } from 'lucide-react';

interface AboutViewProps {
  onStartFree: () => void;
  onExploreCourses: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartFree, onExploreCourses }) => {
  return (
    <div className="space-y-12 pb-16 max-w-6xl mx-auto px-4 sm:px-8">
      
      {/* Header Banner - Project JUMP TH Announcement */}
      <section className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#1A1C1C] text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Decorative Glow Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C2E114]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-black text-xs px-3.5 py-1.5 rounded-full shadow-xs">
            <Rocket className="w-4 h-4" /> นวัตกรรม EdTech ในโครงการ JUMP TH ปีนี้ (JUMP Thailand 2026)
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            โครงการ EdTech เพื่อความเท่าเทียมทางการศึกษา <br className="hidden sm:inline" />
            <span className="text-[#C2E114]">ระดับชั้น ม.1 - ม.3</span>
          </h1>

          <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 space-y-3">
            <p className="text-base sm:text-xl font-bold text-[#C2E114] leading-snug">
              "ปลดล็อกการเรียนรู้เท่าเทียม ด้วย AI Personalization & Gamification"
            </p>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
              เรียนฟรีไม่มีค่าใช้จ่าย! แพลตฟอร์มปรับเนื้อหาและแบบทดสอบตามความถนัดของนักเรียนรายบุคคล พร้อมสะสม EXP เหรียญรางวัล และมีครูผู้ช่วย AI คอยตอบข้อสงสัย 24 ชม.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              เริ่มเรียนฟรีสะสม EXP ทันที <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onExploreCourses}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl text-sm sm:text-base border border-white/20 transition-all text-center"
            >
              สำรวจรายวิชาทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* About JUMP TH 2026 Section */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E0E0E0] shadow-2xs space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#F1F2F6] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-[#8A9914] bg-[#C2E114]/20 px-3 py-1 rounded-full">
              ที่มาและความสำคัญโครงการ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D3436]">
              เกี่ยวกับโครงการ JUMP TH (JUMP Thailand)
            </h2>
            <p className="text-xs sm:text-sm text-[#636E72] leading-relaxed">
              <strong>JUMP TH (JUMP Thailand)</strong> คือโครงการขับเคลื่อนนวัตกรรมเทคโนโลยีเพื่อสังคม EdTech ประจำปีนี้ มุ่งเน้นแก้ปัญหาความเหลื่อมล้ำทางการศึกษา ยกระดับคุณภาพการเรียนรู้สำหรับเด็กนักเรียน ม.1 - ม.3 ในโรงเรียนขยายโอกาสและพื้นที่ห่างไกลทั่วประเทศ
            </p>
          </div>

          <div className="bg-[#F8F9FA] p-5 rounded-2xl border border-[#E0E0E0] text-center shrink-0 w-full md:w-auto space-y-1">
            <div className="text-3xl font-black text-[#8A9914]">100%</div>
            <div className="text-xs font-bold text-[#2D3436]">เข้าถึงฟรี ไม่มีค่าบริการ</div>
            <p className="text-[11px] text-[#636E72]">สนับสนุนโดยความร่วมมือภาคีเครือข่าย</p>
          </div>
        </div>

        {/* 3 Main Pillars of JUMP TH EduThai AI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-[#E0E0E0] space-y-3">
            <div className="w-12 h-12 bg-[#C2E114]/30 text-[#2D3436] rounded-2xl flex items-center justify-center font-bold">
              <Brain className="w-6 h-6 text-[#8A9914]" />
            </div>
            <h3 className="font-bold text-base text-[#2D3436]">1. AI Personalization</h3>
            <p className="text-xs text-[#636E72] leading-relaxed">
              ระบบปัญญาประดิษฐ์วิเคราะห์จุดแข็ง-จุดที่ต้องปรับปรุงของนักเรียนแต่ละคน ปรับระดับความยากง่ายของแบบทดสอบ (Adaptive Quiz) และจัดเส้นทางการเรียนที่เหมาะสมเฉพาะบุคคล
            </p>
          </div>

          <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-[#E0E0E0] space-y-3">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center font-bold">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-base text-[#2D3436]">2. Gamification & Rewards</h3>
            <p className="text-xs text-[#636E72] leading-relaxed">
              เปลี่ยนบรรยากาศการเรียนให้ท้าทาย สนุกสนานด้วยระบบสะสม EXP, Coins เหรียญรางวัล, Daily Quests, Badges ตราเกียรติยศ และกระดานผู้นำ Leaderboard เพื่อสร้างแรงจูงใจในการเรียนรู้อย่างต่อเนื่อง
            </p>
          </div>

          <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-[#E0E0E0] space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-bold">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-base text-[#2D3436]">3. 24/7 AI Tutor ครูผู้ช่วย</h3>
            <p className="text-xs text-[#636E72] leading-relaxed">
              นักเรียนสามารถแชตถามข้อสงสัยในบทเรียนวิชาคณิต วิทย์ อังกฤษ โค้ดดิ้ง ได้ตลอด 24 ชั่วโมง พร้อมระบบเสียงอ่านภาษาไทยเหมือนมีติวเตอร์ส่วนตัวดูแลประคบประงม
            </p>
          </div>

        </div>
      </section>

      {/* Target Audience & Social Impact */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-8 rounded-3xl border border-[#E0E0E0] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8A9914] bg-[#C2E114]/20 px-3 py-1 rounded-full w-fit">
            <Users className="w-4 h-4" /> กลุ่มเป้าหมายโครงการ JUMP TH
          </div>
          <h3 className="text-xl font-bold text-[#2D3436]">กลุ่มเป้าหมายนักเรียน ม.1 - ม.3</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-[#636E72]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>นักเรียนในโรงเรียนขยายโอกาส:</strong> ขาดแคลนสื่อการสอนและอุปกรณ์คุณภาพสูง</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>นักเรียนที่ต้องการติวเข้ม:</strong> ทบทวนบทเรียนล่วงหน้าเพื่อเตรียมสอบเข้า ม.4 โรงเรียนแข่งขันสูง</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>คุณครูและครีเอเตอร์ทางการศึกษา:</strong> สามารถใช้ Creator Studio สร้างและเผยแพร่สื่อการเรียนรู้ให้เด็กทั่วประเทศ</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E0E0E0] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full w-fit">
            <Target className="w-4 h-4" /> ผลลัพธ์คาดการณ์โครงการ (Impact)
          </div>
          <h3 className="text-xl font-bold text-[#2D3436]">เป้าหมายตัววัดผลความสำเร็จ</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-[#636E72]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>ลดช่องว่างผลการเรียน:</strong> เพิ่มคะแนนเฉลี่ยการทดสอบรายวิชาหลักขึ้น 25%</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>สร้างพฤติกรรมการเรียนรู้อย่างยั่งยืน:</strong> อัตราการเข้าเรียนสม่ำเสมอด้วยระบบ Gamification Streak</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>กระจายโอกาสรายได้สู่ครีเอเตอร์:</strong> สนับสนุนครูไทยสร้างคอนเทนต์คุณภาพพร้อมรับผลตอบแทน Coins</span>
            </li>
          </ul>
        </div>

      </section>

      {/* Bottom CTA Card */}
      <section className="bg-gradient-to-r from-[#2D3436] to-[#1A1C1C] text-white p-8 sm:p-10 rounded-3xl text-center space-y-5 shadow-lg">
        <h3 className="text-2xl sm:text-3xl font-black">
          ร่วมเป็นส่วนหนึ่งของโครงการ EdTech เพื่อความเท่าเทียมทางการศึกษา JUMP TH
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
          เริ่มต้นเรียนฟรี สะสม EXP และพัฒนาทักษะวิชาการวันนี้ ไม่ว่าคุณจะเป็นนักเรียน ครีเอเตอร์ หรือครูผู้สอน
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartFree}
            className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-black px-8 py-3.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            เริ่มเรียนฟรีสะสม EXP ทันที <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreCourses}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl text-sm border border-white/20 transition-all"
          >
            สำรวจรายวิชาทั้งหมด
          </button>
        </div>
      </section>

    </div>
  );
};
