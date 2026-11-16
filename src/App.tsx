import React, { useState } from 'react';
import {
  LayoutDashboard, Calendar, Sparkles, Users, BarChart3,
  MessageSquare, Send, Settings, Bell, Search, Plus,
  Instagram, Twitter, Linkedin, Facebook, Youtube,
  TrendingUp, Eye, Heart, MessageCircle, Share2,
  Clock, CheckCircle2, AlertCircle, Zap, Bot,
  ChevronRight, MoreHorizontal, Filter, Download,
  Image, Video, FileText, Hash, AtSign, Globe,
  ArrowUpRight, ArrowDownRight, Play, Pause, RefreshCw
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// ==================== DATA ====================
const engagementData = [
  { name: 'Пн', likes: 2400, comments: 400, shares: 240 },
  { name: 'Вт', likes: 1398, comments: 310, shares: 198 },
  { name: 'Ср', likes: 9800, comments: 890, shares: 490 },
  { name: 'Чт', likes: 3908, comments: 580, shares: 380 },
  { name: 'Пт', likes: 4800, comments: 690, shares: 430 },
  { name: 'Сб', likes: 3800, comments: 520, shares: 310 },
  { name: 'Вс', likes: 4300, comments: 610, shares: 370 },
];

const growthData = [
  { name: 'Янв', followers: 4000 },
  { name: 'Фев', followers: 5200 },
  { name: 'Мар', followers: 6800 },
  { name: 'Апр', followers: 8100 },
  { name: 'Май', followers: 10400 },
  { name: 'Июн', followers: 13200 },
  { name: 'Июл', followers: 16800 },
];

const platformData = [
  { name: 'Instagram', value: 35, color: '#E1306C' },
  { name: 'Telegram', value: 28, color: '#0088cc' },
  { name: 'Twitter/X', value: 20, color: '#1DA1F2' },
  { name: 'LinkedIn', value: 12, color: '#0077B5' },
  { name: 'YouTube', value: 5, color: '#FF0000' },
];

const scheduledPosts = [
  { id: 1, title: 'Новый продукт — AI-ассистент для бизнеса', platform: 'instagram', time: '10:00', date: 'Сегодня', status: 'scheduled', type: 'image' },
  { id: 2, title: 'Как увеличить конверсию на 300% за неделю', platform: 'telegram', time: '12:30', date: 'Сегодня', status: 'published', type: 'text' },
  { id: 3, title: 'Видео-обзор: Топ-5 инструментов маркетинга', platform: 'youtube', time: '15:00', date: 'Сегодня', status: 'scheduled', type: 'video' },
  { id: 4, title: 'Тред: Почему email-маркетинг не умер', platform: 'twitter', time: '09:00', date: 'Завтра', status: 'draft', type: 'text' },
  { id: 5, title: 'Кейс: Рост с 0 до 50K подписчиков', platform: 'linkedin', time: '11:00', date: 'Завтра', status: 'scheduled', type: 'image' },
];

const accounts = [
  { id: 1, name: '@brand_official', platform: 'instagram', followers: '125K', status: 'active', engagement: '4.2%', avatar: '🏢' },
  { id: 2, name: '@brand_news', platform: 'telegram', followers: '89K', status: 'active', engagement: '6.8%', avatar: '📢' },
  { id: 3, name: '@brand_thoughts', platform: 'twitter', followers: '45K', status: 'active', engagement: '3.1%', avatar: '💭' },
  { id: 4, name: 'Brand Company', platform: 'linkedin', followers: '32K', status: 'paused', engagement: '2.4%', avatar: '👔' },
  { id: 5, name: 'Brand Channel', platform: 'youtube', followers: '67K', status: 'active', engagement: '5.7%', avatar: '🎬' },
];

const aiTemplates = [
  { id: 1, title: 'Продающий пост', icon: '💰', description: 'Генерирует пост с CTA для увеличения продаж' },
  { id: 2, title: 'Образовательный контент', icon: '📚', description: 'Создаёт экспертный контент для повышения доверия' },
  { id: 3, title: 'Вовлекающий пост', icon: '🔥', description: 'Пишет посты с вопросами и опросами' },
  { id: 4, title: 'Сторителлинг', icon: '📖', description: 'Создаёт истории о бренде и клиентах' },
  { id: 5, title: 'Новостной пост', icon: '📰', description: 'Форматирует новости и обновления компании' },
  { id: 6, title: 'Отзыв клиента', icon: '⭐', description: 'Создаёт посты на основе отзывов' },
];

const recentActivity = [
  { id: 1, action: 'Пост опубликован', detail: 'Instagram — "5 лайфхаков для...""', time: '2 мин назад', icon: CheckCircle2, color: 'text-green-400' },
  { id: 2, action: 'Комментарий оставлен', detail: 'Ответ пользователю @user_123', time: '15 мин назад', icon: MessageSquare, color: 'text-blue-400' },
  { id: 3, action: 'Рассылка отправлена', detail: 'Telegram — 12,400 получателей', time: '1 час назад', icon: Send, color: 'text-purple-400' },
  { id: 4, action: 'AI сгенерировал контент', detail: '3 варианта поста для LinkedIn', time: '2 часа назад', icon: Sparkles, color: 'text-yellow-400' },
  { id: 5, action: 'Подписчик +247', detail: 'Instagram за последние 24ч', time: '3 часа назад', icon: TrendingUp, color: 'text-green-400' },
];

// ==================== COMPONENTS ====================

function Sidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { id: 'planner', label: 'Планировщик', icon: Calendar },
    { id: 'generator', label: 'AI Генератор', icon: Sparkles },
    { id: 'accounts', label: 'Аккаунты', icon: Users },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
    { id: 'messages', label: 'Сообщения', icon: MessageSquare },
    { id: 'broadcast', label: 'Рассылки', icon: Send },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#12121a] border-r border-[#2a2a3e] flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] flex items-center justify-center">
          <Zap size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold gradient-text">SocialPilot</h1>
          <p className="text-xs text-[#a0a0b0]">AI SMM Platform</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#6c5ce7]/20 to-transparent text-white border-l-2 border-[#6c5ce7]'
                  : 'text-[#a0a0b0] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-[#a29bfe]' : ''} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && <ChevronRight size={16} className="ml-auto text-[#a29bfe]" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-[#6c5ce7]/10 to-[#a29bfe]/5 border border-[#6c5ce7]/20">
        <div className="flex items-center gap-2 mb-2">
          <Bot size={18} className="text-[#a29bfe]" />
          <span className="text-sm font-semibold text-white">AI Ассистент</span>
        </div>
        <p className="text-xs text-[#a0a0b0] mb-3">Активен • Обработано 1,247 задач</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot"></div>
          <span className="text-xs text-green-400">Онлайн</span>
        </div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold">Добро пожаловать 👋</h2>
        <p className="text-[#a0a0b0] text-sm mt-1">Вот что происходит с вашими соцсетями сегодня</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0b0]" />
          <input
            type="text"
            placeholder="Поиск..."
            className="pl-10 pr-4 py-2.5 w-[250px] text-sm rounded-xl"
          />
        </div>
        <button className="relative p-2.5 rounded-xl bg-[#1a1a2e] border border-[#2a2a3e] hover:border-[#6c5ce7]/50 transition-colors">
          <Bell size={18} className="text-[#a0a0b0]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e17055] rounded-full text-[10px] flex items-center justify-center font-bold">3</span>
        </button>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#fd79a8] flex items-center justify-center text-sm font-bold cursor-pointer">
          АК
        </div>
      </div>
    </header>
  );
}

function Dashboard() {
  const stats = [
    { label: 'Подписчики', value: '358K', change: '+12.5%', up: true, icon: Users, color: '#6c5ce7' },
    { label: 'Вовлечённость', value: '4.8%', change: '+0.7%', up: true, icon: Heart, color: '#00b894' },
    { label: 'Просмотры', value: '1.2M', change: '+23.1%', up: true, icon: Eye, color: '#0984e3' },
    { label: 'Публикации', value: '147', change: '-3.2%', up: false, icon: FileText, color: '#fdcb6e' },
  ];

  return (
    <div className="animate-fade-in">
      <Header />

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-5 glow-border hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-[#a0a0b0] mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Вовлечённость за неделю</h3>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 rounded-lg bg-[#6c5ce7]/20 text-[#a29bfe]">Неделя</button>
              <button className="text-xs px-3 py-1.5 rounded-lg text-[#a0a0b0] hover:bg-white/5">Месяц</button>
              <button className="text-xs px-3 py-1.5 rounded-lg text-[#a0a0b0] hover:bg-white/5">Год</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00b894" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis dataKey="name" stroke="#a0a0b0" fontSize={12} />
              <YAxis stroke="#a0a0b0" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '12px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="likes" stroke="#6c5ce7" fill="url(#colorLikes)" strokeWidth={2} />
              <Area type="monotone" dataKey="comments" stroke="#00b894" fill="url(#colorComments)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-6">Распределение платформ</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {platformData.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: p.color }}></div>
                  <span className="text-[#a0a0b0]">{p.name}</span>
                </div>
                <span className="font-semibold">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity & Scheduled */}
      <div className="grid grid-cols-2 gap-5">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-lg">Последняя активность</h3>
            <button className="text-xs text-[#a29bfe] hover:underline">Все</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${item.color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-[#a0a0b0] mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-xs text-[#a0a0b0] whitespace-nowrap">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-lg">Ближайшие публикации</h3>
            <button className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
              <Plus size={14} /> Создать
            </button>
          </div>
          <div className="space-y-3">
            {scheduledPosts.slice(0, 4).map((post) => (
              <div key={post.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-[#2a2a3e] hover:border-[#6c5ce7]/30 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#6c5ce7]/10 flex items-center justify-center">
                  {post.type === 'image' ? <Image size={16} className="text-[#a29bfe]" /> :
                   post.type === 'video' ? <Video size={16} className="text-[#a29bfe]" /> :
                   <FileText size={16} className="text-[#a29bfe]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <p className="text-xs text-[#a0a0b0]">{post.date} • {post.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  post.status === 'published' ? 'status-active' :
                  post.status === 'scheduled' ? 'bg-[#6c5ce7]/15 text-[#a29bfe] border border-[#6c5ce7]/30' :
                  'status-paused'
                }`}>
                  {post.status === 'published' ? '✓' : post.status === 'scheduled' ? '⏰' : '✏️'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Planner() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platforms = [
    { id: 'all', label: 'Все', icon: Globe },
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'telegram', label: 'Telegram', icon: Send },
    { id: 'twitter', label: 'Twitter/X', icon: Twitter },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { id: 'youtube', label: 'YouTube', icon: Youtube },
  ];

  const timeSlots = [
    { time: '08:00', posts: [] },
    { time: '09:00', posts: [{ title: 'Тред: Почему email-маркетинг не умер', platform: 'twitter', status: 'draft' }] },
    { time: '10:00', posts: [{ title: 'Новый продукт — AI-ассистент', platform: 'instagram', status: 'scheduled' }] },
    { time: '11:00', posts: [{ title: 'Кейс: Рост с 0 до 50K', platform: 'linkedin', status: 'scheduled' }] },
    { time: '12:00', posts: [] },
    { time: '12:30', posts: [{ title: 'Как увеличить конверсию на 300%', platform: 'telegram', status: 'published' }] },
    { time: '13:00', posts: [] },
    { time: '14:00', posts: [] },
    { time: '15:00', posts: [{ title: 'Видео-обзор: Топ-5 инструментов', platform: 'youtube', status: 'scheduled' }] },
    { time: '16:00', posts: [] },
    { time: '17:00', posts: [] },
    { time: '18:00', posts: [] },
  ];

  return (
    <div className="animate-fade-in">
      <Header />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedPlatform === p.id
                    ? 'bg-[#6c5ce7]/20 text-[#a29bfe] border border-[#6c5ce7]/30'
                    : 'text-[#a0a0b0] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={16} />
                {p.label}
              </button>
            );
          })}
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Запланировать пост
        </button>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">📅 Сегодня — {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
          <div className="flex items-center gap-3">
            <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-2">
              <Filter size={14} /> Фильтр
            </button>
            <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-2">
              <Download size={14} /> Экспорт
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {timeSlots.map((slot, i) => (
            <div key={i} className="flex items-stretch gap-4 min-h-[56px]">
              <div className="w-16 text-sm text-[#a0a0b0] flex items-center justify-end font-mono">
                {slot.time}
              </div>
              <div className="w-px bg-[#2a2a3e] relative">
                {slot.posts.length > 0 && (
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#6c5ce7]"></div>
                )}
              </div>
              <div className="flex-1 flex gap-2 py-1">
                {slot.posts.map((post, j) => (
                  <div
                    key={j}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all hover:scale-[1.01] cursor-pointer ${
                      post.status === 'published'
                        ? 'bg-green-500/5 border-green-500/20'
                        : post.status === 'scheduled'
                        ? 'bg-[#6c5ce7]/5 border-[#6c5ce7]/20'
                        : 'bg-yellow-500/5 border-yellow-500/20'
                    }`}
                  >
                    <span className={`text-xs px-2 py-0.5 rounded-md ${
                      post.status === 'published' ? 'status-active' :
                      post.status === 'scheduled' ? 'bg-[#6c5ce7]/15 text-[#a29bfe]' :
                      'status-paused'
                    }`}>
                      {post.platform}
                    </span>
                    <span className="text-sm font-medium">{post.title}</span>
                    <span className="ml-auto text-xs text-[#a0a0b0]">
                      {post.status === 'published' ? '✓ Опубликовано' : post.status === 'scheduled' ? '⏰ Запланировано' : '✏️ Черновик'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    setTimeout(() => {
      const templates: Record<string, string> = {
        professional: `🚀 ${topic}\n\nВ мире, где конкуренция растёт каждый день, важно использовать правильные инструменты.\n\nМы проанализировали данные 10,000+ компаний и выявили 3 ключевых фактора успеха:\n\n1️⃣ Автоматизация рутинных процессов\n2️⃣ Персонализация коммуникации\n3️⃣ Data-driven подход к контенту\n\nРезультат? Средний рост вовлечённости на 340% за 3 месяца.\n\n💡 Хотите узнать подробнее? Оставьте «+» в комментариях — отправим бесплатный гайд.\n\n#маркетинг #SMM #автоматизация #бизнес`,
        casual: `Привет! 👋\n\nДавайте честно: кто ещё тратит по 3 часа в день на посты в соцсети? 😅\n\nЯ нашёл способ делать это за 15 минут. И нет, это не магия — это ${topic}.\n\nДелюсь фишкой:\n→ AI пишет черновик\n→ Ты добавляешь свой стиль\n→ Публикуешь по расписанию\n\nВсё! Больше никакого выгорания от контента 🔥\n\nКто хочет попробовать — ссылка в био!`,
        expert: `📊 Экспертный разбор: ${topic}\n\nЗа последние 6 месяцев мы провели исследование с выборкой N=5,000.\n\nКлючевые выводы:\n\n• Компании, использующие AI-инструменты, публикуют в 4.7x больше контента\n• Качество вовлечённости не снижается (p < 0.05)\n• ROI контент-маркетинга вырос на 215%\n\nМетодология: A/B тестирование, контрольные группы, лонгитюдное исследование.\n\nПолный отчёт — по ссылке в первом комментарии 👇\n\n#research #datascience #contentmarketing`,
      };
      setGeneratedContent(templates[tone] || templates.professional);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <Header />

      <div className="grid grid-cols-3 gap-6">
        {/* Templates */}
        <div className="col-span-1">
          <h3 className="font-semibold text-lg mb-4">📝 Шаблоны</h3>
          <div className="space-y-3">
            {aiTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedTemplate === template.id
                    ? 'bg-[#6c5ce7]/10 border-[#6c5ce7]/40'
                    : 'bg-white/[0.02] border-[#2a2a3e] hover:border-[#6c5ce7]/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{template.icon}</span>
                  <span className="font-medium text-sm">{template.title}</span>
                </div>
                <p className="text-xs text-[#a0a0b0]">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Generator */}
        <div className="col-span-2">
          <div className="glass-card p-6 mb-6">
            <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
              <Sparkles size={20} className="text-[#a29bfe]" />
              Генератор контента
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#a0a0b0] mb-2 block">Тема / Ключевые слова</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Например: как увеличить продажи с помощью email-маркетинга"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#a0a0b0] mb-2 block">Тон</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full">
                    <option value="professional">Профессиональный</option>
                    <option value="casual">Дружелюбный</option>
                    <option value="expert">Экспертный</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-[#a0a0b0] mb-2 block">Платформа</label>
                  <select className="w-full">
                    <option>Instagram</option>
                    <option>Telegram</option>
                    <option>Twitter/X</option>
                    <option>LinkedIn</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleGenerate} className="btn-primary flex items-center gap-2">
                  <Sparkles size={16} />
                  {isGenerating ? 'Генерация...' : 'Сгенерировать'}
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <RefreshCw size={16} /> Ещё вариант
                </button>
              </div>
            </div>
          </div>

          {/* Generated Content */}
          {generatedContent && (
            <div className="glass-card p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-400" />
                  Результат генерации
                </h3>
                <div className="flex gap-2">
                  <button className="btn-secondary text-xs py-2 px-3">Копировать</button>
                  <button className="btn-primary text-xs py-2 px-3">Запланировать</button>
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-5 border border-[#2a2a3e]">
                <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed text-[#e0e0e0]">
                  {generatedContent}
                </pre>
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-[#a0a0b0]">
                <span>📊 Уникальность: 94%</span>
                <span>📖 Читаемость: 8.2/10</span>
                <span>🎯 SEO-скор: 87/100</span>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="glass-card p-8 flex flex-col items-center justify-center animate-fade-in">
              <div className="w-16 h-16 rounded-full border-4 border-[#6c5ce7]/30 border-t-[#6c5ce7] animate-spin mb-4"></div>
              <p className="text-[#a0a0b0]">AI генерирует контент...</p>
              <p className="text-xs text-[#a0a0b0] mt-1">Анализирую тренды и лучшие практики</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Accounts() {
  return (
    <div className="animate-fade-in">
      <Header />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <select className="text-sm">
            <option>Все платформы</option>
            <option>Instagram</option>
            <option>Telegram</option>
            <option>Twitter/X</option>
            <option>LinkedIn</option>
          </select>
          <select className="text-sm">
            <option>Все статусы</option>
            <option>Активные</option>
            <option>На паузе</option>
            <option>Ошибки</option>
          </select>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Подключить аккаунт
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="glass-card p-5 flex items-center gap-5 hover:border-[#6c5ce7]/30 transition-all">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6c5ce7]/20 to-[#a29bfe]/10 flex items-center justify-center text-2xl">
              {account.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-semibold">{account.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-md ${
                  account.status === 'active' ? 'status-active' : 'status-paused'
                }`}>
                  {account.status === 'active' ? '● Активен' : '⏸ На паузе'}
                </span>
              </div>
              <p className="text-sm text-[#a0a0b0] capitalize">{account.platform}</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-lg font-bold">{account.followers}</p>
                <p className="text-xs text-[#a0a0b0]">Подписчики</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-400">{account.engagement}</p>
                <p className="text-xs text-[#a0a0b0]">Вовлечённость</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <Play size={16} className="text-green-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <Pause size={16} className="text-yellow-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <MoreHorizontal size={16} className="text-[#a0a0b0]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Automation Rules */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">🤖 Правила автоматизации</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-5 border-l-2 border-l-green-400">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot"></div>
              <span className="text-sm font-medium">Авто-ответ в Direct</span>
            </div>
            <p className="text-xs text-[#a0a0b0] mb-3">При слове "цена" → отправить прайс-лист</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-400">Активно • 342 ответа</span>
              <button className="text-xs text-[#a29bfe]">Настроить</button>
            </div>
          </div>
          <div className="glass-card p-5 border-l-2 border-l-[#6c5ce7]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#6c5ce7] pulse-dot"></div>
              <span className="text-sm font-medium">Авто-репост</span>
            </div>
            <p className="text-xs text-[#a0a0b0] mb-3">Лучшие Stories → автоматически в Highlights</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#a29bfe]">Активно • 89 репостов</span>
              <button className="text-xs text-[#a29bfe]">Настроить</button>
            </div>
          </div>
          <div className="glass-card p-5 border-l-2 border-l-yellow-400">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span className="text-sm font-medium">Приветствие новых</span>
            </div>
            <p className="text-xs text-[#a0a0b0] mb-3">Новым подписчикам → приветственное сообщение</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-yellow-400">На паузе</span>
              <button className="text-xs text-[#a29bfe]">Запустить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="animate-fade-in">
      <Header />

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Охват', value: '2.4M', change: '+18%', icon: Eye },
          { label: 'Новые подписчики', value: '12,450', change: '+24%', icon: TrendingUp },
          { label: 'Средний ER', value: '5.2%', change: '+0.8%', icon: Heart },
          { label: 'Клики по ссылкам', value: '45.2K', change: '+31%', icon: Share2 },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#6c5ce7]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#a29bfe]" />
                </div>
                <span className="text-xs text-green-400 font-semibold">{stat.change}</span>
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-[#a0a0b0] mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-5">Рост подписчиков</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis dataKey="name" stroke="#a0a0b0" fontSize={12} />
              <YAxis stroke="#a0a0b0" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '12px' }}
              />
              <Line type="monotone" dataKey="followers" stroke="#6c5ce7" strokeWidth={3} dot={{ fill: '#6c5ce7', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-5">Активность по дням</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis dataKey="name" stroke="#a0a0b0" fontSize={12} />
              <YAxis stroke="#a0a0b0" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '12px' }}
              />
              <Bar dataKey="likes" fill="#6c5ce7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="comments" fill="#00b894" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Best performing posts */}
      <div className="glass-card p-6 mt-6">
        <h3 className="font-semibold text-lg mb-5">🏆 Лучшие публикации</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: '5 ошибок в контент-маркетинге', likes: '12.4K', comments: '890', shares: '2.1K', platform: 'Instagram' },
            { title: 'Как мы выросли в 10 раз', likes: '8.7K', comments: '1.2K', shares: '3.4K', platform: 'LinkedIn' },
            { title: 'AI в маркетинге: гайд 2024', likes: '15.1K', comments: '2.3K', shares: '5.6K', platform: 'Telegram' },
          ].map((post, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-[#2a2a3e] hover:border-[#6c5ce7]/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded bg-[#6c5ce7]/15 text-[#a29bfe]">{post.platform}</span>
                <span className="text-xs text-[#a0a0b0]">#{i + 1}</span>
              </div>
              <h4 className="font-medium text-sm mb-3">{post.title}</h4>
              <div className="flex items-center gap-4 text-xs text-[#a0a0b0]">
                <span className="flex items-center gap-1"><Heart size={12} className="text-red-400" /> {post.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle size={12} className="text-blue-400" /> {post.comments}</span>
                <span className="flex items-center gap-1"><Share2 size={12} className="text-green-400" /> {post.shares}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Messages() {
  const conversations = [
    { id: 1, name: '@user_marketer', lastMsg: 'Спасибо за гайд! Очень полезно 🙏', time: '2 мин', unread: 2, avatar: '👩' },
    { id: 2, name: '@business_coach', lastMsg: 'Хочу обсудить сотрудничество', time: '15 мин', unread: 1, avatar: '👨‍💼' },
    { id: 3, name: '@designer_pro', lastMsg: 'Когда будет новый курс?', time: '1 час', unread: 0, avatar: '🎨' },
    { id: 4, name: '@startup_fan', lastMsg: 'Ваш продукт — огонь! 🔥', time: '3 часа', unread: 0, avatar: '🚀' },
    { id: 5, name: '@analytics_guru', lastMsg: 'Можете поделиться данными?', time: '5 часов', unread: 0, avatar: '📊' },
  ];

  return (
    <div className="animate-fade-in">
      <Header />

      <div className="grid grid-cols-3 gap-6">
        {/* Conversations list */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Сообщения</h3>
            <span className="text-xs bg-[#6c5ce7]/20 text-[#a29bfe] px-2 py-1 rounded-lg">3 новых</span>
          </div>
          <div className="space-y-1">
            {conversations.map((conv) => (
              <div key={conv.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c5ce7]/20 to-[#a29bfe]/10 flex items-center justify-center text-lg">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{conv.name}</span>
                    <span className="text-xs text-[#a0a0b0]">{conv.time}</span>
                  </div>
                  <p className="text-xs text-[#a0a0b0] truncate">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#6c5ce7] text-xs flex items-center justify-center font-bold">{conv.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="col-span-2 glass-card p-6 flex flex-col">
          <div className="flex items-center gap-3 pb-4 border-b border-[#2a2a3e]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c5ce7]/20 to-[#a29bfe]/10 flex items-center justify-center text-lg">
              👩
            </div>
            <div>
              <h4 className="font-medium">@user_marketer</h4>
              <p className="text-xs text-green-400">Онлайн</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-2">
                <Bot size={14} /> AI-ответ
              </button>
            </div>
          </div>

          <div className="flex-1 py-6 space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6c5ce7]/20 to-[#a29bfe]/10 flex items-center justify-center text-sm">👩</div>
              <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-[70%]">
                <p className="text-sm">Привет! Скачала ваш гайд по email-маркетингу. Очень полезный материал!</p>
                <p className="text-xs text-[#a0a0b0] mt-2">14:23</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="bg-[#6c5ce7]/20 rounded-2xl rounded-tr-sm p-4 max-w-[70%]">
                <p className="text-sm">Спасибо! Рады, что понравилось 🙌 Есть вопросы?</p>
                <p className="text-xs text-[#a0a0b0] mt-2">14:25</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6c5ce7]/20 to-[#a29bfe]/10 flex items-center justify-center text-sm">👩</div>
              <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-[70%]">
                <p className="text-sm">Да! А можете посоветовать инструмент для автоматизации рассылок? Спасибо за гайд! Очень полезно 🙏</p>
                <p className="text-xs text-[#a0a0b0] mt-2">14:30</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a3e]">
            <input
              type="text"
              placeholder="Написать сообщение..."
              className="flex-1"
            />
            <button className="btn-primary p-3">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Broadcast() {
  const broadcasts = [
    { id: 1, title: 'Новый гайд по маркетингу', platform: 'Telegram', sent: 12400, delivered: 12100, opened: 8900, status: 'sent', date: 'Сегодня, 10:00' },
    { id: 2, title: 'Скидка 30% — только сегодня', platform: 'Email', sent: 45000, delivered: 43200, opened: 12800, status: 'sent', date: 'Вчера, 14:00' },
    { id: 3, title: 'Приглашение на вебинар', platform: 'Telegram', sent: 8900, delivered: 8700, opened: 6200, status: 'sending', date: 'Сейчас' },
    { id: 4, title: 'Еженедельный дайджест', platform: 'Email', sent: 0, delivered: 0, opened: 0, status: 'scheduled', date: 'Завтра, 09:00' },
  ];

  return (
    <div className="animate-fade-in">
      <Header />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot"></div>
            <span className="text-sm">Отправлено сегодня: <b>12,400</b></span>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <span className="text-sm">Открытий: <b className="text-green-400">71.8%</b></span>
          </div>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Создать рассылку
        </button>
      </div>

      <div className="glass-card p-6 mb-6">
        <h3 className="font-semibold text-lg mb-5">Рассылки</h3>
        <div className="space-y-3">
          {broadcasts.map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-[#2a2a3e] hover:border-[#6c5ce7]/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#6c5ce7]/10 flex items-center justify-center">
                {b.platform === 'Telegram' ? <Send size={18} className="text-[#a29bfe]" /> : <AtSign size={18} className="text-[#a29bfe]" />}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{b.title}</h4>
                <p className="text-xs text-[#a0a0b0]">{b.platform} • {b.date}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-bold">{b.sent.toLocaleString()}</p>
                  <p className="text-xs text-[#a0a0b0]">Отправлено</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{b.delivered.toLocaleString()}</p>
                  <p className="text-xs text-[#a0a0b0]">Доставлено</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-green-400">{b.opened.toLocaleString()}</p>
                  <p className="text-xs text-[#a0a0b0]">Открыто</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1.5 rounded-lg ${
                b.status === 'sent' ? 'status-active' :
                b.status === 'sending' ? 'bg-[#6c5ce7]/15 text-[#a29bfe] border border-[#6c5ce7]/30' :
                'status-paused'
              }`}>
                {b.status === 'sent' ? '✓ Отправлено' : b.status === 'sending' ? '⏳ Отправка...' : '⏰ Запланировано'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Templates for broadcasts */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-lg mb-4">📋 Шаблоны рассылок</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: 'Приветственная', desc: 'Для новых подписчиков', icon: '👋' },
            { title: 'Промо-акция', desc: 'Скидки и спецпредложения', icon: '🏷️' },
            { title: 'Дайджест', desc: 'Еженедельная подборка', icon: '📬' },
            { title: 'Напоминание', desc: 'О вебинарах и событиях', icon: '⏰' },
          ].map((t, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-[#2a2a3e] hover:border-[#6c5ce7]/30 cursor-pointer transition-colors text-center">
              <span className="text-3xl mb-3 block">{t.icon}</span>
              <h4 className="font-medium text-sm mb-1">{t.title}</h4>
              <p className="text-xs text-[#a0a0b0]">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="animate-fade-in">
      <Header />

      <div className="grid grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-5">⚙️ Общие настройки</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#a0a0b0] mb-2 block">Название компании</label>
              <input type="text" defaultValue="SocialPilot Inc." className="w-full" />
            </div>
            <div>
              <label className="text-sm text-[#a0a0b0] mb-2 block">Часовой пояс</label>
              <select className="w-full">
                <option>Europe/Moscow (UTC+3)</option>
                <option>Europe/Kiev (UTC+2)</option>
                <option>Asia/Almaty (UTC+6)</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#a0a0b0] mb-2 block">Язык интерфейса</label>
              <select className="w-full">
                <option>Русский</option>
                <option>English</option>
              </select>
            </div>
            <button className="btn-primary mt-4">Сохранить</button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-5">🤖 Настройки AI</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#a0a0b0] mb-2 block">AI Модель</label>
              <select className="w-full">
                <option>GPT-4o</option>
                <option>Claude 3.5 Sonnet</option>
                <option>Qwen 2.5</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#a0a0b0] mb-2 block">Тон по умолчанию</label>
              <select className="w-full">
                <option>Профессиональный</option>
                <option>Дружелюбный</option>
                <option>Экспертный</option>
                <option>Неформальный</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-[#a0a0b0] mb-2 block">API ключ</label>
              <input type="password" defaultValue="sk-xxxxxxxxxxxx" className="w-full" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-[#2a2a3e]">
              <span className="text-sm">Авто-ответы AI</span>
              <div className="w-12 h-6 rounded-full bg-[#6c5ce7] relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white transition-all"></div>
              </div>
            </div>
            <button className="btn-primary mt-4">Сохранить</button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-5">🔗 API интеграции</h3>
          <div className="space-y-3">
            {[
              { name: 'Instagram Graph API', status: 'connected', icon: '📸' },
              { name: 'Telegram Bot API', status: 'connected', icon: '✈️' },
              { name: 'Twitter API v2', status: 'connected', icon: '🐦' },
              { name: 'LinkedIn API', status: 'expired', icon: '💼' },
              { name: 'YouTube Data API', status: 'connected', icon: '📺' },
            ].map((api, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-[#2a2a3e]">
                <span className="text-xl">{api.icon}</span>
                <span className="text-sm flex-1">{api.name}</span>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  api.status === 'connected' ? 'status-active' : 'status-error'
                }`}>
                  {api.status === 'connected' ? '✓ Подключено' : '✕ Истекло'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-5">🔔 Уведомления</h3>
          <div className="space-y-3">
            {[
              { label: 'Новые подписчики', enabled: true },
              { label: 'Комментарии и упоминания', enabled: true },
              { label: 'Ошибки публикаций', enabled: true },
              { label: 'Еженедельный отчёт', enabled: false },
              { label: 'AI-рекомендации', enabled: true },
            ].map((notif, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-[#2a2a3e]">
                <span className="text-sm">{notif.label}</span>
                <div className={`w-12 h-6 rounded-full relative cursor-pointer ${notif.enabled ? 'bg-[#6c5ce7]' : 'bg-[#2a2a3e]'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notif.enabled ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'planner': return <Planner />;
      case 'generator': return <AIGenerator />;
      case 'accounts': return <Accounts />;
      case 'analytics': return <Analytics />;
      case 'messages': return <Messages />;
      case 'broadcast': return <Broadcast />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-[260px] p-8">
        {renderContent()}
      </main>
    </div>
  );
}
