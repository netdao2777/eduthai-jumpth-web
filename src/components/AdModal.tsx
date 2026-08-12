import React, { useState, useEffect } from 'react';
import { X, Sparkles, ExternalLink, ShieldCheck, PlayCircle, Clock } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  title?: string;
  adContent?: {
    sponsorName: string;
    headline: string;
    description: string;
    imageUrl: string;
    ctaText: string;
  };
}

const SAMPLE_ADS = [
  {
    sponsorName: 'Samsung Galaxy Tab S9 FE for Education',
    headline: '🎓 แท็บเล็ตเพื่อการเรียนรู้นักเรียน ม.1 - ม.3',
    description: 'หน้าจอใหญ่ 10.9 นิ้ว พร้อมปากกา S Pen เขียนโน้ตเรียนจดจำง่าย สิทธิพิเศษลด 20% สำหรับนักเรียน EduThai!',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    ctaText: 'รับสิทธิ์ส่วนลดพิเศษนักเรียน'
  },
  {
    sponsorName: 'SpeakFluent AI English Practice',
    headline: '🗣️ ฝึกพูดภาษาอังกฤษ ม.ต้น ด้วย AI ส่วนตัว',
    description: 'ฝึกออกเสียง สำเนียงเป๊ะ สนทนาโต้อบกับ AI Tutor 24 ชม. เตรียมพร้อมสอบกลางภาค O-NET ฟรี 7 วันแรก',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    ctaText: 'ทดลองใช้งานฟรี 7 วัน'
  },
  {
    sponsorName: 'EduThai Science Lab VR Simulator',
    headline: '🔬 ชุดทดลองวิทยาศาสตร์เสมือนจริง VR',
    description: 'ผ่าเซลล์พืช ทดลองเคมีปลอดภัยบนมือถือ สัมผัสห้องแล็บมาตรฐานระดับโลก สนับสนุนโดย สสวท.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    ctaText: 'เปิดทดลองสถิติล่าสุด'
  }
];

export const AdModal: React.FC<AdModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  title = 'โฆษณาสนับสนุนการเรียนฟรี'
}) => {
  const [countdown, setCountdown] = useState<number>(3);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [activeAd, setActiveAd] = useState(SAMPLE_ADS[0]);

  useEffect(() => {
    if (isOpen) {
      // Pick random ad
      const randomAd = SAMPLE_ADS[Math.floor(Math.random() * SAMPLE_ADS.length)];
      setActiveAd(randomAd);
      setCountdown(3);
      setCanSkip(false);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSkipOrProceed = () => {
    onClose();
    onProceed();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 transform transition-all">
        
        {/* Header Bar */}
        <div className="bg-[#2D3436] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C2E114]">
            <Sparkles className="w-4 h-4" />
            <span>{title}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {!canSkip ? (
              <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-full text-gray-300 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 animate-spin" /> ข้ามได้ใน {countdown}s
              </span>
            ) : (
              <button
                onClick={handleSkipOrProceed}
                className="bg-[#C2E114] text-[#2D3436] hover:bg-white text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1 transition-all"
              >
                ข้ามโฆษณา <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Ad Media Card */}
        <div className="relative h-48 sm:h-56 overflow-hidden group">
          <img
            src={activeAd.imageUrl}
            alt={activeAd.headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5 text-white">
            <div>
              <span className="text-[10px] bg-amber-400 text-black font-black px-2 py-0.5 rounded-md uppercase tracking-wider mb-1 inline-block">
                SPONSOR AD
              </span>
              <p className="text-xs text-gray-300 font-medium">{activeAd.sponsorName}</p>
              <h3 className="text-base sm:text-lg font-black mt-0.5 leading-snug">{activeAd.headline}</h3>
            </div>
          </div>
        </div>

        {/* Ad Body Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-2xl border border-gray-100">
            {activeAd.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <ShieldCheck className="w-4 h-4" /> ปลอดภัยสำหรับนักเรียน
            </span>
            <span className="text-[11px] text-gray-400">EduThai Verified Partner</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(`เปิดลิงก์พันธมิตร: ${activeAd.sponsorName}`);
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#2D3436] font-bold py-3 rounded-2xl text-xs text-center flex items-center justify-center gap-1.5 transition-all"
            >
              <span>{activeAd.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
            </a>

            <button
              onClick={handleSkipOrProceed}
              disabled={!canSkip}
              className={`flex-1 font-extrabold py-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md ${
                canSkip
                  ? 'bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>{canSkip ? 'ข้ามและเริ่มทำกิจกรรม' : `รอโฆษณา (${countdown}s)`}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
