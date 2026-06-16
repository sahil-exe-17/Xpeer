import { Router } from 'express';
import prisma from '../lib/prisma';
import Groq from 'groq-sdk';

const router = Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/ask', async (req, res) => {
  try {
    const { userId, question } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.aiQuota <= 0) return res.status(403).json({ error: 'Quota exceeded' });

    await prisma.user.update({
      where: { id: userId },
      data: { aiQuota: { decrement: 1 } }
    });

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: question }],
      model: 'llama3-8b-8192',
    });

    const answer = completion.choices[0]?.message?.content || "No response received.";

    res.json({ answer });
  } catch (error) {
    console.error('Groq Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
