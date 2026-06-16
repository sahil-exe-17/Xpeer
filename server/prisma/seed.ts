import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.post.deleteMany();
  await prisma.community.deleteMany();
  await prisma.storeItem.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding Demo Users...');
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@xpeer.edu',
      passwordHash,
      xp: 1500,
      currentLevel: 5,
      storeBalance: 500
    }
  });

  const demoUser = await prisma.user.create({
    data: {
      username: 'demo_scholar',
      email: 'demo@xpeer.edu',
      passwordHash,
      xp: 350,
      currentLevel: 2,
      storeBalance: 100
    }
  });

  console.log('Seeding Communities...');
  const comm1 = await prisma.community.create({
    data: {
      name: 'Web Development',
      description: 'Discuss React, Node, and modern web architectures.',
      category: 'Coding'
    }
  });

  const comm2 = await prisma.community.create({
    data: {
      name: 'Algorithms & Data Structures',
      description: 'Prep for interviews and discuss efficient solutions.',
      category: 'Exams'
    }
  });

  const comm3 = await prisma.community.create({
    data: {
      name: 'AI Research',
      description: 'The latest in LLMs, neural networks, and ML.',
      category: 'AI Features'
    }
  });

  console.log('Seeding Posts...');
  await prisma.post.create({
    data: {
      title: 'How to implement JWT Auth in Express?',
      content: 'I am struggling with refresh tokens. Any best practices for securely storing them on the client?',
      authorId: demoUser.id,
      communityId: comm1.id,
      tags: 'jwt,express,security'
    }
  });

  await prisma.post.create({
    data: {
      title: 'Dynamic Programming approach to Knapsack',
      content: 'Can someone explain the space optimization trick for the 0/1 Knapsack problem?',
      authorId: demoUser.id,
      communityId: comm2.id,
      tags: 'algorithms,dp'
    }
  });

  await prisma.post.create({
    data: {
      title: 'Welcome to the Nexus',
      content: 'We are thrilled to launch the XpeeR platform. Use your AI Quota wisely and engage with the community to level up!',
      authorId: admin.id,
      communityId: comm1.id,
      tags: 'announcement',
      isPinned: true
    }
  });

  console.log('Seeding Store Items...');
  await prisma.storeItem.createMany({
    data: [
      {
        name: 'Pro Avatar Frame',
        description: 'A glowing gold ring to wrap around your avatar.',
        cost: 500,
        type: 'FRAME'
      },
      {
        name: 'Bonus AI Credits',
        description: 'Instantly adds 10 queries to your AI Quota.',
        cost: 200,
        type: 'AI_QUESTIONS'
      },
      {
        name: 'Scholar Badge',
        description: 'Display your dedication with a unique profile badge.',
        cost: 1000,
        type: 'BADGE'
      }
    ]
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
