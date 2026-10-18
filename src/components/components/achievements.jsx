import React, { useState } from 'react';
import certificate1 from './proj_foto/cert1.png';
import certificate2 from './proj_foto/cert2.jpg';

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const categories = [
    { id: 'all', name: 'Все достижения' }
  ];

  // Заглушка для достижений - ты заменишь их своими
  const achievements = [
    {
      id: 1,
      title: 'Богодарственное письмо',
      description: 'за помощь в разраболтке виртуального ассистента для дня открытых дверей Президентской Академии',
      category: 'certificates',
      image: certificate1,
      date: '2024',
      issuer: 'Президентская Академия',
      credentialId: 'CERT-123456',
      credentialUrl: '#'
    },
    {
      id: 2,
      title: 'Сертификат участника хакатона от Т-банка',
      description: 'Участие в хакатоне по разработке веб-приложений международной олимписады Prod ',
      category: 'awards',
      image: certificate2,
      date: '2024',
      issuer: 'Т-Банк',
      credentialId: 'AWARD-789',
      credentialUrl: '#'
    },
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const openCertificateViewer = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const closeCertificateViewer = () => {
    setSelectedAchievement(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeCertificateViewer();
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'certificates': return '🏆';
      case 'awards': return '🎖️';
      case 'education': return '🎓';
      default: return '🌟';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'certificates': return 'from-blue-500 to-cyan-500';
      case 'awards': return 'from-yellow-500 to-orange-500';
      case 'education': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Мои достижения
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Сертификаты, награды и образовательные milestone в моем профессиональном пути
          </p>
        </div>

        

        {/* Фильтры категорий */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
              } ${selectedCategory === category.id ? getCategoryColor(category.id) : ''}`}
            >
              <span>{getCategoryIcon(category.id)}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Сетка достижений */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Изображение достижения */}
              <div className="relative h-56 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden cursor-pointer" onClick={() => openCertificateViewer(achievement)}>
                 <img 
                  src={achievement.image} 
                  alt={achievement.title}
                  className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-500"
                /> 
                
                {/* Иконка категории */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-600">
                  <span className="text-xl">{getCategoryIcon(achievement.category)}</span>
                </div>

                {/* Градиентный оверлей */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Дата */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-gray-600">
                    {achievement.date}
                  </span>
                </div>

                {/* Оверлей с кнопкой просмотра */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCertificateViewer(achievement);
                    }}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
                  >
                    🔍 Посмотреть сертификат
                  </button>
                </div>
              </div>

              {/* Информация о достижении */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                </div>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {achievement.description}
                </p>
                
                {/* Организация */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🏢</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{achievement.issuer}</div>
                    <div className="text-gray-500 text-xs">ID: {achievement.credentialId}</div>
                  </div>
                </div>
                
                {/* Кнопка просмотра */}
                {achievement.credentialUrl && achievement.credentialUrl !== '#' && (
                  <a
                    href={achievement.credentialUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/50 hover:bg-blue-500/30 transition-colors duration-300 text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Посмотреть
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет достижений */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📚</span>
            <p className="text-gray-400 text-lg">
              Достижения в категории "{categories.find(c => c.id === selectedCategory)?.name}" пока не добавлены
            </p>
          </div>
        )}

        {/* Призыв к действию */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-blue-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Постоянное развитие
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Я постоянно учусь и получаю новые сертификаты, чтобы оставаться в курсе последних технологий 
            и лучших практик в веб-разработке
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-sm">
              📚 Обучение
            </span>
            <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-300 text-sm">
              🚀 Рост
            </span>
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm">
              💡 Инновации
            </span>
          </div>
        </div>
      </div>

      {/* Модальное окно для просмотра сертификата */}
      {selectedAchievement && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeCertificateViewer}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl w-full h-full max-h-[90vh] flex flex-col">
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedAchievement.title}
                </h3>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(selectedAchievement.category)}</span>
                    {selectedAchievement.issuer}
                  </span>
                  <span>•</span>
                  <span>{selectedAchievement.date}</span>
                </div>
              </div>
              <button
                onClick={closeCertificateViewer}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Изображение сертификата */}
            <div className="flex-1 relative flex items-center justify-center bg-white/5 rounded-lg p-4">
              <img 
                src={selectedAchievement.image} 
                alt={selectedAchievement.title}
                className="max-w-full h-[600px] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Информация о сертификате */}
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <p className="text-gray-300 mb-3">{selectedAchievement.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/50">
                    ID: {selectedAchievement.credentialId}
                  </span>
                </div>
                {selectedAchievement.credentialUrl && selectedAchievement.credentialUrl !== '#' && (
                  <a
                    href={selectedAchievement.credentialUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/50 hover:bg-blue-500/30 transition-colors duration-300 text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Открыть оригинал
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Стили для анимации */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Achievements;
