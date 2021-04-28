import type {PrismaClient} from '@prisma/client';
import countryLanguage from 'country-language';

export function main(prisma: PrismaClient) {
  return Promise.all(
    countryLanguage.getLanguages().map((lang) => {
      return prisma.language.upsert({
        where: {code: lang.iso639_1},
        update: {
          code: lang.iso639_1,
          name: lang.name,
          nativeName: lang.nativeName,
          direction: (lang.direction || 'LTR').toLowerCase() as 'rtl' | 'ltr',
        },
        create: {
          code: lang.iso639_1,
          name: lang.name,
          nativeName: lang.nativeName,
          direction: (lang.direction || 'LTR').toLowerCase() as 'rtl' | 'ltr',
        },
      });
    })
  );
}
