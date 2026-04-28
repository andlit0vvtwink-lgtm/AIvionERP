import { useState } from 'react';
import { LayoutGrid, List, Filter, Plus, Search } from 'lucide-react';
import { tasks } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import TaskModal from '@/components/tasks/TaskModal';

const columns = [
  { id: 'backlog', label: 'Backlog', color: 'bg-slate-600' },
  { id: 'todo', label: 'New', color: 'bg-blue-500' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-[#ff4d00]' },
  { id: 'review', label: 'Review', color: 'bg-purple-500' },
  { id: 'done', label: 'Done', color: 'bg-green-500' },
] as const;

const priorityColors: Record<string, string> = {
  low: 'border-l-2 border-gray-400',
  medium: 'border-l-2 border-blue-400',
  high: 'border-l-2 border-[#ff7b47]',
  urgent: 'border-l-2 border-red-500',
};

export default function Tasks() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [taskList, setTaskList] = useState(tasks);
  const [search, setSearch] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [newTaskCol, setNewTaskCol] = useState<string | null>(null);

  const currentTask = taskList.find((t) => t.id === selectedTask) || null;

  const filtered = taskList.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchAssignee = filterAssignee ? t.assignee.toLowerCase().includes(filterAssignee.toLowerCase()) : true;
    return matchSearch && matchAssignee;
  });

  const addTask = (colId: string, title: string) => {
    const newTask = { id: `KAN-${taskList.length + 30}`, title, type: 'task' as const, status: colId as any, priority: 'medium' as const, deadline: '2026-05-01', assignee: 'Я', projectId: 'proj-1', tags: [] };
    setTaskList((prev) => [...prev, newTask]);
    setNewTaskCol(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Задачи</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant={view === 'kanban' ? 'default' : 'ghost'} onClick={() => setView('kanban')} className="gap-1"><LayoutGrid className="h-4 w-4" /> Kanban</Button>
          <Button size="sm" variant={view === 'list' ? 'default' : 'ghost'} onClick={() => setView('list')} className="gap-1"><List className="h-4 w-4" /> Список</Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Поиск по задачам..." className="h-9 w-64 border-white/15 bg-black/20" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Filter className="ml-2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Исполнитель" className="h-9 w-40 border-white/15 bg-black/20" value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} />
      </div>

      {view === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {columns.map((col) => (
            <div key={col.id} className="min-w-[290px] flex-1">
              <div className={`mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white ${col.color}`}>
                {col.label}
                <span className="ml-auto text-xs">{filtered.filter((t) => t.status === col.id).length}</span>
              </div>
              <div className="space-y-2 min-h-[120px]">
                {filtered.filter((t) => t.status === col.id).map((task) => (
                  <Card key={task.id} className={`cursor-pointer border-white/10 bg-[#151927] transition-all hover:-translate-y-0.5 hover:border-[#ff4d00]/40 ${priorityColors[task.priority]}`} onClick={() => setSelectedTask(task.id)}>
                    <CardContent className="p-3">
                      <div className="mb-1 text-sm font-medium">{task.title}</div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{task.id}</span><span>{task.deadline}</span></div>
                    </CardContent>
                  </Card>
                ))}
                {newTaskCol === col.id ? (
                  <div className="p-2"><Input autoFocus placeholder="Название задачи" className="mb-1 h-8 border-white/15 bg-black/20 text-sm" onKeyDown={(e) => { if (e.key === 'Enter') addTask(col.id, (e.target as HTMLInputElement).value); if (e.key === 'Escape') setNewTaskCol(null); }} /></div>
                ) : (
                  <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground" onClick={() => setNewTaskCol(col.id)}><Plus className="mr-1 h-3 w-3" /> Добавить</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12161f]">
          <table className="w-full text-sm">
            <thead className="bg-white/5"><tr><th className="px-3 py-2 text-left font-medium">ID</th><th className="px-3 py-2 text-left font-medium">Название</th><th className="px-3 py-2 text-left font-medium">Статус</th><th className="px-3 py-2 text-left font-medium">Приоритет</th><th className="px-3 py-2 text-left font-medium">Исполнитель</th><th className="px-3 py-2 text-left font-medium">Дедлайн</th></tr></thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.id} className="cursor-pointer border-t border-white/10 hover:bg-white/5" onClick={() => setSelectedTask(task.id)}><td className="px-3 py-2 text-muted-foreground">{task.id}</td><td className="px-3 py-2">{task.title}</td><td className="px-3 py-2"><Badge variant="secondary">{task.status}</Badge></td><td className="px-3 py-2">{task.priority}</td><td className="px-3 py-2">{task.assignee}</td><td className="px-3 py-2">{task.deadline}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TaskModal task={currentTask} open={!!selectedTask} onOpenChange={() => setSelectedTask(null)} />
    </div>
  );
}
