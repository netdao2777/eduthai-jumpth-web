import React from 'react';
import { CartItem, UserProfile } from '../types';
import { ShoppingCart, X, Trash2, Coins, ArrowRight, CheckCircle2, Sparkles, BookOpen, ShoppingBag, CreditCard, AlertCircle } from 'lucide-react';

interface CartDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  user: UserProfile;
  onRemoveFromCart: (cartItemId: string) => void;
  onClearCart: () => void;
  onCheckoutCart: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawerModal: React.FC<CartDrawerModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  user,
  onRemoveFromCart,
  onClearCart,
  onCheckoutCart,
  onNavigateToShop
}) => {
  if (!isOpen) return null;

  // Calculate totals
  const totalCoins = cartItems
    .filter(item => item.currency === 'COINS')
    .reduce((sum, item) => sum + item.price, 0);

  const totalTHB = cartItems
    .filter(item => item.currency === 'THB')
    .reduce((sum, item) => sum + item.price, 0);

  const canAffordCoins = user.coins >= totalCoins;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="bg-[#2D3436] text-white p-5 border-b border-gray-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C2E114] text-[#2D3436] rounded-xl font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base flex items-center gap-2">
                ตะกร้าสินค้าของคุณ
                <span className="bg-[#C2E114] text-[#2D3436] text-xs px-2 py-0.5 rounded-full font-black">
                  {cartItems.length}
                </span>
              </h2>
              <p className="text-[11px] text-gray-300">คอร์สเรียน และไอเทมของตกแต่งที่เลือกระบุไว้</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-gray-100">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-gray-300">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-[#2D3436] text-base">ตะกร้าของคุณยังว่างอยู่</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  เลือกคอร์สเรียนสนุกๆ หรือเลือกของตกแต่งโปรไฟล์สุดเท่ใส่ตะกร้าไว้ตรงนี้ได้เลย!
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToShop();
                }}
                className="mt-2 bg-[#C2E114] hover:bg-[#8A9914] text-[#2D3436] hover:text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> ไปเลือกดูสินค้าในระบบ
              </button>
            </div>
          ) : (
            <>
              {/* Clear Cart Option */}
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-gray-500">รายการที่เลือก ({cartItems.length})</span>
                <button
                  onClick={onClearCart}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> ล้างตะกร้าทั้งหมด
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 pt-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100/80 rounded-2xl border border-gray-200 transition-all relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl bg-[#2D3436] shrink-0 overflow-hidden border border-gray-300 flex items-center justify-center text-white">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      ) : item.type === 'course' ? (
                        <BookOpen className="w-6 h-6 text-[#C2E114]" />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-[#C2E114]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#2D3436] text-[#C2E114] text-[9px] font-black px-2 py-0.2 rounded-full uppercase">
                          {item.categoryName}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#2D3436] text-xs truncate">{item.title}</h4>
                      <div className="flex items-center gap-1 font-black text-xs text-amber-600">
                        {item.currency === 'COINS' ? (
                          <>
                            <Coins className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{item.price === 0 ? 'ฟรี' : `${item.price} เหรียญ`}</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-blue-700">฿{item.price} บาท</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => onRemoveFromCart(item.cartItemId)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="ลบรายการนี้"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-3 shrink-0">
            
            {/* Coin balance status */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs flex items-center justify-between">
              <span className="text-gray-600 font-semibold">เหรียญของคุณที่มีสะสม:</span>
              <span className="font-black text-amber-600 flex items-center gap-1">
                <Coins className="w-4 h-4 fill-amber-400" />
                {user.coins.toLocaleString()} เหรียญ
              </span>
            </div>

            {/* Price Summaries */}
            <div className="space-y-1.5 pt-1">
              {totalCoins > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 font-bold">รวมเหรียญที่ต้องใช้:</span>
                  <span className={`font-black text-sm flex items-center gap-1 ${canAffordCoins ? 'text-amber-600' : 'text-red-600'}`}>
                    <Coins className="w-4 h-4 fill-amber-400" />
                    {totalCoins.toLocaleString()} เหรียญ
                  </span>
                </div>
              )}

              {totalTHB > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 font-bold">รวมเงินที่ต้องชำระ (บาท):</span>
                  <span className="font-black text-blue-700 text-sm">
                    ฿{totalTHB.toLocaleString()} บาท
                  </span>
                </div>
              )}
            </div>

            {/* Warning if coins insufficient */}
            {totalCoins > 0 && !canAffordCoins && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-[11px] p-2.5 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>เหรียญไม่พอสำหรับการชำระรายการทั้งหมด (ขาดอีก {(totalCoins - user.coins).toLocaleString()} เหรียญ)</span>
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              onClick={onCheckoutCart}
              disabled={totalCoins > 0 && !canAffordCoins}
              className="w-full bg-[#C2E114] hover:bg-[#8A9914] disabled:bg-gray-300 disabled:text-gray-500 text-[#2D3436] hover:text-white font-black py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>ยืนยันสั่งซื้อและชำระเงิน</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
