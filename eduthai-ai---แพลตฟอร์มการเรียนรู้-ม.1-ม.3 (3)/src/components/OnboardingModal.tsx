import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GradeLevel, UserProfile } from '../types';
import { Sparkles, Check, ArrowRight, BookOpen, Heart, Award, Trophy } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  user: UserProfile;
  onComplete: (updatedData: Partial<UserProfile>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  user,
  onComplete
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAge, setSelectedAge] = useState<number>(user.age || 13);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(user.grade || 'ม.2');
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>(['คณิตศาสตร์']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['ปัญญาประดิษฐ์ AI']);

  if (!isOpen) return null;

  const toggleStrength = (item: string) => {
    if (selectedStrengths.includes(item)) {
      setSelectedStrengths(selectedStrengths.filter(i => i !== item));
    } else {
      setSelectedStrengths([...selectedStrengths, item]);
    }
  };

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter(i => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const handleFinish = () => {
    onComplete({
      age: selectedAge,
      grade: selectedGrade,
      strengths: selectedStrengths,
      interests: selectedInterests,
      isOnboarded: true,
      exp: user.exp + 100, // +100 Welcome Bonus
      coins: user.coins + 50
    });
  };

  const subjectsList = ['คณิตศาสตร์', 'วิทยาศาสตร์', 'ภาษาอังกฤษ', 'ภาษาไทย', 'เทคโนโลยี/Coding', 'สังคมศึกษา'];
  const interestsList = ['เกมและอีสปอร์ต', 'ปัญญาประดิษฐ์ AI', 'หุ่นยนต์ & STEM', 'ภาษาต่างประเทศ', 'ดนตรีและศิลปะ', 'ธุรกิจและนวัตกรรม'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Progress Header */}
          <div className="bg-[#1A1C1C] text-white p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#C2E114] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> AI Personalization Setup (ขั้นตอน {step}/4)
              </span>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">
                รับทันที +100 EXP
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C2E114] h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            <h2 className="text-xl font-bold mt-4 text-white">
              {step === 1 && "ยินดีต้อนรับ! คุณอายุเท่าไหร่ครับ?"}
              {step === 2 && "ตอนนี้คุณกำลังเรียนอยู่ระดับชั้นไหน?"}
              {step === 3 && "วิชาไหนที่คุณรู้สึกชอบหรือถนัดที่สุด?"}
              {step === 4 && "คุณสนใจหัวข้อเรียนรู้พิเศษเรื่องไหนเป็นพิเศษ?"}
            </h2>
            <p className="text-xs text-gray-300 mt-1">
              ระบบ AI จะใช้ข้อมูลนี้เพื่อจัดแผนบทเรียนและข้อสอบ Adaptive ที่เหมาะกับคุณที่สุด
            </p>
          </div>

          <div className="p-6">
            {/* Step 1: Age */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[12, 13, 14, 15].map((ageNum) => (
                    <button
                      key={ageNum}
                      onClick={() => setSelectedAge(ageNum)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all ${
                        selectedAge === ageNum
                          ? 'border-[#C2E114] bg-[#C2E114]/10 font-bold text-gray-900 shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl font-bold block mb-1">{ageNum} ปี</span>
                      <span className="text-xs text-gray-500">
                        {ageNum === 12 || ageNum === 13 ? 'มัธยมตอนต้น (ม.1-ม.2)' : 'มัธยมตอนต้น (ม.2-ม.3)'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Grade */}
            {step === 2 && (
              <div className="space-y-3">
                {(['ม.1', 'ม.2', 'ม.3'] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      selectedGrade === g
                        ? 'border-[#C2E114] bg-[#C2E114]/10 font-bold text-gray-900'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1A1C1C] text-[#C2E114] flex items-center justify-center font-bold">
                        {g}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-900">ระดับชั้น {g}</div>
                        <div className="text-xs text-gray-500">
                          {g === 'ม.1' && 'ปูพื้นฐานคณิต วิทย์ ภาษา และคิดเชิงคำนวณ'}
                          {g === 'ม.2' && 'เข้มข้นสมการ พืช และภาษาอังกฤษใช้งานจริง'}
                          {g === 'ม.3' && 'เตรียมสอบเข้า ม.4 และสอบ O-NET ทบทวนเข้ม'}
                        </div>
                      </div>
                    </div>
                    {selectedGrade === g && <Check className="w-5 h-5 text-[#8A9914]" />}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Strengths */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="text-xs text-gray-500 mb-2">เลือกได้มากกว่า 1 วิชา</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {subjectsList.map((sub) => {
                    const isSelected = selectedStrengths.includes(sub);
                    return (
                      <button
                        key={sub}
                        onClick={() => toggleStrength(sub)}
                        className={`p-3 rounded-2xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#C2E114] bg-[#C2E114]/10 font-bold text-gray-900'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-500" />
                          {sub}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#8A9914]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Interests */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="text-xs text-gray-500 mb-2">เพื่อสอดแทรกโจทย์การเรียนกับสิ่งที่ชอบ</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {interestsList.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-3 rounded-2xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#C2E114] bg-[#C2E114]/10 font-bold text-gray-900'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-500" />
                          {interest}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#8A9914]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3 mt-4">
                  <Trophy className="w-8 h-8 text-amber-500 shrink-0" />
                  <div className="text-xs text-amber-800">
                    <span className="font-bold block">รางวัลโบนัสแรกเข้า!</span>
                    กดเสร็จสิ้นเพื่อรับทันที <span className="font-bold text-amber-900">+100 EXP และ +50 เหรียญ</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              {step > 1 ? (
                <button
                  onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 font-medium"
                >
                  ย้อนกลับ
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={() => setStep((step + 1) as 1 | 2 | 3 | 4)}
                  className="bg-[#1A1C1C] hover:bg-black text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm transition-all"
                >
                  ถัดไป <ArrowRight className="w-4 h-4 text-[#C2E114]" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="bg-[#C2E114] hover:bg-[#b0cc10] text-[#1A1C1C] font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-md shadow-[#C2E114]/30 transition-all transform active:scale-98"
                >
                  เสร็จสิ้น & รับรางวัล <Award className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
