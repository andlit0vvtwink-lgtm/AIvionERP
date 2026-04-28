import { useState } from 'react';
import { LayoutGrid, List, Filter, Plus, Search } from 'lucide-react';
import { tasks, aiSummaries } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const columns = [
  { id: 'backlog', label: 'Backlog', color: 'bg-slate-500' },
  { id: 'todo', label: 'New', color: 'bg-blue-500' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-[#FF6B35]' },
  { id: 'review', label: 'Review', color: 'bg-purple-500' },
  { id: 'done', label: 'Done', color: 'bg-green-500' },
];

const priorityColors: Record<string, string> = {
  low: 'border-l-2 border-gray-400',
  medium: 'border-l-2 border-blue-400',
  high: 'border-l-2 border-[#FF6B35]',
  urgent: 'border-l-2 border-red-500',
};

export default function Tasks() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [taskList, setTaskList] = useState(tasks);
  const [search, setSearch] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [newTaskCol, setNewTaskCol] = useState<string | null>(null);

  const currentTask = taskList.find((t) => t.id === selectedTask);

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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Задачи</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant={view === 'kanban' ? 'default' : 'ghost'} onClick={() => setView('kanban')} className="gap-1"><LayoutGrid className="h-4 w-4" /> Kanban</Button>
          <Button size="sm" variant={view === 'list' ? 'default' : 'ghost'} onClick={() => setView('list')} className="gap-1"><List className="h-4 w-4" /> Список</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Поиск по задачам..." className="w-64 h-8 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Filter className="h-4 w-4 text-muted-foreground ml-2" />
        <Input placeholder="Исполнитель" className="w-40 h-8 text-sm" value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} />
      </div>

      {view === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {columns.map((col) => (
            <div key={col.id} className="min-w-[280px] flex-1">
              <div className={`flex items-center gap-2 mb-2 px-2 py-1.5 rounded-xl text-white text-sm font-medium ${col.color}`}>
                {col.label}
                <span className="ml-auto text-xs">{filtered.filter((t) => t.status === col.id).length}</span>
              </div>
              <div className="space-y-2 min-h-[120px]">
                {filtered.filter((t) => t.status === col.id).map((task) => (
                  <Card key={task.id} className={`cursor-pointer glass-panel border-white/10 hover:shadow-md transition-shadow ${priorityColors[task.priority]}`} onClick={() => setSelectedTask(task.id)}>
                    <CardContent className="p-3">
                      <div className="text-sm font-medium mb-1">{task.title}</div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{task.id}</span><span>{task.deadline}</span></div>
                    </CardContent>
                  </Card>
                ))}
                {newTaskCol === col.id ? (
                  <div className="p-2"><Input autoFocus placeholder="Название задачи" className="h-8 text-sm mb-1" onKeyDown={(e) => { if (e.key === 'Enter') addTask(col.id, (e.target as HTMLInputElement).value); if (e.key === 'Escape') setNewTaskCol(null); }} /></div>
                ) : (
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground text-xs" onClick={() => setNewTaskCol(col.id)}><Plus className="h-3 w-3 mr-1" /> Добавить</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted"><tr><th className="text-left px-3 py-2 font-medium">ID</th><th className="text-left px-3 py-2 font-medium">Название</th><th className="text-left px-3 py-2 font-medium">Статус</th><th className="text-left px-3 py-2 font-medium">Приоритет</th><th className="text-left px-3 py-2 font-medium">Исполнитель</th><th className="text-left px-3 py-2 font-medium">Дедлайн</th></tr></thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.id} className="border-t hover:bg-muted/50 cursor-pointer" onClick={() => setSelectedTask(task.id)}><td className="px-3 py-2 text-muted-foreground">{task.id}</td><td className="px-3 py-2">{task.title}</td><td className="px-3 py-2"><Badge variant="secondary">{task.status}</Badge></td><td className="px-3 py-2">{task.priority}</td><td className="px-3 py-2">{task.assignee}</td><td className="px-3 py-2">{task.deadline}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="max-w-6xl h-[85vh] glass-panel border-white/10 overflow-y-auto">
            <DialogHeader><DialogTitle className="text-2xl">{currentTask.title}</DialogTitle></DialogHeader>
            <div className="mt-2 grid grid-cols-4 gap-4">
              <div className="col-span-3 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><h4 className="text-sm font-medium mb-2">Описание</h4><Textarea rows={8} defaultValue={currentTask.description || ''} placeholder="Добавьте подробное описание задачи..." /></div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4"><h4 className="text-sm font-medium mb-2">Подзадачи</h4><div className="space-y-1">{(currentTask.subtasks || []).map((st) => (<div key={st.id} className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={st.done} className="rounded" /><span className={st.done ? 'line-through text-muted-foreground' : ''}>{st.title}</span></div>))}<Button size="sm" variant="ghost" className="text-xs text-muted-foreground"><Plus className="h-3 w-3 mr-1" /> Добавить подзадачу</Button></div></div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"><span className="text-muted-foreground">Статус:</span> <Badge>{currentTask.status}</Badge></div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"><span className="text-muted-foreground">Приоритет:</span> {currentTask.priority}</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"><span className="text-muted-foreground">Исполнитель:</span> {currentTask.assignee}</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"><span className="text-muted-foreground">Срок:</span> {currentTask.deadline}</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="font-medium mb-2">AI Summary</div><p className="text-xs text-muted-foreground">{aiSummaries[currentTask.id] || 'Нет AI-summary.'}</p></div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
