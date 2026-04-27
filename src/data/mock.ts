import type { Project, SubProject, Task, Client, Material, CalendarEvent, Site, Notification } from '@/types';

export const projects: Project[] = [
  { id: 'proj-1', name: 'Дринкит', status: 'active', deadline: '2026-05-15', summary: 'Кофейня: сбор БЗ, презентация', members: ['Алексей', 'Мария'], taskCount: 12, clientId: 'client-9', color: '#FF6B35' },
  { id: 'proj-2', name: 'РТТП', status: 'active', deadline: '2026-06-01', summary: 'ERP, опросы, отчеты по логистике и импорту', members: ['Алексей', 'Иван', 'Ольга'], taskCount: 18, color: '#4F46E5' },
  { id: 'proj-3', name: 'Веб-сайт', status: 'active', deadline: '2026-05-05', summary: 'Дизайн, тексты, backend, frontend', members: ['Мария', 'Иван'], taskCount: 24, color: '#10B981' },
  { id: 'proj-4', name: 'Общий опросник', status: 'on-hold', deadline: '2026-07-10', summary: 'Универсальный опросник для клиентов', members: ['Ольга'], taskCount: 5, color: '#F59E0B' },
];

export const subProjects: SubProject[] = [
  { id: 'sub-1', projectId: 'proj-1', name: 'Сбор БЗ', status: 'active', summary: 'Сбор базы знаний по Дринкит', members: ['Алексей'], taskCount: 7, deadline: '2026-05-10' },
  { id: 'sub-2', projectId: 'proj-1', name: 'Презентация', status: 'active', summary: 'Подготовка презентации', members: ['Мария'], taskCount: 5, deadline: '2026-05-12' },
  { id: 'sub-3', projectId: 'proj-2', name: 'Демо ERP', status: 'active', summary: 'Демонстрация ERP-системы', members: ['Алексей', 'Иван'], taskCount: 6, deadline: '2026-05-20' },
  { id: 'sub-4', projectId: 'proj-2', name: 'Кастомный опрос', status: 'active', summary: 'Разработка кастомного опроса', members: ['Ольга'], taskCount: 4, deadline: '2026-05-25' },
  { id: 'sub-5', projectId: 'proj-2', name: 'Отчет по логистике', status: 'active', summary: 'Анализ логистики РФ', members: ['Иван'], taskCount: 5, deadline: '2026-06-01' },
  { id: 'sub-6', projectId: 'proj-2', name: 'Отчет по импорту из ЕС', status: 'on-hold', summary: 'Импорт товаров из ЕС', members: ['Алексей'], taskCount: 3, deadline: '2026-06-15' },
  { id: 'sub-7', projectId: 'proj-3', name: 'Дизайн', status: 'active', summary: 'UI/UX дизайн сайта', members: ['Мария'], taskCount: 8, deadline: '2026-04-30' },
  { id: 'sub-8', projectId: 'proj-3', name: 'Тексты', status: 'active', summary: 'Копирайтинг для всех страниц', members: ['Ольга'], taskCount: 6, deadline: '2026-05-02' },
  { id: 'sub-9', projectId: 'proj-3', name: 'Backend', status: 'active', summary: 'API и серверная часть', members: ['Иван'], taskCount: 5, deadline: '2026-05-04' },
  { id: 'sub-10', projectId: 'proj-3', name: 'Frontend', status: 'active', summary: 'React + TypeScript клиент', members: ['Алексей', 'Мария'], taskCount: 5, deadline: '2026-05-05' },
];

export const tasks: Task[] = [
  { id: 'KAN-01', title: 'Сверстать главную страницу', type: 'task', status: 'in-progress', priority: 'high', deadline: '2026-04-28', assignee: 'Алексей', projectId: 'proj-3', subProjectId: 'sub-10', description: 'Верстка по макету Figma', tags: ['frontend', 'urgent'], subtasks: [{ id: 'st1', title: 'Header', done: true }, { id: 'st2', title: 'Hero section', done: false }], comments: [], attachments: [], startDate: '2026-04-25', author: 'Мария' },
  { id: 'KAN-02', title: 'Написать API для формы', type: 'feature', status: 'todo', priority: 'high', deadline: '2026-04-30', assignee: 'Иван', projectId: 'proj-3', subProjectId: 'sub-9', description: 'Обработка заявки с сайта', tags: ['backend', 'api'], subtasks: [], comments: [], attachments: [], startDate: '2026-04-29', author: 'Алексей' },
  { id: 'KAN-03', title: 'Доделать раздел про сбыт в РФ', type: 'task', status: 'review', priority: 'medium', deadline: '2026-04-27', assignee: 'Иван', projectId: 'proj-2', subProjectId: 'sub-5', description: 'Добавить данные по сбытовым каналам', tags: ['report'], subtasks: [], comments: [], attachments: [], startDate: '2026-04-26', author: 'Алексей' },
  { id: 'KAN-04', title: 'Изучить процесс логистики', type: 'task', status: 'in-progress', priority: 'medium', deadline: '2026-04-29', assignee: 'Ольга', projectId: 'proj-2', subProjectId: 'sub-5', description: 'Анализ текущих логистических процессов', tags: ['research'], subtasks: [], comments: [], attachments: [], startDate: '2026-04-26', author: 'Иван' },
  { id: 'KAN-05', title: 'Скопировать 50 статей из БЗ', type: 'task', status: 'todo', priority: 'low', deadline: '2026-04-30', assignee: 'Мария', projectId: 'proj-1', subProjectId: 'sub-1', description: 'Перенос статей в новую базу', tags: ['content'], subtasks: [], comments: [], attachments: [], startDate: '2026-04-27', author: 'Алексей' },
  { id: 'KAN-06', title: 'Создать презентацию для Дринкит', type: 'task', status: 'backlog', priority: 'medium', deadline: '2026-05-12', assignee: 'Мария', projectId: 'proj-1', subProjectId: 'sub-2', description: 'Pitch deck 10 слайдов', tags: ['design'], subtasks: [], comments: [], attachments: [], startDate: '2026-05-05', author: 'Алексей' },
  { id: 'KAN-07', title: 'Интеграция с CRM', type: 'feature', status: 'backlog', priority: 'high', deadline: '2026-05-20', assignee: 'Иван', projectId: 'proj-2', subProjectId: 'sub-3', description: 'Синхронизация с AmoCRM', tags: ['integration'], subtasks: [], comments: [], attachments: [], startDate: '2026-05-15', author: 'Алексей' },
  { id: 'KAN-08', title: 'Настроить CI/CD', type: 'improvement', status: 'done', priority: 'medium', deadline: '2026-04-20', assignee: 'Алексей', projectId: 'proj-3', subProjectId: 'sub-9', description: 'GitHub Actions', tags: ['devops'], subtasks: [], comments: [], attachments: [], startDate: '2026-04-15', author: 'Иван' },
  { id: 'KAN-09', title: 'SEO-аудит текстов', type: 'task', status: 'todo', priority: 'low', deadline: '2026-05-03', assignee: 'Ольга', projectId: 'proj-3', subProjectId: 'sub-8', description: 'Проверить мета-теги и структуру', tags: ['seo'], subtasks: [], comments: [], attachments: [], startDate: '2026-05-01', author: 'Мария' },
  { id: 'KAN-10', title: 'Адаптив для мобильных', type: 'bug', status: 'in-progress', priority: 'urgent', deadline: '2026-04-29', assignee: 'Мария', projectId: 'proj-3', subProjectId: 'sub-10', description: 'Правки по мобильной верстке', tags: ['mobile', 'urgent'], subtasks: [], comments: [], attachments: [], startDate: '2026-04-27', author: 'Алексей' },
  { id: 'KAN-11', title: 'Демо-данные для ERP', type: 'task', status: 'done', priority: 'medium', deadline: '2026-04-22', assignee: 'Алексей', projectId: 'proj-2', subProjectId: 'sub-3', description: 'Моковые данные для презентации', tags: ['demo'], subtasks: [], comments: [], attachments: [], startDate: '2026-04-20', author: 'Иван' },
  { id: 'KAN-12', title: 'Форма обратной связи', type: 'feature', status: 'todo', priority: 'medium', deadline: '2026-05-01', assignee: 'Иван', projectId: 'proj-3', subProjectId: 'sub-9', description: 'Форма с валидацией', tags: ['form'], subtasks: [], comments: [], attachments: [], startDate: '2026-04-28', author: 'Мария' },
];

export const clients: Client[] = [
  { id: 'client-1', name: 'Павел Черемных', company: 'neuro agency', businessType: 'Маркетинг Агентство', status: 'ghosted', details: 'не ответил', projects: [], notes: '', materials: [] },
  { id: 'client-2', name: 'Амин Кипкеев', company: 'ТеДо', businessType: 'Консалтинг', status: 'conversating', details: 'https://linkedin.com/Fran', projects: [], notes: '', materials: [] },
  { id: 'client-3', name: 'EvercodeLab Manager', company: 'EvercodeLab', businessType: 'ФинТех', status: 'complete', details: '', projects: [], notes: '', materials: [] },
  { id: 'client-4', name: 'Наталья', company: 'Азбука Вкуса', businessType: 'Продуктовая доставка', status: 'ghosted', details: '', projects: [], notes: '', materials: [] },
  { id: 'client-5', name: 'Карина Фролова', company: 'ТрансМедАвиа', businessType: 'Local Business', status: 'yet-to-start', details: '+41 233241232', projects: [], notes: '', materials: [] },
  { id: 'client-6', name: 'Сергей (брат Егора)', company: '', businessType: 'Юридическая контора', status: 'contacted', details: '', projects: [], notes: '', materials: [] },
  { id: 'client-7', name: 'Отец Егора', company: 'Консалт Информ', businessType: 'Консалтинг', status: 'contacted', details: '', projects: [], notes: '', materials: [] },
  { id: 'client-8', name: 'Андрей Варламкин', company: 'МЧС', businessType: 'МЧС', status: 'contacted', details: '', projects: [], notes: '', materials: [] },
  { id: 'client-9', name: 'Ярик Джимма', company: 'Дринкит', businessType: 'Кофейня', status: 'conversating', details: '', projects: ['proj-1'], notes: '', materials: [] },
  { id: 'client-10', name: 'Felfri Manager', company: 'Felfri', businessType: 'Магазин бытовой техники', status: 'ghosted', details: '', projects: [], notes: '', materials: [] },
  { id: 'client-11', name: 'Александр', company: 'свой проект', businessType: 'Подбор фильмов', status: 'conversating', details: '', projects: [], notes: '', materials: [] },
  { id: 'client-12', name: 'Автосервис', company: '', businessType: 'Автосервис', status: 'contacted', details: '', projects: [], notes: '', materials: [] },
  { id: 'client-13', name: 'Анастасия', company: 'Онлайн-спектр', businessType: 'Контакт-центр', status: 'ghosted', details: 'https://t.me/hr_manage_', projects: [], notes: '', materials: [] },
];

export const materials: Material[] = [
  { id: 'mat-1', name: 'Услуги AIvion', type: 'file', extension: 'pdf', author: 'Алексей', date: '2026-04-10', size: '2.4 MB', projectId: 'proj-2' },
  { id: 'mat-2', name: 'CustDev', type: 'file', extension: 'mhtml', author: 'Ольга', date: '2026-04-12', size: '1.1 MB', projectId: 'proj-1' },
  { id: 'mat-3', name: 'Презентация Drinkit', type: 'file', extension: 'pptx', author: 'Мария', date: '2026-04-15', size: '5.8 MB', projectId: 'proj-1' },
  { id: 'mat-4', name: 'Шаблон для ТЗ', type: 'file', extension: 'xlsx', author: 'Иван', date: '2026-04-18', size: '890 KB', projectId: 'proj-2' },
  { id: 'mat-5', name: 'Как рекламиться во время блокировок', type: 'link', url: 'https://youtu.be/Df02hLSYjiw?si=G-3V1HmRyjbdMPor', previewUrl: 'https://img.youtube.com/vi/Df02hLSYjiw/0.jpg', author: 'Алексей', date: '2026-04-20', projectId: 'proj-2' },
  { id: 'mat-6', name: 'Душный гайд по LLM + RAG', type: 'link', url: 'https://youtu.be/Df02hLSYjiw?si=G-3V1HmRyjbdMPor', previewUrl: 'https://img.youtube.com/vi/Df02hLSYjiw/0.jpg', author: 'Иван', date: '2026-04-22', projectId: 'proj-3' },
  { id: 'mat-7', name: 'Заметка по интеграции', type: 'note', author: 'Алексей', date: '2026-04-23', projectId: 'proj-2', subProjectId: 'sub-3' },
  { id: 'mat-8', name: 'Бриф клиента', type: 'note', author: 'Мария', date: '2026-04-24', projectId: 'proj-1' },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 'evt-1', title: 'Сверстать сайт', start: '2026-04-25', end: '2026-04-28', projectId: 'proj-3', taskId: 'KAN-01', type: 'task', status: 'in-progress' },
  { id: 'evt-2', title: 'Прописать логику обработки заявки', start: '2026-04-29', end: '2026-05-02', projectId: 'proj-3', taskId: 'KAN-02', type: 'task', status: 'todo' },
  { id: 'evt-3', title: 'Доделать раздел про сбыт в РФ', start: '2026-04-26', end: '2026-04-27', projectId: 'proj-2', taskId: 'KAN-03', type: 'task', status: 'review' },
  { id: 'evt-4', title: 'Изучить процесс логистики', start: '2026-04-26', end: '2026-04-29', projectId: 'proj-2', taskId: 'KAN-04', type: 'task', status: 'in-progress' },
  { id: 'evt-5', title: 'Скопировать 50 статей из БЗ', start: '2026-04-27', end: '2026-04-30', projectId: 'proj-1', taskId: 'KAN-05', type: 'task', status: 'todo' },
];

export const sites: Site[] = [
  { id: 'site-1', name: 'Основной сайт', url: 'https://aivion.ru', usersDaily: 1240, avgTime: '3:42', clicks: 8540, bounceRate: 34, conversions: 124, topPages: [{ page: '/services', views: 420 }, { page: '/about', views: 310 }, { page: '/contacts', views: 280 }], trafficSources: [{ source: 'Прямой', percent: 45 }, { source: 'Поиск', percent: 30 }, { source: 'Соцсети', percent: 25 }] },
  { id: 'site-2', name: 'Для дизайн-студий', url: 'https://design.aivion.ru', usersDaily: 560, avgTime: '2:15', clicks: 3200, bounceRate: 42, conversions: 48, topPages: [{ page: '/portfolio', views: 210 }, { page: '/pricing', views: 180 }, { page: '/cases', views: 150 }], trafficSources: [{ source: 'Прямой', percent: 30 }, { source: 'Поиск', percent: 50 }, { source: 'Реклама', percent: 20 }] },
  { id: 'site-3', name: 'Для колл-центров', url: 'https://call.aivion.ru', usersDaily: 890, avgTime: '4:10', clicks: 5100, bounceRate: 28, conversions: 92, topPages: [{ page: '/demo', views: 340 }, { page: '/features', views: 290 }, { page: '/pricing', views: 220 }], trafficSources: [{ source: 'Прямой', percent: 20 }, { source: 'Поиск', percent: 60 }, { source: 'Email', percent: 20 }] },
  { id: 'site-4', name: 'ИИ-система для копирайта', url: 'https://copy.aivion.ru', usersDaily: 2100, avgTime: '5:20', clicks: 12800, bounceRate: 22, conversions: 310, topPages: [{ page: '/editor', views: 890 }, { page: '/templates', views: 670 }, { page: '/api', views: 450 }], trafficSources: [{ source: 'Прямой', percent: 25 }, { source: 'Поиск', percent: 55 }, { source: 'Соцсети', percent: 20 }] },
  { id: 'site-5', name: 'Для SMM\'щиков', url: 'https://smm.aivion.ru', usersDaily: 430, avgTime: '2:50', clicks: 2100, bounceRate: 38, conversions: 34, topPages: [{ page: '/planner', views: 180 }, { page: '/analytics', views: 150 }, { page: '/calendar', views: 120 }], trafficSources: [{ source: 'Прямой', percent: 35 }, { source: 'Поиск', percent: 35 }, { source: 'Реклама', percent: 30 }] },
];

export const notifications: Notification[] = [
  { id: 'notif-1', type: 'task', message: 'Новая задача: Сверстать главную страницу', date: '2026-04-25T09:00:00', read: false },
  { id: 'notif-2', type: 'mention', message: 'Алексей упомянул вас в KAN-04', date: '2026-04-25T10:30:00', read: false },
  { id: 'notif-3', type: 'deadline', message: 'Дедлайн через 1 день: KAN-03', date: '2026-04-26T08:00:00', read: true },
  { id: 'notif-4', type: 'task', message: 'Задача выполнена: KAN-08', date: '2026-04-20T16:00:00', read: true },
];

export const aiSummaries: Record<string, string> = {
  'proj-1': 'Сбор БЗ для Дринкит на 60% завершен. Презентация требует доработки дизайна.',
  'proj-2': 'Активная работа над демо ERP и логистикой. Опрос почти готов.',
  'proj-3': 'Frontend и backend в прогрессе. Дизайн утвержден.',
  'sub-1': 'Собрано 30 из 50 статей. Осталось скопировать остальные.',
  'sub-2': 'Презентация в процессе. Нужны финальные правки.',
  'KAN-01': 'Задача по верстке главной страницы на 70%. Осталось адаптив.',
  'KAN-04': 'Изучение логистики в процессе. Собраны первичные данные.',
};
