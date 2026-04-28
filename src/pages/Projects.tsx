import { useMemo, useState } from 'react';
import { Plus, MoreHorizontal, Calendar, Users, FileDown, PenSquare } from 'lucide-react';
import { projects, subProjects } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: 'Активный', color: 'bg-[#22C55E]/20 text-[#86efac] border-[#22C55E]/35' },
  'on-hold': { label: 'На паузе', color: 'bg-[#F59E0B]/20 text-[#fbbf24] border-[#F59E0B]/35' },
};

const projectFiles = [
  { name: 'contract.pdf', size: '2.2 MB', date: '2026-04-20' },
  { name: 'technical_specification.pdf', size: '1.1 MB', date: '2026-04-22' },
  { name: 'ui_mockup.fig', size: '8.4 MB', date: '2026-04-25' },
  { name: 'analytics.xlsx', size: '620 KB', date: '2026-04-27' },
];

export default function Projects() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const currentProject = projects.find((p) => p.id === selectedProject);
  const relatedSubprojects = useMemo(() => subProjects.filter((sp) => sp.projectId === selectedProject), [selectedProject]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Проекты</h1>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Новый проект</Button>
          </DialogTrigger>
          <DialogContent className="h-auto min-h-0 max-w-xl w-full overflow-visible">
            <DialogHeader><DialogTitle>Новый проект</DialogTitle></DialogHeader>
            <div className="mt-2 space-y-3">
              <Input placeholder="Название проекта" /><Textarea placeholder="Описание" /><Input placeholder="Клиент" /><Input placeholder="Участники (через запятую)" /><Input type="date" placeholder="Дедлайн" />
              <Button className="w-full" onClick={() => setOpenModal(false)}>Создать</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => {
          const badge = statusMap[project.status] || statusMap.active;
          return (
            <Card key={project.id} className="group relative cursor-pointer overflow-hidden bg-[#17171C] transition-all duration-200 ds-card-hover" onClick={() => setSelectedProject(project.id)}>
              <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: project.color }} />
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="pr-6 text-base font-bold">{project.name}</h3>
                  <Button size="sm" variant="ghost" className="absolute right-3 top-3 h-7 w-7 p-0"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                </div>
                <Badge variant="outline" className={`${badge.color} mb-3 text-[10px]`}>{badge.label}</Badge>
                <p className="mb-3 line-clamp-2 text-sm text-[#B3B3BA]">{project.summary}</p>
                <div className="mb-3 flex items-center gap-4 text-xs text-[#7B7B85]">
                  <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{project.deadline}</div>
                  <div className="flex items-center gap-1"><Users className="h-3 w-3" />{project.members.length}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    {project.members.map((m, i) => (
                      <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#1D1D24] text-[10px] font-medium">{m[0]}</div>
                    ))}
                  </div>
                  <span className="text-xs text-[#7B7B85]">{project.taskCount} задач</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {currentProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle className="text-4xl font-bold">{currentProject.name}</DialogTitle>
                  <p className="mt-3 text-base text-[#B3B3BA]">{currentProject.summary}</p>
                </div>
                <Button size="sm" variant="secondary" className="gap-2"><PenSquare className="h-4 w-4" />Редактировать</Button>
              </div>
            </DialogHeader>

            <div className="mt-3 grid gap-3 ds-surface p-4 text-sm sm:grid-cols-2 lg:grid-cols-5">
              <div><div className="text-xs text-[#7B7B85]">Статус</div><Badge className="mt-1">{statusMap[currentProject.status]?.label || 'Активный'}</Badge></div>
              <div><div className="text-xs text-[#7B7B85]">Дата создания</div><div className="mt-1">2026-04-10</div></div>
              <div><div className="text-xs text-[#7B7B85]">Подпроекты</div><div className="mt-1">{relatedSubprojects.length}</div></div>
              <div><div className="text-xs text-[#7B7B85]">Задач</div><div className="mt-1">{currentProject.taskCount}</div></div>
              <div><div className="text-xs text-[#7B7B85]">Дедлайн</div><div className="mt-1">{currentProject.deadline}</div></div>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold">Подпроекты</h3>
                <Button><Plus className="mr-1 h-4 w-4" />Создать подпроект</Button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedSubprojects.map((sub) => (
                  <Card key={sub.id} className="group cursor-pointer overflow-hidden bg-[#17171C] transition-all duration-200 ds-card-hover">
                    <CardContent className="p-4">
                      <h4 className="font-bold">{sub.name}</h4>
                      <p className="mt-2 line-clamp-2 text-xs text-[#B3B3BA]">{sub.summary}</p>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <Badge variant="secondary">{statusMap[sub.status]?.label || sub.status}</Badge>
                        <span className="text-[#7B7B85]">{sub.taskCount} задач</span>
                      </div>
                      <div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-[#F4511E]" style={{ width: `${Math.min(100, sub.taskCount * 12)}%` }} /></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-xl font-bold">Материалы / Файлы</h3>
              <div className="space-y-2">
                {projectFiles.map((file) => (
                  <div key={file.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#17171C] p-3 transition-colors hover:bg-[#1D1D24]">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[#F4511E]/20 p-2"><FileDown className="h-4 w-4 text-[#FF7A4D]" /></div>
                      <div>
                        <div className="text-sm font-semibold">{file.name}</div>
                        <div className="text-xs text-[#7B7B85]">{file.size} • загружен {file.date}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-[#FF7A4D]">Открыть</Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
