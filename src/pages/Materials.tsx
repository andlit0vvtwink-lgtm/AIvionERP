import { useState } from 'react';
import { Plus, Search, FileText, Link2, StickyNote, ExternalLink, Sparkles, Youtube, UploadCloud } from 'lucide-react';
import { materials } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type MaterialType = 'file' | 'link' | 'note' | null;

export default function Materials() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(1);
  const [materialName, setMaterialName] = useState('');
  const [newType, setNewType] = useState<MaterialType>(null);

  const filtered = materials.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || m.type === filterType;
    return matchSearch && matchType;
  });

  const resetModal = () => {
    setStep(1);
    setMaterialName('');
    setNewType(null);
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Материалы</h1>
        <Dialog open={openModal} onOpenChange={(open) => (open ? setOpenModal(true) : resetModal())}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#ff4d00] hover:bg-[#ff6726]"><Plus className="h-4 w-4" /> Добавить</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl border-white/10 bg-[#11141d]">
            <DialogHeader><DialogTitle>Добавить новый материал</DialogTitle></DialogHeader>
            {step === 1 && (
              <div className="space-y-4 mt-2">
                <Input placeholder="Название материала" value={materialName} onChange={(e) => setMaterialName(e.target.value)} />
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant={newType === 'file' ? 'default' : 'outline'} className="gap-1" onClick={() => setNewType('file')}><FileText className="h-3 w-3" /> Файл</Button>
                  <Button size="sm" variant={newType === 'link' ? 'default' : 'outline'} className="gap-1" onClick={() => setNewType('link')}><Link2 className="h-3 w-3" /> Ссылка</Button>
                  <Button size="sm" variant={newType === 'note' ? 'default' : 'outline'} className="gap-1" onClick={() => setNewType('note')}><StickyNote className="h-3 w-3" /> Заметка</Button>
                </div>
                <Button disabled={!materialName || !newType} className="w-full bg-[#ff4d00] hover:bg-[#ff6726]" onClick={() => setStep(2)}>Продолжить</Button>
              </div>
            )}
            {step === 2 && newType === 'file' && (
              <div className="space-y-3 mt-2">
                <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center bg-black/20">
                  <UploadCloud className="h-10 w-10 mx-auto mb-2 text-[#FF6B35]" />
                  <p className="text-sm">Перетащите файл сюда или выберите с устройства.</p>
                  <Button variant="outline" className="mt-3">Выбрать файл</Button>
                </div>
                <Button className="w-full bg-[#ff4d00] hover:bg-[#ff6726]" onClick={resetModal}>Сохранить материал</Button>
              </div>
            )}
            {step === 2 && newType === 'link' && (
              <div className="space-y-3 mt-2">
                <Input placeholder="URL ссылки" />
                <Textarea placeholder="Краткое описание (опционально)" rows={4} />
                <Button className="w-full bg-[#ff4d00] hover:bg-[#ff6726]" onClick={resetModal}>Сохранить материал</Button>
              </div>
            )}
            {step === 2 && newType === 'note' && (
              <div className="space-y-3 mt-2">
                <Textarea placeholder="Текст заметки" rows={8} />
                <Button className="w-full bg-[#ff4d00] hover:bg-[#ff6726]" onClick={resetModal}>Сохранить материал</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Поиск..." className="w-64 h-8 border-white/15 bg-black/20 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="h-8 text-sm rounded-md border border-border bg-background px-2" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">Все типы</option><option value="file">Файлы</option><option value="link">Ссылки</option><option value="note">Заметки</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mat) => (
          <Card key={mat.id} className="overflow-hidden border-white/10 bg-[#11141d] hover:border-[#FF6B35]/40 transition-all hover:-translate-y-1">
            <CardContent className="p-0">
              {mat.type === 'link' && mat.previewUrl ? (
                <div className="relative">
                  <img src={mat.previewUrl} alt={mat.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Youtube className="h-10 w-10 text-red-500" /></div>
                </div>
              ) : mat.type === 'file' ? (
                <div className="h-48 bg-gradient-to-br from-slate-700/80 to-slate-900 p-5 flex flex-col justify-between">
                  <div className="text-xs text-white/60">Document Preview</div>
                  <div>
                    <FileText className="h-10 w-10 text-white/80 mb-2" />
                    <div className="text-sm font-semibold">{mat.extension?.toUpperCase()} Preview</div>
                    <div className="text-xs text-white/60">AIvion.ERP secure document</div>
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-muted/40 flex items-center justify-center">{mat.type === 'note' ? <StickyNote className="h-10 w-10 text-muted-foreground" /> : <Link2 className="h-10 w-10 text-muted-foreground" />}</div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm">{mat.name}</h3>
                  <Badge variant="secondary" className="text-[10px]">{mat.type === 'file' ? mat.extension?.toUpperCase() : mat.type === 'link' ? 'URL' : 'NOTE'}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">{mat.author} • {mat.date} {mat.size && `• ${mat.size}`}</div>
                <div className="flex items-center gap-2">
                  {mat.type === 'link' && <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" asChild><a href={mat.url} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3" /> Открыть</a></Button>}
                  <Button size="sm" variant="ghost" className="h-7 text-xs gap-1"><Sparkles className="h-3 w-3 text-[#FF6B35]" /> AI</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
