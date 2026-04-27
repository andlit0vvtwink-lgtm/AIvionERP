import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { calendarEvents } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

const statusColors: Record<string, string> = {
  'backlog': 'bg-gray-400',
  'todo': 'bg-blue-500',
  'in-progress': 'bg-[#FF6B35]',
  'review': 'bg-purple-500',
  'done': 'bg-green-500',
};

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 28)); // April 28, 2026
  const [search, setSearch] = useState('');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const events = calendarEvents.filter((e) => {
    if (!search) return true;
    return e.title.toLowerCase().includes(search.toLowerCase());
  });

  const getEventsForDay = (day: Date) => {
    return events.filter((e) => {
      const start = new Date(e.start);
      const end = new Date(e.end);
      return day >= start && day <= end;
    });
  };

  const goToday = () => setCurrentDate(new Date(2026, 3, 28));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Календарь</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={goToday}>Сегодня</Button>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={() => setCurrentDate(view === 'month' ? subMonths(currentDate, 1) : view === 'week' ? addDays(currentDate, -7) : subDays(currentDate, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-32 text-center">
              {format(currentDate, view === 'day' ? 'd MMMM yyyy' : 'MMMM yyyy', { locale: ru })}
            </span>
            <Button size="sm" variant="ghost" onClick={() => setCurrentDate(view === 'month' ? addMonths(currentDate, 1) : view === 'week' ? addDays(currentDate, 7) : addDays(currentDate, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <Button size="sm" variant={view === 'month' ? 'default' : 'ghost'} onClick={() => setView('month')}>Месяц</Button>
            <Button size="sm" variant={view === 'week' ? 'default' : 'ghost'} onClick={() => setView('week')}>Неделя</Button>
            <Button size="sm" variant={view === 'day' ? 'default' : 'ghost'} onClick={() => setView('day')}>День</Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Поиск..." className="w-64 h-8 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Filter className="h-4 w-4 text-muted-foreground ml-2" />
        <Input placeholder="Исполнитель" className="w-40 h-8 text-sm" />
      </div>

      {view === 'month' && (
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 bg-muted text-center text-sm font-medium py-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const dayEvents = getEventsForDay(day);
              return (
                <div
                  key={i}
                  className={`min-h-[100px] border border-border p-1 ${isToday(day) ? 'bg-primary/5' : ''} ${!isSameMonth(day, currentDate) ? 'bg-muted/30 text-muted-foreground' : ''}`}
                >
                  <div className={`text-xs font-medium mb-1 ${isToday(day) ? 'text-[#FF6B35]' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((e) => (
                      <div key={e.id} className={`text-[10px] px-1.5 py-0.5 rounded text-white truncate ${statusColors[e.status || 'todo']}`}>
                        {e.taskId} {e.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'week' && (
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 bg-muted text-center text-sm font-medium py-2">
            {weekDays.map((d) => (
              <div key={d.toISOString()} className={isToday(d) ? 'text-[#FF6B35]' : ''}>
                {format(d, 'EEE d', { locale: ru })}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {weekDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              return (
                <div key={day.toISOString()} className={`min-h-[300px] border border-border p-2 ${isToday(day) ? 'bg-primary/5' : ''}`}>
                  <div className="space-y-1">
                    {dayEvents.map((e) => (
                      <div key={e.id} className={`text-xs px-2 py-1 rounded text-white ${statusColors[e.status || 'todo']}`}>
                        <div className="font-medium">{e.taskId}</div>
                        <div>{e.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'day' && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{format(currentDate, 'EEEE, d MMMM yyyy', { locale: ru })}</h3>
          <div className="space-y-2">
            {getEventsForDay(currentDate).map((e) => (
              <div key={e.id} className={`p-3 rounded text-white ${statusColors[e.status || 'todo']}`}>
                <div className="font-medium">{e.taskId} — {e.title}</div>
                <div className="text-sm opacity-90">{e.start} → {e.end}</div>
              </div>
            ))}
            {getEventsForDay(currentDate).length === 0 && (
              <div className="text-muted-foreground text-sm">Нет событий на этот день</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
