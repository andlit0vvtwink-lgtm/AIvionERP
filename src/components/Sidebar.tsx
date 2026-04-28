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
    <aside className={`fixed left-0 top-16 bottom-0 z-40 flex flex-col p-3 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-full rounded-[22px] border border-white/10 bg-[#0F0F13] flex flex-col">
        <nav className="flex-1 py-3 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-white bg-[#F4511E]/18 border border-[#F4511E]/35 shadow-[0_0_26px_rgba(244,81,30,0.2)]'
                    : 'text-[#B3B3BA] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-2 border-t border-white/10">
          <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-white/5 text-[#B3B3BA]">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
