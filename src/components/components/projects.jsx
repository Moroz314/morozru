import React, { useState } from 'react';
import t_p_1 from './proj_foto/t-p-1.png';
import t_p_2 from './proj_foto/t-p-2.png';
import t_p_3 from './proj_foto/t-p-3.png';
import t_p_4 from './proj_foto/t-p-4.png';
import b_r_1 from './proj_foto/b-r-1.jpg';
import b_r_2 from './proj_foto/b-r-2.jpg';
import p_r_1 from './proj_foto/p-r-1.jpg';
import p_r_2 from './proj_foto/p-r-2.jpg';
import p_r_3 from './proj_foto/p-r-3.jpg';
import r_n_1 from './proj_foto/r-n-1.png';
import r_n_2 from './proj_foto/r-n-2.png';
import r_n_3 from './proj_foto/r-n-3.png';
import r_n_4 from './proj_foto/r-n-4.png';
import r_n_5 from './proj_foto/r-n-5.png';
import s_n_p_1 from './proj_foto/s-n-p-1.png';
import s_n_p_2 from './proj_foto/s-n-p-2.png';
import s_n_p_3 from './proj_foto/s-n-p-3.png';
import s_n_p_4 from './proj_foto/s-n-p-4.png';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: 'all', name: 'Все проекты' },
    { id: 'web', name: 'Веб-приложения' },
    { id: 'mobile', name: 'Мобильные' },
    { id: 'design', name: 'Дизайн' },
    { id: 'telegram bot', name: 'Telegram боты' }
  ];

  // Заглушка для проектов - ты заменишь их своими
  const projects = [
    {
      id: 1,
      title: 'T-Products',
      description: 'Единая корзина для заказов из разных супермаркетов. Проект разработан на хакатоне от Т-Банка.',
      category: 'web',
      images: [
        t_p_1,
        t_p_2, 
        t_p_3,
        t_p_4
      ],
      technologies: ['React', 'Python'],
      github: 'https://github.com/Moroz314/T-Products',
    },
    {
      id: 2,
      title: 'COLD NEWS',
      description: 'это мощный Telegram бот, который использует искусственный интеллект для автоматической классификации новостей из ваших Telegram каналов. Больше не нужно manually просматривать десятки каналов - бот сам отсортирует новости по вашим темам и пришлет только то, что действительно важно для вас.',
      category: 'telegram bot',
      images: [
        b_r_1,
        b_r_2
      ],
      technologies: ['JavaScript', 'Node.js', 'Telegram Bot API'],
      github: 'https://github.com/Moroz314/cold_news',
    },
    {
      id: 3,
      title: 'BOT_APPLICANT',
      description: 'это Telegram бот, разработаный для дня открытых дверей Президентской Академии',
      category: 'telegram bot',
      images: [
        p_r_1,
        p_r_2,
        p_r_3
      ],
      technologies: ['JavaScript', 'Node.js', 'Telegram Bot API'],
      github: 'https://github.com/Moroz314/BOT_APPLICANT',
    },
    {
      id: 4,
      title: 'app_scholl_react_native',
      description: 'Школьный проект: Приложение "Форум 587"',
      category: 'mobile',
      images: [
        r_n_1,
        r_n_2,
        r_n_3,
        r_n_4,
        r_n_5
      ],
      technologies: ['React Native', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/Moroz314/app_scholl_react_native',
    },
    {
      id: 5,
      title: 'Student',
      description: '(НАХОДИСЯ В РАЗРАБОТКЕ) Единая платформа для студентов, где они могут найти команду для учебных, научных и исследовательских проектов и эффективно управлять ими внутри системы.',
      category: 'web',
      images: [
        s_n_p_1,
        s_n_p_2,
        s_n_p_3,
        s_n_p_4
      ],
      technologies: ['React.js', 'PostgreSQL', 'WebSockets', 'GitHub API', 'AI-микросервисы'],
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const openProjectGallery = (project, imageIndex = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <>
      <section id='projects' className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Мои проекты
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Здесь представлены мои лучшие работы и проекты, над которыми я работал
            </p>
          </div>

          {/* Фильтры категорий */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Сетка проектов */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Галерея изображений */}
                <div className="relative h-64 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
                  {/* Основное изображение */}
                  <div 
                    className="w-full h-full cursor-pointer"
                    onClick={() => openProjectGallery(project, 0)}
                  >
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Индикатор количества изображений */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm">
                    {project.images.length} фото
                  </div>

                  {/* Навигация по изображениям */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {project.images.slice(0, 3).map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectGallery(project, imgIndex);
                          }}
                          className="w-2 h-2 bg-white/60 rounded-full hover:bg-white transition-colors duration-200"
                        />
                      ))}
                      {project.images.length > 3 && (
                        <span className="text-white text-xs px-2">+{project.images.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Оверлей с кнопками */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openProjectGallery(project, 0)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
                    >
                      📸 Смотреть галерею
                    </button>
                  </div>
                </div>

                {/* Информация о проекте */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Технологии */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Кнопки действий */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex-1 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-center flex items-center justify-center gap-2 border border-blue-500/50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Сообщение если нет проектов */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Проекты в категории "{categories.find(c => c.id === selectedCategory)?.name}" пока не добавлены
              </p>
            </div>
          )}

          
        </div>
      </section>

      {/* Модальное окно галереи */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeGallery}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-6xl w-full h-full max-h-[90vh] flex flex-col">
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">
                {selectedProject.title}
              </h3>
              <button
                onClick={closeGallery}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Галерея */}
            <div className="flex-1 relative flex items-center justify-center">
              {/* Кнопка навигации влево */}
              {selectedProject.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 z-10 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Изображение */}
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="relative max-w-full max-h-full bg-gray-900/30 rounded-xl p-2 backdrop-blur-sm">
                  <img 
                    src={selectedProject.images[currentImageIndex]} 
                    alt={`${selectedProject.title} - Изображение ${currentImageIndex + 1}`}
                    className="max-w-full h-[400px] object-contain rounded-lg shadow-2xl"
                  
                  />
                  {/* Индикатор загрузки */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                </div>
              </div>

              {/* Кнопка навигации вправо */}
              {selectedProject.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 z-10 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Навигация по миниатюрам */}
            {selectedProject.images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {selectedProject.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'border-blue-500 scale-110' 
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
                      <img 
                        src={image} 
                        alt={`Миниатюра ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Информация о проекте */}
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <p className="text-gray-300 mb-2">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/50"
                  >
                    {tech}
                  </span>
                ))}
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Projects;