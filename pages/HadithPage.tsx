import React, { useState } from 'react';
import { Search, Book } from 'lucide-react';
import { MOCK_HADITHS } from '../constants';

export default function HadithPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHadiths = MOCK_HADITHS.filter(h => 
    h.textEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
    h.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1 dark:text-white">Hadith</h2>
        <p className="text-gray-500 text-sm">Sahih Bukhari & Muslim Collection</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search for a topic or narrator..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredHadiths.map((hadith) => (
          <div key={hadith.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded">
                  {hadith.book}
                </span>
                <span className="text-xs text-gray-500">{hadith.chapter}</span>
             </div>
             
             <div className="py-2">
                <p className="font-arabic text-xl leading-loose text-right text-gray-800 dark:text-gray-100 dir-rtl mb-3" dir="rtl">
                  {hadith.textAr}
                </p>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {hadith.textEn}
                </p>
             </div>

             <div className="flex items-center gap-2 pt-2 border-t border-gray-50 dark:border-gray-700 mt-1">
                <Book size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Narrated by: {hadith.narrator}</span>
             </div>
          </div>
        ))}

        {filteredHadiths.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>No Hadiths found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
