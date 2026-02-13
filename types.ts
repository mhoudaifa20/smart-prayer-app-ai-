export enum AppTab {
  QURAN = 'QURAN',
  HADITH = 'HADITH',
  PRAYER = 'PRAYER',
  QIBLA = 'QIBLA',
  AI = 'AI',
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  translation?: string;
  audio?: string;
}

export interface Hadith {
  id: string;
  book: string;
  chapter: string;
  narrator: string;
  textAr: string;
  textEn: string;
}

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
