import { useState } from 'react';
import { Plus, MoreHorizontal, Calendar, Users } from 'lucide-react';
import { projects } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: 'Активный', color: 'bg-green-500' },
  'on-hold': { label: 'На паузе', color: 'bg-amber-500' },
};

export default function Projects() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const currentProject = projects.find((p) => p.id === selectedProject);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Проекты</h1>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="gap-2" style={{ backgroundColor: '#FF6B35' }}><Plus className="h-4 w-4" /> Новый проект</Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10">
            <DialogHeader><DialogTitle>Новый проект</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <Input placeholder="Название проекта" /><Textarea placeholder="Описание" /><Input placeholder="Клиент" /><Input placeholder="Участники (через запятую)" /><Input type="date" placeholder="Дедлайн" />
              <Button className="w-full" style={{ backgroundColor: '#FF6B35' }} onClick={() => setOpenModal(false)}>Создать</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project) => {
          const badge = statusMap[project.status] || statusMap.active;
          return (
            <Card key={project.id} className="relative overflow-hidden group cursor-pointer border border-white/10 glass-panel hover:border-[#FF6B35]/50 transition-all" onClick={() => setSelectedProject(project.id)}>
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-base pr-6">{project.name}</h3>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 absolute top-3 right-3"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                </div>
                <Badge variant="secondary" className={`${badge.color} text-white text-[10px] mb-3`}>{badge.label}</Badge>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.summary}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{project.deadline}</div>
                  <div className="flex items-center gap-1"><Users className="h-3 w-3" />{project.members.length}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    {project.members.map((m, i) => (
                      <div key={i} className="h-6 w-6 rounded-full bg-muted border border-background flex items-center justify-center text-[10px] font-medium">{m[0]}</div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{project.taskCount} задач</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {currentProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-6xl h-[82vh] glass-panel border-white/10 overflow-y-auto">
            <DialogHeader><DialogTitle className="text-2xl">{currentProject.name}</DialogTitle></DialogHeader>
            <div className="grid grid-cols-3 gap-5 mt-2 h-full">
              <div className="col-span-2 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-medium mb-2">Описание проекта</h3>
                  <Textarea defaultValue={currentProject.summary} rows={7} />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-medium mb-2">Подпроекты и задачи</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg bg-black/20 p-3">Сбор БЗ — 7 задач</div>
                    <div className="rounded-lg bg-black/20 p-3">Презентация — 5 задач</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-muted-foreground text-xs">Статус</div>
                  <div className="mt-1 flex gap-2">
                    <Badge className="bg-green-500">Активный</Badge>
                    <Badge variant="secondary">На паузе</Badge>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="text-muted-foreground text-xs">Дедлайн</div><div className="mt-1">{currentProject.deadline}</div></div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="text-muted-foreground text-xs">Команда</div><div className="mt-1">{currentProject.members.join(', ')}</div></div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
