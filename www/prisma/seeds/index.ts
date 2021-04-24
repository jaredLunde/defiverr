import {PrismaClient} from '@prisma/client';

async function main() {
  console.log(
    `Seeding database in "${process.env.NODE_ENV || 'development'}" environment`
  );

  const prisma = new PrismaClient();
  const language = await import('./language');
  await language.main(prisma);
  console.log('✅ Seeded Language');
}

main().then(() => process.exit(0));
