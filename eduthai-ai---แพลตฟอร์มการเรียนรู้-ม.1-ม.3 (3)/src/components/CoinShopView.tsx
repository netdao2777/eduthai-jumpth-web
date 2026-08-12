import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Coins, Crown, Sparkles, Check, QrCode, CreditCard, ShieldCheck, Zap, ArrowRight, Gift, CheckCircle2, Clock } from 'lucide-react';

interface CoinShopViewProps {
  user: UserProfile;
  onUpdateUserCoins: (amount: number, reason: string) => void;
  onSubscribePass: (planName: string, days: number) => void;
  onOpenDecorShop: () => void;
}

const COIN_PACKAGES = [
  { id: 'c1', coins: 100, bonus: 0, priceThb: 29, badge: null, isPopular: false },
  { id: 'c2', coins: 350, bonus: 20, priceThb: 79, badge: 'คุ้มค่า', isPopular: false },
  { id: 'c3', coins: 800, bonus: 100, priceThb: 179, badge: '🔥 ขายดีที่สุด', isPopular: true },
  { id: 'c4', coins: 2500, bonus: 400, priceThb: 499, badge: '👑 คุ้มที่สุด', isPopular: false }
];

export const CoinShopView: React.FC<CoinShopViewProps> = ({
  user,
  onUpdateUserCoins,
  onSubscribePass,
  onOpenDecorShop
}) => {
  const [activeTab, setActiveTab] = useState<'coins' | 'subscription'>('coins');
  const [selectedPackage, setSelectedPackage] = useState<typeof COIN_PACKAGES[0] | null>(null);
  const [selectedSubPlan, setSelectedSubPlan] = useState<{ name: string; price: number; days: number } | null>(null);
  
  // Checkout Modal
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleOpenCoinCheckout = (pkg: typeof COIN_PACKAGES[0]) => {
    setSelectedPackage(pkg);
    setSelectedSubPlan(null);
    setPaymentModalOpen(true);
    setPaymentSuccess(false);
  };

  const handleOpenSubCheckout = (planName: string, price: number, days: number) => {
    setSelectedSubPlan({ name: planName, price, days });
    setSelectedPackage(null);
    setPaymentModalOpen(true);
    setPaymentSuccess(false);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      if (selectedPackage) {
        const totalCoins = selectedPackage.coins + selectedPackage.bonus;
        onUpdateUserCoins(totalCoins, `เติมเหรียญแพ็กเกจ ${selectedPackage.coins} เหรียญ (฿${selectedPackage.priceThb})`);
      } else if (selectedSubPlan) {
        onSubscribePass(selectedSubPlan.name, selectedSubPlan.days);
      }

      setTimeout(() => {
        setPaymentModalOpen(false);
        setPaymentSuccess(false);
      }, 2000);
    }, 1500);
  };

  const isSubActive = user.subscriptionPass?.isActive;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-gray-700">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C2E114]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-xs px-3.5 py-1.5 rounded-full">
              <Coins className="w-4 h-4" /> ศูนย์เติมเหรียญ & แพ็กเกจบุฟเฟต์
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              เติมเหรียญ & สมัคร EduPass VIP
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              ซื้อเหรียญสำหรับปลดล็อกมินิเกมและของตกแต่งโปรไฟล์สุดเท่ หรือสมัครแพ็กเกจรายเดือนเพื่อเรียนฟรีทุกคอร์สที่ร่วมรายการได้แบบไม่จำกัด!
            </p>
          </div>

          {/* User Current Coin & Pass Status */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col items-center sm:items-end gap-2 text-center sm:text-right shrink-0">
            <div className="text-xs text-gray-300">ยอดเหรียญสะสมของคุณ</div>
            <div className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-amber-400">
              <Coins className="w-7 h-7 fill-amber-400" />
              <span>{user.coins.toLocaleString()} เหรียญ</span>
            </div>
            
            {isSubActive ? (
              <div className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-2xl border border-emerald-500/40 flex flex-col items-center sm:items-end gap-0.5 mt-1 text-center sm:text-right">
                <div className="flex items-center gap-1.5 font-extrabold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{user.subscriptionPass?.planName}</span>
                </div>
                <div className="text-[11px] text-emerald-200/90 font-medium">
                  (ใช้งานได้ถึง {user.subscriptionPass?.expiresAt})
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenDecorShop}
                className="text-xs font-bold text-[#C2E114] hover:underline flex items-center gap-1 mt-1"
              >
                <span>ไปร้านค้าของตกแต่งโปรไฟล์</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-3 mt-8 border-t border-white/10 pt-6">
          <button
            onClick={() => setActiveTab('coins')}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'coins'
                ? 'bg-[#C2E114] text-[#2D3436] shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Coins className="w-4 h-4" /> 1. เติมเหรียญ (Coins)
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'subscription'
                ? 'bg-[#C2E114] text-[#2D3436] shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-400" /> 2. แพ็กเกจรายเดือน (EduPass VIP)
          </button>
        </div>
      </div>

      {/* TAB 1: COIN PACKAGES */}
      {activeTab === 'coins' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#2D3436]">เลือกแพ็กเกจเติมเหรียญ</h2>
              <p className="text-xs text-[#636E72]">เหรียญไม่มีวันหมดอายุ ใช้ตกแต่งโปรไฟล์และปลดล็อกกิจกรรมได้ตลอดเวลา</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COIN_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl p-6 border-2 transition-all relative flex flex-col justify-between space-y-6 hover:shadow-xl ${
                  pkg.isPopular
                    ? 'border-[#C2E114] ring-2 ring-[#C2E114]/30 shadow-md'
                    : 'border-[#E0E0E0] hover:border-gray-300'
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2D3436] text-[#C2E114] font-black text-[11px] px-3.5 py-1 rounded-full shadow-xs whitespace-nowrap">
                    {pkg.badge}
                  </span>
                )}

                <div className="text-center space-y-3 pt-2">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-500 border border-amber-200 shadow-2xs">
                    <Coins className="w-9 h-9 fill-amber-400" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#2D3436]">
                      {(pkg.coins + pkg.bonus).toLocaleString()} เหรียญ
                    </h3>
                    {pkg.bonus >0 ? (
                      <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mt-1">
                        แถมฟรี +{pkg.bonus} เหรียญ
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">แพ็กเกจเริ่มต้น</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <span className="text-2xl font-black text-[#2D3436]">฿{pkg.priceThb}</span>
                    <span className="text-xs text-gray-500"> / ครั้ง</span>
                  </div>

                  <button
                    onClick={() => handleOpenCoinCheckout(pkg)}
                    className={`w-full py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                      pkg.isPopular
                        ? 'bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white shadow-md'
                        : 'bg-[#2D3436] hover:bg-black text-white'
                    }`}
                  >
                    <span>เติมเหรียญนี้</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MONTHLY SUBSCRIPTION PASS */}
      {activeTab === 'subscription' && (
        <div className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-400 text-[#2D3436] rounded-2xl flex items-center justify-center shadow-md shrink-0">
                <Crown className="w-7 h-7 fill-[#2D3436]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#2D3436]">
                  สิทธิพิเศษ EduPass VIP (เรียนบุฟเฟต์ไม่จำกัด)
                </h2>
                <p className="text-xs text-gray-600">
                  สามารถเรียนได้ในเวลาแพ็กเกจ ในทุกคอร์สเรียนที่ร่วมรายการโดยไม่ต้องจ่ายเพิ่ม!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">เข้าเรียนได้ทันที</h4>
                  <p className="text-[11px] text-gray-500">เข้าถึงบทเรียน วิดีโอ และแบบทดสอบในคอร์ส VIP ได้ตลอดเวลา</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">รับ EXP & เหรียญ x2</h4>
                  <p className="text-[11px] text-gray-500">สะสมโบนัสการเรียนเป็นสองเท่า ไต่อันดับตารางตารางเกียรติยศเร็วขึ้น</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                <Gift className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">รับกรอบรูปมงกุฎ VIP</h4>
                  <p className="text-[11px] text-gray-500">รับกรอบโปรไฟล์พิเศษฟรีตลอดระยะเวลาที่สมัครแพ็กเกจ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Monthly Plan */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-[#C2E114] transition-all space-y-6 relative shadow-md">
              <span className="bg-[#2D3436] text-[#C2E114] font-black text-xs px-3 py-1 rounded-full inline-block">
                รายเดือน (30 วัน)
              </span>

              <div>
                <h3 className="text-2xl font-black text-[#2D3436]">EduPass VIP Monthly</h3>
                <p className="text-xs text-gray-500 mt-1">เหมาะสำหรับนักเรียนที่ต้องการติวเข้มรายเดือนช่วงใกล้สอบ</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#2D3436]">฿199</span>
                <span className="text-xs text-gray-500"> / เดือน</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-600 border-t border-gray-100 pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>เรียนบุฟเฟต์คอร์ส ม.1 - ม.3 ที่ร่วมรายการตลอด 30 วัน</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>ดาวน์โหลดเอกสารประกอบการเรียน PDF ฟรี</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>รับโบนัส +200 เหรียญทันทีเมื่อสมัคร</span>
                </li>
              </ul>

              <button
                onClick={() => handleOpenSubCheckout('EduPass VIP รายเดือน', 199, 30)}
                className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 fill-current" />
                <span>สมัครแพ็กเกจรายเดือน ฿199</span>
              </button>
            </div>

            {/* Annual Plan */}
            <div className="bg-gradient-to-b from-gray-900 to-[#2D3436] text-white rounded-3xl p-8 border-2 border-[#C2E114] transition-all space-y-6 relative shadow-xl">
              <div className="flex items-center justify-between">
                <span className="bg-[#C2E114] text-[#2D3436] font-black text-xs px-3 py-1 rounded-full inline-block">
                  รายปี (365 วัน)
                </span>
                <span className="bg-amber-400 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  ประหยัด 20%
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">EduPass VIP Annual</h3>
                <p className="text-xs text-gray-300 mt-1">คุ้มที่สุดสำหรับครอบครัวและการเรียนต่อเนื่องตลอดปีการศึกษา</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#C2E114]">฿1,890</span>
                <span className="text-xs text-gray-400"> / ปี (ตกเดือนละ ฿157)</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 border-t border-gray-700 pt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C2E114]" />
                  <span>เรียนบุฟเฟต์ทุกคอร์ส ม.1 - ม.3 ที่ร่วมรายการตลอด 1 ปีเต็ม</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C2E114]" />
                  <span>รับโบนัส +1,000 เหรียญฟรีทันที</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#C2E114]" />
                  <span>ปลดล็อกกรอบรูปมงกุฎทองคำ Golden VIP แบบถาวร</span>
                </li>
              </ul>

              <button
                onClick={() => handleOpenSubCheckout('EduPass VIP รายปี', 1890, 365)}
                className="w-full bg-[#C2E114] text-[#2D3436] hover:bg-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 fill-current" />
                <span>สมัครแพ็กเกจรายปี ฿1,890</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative border border-gray-200">
            
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full"
            >
              ✕
            </button>

            {paymentSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-gray-900">ชำระเงินสำเร็จ!</h3>
                <p className="text-xs text-gray-600">
                  {selectedPackage
                    ? `เติม ${selectedPackage.coins + selectedPackage.bonus} เหรียญ เข้าบัญชีของคุณเรียบร้อยแล้ว`
                    : `เปิดใช้งาน ${selectedSubPlan?.name} เรียบร้อยแล้ว`}
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                    ขั้นตอนชำระเงินปลอดภัย 100%
                  </span>
                  <h3 className="text-xl font-black text-[#2D3436] mt-1">
                    {selectedPackage
                      ? `เติมเหรียญ ${selectedPackage.coins + selectedPackage.bonus} Coins`
                      : `สมัคร ${selectedSubPlan?.name}`}
                  </h3>
                  <p className="text-xs text-gray-500">
                    ยอดชำระสุทธิ: <span className="font-extrabold text-[#2D3436] text-base">฿{selectedPackage ? selectedPackage.priceThb : selectedSubPlan?.price}</span>
                  </p>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'qr'
                        ? 'border-[#C2E114] bg-[#C2E114]/10 text-[#2D3436]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <QrCode className="w-4 h-4" /> สแกน PromptPay QR
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-[#C2E114] bg-[#C2E114]/10 text-[#2D3436]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> บัตรเครดิต / เดบิต
                  </button>
                </div>

                {/* Simulated Payment Area */}
                {paymentMethod === 'qr' ? (
                  <div className="bg-gray-50 p-4 rounded-2xl text-center space-y-3 border border-gray-200">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=EduThaiPromptPay2026Demo"
                      alt="PromptPay QR Code"
                      className="w-36 h-36 mx-auto rounded-xl border border-gray-300 shadow-xs"
                    />
                    <p className="text-[11px] text-gray-500">
                      เปิดแอปธนาคารของคุณและสแกน QR Code เพื่อชำระเงิน
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700">หมายเลขบัตร</label>
                      <input
                        type="text"
                        placeholder="4123 •••• •••• 9876"
                        defaultValue="4123 8888 9999 1234"
                        className="w-full mt-1 p-2.5 rounded-xl border border-gray-300 bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700">วันหมดอายุ</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/28"
                          className="w-full mt-1 p-2.5 rounded-xl border border-gray-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-700">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          defaultValue="888"
                          className="w-full mt-1 p-2.5 rounded-xl border border-gray-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin" /> กำลังตรวจสอบชำระเงิน...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> ยืนยันการชำระเงิน (฿{selectedPackage ? selectedPackage.priceThb : selectedSubPlan?.price})
                    </span>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
