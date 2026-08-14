import React, { useState } from 'react';
import { UserProfile, CreatorContent, AdminTicket } from '../types';
import { MOCK_CREATOR_CONTENTS, MOCK_ADMIN_TICKETS } from '../mockData';
import { ShieldAlert, CheckCircle2, XCircle, Clock, Users, Video, DollarSign, Send, Eye, MessageSquare, AlertTriangle, Sparkles, Filter, Search } from 'lucide-react';

interface AdminPortalViewProps {
  user: UserProfile;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({ user }) => {
  // Active Sub-Tab: 'dashboard' | 'approval' | 'support'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'approval' | 'support'>('dashboard');

  // Pending and Approved Contents Queue
  const [contents, setContents] = useState<CreatorContent[]>(MOCK_CREATOR_CONTENTS);

  // Admin Tickets Inbox
  const [tickets, setTickets] = useState<AdminTicket[]>(MOCK_ADMIN_TICKETS);

  // Modal Preview Content State
  const [selectedPreview, setSelectedPreview] = useState<CreatorContent | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Ticket Reply Input State
  const [replyTextMap, setReplyTextMap] = useState<{ [key: string]: string }>({});

  // Content Approval Action
  const handleApproveContent = (id: string) => {
    setContents(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'approved', adminNote: 'อนุมัติเรียบร้อยโดยแอดมิน' } : c))
    );
    setSelectedPreview(null);
    setAdminNoteInput('');
  };

  const handleRejectContent = (id: string) => {
    if (!adminNoteInput) {
      alert('กรุณาระบุข้อเสนอแนะหรือเหตุผลที่ให้แก้ไข');
      return;
    }
    setContents(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'rejected', adminNote: adminNoteInput } : c))
    );
    setSelectedPreview(null);
    setAdminNoteInput('');
  };

  // Reply to User Ticket
  const handleReplyTicket = (ticketId: string) => {
    const text = replyTextMap[ticketId];
    if (!text) return;

    setTickets(prev =>
      prev.map(tk => (tk.id === ticketId ? { ...tk, status: 'resolved', reply: text } : tk))
    );

    setReplyTextMap(prev => ({ ...prev, [ticketId]: '' }));
  };

  // Admin Overview Stats
  const totalStudents = 14850;
  const totalCreators = 142;
  const pendingCount = contents.filter(c => c.status === 'pending').length;
  const approvedCount = contents.filter(c => c.status === 'approved').length;

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4">
      
      {/* Admin Portal Banner */}
      <section className="bg-gradient-to-r from-[#1A1C1C] via-[#2D3131] to-[#1A1C1C] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#C2E114] text-[#1A1C1C] font-extrabold text-xs px-3.5 py-1 rounded-full">
              <ShieldAlert className="w-4 h-4" /> Admin & Developer Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ศูนย์ดูแลระบบ & อนุมัติสื่อการสอน (Admin Role)
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              ระบบตรวจสอบสื่อการสอน ควิซเกม บริหารจัดการผู้ใช้งาน ครีเอเตอร์ และตอบกลับข้อความขอความช่วยเหลือ
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Header Navigation Bar (Yellow-Lime Horizontal Bar) */}
      <div className="sticky top-16 z-20 bg-[#EEF8A0] border border-[#D5E871] shadow-xs p-1.5 rounded-xl backdrop-blur-md">
        <div className="grid grid-cols-3 gap-1 sm:gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full py-1.5 px-1 sm:px-4 rounded-lg font-extrabold text-[11px] sm:text-sm transition-all duration-150 cursor-pointer text-center truncate active:scale-95 ${
              activeTab === 'dashboard'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            ภาพรวมระบบ
          </button>

          <button
            onClick={() => setActiveTab('approval')}
            className={`w-full py-1.5 px-1 sm:px-4 rounded-lg font-extrabold text-[11px] sm:text-sm transition-all duration-150 cursor-pointer text-center truncate active:scale-95 ${
              activeTab === 'approval'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            อนุมัติสื่อ ({pendingCount})
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`w-full py-1.5 px-1 sm:px-4 rounded-lg font-extrabold text-[11px] sm:text-sm transition-all duration-150 cursor-pointer text-center truncate active:scale-95 ${
              activeTab === 'support'
                ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
            }`}
          >
            กล่องข้อความ ({tickets.filter(t => t.status === 'open').length})
          </button>
        </div>
      </div>

      {/* Tab 1: Admin Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>นักเรียนทั้งหมดในระบบ</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black text-[#2D3436]">{totalStudents.toLocaleString()} คน</div>
              <p className="text-[11px] text-emerald-600 font-semibold">ม.1 (35%) • ม.2 (42%) • ม.3 (23%)</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>ครีเอเตอร์ / ครูผู้ลงสื่อ</span>
                <Video className="w-4 h-4 text-[#8A9914]" />
              </div>
              <div className="text-2xl font-black text-[#2D3436]">{totalCreators} ท่าน</div>
              <p className="text-[11px] text-[#8A9914] font-semibold">สพฐ. (60%) • ติวเตอร์อิสระ (40%)</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>คอร์ส/เกมที่อนุมัติแล้ว</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-[#2D3436]">{approvedCount} รายการ</div>
              <p className="text-[11px] text-amber-600 font-semibold">รออนุมัติ {pendingCount} รายการ</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#636E72]">
                <span>รายได้แพลตฟอร์มรวม (Commissions)</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-[#2D3436]">฿ 42,800 บาท</div>
              <p className="text-[11px] text-emerald-600 font-semibold">จากค่าคอมมิชชัน 10%</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-[#2D3436] text-sm">บันทึกกิจกรรมล่าสุดของระบบ (System Audit Log)</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F8F9FA] rounded-xl flex items-center justify-between">
                <span>🟢 ครูพี่เป้ อัปโหลดคอร์ส "ตะลุยโจทย์พีทาโกรัส ม.2" เข้าสู่ระบบ</span>
                <span className="text-[#636E72]">10 นาทีที่แล้ว</span>
              </div>
              <div className="p-3 bg-[#F8F9FA] rounded-xl flex items-center justify-between">
                <span>💸 ดร.สมชาย ใจดี ส่งคำขอถอนเงิน 1,200 Coins (1,080 บาท)</span>
                <span className="text-[#636E72]">1 ชั่วโมงที่แล้ว</span>
              </div>
              <div className="p-3 bg-[#F8F9FA] rounded-xl flex items-center justify-between">
                <span>🎓 นักเรียน ด.ช. กิตติศักดิ์ ทำแบบทดสอบชุด "Math Speed Arena" ผ่าน 100%</span>
                <span className="text-[#636E72]">3 ชั่วโมงที่แล้ว</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Content Approval Queue */}
      {activeTab === 'approval' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D3436]">รายการสื่อการสอนและมินิเกมที่รออนุมัติ</h2>
            <span className="text-xs text-[#636E72]">ตรวจความถูกต้องและมาตรฐานก่อนให้ขึ้นระบบ</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {contents.map(item => (
              <div key={item.id} className="bg-white p-5 rounded-2xl border border-[#E0E0E0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img src={item.thumbnail} alt={item.title} className="w-20 h-16 rounded-xl object-cover shrink-0 bg-[#2D3436]" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#2D3436]">{item.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F1F2F6] text-[#2D3436]">
                        {item.type === 'course' ? 'วิดีโอคอร์ส' : 'มินิเกม'}
                      </span>
                    </div>
                    <p className="text-xs text-[#636E72]">
                      ครีเอเตอร์: <strong>{item.creatorName}</strong> • {item.subject} • {item.grade} • ส่งเมื่อ {item.createdDate}
                    </p>
                    <p className="text-xs text-[#8A9914] font-semibold">
                      ราคาเรียน: {item.priceCoins === 0 ? 'เรียนฟรี' : `${item.priceCoins} Coins`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => setSelectedPreview(item)}
                        className="px-3 py-2 bg-[#F1F2F6] hover:bg-[#E4E6EB] text-[#2D3436] font-bold text-xs rounded-xl flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4 text-[#636E72]" /> ตรวจสื่อ
                      </button>

                      <button
                        onClick={() => handleApproveContent(item.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4" /> อนุมัติทันที
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.status === 'approved' ? 'อนุมัติเรียบร้อย' : 'ส่งกลับแก้ไข'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Support Inbox & Reports */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D3436]">กล่องข้อความผู้ใช้และรายงานการใช้งาน ({tickets.length} ข้อความ)</h2>
            <span className="text-xs text-[#636E72]">ตอบกลับครีเอเตอร์และนักเรียน</span>
          </div>

          <div className="space-y-4">
            {tickets.map(tk => (
              <div key={tk.id} className="bg-white p-6 rounded-2xl border border-[#E0E0E0] shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#F1F2F6] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#2D3436]">{tk.subject}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C2E114]/20 text-[#2D3436]">
                      {tk.senderRole === 'creator' ? 'ครีเอเตอร์' : 'นักเรียน'} ({tk.senderName})
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    tk.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {tk.status === 'resolved' ? 'ตอบแล้ว' : 'ใหม่'}
                  </span>
                </div>

                <p className="text-xs text-[#636E72] leading-relaxed">{tk.message}</p>

                {tk.reply ? (
                  <div className="p-3 bg-[#F1F2F6] rounded-xl text-xs space-y-1">
                    <div className="font-bold text-[#8A9914]">💬 คำตอบแอดมิน:</div>
                    <p className="text-[#2D3436]">{tk.reply}</p>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="พิมพ์ข้อความตอบกลับ..."
                      value={replyTextMap[tk.id] || ''}
                      onChange={e => setReplyTextMap({ ...replyTextMap, [tk.id]: e.target.value })}
                      className="flex-1 p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                    />
                    <button
                      onClick={() => handleReplyTicket(tk.id)}
                      className="px-4 py-2.5 bg-[#2D3436] hover:bg-[#8A9914] text-white text-xs font-bold rounded-xl flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5 text-[#C2E114]" /> ตอบกลับ
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Preview & Revision Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E0E0E0]">
              <h3 className="font-bold text-[#2D3436] text-base">ตรวจสอบรายละเอียดสื่อ</h3>
              <button onClick={() => setSelectedPreview(null)} className="text-[#636E72] hover:text-[#2D3436]">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <img src={selectedPreview.thumbnail} alt={selectedPreview.title} className="w-full h-40 rounded-xl object-cover bg-[#2D3436]" />
              <h4 className="font-extrabold text-[#2D3436] text-sm">{selectedPreview.title}</h4>
              <p className="text-[#636E72]">ครีเอเตอร์: {selectedPreview.creatorName}</p>
              <p className="text-[#636E72]">หมวดวิชา: {selectedPreview.subject} • ระดับชั้น: {selectedPreview.grade}</p>

              <div>
                <label className="block text-[#2D3436] font-bold mb-1">หมายเหตุแอดมิน (ระบุข้อเสนอแนะกรณีส่งกลับแก้ไข)</label>
                <textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={e => setAdminNoteInput(e.target.value)}
                  placeholder="พิมพ์เหตุผลที่ให้แก้ไขเพิ่มเติม..."
                  className="w-full p-2.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E0E0E0]">
              <button
                onClick={() => handleRejectContent(selectedPreview.id)}
                className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <XCircle className="w-4 h-4 text-rose-600" /> ส่งกลับแก้ไข
              </button>
              <button
                onClick={() => handleApproveContent(selectedPreview.id)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl flex items-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" /> อนุมัติสื่อนี้
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
