import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Bell, Plus, ChevronDown, Sun, Moon, User, Settings, LogOut,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { projects, tasks, clients, materials, notifications } from '@/data/mock';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  const allEntities = [
    ...projects.map((p) => ({ type: 'project', name: p.name, id: p.id })),
    ...tasks.map((t) => ({ type: 'task', name: t.title, id: t.id })),
    ...clients.map((c) => ({ type: 'client', name: c.name, id: c.id })),
    ...materials.map((m) => ({ type: 'material', name: m.name, id: m.id })),
  ];

  const filtered = searchQuery.trim()
    ? allEntities.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50 flex items-center px-4 gap-4">
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <img src="/logo.png" alt="AIvion ERP" className="h-8 w-auto" />
      </Link>

      <div className="flex-1 max-w-xl relative">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по проектам, задачам, клиентам..."
            className="pl-9 bg-muted border-0"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                setSearchOpen(false);
              }
            }}
          />
        </div>
        {searchOpen && filtered.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
            onMouseLeave={() => setSearchOpen(false)}
          >
            {filtered.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                className="w-full text-left px-3 py-2 hover:bg-muted flex items-center gap-2 text-sm"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                  if (item.type === 'project') navigate(`/projects/${item.id}`);
                  else if (item.type === 'task') navigate(`/tasks`);
                  else if (item.type === 'client') navigate(`/clients/${item.id}`);
                  else navigate('/materials');
                }}
              >
                <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Создать
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/')}>Проект</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/tasks')}>Задачу</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/materials')}>Материал</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setNotifOpen(!notifOpen)}>
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-[#FF6B35] text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-card border border-border rounded-lg shadow-lg z-50" onMouseLeave={() => setNotifOpen(false)}>
              <div className="p-3 border-b border-border font-medium text-sm">Уведомления</div>
              {notifications.map((n) => (
                <div key={n.id} className={`px-3 py-2 text-sm border-b border-border last:border-0 ${n.read ? 'opacity-60' : ''}`}>
                  <div className="font-medium">{n.type === 'task' ? 'Задача' : n.type === 'mention' ? 'Упоминание' : 'Дедлайн'}</div>
                  <div className="text-muted-foreground text-xs">{n.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4 mr-2" /> Настройки
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
              {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="h-4 w-4 mr-2" /> Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
