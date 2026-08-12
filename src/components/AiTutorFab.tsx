import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { Bot, Send, X, Sparkles, Volume2, VolumeX, Lightbulb, User, RefreshCw } from 'lucide-react';

interface AiTutorFabProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AiTutorFab: React.FC<AiTutorFabProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'สวัสดีครับพี่! ผมคือ "น้อง AI ครูผู้ช่วย" ยินดีตอบทุกคำถามบทเรียน ม.1 - ม.3 ครับ ไม่เข้าใจเรื่องไหนในวิชาคณิต วิทย์ อังกฤษ โค้ดดิ้ง ถามน้อง AI ได้เลยครับ! 🤖✨',
      timestamp: 'ตอนนี้'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    'โครงการ JUMP TH คืออะไร?',
    'อธิบายสมการเชิงเส้น ม.2 แบบเข้าใจง่ายหน่อยครับ',
    'การสังเคราะห์ด้วยแสงเกิดขึ้นที่ไหนบ้าง?',
    'ขอเคล็ดลับจำ Tense ภาษาอังกฤษสำหรับ ม.3'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && speechEnabled) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#🤖✨💡🌿🇬🇧📝🎯]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'th-TH';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4)
        })
      });

      const data = await response.json();
      const aiReply = data.reply || 'ขออภัยครับ ลองถามน้อง AI อีกครั้งนะครับ';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      speakText(aiReply);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: '💡 น้อง AI พร้อมช่วยเหลือครับ! เรื่องสมการ 2x + 4 = 10 ให้ย้าย 4 ไปลบจาก 10 ได้ 2x = 6 จากนั้นย้าย 2 ไปหาร ได้ x = 3 ครับผม! 🎯✨',
        timestamp: 'ตอนนี้'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onToggle}
          className="relative group bg-[#C2E114] hover:bg-[#8A9914] hover:text-white text-[#2D3436] w-14 h-14 rounded-full shadow-ais-glow flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
          aria-label="Toggle AI Tutor Chat"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8A9914] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#8A9914]"></span>
          </span>
          <Bot className="w-7 h-7" />
        </button>
      </div>

      {/* Slide-Up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[360px] max-h-[580px] h-[75vh] bg-white rounded-[20px] shadow-2xl border border-[#E0E0E0] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#C2E114] text-[#2D3436] p-4 flex items-center justify-between border-b border-[#E0E0E0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2D3436] text-[#C2E114] flex items-center justify-center font-bold shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-[#2D3436]">น้อง AI ครูผู้ช่วย 24/7</h3>
                  </div>
                  <p className="text-[11px] text-[#2D3436]/80 font-medium">ตอบคำถาม & ติวบทเรียน ม.1-ม.3</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  title={speechEnabled ? 'ปิดเสียงอ่าน' : 'เปิดเสียงอ่านภาษาไทย'}
                  className={`p-1.5 rounded-lg transition-colors ${
                    speechEnabled ? 'bg-[#2D3436] text-[#C2E114]' : 'text-[#2D3436]/70 hover:bg-black/10'
                  }`}
                >
                  {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={onToggle}
                  className="p-1.5 text-[#2D3436]/70 hover:text-[#2D3436] hover:bg-black/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8F9FA]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-[#2D3436] text-white'
                        : 'bg-[#C2E114] text-[#2D3436]'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2D3436] text-white rounded-tr-none'
                        : 'bg-[#F1F2F6] border border-[#E0E0E0] text-[#2D3436] shadow-2xs rounded-tl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-gray-300' : 'text-[#636E72]'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-[#636E72] text-xs bg-white p-3 rounded-2xl w-fit border border-[#E0E0E0] shadow-2xs">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#8A9914]" />
                  <span>น้อง AI กำลังพิมพ์คำตอบสไตล์ย่อยง่าย...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Preset Question Chips */}
            <div className="p-2 bg-white border-t border-[#E0E0E0] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-[#636E72] font-medium shrink-0 pl-1 flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500" /> ลองถาม:
              </span>
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="bg-[#F1F2F6] hover:bg-[#C2E114] text-[#2D3436] text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0 transition-colors border border-[#E0E0E0]"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-[#E0E0E0] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="ถามข้อสงสัยบทเรียน ม.1 - ม.3..."
                className="flex-1 bg-[#F1F2F6] border border-[#E0E0E0] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#2D3436] focus:outline-none focus:ring-2 focus:ring-[#C2E114] focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-[#C2E114] hover:bg-[#8A9914] hover:text-white disabled:opacity-40 text-[#2D3436] p-2.5 rounded-xl font-bold shadow-2xs transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
