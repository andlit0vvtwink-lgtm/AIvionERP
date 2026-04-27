import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Sparkles, Calendar, Users, Filter } from 'lucide-react';
import { subProjects, tasks, aiSummaries } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const columns = [
  { id: 'backlog', label: 'Backlog', color: 'bg-gray-400' },
  { id: 'todo', label: 'To Do', color: 'bg-blue-500' },
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

export default function SubProjectPage() {
  const { projectId, subId } = useParams<{ projectId: string; subId: string }>();
  const sub = subProjects.find((s) => s.id === subId && s.projectId === projectId);
  const [taskList, setTaskList] = useState(tasks.filter((t) => t.subProjectId === subId));
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [newTaskCol, setNewTaskCol] = useState<string | null>(null);
  const [filterAssignee, setFilterAssignee] = useState('');
  const [openModal, setOpenModal] = useState(false);

  if (!sub) return <div>Подпроект не найден</div>;

  const currentTask = taskList.find((t) => t.id === selectedTask);

  const filteredTasks = filterAssignee
    ? taskList.filter((t) => t.assignee.toLowerCase().includes(filterAssignee.toLowerCase()))
    : taskList;

  const addTask = (colId: string, title: string) => {
    const newTask = {
      id: `KAN-${taskList.length + 20}`,
      title,
      type: 'task' as const,
      status: colId as any,
      priority: 'medium' as const,
      deadline: '2026-05-01',
      assignee: 'Я',
      projectId: projectId!,
      subProjectId: subId,
      tags: [],
    };
    setTaskList((prev) => [...prev, newTask]);
    setNewTaskCol(null);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">{sub.name}</h1>
          <Badge variant="secondary" className="bg-green-500 text-white">Активный</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {sub.deadline}</div>
          <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {sub.members.join(', ')}</div>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" className="gap-1"><Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI</Button>
            <Button size="sm" style={{ backgroundColor: '#FF6B35' }} className="gap-1" onClick={() => setOpenModal(true)}><Plus className="h-3 w-3" /> Задача</Button>
          </div>
        </div>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader><DialogTitle>Новая задача</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            <Input placeholder="Название" />
            <Textarea placeholder="Описание" />
            <Input placeholder="Исполнитель" />
            <Input type="date" placeholder="Дедлайн" />
            <Button className="w-full" style={{ backgroundColor: '#FF6B35' }} onClick={() => setOpenModal(false)}>Создать</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Фильтр по исполнителю" className="w-48 h-8 text-sm" value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {columns.map((col) => (
              <div key={col.id} className="min-w-[260px] flex-1">
                <div className={`flex items-center gap-2 mb-2 px-2 py-1 rounded text-white text-sm font-medium ${col.color}`}>
                  {col.label}
                  <span className="ml-auto text-xs">{filteredTasks.filter((t) => t.status === col.id).length}</span>
                </div>
                <div className="space-y-2 min-h-[100px]">
                  {filteredTasks.filter((t) => t.status === col.id).map((task) => (
                    <Card
                      key={task.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow ${priorityColors[task.priority]}`}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      <CardContent className="p-3">
                        <div className="text-sm font-medium mb-1">{task.title}</div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{task.id}</span>
                          <span>{task.deadline}</span>
                        </div>
                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.tags.map((tag) => (
                              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {newTaskCol === col.id ? (
                    <div className="p-2">
                      <Input
                        autoFocus
                        placeholder="Название задачи"
                        className="h-8 text-sm mb-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') addTask(col.id, (e.target as HTMLInputElement).value);
                          if (e.key === 'Escape') setNewTaskCol(null);
                        }}
                      />
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" className="w-full text-muted-foreground text-xs" onClick={() => setNewTaskCol(col.id)}>
                      <Plus className="h-3 w-3 mr-1" /> Добавить
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardContent className="p-4">
              <Textarea placeholder="Заметки подпроекта..." className="min-h-[200px]" defaultValue="- Обсудить дизайн с клиентом\n- Уточнить сроки\n- Подготовить мокапы" />
              <div className="flex items-center gap-2 mt-3">
                <Button size="sm" variant="outline" className="gap-1"><Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI: summary</Button>
                <Button size="sm" variant="outline">Превратить в задачу</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <div className="space-y-2">
            {['Презентация.pptx', 'Бриф.docx', 'Макеты.fig'].map((f) => (
              <Card key={f} className="cursor-pointer hover:bg-muted/50">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs font-medium">{f.split('.').pop()?.toUpperCase()}</div>
                    <span className="text-sm">{f}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1"><Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="space-y-3">
            {[
              { date: '2026-04-25 10:00', text: 'Создана задача KAN-01' },
              { date: '2026-04-25 14:30', text: 'Алексей изменил статус KAN-08 на Done' },
              { date: '2026-04-24 09:15', text: 'Добавлена заметка' },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="text-muted-foreground text-xs w-32 shrink-0">{log.date}</div>
                <div>{log.text}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {currentTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{currentTask.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-2 grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <Textarea placeholder="Описание" className="min-h-[120px]" defaultValue={currentTask.description || ''} />
                <div>
                  <h4 className="text-sm font-medium mb-2">Подзадачи</h4>
                  <div className="space-y-1">
                    {(currentTask.subtasks || []).map((st) => (
                      <div key={st.id} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked={st.done} className="rounded" />
                        <span className={st.done ? 'line-through text-muted-foreground' : ''}>{st.title}</span>
                      </div>
                    ))}
                    <Button size="sm" variant="ghost" className="text-xs text-muted-foreground"><Plus className="h-3 w-3 mr-1" /> Добавить</Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Комментарии</h4>
                  <div className="space-y-2">
                    {(currentTask.comments || []).length === 0 && (
                      <div className="text-sm text-muted-foreground">Нет комментариев</div>
                    )}
                    <Input placeholder="Добавить комментарий..." />
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">Статус:</span> <Badge>{currentTask.status}</Badge></div>
                <div><span className="text-muted-foreground">Приоритет:</span> {currentTask.priority}</div>
                <div><span className="text-muted-foreground">Исполнитель:</span> {currentTask.assignee}</div>
                <div><span className="text-muted-foreground">Срок:</span> {currentTask.deadline}</div>
                <div><span className="text-muted-foreground">Автор:</span> {currentTask.author || '—'}</div>
                <div className="border-t border-border pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-[#FF6B35]" />
                    <span className="font-medium">AI</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{aiSummaries[currentTask.id] || 'Нет AI-summary.'}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Button size="sm" variant="outline" className="text-[10px] h-6">Разбить</Button>
                    <Button size="sm" variant="outline" className="text-[10px] h-6">План</Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
