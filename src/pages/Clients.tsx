import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, ArrowRight } from 'lucide-react';
import { clients } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';

const statusMap: Record<string, { label: string; color: string }> = {
  ghosted: { label: 'Ghosted', color: 'bg-gray-500' },
  conversating: { label: 'Conversating', color: 'bg-blue-500' },
  complete: { label: 'Complete', color: 'bg-green-500' },
  'yet-to-start': { label: 'Yet To Start', color: 'bg-amber-500' },
  contacted: { label: 'Contacted', color: 'bg-purple-500' },
};

export default function Clients() {
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Клиенты</h1>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="gap-2" style={{ backgroundColor: '#FF6B35' }}>
              <Plus className="h-4 w-4" /> Клиент
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Новый клиент</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <Input placeholder="Имя" />
              <Input placeholder="Компания" />
              <Input placeholder="Тип бизнеса" />
              <Input placeholder="Детали" />
              <Button className="w-full" style={{ backgroundColor: '#FF6B35' }} onClick={() => setOpenModal(false)}>Добавить</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Поиск по клиентам..." className="w-64 h-8 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-3 py-2 font-medium">Имя</th>
              <th className="text-left px-3 py-2 font-medium">Компания</th>
              <th className="text-left px-3 py-2 font-medium">Тип бизнеса</th>
              <th className="text-left px-3 py-2 font-medium">Статус</th>
              <th className="text-left px-3 py-2 font-medium">Детали</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => (
              <tr key={client.id} className="border-t hover:bg-muted/50">
                <td className="px-3 py-2 font-medium">{client.name}</td>
                <td className="px-3 py-2">{client.company || '—'}</td>
                <td className="px-3 py-2">{client.businessType}</td>
                <td className="px-3 py-2">
                  <Badge variant="secondary" className={`${statusMap[client.status].color} text-white text-[10px]`}>
                    {statusMap[client.status].label}
                  </Badge>
                </td>
                <td className="px-3 py-2 text-muted-foreground max-w-[200px] truncate">{client.details || '—'}</td>
                <td className="px-3 py-2">
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={`/clients/${client.id}`}><ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
