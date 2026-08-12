import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

// Gemini AI Initialization
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", hasAiKey: Boolean(apiKey) });
});

// AI Tutor Chat Route
app.post("/api/ai-tutor", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: "โปรดระบุข้อความคำถาม" });
      return;
    }

    if (!aiClient) {
      // Smart fallback response if no GEMINI_API_KEY is active
      const fallbackReply = generateFallbackAiReply(message);
      res.json({ reply: fallbackReply, isFallback: true });
      return;
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        ...(history || []).map((h: { sender: string; text: string }) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `คุณคือ "น้อง AI ครูผู้ช่วย" ประจำแพลตฟอร์ม EduThai AI 
บริบทโครงการ: EduThai AI เป็นนวัตกรรม EdTech ภายใต้ "โครงการ JUMP TH (JUMP Thailand)" ประจำปีนี้ มุ่งเน้นสร้างความเท่าเทียมทางการศึกษาสำหรับนักเรียนระดับชั้น ม.1 - ม.3 ทั่วประเทศไทย
สโลแกนโครงการ: "ปลดล็อกการเรียนรู้เท่าเทียม ด้วย AI Personalization & Gamification - เรียนฟรีไม่มีค่าใช้จ่าย! แพลตฟอร์มปรับเนื้อหาและแบบทดสอบตามความถนัดของนักเรียนรายบุคคล พร้อมสะสม EXP เหรียญรางวัล และมีครูผู้ช่วย AI คอยตอบข้อสงสัย 24 ชม."

หน้าที่ของคุณ:
1. ตอบคำถามการเรียนในวิชา คณิตศาสตร์, วิทยาศาสตร์, ภาษาอังกฤษ, ภาษาไทย, เทคโนโลยี/Coding, และสังคมศึกษา
2. หากถูกถามเกี่ยวกับโครงการ, JUMP TH, เกี่ยวกับเรา หรือความเป็นมา ให้เล่าข้อมูลโครงการ JUMP TH เพื่อความเท่าเทียมทางการศึกษา ม.1 - ม.3 อย่างภาคภูมิใจ
3. อธิบายอย่างเป็นขั้นตอน ย่อยเรื่องยากให้เข้าใจง่าย เหมาะสมกับวัย 12-15 ปี
4. ใช้ภาษาไทยที่สุภาพ เป็นกันเอง ให้กำลังใจ ชวนคิด และใส่อีโมจิน่ารักประกอบ
5. ตอบให้กระชับ ไม่ยาวเกินไป (ไม่เกิน 200-300 คำ)
6. หากเป็นโจทย์คำนวณ ให้แสดงวิธีทำสั้นๆ เป็นบรรทัดๆ`,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "ขออภัยครับ น้อง AI กำลังประมวลผลคำตอบอยู่ โปรดลองถามใหม่อีกครั้งนะครับ 🤖✨";
    res.json({ reply: replyText });
  } catch (error) {
    console.error("AI Tutor Error:", error);
    const fallbackReply = generateFallbackAiReply(req.body?.message || "");
    res.json({ reply: fallbackReply, isFallback: true });
  }
});

function generateFallbackAiReply(message: string): string {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('jump') || lowerMsg.includes('โครงการ') || lowerMsg.includes('เกี่ยวกับ')) {
    return "🚀 **โครงการ EdTech เพื่อความเท่าเทียมทางการศึกษา ม.1 - ม.3 (โครงการ JUMP TH ปีนี้)**\n\nEduThai AI มุ่งเน้นปลดล็อกการเรียนรู้เท่าเทียม ด้วย **AI Personalization & Gamification**\n✨ **เรียนฟรีไม่มีค่าใช้จ่าย!** แพลตฟอร์มปรับเนื้อหาและแบบทดสอบตามความถนัดของนักเรียนรายบุคคล พร้อมสะสม EXP เหรียญรางวัล และมีครูผู้ช่วย AI คอยตอบข้อสงสัยตลอด 24 ชั่วโมงครับ! 🌟";
  }
  if (lowerMsg.includes('สมการ') || lowerMsg.includes('คณิต')) {
    return "💡 **หลักการย้ายข้างสมการง่ายๆ จากน้อง AI:**\n1. ถ้าฝั่งหนึ่งบวกอยู่ ให้ย้ายไป **ลบ**\n2. ถ้าฝั่งหนึ่งคูณอยู่ ให้ย้ายไป **หาร**\n\n*ตัวอย่าง:* 2x + 4 = 10\n-> ย้าย 4 ไปลบ: 2x = 10 - 4 = 6\n-> ย้าย 2 ไปหาร: x = 6 / 2 = 3 ครับผม! 🎯✨";
  }
  if (lowerMsg.includes('สังเคราะห์ด้วยแสง') || lowerMsg.includes('วิทย์') || lowerMsg.includes('พืช')) {
    return "🌿 **กระบวนการสังเคราะห์ด้วยแสง (Photosynthesis):**\nพืชใช้ **แสงแดด + น้ำ (H2O) + แก๊สคาร์บอนไดออกไซด์ (CO2)** โดยมีคลอโรฟิลล์ในใบเป็นตัวรับแสง ผลลัพธ์ที่ได้คือ **น้ำตาลกลูโคส (C6H12O6)** สำหรับเลี้ยงต้นพืช และปล่อย **แก๊สออกซิเจน (O2)** ออกมาให้เราหายใจครับ! ☀️🍃";
  }
  if (lowerMsg.includes('ภาษาอังกฤษ') || lowerMsg.includes('tense') || lowerMsg.includes('english')) {
    return "🇬🇧 **เคล็ดลับการจำ Tense ยอดฮิต:**\n- **Past Simple** (S + V.2): พูดถึงสิ่งที่จบลงแล้วในอดีต (เช่น *I ate rice yesterday.*)\n- **Present Perfect** (S + have/has + V.3): พูดถึงเหตุการณ์ที่เกิดขึ้นตั้งแต่อดีตและดำเนินถึงปัจจุบัน (เช่น *I have lived here for 3 years.*) 📝✨";
  }
  return `สวัสดีครับพี่! น้อง AI ยินดีช่วยเหลือคำถาม "${message}" นะครับ 🤖\n\nน้อง AI แนะนำให้ลองเข้าเรียนในบทเรียนวิดีโอเพื่อดูคำอธิบายภาพเคลื่อนไหว หรือลองทำ Adaptive Quiz เพื่อทดสอบความเข้าใจสะสมเหรียญได้เลยครับ! มีข้อสงสัยเพิ่มเติมถามน้อง AI ได้ตลอด 24 ชั่วโมงเลยนะครับ 🌟`;
}

export default app;
