import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Sparkles, MoreHorizontal, ArrowRight, Calendar, Users } from 'lucide-react';
import { projects } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: 'Активный', color: 'bg-green-500' },
  completed: { label: 'Завершён', color: 'bg-blue-500' },
  archived: { label: 'Архив', color: 'bg-gray-500' },
  'on-hold': { label: 'На паузе', color: 'bg-amber-500' },
};

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Проекты</h1>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="gap-2" style={{ backgroundColor: '#FF6B35' }}>
              <Plus className="h-4 w-4" /> Новый проект
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый проект</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <Input placeholder="Название проекта" />
              <Textarea placeholder="Описание" />
              <Input placeholder="Клиент" />
              <Input placeholder="Участники (через запятую)" />
              <Input type="date" placeholder="Дедлайн" />
              <Button className="w-full" style={{ backgroundColor: '#FF6B35' }} onClick={() => setOpenModal(false)}>
                Создать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="relative overflow-hidden group cursor-pointer border border-border hover:border-[#FF6B35]/50 transition-all"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: project.color }} />
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-base">{project.name}</h3>
                <Badge variant="secondary" className={`${statusMap[project.status].color} text-white text-[10px]`}>
                  {statusMap[project.status].label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.summary}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.deadline}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {project.members.length}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {project.members.map((m, i) => (
                    <div key={i} className="h-6 w-6 rounded-full bg-muted border border-background flex items-center justify-center text-[10px] font-medium">
                      {m[0]}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{project.taskCount} задач</span>
              </div>

              {hoveredId === project.id && (
                <div className="absolute inset-x-0 bottom-0 p-2 bg-card/95 backdrop-blur flex items-center justify-between border-t border-border">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" asChild>
                      <Link to={`/projects/${project.id}`}>
                        <ArrowRight className="h-3 w-3" /> Открыть
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1">
                      <Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
