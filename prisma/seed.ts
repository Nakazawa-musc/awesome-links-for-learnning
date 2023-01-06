import { PrismaClient } from '@prisma/client';
import { links } from '../data/links';
const prisma = new PrismaClient();

// 新しいデータベースレコードを作成する処理。
async function main() {
  await prisma.user.create({
    data: {
      email: `abdelwahab@prisma.io`,
      role: 'ADMIN',
    },
  });

  await prisma.link.createMany({
    data: links,
  });
}

// 実行
// コマンド> npx prisma db seed
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
