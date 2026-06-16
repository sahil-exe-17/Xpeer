import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: { select: { username: true, avatarUrl: true, currentLevel: true } },
        community: true,
        _count: { select: { answers: true, upvotes: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, authorId, communityId, tags } = req.body;
    const post = await prisma.post.create({
      data: { title, content, authorId, communityId, tags }
    });

    await prisma.user.update({
      where: { id: authorId },
      data: { xp: { increment: 5 } }
    });

    await prisma.xPEvent.create({
      data: { userId: authorId, amount: 5, reason: 'Created a post' }
    });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        author: { select: { username: true, avatarUrl: true, currentLevel: true } },
        community: true,
        answers: {
          include: {
            author: { select: { username: true, currentLevel: true } },
            _count: { select: { upvotes: true } }
          },
          orderBy: { createdAt: 'asc' }
        },
        _count: { select: { answers: true, upvotes: true } }
      }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, authorId } = req.body;
    
    const answer = await prisma.answer.create({
      data: { content, authorId, postId: id }
    });

    // Award +3 XP for answering
    await prisma.user.update({
      where: { id: authorId },
      data: { xp: { increment: 3 } }
    });

    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id/upvote', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Check if already upvoted
    const existing = await prisma.upvote.findFirst({
      where: { postId: id, userId }
    });

    if (existing) {
      return res.status(400).json({ error: 'Already upvoted' });
    }

    const upvote = await prisma.upvote.create({
      data: { postId: id, userId }
    });

    // Award XP to the post author
    const post = await prisma.post.findUnique({ where: { id } });
    if (post && post.authorId !== userId) {
       await prisma.user.update({
         where: { id: post.authorId },
         data: { xp: { increment: 2 } }
       });
    }

    res.json(upvote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
