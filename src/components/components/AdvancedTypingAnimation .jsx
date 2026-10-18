import React, { useState, useEffect, useRef } from 'react';
import moroz from './moroz.jpg';
import Projects from './projects';
import Achievements from './achievements';
import Contacts from './contacts';

const AdvancedTypingAnimation = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const texts = useRef([
    'Moroz_314',
    'React Developer',
    'Frontend Engineer',
  ]);

  useEffect(() => {
    if (isPaused) return;

    const currentText = texts.current[currentIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.current.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, isPaused]);

  return (
    <>
      {/* Hero Section с полноэкранной фотографией */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Фоновое изображение */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
            {/* Замени этот div на тег img с твоей фотографией */}
            <img 
              src={moroz} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>

        {/* Анимация текста поверх изображения */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div 
            className="text-center p-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 font-mono drop-shadow-2xl">
              Я {displayText}
              <span className={`ml-1 ${!isPaused ? 'animate-pulse' : ''}`}>|</span>
            </h1>
            
            {/* Дополнительный текст */}
            <p className="text-xl md:text-2xl text-gray-200 drop-shadow-lg max-w-2xl mx-auto">
              Создаю современные веб-приложения с помощью React и передовых технологий
            </p>

            {/* Кнопка для скролла вниз */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg 
                className="w-8 h-8 text-white drop-shadow-lg" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Секция "О себе" */}
      <section id='about' className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Обо мне
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Текст о себе */}
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Я — fullstack-разработчик, специализирующийся на экосистеме JavaScript. Моя экспертиза охватывает весь цикл разработки: от создания отзывовых пользовательских интерфейсов на React.js с применением Tailwind CSS до построения серверной логики и API на Node.js. Дополнительно разрабатываю функциональных Telegram-ботов и автоматизирую процессы. В качестве основной базы данных использую MongoDB. Нацелен на решение бизнес-задач через эффективный и поддерживаемый код.
              </p>
              

              
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="transition-[10] hover:shadow-blue-500/50 shadow-lg px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-sm">
                  React
                </span>
                <span className="transition-[10] hover:shadow-green-500/50 shadow-lg px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-300 text-sm">
                  JavaScript
                </span>
                <span className="transition-[10] hover:shadow-purple-500/50 shadow-lg px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm">
                  TypeScript
                </span>
                <span className="transition-[10] hover:shadow-cyan-500/50 shadow-lg px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm">
                  Tailwind CSS
                </span>
              </div>
            </div>
            

            {/* Дополнительная информация или изображение */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      <Projects />
      <Achievements />
      <Contacts />
    </>
  );
};

export default AdvancedTypingAnimation;