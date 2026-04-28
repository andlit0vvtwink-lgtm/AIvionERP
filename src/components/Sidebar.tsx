import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, CheckSquare, CalendarDays, Users, FolderOpen, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutGrid, label: 'Проекты' },
  { to: '/tasks', icon: CheckSquare, label: 'Задачи' },
  { to: '/calendar', icon: CalendarDays, label: 'Календарь' },
  { to: '/clients', icon: Users, label: 'Клиенты' },
  { to: '/materials', icon: FolderOpen, label: 'Материалы' },
  { to: '/sites', icon: Globe, label: 'Сайты' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 flex flex-col transition-all duration-300 p-3 ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="glass-panel h-full rounded-2xl border border-white/10 flex flex-col">
        <nav className="flex-1 py-3 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8e63] shadow-lg shadow-[#FF6B35]/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-2 border-t border-white/10">
          <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-white/5 text-muted-foreground">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
