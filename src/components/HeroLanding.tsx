import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Users, BookOpen, Heart, Brain, Zap, CheckCircle2 } from 'lucide-react';

interface HeroLandingProps {
  onStartFree: () => void;
  onExploreCourses: () => void;
  onOpenAbout?: () => void;
  onOpenDonatePlatform?: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartFree,
  onExploreCourses,
  onOpenAbout,
  onOpenDonatePlatform
}) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#2D3436] via-[#3d4548] to-[#2D3436] text-white pt-12 pb-20 px-4 sm:px-8 rounded-b-3xl sm:rounded-b-[40px] shadow-lg">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C2E114]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          
          {/* Badge & JUMP TH Info */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#C2E114]/40 px-4 py-2 rounded-full text-xs font-bold text-[#C2E114]">
            <Sparkles className="w-4 h-4" /> โครงการ EdTech เพื่อความเท่าเทียมทางการศึกษา ม.1 - ม.3 (โครงการ JUMP TH ปีนี้)
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight max-w-4xl mx-auto tracking-tight">
            ปลดล็อกการเรียนรู้เท่าเทียม ด้วย <br className="hidden sm:inline" />
            <span className="text-[#C2E114] inline-block mt-1">AI Personalization & Gamification</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            เรียนฟรีไม่มีค่าใช้จ่าย! แพลตฟอร์มปรับเนื้อหาและแบบทดสอบตามความถนัดของนักเรียนรายบุคคล พร้อมสะสม EXP เหรียญรางวัล และมีครูผู้ช่วย AI คอยตอบข้อสงสัย 24 ชม.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartFree}
              className="w-full sm:w-auto bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold px-8 py-3.5 rounded-xl text-base shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              เริ่มเรียนฟรีสะสม EXP ทันที <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onExploreCourses}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white font-bold px-8 py-3.5 rounded-xl text-base border border-white/20 transition-all text-center"
            >
              สำรวจรายวิชาทั้งหมด
            </button>
            {onOpenAbout && (
              <button
                onClick={onOpenAbout}
                className="w-full sm:w-auto bg-[#C2E114]/20 hover:bg-[#C2E114]/30 text-[#C2E114] font-bold px-6 py-3.5 rounded-xl text-base border border-[#C2E114]/30 transition-all text-center flex items-center justify-center gap-2"
              >
                ℹ️ เกี่ยวกับเรา (JUMP TH)
              </button>
            )}
            {onOpenDonatePlatform && (
              <button
                onClick={onOpenDonatePlatform}
                className="w-full sm:w-auto bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white font-bold px-6 py-3.5 rounded-xl text-base border border-rose-400/40 transition-all text-center flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400" /> สนับสนุนแพลตฟอร์ม (ขั้นต่ำ 1 เหรียญ)
              </button>
            )}
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 text-left">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C2E114]">120,000+</div>
              <div className="text-xs text-gray-300 mt-0.5">นักเรียนขยายโอกาสเข้าร่วม</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">450+</div>
              <div className="text-xs text-gray-300 mt-0.5">โรงเรียนพื้นที่ห่างไกลทั่วไทย</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C2E114]">100%</div>
              <div className="text-xs text-gray-300 mt-0.5">เข้าถึงฟรี ไม่คิดค่าบริการ</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">24 ชม.</div>
              <div className="text-xs text-gray-300 mt-0.5">AI Tutor คอยติวส่วนตัว</div>
            </div>
          </div>

        </div>
      </section>

      {/* Solving Inequality Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#8A9914] bg-[#C2E114]/20 px-3 py-1 rounded-full uppercase tracking-wider">
            เป้าหมายโครงการ (Educational Inequality)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D3436] mt-3">
            การศึกษาคุณภาพสูงที่ไม่ขึ้นกับพื้นที่หรือกำลังทรัพย์
          </h2>
          <p className="text-[#636E72] text-sm mt-2">
            เราใช้เทคโนโลยีปัญญาประดิษฐ์มาสลายช่องว่างความเหลื่อมล้ำ ให้เด็กนักเรียน ม.1 - ม.3 ทุกคนในประเทศไทยได้รับคำแนะนำส่วนตัวเหมือนมีติวเตอร์ชั้นนำอยู่ข้างกาย
          </p>
        </div>

        {/* 4 Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="card hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-[#C2E114]/20 text-[#2D3436] rounded-xl flex items-center justify-center font-bold mb-4">
              <Brain className="w-6 h-6 text-[#8A9914]" />
            </div>
            <h3 className="font-bold text-[#2D3436] text-base">AI Adaptive Quiz</h3>
            <p className="text-xs text-[#636E72] mt-2 leading-relaxed">
              แบบทดสอบปรับระดับความยากง่ายตามพื้นฐานของผู้เรียน ตอบถูกได้โจทย์ท้าทายขึ้น ตอบผิดมี AI อธิบายละเอียด
            </p>
          </div>

          <div className="card hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold mb-4">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-[#2D3436] text-base">Gamification Engine</h3>
            <p className="text-xs text-[#636E72] mt-2 leading-relaxed">
              เปลี่ยนการเรียนให้สนุกเหมือนเล่นเกม สะสม EXP เหรียญรางวัล ตราเกียรติยศ และอันดับกระดานผู้นำ
            </p>
          </div>

          <div className="card hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold mb-4">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-[#2D3436] text-base">24/7 AI ครูผู้ช่วย</h3>
            <p className="text-xs text-[#636E72] mt-2 leading-relaxed">
              สงสัยตรงไหนแชตถามได้ทันที ใช้วิธีสอนที่เข้าใจง่าย พร้อมมีระบบเสียงอ่านภาษาไทยสร้างความเป็นกันเอง
            </p>
          </div>

          <div className="card hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center font-bold mb-4">
              <Heart className="w-6 h-6 text-sky-600" />
            </div>
            <h3 className="font-bold text-[#2D3436] text-base">เรียนฟรี 100% ทุกอุปกรณ์</h3>
            <p className="text-xs text-[#636E72] mt-2 leading-relaxed">
              ออกแบบให้กินอินเทอร์เน็ตต่ำ รองรับสมาร์ตโฟนทุกรุ่น และใช้งานผ่านเว็บบราวเซอร์ได้ทันที ไม่ต้องติดตั้งแอป
            </p>
          </div>

        </div>
      </section>

      {/* Target Audience & Impact */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-[#2D3436] text-white p-8 sm:p-12 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="bg-[#C2E114] text-[#2D3436] text-xs font-bold px-3 py-1 rounded-full inline-block">
              กลุ่มเป้าหมายนักเรียน
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">ออกแบบสำหรับนักเรียน ม.1 - ม.3 ทั่วประเทศ</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C2E114] shrink-0" />
                นักเรียนในโรงเรียนขยายโอกาส และโรงเรียนในพื้นที่ห่างไกล
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C2E114] shrink-0" />
                นักเรียนที่ต้องการทบทวนบทเรียนเพื่อเตรียมสอบเข้า ม.4 โรงเรียนชั้นนำ
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C2E114] shrink-0" />
                คุณครูผู้สอนที่ต้องการคลังสื่อและเครื่องมือ AI ช่วยวัดผลนักเรียน
              </li>
            </ul>
          </div>

          <div className="w-full md:w-auto bg-white/10 p-6 rounded-xl border border-white/10 space-y-3 text-center shrink-0">
            <div className="text-lg font-bold text-[#C2E114]">พร้อมเปลี่ยนการเรียนให้สนุกรึยัง?</div>
            <p className="text-xs text-gray-300 max-w-xs">
              สมัครสมาชิกด้วยเบอร์โทรศัพท์ง่ายๆ ภายใน 1 นาที
            </p>
            <button
              onClick={onStartFree}
              className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold py-3.5 px-6 rounded-xl shadow-xs text-sm transition-all"
            >
              ลงทะเบียนเข้าเรียนฟรี
            </button>
          </div>
        </div>
      </section>

      {/* Voluntary Platform Donation Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-amber-50 via-lime-50/60 to-emerald-50 p-6 sm:p-8 rounded-3xl border border-lime-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-200 text-rose-500 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#C2E114] text-[#2D3436] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  โครงการเพื่อสังคม (Non-Profit)
                </span>
                <span className="text-xs text-gray-500 font-medium">ร่วมสนับสนุนแบบไม่บังคับ</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#2D3436]">
                ร่วมสนับสนุนแพลตฟอร์มการศึกษาฟรี (ขั้นต่ำเพียง 1 เหรียญ)
              </h3>
              <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
                ทุกเหรียญที่คุณมอบให้ช่วยเป็นค่าน้ำมันขับเคลื่อนเซิร์ฟเวอร์ AI Tutor 24 ชม. และผลิตบทเรียนคุณภาพสูงส่งมอบให้นักเรียนในพื้นที่ห่างไกลฟรี 100%
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDonatePlatform}
            className="w-full sm:w-auto bg-[#2D3436] hover:bg-black text-white hover:text-[#C2E114] font-black px-6 py-3.5 rounded-2xl text-xs shadow-md flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>โดเนทสนับสนุนแพลตฟอร์ม</span>
          </button>
        </div>
      </section>

    </div>
  );
};
