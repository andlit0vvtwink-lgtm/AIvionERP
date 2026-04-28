import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Plus, ChevronDown, Sun, Moon, User, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { projects, tasks, clients, materials, notifications } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
    <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center px-6 glass-panel border-b border-white/10">
      <div className="w-[210px] shrink-0">
        <button type="button" onClick={() => navigate('/')} className="text-xl tracking-tight font-semibold">
          <span className="text-white">Avion</span>
          <span className="text-[#FF6B35]">.ERP</span>
        </button>
      </div>

      <div className="flex-1 flex justify-center px-6">
        <div className="w-full max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по проектам, задачам, клиентам..."
            className="pl-10 bg-black/25 border-white/15 h-10 rounded-xl"
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
          {searchOpen && filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-panel border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50" onMouseLeave={() => setSearchOpen(false)}>
              {filtered.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  className="w-full text-left px-3 py-2.5 hover:bg-white/5 flex items-center gap-2 text-sm"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                    if (item.type === 'project') navigate(`/projects/${item.id}`);
                    else if (item.type === 'task') navigate('/tasks');
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
      </div>

      <div className="w-[270px] shrink-0 flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl hover:bg-white/10">
              <Plus className="h-4 w-4" />
              Создать
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-panel border-white/10">
            <DropdownMenuItem onClick={() => navigate('/')}>Проект</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/projects/proj-1/sub/sub-1')}>Подпроект</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/tasks')}>Задачу</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/materials')}>Материал</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative">
          <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-white/10" onClick={() => setNotifOpen(!notifOpen)}>
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-[#FF6B35] text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 glass-panel border border-white/10 rounded-xl shadow-2xl z-50" onMouseLeave={() => setNotifOpen(false)}>
              <div className="p-3 border-b border-white/10 font-medium text-sm">Уведомления</div>
              {notifications.map((n) => (
                <div key={n.id} className={`px-3 py-2 text-sm border-b border-white/10 last:border-0 ${n.read ? 'opacity-60' : ''}`}>
                  <div className="font-medium">{n.type === 'task' ? 'Задача' : n.type === 'mention' ? 'Упоминание' : 'Дедлайн'}</div>
                  <div className="text-muted-foreground text-xs">{n.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-panel border-white/10">
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
              Сменить тему
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="h-4 w-4 mr-2" /> Выйти из аккаунта
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
