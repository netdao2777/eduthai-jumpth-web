import React, { useState } from 'react';
import { UserProfile, CreatorContent, BankAccountInfo, MonthlyPayoutRecord, AdminTicket, SubjectType, GradeLevel } from '../types';
import { MOCK_CREATOR_CONTENTS, MOCK_CREATOR_BANK_ACCOUNT, MOCK_MONTHLY_PAYOUTS } from '../mockData';
import { BarChart3, Video, PlusCircle, Clock, Wallet, HelpCircle, Sparkles, CheckCircle2, AlertCircle, XCircle, TrendingUp, Users, Play, Award, DollarSign, Building2, Send, ChevronRight, Calendar, CreditCard, Percent, ShieldCheck, Edit3, Save, Check, Coins, Heart, BookOpen, Info, Receipt, ArrowDownRight, RefreshCw, Zap } from 'lucide-react';

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
  // Active Sub-Tab: 'dashboard' | 'upload' | 'status' | 'payout' | 'contact'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload' | 'status' | 'payout' | 'contact'>('dashboard');

  // Creator Content State
  const [contents, setContents] = useState<CreatorContent[]>(MOCK_CREATOR_CONTENTS);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'course' | 'game' | 'video'>('course');
  const [subject, setSubject] = useState<SubjectType>('คณิตศาสตร์');
  const [grade, setGrade] = useState<GradeLevel>('ม.2');
  const [priceCoins, setPriceCoins] = useState<number>(0);
  const [isBuffetIncluded, setIsBuffetIncluded] = useState<boolean>(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  // Bank Account Binding State
  const [bankAccount, setBankAccount] = useState<BankAccountInfo>(MOCK_CREATOR_BANK_ACCOUNT);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [editBankName, setEditBankName] = useState(MOCK_CREATOR_BANK_ACCOUNT.bankName);
  const [editAccountNumber, setEditAccountNumber] = useState(MOCK_CREATOR_BANK_ACCOUNT.accountNumber);
  const [editAccountName, setEditAccountName] = useState(MOCK_CREATOR_BANK_ACCOUNT.accountName);
  const [editBranchName, setEditBranchName] = useState(MOCK_CREATOR_BANK_ACCOUNT.branchName || '');
  const [bankSuccessMsg, setBankSuccessMsg] = useState('');

  // Monthly Revenue Breakdown & Calculations (Sample real data + simulation)
  const [courseRevenue, setCourseRevenue] = useState<number>(10000); // 10,000 บาท ตามตัวอย่างโจทย์
  const [donationRevenue, setDonationRevenue] = useState<number>(150); // 150 บาท ตามตัวอย่างโจทย์
  const [monthlyPayouts, setMonthlyPayouts] = useState<MonthlyPayoutRecord[]>(MOCK_MONTHLY_PAYOUTS);

  // Financial Calculations:
  // 1) Total Gross = Course Revenue + Donation Revenue
  const totalGrossRevenue = courseRevenue + donationRevenue; // e.g. 10,000 + 150 = 10,150 บาท
  // 2) Platform Commission = 4% of total gross
  const commissionRate = 0.04;
  const commissionFee = Math.round(totalGrossRevenue * commissionRate * 100) / 100; // e.g. 406.00 บาท
  // 3) Platform Maintenance Fee = 2% of total gross
  const maintenanceRate = 0.02;
  const maintenanceFee = Math.round(totalGrossRevenue * maintenanceRate * 100) / 100; // e.g. 203.00 บาท
  // 4) Total Deductions (6%) = 4% + 2%
  const totalDeductions = Math.round((commissionFee + maintenanceFee) * 100) / 100; // e.g. 609.00 บาท
  // 5) Estimated Net Payout on the 1st of month
  const netEstimatedPayout = Math.round((totalGrossRevenue - totalDeductions) * 100) / 100; // e.g. 9,541.00 บาท

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

  // Handle Save Bank Account
  const handleSaveBankAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editAccountNumber.trim() || !editAccountName.trim()) return;

    const updated: BankAccountInfo = {
      bankName: editBankName,
      accountNumber: editAccountNumber.trim(),
      accountName: editAccountName.trim(),
      branchName: editBranchName.trim() || undefined,
      isVerified: true,
      updatedAt: 'วันนี้'
    };

    setBankAccount(updated);
    setIsEditingBank(false);
    setBankSuccessMsg('บันทึกและผูกบัญชีธนาคารสำเร็จ! ระบบจะโอนเงินรายได้อัตโนมัติเข้าบัญชีนี้ทุกวันที่ 1 ของทุกเดือน');
    setTimeout(() => setBankSuccessMsg(''), 4000);
  };

  // Handle Toggle Buffet Campaign for a content
  const handleToggleBuffetCampaign = (contentId: string) => {
    setContents(prev =>
      prev.map(item => {
        if (item.id === contentId) {
          const nextVal = !item.isBuffetIncluded;
          return { ...item, isBuffetIncluded: nextVal };
        }
        return item;
      })
    );
  };

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
      isBuffetIncluded,
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
    setIsBuffetIncluded(true);

    setTimeout(() => {
      setUploadSuccessMsg('');
      setActiveTab('status');
    }, 1800);
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
  const totalCoinsEarned = user.coins || 1850; // Use creator actual coins
  const totalThbValue = totalCoinsEarned; // 1 Coin = 1 Baht standard

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
            onClick={() => setActiveTab('payout')}
            className={`px-3 py-1.5 rounded-lg font-extrabold text-[11px] sm:text-sm whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer active:scale-95 ${
              activeTab === 'payout'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            รายได้ & รับเงินอัตโนมัติ (วันที่ 1)
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

            <div 
              onClick={() => setActiveTab('payout')}
              className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2 hover:border-[#8A9914] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>ประมาณการโอนรอบวันที่ 1</span>
                <DollarSign className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-black text-emerald-700">
                {netEstimatedPayout.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} บาท
              </div>
              <p className="text-[11px] text-emerald-600 font-extrabold flex items-center justify-between">
                <span>หัก 6% (คอมมิชชั่น 4% + บำรุง 2%)</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-700 transition-colors" />
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

            {/* Buffet Campaign Participation Checkbox Card */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isBuffetIncluded}
                  onChange={e => setIsBuffetIncluded(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-blue-600 rounded focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <div>
                  <div className="font-extrabold text-[#2D3436] text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>ยินยอมให้คอร์สนี้เข้าร่วม "แคมเปญบุฟเฟ่ต์เรียนไม่อั้น (Buffet Campaign)"</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                    ผู้ใช้งานที่สมัครแพ็กเกจเรียนไม่อั้น (Unlimited / Premium) จะสามารถเข้าเรียนคอร์สนี้ได้ทันที โดยคุณครูจะได้รับส่วนแบ่งรายได้จากกองทุนสมาชิกบุฟเฟ่ต์ประจำเดือนตามชั่วโมงการรับชมจริง และรับเงินโอนอัตโนมัติทุกวันที่ 1
                  </p>
                </div>
              </label>
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
                      
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {item.isBuffetIncluded ? (
                          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200">
                            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>ร่วมแคมเปญบุฟเฟ่ต์เรียนไม่อั้น</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gray-200">
                            <span>คอร์สเดี่ยว (ไม่อยู่ในบุฟเฟ่ต์)</span>
                          </span>
                        )}

                        <button
                          onClick={() => handleToggleBuffetCampaign(item.id)}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                        >
                          {item.isBuffetIncluded ? 'ถอนตัวจากบุฟเฟ่ต์' : 'เข้าร่วมแคมเปญบุฟเฟ่ต์'}
                        </button>
                      </div>
                      
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

      {/* Tab 4: Automatic Monthly Payout & Bank Account Binding */}
      {activeTab === 'payout' && (
        <div className="space-y-6">
          
          {/* Top Hero: Automatic Monthly Payout Info Banner */}
          <div className="bg-gradient-to-br from-[#2D3436] via-[#3a4447] to-[#2D3436] text-white p-6 sm:p-7 rounded-3xl border border-gray-800 shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#2D3436] font-extrabold text-[11px] px-3.5 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5" /> โอนจ่ายอัตโนมัติต้นเดือน • ทุกวันที่ 1
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  ระบบโอนรายได้อัตโนมัติประจำเดือน (Auto Monthly Payout)
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                  ครีเอเตอร์และคุณครูผู้สอน<strong>ไม่ต้องกดทำรายการถอนเงินเอง</strong> ระบบจะสรุปรวมรายได้จากยอดซื้อคอร์สเรียนและยอดเงินโดเนททั้งหมดในแต่ละเดือน นำไปหักค่าคอมมิชชั่น 4% และค่าบำรุงแพลตฟอร์ม 2% (รวมหัก 6%) จากนั้นโอนเข้าบัญชีธนาคารของคุณโดยตรงในวันที่ 1 ของทุกเดือน
                </p>
              </div>

              {/* Next Payout Highlight Box */}
              <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-right shrink-0 space-y-1 min-w-[240px]">
                <div className="text-[11px] text-gray-300 font-bold flex items-center justify-end gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C2E114]" /> รอบโอนเงินอัตโนมัติถัดไป
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#C2E114]">
                  01 กันยายน 2026
                </div>
                <div className="text-xs text-gray-200">
                  ประมาณการสุทธิ: <strong className="text-white text-sm font-black">{netEstimatedPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Toast Message */}
          {bankSuccessMsg && (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{bankSuccessMsg}</span>
            </div>
          )}

          {/* Grid Layout: Left = Bank Account Binding, Right = Transparent Monthly Revenue Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column (5 Cols): Bank Account Binding & Management */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Linked Bank Card */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft-card space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#2D3436] text-[#C2E114] flex items-center justify-center font-black text-lg shadow-xs">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-[#2D3436]">บัญชีธนาคารที่ผูกกับระบบ</h3>
                      <p className="text-[11px] text-gray-500">สำหรับรับเงินโอนอัตโนมัติในวันที่ 1</p>
                    </div>
                  </div>

                  {!isEditingBank && (
                    <button
                      onClick={() => {
                        setIsEditingBank(true);
                        setEditBankName(bankAccount.bankName);
                        setEditAccountNumber(bankAccount.accountNumber);
                        setEditAccountName(bankAccount.accountName);
                        setEditBranchName(bankAccount.branchName || '');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#8A9914] hover:text-[#2D3436] bg-[#EEF8A0] hover:bg-[#D5E871] px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> แก้ไขข้อมูล
                    </button>
                  )}
                </div>

                {!isEditingBank ? (
                  <div className="space-y-4">
                    {/* Visual Bank Passbook Card */}
                    <div className="bg-gradient-to-br from-[#1E272C] to-[#2D3436] text-white p-5 rounded-2xl border border-gray-700 shadow-inner relative overflow-hidden space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-[#C2E114] uppercase tracking-wider flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5" /> Direct Deposit Account
                        </span>
                        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> ผูกบัญชีเรียบร้อย
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs text-gray-400 font-medium">ธนาคาร / ช่องทาง</div>
                        <div className="text-base font-extrabold text-white">{bankAccount.bankName}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-gray-700/60">
                        <div>
                          <div className="text-[10px] text-gray-400 font-medium">เลขที่บัญชี / พร้อมเพย์</div>
                          <div className="text-sm font-mono font-extrabold text-[#C2E114] tracking-wider">
                            {bankAccount.accountNumber}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400 font-medium">ชื่อเจ้าของบัญชี</div>
                          <div className="text-xs font-extrabold text-white truncate">
                            {bankAccount.accountName}
                          </div>
                        </div>
                      </div>

                      {bankAccount.branchName && (
                        <div className="text-[10px] text-gray-400">
                          สาขา: {bankAccount.branchName}
                        </div>
                      )}
                    </div>

                    <div className="p-3.5 bg-[#F8F9FA] rounded-2xl border border-gray-100 space-y-1.5 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5 font-bold text-[#2D3436]">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        ความปลอดภัยของข้อมูลบัญชี
                      </div>
                      <p className="text-[11px] leading-relaxed text-gray-500">
                        ข้อมูลบัญชีธนาคารของคุณได้รับการเข้ารหัสอย่างปลอดภัย ระบบจะใช้ข้อมูลนี้เพื่อดำเนินการโอนเงินเข้าบัญชีอัตโนมัติในวันที่ 1 ของทุกเดือนเท่านั้น
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Edit Bank Account Form */
                  <form onSubmit={handleSaveBankAccount} className="space-y-4 text-xs font-medium pt-1">
                    <div>
                      <label className="block text-[#2D3436] font-extrabold mb-1">เลือกธนาคาร / บริการพร้อมเพย์ *</label>
                      <select
                        value={editBankName}
                        onChange={e => setEditBankName(e.target.value)}
                        className="w-full p-3 bg-[#F8F9FA] border border-gray-300 rounded-xl text-xs font-bold text-[#2D3436] focus:outline-hidden focus:ring-2 focus:ring-[#8A9914]"
                      >
                        <option value="ธนาคารกสิกรไทย (KBank)">ธนาคารกสิกรไทย (KBank)</option>
                        <option value="ธนาคารไทยพาณิชย์ (SCB)">ธนาคารไทยพาณิชย์ (SCB)</option>
                        <option value="ธนาคารกรุงเทพ (BBL)">ธนาคารกรุงเทพ (BBL)</option>
                        <option value="ธนาคารกรุงไทย (KTB)">ธนาคารกรุงไทย (KTB)</option>
                        <option value="ธนาคารกรุงศรีอยุธยา (BAY)">ธนาคารกรุงศรีอยุธยา (BAY)</option>
                        <option value="ธนาคารทหารไทยธนชาต (ttb)">ธนาคารทหารไทยธนชาต (ttb)</option>
                        <option value="ธนาคารออมสิน (GSB)">ธนาคารออมสิน (GSB)</option>
                        <option value="ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (ธ.ก.ส.)">ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (ธ.ก.ส.)</option>
                        <option value="ธนาคารยูโอบี (UOB)">ธนาคารยูโอบี (UOB)</option>
                        <option value="พร้อมเพย์ (PromptPay)">พร้อมเพย์ (PromptPay - เบอร์มือถือ/บัตรประชาชน)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#2D3436] font-extrabold mb-1">เลขที่บัญชีธนาคาร หรือ หมายเลขพร้อมเพย์ *</label>
                      <input
                        type="text"
                        required
                        placeholder="เช่น 123-2-89472-1 หรือ 081-xxx-xxxx"
                        value={editAccountNumber}
                        onChange={e => setEditAccountNumber(e.target.value)}
                        className="w-full p-3 bg-[#F8F9FA] border border-gray-300 rounded-xl text-xs font-mono font-bold text-[#2D3436] focus:outline-hidden focus:ring-2 focus:ring-[#8A9914]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#2D3436] font-extrabold mb-1">ชื่อ-นามสกุล เจ้าของบัญชี (ตรงกับสมุดบัญชี) *</label>
                      <input
                        type="text"
                        required
                        placeholder="เช่น นายสมชาย ใจดี"
                        value={editAccountName}
                        onChange={e => setEditAccountName(e.target.value)}
                        className="w-full p-3 bg-[#F8F9FA] border border-gray-300 rounded-xl text-xs text-[#2D3436] focus:outline-hidden focus:ring-2 focus:ring-[#8A9914]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#2D3436] font-extrabold mb-1">สาขาธนาคาร (ถ้ามี)</label>
                      <input
                        type="text"
                        placeholder="เช่น สาขาสยามพารากอน (ระบุหรือไม่ระบุก็ได้)"
                        value={editBranchName}
                        onChange={e => setEditBranchName(e.target.value)}
                        className="w-full p-3 bg-[#F8F9FA] border border-gray-300 rounded-xl text-xs text-[#2D3436] focus:outline-hidden focus:ring-2 focus:ring-[#8A9914]"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingBank(false)}
                        className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-[#2D3436] hover:bg-black text-[#C2E114] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" /> บันทึกและผูกบัญชี
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Payout Policy Explanatory Note */}
              <div className="bg-amber-50/80 p-5 rounded-3xl border border-amber-200/80 space-y-2 text-xs text-amber-900">
                <div className="font-black text-amber-950 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0" />
                  เงื่อนไขและรอบการโอนเงินอัตโนมัติ
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-[11px] text-amber-800 leading-relaxed">
                  <li><strong>ตัดรอบรายได้:</strong> สิ้นสุด ณ เวลา 23:59 น. ของวันสุดท้ายในแต่ละเดือน</li>
                  <li><strong>โอนเงินอัตโนมัติ:</strong> วันที่ 1 ของเดือนถัดไป (หากตรงกับวันหยุดจะโอนในวันทำการถัดไป)</li>
                  <li><strong>การคำนวณ:</strong> นำรายได้จากยอดซื้อคอร์ส + ยอดโดเนท มารวมกัน แล้วหักค่าคอมมิชชั่น 4% และค่าบำรุงแพลตฟอร์ม 2% (รวมหัก 6%)</li>
                </ul>
              </div>

            </div>

            {/* Right Column (7 Cols): Transparent Revenue Breakdown & Fee Deductions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Detailed Breakdown Card */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-soft-card space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-black text-base text-[#2D3436] flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-[#8A9914]" />
                      การแจกแจงรายได้ & การหักค่าธรรมเนียม (รอบเดือนปัจจุบัน)
                    </h3>
                    <p className="text-xs text-gray-500">
                      แสดงรายการรายได้จากคอร์สเรียน โดเนท และการหักเปอร์เซ็นต์อย่างโปร่งใส
                    </p>
                  </div>

                  <span className="bg-[#EEF8A0] text-[#2D3436] text-[11px] font-black px-3 py-1 rounded-full shrink-0">
                    รอบ ส.ค. 2026
                  </span>
                </div>

                {/* Section 1: Income Sources */}
                <div className="space-y-3">
                  <div className="text-xs font-black uppercase text-gray-500 tracking-wider">
                    1. รายรับทั้งหมดของครีเอเตอร์ (Gross Revenue Sources)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Course Revenue Card */}
                    <div className="p-4 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 rounded-2xl border border-blue-100 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-blue-600" /> ค่าคอร์สเรียนที่นักเรียนซื้อ
                        </span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">ยอดขายคอร์ส</span>
                      </div>
                      <div className="text-xl font-black text-blue-950">
                        {courseRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                      </div>
                      <p className="text-[11px] text-blue-700">จากนักเรียนที่สมัครเรียนในเดือนนี้</p>
                    </div>

                    {/* Donation Revenue Card */}
                    <div className="p-4 bg-gradient-to-br from-rose-50/70 to-pink-50/40 rounded-2xl border border-rose-100 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                        <span className="flex items-center gap-1.5">
                          <Heart className="w-4 h-4 text-rose-600 fill-rose-600" /> ค่าโดเนท / สินน้ำใจ
                        </span>
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">ไม่บังคับ</span>
                      </div>
                      <div className="text-xl font-black text-rose-950">
                        {donationRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                      </div>
                      <p className="text-[11px] text-rose-700">จากนักเรียนส่งเหรียญให้กำลังใจผู้สอน</p>
                    </div>
                  </div>

                  {/* Combined Gross Total Box */}
                  <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-[#2D3436]">ยอดรวมรายได้ทั้งหมดก่อนหัก (Total Gross):</span>
                      <p className="text-[11px] text-gray-500">
                        ({courseRevenue.toLocaleString()} บาท + {donationRevenue.toLocaleString()} บาท)
                      </p>
                    </div>
                    <div className="text-lg font-black text-[#2D3436]">
                      {totalGrossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                    </div>
                  </div>
                </div>

                {/* Section 2: Deductions Breakdown (4% Commission + 2% Platform Maintenance) */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-black uppercase text-gray-500 tracking-wider">
                    2. รายการหักค่าธรรมเนียม & ค่าบำรุงแพลตฟอร์ม (รวมหัก 6%)
                  </div>

                  <div className="divide-y divide-gray-100 bg-gray-50/80 rounded-2xl border border-gray-200 p-4 space-y-3">
                    
                    {/* Item 1: Commission 4% */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="space-y-0.5">
                        <div className="font-extrabold text-xs text-[#2D3436] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          ค่าคอมมิชชั่นแพลตฟอร์ม (Platform Commission)
                          <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                            4%
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          คำนวณจากยอดรวม ({totalGrossRevenue.toLocaleString()} × 4%)
                        </p>
                      </div>
                      <div className="text-sm font-bold text-rose-600 text-right">
                        -{commissionFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                      </div>
                    </div>

                    {/* Item 2: Platform Maintenance 2% */}
                    <div className="flex items-center justify-between pt-3">
                      <div className="space-y-0.5">
                        <div className="font-extrabold text-xs text-[#2D3436] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          ค่าบำรุงและดูแลรักษาแพลตฟอร์ม (Platform Maintenance Fee)
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                            2%
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          คำนวณจากยอดรวม ({totalGrossRevenue.toLocaleString()} × 2%) เพื่อพัฒนาระบบเซิร์ฟเวอร์
                        </p>
                      </div>
                      <div className="text-sm font-bold text-amber-600 text-right">
                        -{maintenanceFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                      </div>
                    </div>

                    {/* Total Deductions Combined */}
                    <div className="flex items-center justify-between pt-3 text-xs font-black text-[#2D3436]">
                      <span>รวมรายการหักทั้งหมด (4% + 2% = 6%):</span>
                      <span className="text-rose-600">
                        -{totalDeductions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                      </span>
                    </div>

                  </div>
                </div>

                {/* Section 3: Net Estimated Auto-Payout on the 1st */}
                <div className="bg-gradient-to-r from-emerald-500 to-[#2D3436] text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-emerald-200 uppercase tracking-wide flex items-center gap-1">
                      <Check className="w-4 h-4 text-[#C2E114]" /> ยอดสุทธิที่จะโอนเข้าบัญชีอัตโนมัติในวันที่ 1
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#C2E114]">
                      {netEstimatedPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
                    </div>
                    <p className="text-[11px] text-gray-300">
                      คิดเป็น 94% ของรายได้ทั้งหมด โอนเข้า {bankAccount.bankName} ({bankAccount.accountNumber})
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 text-center sm:text-right shrink-0">
                    <span className="text-[10px] text-gray-300 block">กำหนดโอนรอบถัดไป</span>
                    <span className="text-sm font-extrabold text-white">01 กันยายน 2026</span>
                  </div>
                </div>

                {/* Interactive Revenue Simulation Tool */}
                <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-black text-[#2D3436]">
                      <RefreshCw className="w-3.5 h-3.5 text-[#8A9914]" />
                      เครื่องมือจำลองตัวเลขคำนวณรายได้ (Revenue Calculator)
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCourseRevenue(10000);
                        setDonationRevenue(150);
                      }}
                      className="text-[10px] font-bold text-gray-500 hover:text-black underline cursor-pointer"
                    >
                      รีเซ็ตเป็น 10,000 + 150 บ.
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-gray-600 font-bold mb-1">ทดลองใส่ยอดขายคอร์ส (บาท):</label>
                      <input
                        type="number"
                        step={100}
                        min={0}
                        value={courseRevenue}
                        onChange={e => setCourseRevenue(Math.max(0, Number(e.target.value)))}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-bold text-[#2D3436]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 font-bold mb-1">ทดลองใส่ยอดโดเนท (บาท):</label>
                      <input
                        type="number"
                        step={10}
                        min={0}
                        value={donationRevenue}
                        onChange={e => setDonationRevenue(Math.max(0, Number(e.target.value)))}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-bold text-[#2D3436]"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Historical Monthly Automatic Payouts Table */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-soft-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-black text-base text-[#2D3436] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#8A9914]" />
                  ประวัติรอบการโอนเงินอัตโนมัติย้อนหลัง (Payout History)
                </h3>
                <p className="text-xs text-gray-500">
                  บันทึกประวัติการโอนเงินเข้าบัญชีทุกวันที่ 1 ของแต่ละเดือน พร้อมสลิปและรหัสอ้างอิง
                </p>
              </div>

              <span className="text-xs text-gray-500 font-bold">
                ทั้งหมด {monthlyPayouts.length} รอบเดือน
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-extrabold text-[11px] uppercase">
                    <th className="py-3 px-3">รอบเดือน</th>
                    <th className="py-3 px-3">วันที่โอน</th>
                    <th className="py-3 px-3">ยอดคอร์ส</th>
                    <th className="py-3 px-3">ยอดโดเนท</th>
                    <th className="py-3 px-3">ยอดรวม</th>
                    <th className="py-3 px-3 text-rose-600">หักคอมมิชชั่น 4%</th>
                    <th className="py-3 px-3 text-amber-600">หักบำรุง 2%</th>
                    <th className="py-3 px-3 text-emerald-700">ยอดสุทธิที่ได้รับ</th>
                    <th className="py-3 px-3">บัญชีปลายทาง</th>
                    <th className="py-3 px-3 text-center">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {monthlyPayouts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-[#2D3436]">
                        {p.monthPeriod}
                      </td>
                      <td className="py-3.5 px-3 text-gray-600 font-mono">
                        {p.payoutDate}
                      </td>
                      <td className="py-3.5 px-3">
                        {p.courseRevenueThb.toLocaleString()} บ.
                      </td>
                      <td className="py-3.5 px-3">
                        {p.donationRevenueThb.toLocaleString()} บ.
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#2D3436]">
                        {p.totalGrossThb.toLocaleString()} บ.
                      </td>
                      <td className="py-3.5 px-3 text-rose-600 font-semibold">
                        -{p.commissionFeeThb.toLocaleString()} บ.
                      </td>
                      <td className="py-3.5 px-3 text-amber-600 font-semibold">
                        -{p.platformMaintenanceFeeThb.toLocaleString()} บ.
                      </td>
                      <td className="py-3.5 px-3 font-black text-emerald-700 text-sm">
                        +{p.netPayoutThb.toLocaleString()} บ.
                      </td>
                      <td className="py-3.5 px-3 text-[11px] text-gray-600">
                        {p.bankName.split(' ')[0]} ({p.accountNumber.slice(-5)})
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                          p.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900 animate-pulse'
                        }`}>
                          {p.status === 'completed' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> โอนสำเร็จ
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-600" /> รอโอนวันที่ 1
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
