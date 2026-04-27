import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Sparkles, FolderOpen, CheckSquare, Users, FileText } from 'lucide-react';
import { projects, tasks, clients, materials } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';

const typeIcons: Record<string, any> = {
  project: FolderOpen,
  task: CheckSquare,
  client: Users,
  material: FileText,
};

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<{ type: string; name: string; id: string; snippet: string }[]>([]);

  useEffect(() => {
    if (!query) return;
    const all = [
      ...projects.map((p) => ({ type: 'project', name: p.name, id: p.id, snippet: p.summary })),
      ...tasks.map((t) => ({ type: 'task', name: t.title, id: t.id, snippet: t.description || 'Нет описания' })),
      ...clients.map((c) => ({ type: 'client', name: c.name, id: c.id, snippet: `${c.company} — ${c.businessType}` })),
      ...materials.map((m) => ({ type: 'material', name: m.name, id: m.id, snippet: `${m.type} • ${m.author}` })),
    ];
    const filtered = all
      .filter((e) => e.name.toLowerCase().includes(query.toLowerCase()) || e.snippet.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 20);
    setResults(filtered);
  }, [query]);

  const grouped = results.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof results>);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Поиск: «{query}»</h1>
      {results.length === 0 && (
        <div className="text-muted-foreground">Ничего не найдено</div>
      )}
      <div className="space-y-6">
        {Object.entries(grouped).map(([type, items]) => {
          const Icon = typeIcons[type] || Search;
          return (
            <div key={type}>
              <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground uppercase">
                <Icon className="h-4 w-4" /> {type === 'project' ? 'Проекты' : type === 'task' ? 'Задачи' : type === 'client' ? 'Клиенты' : 'Материалы'}
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <Card key={item.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-3">
                      <Link
                        to={type === 'project' ? `/projects/${item.id}` : type === 'task' ? `/tasks` : type === 'client' ? `/clients/${item.id}` : '/materials'}
                        className="flex items-start gap-2"
                      >
                        <Sparkles className="h-4 w-4 text-[#FF6B35] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.snippet}</div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
