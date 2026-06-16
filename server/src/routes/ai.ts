import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.post('/ask', async (req, res) => {
  try {
    const { userId, question } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.aiQuota <= 0) return res.status(403).json({ error: 'Quota exceeded' });

    await prisma.user.update({
      where: { id: userId },
      data: { aiQuota: { decrement: 1 } }
    });

    res.json({ answer: "This is a mocked AI response. You've asked: " + question });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
