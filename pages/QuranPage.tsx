import React, { useState } from 'react';
import { Search, ChevronRight, PlayCircle, PauseCircle } from 'lucide-react';
import { MOCK_SURAHS, MOCK_AYAHS_FATIHA } from '../constants';
import { Surah } from '../types';

export default function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const filteredSurahs = MOCK_SURAHS.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.includes(searchQuery)
  );

  const handleSurahClick = (surah: Surah) => {
    setSelectedSurah(surah);
  };

  const toggleAudio = (ayahNum: number) => {
    if (isPlaying === ayahNum) {
      setIsPlaying(null);
    } else {
      setIsPlaying(ayahNum);
    }
  };

  if (selectedSurah) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10">
          <button 
            onClick={() => setSelectedSurah(null)}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <ChevronRight className="rotate-180" size={24} />
          </button>
          <div className="ml-2 flex-1 text-center pr-10">
            <h2 className="font-bold text-lg dark:text-white">{selectedSurah.englishName}</h2>
            <p className="text-xs text-gray-500">{selectedSurah.revelationType} • {selectedSurah.numberOfAyahs} Ayahs</p>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Bismillah */}
          <div className="flex justify-center py-4">
             <span className="font-arabic text-2xl text-gray-800 dark:text-gray-200">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</span>
          </div>

          {/* Render Mock Ayahs - In real app, fetch ayahs based on Surah ID */}
          {(selectedSurah.number === 1 ? MOCK_AYAHS_FATIHA : []).length > 0 ? (
             MOCK_AYAHS_FATIHA.map((ayah) => (
              <div key={ayah.number} className="border-b border-gray-50 dark:border-gray-800 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold px-2 py-1 rounded-md">
                    {selectedSurah.number}:{ayah.numberInSurah}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleAudio(ayah.number)}
                      className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {isPlaying === ayah.number ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                    </button>
                  </div>
                </div>
                
                <p className="text-right font-arabic text-3xl leading-loose text-gray-800 dark:text-gray-100 mb-4 dir-rtl" dir="rtl">
                  {ayah.text}
                </p>
                <p className="text-left text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                  {ayah.translation}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>Ayah data for this Surah is not loaded in this demo.</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary-50 dark:bg-gray-800 text-primary-600 rounded-lg text-sm"
                onClick={() => setSelectedSurah(null)}
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1 dark:text-white">Quran</h2>
        <p className="text-gray-500 text-sm">Read and listen to the Holy Quran</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search Surah by name..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filteredSurahs.map((surah) => (
          <div 
            key={surah.number}
            onClick={() => handleSurahClick(surah)}
            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-primary-200 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-gray-700 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm relative">
              <div className="absolute inset-0 border-2 border-primary-200 dark:border-gray-600 rounded-full transform rotate-45 scale-75"></div>
              {surah.number}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{surah.englishName}</h3>
              <p className="text-xs text-gray-500">{surah.englishNameTranslation}</p>
            </div>
            <div className="text-right">
              <span className="font-arabic text-lg text-gray-800 dark:text-gray-200">{surah.name}</span>
              <p className="text-[10px] text-gray-400">{surah.numberOfAyahs} Ayahs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
