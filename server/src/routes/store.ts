import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const items = await prisma.storeItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/purchase', async (req, res) => {
  try {
    const { userId, storeItemId } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const item = await prisma.storeItem.findUnique({ where: { id: storeItemId } });

    if (!user || !item) return res.status(404).json({ error: 'Not found' });
    if (user.storeBalance < item.cost) return res.status(400).json({ error: 'Insufficient balance' });

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { 
          storeBalance: { decrement: item.cost },
          aiQuota: item.type === 'AI_QUESTIONS' ? { increment: 10 } : undefined
        }
      }),
      prisma.purchase.create({
        data: { userId, storeItemId }
      })
    ]);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
