import React, { useState, useEffect } from 'react';
import { AppTab } from './types';
import { BookOpen, Clock, Compass, MessageCircle, Moon, Settings, Sun, Book } from 'lucide-react';
import QuranPage from './pages/QuranPage';
import HadithPage from './pages/HadithPage';
import PrayerPage from './pages/PrayerPage';
import QiblaPage from './pages/QiblaPage';
import AiChatPage from './pages/AiChatPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.PRAYER);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.QURAN:
        return <QuranPage />;
      case AppTab.HADITH:
        return <HadithPage />;
      case AppTab.PRAYER:
        return <PrayerPage />;
      case AppTab.QIBLA:
        return <QiblaPage />;
      case AppTab.AI:
        return <AiChatPage />;
      default:
        return <PrayerPage />;
    }
  };

  const NavItem = ({ tab, icon: Icon, label }: { tab: AppTab; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-colors duration-200 ${
        activeTab === tab 
          ? 'text-primary-600 dark:text-primary-400' 
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      }`}
    >
      <Icon size={24} strokeWidth={activeTab === tab ? 2.5 : 2} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  );

  return (
    <div className={`h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      {/* Top Bar - Simplified for mobile feel */}
      <header className="px-4 py-3 bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <BookOpen className="text-white" size={18} />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-gray-800 dark:text-white">Smart Prayer AI</h1>
        </div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth no-scrollbar">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe pt-1">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <NavItem tab={AppTab.QURAN} icon={Book} label="Quran" />
          <NavItem tab={AppTab.HADITH} icon={BookOpen} label="Hadith" />
          <div className="relative -top-5">
            <button 
              onClick={() => setActiveTab(AppTab.PRAYER)}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 dark:border-gray-900 transition-transform ${
                activeTab === AppTab.PRAYER 
                ? 'bg-primary-600 text-white scale-110' 
                : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              <Clock size={28} />
            </button>
          </div>
          <NavItem tab={AppTab.QIBLA} icon={Compass} label="Qibla" />
          <NavItem tab={AppTab.AI} icon={MessageCircle} label="AI Chat" />
        </div>
      </nav>
    </div>
  );
}
