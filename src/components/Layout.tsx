import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { X, Sparkles, UserCircle, Calendar, Tag, Link2 } from 'lucide-react';
import { aiSummaries } from '@/data/mock';
import { Button } from '@/components/ui/button';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  entity: { id: string; type: string; title: string; status?: string; deadline?: string; assignee?: string; priority?: string; tags?: string[] } | null;
}

export function RightPanel({ isOpen, onClose, entity }: RightPanelProps) {
  if (!isOpen || !entity) return null;
  const summary = aiSummaries[entity.id] || 'AI-анализ недоступен для этого объекта.';

  return (
    <aside className="fixed right-0 top-14 bottom-0 w-80 bg-card border-l border-border z-40 overflow-y-auto">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-sm">Детали</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <div className="text-lg font-semibold">{entity.title}</div>
          <div className="text-xs text-muted-foreground capitalize">{entity.type}</div>
        </div>
        {entity.status && (
          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span>Статус: {entity.status}</span>
          </div>
        )}
        {entity.deadline && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Срок: {entity.deadline}</span>
          </div>
        )}
        {entity.assignee && (
          <div className="flex items-center gap-2 text-sm">
            <UserCircle className="h-4 w-4 text-muted-foreground" />
            <span>Исполнитель: {entity.assignee}</span>
          </div>
        )}
        {entity.priority && (
          <div className="flex items-center gap-2 text-sm">
            <Link2 className="h-4 w-4 text-muted-foreground" />
            <span>Приоритет: {entity.priority}</span>
          </div>
        )}
        {entity.tags && entity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {entity.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
            ))}
          </div>
        )}

        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-[#FF6B35]" />
            <span className="text-sm font-medium">AI Summary</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="text-xs">Разбить на подзадачи</Button>
            <Button size="sm" variant="outline" className="text-xs">Предложить план</Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Layout() {
  const [rightPanel, setRightPanel] = useState<{ open: boolean; entity: RightPanelProps['entity'] }>({ open: false, entity: null });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className={`pt-14 transition-all duration-300 ${rightPanel.open ? 'pr-80' : 'pr-0'}`} style={{ marginLeft: '14rem' }}>
        <div className="p-6">
          <Outlet context={{ openRightPanel: (entity: RightPanelProps['entity']) => setRightPanel({ open: true, entity }) }} />
        </div>
      </main>
      <RightPanel isOpen={rightPanel.open} onClose={() => setRightPanel({ open: false, entity: null })} entity={rightPanel.entity} />
    </div>
  );
}
