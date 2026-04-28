import { Activity, CalendarClock, CircleUserRound, Flag, Link2, MessageSquare, Tag } from 'lucide-react';
import type { Task } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RichTextEditor from './RichTextEditor';

const statusLabel: Record<Task['status'], string> = {
  backlog: 'Backlog',
  todo: 'К выполнению',
  'in-progress': 'В работе',
  review: 'Review',
  done: 'Готово',
};

const priorityLabel: Record<Task['priority'], string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  urgent: 'Критический',
};

interface TaskModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TaskModal({ task, open, onOpenChange }: TaskModalProps) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px] w-[95vw] h-[82vh] overflow-y-auto border-white/10 bg-[#11141d] p-0">
        <DialogHeader className="border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3 text-xs text-white/50">
            <span>{task.id}</span>
            <span>•</span>
            <span>{task.type}</span>
          </div>
          <DialogTitle className="text-3xl font-semibold tracking-tight mt-2">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-5 p-6">
          <div className="space-y-5">
            <RichTextEditor initialValue={task.description ? `<p>${task.description}</p>` : undefined} />

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="mb-3 text-lg font-medium">Чеклисты</h3>
              <div className="space-y-2 text-sm">
                {(task.subtasks || []).map((subtask) => (
                  <label key={subtask.id} className="flex items-center gap-2 text-white/85">
                    <input type="checkbox" defaultChecked={subtask.done} className="h-4 w-4 rounded border-white/20 bg-transparent" />
                    <span className={subtask.done ? 'line-through text-white/50' : ''}>{subtask.title}</span>
                  </label>
                ))}
                <Button variant="ghost" size="sm" className="text-xs text-[#ff8f65]">+ Добавить пункт</Button>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="mb-3 text-lg font-medium">Комментарии</h3>
              <div className="space-y-3 text-sm text-white/70">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3"><strong className="text-white">Мария:</strong> Давайте проверим адаптив до релиза.</div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3"><strong className="text-white">Алексей:</strong> Добавил обновление по API.</div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h3 className="mb-3 text-lg font-medium">Активность</h3>
              <div className="space-y-2 text-xs text-white/60">
                <p><Activity className="mr-2 inline h-3 w-3" />Статус изменен: todo → in-progress</p>
                <p><MessageSquare className="mr-2 inline h-3 w-3" />Оставлен комментарий 2 часа назад</p>
              </div>
            </section>
          </div>

          <aside className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <h4 className="text-sm font-medium mb-3">Сведения</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-white/60"><CircleUserRound className="inline h-4 w-4 mr-1" />Исполнитель</span><span>{task.assignee}</span></div>
                <div className="flex items-center justify-between"><span className="text-white/60">Статус</span><Badge className="bg-[#ff4d00]">{statusLabel[task.status]}</Badge></div>
                <div className="flex items-center justify-between"><span className="text-white/60"><Flag className="inline h-4 w-4 mr-1" />Приоритет</span><span>{priorityLabel[task.priority]}</span></div>
                <div className="flex items-center justify-between"><span className="text-white/60"><CalendarClock className="inline h-4 w-4 mr-1" />Дедлайн</span><span>{task.deadline}</span></div>
                <div className="flex items-center justify-between"><span className="text-white/60"><Tag className="inline h-4 w-4 mr-1" />Теги</span><span>{task.tags.join(', ') || '—'}</span></div>
                <div className="flex items-center justify-between"><span className="text-white/60"><Link2 className="inline h-4 w-4 mr-1" />Проект</span><span>{task.projectId}</span></div>
              </div>
            </div>
            <Button className="w-full bg-[#ff4d00] hover:bg-[#ff6726]">Обновить задачу</Button>
            <Button variant="outline" className="w-full border-white/20 bg-transparent">Переместить в Done</Button>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
