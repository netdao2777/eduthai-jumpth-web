import { DecorItem } from '../types';

export const DECOR_AVATARS: DecorItem[] = [
  {
    id: 'avatar-default-1',
    name: 'หุ่นยนต์นักเรียนทั่วไป (Default Robot)',
    type: 'avatar',
    price: 0,
    description: 'รูปเริ่มต้นสำหรับนักเรียนทุกคน ใช้งานได้ทันทีฟรี',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=StudentNormal',
    tag: 'เริ่มต้น'
  },
  {
    id: 'avatar-default-2',
    name: 'นักเรียนเรียนดี (Default Boy)',
    type: 'avatar',
    price: 0,
    description: 'รูปเริ่มต้นธรรมดา เรียบง่าย สะอาดตา',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=KittisakStudent',
    tag: 'เริ่มต้น'
  },
  {
    id: 'avatar-cyber-hero',
    name: 'Cyber Knight (อวตารอัศวินไซเบอร์)',
    type: 'avatar',
    price: 150,
    description: 'อวตารหุ่นยนต์ไซเบอร์นีออนสุดเท่ พร้อมเกราะเรืองแสง',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberHero2026',
    tag: 'ยอดนิยม'
  },
  {
    id: 'avatar-anime-scholar',
    name: 'Anime Cyber Scholar (อัจฉริยะไอที)',
    type: 'avatar',
    price: 300,
    description: 'อวตารการ์ตูนเทคโนโลยีสุดคูล สายโค้ดดิ้งและ AI',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=ScholarAnime2026',
    tag: 'NEW'
  },
  {
    id: 'avatar-flame-master',
    name: 'Flame Alchemist (จอมเวทย์เปลวเพลิง)',
    type: 'avatar',
    price: 500,
    description: 'อวตารนักวิทยาศาสตร์พลังเพลิง มีออร่าไฟร้อนแรงตลอดเวลา',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=FlameAlchemist',
    tag: 'HOT'
  },
  {
    id: 'avatar-cosmic-astronaut',
    name: 'Cosmic Explorer (นักสำรวจอวกาศ)',
    type: 'avatar',
    price: 750,
    description: 'อวตารนักท่องดวงดาว ตะลุยจักรวาลการเรียนรู้',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=CosmicExplorer',
    tag: 'VIP'
  },
  {
    id: 'avatar-golden-emperor',
    name: 'Golden Dragon Scholar (ราชาทองคำ)',
    type: 'avatar',
    price: 1200,
    description: 'อวตารระดับตํานาน สำหรับสุดยอดผู้ชนะอันดับ 1 ของ EduThai',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=GoldenEmperorVIP',
    tag: 'LEGEND'
  }
];

export const DECOR_FRAMES: DecorItem[] = [
  {
    id: 'frame-none',
    name: 'กรอบมาตรฐาน (Default Frame)',
    type: 'frame',
    price: 0,
    description: 'กรอบวงกลมเรียบง่าย ดั้งเดิม',
    frameBorderClass: 'border-2 border-gray-200',
    tag: 'เริ่มต้น'
  },
  {
    id: 'frame-neon-glow',
    name: 'กรอบนีออนเรืองแสง (Cyber Lime Glow)',
    type: 'frame',
    price: 200,
    description: 'กรอบนีออนเขียวสว่างวาบสไตล์ EduThai โดดเด่นทุกความเห็น',
    frameBorderClass: 'border-4 border-[#C2E114] shadow-[0_0_15px_#C2E114]',
    frameBadge: '⚡ NEON',
    tag: 'HOT'
  },
  {
    id: 'frame-cyber-sparkle',
    name: 'กรอบคริสตัลประกายดาว (Crystal Sparkle)',
    type: 'frame',
    price: 400,
    description: 'กรอบอัญมณีฟ้าประกายคริสตัล พร้อมเอฟเฟกต์สะท้อนแสง',
    frameBorderClass: 'border-4 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)] animate-pulse',
    frameBadge: '💎 CRYSTAL',
    tag: 'NEW'
  },
  {
    id: 'frame-golden-crown',
    name: 'กรอบมงกุฎราชาทองคำ (Golden VIP Crown)',
    type: 'frame',
    price: 600,
    description: 'กรอบทองคำบริสุทธิ์ ประดับมงกุฎเกียรติยศสำหรับผู้เรียนยอดเยี่ยม',
    frameBorderClass: 'border-4 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.9)] ring-2 ring-amber-200',
    frameBadge: '👑 CROWN VIP',
    tag: 'VIP'
  },
  {
    id: 'frame-rainbow-aura',
    name: 'กรอบดิสโก้สายรุ้ง (Rainbow Disco Aura)',
    type: 'frame',
    price: 850,
    description: 'กรอบไล่สีรุ้งนีออนเคลื่อนไหว สะกดทุกสายตาบนกระดานผู้นำ',
    frameBorderClass: 'border-4 border-purple-500 shadow-[0_0_22px_rgba(168,85,247,0.8)] ring-2 ring-pink-400',
    frameBadge: '🌈 DISCO',
    tag: 'LIMITED'
  }
];

export const DECOR_EFFECTS: DecorItem[] = [
  {
    id: 'effect-none',
    name: 'ไม่มีเอฟเฟกต์ (None)',
    type: 'effect',
    price: 0,
    description: 'ไม่มีเอฟเฟกต์รอบรูปโปรไฟล์',
    effectClass: '',
    tag: 'เริ่มต้น'
  },
  {
    id: 'effect-fire-aura',
    name: 'เอฟเฟกต์ออร่าเพลิง (Solar Fire Aura)',
    type: 'effect',
    price: 250,
    description: 'เอฟเฟกต์ไอความร้อนสุริยะพุ่งขึ้นรอบๆ รูปโปรไฟล์สุดเท่',
    effectClass: 'ring-4 ring-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.9)] animate-bounce',
    effectBadge: '🔥 เปลวไฟ',
    tag: 'HOT'
  },
  {
    id: 'effect-galaxy-stars',
    name: 'เอฟเฟกต์ละอองดาว (Cosmic Star Dust)',
    type: 'effect',
    price: 450,
    description: 'เอฟเฟกต์ประกายละอองอวกาศวิบวับ ระยิบระยับตลอดเวลา',
    effectClass: 'ring-4 ring-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.9)] animate-pulse',
    effectBadge: '✨ ละอองดาว',
    tag: 'POPULAR'
  },
  {
    id: 'effect-lightning-pulse',
    name: 'เอฟเฟกต์สายฟ้ากระพริบ (Electric Cyber Pulse)',
    type: 'effect',
    price: 700,
    description: 'กระแสไฟฟ้าสถิตแล่นวนรอบรูปโปรไฟล์ ชาร์จพลังการเรียนเต็มเปี่ยม',
    effectClass: 'ring-4 ring-yellow-400 shadow-[0_0_30px_rgba(250,204,21,1)] animate-ping',
    effectBadge: '⚡ สายฟ้า',
    tag: 'VIP'
  }
];
