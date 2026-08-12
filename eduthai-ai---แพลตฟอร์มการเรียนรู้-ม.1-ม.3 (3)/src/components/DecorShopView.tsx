import React, { useState } from 'react';
import { UserProfile, DecorItem } from '../types';
import { DECOR_AVATARS, DECOR_FRAMES, DECOR_EFFECTS } from '../data/decorShopData';
import { ShoppingBag, Coins, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Check, Flame, Award, Zap, ShoppingCart } from 'lucide-react';

interface DecorShopViewProps {
  user: UserProfile;
  onBuyItem: (item: DecorItem) => void;
  onEquipItem: (item: DecorItem) => void;
  onNavigateTopUp: () => void;
  onAddToCart?: (item: {
    itemId: string;
    type: 'decor';
    title: string;
    categoryName: string;
    price: number;
    currency: 'COINS';
    thumbnail?: string;
    originalItem: DecorItem;
  }) => void;
}

export const DecorShopView: React.FC<DecorShopViewProps> = ({
  user,
  onBuyItem,
  onEquipItem,
  onNavigateTopUp,
  onAddToCart
}) => {
  const [activeCategory, setActiveCategory] = useState<'avatar' | 'frame' | 'effect'>('avatar');

  // Find currently equipped items
  const currentAvatarUrl = user.avatar || DECOR_AVATARS[0].avatarUrl;
  const currentFrame = DECOR_FRAMES.find(f => f.id === user.equippedFrameId) || DECOR_FRAMES[0];
  const currentEffect = DECOR_EFFECTS.find(e => e.id === user.equippedEffectId) || DECOR_EFFECTS[0];

  const isItemOwned = (item: DecorItem) => {
    if (item.type === 'avatar') {
      return item.price === 0 || (user.ownedAvatars && user.ownedAvatars.includes(item.id));
    }
    if (item.type === 'frame') {
      return item.price === 0 || (user.ownedFrameIds && user.ownedFrameIds.includes(item.id));
    }
    if (item.type === 'effect') {
      return item.price === 0 || (user.ownedEffectIds && user.ownedEffectIds.includes(item.id));
    }
    return false;
  };

  const isItemEquipped = (item: DecorItem) => {
    if (item.type === 'avatar') {
      return user.avatar === item.avatarUrl;
    }
    if (item.type === 'frame') {
      return user.equippedFrameId === item.id;
    }
    if (item.type === 'effect') {
      return user.equippedEffectId === item.id;
    }
    return false;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2D3436] via-[#383E42] to-[#2D3436] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-gray-700">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#C2E114]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2.5 bg-[#C2E114] text-[#2D3436] font-extrabold text-xs px-4 py-2 rounded-2xl shadow-xs">
              <ShoppingBag className="w-4 h-4 shrink-0 text-[#2D3436]" />
              <div className="text-left leading-snug">
                <div>ร้านค้าของตกแต่งโปรไฟล์</div>
                <div className="text-[11px] font-bold text-[#2D3436]/75">(Decor Shop)</div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              แปลงโฉมโปรไฟล์ให้สวย เท่ ไม่เหมือนใคร!
            </h1>

            <p className="text-[11px] sm:text-xs text-gray-300/90 leading-relaxed font-normal">
              ใช้เหรียญที่คุณสะสมได้จากการทำภารกิจและเข้าเรียน
              <br />
              เพื่อแลกซื้อรูปอวตารสุดเท่ กรอบรูปเรืองแสง
              <br />
              และเอฟเฟกต์ออร่าสุดอลังการ
            </p>
          </div>

          {/* Live Preview Display Box */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 flex items-center gap-4 shrink-0 shadow-inner">
            <div className="relative">
              {/* Effect Layer */}
              <div className={`p-1 rounded-full ${currentEffect.effectClass}`}>
                {/* Frame Layer */}
                <div className={`p-1 rounded-full ${currentFrame.frameBorderClass}`}>
                  <img
                    src={currentAvatarUrl}
                    alt={user.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2D3436] object-cover"
                  />
                </div>
              </div>
              
              {currentFrame.frameBadge && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#2D3436] text-[#C2E114] text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                  {currentFrame.frameBadge}
                </span>
              )}
            </div>

            <div className="space-y-1 text-left">
              <div className="text-xs font-bold text-gray-300">ตัวอย่างโปรไฟล์ของคุณ</div>
              <div className="text-sm font-black text-white">{user.name}</div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-bold text-amber-400 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 fill-amber-400" /> {user.coins} Coins
                </span>
                <button
                  onClick={onNavigateTopUp}
                  className="bg-[#C2E114] text-[#2D3436] hover:bg-white text-[11px] font-black px-2.5 py-1 rounded-full transition-all"
                >
                  + เติมเหรียญ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Sub-Header Category Bar (Thin, horizontal strip, grid 3 cols) */}
      <div className="sticky top-16 z-20 bg-[#EEF8A0] border border-[#D5E871] shadow-xs p-1.5 rounded-xl backdrop-blur-md">
        <div className="grid grid-cols-3 gap-1 sm:gap-3">
          {[
            { id: 'avatar', title: 'รูปโปรไฟล์' },
            { id: 'frame', title: 'กรอบโปรไฟล์' },
            { id: 'effect', title: 'เอฟเฟกต์' }
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`w-full py-1.5 px-1 sm:px-4 rounded-lg font-extrabold text-[11px] sm:text-sm transition-all duration-150 cursor-pointer text-center truncate active:scale-95 ${
                  isActive
                    ? 'bg-[#2D3436] text-[#C2E114] shadow-2xs font-black'
                    : 'text-[#2D3436] hover:bg-white/60 hover:text-black font-bold'
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category 1: Avatars */}
      {activeCategory === 'avatar' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DECOR_AVATARS.map((item) => {
            const owned = isItemOwned(item);
            const equipped = isItemEquipped(item);
            const canAfford = user.coins >= item.price;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-5 border-2 transition-all relative flex flex-col justify-between space-y-4 hover:shadow-lg ${
                  equipped
                    ? 'border-[#C2E114] bg-[#C2E114]/5 ring-2 ring-[#C2E114]/20'
                    : 'border-gray-200'
                }`}
              >
                {item.tag && (
                  <span className="absolute top-3 right-3 bg-[#2D3436] text-[#C2E114] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                )}

                <div className="text-center space-y-3 pt-2">
                  <div className="w-24 h-24 rounded-full bg-[#2D3436] mx-auto p-1 border-2 border-gray-300 shadow-md">
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#2D3436] text-sm">{item.name}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 font-black text-xs text-amber-600">
                    {item.price === 0 ? (
                      <span className="text-emerald-600">ฟรี (เริ่มต้น)</span>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 fill-amber-400" />
                        <span>{item.price} เหรียญ</span>
                      </>
                    )}
                  </div>

                  {equipped ? (
                    <span className="bg-[#C2E114] text-[#2D3436] text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> สวมใส่อยู่
                    </span>
                  ) : owned ? (
                    <button
                      onClick={() => onEquipItem(item)}
                      className="bg-[#2D3436] hover:bg-black text-white text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition-all"
                    >
                      สวมใส่ไอเทมนี้
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart({
                            itemId: item.id,
                            type: 'decor',
                            title: item.name,
                            categoryName: 'รูปโปรไฟล์',
                            price: item.price,
                            currency: 'COINS',
                            thumbnail: item.avatarUrl,
                            originalItem: item
                          })}
                          className="bg-gray-100 hover:bg-gray-200 text-[#2D3436] text-xs font-extrabold p-2 rounded-xl transition-all cursor-pointer"
                          title="เพิ่มลงตะกร้า"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                      {canAfford ? (
                        <button
                          onClick={() => onBuyItem(item)}
                          className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all shadow-xs"
                        >
                          ซื้อเลย
                        </button>
                      ) : (
                        <button
                          onClick={onNavigateTopUp}
                          className="bg-gray-200 text-gray-600 text-[11px] font-bold px-2.5 py-1.5 rounded-xl hover:bg-gray-300"
                        >
                          เหรียญไม่พอ
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Category 2: Profile Frames */}
      {activeCategory === 'frame' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DECOR_FRAMES.map((item) => {
            const owned = isItemOwned(item);
            const equipped = isItemEquipped(item);
            const canAfford = user.coins >= item.price;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-6 border-2 transition-all relative flex flex-col justify-between space-y-4 hover:shadow-lg ${
                  equipped
                    ? 'border-[#C2E114] bg-[#C2E114]/5 ring-2 ring-[#C2E114]/20'
                    : 'border-gray-200'
                }`}
              >
                {item.tag && (
                  <span className="absolute top-3 right-3 bg-[#2D3436] text-[#C2E114] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                )}

                <div className="text-center space-y-3 pt-2">
                  <div className="relative inline-block">
                    <div className={`p-1 rounded-full ${item.frameBorderClass}`}>
                      <img
                        src={currentAvatarUrl}
                        alt={item.name}
                        className="w-20 h-20 rounded-full bg-[#2D3436] object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#2D3436] text-sm">{item.name}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 font-black text-xs text-amber-600">
                    {item.price === 0 ? (
                      <span className="text-emerald-600">ฟรี (ดั้งเดิม)</span>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 fill-amber-400" />
                        <span>{item.price} เหรียญ</span>
                      </>
                    )}
                  </div>

                  {equipped ? (
                    <span className="bg-[#C2E114] text-[#2D3436] text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> สวมใส่อยู่
                    </span>
                  ) : owned ? (
                    <button
                      onClick={() => onEquipItem(item)}
                      className="bg-[#2D3436] hover:bg-black text-white text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition-all"
                    >
                      สวมใส่กรอบนี้
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart({
                            itemId: item.id,
                            type: 'decor',
                            title: item.name,
                            categoryName: 'กรอบรูปโปรไฟล์',
                            price: item.price,
                            currency: 'COINS',
                            originalItem: item
                          })}
                          className="bg-gray-100 hover:bg-gray-200 text-[#2D3436] text-xs font-extrabold p-2 rounded-xl transition-all cursor-pointer"
                          title="เพิ่มลงตะกร้า"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                      {canAfford ? (
                        <button
                          onClick={() => onBuyItem(item)}
                          className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all shadow-xs"
                        >
                          ซื้อเลย
                        </button>
                      ) : (
                        <button
                          onClick={onNavigateTopUp}
                          className="bg-gray-200 text-gray-600 text-[11px] font-bold px-2.5 py-1.5 rounded-xl hover:bg-gray-300"
                        >
                          เหรียญไม่พอ
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Category 3: Profile Effects */}
      {activeCategory === 'effect' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DECOR_EFFECTS.map((item) => {
            const owned = isItemOwned(item);
            const equipped = isItemEquipped(item);
            const canAfford = user.coins >= item.price;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-6 border-2 transition-all relative flex flex-col justify-between space-y-4 hover:shadow-lg ${
                  equipped
                    ? 'border-[#C2E114] bg-[#C2E114]/5 ring-2 ring-[#C2E114]/20'
                    : 'border-gray-200'
                }`}
              >
                {item.tag && (
                  <span className="absolute top-3 right-3 bg-[#2D3436] text-[#C2E114] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                )}

                <div className="text-center space-y-3 pt-2">
                  <div className="relative inline-block">
                    <div className={`p-2 rounded-full ${item.effectClass}`}>
                      <img
                        src={currentAvatarUrl}
                        alt={item.name}
                        className="w-20 h-20 rounded-full bg-[#2D3436] object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#2D3436] text-sm">{item.name}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 font-black text-xs text-amber-600">
                    {item.price === 0 ? (
                      <span className="text-emerald-600">ไม่มีเอฟเฟกต์</span>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 fill-amber-400" />
                        <span>{item.price} เหรียญ</span>
                      </>
                    )}
                  </div>

                  {equipped ? (
                    <span className="bg-[#C2E114] text-[#2D3436] text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> สวมใส่อยู่
                    </span>
                  ) : owned ? (
                    <button
                      onClick={() => onEquipItem(item)}
                      className="bg-[#2D3436] hover:bg-black text-white text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition-all"
                    >
                      สวมใส่เอฟเฟกต์นี้
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart({
                            itemId: item.id,
                            type: 'decor',
                            title: item.name,
                            categoryName: 'เอฟเฟกต์โปรไฟล์',
                            price: item.price,
                            currency: 'COINS',
                            originalItem: item
                          })}
                          className="bg-gray-100 hover:bg-gray-200 text-[#2D3436] text-xs font-extrabold p-2 rounded-xl transition-all cursor-pointer"
                          title="เพิ่มลงตะกร้า"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                      {canAfford ? (
                        <button
                          onClick={() => onBuyItem(item)}
                          className="bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all shadow-xs"
                        >
                          ซื้อเลย
                        </button>
                      ) : (
                        <button
                          onClick={onNavigateTopUp}
                          className="bg-gray-200 text-gray-600 text-[11px] font-bold px-2.5 py-1.5 rounded-xl hover:bg-gray-300"
                        >
                          เหรียญไม่พอ
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
