import { useParams } from 'react-router-dom';
import { Sparkles, Plus, ArrowLeft, Calendar, Building } from 'lucide-react';
import { clients, projects } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const statusMap: Record<string, { label: string; color: string }> = {
  ghosted: { label: 'Ghosted', color: 'bg-gray-500' },
  conversating: { label: 'Conversating', color: 'bg-blue-500' },
  complete: { label: 'Complete', color: 'bg-green-500' },
  'yet-to-start': { label: 'Yet To Start', color: 'bg-amber-500' },
  contacted: { label: 'Contacted', color: 'bg-purple-500' },
};

export default function ClientDetail() {
  const { clientId } = useParams<{ clientId: string }>();
  const client = clients.find((c) => c.id === clientId);

  if (!client) return <div>Клиент не найден</div>;

  const clientProjects = projects.filter((p) => p.clientId === clientId);

  return (
    <div>
      <div className="mb-4">
        <Button size="sm" variant="ghost" asChild className="mb-2">
          <Link to="/clients"><ArrowLeft className="h-4 w-4 mr-1" /> Назад</Link>
        </Button>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">{client.name}</h1>
          <Badge variant="secondary" className={`${statusMap[client.status].color} text-white`}>
            {statusMap[client.status].label}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {client.company && (
            <div className="flex items-center gap-1"><Building className="h-4 w-4" /> {client.company}</div>
          )}
          <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {client.businessType}</div>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" className="gap-1"><Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI summary</Button>
            <Button size="sm" variant="outline">Next step</Button>
            <Button size="sm" style={{ backgroundColor: '#FF6B35' }} className="gap-1"><Plus className="h-3 w-3" /> Проект</Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="text-sm"><span className="text-muted-foreground">Статус:</span> {statusMap[client.status].label}</div>
              <div className="text-sm"><span className="text-muted-foreground">Компания:</span> {client.company || '—'}</div>
              <div className="text-sm"><span className="text-muted-foreground">Тип бизнеса:</span> {client.businessType}</div>
              <div className="text-sm"><span className="text-muted-foreground">Детали:</span> {client.details || '—'}</div>
              <div className="text-sm"><span className="text-muted-foreground">Проектов:</span> {clientProjects.length}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          {clientProjects.length === 0 ? (
            <div className="text-muted-foreground text-sm">Нет проектов</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clientProjects.map((p) => (
                <Card key={p.id}>
                  <CardContent className="p-4">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.summary}</div>
                    <div className="text-xs text-muted-foreground mt-2">{p.taskCount} задач | дедлайн {p.deadline}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Нет заметок</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Нет материалов</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
