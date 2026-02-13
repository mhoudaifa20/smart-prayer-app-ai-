import { Surah, Hadith } from "./types";

export const MOCK_SURAHS: Surah[] = [
  { number: 1, name: "سُورَةُ ٱلْفَاتِحَةِ", englishName: "Al-Fatiha", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "سُورَةُ البَقَرَةِ", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 36, name: "سُورَةُ يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 67, name: "سُورَةُ الْمُلْكِ", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 112, name: "سُورَةُ الْإِخْلَاصِ", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 113, name: "سُورَةُ الْفَلَقِ", englishName: "Al-Falaq", englishNameTranslation: "The Dawn", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 114, name: "سُورَةُ النَّاسِ", englishName: "An-Nas", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan" },
];

export const MOCK_AYAHS_FATIHA: any[] = [
  { number: 1, text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", numberInSurah: 1, translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
  { number: 2, text: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", numberInSurah: 2, translation: "[All] praise is [due] to Allah, Lord of the worlds -" },
  { number: 3, text: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", numberInSurah: 3, translation: "The Entirely Merciful, the Especially Merciful," },
  { number: 4, text: "مَـٰلِكِ يَوْمِ ٱلدِّينِ", numberInSurah: 4, translation: "Sovereign of the Day of Recompense." },
  { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", numberInSurah: 5, translation: "It is You we worship and You we ask for help." },
  { number: 6, text: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", numberInSurah: 6, translation: "Guide us to the straight path -" },
  { number: 7, text: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", numberInSurah: 7, translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray." },
];

export const MOCK_HADITHS: Hadith[] = [
  {
    id: "1",
    book: "Sahih Bukhari",
    chapter: "Revelation",
    narrator: "Umar bin Al-Khattab",
    textAr: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    textEn: "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended."
  },
  {
    id: "2",
    book: "Sahih Muslim",
    chapter: "Faith",
    narrator: "Abu Huraira",
    textAr: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    textEn: "He who believes in Allah and the Last Day must either speak good or remain silent."
  }
];
