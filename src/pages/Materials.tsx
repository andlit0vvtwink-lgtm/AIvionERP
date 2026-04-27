import { useState } from 'react';
import { Plus, Search, FileText, Link2, StickyNote, ExternalLink, Sparkles, Youtube } from 'lucide-react';
import { materials } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';

export default function Materials() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [openModal, setOpenModal] = useState(false);

  const filtered = materials.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || m.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Материалы</h1>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="gap-2" style={{ backgroundColor: '#FF6B35' }}>
              <Plus className="h-4 w-4" /> Добавить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Новый материал</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <Input placeholder="Название" />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><FileText className="h-3 w-3" /> Файл</Button>
                <Button size="sm" variant="outline" className="gap-1"><Link2 className="h-3 w-3" /> Ссылка</Button>
                <Button size="sm" variant="outline" className="gap-1"><StickyNote className="h-3 w-3" /> Заметка</Button>
              </div>
              <Button className="w-full" style={{ backgroundColor: '#FF6B35' }} onClick={() => setOpenModal(false)}>Создать</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Поиск..." className="w-64 h-8 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select
          className="h-8 text-sm rounded-md border border-border bg-background px-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Все типы</option>
          <option value="file">Файлы</option>
          <option value="link">Ссылки</option>
          <option value="note">Заметки</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((mat) => (
          <Card key={mat.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              {mat.type === 'link' && mat.previewUrl ? (
                <div className="relative">
                  <img src={mat.previewUrl} alt={mat.name} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Youtube className="h-10 w-10 text-red-600" />
                  </div>
                </div>
              ) : (
                <div className="h-32 bg-muted flex items-center justify-center">
                  {mat.type === 'file' && <FileText className="h-10 w-10 text-muted-foreground" />}
                  {mat.type === 'note' && <StickyNote className="h-10 w-10 text-muted-foreground" />}
                  {mat.type === 'link' && !mat.previewUrl && <Link2 className="h-10 w-10 text-muted-foreground" />}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm">{mat.name}</h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {mat.type === 'file' ? mat.extension?.toUpperCase() : mat.type === 'link' ? 'URL' : 'NOTE'}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {mat.author} • {mat.date} {mat.size && `• ${mat.size}`}
                </div>
                <div className="flex items-center gap-2">
                  {mat.type === 'link' && (
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" asChild>
                      <a href={mat.url} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3" /> Открыть</a>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="h-7 text-xs gap-1">
                    <Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
