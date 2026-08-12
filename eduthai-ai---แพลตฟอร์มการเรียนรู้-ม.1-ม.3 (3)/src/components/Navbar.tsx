import React, { useState } from 'react';
import { UserProfile } from '../types';
import { BookOpen, Trophy, Gamepad2, Video, Sparkles, User, LogOut, Menu, X, Flame, Shield, ChevronDown, PlusCircle, ShieldAlert, Info, Coins, ShoppingBag, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  user: UserProfile;
  onOpenLogin: () => void;
  onLogout: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  user,
  onOpenLogin,
  onLogout,
  cartCount = 0,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'discover', label: 'หน้าแรก', icon: Sparkles },
    { id: 'mycourses', label: 'คอร์สของฉัน', icon: BookOpen },
    { id: 'classroom', label: 'ห้องเรียนส่วนตัว', icon: Video },
    { id: 'games', label: 'มินิเกมท้าทาย', icon: Gamepad2 },
    { id: 'coinshop', label: 'เติมเหรียญ & แพ็กเกจ VIP', icon: Coins },
    { id: 'shop', label: 'ร้านค้าของตกแต่ง', icon: ShoppingBag },
    { id: 'creator', label: 'ศูนย์ครีเอเตอร์', icon: PlusCircle },
    { id: 'leaderboard', label: 'อันดับ & เกียรติยศ', icon: Trophy },
    { id: 'about', label: 'เกี่ยวกับเรา', icon: Info },
  ];

  const roleLabels = {
    student: 'นักเรียน',
    creator: 'ครู / ครีเอเตอร์',
    admin: 'ผู้ดูแลระบบ'
  };

  return (
    <header className="sticky top-0 z-40 bg-white text-[#2D3436] border-b border-[#E0E0E0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => onTabChange('discover')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 bg-[#C2E114] text-[#2D3436] rounded-lg flex items-center justify-center font-extrabold text-lg shadow-xs group-hover:scale-105 transition-transform">
            AI
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#8A9914]">EduThai</span>
              <span className="bg-[#C2E114] text-[#2D3436] text-[10px] font-bold px-2 py-0.5 rounded-full">
                ม.1 - ม.3
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1.5 py-5 text-xs xl:text-sm font-semibold transition-all relative shrink-0 ${
                  isActive
                    ? 'text-[#2D3436] font-bold'
                    : 'text-[#636E72] hover:text-[#2D3436]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#8A9914]' : 'text-[#636E72]'}`} />
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C2E114] rounded-t-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Header Controls (Cart + Auth/Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Shopping Cart Header Icon Button */}
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative bg-[#F1F2F6] hover:bg-[#C2E114]/30 p-2.5 rounded-full border border-[#E0E0E0] transition-all cursor-pointer group text-[#2D3436] hover:text-[#2D3436]"
              title="ตะกร้าสินค้า (Shopping Cart)"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform text-[#2D3436]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Desktop Auth / Profile Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 bg-[#F1F2F6] hover:bg-[#E4E6EB] px-3.5 py-1.5 rounded-full border border-[#E0E0E0] transition-all text-left"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full bg-[#C2E114] border border-[#C2E114] object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-[#2D3436] flex items-center gap-1">
                    {user.name}
                    <ChevronDown className="w-3.5 h-3.5 text-[#636E72]" />
                  </div>
                  <div className="text-[10px] text-[#8A9914] font-semibold">
                    สิทธิ์: {roleLabels[user.role || 'student']}
                  </div>
                </div>
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl py-2 border border-[#E0E0E0] text-[#2D3436] z-50">
                  <div className="px-4 py-2.5 border-b border-[#F1F2F6]">
                    <p className="text-xs font-bold text-[#2D3436]">{user.name}</p>
                    <p className="text-[11px] text-[#636E72]">{user.phone}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> สตรีค {user.streakDays} วัน • {user.coins} 🪙
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onTabChange('profile');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-[#F1F2F6] flex items-center gap-2 text-[#2D3436]"
                  >
                    <User className="w-4 h-4 text-[#8A9914]" /> โปรไฟล์ & แก้ไขข้อมูลส่วนตัว
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onTabChange('shop');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-[#F1F2F6] flex items-center gap-2 text-[#2D3436]"
                  >
                    <ShoppingBag className="w-4 h-4 text-purple-600" /> ร้านค้าของตกแต่งโปรไฟล์
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onTabChange('coinshop');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-[#F1F2F6] flex items-center gap-2 text-[#2D3436]"
                  >
                    <Coins className="w-4 h-4 text-amber-500" /> เติมเหรียญ & สมัคร EduPass VIP
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onTabChange('mycourses');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-[#F1F2F6] flex items-center gap-2 text-[#2D3436]"
                  >
                    <BookOpen className="w-4 h-4 text-[#636E72]" /> คอร์สเรียนที่ลงไว้
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onTabChange('creator');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-[#F1F2F6] flex items-center gap-2 text-[#2D3436]"
                  >
                    <PlusCircle className="w-4 h-4 text-[#8A9914]" /> Creator Studio (ลงสื่อ & ถอนเงิน)
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onTabChange('admin');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-[#F1F2F6] flex items-center gap-2 text-[#2D3436]"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-600" /> Developer / Admin Portal
                  </button>

                  <div className="border-t border-[#F1F2F6] my-1"></div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs transition-all flex items-center gap-2 transform active:scale-98"
            >
              <User className="w-4 h-4" /> เข้าสู่ระบบ / สมัครสมาชิก
            </button>
          )}
        </div>
      </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#636E72] hover:text-[#2D3436] bg-[#F1F2F6] rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E0E0E0] px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#F1F2F6] text-[#2D3436] font-bold border-l-4 border-[#C2E114]'
                      : 'text-[#636E72] hover:bg-[#F1F2F6]'
                  }`}
                >
                  <Icon className="w-5 h-5 text-[#8A9914]" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E0E0E0]">
            {user.isLoggedIn ? (
              <div className="flex items-center justify-between bg-[#F1F2F6] p-3 rounded-xl gap-2">
                <div 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onTabChange('profile');
                  }}
                  className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity flex-1 min-w-0"
                  title="คลิกเพื่อไปหน้าโปรไฟล์ & แก้ไขข้อมูล"
                >
                  <img src={user.avatar} className="w-9 h-9 rounded-full bg-[#C2E114] object-cover shrink-0 group-hover:scale-105 transition-transform" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#2D3436] truncate group-hover:text-[#8A9914] transition-colors">{user.name}</p>
                    <p className="text-[11px] text-[#8A9914] truncate">{roleLabels[user.role || 'student']} • {user.school}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-bold px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg shrink-0 transition-colors cursor-pointer"
                >
                  ออก
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full bg-[#C2E114] text-[#2D3436] font-bold py-3 rounded-xl text-sm text-center"
              >
                เข้าสู่ระบบ / สมัครสมาชิก
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
