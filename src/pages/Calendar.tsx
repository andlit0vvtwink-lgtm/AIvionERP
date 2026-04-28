import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { calendarEvents, tasks } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import TaskModal from '@/components/tasks/TaskModal';

const statusColors: Record<string, string> = {
  backlog: 'bg-gray-500',
  todo: 'bg-blue-500',
  'in-progress': 'bg-[#ff4d00]',
  review: 'bg-purple-500',
  done: 'bg-green-500',
};

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 28));
  const [search, setSearch] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const events = calendarEvents.filter((e) => (!search ? true : e.title.toLowerCase().includes(search.toLowerCase())));

  const getEventsForDay = (day: Date) => events.filter((e) => {
    const start = new Date(e.start);
    const end = new Date(e.end);
    return day >= start && day <= end;
  });

  const goToday = () => setCurrentDate(new Date(2026, 3, 28));
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) || null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Календарь</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={goToday}>Сегодня</Button>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={() => setCurrentDate(view === 'month' ? subMonths(currentDate, 1) : view === 'week' ? addDays(currentDate, -7) : subDays(currentDate, 1))}><ChevronLeft className="h-4 w-4" /></Button>
            <span className="w-32 text-center text-sm font-medium">{format(currentDate, view === 'day' ? 'd MMMM yyyy' : 'MMMM yyyy', { locale: ru })}</span>
            <Button size="sm" variant="ghost" onClick={() => setCurrentDate(view === 'month' ? addMonths(currentDate, 1) : view === 'week' ? addDays(currentDate, 7) : addDays(currentDate, 1))}><ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="ml-2 flex items-center gap-1">
            <Button size="sm" variant={view === 'month' ? 'default' : 'ghost'} onClick={() => setView('month')}>Месяц</Button>
            <Button size="sm" variant={view === 'week' ? 'default' : 'ghost'} onClick={() => setView('week')}>Неделя</Button>
            <Button size="sm" variant={view === 'day' ? 'default' : 'ghost'} onClick={() => setView('day')}>День</Button>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Поиск..." className="h-9 w-64 border-white/15 bg-black/20" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Filter className="ml-2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Исполнитель" className="h-9 w-40 border-white/15 bg-black/20" />
      </div>

      {view === 'month' && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12161f]">
          <div className="grid grid-cols-7 bg-white/5 py-2 text-center text-sm font-medium">{['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => <div key={d}>{d}</div>)}</div>
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const dayEvents = getEventsForDay(day);
              return (
                <div key={i} className={`min-h-[105px] border border-white/10 p-1.5 ${isToday(day) ? 'bg-primary/5' : ''} ${!isSameMonth(day, currentDate) ? 'bg-muted/10 text-muted-foreground' : ''}`}>
                  <div className={`mb-1 text-xs font-medium ${isToday(day) ? 'text-[#ff4d00]' : ''}`}>{format(day, 'd')}</div>
                  <div className="space-y-1">
                    {dayEvents.map((e) => (
                      <button key={e.id} className={`w-full truncate rounded px-1.5 py-0.5 text-left text-[10px] text-white transition-transform hover:scale-[1.02] ${statusColors[e.status || 'todo']}`} onClick={() => setSelectedTaskId(e.taskId || null)}>
                        {e.taskId} {e.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'week' && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12161f]">
          <div className="grid grid-cols-7 bg-white/5 py-2 text-center text-sm font-medium">{weekDays.map((d) => <div key={d.toISOString()} className={isToday(d) ? 'text-[#ff4d00]' : ''}>{format(d, 'EEE d', { locale: ru })}</div>)}</div>
          <div className="grid grid-cols-7">
            {weekDays.map((day) => (
              <div key={day.toISOString()} className={`min-h-[300px] border border-white/10 p-2 ${isToday(day) ? 'bg-primary/5' : ''}`}>
                <div className="space-y-1">
                  {getEventsForDay(day).map((e) => (
                    <button key={e.id} className={`w-full rounded px-2 py-1 text-left text-xs text-white transition-transform hover:scale-[1.02] ${statusColors[e.status || 'todo']}`} onClick={() => setSelectedTaskId(e.taskId || null)}>
                      <div className="font-medium">{e.taskId}</div><div>{e.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'day' && (
        <div className="rounded-2xl border border-white/10 bg-[#12161f] p-4">
          <h3 className="mb-3 text-lg font-semibold">{format(currentDate, 'EEEE, d MMMM yyyy', { locale: ru })}</h3>
          <div className="space-y-2">
            {getEventsForDay(currentDate).map((e) => (
              <button key={e.id} className={`w-full rounded p-3 text-left text-white transition-transform hover:scale-[1.01] ${statusColors[e.status || 'todo']}`} onClick={() => setSelectedTaskId(e.taskId || null)}>
                <div className="font-medium">{e.taskId} — {e.title}</div><div className="text-sm opacity-90">{e.start} → {e.end}</div>
              </button>
            ))}
            {getEventsForDay(currentDate).length === 0 && <div className="text-sm text-muted-foreground">Нет событий на этот день</div>}
          </div>
        </div>
      )}

      <TaskModal task={selectedTask} open={!!selectedTaskId} onOpenChange={() => setSelectedTaskId(null)} />
    </div>
  );
}
