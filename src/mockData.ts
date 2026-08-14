import { Course, LeaderboardUser, Badge, DailyQuest, Comment, CreatorGame, CreatorContent, WithdrawalRequest, AdminTicket, DonationRecord, BankAccountInfo, MonthlyPayoutRecord } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'คณิตศาสตร์ ม.2: สมการเชิงเส้นตัวแปรเดียวและการประยุกต์',
    subject: 'คณิตศาสตร์',
    grade: 'ม.2',
    instructor: 'ครูพี่เป้ (ครูรางวัลสมเด็จเจ้าฟ้ามหาจักรี)',
    school: 'โรงเรียนไกลกังวล',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    duration: '3.5 ชั่วโมง',
    lessonsCount: 6,
    expReward: 150,
    coinsReward: 50,
    progress: 65,
    isEnrolled: true,
    isRecommended: true,
    isBuffetIncluded: true,
    priceCoins: 0,
    rating: 4.9,
    description: 'เรียนรู้การแก้สมการเชิงเส้นตัวแปรเดียว การย้ายข้างสมการ และการแก้โจทย์ปัญหาประยุกต์ในชีวิตประจำวันอย่างเป็นขั้นตอน เหมาะสำหรับนักเรียน ม.2 ทุกระดับความรู้',
    lessons: [
      {
        id: 'les-1',
        courseId: 'course-1',
        title: 'บทที่ 1: ทำความรู้จักกับตัวแปรและสมการ',
        duration: '12:45 นาที',
        isCompleted: true,
        isLocked: false,
        description: 'ทำความเข้าใจความหมายของตัวแปร ค่าคงตัว และเครื่องหมายเท่ากับในทางคณิตศาสตร์',
        pdfNotesUrl: '#',
      },
      {
        id: 'les-2',
        courseId: 'course-1',
        title: 'บทที่ 2: เทคนิคการย้ายข้างสมการอย่างรวดเร็ว',
        duration: '18:20 นาที',
        isCompleted: true,
        isLocked: false,
        description: 'หลักการบวก ลบ คูณ หาร ทั้งสองข้างของสมการ และการย้ายข้างเพื่อหาค่าตัวแปร',
        pdfNotesUrl: '#',
        quiz: [
          {
            id: 'q1',
            question: 'ถ้า 2x + 4 = 10 แล้วค่าของ x ตรงกับข้อใด?',
            options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
            correctAnswerIndex: 1,
            explanation: 'ย้าย 4 ไปลบจาก 10 ได้ 2x = 6 จากนั้นนำ 2 ไปหาร 6 ได้ x = 3'
          },
          {
            id: 'q2',
            question: 'ข้อใดเป็นสมการเชิงเส้นตัวแปรเดียว?',
            options: ['x + y = 5', '3x² + 2 = 11', '5m - 7 = 18', '2a + 3b = c'],
            correctAnswerIndex: 2,
            explanation: '5m - 7 = 18 มีตัวแปรเดียวคือ m และกำลังของตัวแปรเป็น 1'
          },
          {
            id: 'q3',
            question: 'ผลบวกของเลขสองจำนวนเท่ากับ 20 ถ้าจำนวนหนึ่งมากกว่าอีกจำนวนอยู่ 4 เลขจำนวนมากคือเท่าใด?',
            options: ['10', '12', '14', '16'],
            correctAnswerIndex: 1,
            explanation: 'ให้ x เป็นจำนวนน้อย x + (x + 4) = 20 -> 2x = 16 -> x = 8 ดังนั้นจำนวนมากคือ 8 + 4 = 12'
          }
        ]
      },
      {
        id: 'les-3',
        courseId: 'course-1',
        title: 'บทที่ 3: การวิเคราะห์โจทย์ปัญหาซื้อขายและอายุ',
        duration: '15:10 นาที',
        isCompleted: false,
        isLocked: false,
        description: 'เปลี่ยนโจทย์ปัญหาภาษาไทยให้อยู่ในรูปสมการสัญลักษณ์ทางคณิตศาสตร์',
      },
      {
        id: 'les-4',
        courseId: 'course-1',
        title: 'บทที่ 4: ตะลุยโจทย์ข้อสอบกลาง ม.2',
        duration: '22:00 นาที',
        isCompleted: false,
        isLocked: true,
        description: 'ฝึกทำโจทย์แนวสอบกลางภาคและสอบ O-NET ย้อนหลัง 5 ปี',
      }
    ]
  },
  {
    id: 'course-2',
    title: 'วิทยาศาสตร์ ม.1: การสังเคราะห์ด้วยแสงและโครงสร้างพืช',
    subject: 'วิทยาศาสตร์',
    grade: 'ม.1',
    instructor: 'ดร.สมชาย ใจดี (ครูผู้เชี่ยวชาญ สสวท.)',
    school: 'โรงเรียนชุมชนบ้านดอน',
    thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    duration: '2.8 ชั่วโมง',
    lessonsCount: 5,
    expReward: 120,
    coinsReward: 40,
    progress: 40,
    isEnrolled: true,
    isRecommended: true,
    isBuffetIncluded: true,
    priceCoins: 0,
    rating: 4.8,
    description: 'เจาะลึกกระบวนการสังเคราะห์ด้วยแสงของพืช หน้าที่ของคลอโรฟิลล์ ปากใบ และการลำเลียงน้ำผ่านท่อไซเล็ม (Xylem) และโฟลเอ็ม (Phloem)',
    lessons: [
      {
        id: 'les-201',
        courseId: 'course-2',
        title: 'บทที่ 1: เซลล์พืชและคลอโรพลาสต์',
        duration: '14:00 นาที',
        isCompleted: true,
        isLocked: false,
        description: 'ส่วนประกอบของเซลล์พืช ความแตกต่างระหว่างเซลล์พืชและเซลล์สัตว์',
      },
      {
        id: 'les-202',
        courseId: 'course-2',
        title: 'บทที่ 2: ปัจจัยที่จำเป็นในการสังเคราะห์ด้วยแสง',
        duration: '16:30 นาที',
        isCompleted: false,
        isLocked: false,
        description: 'บทบาทของแสง แก็สคาร์บอนไดออกไซด์ น้ำ และคลอโรฟิลล์',
        quiz: [
          {
            id: 'q201',
            question: 'ผลผลิตที่ได้จากกระบวนการสังเคราะห์ด้วยแสงของพืชคือข้อใด?',
            options: ['น้ำตาลกลูโคส + แก๊สออกซิเจน', 'แก๊สคาร์บอนไดออกไซด์ + น้ำ', 'แป้ง + แก๊สไนโตรเจน', 'แร่ธาตุ + คลอโรฟิลล์'],
            correctAnswerIndex: 0,
            explanation: 'พืชเปลี่ยน CO2 และ H2O โดยใช้แสง ได้ C6H12O6 (กลูโคส) และ O2 (ออกซิเจน)'
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: 'วิทยาการคำนวณ ม.2: อัลกอริทึมและการเขียนโค้ด Python เบื้องต้น',
    subject: 'เทคโนโลยี/Coding',
    grade: 'ม.2',
    instructor: 'ครูไอซ์ สายโค้ด (Tech EdThai)',
    school: 'โรงเรียนสาธิตนวัตกรรม',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    duration: '4.0 ชั่วโมง',
    lessonsCount: 8,
    expReward: 200,
    coinsReward: 70,
    progress: 0,
    isEnrolled: false,
    isRecommended: true,
    isBuffetIncluded: true,
    priceCoins: 120,
    rating: 5.0,
    description: 'เรียนรู้ทักษะการคิดเชิงคำนวณ (Computational Thinking) ผังงาน (Flowchart) และการเขียนโปรแกรมภาษา Python สำหรับผู้เริ่มต้น',
    lessons: [
      {
        id: 'les-301',
        courseId: 'course-3',
        title: 'บทที่ 1: การคิดเชิงคำนวณ 4 ตัวเสาหลัก',
        duration: '10:15 นาที',
        isCompleted: false,
        isLocked: false,
        description: 'Decomposition, Pattern Recognition, Abstraction, Algorithm Design',
      }
    ]
  },
  {
    id: 'course-4',
    title: 'ภาษาอังกฤษ ม.3: ตะลุยโจทย์ Grammar & Present Perfect vs Past Simple',
    subject: 'ภาษาอังกฤษ',
    grade: 'ม.3',
    instructor: 'Teacher Sarah & ครูแจ๋ม',
    school: 'โรงเรียนมัธยมสาธิต',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    duration: '3.0 ชั่วโมง',
    lessonsCount: 6,
    expReward: 160,
    coinsReward: 45,
    progress: 0,
    isEnrolled: false,
    isRecommended: false,
    isBuffetIncluded: true,
    priceCoins: 80,
    rating: 4.7,
    description: 'เคลียร์ทุกความสับสนในการใช้ Tense ยอดฮิตพร้อมเทคนิคตัดตัวเลือกข้อสอบเตรียมอุดมและ O-NET ม.3',
    lessons: []
  },
  {
    id: 'course-5',
    title: 'ภาษาไทย ม.3: การวิเคราะห์คุณค่าวรรณคดี พระอภัยมณี ตอน หนีนางผีเสื้อสมุทร',
    subject: 'ภาษาไทย',
    grade: 'ม.3',
    instructor: 'ครูวรรณา อักษรศาสตร์',
    school: 'โรงเรียนสุพรรณบุรีวิทยา',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    duration: '2.5 ชั่วโมง',
    lessonsCount: 5,
    expReward: 130,
    coinsReward: 35,
    progress: 0,
    isEnrolled: false,
    isRecommended: false,
    isBuffetIncluded: false, // คอร์สเอ็กซ์คลูซีฟ ซื้อแยกเดี่ยว
    priceCoins: 60,
    rating: 4.9,
    description: 'ถอดบทเรียน ถอดคำประพันธ์ และวิเคราะห์คุณค่าทางวรรณศิลป์ สังคม และคุณธรรมจากวรรณคดีชั้นครู (คอร์สพิเศษซื้อเดี่ยว)',
    lessons: []
  },
  {
    id: 'course-6',
    title: 'สังคมศึกษา ม.1: ภูมิศาสตร์ประเทศไทย ภัยธรรมชาติและการรับมือ',
    subject: 'สังคมศึกษา',
    grade: 'ม.1',
    instructor: 'อาจารย์ธนพล แผนที่ไทย',
    school: 'โรงเรียนเบญจมราชูทิศ',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    duration: '2.2 ชั่วโมง',
    lessonsCount: 4,
    expReward: 110,
    coinsReward: 30,
    progress: 0,
    isEnrolled: false,
    isRecommended: false,
    isBuffetIncluded: true,
    priceCoins: 50,
    rating: 4.6,
    description: 'เรียนรู้ลักษณะทางภูมิศาสตร์ของ 6 ภาคในประเทศไทย เครื่องมือทางภูมิศาสตร์ และแนวทางป้องกันภัยพิบัติ',
    lessons: []
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    userName: 'น้องฟ้าใส เรียนดี',
    userAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Fahsai',
    content: 'ครูพี่เป้อธิบายเรื่องการย้ายข้างสมการเข้าใจง่ายมากเลยค่ะ จากที่ไม่เคยเข้าใจตอนเรียนในห้อง ตอนนี้ทำโจทย์ได้แล้ว! 🎉',
    timestamp: '10 นาทีที่แล้ว',
    likes: 24,
    isLiked: false
  },
  {
    id: 'c2',
    userName: 'ก้องภพ สายลุย (ม.2/3)',
    userAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kongphop',
    content: 'ระบบ ควิซ ปรับระดับความยากตามเราเจ๋งมาก ตอบถูกติดกันแล้วได้เหรียญเยอะขึ้นด้วย!',
    timestamp: '1 ชั่วโมงที่แล้ว',
    likes: 15,
    isLiked: false
  },
  {
    id: 'c3',
    userName: 'Som somo',
    userAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Somsomo',
    content: 'ขอสอบถามครับ ถ้าเจอโจทย์ที่มีวงเล็บสองชั้น ต้องถอดวงเล็บไหนก่อนครับ?',
    timestamp: '3 ชั่วโมงที่แล้ว',
    likes: 8,
    isLiked: true
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'ฟ้าใส พัฒนปัญญา',
    school: 'โรงเรียนไกลกังวล (ประจวบคีรีขันธ์)',
    grade: 'ม.2',
    exp: 3450,
    coins: 820,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Fahsai1',
    badgeTitle: '🥇 อันดับ 1 ประจำสัปดาห์'
  },
  {
    rank: 2,
    name: 'กล้าหาญ รักเรียน',
    school: 'โรงเรียนชุมชนบ้านดอน (เชียงใหม่)',
    grade: 'ม.3',
    exp: 3120,
    coins: 750,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kla',
    badgeTitle: '🥈 อันดับ 2 ประจำสัปดาห์'
  },
  {
    rank: 3,
    name: 'พีท สายโค้ด',
    school: 'โรงเรียนวัดไร่ขิงวิทยา (นครปฐม)',
    grade: 'ม.2',
    exp: 2890,
    coins: 640,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Pete',
    badgeTitle: '🥉 อันดับ 3 ประจำสัปดาห์'
  },
  {
    rank: 4,
    name: 'มินนี่ มีสุข',
    school: 'โรงเรียนเบญจมราชูทิศ (นครศรีธรรมราช)',
    grade: 'ม.1',
    exp: 2450,
    coins: 510,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Minnie',
    badgeTitle: '🌟 เซียนวิทยาศาสตร์'
  },
  {
    rank: 5,
    name: 'ตั้ม นวัตกรน้อย',
    school: 'โรงเรียนหนองบัวพิทยาคาร (หนองบัวลำภู)',
    grade: 'ม.2',
    exp: 2100,
    coins: 480,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Tum',
    badgeTitle: '⚡ นักล่าคะแนน'
  },
  {
    rank: 12,
    name: 'Som somo (คุณ)',
    school: 'โรงเรียนชุมชนบ้านดอน',
    grade: 'ม.2',
    exp: 1250,
    coins: 350,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Somsomo',
    badgeTitle: '🔥 สตรีค 7 วันติด',
    isCurrentUser: true
  }
];

export const BADGES_LIST: Badge[] = [
  {
    id: 'b1',
    title: 'เซียนคณิต ม.2',
    description: 'ผ่านคอร์สคณิตศาสตร์ ม.2 และทำคะแนนควิซได้มากกว่า 90%',
    icon: '🧮',
    isUnlocked: true,
    unlockedDate: '10 ส.ค. 2569',
    category: 'วิชาการ'
  },
  {
    id: 'b2',
    title: 'สตรีค 7 วันติดกัน 🔥',
    description: 'เข้าใช้งานและทำภารกิจการเรียนติดต่อกันครบ 7 วัน',
    icon: '🔥',
    isUnlocked: true,
    unlockedDate: '11 ส.ค. 2569',
    category: 'ความขยัน'
  },
  {
    id: 'b3',
    title: 'นักล่าเกียรตินิยม AI 🤖',
    description: 'ปรึกษาและถามคำถามกับ AI ครูผู้ช่วยครบ 10 ครั้ง',
    icon: '🤖',
    isUnlocked: true,
    unlockedDate: '12 ส.ค. 2569',
    category: 'ปัญญาประดิษฐ์'
  },
  {
    id: 'b4',
    title: 'นักคิดสายโค้ด 💻',
    description: 'เรียนจบหลักสูตรวิทยาการคำนวณและส่งแบบฝึกหัด Python',
    icon: '💻',
    isUnlocked: false,
    category: 'โค้ดดิ้ง'
  },
  {
    id: 'b5',
    title: 'ยอดนักวิจัยวิทยาศาสตร์ 🔬',
    description: 'พิชิตบทเรียนวิทยาศาสตร์ครบ 3 คอร์ส',
    icon: '🔬',
    isUnlocked: false,
    category: 'วิชาการ'
  }
];

export const DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'q-1',
    title: 'พิชิตแบบทดสอบคณิตศาสตร์ 1 บท',
    description: 'ทำ Adaptive Quiz ในคอร์สคณิตศาสตร์ ม.2',
    expReward: 50,
    coinsReward: 20,
    isCompleted: true,
    progress: 1,
    total: 1,
    targetView: 'classroom'
  },
  {
    id: 'q-2',
    title: 'ถาม AI ครูผู้ช่วยอย่างน้อย 1 คำถาม',
    description: 'กดปุ่ม AI Tutor ด้านขวาเพื่อถามข้อสงสัยการเรียน',
    expReward: 30,
    coinsReward: 15,
    isCompleted: false,
    progress: 0,
    total: 1,
    targetView: 'aitutor'
  },
  {
    id: 'q-3',
    title: 'เรียนบทเรียนวิดีโอรวม 10 นาที',
    description: 'สะสมเวลาเรียนวิดีโอในคอร์สใดก็ได้',
    expReward: 40,
    coinsReward: 20,
    isCompleted: false,
    progress: 6,
    total: 10,
    targetView: 'mycourses'
  }
];

export const CREATOR_GAMES: CreatorGame[] = [
  {
    id: 'game-1',
    title: 'Math Speed Arena: สมการ & เลขเร็ว ม.2',
    creatorName: 'ครูพี่เป้ (ครูรางวัลสมเด็จเจ้าฟ้ามหาจักรี)',
    creatorSchool: 'โรงเรียนไกลกังวล',
    creatorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PaeTeacher',
    subject: 'คณิตศาสตร์',
    grade: 'ม.2',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    playsCount: 14200,
    rating: 4.9,
    likesCount: 3820,
    isLiked: false,
    expReward: 160,
    coinsReward: 50,
    timePerQuestion: 10,
    description: 'มินิเกมวัดความเร็วสปีดควิซ แก้สมการตัวแปรเดียวและโจทย์คณิตศาสตร์ประยุกต์ ม.2 ใน 10 วินาที!',
    tags: ['สมการ', 'สปีดควิซ', 'ม.2', 'คณิตศาสตร์'],
    questions: [
      {
        id: 'g1-q1',
        question: 'สมการ 3x - 5 = 10 มีค่า x เท่ากับเท่าใด?',
        options: ['3', '5', '6', '15'],
        correctIndex: 1,
        explanation: 'ย้าย -5 ไปบวกได้ 3x = 15 จากนั้นนำ 3 ไปหารได้ x = 5'
      },
      {
        id: 'g1-q2',
        question: 'ถ้า 2(x + 3) = 14 แล้วค่าของ x คือเท่าใด?',
        options: ['4', '5', '7', '8'],
        correctIndex: 0,
        explanation: 'นำ 2 ไปหารทั้งสองข้างได้ x + 3 = 7 ดังนั้น x = 4'
      },
      {
        id: 'g1-q3',
        question: 'มุมภายในของรูปสามเหลี่ยมรวมกันได้กี่องศา?',
        options: ['90°', '180°', '270°', '360°'],
        correctIndex: 1,
        explanation: 'ผลรวมมุมภายในรูปสามเหลี่ยมทุกชนิดเท่ากับ 180° เสมอ'
      },
      {
        id: 'g1-q4',
        question: 'สามเหลี่ยมมุมฉากมีด้านประกอบมุมฉากยาว 3 และ 4 ด้านตรงข้ามมุมฉากยาวเท่าใด?',
        options: ['5', '6', '7', '25'],
        correctIndex: 0,
        explanation: 'ใช้ทฤษฎีบทพีทาโกรัส: c² = 3² + 4² = 9 + 16 = 25 -> c = 5'
      }
    ]
  },
  {
    id: 'game-2',
    title: 'Sci-Lab Quest: ตะลุยสังเคราะห์แสง & เซลล์พืช',
    creatorName: 'ดร.สมชาย ใจดี (ครูผู้เชี่ยวชาญ สสวท.)',
    creatorSchool: 'โรงเรียนชุมชนบ้านดอน',
    creatorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SomchaiSci',
    subject: 'วิทยาศาสตร์',
    grade: 'ม.1',
    thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    playsCount: 9800,
    rating: 4.8,
    likesCount: 2450,
    isLiked: false,
    expReward: 140,
    coinsReward: 40,
    timePerQuestion: 12,
    description: 'ทดสอบความรู้เกี่ยวกับกระบวนการสังเคราะห์ด้วยแสง คลอโรฟิลล์ และโครงสร้างปากใบพืช ม.1',
    tags: ['เซลล์พืช', 'สังเคราะห์แสง', 'สสวท.', 'ม.1'],
    questions: [
      {
        id: 'g2-q1',
        question: 'กระบวนการสังเคราะห์ด้วยแสงปล่อยแก๊สชนิดใดออกมาเป็นผลพลอยได้?',
        options: ['แก๊สไนโตรเจน', 'แก๊สคาร์บอนไดออกไซด์', 'แก๊สออกซิเจน', 'แก๊สไฮโดรเจน'],
        correctIndex: 2,
        explanation: 'พืชใช้แก๊สคาร์บอนไดออกไซด์และน้ำ โดยมีแสงและคลอโรฟิลล์ช่วย ได้กลูโคสและแก๊สออกซิเจน'
      },
      {
        id: 'g2-q2',
        question: 'รงควัตถุสีเขียวที่ทำหน้าที่ดูดกลืนพลังงานแสงในพืชเรียกว่าอะไร?',
        options: ['แคโรทีนอยด์', 'คลอโรฟิลล์', 'แอนโทไซยานิน', 'แซนโทฟิลล์'],
        correctIndex: 1,
        explanation: 'คลอโรฟิลล์ (Chlorophyll) เป็นรงควัตถุหลักสีเขียวในคลอโรพลาสต์'
      },
      {
        id: 'g2-q3',
        question: 'เนื้อเยื่อลำเลียงน้ำและแร่ธาตุในพืชเรียกว่าอะไร?',
        options: ['โฟลเอ็ม (Phloem)', 'ไซเล็ม (Xylem)', 'คอร์เทกซ์ (Cortex)', 'ปากใบ (Stomata)'],
        correctIndex: 1,
        explanation: 'ไซเล็ม (Xylem) ลำเลียงน้ำและแร่ธาตุจากรากขึ้นสู่ใบ ส่วนโฟลเอ็มลำเลียงอาหาร'
      }
    ]
  },
  {
    id: 'game-3',
    title: 'Code Runner: อัลกอริทึม & Python Bug Finder',
    creatorName: 'ครูไอซ์ สายโค้ด (Tech EdThai)',
    creatorSchool: 'โรงเรียนสาธิตนวัตกรรม',
    creatorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=IceCoder',
    subject: 'เทคโนโลยี/Coding',
    grade: 'ม.2',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    playsCount: 11500,
    rating: 5.0,
    likesCount: 3100,
    isLiked: false,
    expReward: 180,
    coinsReward: 60,
    timePerQuestion: 15,
    description: 'ฝึกการคิดเชิงคำนวณ ตามล่าหาบั๊กภาษา Python และตอบคำถาม Flowchart วิทยาการคำนวณ',
    tags: ['Python', 'Coding', 'Computational Thinking', 'ม.2'],
    questions: [
      {
        id: 'g3-q1',
        question: 'ข้อใดไม่ใช่เสาหลักการคิดเชิงคำนวณ (Computational Thinking)?',
        options: ['Decomposition', 'Pattern Recognition', 'Phototropism', 'Algorithm'],
        correctIndex: 2,
        explanation: 'Phototropism คือการเบนเข้าหาแสงของพืช ไม่ใช่แนวคิดเชิงคำนวณ'
      },
      {
        id: 'g3-q2',
        question: 'คำสั่ง print("Hello" + "World") ใน Python ได้ผลลัพธ์เป็นอะไร?',
        options: ['Hello World', 'HelloWorld', 'Error', 'Hello+World'],
        correctIndex: 1,
        explanation: 'การใช้เครื่องหมาย + กับ String ใน Python คือการนำข้อความมารวมกันโดยไม่มีช่องว่าง'
      },
      {
        id: 'g3-q3',
        question: 'สัญลักษณ์รูปสี่เหลี่ยมผืนผ้าในผังงาน (Flowchart) มีความหมายตรงกับข้อใด?',
        options: ['การเริ่มต้น/สิ้นสุด', 'การประมวลผล (Process)', 'การตัดสินใจ (Decision)', 'การรับข้อมูล (Input)'],
        correctIndex: 1,
        explanation: 'รูปสี่เหลี่ยมผืนผ้าใช้แทนการประมวลผลหรือคำนวณค่า (Process)'
      }
    ]
  },
  {
    id: 'game-4',
    title: 'English Word Battle: ดวลศัพท์เตรียมอุดม & Tense',
    creatorName: 'Teacher Sarah & ครูแจ๋ม',
    creatorSchool: 'โรงเรียนมัธยมสาธิต',
    creatorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SarahTeacher',
    subject: 'ภาษาอังกฤษ',
    grade: 'ม.3',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    playsCount: 8900,
    rating: 4.7,
    likesCount: 2100,
    isLiked: false,
    expReward: 150,
    coinsReward: 45,
    timePerQuestion: 10,
    description: 'พิชิตข้อสอบไวยากรณ์ คำศัพท์ O-NET ม.3 และเตรียมสอบเข้า ม.4',
    tags: ['Grammar', 'Vocabulary', 'O-NET', 'ม.3'],
    questions: [
      {
        id: 'g4-q1',
        question: 'ประโยคใดต่อไปนี้ใช้ Present Perfect Tense ได้ถูกต้อง?',
        options: ['I ate rice yesterday.', 'I have lived here for 2 years.', 'I will go home.', 'I am study now.'],
        correctIndex: 1,
        explanation: 'Present Perfect รูปแบบคือ Subject + have/has + V.3 เช่น I have lived...'
      },
      {
        id: 'g4-q2',
        question: 'คำว่า "Simultaneous" มีความหมายใกล้เคียงกับข้อใด?',
        options: ['Occurring at the same time', 'Very slow', 'Beautiful', 'Extremely dangerous'],
        correctIndex: 0,
        explanation: 'Simultaneous แปลว่า เกิดขึ้นในเวลาเดียวกัน พร้อมกัน'
      }
    ]
  },
  {
    id: 'game-5',
    title: 'วรรณคดีไทยปริศนา: หนีนางผีเสื้อสมุทร',
    creatorName: 'ครูวรรณา อักษรศาสตร์',
    creatorSchool: 'โรงเรียนสุพรรณบุรีวิทยา',
    creatorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=WannaThai',
    subject: 'ภาษาไทย',
    grade: 'ม.3',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    playsCount: 7400,
    rating: 4.9,
    likesCount: 1950,
    isLiked: false,
    expReward: 130,
    coinsReward: 35,
    timePerQuestion: 12,
    description: 'ถอดรหัสคำประพันธ์ วิเคราะห์วรรณคดีพระอภัยมณี ตอน หนีนางผีเสื้อสมุทร ม.3',
    tags: ['วรรณคดี', 'พระอภัยมณี', 'ภาษาไทย', 'ม.3'],
    questions: [
      {
        id: 'g5-q1',
        question: 'ผู้แต่งวรรณคดีเรื่อง "พระอภัยมณี" คือใคร?',
        options: ['สุนทรภู่', 'พระบาทสมเด็จพระพุทธเลิศหล้านภาลัย', 'เจ้าพระยาพระคลัง (หน)', 'ศรีปราชญ์'],
        correctIndex: 0,
        explanation: 'สุนทรภู่ (กวีเอกแห่งรัตนโกสินทร์) เป็นผู้แต่งวรรณคดีเรื่องพระอภัยมณี'
      },
      {
        id: 'g5-q2',
        question: 'ใครเป็นผู้พาพระอภัยมณีและสินสมุทรหนีนางผีเสื้อสมุทรไปยังเกาะแก้วพิสดาร?',
        options: ['นางเงือกและพ่อแม่เงือก', 'ฤาษี', 'สุดสาคร', 'ม้านิลมังกร'],
        correctIndex: 0,
        explanation: 'ครอบครัวเงือก (พ่อเงือก แม่เงือก และนางเงือก) ช่วยพาหนีข้ามมหาสมุทร'
      }
    ]
  }
];

export const MOCK_CREATOR_CONTENTS: CreatorContent[] = [
  {
    id: 'cc-101',
    title: 'คณิตศาสตร์ ม.2: สมการเชิงเส้นตัวแปรเดียวฉบับเข้าใจง่าย',
    type: 'course',
    subject: 'คณิตศาสตร์',
    grade: 'ม.2',
    priceCoins: 0,
    status: 'approved',
    views: 14200,
    studentsEnrolled: 3820,
    rating: 4.9,
    createdDate: '10 ส.ค. 2026',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    creatorName: 'ครูพี่เป้ (ครูรางวัลสมเด็จเจ้าฟ้ามหาจักรี)',
    isBuffetIncluded: true
  },
  {
    id: 'cc-102',
    title: 'Math Speed Arena: สปีดควิซสมการ ม.2',
    type: 'game',
    subject: 'คณิตศาสตร์',
    grade: 'ม.2',
    priceCoins: 0,
    status: 'approved',
    views: 9800,
    studentsEnrolled: 2450,
    rating: 4.8,
    createdDate: '08 ส.ค. 2026',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    creatorName: 'ครูพี่เป้ (ครูรางวัลสมเด็จเจ้าฟ้ามหาจักรี)',
    isBuffetIncluded: true
  },
  {
    id: 'cc-103',
    title: 'ตะลุยโจทย์พีทาโกรัส ม.2 เข้มข้นเข้า ม.4',
    type: 'course',
    subject: 'คณิตศาสตร์',
    grade: 'ม.2',
    priceCoins: 50,
    status: 'pending',
    adminNote: 'รอแอดมินตรวจสอบเนื้อหาคลิปตัวอย่างและไฟล์ PDF',
    views: 120,
    studentsEnrolled: 0,
    rating: 5.0,
    createdDate: '11 ส.ค. 2026',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    creatorName: 'ครูพี่เป้ (ครูรางวัลสมเด็จเจ้าฟ้ามหาจักรี)',
    isBuffetIncluded: true
  },
  {
    id: 'cc-104',
    title: 'Sci-Lab Quest: ตะลุยสังเคราะห์แสง & เซลล์พืช',
    type: 'game',
    subject: 'วิทยาศาสตร์',
    grade: 'ม.1',
    priceCoins: 0,
    status: 'approved',
    views: 8900,
    studentsEnrolled: 1850,
    rating: 4.9,
    createdDate: '05 ส.ค. 2026',
    thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    creatorName: 'ดร.สมชาย ใจดี (สสวท.)',
    isBuffetIncluded: false
  }
];

export const MOCK_CREATOR_BANK_ACCOUNT: BankAccountInfo = {
  bankName: 'ธนาคารกสิกรไทย (KBank)',
  accountNumber: '123-2-89472-1',
  accountName: 'สมชาย ใจดี',
  branchName: 'สาขาสยามพารากอน',
  isVerified: true,
  updatedAt: '01 ส.ค. 2026'
};

export const MOCK_MONTHLY_PAYOUTS: MonthlyPayoutRecord[] = [
  {
    id: 'pay-2026-08',
    monthPeriod: 'สิงหาคม 2026 (รอบปัจจุบัน)',
    payoutDate: '01 ก.ย. 2026',
    courseRevenueThb: 10000,
    donationRevenueThb: 150,
    totalGrossThb: 10150,
    commissionFeeThb: 406, // 4% of 10,150
    platformMaintenanceFeeThb: 203, // 2% of 10,150
    totalDeductionsThb: 609, // 406 + 203
    netPayoutThb: 9541, // 10,150 - 609
    bankName: 'ธนาคารกสิกรไทย (KBank)',
    accountNumber: '123-2-89472-1',
    accountName: 'สมชาย ใจดี',
    status: 'scheduled',
    transactionRef: 'AUTOPAY-20260901-8891'
  },
  {
    id: 'pay-2026-07',
    monthPeriod: 'กรกฎาคม 2026',
    payoutDate: '01 ส.ค. 2026',
    courseRevenueThb: 8500,
    donationRevenueThb: 200,
    totalGrossThb: 8700,
    commissionFeeThb: 348, // 4% of 8,700
    platformMaintenanceFeeThb: 174, // 2% of 8,700
    totalDeductionsThb: 522, // 348 + 174
    netPayoutThb: 8178, // 8,700 - 522
    bankName: 'ธนาคารกสิกรไทย (KBank)',
    accountNumber: '123-2-89472-1',
    accountName: 'สมชาย ใจดี',
    status: 'completed',
    transactionRef: 'AUTOPAY-20260801-4421'
  },
  {
    id: 'pay-2026-06',
    monthPeriod: 'มิถุนายน 2026',
    payoutDate: '01 ก.ค. 2026',
    courseRevenueThb: 6200,
    donationRevenueThb: 100,
    totalGrossThb: 6300,
    commissionFeeThb: 252, // 4% of 6,300
    platformMaintenanceFeeThb: 126, // 2% of 6,300
    totalDeductionsThb: 378, // 252 + 126
    netPayoutThb: 5922, // 6,300 - 378
    bankName: 'ธนาคารกสิกรไทย (KBank)',
    accountNumber: '123-2-89472-1',
    accountName: 'สมชาย ใจดี',
    status: 'completed',
    transactionRef: 'AUTOPAY-20260701-1109'
  }
];

export const MOCK_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wd-2026-001',
    coinsAmount: 500,
    thbAmount: 500,
    commissionThb: 50,
    netThb: 450,
    bankName: 'ธนาคารกสิกรไทย (KBank)',
    accountNumber: '123-4-56789-0',
    accountName: 'สมชาย ใจดี',
    status: 'completed',
    requestedDate: '01 ส.ค. 2026'
  },
  {
    id: 'wd-2026-002',
    coinsAmount: 1200,
    thbAmount: 1200,
    commissionThb: 120,
    netThb: 1080,
    bankName: 'ธนาคารไทยพาณิชย์ (SCB)',
    accountNumber: '987-6-54321-0',
    accountName: 'สมชาย ใจดี',
    status: 'pending',
    requestedDate: '10 ส.ค. 2026'
  }
];

export const MOCK_ADMIN_TICKETS: AdminTicket[] = [
  {
    id: 'tk-101',
    senderName: 'ครูพี่เป้',
    senderRole: 'creator',
    senderEmailOrPhone: 'teacher.pae@eduthai.org',
    subject: 'สอบถามระยะเวลาพิจารณาอนุมัติคอร์สใหม่',
    message: 'สวัสดีครับ ผมได้ส่งคอร์ส "ตะลุยโจทย์พีทาโกรัส" เข้ามารอตรวจสอบ ไม่ทราบว่าปกติใช้เวลาอนุมัติกี่วันครับ?',
    status: 'resolved',
    createdDate: '11 ส.ค. 2026',
    reply: 'ทีมงานแอดมินใช้เวลาตรวจสอบสื่อการสอนประมาณ 24-48 ชั่วโมงทำการครับ ขออภัยในความล่าช้า'
  },
  {
    id: 'tk-102',
    senderName: 'ดร.สมชาย',
    senderRole: 'creator',
    senderEmailOrPhone: '081-999-8888',
    subject: 'ขอเพิ่มระบบอัปโหลดไฟล์วิดีโอระดับ HD 1080p',
    message: 'อยากเสนอแนะเพิ่มขนาดไฟล์วิดีโอที่รองรับสำหรับการสอนคณิตศาสตร์ครับ',
    status: 'open',
    createdDate: '12 ส.ค. 2026'
  }
];

export const MOCK_DONATIONS: DonationRecord[] = [
  {
    id: 'dn-001',
    targetType: 'creator',
    targetName: 'ดร.สมชาย ใจดี (สสวท.)',
    donorName: 'น้องน้ำหวาน ม.2',
    coinsAmount: 50,
    message: 'ขอบคุณคุณครูมากค่ะ เข้าใจวิชาคณิตศาสตร์ขึ้นเยอะเลย!',
    timestamp: '10 นาทีที่แล้ว'
  },
  {
    id: 'dn-002',
    targetType: 'platform',
    targetName: 'โครงการเพื่อการศึกษาเท่าเทียม (EdTech for All)',
    donorName: 'กิตติศักดิ์ พ.',
    coinsAmount: 100,
    message: 'ขอเป็นกำลังใจให้ทีมงานพัฒนาแพลตฟอร์มการศึกษาฟรีดีๆ แบบนี้ต่อไปครับ',
    timestamp: '1 ชั่วโมงที่แล้ว'
  },
  {
    id: 'dn-003',
    targetType: 'creator',
    targetName: 'ครูพี่เป้ วิทย์-คณิต',
    donorName: 'เด็กชายวินัย ม.3',
    coinsAmount: 20,
    message: 'ชีทสรุปสูตรเจ๋งมากครับอาจารย์',
    timestamp: '3 ชั่วโมงที่แล้ว'
  },
  {
    id: 'dn-004',
    targetType: 'creator',
    targetName: 'ดร.สมชาย ใจดี (สสวท.)',
    donorName: 'อนันต์ ท.',
    coinsAmount: 10,
    message: 'ทิปกาแฟให้คุณครูครับ ขอบคุณที่สอนฟรีครับ',
    timestamp: 'เมื่อวานนี้'
  }
];



