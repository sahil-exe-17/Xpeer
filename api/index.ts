import fs from 'fs';
import path from 'path';

// Vercel Serverless read-only filesystem hack
const sourceDb = path.join(__dirname, '../server/prisma/dev.db');
const targetDb = '/tmp/dev.db';

if (!fs.existsSync(targetDb) && fs.existsSync(sourceDb)) {
  fs.copyFileSync(sourceDb, targetDb);
}

import app from '../server/src/app';
export default app;
