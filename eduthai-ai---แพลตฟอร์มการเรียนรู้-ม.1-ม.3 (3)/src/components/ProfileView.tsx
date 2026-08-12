import React, { useState } from 'react';
import { UserProfile, GradeLevel, Badge, DecorItem } from '../types';
import { DECOR_AVATARS, DECOR_FRAMES, DECOR_EFFECTS } from '../data/decorShopData';
import { User, Edit3, Save, ShoppingBag, Coins, Crown, Flame, Trophy, Award, CheckCircle2, Sparkles, ShieldCheck, Phone, Mail, School, GraduationCap, ArrowLeftRight, Camera, X, RefreshCw, Calculator, Code, FlaskConical, Bot } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  badges: Badge[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigateShop: () => void;
  onNavigateTopUp: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  badges,
  onUpdateProfile,
  onNavigateShop,
  onNavigateTopUp
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username || 'krupape_official',
    description: user.description || 'ครูผู้หลงใหลในเทคโนโลยี และการพัฒนาสื่อการเรียนรู้ EdTech สู่เด็กไทย',
    gender: user.gender || 'ชาย',
    dateOfBirth: user.dateOfBirth || '15/08/1998',
    phone: user.phone,
    email: user.email || '',
    school: user.school,
    grade: user.grade,
    age: user.age,
    avatar: user.avatar,
    strengths: user.strengths.join(', '),
    interests: user.interests.join(', ')
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active Equipped Items
  const equippedFrame = DECOR_FRAMES.find(f => f.id === user.equippedFrameId) || DECOR_FRAMES[0];
  const equippedEffect = DECOR_EFFECTS.find(e => e.id === user.equippedEffectId) || DECOR_EFFECTS[0];

  // Owned Lists
  const ownedAvatars = DECOR_AVATARS.filter(a => a.price === 0 || (user.ownedAvatars && user.ownedAvatars.includes(a.id)));
  const ownedFrames = DECOR_FRAMES.filter(f => f.price === 0 || (user.ownedFrameIds && user.ownedFrameIds.includes(f.id)));
  const ownedEffects = DECOR_EFFECTS.filter(e => e.price === 0 || (user.ownedEffectIds && user.ownedEffectIds.includes(e.id)));

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: formData.name,
      username: formData.username,
      description: formData.description,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      phone: formData.phone,
      email: formData.email,
      school: formData.school,
      grade: formData.grade as GradeLevel,
      age: Number(formData.age) || 14,
      avatar: formData.avatar,
      strengths: formData.strengths.split(',').map(s => s.trim()).filter(Boolean),
      interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean)
    });

    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSelectAvatar = (item: DecorItem) => {
    if (item.avatarUrl) {
      onUpdateProfile({ avatar: item.avatarUrl });
    }
  };

  const handleSelectFrame = (item: DecorItem) => {
    onUpdateProfile({ equippedFrameId: item.id });
  };

  const handleSelectEffect = (item: DecorItem) => {
    onUpdateProfile({ equippedEffectId: item.id });
  };

  // Helper to render badge icons nicely without showing raw 'fa-' strings
  const renderBadgeIcon = (iconStr: string) => {
    if (!iconStr) return <Award className="w-8 h-8 mx-auto text-amber-500" />;
    
    if (iconStr === 'fa-calculator') return <Calculator className="w-8 h-8 mx-auto text-amber-600" />;
    if (iconStr === 'fa-fire') return <Flame className="w-8 h-8 mx-auto text-orange-500" />;
    if (iconStr === 'fa-code') return <Code className="w-8 h-8 mx-auto text-blue-600" />;
    if (iconStr === 'fa-flask') return <FlaskConical className="w-8 h-8 mx-auto text-purple-600" />;
    if (iconStr.includes('fa-') || iconStr.includes('fa[')) return <Bot className="w-8 h-8 mx-auto text-lime-600" />;

    return <span className="text-3xl leading-none inline-block">{iconStr}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#2D3436] via-[#3d4548] to-[#2D3436] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Avatar Preview */}
            <div className="relative shrink-0">
              <div className={`p-1.5 rounded-full ${equippedEffect.effectClass}`}>
                <div className={`p-1.5 rounded-full ${equippedFrame.frameBorderClass}`}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#2D3436] object-cover shadow-2xl"
                  />
                </div>
              </div>

              {equippedFrame.frameBadge && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#2D3436] text-[#C2E114] text-[10px] font-black px-3 py-0.5 rounded-full whitespace-nowrap shadow-md">
                  {equippedFrame.frameBadge}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#C2E114] text-[#2D3436] font-black text-xs px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> ระดับชั้น {user.grade} • {user.school}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">{user.name}</h1>
              <p className="text-xs text-gray-300">
                สิทธิ์บัญชี: <span className="font-bold text-[#C2E114] uppercase">{user.role}</span> | {user.email || user.phone}
              </p>
              
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 flex-wrap">
                <span className="bg-white/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 fill-amber-400" /> {user.coins} Coins
                </span>
                <span className="bg-white/10 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" /> สตรีค {user.streakDays} วัน
                </span>
                <span className="bg-white/10 text-[#C2E114] text-xs font-bold px-3 py-1 rounded-full border border-[#C2E114]/30">
                  Level {user.level} ({user.exp} EXP)
                </span>
                {user.subscriptionPass?.isActive && (
                  <div className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-2xl border border-emerald-500/40 flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{user.subscriptionPass.planName}</span>
                    </div>
                    <div className="text-[10px] text-emerald-200/90 font-medium">
                      (ใช้งานได้ถึง {user.subscriptionPass.expiresAt})
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateShop}
              className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center gap-2 transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4" /> ร้านค้าของตกแต่ง
            </button>
            <button
              onClick={onNavigateTopUp}
              className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-4 py-3 rounded-2xl text-xs flex items-center gap-2 transition-all border border-white/20"
            >
              <Coins className="w-4 h-4 text-amber-400" /> เติมเหรียญ
            </button>
          </div>

        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> บันทึกการเปลี่ยนแปลงข้อมูลโปรไฟล์เรียบร้อยแล้ว!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Customization Picker */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-[#2D3436] text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8A9914]" /> ตกแต่งรูป & กรอบโปรไฟล์
              </h3>
              <button
                onClick={onNavigateShop}
                className="text-[11px] font-bold text-[#8A9914] hover:underline"
              >
                + ซื้อเพิ่ม
              </button>
            </div>

            {/* Avatar Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">
                1. เลือกรูปโปรไฟล์ ({ownedAvatars.length} รูปที่มี)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ownedAvatars.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectAvatar(item)}
                    className={`p-1 rounded-2xl border-2 transition-all relative ${
                      user.avatar === item.avatarUrl
                        ? 'border-[#C2E114] bg-[#C2E114]/20 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={item.avatarUrl} className="w-12 h-12 rounded-xl mx-auto bg-[#2D3436]" />
                    {item.price === 0 ? (
                      <span className="text-[9px] font-bold text-gray-500 block text-center mt-1">ธรรมดา</span>
                    ) : (
                      <span className="text-[9px] font-bold text-[#8A9914] block text-center mt-1">ซื้อแล้ว</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Picker */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700 block">
                2. เลือกกรอบโปรไฟล์ ({ownedFrames.length} แบบ)
              </label>
              <div className="space-y-2">
                {ownedFrames.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectFrame(item)}
                    className={`w-full p-2.5 rounded-2xl border-2 text-left text-xs font-bold flex items-center justify-between transition-all ${
                      user.equippedFrameId === item.id
                        ? 'border-[#C2E114] bg-[#C2E114]/10 text-[#2D3436]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    {user.equippedFrameId === item.id && <CheckCircle2 className="w-4 h-4 text-[#8A9914]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Effect Picker */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700 block">
                3. เลือกเอฟเฟกต์/ออร่า ({ownedEffects.length} แบบ)
              </label>
              <div className="space-y-2">
                {ownedEffects.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectEffect(item)}
                    className={`w-full p-2.5 rounded-2xl border-2 text-left text-xs font-bold flex items-center justify-between transition-all ${
                      user.equippedEffectId === item.id
                        ? 'border-[#C2E114] bg-[#C2E114]/10 text-[#2D3436]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    {user.equippedEffectId === item.id && <CheckCircle2 className="w-4 h-4 text-[#8A9914]" />}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Profile Card matching mockup design & Badges */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PROFILE CARD - Matches Wireframe / Mockup exactly */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-6">
            
            <div className="text-center font-serif text-gray-400 font-bold tracking-widest text-xs uppercase border-b border-gray-100 pb-3">
              PROFILE
            </div>

            <div className="max-w-md mx-auto space-y-6 font-serif">
              
              <div className="text-center text-2xl font-bold text-gray-900 tracking-tight">
                Profile
              </div>

              {/* Centered Avatar with Swap Icon Overlay */}
              <div className="relative w-32 h-32 mx-auto">
                <div className={`p-1 rounded-full ${equippedEffect.effectClass}`}>
                  <div className={`p-1 rounded-full ${equippedFrame.frameBorderClass}`}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-28 h-28 rounded-full object-cover bg-gray-200 shadow-sm border border-gray-300"
                    />
                  </div>
                </div>

                {/* Swap / Change Avatar Button on bottom right of circle */}
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="absolute bottom-1 right-1 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full border border-gray-400 shadow-md transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                  title="เปลี่ยนรูปโปรไฟล์ / แก้ไขข้อมูล"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* Name underneath Avatar */}
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 tracking-wide font-serif">{user.name}</h2>
              </div>

              {/* Profile Fields List */}
              <div className="space-y-3 text-sm text-gray-800 pt-3 border-t border-gray-200">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-gray-800 shrink-0">user name :</span>
                  <span className="text-gray-900 font-medium text-right font-sans">{user.username || '....'}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-gray-800 shrink-0">Description :</span>
                  <span className="text-gray-900 font-medium text-right font-sans max-w-xs">{user.description || '...'}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-gray-800 shrink-0">Gender :</span>
                  <span className="text-gray-900 font-medium text-right font-sans">{user.gender || '...'}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-gray-800 shrink-0">Date of birth :</span>
                  <span className="text-gray-900 font-medium text-right font-sans">{user.dateOfBirth || 'DD/MM/YY'}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-gray-800 shrink-0">Phone :</span>
                  <span className="text-gray-900 font-medium text-right font-sans">{user.phone || '..'}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="font-semibold text-gray-800 shrink-0">Email :</span>
                  <span className="text-gray-900 font-medium text-right font-sans">{user.email || '......'}</span>
                </div>

                <div className="flex items-start justify-between gap-4 pt-2 border-t border-gray-100">
                  <span className="font-semibold text-gray-800 shrink-0">School :</span>
                  <span className="text-gray-900 font-medium text-right font-sans">{user.school} ({user.grade})</span>
                </div>
              </div>

              {/* Edit Button at bottom right */}
              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-serif font-bold px-7 py-2 rounded-full text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  Edit
                </button>
              </div>

            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-black text-[#2D3436] text-base flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> ตราสัญลักษณ์เกียรติยศ (Badges)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border-2 text-center space-y-2 transition-all ${
                    b.isUnlocked
                      ? 'bg-amber-50/60 border-amber-200'
                      : 'bg-gray-50 border-gray-200 opacity-50 grayscale'
                  }`}
                >
                  <div className="text-3xl flex items-center justify-center min-h-[40px]">{renderBadgeIcon(b.icon)}</div>
                  <div>
                    <h4 className="font-extrabold text-[#2D3436] text-xs">{b.title}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{b.description}</p>
                  </div>
                  {b.isUnlocked && (
                    <span className="inline-block bg-amber-400 text-[#2D3436] text-[9px] font-black px-2 py-0.5 rounded-full">
                      ปลดล็อกแล้ว
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 border border-gray-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-black text-xl text-[#2D3436] flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#8A9914]" /> แก้ไขข้อมูลโปรไฟล์ (Edit Profile)
                </h3>
                <p className="text-xs text-gray-500">อัปเดตข้อมูลส่วนตัว รูปโปรไฟล์ และรายละเอียดสำหรับการเรียน</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-5 text-xs">
              
              {/* Avatar Selector in Edit Modal */}
              <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <label className="font-bold text-gray-800 block text-xs">รูปโปรไฟล์ (Avatar)</label>
                <div className="flex items-center gap-4">
                  <img
                    src={formData.avatar}
                    alt="Current Avatar"
                    className="w-16 h-16 rounded-full object-cover bg-white border-2 border-[#C2E114] shadow-sm shrink-0"
                  />
                  <div className="space-y-2 flex-1">
                    <input
                      type="text"
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      placeholder="ใส่ URL รูปภาพโปรไฟล์หรือเลือกด้านล่าง"
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-mono text-[11px] bg-white"
                    />
                    <p className="text-[10px] text-gray-500">เลือกรูปจากคลังที่มีอยู่ หรือวาง Image URL รูปของคุณเองได้</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-gray-600 block mb-1.5">เลือกจากคลังรูปอวตารของคุณ:</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {ownedAvatars.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: item.avatarUrl || formData.avatar })}
                        className={`p-1 rounded-xl border-2 shrink-0 transition-all ${
                          formData.avatar === item.avatarUrl
                            ? 'border-[#C2E114] bg-[#C2E114]/20 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={item.avatarUrl} className="w-10 h-10 rounded-lg bg-[#2D3436]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 mb-1 block">ชื่อ - นามสกุล (Name)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 mb-1 block">ชื่อผู้ใช้ (user name)</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-gray-700 mb-1 block">คำอธิบายตัวเอง (Description)</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="เขียนคำอธิบายสั้นๆ เกี่ยวกับตัวคุณ..."
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 mb-1 block">เพศ (Gender)</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  >
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                    <option value="ไม่ระบุ">ไม่ระบุ</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 mb-1 block">วันเกิด (Date of birth)</label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 mb-1 block">เบอร์โทรศัพท์ (Phone)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 mb-1 block">อีเมล (Email)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 mb-1 block">โรงเรียน (School)</label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 mb-1 block">ระดับชั้น (Grade)</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value as GradeLevel })}
                    className="w-full p-3 rounded-2xl border border-gray-300 font-semibold focus:ring-2 focus:ring-[#C2E114]"
                  >
                    <option value="ม.1">ม.1</option>
                    <option value="ม.2">ม.2</option>
                    <option value="ม.3">ม.3</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold px-5 py-2.5 rounded-2xl transition-all"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-black px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" /> บันทึกการเปลี่ยนแปลง
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
