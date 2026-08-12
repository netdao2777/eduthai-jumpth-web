import React, { useState } from 'react';
import { UserProfile, CreatorContent, WithdrawalRequest, AdminTicket, SubjectType, GradeLevel } from '../types';
import { MOCK_CREATOR_CONTENTS, MOCK_WITHDRAWALS } from '../mockData';
import { BarChart3, Video, PlusCircle, Clock, Wallet, HelpCircle, Sparkles, CheckCircle2, AlertCircle, XCircle, TrendingUp, Users, Play, Award, DollarSign, Building2, Send, ChevronRight } from 'lucide-react';

interface CreatorStudioViewProps {
  user: UserProfile;
  onRequestWithdrawal?: (coins: number) => void;
  onSendAdminTicket?: (subject: string, message: string) => void;
}

export const CreatorStudioView: React.FC<CreatorStudioViewProps> = ({
  user,
  onRequestWithdrawal,
  onSendAdminTicket
}) => {
  // Active Sub-Tab: 'dashboard' | 'upload' | 'status' | 'withdrawal' | 'contact'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload' | 'status' | 'withdrawal' | 'contact'>('dashboard');

  // Creator Content State
  const [contents, setContents] = useState<CreatorContent[]>(MOCK_CREATOR_CONTENTS);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'course' | 'game' | 'video'>('course');
  const [subject, setSubject] = useState<SubjectType>('คณิตศาสตร์');
  const [grade, setGrade] = useState<GradeLevel>('ม.2');
  const [priceCoins, setPriceCoins] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  // Withdrawal Form State
  const [withdrawCoins, setWithdrawCoins] = useState<number>(user.coins || 5000);
  const [bankName, setBankName] = useState('ธนาคารกสิกรไทย (KBank)');
  const [accountNumber, setAccountNumber] = useState('123-4-56789-0');
  const [accountName, setAccountName] = useState(user.name || 'ครูผู้ลงสื่อ');
  const [withdrawalsHistory, setWithdrawalsHistory] = useState<WithdrawalRequest[]>(MOCK_WITHDRAWALS);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState('');

  // Contact Admin Form State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSentMsg, setTicketSentMsg] = useState('');
  const [userTickets, setUserTickets] = useState<AdminTicket[]>([
    {
      id: 'tk-101',
      senderName: user.name,
      senderRole: 'creator',
      senderEmailOrPhone: user.email || user.phone,
      subject: 'สอบถามระยะเวลาพิจารณาอนุมัติคอร์สใหม่',
      message: 'สวัสดีครับ ผมได้ส่งคอร์ส "ตะลุยโจทย์พีทาโกรัส" เข้ามารอตรวจสอบ ไม่ทราบว่าปกติใช้เวลาอนุมัติกี่วันครับ?',
      status: 'resolved',
      createdDate: '11 ส.ค. 2026',
      reply: 'ทีมงานแอดมินใช้เวลาตรวจสอบสื่อการสอนประมาณ 24-48 ชั่วโมงทำการครับ ขออภัยในความล่าช้า'
    }
  ]);

  // Handle New Content Upload
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newContent: CreatorContent = {
      id: `cc-${Date.now()}`,
      title,
      type,
      subject,
      grade,
      priceCoins,
      status: 'pending',
      adminNote: 'รอแอดมินตรวจสอบความถูกต้องของเนื้อหา',
      views: 0,
      studentsEnrolled: 0,
      rating: 5.0,
      createdDate: 'วันนี้',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      creatorName: user.name
    };

    setContents([newContent, ...contents]);
    setUploadSuccessMsg('ส่งสื่อเข้าสู่ระบบเรียบร้อยแล้ว! สถานะปัจจุบัน: รอการตรวจสอบจากแอดมิน');
    
    // Reset Form
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setPriceCoins(0);

    setTimeout(() => {
      setUploadSuccessMsg('');
      setActiveTab('status');
    }, 1800);
  };

  // Handle Withdrawal Submission
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawCoins < 500) {
      alert('จำนวนเหรียญขั้นต่ำในการถอนคือ 500 เหรียญ (50 บาท)');
      return;
    }

    const thbAmount = Math.floor(withdrawCoins / 10); // 10 coins = 1 THB
    const commissionThb = Math.floor(thbAmount * 0.10); // 10% platform fee
    const netThb = thbAmount - commissionThb;

    const newReq: WithdrawalRequest = {
      id: `wd-${Date.now()}`,
      coinsAmount: withdrawCoins,
      thbAmount,
      commissionThb,
      netThb,
      bankName,
      accountNumber,
      accountName,
      status: 'pending',
      requestedDate: 'วันนี้'
    };

    setWithdrawalsHistory([newReq, ...withdrawalsHistory]);
    setWithdrawalSuccess(`ส่งคำขอถอนเงิน ${withdrawCoins.toLocaleString()} เหรียญ (${netThb.toLocaleString()} บาท) เรียบร้อยแล้ว!`);

    if (onRequestWithdrawal) {
      onRequestWithdrawal(withdrawCoins);
    }

    setTimeout(() => setWithdrawalSuccess(''), 3000);
  };

  // Handle Support Ticket Submit
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    const newTicket: AdminTicket = {
      id: `tk-${Date.now()}`,
      senderName: user.name,
      senderRole: 'creator',
      senderEmailOrPhone: user.email || user.phone,
      subject: ticketSubject,
      message: ticketMessage,
      status: 'open',
      createdDate: 'วันนี้'
    };

    setUserTickets([newTicket, ...userTickets]);
    setTicketSentMsg('ส่งข้อความสอบถามถึงแอดมินเรียบร้อยแล้ว ทีมงานจะตอบกลับโดยเร็วที่สุด');

    if (onSendAdminTicket) {
      onSendAdminTicket(ticketSubject, ticketMessage);
    }

    setTicketSubject('');
    setTicketMessage('');

    setTimeout(() => setTicketSentMsg(''), 3000);
  };

  // Dashboard Stats Calculations
  const totalViews = contents.reduce((sum, c) => sum + c.views, 0);
  const totalStudents = contents.reduce((sum, c) => sum + c.studentsEnrolled, 0);
  const totalCoinsEarned = 18500; // Simulated earnings
  const totalThbValue = Math.floor(totalCoinsEarned / 10);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4">
      
      {/* Creator Studio Hero Banner */}
      <section className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-xs px-3.5 py-1 rounded-full">
              <Sparkles className="w-4 h-4" /> Creator Studio & Media Management Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ศูนย์รวมการจัดการสื่อการสอน & ครีเอเตอร์ ({user.name})
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              สร้างคอร์สเรียน อัปโหลดวิดีโอ สร้างควิซมินิเกม ติดตามความนิยม และถอนรายได้เหรียญเข้าบัญชีธนาคารของคุณได้สะดวกในที่เดียว
            </p>
          </div>

          <button
            onClick={() => setActiveTab('upload')}
            className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> สร้างและส่งสื่อใหม่
          </button>
        </div>
      </section>

      {/* Easy-to-Click Sub-Header Navigation Bar (Thin Horizontal Strip) */}
      <div className="sticky top-16 z-20 bg-[#EEF8A0] border border-[#D5E871] shadow-xs p-1.5 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg font-extrabold text-[11px] sm:text-sm whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer active:scale-95 ${
              activeTab === 'dashboard'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            ภาพรวมระบบ
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg font-extrabold text-[11px] sm:text-sm whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer active:scale-95 ${
              activeTab === 'upload'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            อัปโหลดสื่อ/สร้างเกม
          </button>

          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1.5 rounded-lg font-extrabold text-[11px] sm:text-sm whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer active:scale-95 ${
              activeTab === 'status'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            ติดตามสถานะ ({contents.filter(c => c.status === 'pending').length})
          </button>

          <button
            onClick={() => setActiveTab('withdrawal')}
            className={`px-3 py-1.5 rounded-lg font-extrabold text-[11px] sm:text-sm whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer active:scale-95 ${
              activeTab === 'withdrawal'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            ถอนเงินสะสม ({totalThbValue.toLocaleString()} บาท)
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 rounded-lg font-extrabold text-[11px] sm:text-sm whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer active:scale-95 ${
              activeTab === 'contact'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            ติดต่อแอดมิน
          </button>
        </div>
      </div>

      {/* Tab 1: Dashboard & Analytics */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Key Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>สื่อที่เผยแพร่แล้ว</span>
                <Video className="w-4 h-4 text-[#8A9914]" />
              </div>
              <div className="text-2xl font-black text-[#2D3436]">
                {contents.length} สื่อ
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +2 รายการในเดือนนี้
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>ยอดเข้าชมทั้งหมด (Views)</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black text-[#2D3436]">
                {totalViews.toLocaleString()} ครั้ง
              </div>
              <p className="text-[11px] text-blue-600 font-semibold">
                จากนักเรียนทั่วประเทศ ม.1 - ม.3
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>ยอดผู้เรียนลงทะเบียน</span>
                <Award className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-[#2D3436]">
                {totalStudents.toLocaleString()} คน
              </div>
              <p className="text-[11px] text-purple-600 font-semibold">
                อัตราเรียนจบสูงถึง 78%
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>เหรียญสะสม (Coins Earned)</span>
                <DollarSign className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-[#2D3436]">
                {totalCoinsEarned.toLocaleString()} 🪙
              </div>
              <p className="text-[11px] text-amber-600 font-extrabold">
                ประมาณ ≈ {totalThbValue.toLocaleString()} บาท
              </p>
            </div>
          </div>

          {/* Deep Analytics Visual Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Weekly Views Graph - Line Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#2D3436] text-sm">สถิติการรับชมสื่อรายวัน (Analytics)</h3>
                  <p className="text-xs text-[#636E72]">จำนวนครั้งที่นักเรียนเข้าชมสื่อของคุณใน 7 วันที่ผ่านมา</p>
                </div>
                <span className="text-[10px] font-bold bg-[#F1F2F6] px-2.5 py-0.5 rounded-full text-[#2D3436]">
                  สัปดาห์นี้
                </span>
              </div>

              {/* Line Chart with Points */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-[11px] font-semibold text-[#636E72] px-1">
                  <span>y = จำนวนครั้งที่มีการเข้าเรียน (ครั้ง)</span>
                  <span>x = วัน</span>
                </div>

                <div className="relative w-full h-52 bg-[#FAFAFA] rounded-xl p-3 border border-[#F1F2F6] flex flex-col justify-between">
                  {/* Grid Lines */}
                  <div className="absolute inset-x-3 top-6 border-b border-gray-200 border-dashed flex justify-between text-[9px] text-gray-400">
                    <span>3,000</span>
                  </div>
                  <div className="absolute inset-x-3 top-20 border-b border-gray-200 border-dashed flex justify-between text-[9px] text-gray-400">
                    <span>2,000</span>
                  </div>
                  <div className="absolute inset-x-3 top-34 border-b border-gray-200 border-dashed flex justify-between text-[9px] text-gray-400">
                    <span>1,000</span>
                  </div>

                  {/* SVG Line and Points */}
                  <div className="relative w-full h-40">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C2E114" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#C2E114" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Gradient Fill under Line */}
                      <path
                        d="M 50,118 L 150,86.5 L 250,97 L 350,58.5 L 450,41 L 550,69 L 650,51.5 L 650,155 L 50,155 Z"
                        fill="url(#chartGradient)"
                      />

                      {/* Connecting Line */}
                      <path
                        d="M 50,118 L 150,86.5 L 250,97 L 350,58.5 L 450,41 L 550,69 L 650,51.5"
                        fill="none"
                        stroke="#8A9914"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Data Points */}
                      {[
                        { x: 50, y: 118, views: '1,200', day: 'จ.' },
                        { x: 150, y: 86.5, views: '2,100', day: 'อ.' },
                        { x: 250, y: 97, views: '1,800', day: 'พ.' },
                        { x: 350, y: 58.5, views: '2,900', day: 'พฤ.' },
                        { x: 450, y: 41, views: '3,400', day: 'ศ.' },
                        { x: 550, y: 69, views: '2,600', day: 'ส.' },
                        { x: 650, y: 51.5, views: '3,100', day: 'อา.' },
                      ].map((pt, idx) => (
                        <g key={idx} className="group cursor-pointer">
                          {/* Circle Dot */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="6"
                            fill="#C2E114"
                            stroke="#2D3436"
                            strokeWidth="2.5"
                            className="transition-transform group-hover:scale-150"
                          />
                          {/* Value Text Above Point */}
                          <text
                            x={pt.x}
                            y={pt.y - 12}
                            textAnchor="middle"
                            className="fill-[#2D3436] text-[11px] font-extrabold"
                          >
                            {pt.views}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* X-Axis Labels */}
                  <div className="flex justify-between px-2 text-xs font-bold text-[#2D3436] border-t border-[#E0E0E0] pt-1">
                    {['จ. (จันทร์)', 'อ. (อังคาร)', 'พ. (พุธ)', 'พฤ. (พฤหัส)', 'ศ. (ศุกร์)', 'ส. (เสาร์)', 'อา. (อาทิตย์)'].map((day, idx) => (
                      <span key={idx} className="text-center min-w-[30px]">{day.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#636E72]">
                <span>ช่วงเวลาที่นักเรียนเรียนเยอะที่สุด: <strong>18:00 - 21:00 น.</strong></span>
                <span className="text-emerald-600 font-bold">↑ เพิ่มขึ้น 18% จากสัปดาห์ก่อน</span>
              </div>
            </div>

            {/* Content Category Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-4">
              <h3 className="font-bold text-[#2D3436] text-sm">กลุ่มวิชาที่ผลิตสื่อ</h3>
              <p className="text-xs text-[#636E72]">สัดส่วนสื่อการสอนแยกตามวิชา</p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>คณิตศาสตร์</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-[#F1F2F6] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C2E114] h-full w-[65%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>วิทยาศาสตร์</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-[#F1F2F6] h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[25%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>เทคโนโลยี/Coding</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full bg-[#F1F2F6] h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[10%]" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E0E0E0] text-xs text-[#636E72]">
                💡 <strong>คำแนะนำจาก AI:</strong> วิชาภาษาอังกฤษ ม.3 กำลังเป็นที่ต้องการสูง ลองสร้างมินิเกมทายศัพท์เพิ่มเติมเพื่อเพิ่มผู้เรียน!
              </div>
            </div>

          </div>

          {/* Published Content Quick Table */}
          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-[#2D3436] text-sm">สื่อการสอนที่เผยแพร่แล้วทั้งหมด</h3>
            <div className="divide-y divide-[#F1F2F6]">
              {contents.map(item => (
                <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-12 rounded-lg object-cover shrink-0 bg-[#2D3436]" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#2D3436]">{item.title}</h4>
                      <p className="text-[11px] text-[#636E72]">{item.subject} • {item.grade} • สร้างเมื่อ {item.createdDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="text-[#636E72]">{item.views.toLocaleString()} Views</span>
                    <span className="text-amber-600">{item.priceCoins === 0 ? 'เรียนฟรี' : `${item.priceCoins} Coins`}</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                      อนุมัติแล้ว
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Upload Content Form */}
      {activeTab === 'upload' && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#2D3436]">ส่งสื่อการสอน หรือมินิเกมใหม่เพื่อรอตรวจสอบ</h2>
            <p className="text-xs text-[#636E72]">เมื่อส่งสื่อแล้ว ทีมงานแอดมินจะตรวจสอบคุณภาพและอนุมัติขึ้นระบบภายใน 24 ชั่วโมง</p>
          </div>

          {uploadSuccessMsg && (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {uploadSuccessMsg}
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-[#2D3436] font-bold mb-1">ชื่อสื่อการสอน / มินิเกม *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="เช่น ตะลุยโจทย์สมการ ม.2 เข้มข้นเตรียมสอบ"
                className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[#2D3436] font-bold mb-1">ประเภทสื่อ</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                >
                  <option value="course">วิดีโอคอร์สเรียน</option>
                  <option value="game">มินิเกม / ควิซ</option>
                  <option value="video">คลิปติวสั้น</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2D3436] font-bold mb-1">กลุ่มวิชา</label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value as SubjectType)}
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                >
                  <option value="คณิตศาสตร์">คณิตศาสตร์</option>
                  <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
                  <option value="เทคโนโลยี/Coding">เทคโนโลยี/Coding</option>
                  <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
                  <option value="ภาษาไทย">ภาษาไทย</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2D3436] font-bold mb-1">ระดับชั้น</label>
                <select
                  value={grade}
                  onChange={e => setGrade(e.target.value as GradeLevel)}
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                >
                  <option value="ม.1">ม.1</option>
                  <option value="ม.2">ม.2</option>
                  <option value="ม.3">ม.3</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#2D3436] font-bold mb-1">กำหนดราคาการเข้าเรียน (เหรียญ Coins) *</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  value={priceCoins}
                  onChange={e => setPriceCoins(Number(e.target.value))}
                  className="p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs font-bold w-36"
                />
                <span className="text-xs text-[#636E72]">
                  {priceCoins === 0 ? '✨ เปิดให้นักเรียนเรียนฟรี' : `🪙 คิดค่าเรียน ${priceCoins} เหรียญ (ได้รับ ≈ ${(priceCoins * 0.9 / 10).toFixed(1)} บาท/คน)`}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[#2D3436] font-bold mb-1">ลิงก์วิดีโอ หรือลิงก์ไฟล์สื่อ (YouTube / Drive / MP4)</label>
              <input
                type="url"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-[#2D3436] font-bold mb-1">รายละเอียดและวัตถุประสงค์การเรียนรู้ *</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="อธิบายสรุปเนื้อหา สิ่งที่ผู้เรียนจะได้รับ และคำแนะนำ..."
                className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold py-3.5 rounded-xl text-xs shadow-xs transition-colors"
            >
              ส่งสื่อการสอนเข้าสู่ขั้นตอนอนุมัติ 🚀
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Content Approval Status Tracking */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D3436]">ติดตามสถานะการตรวจสอบสื่อ ({contents.length} รายการ)</h2>
            <span className="text-xs text-[#636E72]">อัปเดตสถานะแบบเรียลไทม์จากแอดมิน</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {contents.map(item => {
              const isApproved = item.status === 'approved';
              const isPending = item.status === 'pending';
              const isRejected = item.status === 'rejected';

              return (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img src={item.thumbnail} alt={item.title} className="w-20 h-16 rounded-xl object-cover shrink-0 bg-[#2D3436]" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#2D3436]">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F1F2F6] text-[#2D3436]">
                          {item.type === 'course' ? 'คอร์สเรียน' : 'มินิเกม'}
                        </span>
                      </div>
                      <p className="text-xs text-[#636E72]">{item.subject} • {item.grade} • ยอดวิว {item.views.toLocaleString()} ครั้ง</p>
                      
                      {item.adminNote && (
                        <p className="text-xs text-[#8A9914] font-medium bg-[#F8F9FA] p-2 rounded-lg border border-[#E0E0E0]">
                          💬 <strong>หมายเหตุแอดมิน:</strong> {item.adminNote}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isApproved && (
                      <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> อนุมัติแล้ว (ออนไลน์)
                      </span>
                    )}

                    {isPending && (
                      <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1 animate-pulse">
                        <Clock className="w-4 h-4 text-amber-600" /> รอการตรวจสอบ
                      </span>
                    )}

                    {isRejected && (
                      <span className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-rose-600" /> ต้องแก้ไข
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Withdrawal & Payout System */}
      {activeTab === 'withdrawal' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Withdrawal Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-5">
            <div>
              <h3 className="font-bold text-[#2D3436] text-base">ระบบถอนเงินสะสม</h3>
              <p className="text-xs text-[#636E72]">อัตราแลกเปลี่ยน: 10 เหรียญ Coins = 1 บาท (หักค่าธรรมเนียมแพลตฟอร์ม 10%)</p>
            </div>

            <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E0E0E0] space-y-1">
              <div className="text-xs text-[#636E72] font-semibold">ยอดเหรียญสะสมที่คุณมี</div>
              <div className="text-2xl font-black text-[#2D3436]">{user.coins?.toLocaleString() || 18500} Coins</div>
              <div className="text-xs text-[#8A9914] font-extrabold">มูลค่ารวม ≈ {Math.floor((user.coins || 18500) / 10).toLocaleString()} บาท</div>
            </div>

            {withdrawalSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                {withdrawalSuccess}
              </div>
            )}

            <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-[#2D3436] font-bold mb-1">ระบุจำนวนเหรียญที่ต้องการถอน *</label>
                <input
                  type="number"
                  step={100}
                  min={500}
                  max={user.coins || 18500}
                  value={withdrawCoins}
                  onChange={e => setWithdrawCoins(Number(e.target.value))}
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs font-bold text-[#2D3436]"
                />
              </div>

              {/* Fee breakdown box */}
              <div className="p-3 bg-[#F1F2F6] rounded-xl space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#636E72]">เงินที่ได้ก่อนหัก:</span>
                  <span className="font-bold text-[#2D3436]">{(withdrawCoins / 10).toLocaleString()} บาท</span>
                </div>
                <div className="flex justify-between text-rose-600">
                  <span>ค่าคอมมิชชันแพลตฟอร์ม (10%):</span>
                  <span>-{(withdrawCoins / 10 * 0.10).toLocaleString()} บาท</span>
                </div>
                <div className="border-t border-[#E0E0E0] pt-1 flex justify-between font-extrabold text-[#2D3436]">
                  <span>ยอดเงินสุทธิที่จะได้รับ:</span>
                  <span className="text-emerald-600">{(withdrawCoins / 10 * 0.90).toLocaleString()} บาท</span>
                </div>
              </div>

              <div>
                <label className="block text-[#2D3436] font-bold mb-1">เลือกธนาคาร / พร้อมเพย์</label>
                <select
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                >
                  <option value="ธนาคารกสิกรไทย (KBank)">ธนาคารกสิกรไทย (KBank)</option>
                  <option value="ธนาคารไทยพาณิชย์ (SCB)">ธนาคารไทยพาณิชย์ (SCB)</option>
                  <option value="ธนาคารกรุงเทพ (BBL)">ธนาคารกรุงเทพ (BBL)</option>
                  <option value="ธนาคารกรุงไทย (KTB)">ธนาคารกรุงไทย (KTB)</option>
                  <option value="พร้อมเพย์ (PromptPay)">พร้อมเพย์ (PromptPay)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#2D3436] font-bold mb-1">เลขที่บัญชี / เบอร์พร้อมเพย์ *</label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[#2D3436] font-bold mb-1">ชื่อบัญชีรับเงิน *</label>
                <input
                  type="text"
                  required
                  value={accountName}
                  onChange={e => setAccountName(e.target.value)}
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold py-3.5 rounded-xl text-xs shadow-xs transition-colors"
              >
                ยืนยันการขอถอนเงิน 💸
              </button>
            </form>
          </div>

          {/* Right: Payout Request History */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-4">
            <h3 className="font-bold text-[#2D3436] text-base">ประวัติการถอนเงินทั้งหมด</h3>
            <div className="divide-y divide-[#F1F2F6]">
              {withdrawalsHistory.map(req => (
                <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#2D3436]">{req.coinsAmount.toLocaleString()} Coins</span>
                      <span className="text-xs text-[#636E72]">({req.bankName})</span>
                    </div>
                    <p className="text-xs text-[#636E72]">
                      เลขบัญชี: {req.accountNumber} ({req.accountName}) • เมื่อ {req.requestedDate}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-extrabold text-sm text-emerald-600">+{req.netThb.toLocaleString()} บาท</div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status === 'completed' ? 'โอนเงินสำเร็จ' : 'กำลังดำเนินการโอน'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 5: Contact Admin */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Send Ticket Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-5">
            <div>
              <h3 className="font-bold text-[#2D3436] text-base">ส่งข้อความติดต่อผู้ดูแลระบบ (Admin Support)</h3>
              <p className="text-xs text-[#636E72]">แจ้งปัญหาการใช้งาน สอบถามสถานะอนุมัติสื่อ หรือเสนอแนะฟีเจอร์เพิ่มเติม</p>
            </div>

            {ticketSentMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                {ticketSentMsg}
              </div>
            )}

            <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-[#2D3436] font-bold mb-1">หัวข้อเรื่อง *</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={e => setTicketSubject(e.target.value)}
                  placeholder="เช่น สอบถามสถานะการอนุมัติคอร์สใหม่"
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs text-[#2D3436]"
                />
              </div>

              <div>
                <label className="block text-[#2D3436] font-bold mb-1">รายละเอียดข้อความ *</label>
                <textarea
                  rows={5}
                  required
                  value={ticketMessage}
                  onChange={e => setTicketMessage(e.target.value)}
                  placeholder="อธิบายรายละเอียดของคุณที่นี่..."
                  className="w-full p-3 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D3436] hover:bg-[#8A9914] text-white font-extrabold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4 text-[#C2E114]" /> ส่งข้อความหาแอดมิน
              </button>
            </form>
          </div>

          {/* Ticket Inbox History */}
          <div className="bg-white p-6 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-4">
            <h3 className="font-bold text-[#2D3436] text-base">ประวัติข้อความที่คุณส่งหาแอดมิน</h3>
            <div className="divide-y divide-[#F1F2F6]">
              {userTickets.map(tk => (
                <div key={tk.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#2D3436]">{tk.subject}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      tk.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tk.status === 'resolved' ? 'ตอบกลับแล้ว' : 'รอดำเนินการ'}
                    </span>
                  </div>
                  <p className="text-xs text-[#636E72]">{tk.message}</p>
                  
                  {tk.reply && (
                    <div className="p-3 bg-[#F1F2F6] rounded-xl border border-[#E0E0E0] text-xs text-[#2D3436] space-y-1">
                      <div className="font-bold text-[#8A9914] flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> คำตอบจากแอดมิน:
                      </div>
                      <p className="text-[#636E72]">{tk.reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
