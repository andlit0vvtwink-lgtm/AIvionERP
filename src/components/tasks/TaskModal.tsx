import { useMemo, useState } from 'react';
import { Activity, CalendarClock, CircleUserRound, Flag, Link2, MessageSquare, Paperclip, Tag } from 'lucide-react';
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
  const [activityTab, setActivityTab] = useState<'all' | 'comments' | 'history'>('all');

  const attachments = useMemo(
    () => [
      { name: 'brief.pdf', size: '1.6 MB' },
      { name: 'ui-notes.docx', size: '340 KB' },
    ],
    []
  );

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="border-b border-white/10 px-8 py-6 bg-[#17171C]">
          <div className="flex items-center gap-3 text-xs text-[#B3B3BA]">
            <span>{task.id}</span>
            <span>•</span>
            <span>{task.type}</span>
            <Badge variant="secondary" className="ml-2">{statusLabel[task.status]}</Badge>
          </div>
          <DialogTitle className="text-4xl font-bold tracking-tight mt-2">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 p-8 h-[calc(82vh-110px)] overflow-y-auto">
          <div className="space-y-5">
            <RichTextEditor initialValue={task.description ? `<p>${task.description}</p>` : undefined} />

            <section className="ds-surface p-5">
              <h3 className="mb-3 text-lg font-bold">Чек-листы</h3>
              <div className="space-y-2 text-sm">
                {(task.subtasks || []).map((subtask) => (
                  <label key={subtask.id} className="flex items-center gap-2 text-white/90">
                    <input type="checkbox" defaultChecked={subtask.done} className="h-4 w-4 rounded border-white/20 bg-transparent" />
                    <span className={subtask.done ? 'line-through text-white/50' : ''}>{subtask.title}</span>
                  </label>
                ))}
                <Button variant="ghost" size="sm" className="text-[#FF7A4D]">+ Добавить пункт</Button>
              </div>
            </section>

            <section className="ds-surface p-5">
              <h3 className="mb-3 text-lg font-bold">Активность</h3>
              <div className="mb-3 inline-flex rounded-xl border border-white/10 bg-[#17171C] p-1 text-xs">
                <button onClick={() => setActivityTab('all')} className={`rounded-lg px-3 py-1.5 ${activityTab === 'all' ? 'bg-[#F4511E]/20 text-[#FF7A4D]' : 'text-[#B3B3BA]'}`}>Все</button>
                <button onClick={() => setActivityTab('comments')} className={`rounded-lg px-3 py-1.5 ${activityTab === 'comments' ? 'bg-[#F4511E]/20 text-[#FF7A4D]' : 'text-[#B3B3BA]'}`}>Комментарии</button>
                <button onClick={() => setActivityTab('history')} className={`rounded-lg px-3 py-1.5 ${activityTab === 'history' ? 'bg-[#F4511E]/20 text-[#FF7A4D]' : 'text-[#B3B3BA]'}`}>История</button>
              </div>
              <div className="space-y-2 text-sm text-[#B3B3BA]">
                {(activityTab === 'all' || activityTab === 'history') && <p><Activity className="mr-2 inline h-3 w-3" />Статус изменен: todo → in-progress</p>}
                {(activityTab === 'all' || activityTab === 'comments') && <p><MessageSquare className="mr-2 inline h-3 w-3" />Оставлен комментарий 2 часа назад</p>}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="ds-surface p-5">
              <h4 className="text-sm font-bold mb-3">Сведения</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-[#B3B3BA]"><CircleUserRound className="inline h-4 w-4 mr-1" />Исполнитель</span><span>{task.assignee}</span></div>
                <div className="flex items-center justify-between"><span className="text-[#B3B3BA]">Статус</span><Badge>{statusLabel[task.status]}</Badge></div>
                <div className="flex items-center justify-between"><span className="text-[#B3B3BA]"><Flag className="inline h-4 w-4 mr-1" />Приоритет</span><span>{priorityLabel[task.priority]}</span></div>
                <div className="flex items-center justify-between"><span className="text-[#B3B3BA]"><CalendarClock className="inline h-4 w-4 mr-1" />Дедлайн</span><span>{task.deadline}</span></div>
                <div className="flex items-center justify-between"><span className="text-[#B3B3BA]"><Tag className="inline h-4 w-4 mr-1" />Теги</span><span>{task.tags.join(', ') || '—'}</span></div>
                <div className="flex items-center justify-between"><span className="text-[#B3B3BA]"><Link2 className="inline h-4 w-4 mr-1" />Проект</span><span>{task.projectId}</span></div>
              </div>
            </div>

            <div className="ds-surface p-5">
              <h4 className="mb-3 text-sm font-bold">Вложения</h4>
              <div className="space-y-2">
                {attachments.map((file) => (
                  <div key={file.name} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#17171C] px-3 py-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Paperclip className="h-3.5 w-3.5 text-[#FF7A4D]" />
                      <div>
                        <div className="text-white">{file.name}</div>
                        <div className="text-[#7B7B85]">{file.size}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-[#FF7A4D]">Открыть</Button>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">Обновить задачу</Button>
            <Button variant="outline" className="w-full">Переместить в Done</Button>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
