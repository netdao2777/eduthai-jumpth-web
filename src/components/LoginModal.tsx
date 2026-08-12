import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Lock, CheckCircle2, ArrowRight, ShieldCheck, Mail, Key, UserCheck, GraduationCap, Video, ShieldAlert, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { name: string; phone: string; email: string; role: UserRole; school: string; grade: any }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  // Selected Role in Registration
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  // Selected Sign-In Method: 'google' | 'otp' | 'email'
  const [authMethod, setAuthMethod] = useState<'google' | 'otp' | 'email'>('google');

  // OTP Form State
  const [phone, setPhone] = useState('081-234-5678');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['1', '2', '3', '4', '5', '6']);
  const [countdown, setCountdown] = useState(30);

  // Email / Account Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('ม.2');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Google Login
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const roleNames = {
        student: 'นักเรียน Demo (Google)',
        creator: 'ครูพี่เป้ (Creator Google)',
        admin: 'ผู้ดูแลระบบ (Admin Google)'
      };
      onLoginSuccess({
        name: name || roleNames[selectedRole],
        phone: '089-999-8888',
        email: email || 'user.google@eduthai.org',
        role: selectedRole,
        school: school || 'โรงเรียนไกลกังวล',
        grade: grade as any
      });
    }, 1200);
  };

  // Handle OTP Send & Verify
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setErrorMsg('กรุณากรอกเบอร์โทรศัพท์มือถือที่ถูกต้อง');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setCountdown(30);
  };

  const handleVerifyOtp = () => {
    const code = otpCode.join('');
    if (code.length < 6) {
      setErrorMsg('กรุณากรอกรหัส OTP ให้ครบ 6 หลัก');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: name || (selectedRole === 'creator' ? 'ครูผู้ลงสื่อ (OTP)' : selectedRole === 'admin' ? 'ผู้ดูแลระบบ (OTP)' : 'นักเรียน (OTP)'),
        phone,
        email: 'user.otp@eduthai.org',
        role: selectedRole,
        school: school || 'โรงเรียนชุมชนบ้านดอน',
        grade: grade as any
      });
    }, 1000);
  };

  // Handle Email / Password Creation
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name,
        phone: '081-000-1111',
        email,
        role: selectedRole,
        school: school || 'โรงเรียนสาธิตการศึกษา',
        grade: grade as any
      });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E0E0E0] max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] text-white p-6 relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#C2E114] text-[#2D3436] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> EduThai Multi-Role Auth
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">เข้าสู่ระบบ / ลงทะเบียนบัญชี</h2>
            <p className="text-gray-300 text-xs mt-1">เลือกประเภทบัญชีและช่องทางการเข้าสู่ระบบที่คุณสะดวก</p>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Step 1: Select Role */}
            <div>
              <label className="block text-xs font-extrabold text-[#2D3436] mb-2 uppercase tracking-wider">
                1. เลือกประเภทบัญชีของคุณ (Role)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedRole === 'student'
                      ? 'border-[#C2E114] bg-[#C2E114]/10 text-[#2D3436] font-extrabold shadow-2xs'
                      : 'border-[#E0E0E0] text-[#636E72] hover:bg-[#F1F2F6]'
                  }`}
                >
                  <GraduationCap className={`w-5 h-5 ${selectedRole === 'student' ? 'text-[#8A9914]' : 'text-[#636E72]'}`} />
                  <span className="text-xs">นักเรียน</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('creator')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedRole === 'creator'
                      ? 'border-[#C2E114] bg-[#C2E114]/10 text-[#2D3436] font-extrabold shadow-2xs'
                      : 'border-[#E0E0E0] text-[#636E72] hover:bg-[#F1F2F6]'
                  }`}
                >
                  <Video className={`w-5 h-5 ${selectedRole === 'creator' ? 'text-[#8A9914]' : 'text-[#636E72]'}`} />
                  <span className="text-xs">ครีเอเตอร์</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    selectedRole === 'admin'
                      ? 'border-[#C2E114] bg-[#C2E114]/10 text-[#2D3436] font-extrabold shadow-2xs'
                      : 'border-[#E0E0E0] text-[#636E72] hover:bg-[#F1F2F6]'
                  }`}
                >
                  <ShieldAlert className={`w-5 h-5 ${selectedRole === 'admin' ? 'text-[#8A9914]' : 'text-[#636E72]'}`} />
                  <span className="text-xs">ผู้พัฒนา</span>
                </button>
              </div>
            </div>

            {/* Step 2: Select Auth Method */}
            <div>
              <label className="block text-xs font-extrabold text-[#2D3436] mb-2 uppercase tracking-wider">
                2. เลือกช่องทางการลงทะเบียน / เข้าสู่ระบบ
              </label>
              <div className="flex bg-[#F1F2F6] p-1 rounded-xl border border-[#E0E0E0] text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAuthMethod('google')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMethod === 'google' ? 'bg-white text-[#2D3436] shadow-2xs' : 'text-[#636E72]'
                  }`}
                >
                  🌐 Google
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('otp')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMethod === 'otp' ? 'bg-white text-[#2D3436] shadow-2xs' : 'text-[#636E72]'
                  }`}
                >
                  📱 เบอร์โทร OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    authMethod === 'email' ? 'bg-white text-[#2D3436] shadow-2xs' : 'text-[#636E72]'
                  }`}
                >
                  ✉️ สร้างบัญชีใหม่
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 flex items-center gap-2">
                <span className="font-bold">!</span> {errorMsg}
              </div>
            )}

            {/* Method A: Google OAuth */}
            {authMethod === 'google' && (
              <div className="space-y-4 text-center py-2">
                <p className="text-[11px] text-[#636E72]">
                  ลงชื่อเข้าใช้รวดเร็วและปลอดภัยด้วยบัญชี Google ของคุณ ({selectedRole === 'student' ? 'นักเรียน' : selectedRole === 'creator' ? 'ครูผู้ลงสื่อ' : 'ผู้พัฒนาเว็บ'})
                </p>

                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-[#2D3436] font-bold py-3.5 px-4 rounded-xl border-2 border-[#E0E0E0] shadow-2xs flex items-center justify-center gap-3 text-sm transition-all active:scale-98"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  {isLoading ? 'กำลังเชื่อมต่อ Google OAuth...' : `เข้าสู่ระบบด้วย Google (${selectedRole})`}
                </button>
              </div>
            )}

            {/* Method B: OTP Phone */}
            {authMethod === 'otp' && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D3436] mb-1.5">
                        เบอร์โทรศัพท์มือถือ
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="08X-XXX-XXXX"
                          className="w-full pl-10 pr-4 py-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436] font-medium focus:ring-2 focus:ring-[#C2E114] outline-none"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-bold py-3 rounded-xl shadow-2xs flex items-center justify-center gap-2 text-xs transition-all"
                    >
                      ขอรหัส OTP เข้าสู่ระบบ <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-sm font-bold text-[#2D3436]">กรอกรหัส OTP 6 หลัก</h3>
                      <p className="text-xs text-[#636E72] mt-1">ส่งรหัสไปยังหมายเลข {phone}</p>
                    </div>

                    <div className="flex justify-center gap-2">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newOtp = [...otpCode];
                            newOtp[idx] = e.target.value[0] || '';
                            setOtpCode(newOtp);
                          }}
                          className="w-9 h-11 text-center text-lg font-bold bg-[#F8F9FA] border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#C2E114] outline-none text-[#2D3436]"
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={isLoading}
                      className="w-full bg-[#2D3436] hover:bg-[#8A9914] text-white font-bold py-3 rounded-xl text-xs transition-all"
                    >
                      {isLoading ? 'กำลังยืนยัน...' : 'ยืนยันรหัส OTP และเริ่มใช้งาน'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Method C: Web Email & Password Registration */}
            {authMethod === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1">ชื่อ-นามสกุล หรือชื่อช่องครีเอเตอร์ *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={selectedRole === 'creator' ? 'เช่น ครูพี่อาร์ต สอนคณิต' : 'เช่น ด.ช. กิตติศักดิ์ ใจดี'}
                    className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1">อีเมลของคุณ *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@eduthai.org"
                    className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1">รหัสผ่าน *</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436]"
                  />
                </div>

                {selectedRole === 'student' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-[#2D3436] mb-1">โรงเรียน</label>
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="เช่น โรงเรียนสวนกุหลาบ"
                        className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D3436] mb-1">ระดับชั้น</label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                      >
                        <option value="ม.1">ม.1</option>
                        <option value="ม.2">ม.2</option>
                        <option value="ม.3">ม.3</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold py-3 rounded-xl text-xs shadow-2xs transition-all mt-2"
                >
                  {isLoading ? 'กำลังลงทะเบียน...' : `สร้างบัญชี${selectedRole === 'student' ? 'นักเรียน' : selectedRole === 'creator' ? 'ครีเอเตอร์' : 'ผู้พัฒนา'}`}
                </button>
              </form>
            )}

            {/* Quick Demo Login Switcher */}
            <div className="pt-4 border-t border-[#F1F2F6] text-center space-y-2">
              <span className="text-[11px] text-[#636E72] font-semibold flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#8A9914]" /> ทดสอบสิทธิ์การใช้งานแบบรวดเร็ว (Demo Quick Login)
              </span>
              <div className="flex justify-center gap-2 text-xs">
                <button
                  onClick={() => onLoginSuccess({ name: 'ด.ช. กิตติศักดิ์', phone: '081-111-1111', email: 'student@demo.com', role: 'student', school: 'โรงเรียนชุมชนบ้านดอน', grade: 'ม.2' })}
                  className="px-2.5 py-1.5 bg-[#F1F2F6] hover:bg-gray-200 text-[#2D3436] rounded-xl font-bold text-[11px] leading-tight text-center"
                >
                  🎓 ทดสอบ <br />
                  เป็นนักเรียน
                </button>
                <button
                  onClick={() => onLoginSuccess({ name: 'ครูพี่เป้ (Creator)', phone: '081-222-2222', email: 'teacher@demo.com', role: 'creator', school: 'โรงเรียนไกลกังวล', grade: 'ม.2' })}
                  className="px-2.5 py-1.5 bg-[#C2E114]/20 hover:bg-[#C2E114]/40 text-[#2D3436] rounded-xl font-bold text-[11px] leading-tight text-center"
                >
                  🎨 ทดสอบ <br />
                  เป็นครีเอเตอร์
                </button>
                <button
                  onClick={() => onLoginSuccess({ name: 'ผู้ดูแลระบบ (Admin)', phone: '081-333-3333', email: 'admin@demo.com', role: 'admin', school: 'EduThai Dev Team', grade: 'ม.3' })}
                  className="px-2.5 py-1.5 bg-[#2D3436] hover:bg-black text-white rounded-xl font-bold text-[11px] leading-tight text-center"
                >
                  🛠️ ทดสอบ <br />
                  เป็นผู้พัฒนา
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
