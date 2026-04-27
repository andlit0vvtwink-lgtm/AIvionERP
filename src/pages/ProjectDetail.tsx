import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Sparkles, MoreHorizontal, ArrowRight, Calendar, Users, ChevronDown } from 'lucide-react';
import { projects, subProjects } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: 'Активный', color: 'bg-green-500' },
  completed: { label: 'Завершён', color: 'bg-blue-500' },
  archived: { label: 'Архив', color: 'bg-gray-500' },
  'on-hold': { label: 'На паузе', color: 'bg-amber-500' },
};

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);
  const subs = subProjects.filter((s) => s.projectId === projectId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  if (!project) return <div>Проект не найден</div>;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <Badge variant="secondary" className={`${statusMap[project.status].color} text-white`}>
            {statusMap[project.status].label}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                Статус <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Активный</DropdownMenuItem>
              <DropdownMenuItem>На паузе</DropdownMenuItem>
              <DropdownMenuItem>Завершён</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Дедлайн: {project.deadline}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {project.members.map((m) => (
              <span key={m} className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted text-[10px] font-medium border border-background">
                {m[0]}
              </span>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI-summary
            </Button>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogTrigger asChild>
                <Button size="sm" style={{ backgroundColor: '#FF6B35' }} className="gap-1">
                  <Plus className="h-3 w-3" /> Подпроект
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Новый подпроект</DialogTitle></DialogHeader>
                <div className="space-y-3 mt-2">
                  <Input placeholder="Название" />
                  <Textarea placeholder="Описание" />
                  <Input placeholder="Участники" />
                  <Input type="date" placeholder="Дедлайн" />
                  <Button className="w-full" style={{ backgroundColor: '#FF6B35' }} onClick={() => setOpenModal(false)}>Создать</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Подпроекты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subs.map((sub) => (
          <Card
            key={sub.id}
            className="relative overflow-hidden group cursor-pointer border border-border hover:border-[#FF6B35]/50 transition-all"
            onMouseEnter={() => setHoveredId(sub.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-base">{sub.name}</h3>
                <Badge variant="secondary" className={`${statusMap[sub.status].color} text-white text-[10px]`}>
                  {statusMap[sub.status].label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{sub.summary}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{sub.deadline}</div>
                <div className="flex items-center gap-1"><Users className="h-3 w-3" />{sub.members.length}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {sub.members.map((m, i) => (
                    <div key={i} className="h-6 w-6 rounded-full bg-muted border border-background flex items-center justify-center text-[10px] font-medium">{m[0]}</div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{sub.taskCount} задач</span>
              </div>

              {hoveredId === sub.id && (
                <div className="absolute inset-x-0 bottom-0 p-2 bg-card/95 backdrop-blur flex items-center justify-between border-t border-border">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" asChild>
                      <Link to={`/projects/${projectId}/sub/${sub.id}`}>
                        <ArrowRight className="h-3 w-3" /> Открыть
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1">
                      <Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><MoreHorizontal className="h-3 w-3" /></Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
