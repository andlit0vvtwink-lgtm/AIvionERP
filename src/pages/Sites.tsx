import { useState } from 'react';
import { Globe, Users, Clock, MousePointer, TrendingUp, Plus } from 'lucide-react';
import { sites } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Sites() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const site = sites.find((s) => s.id === selectedSite);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Сайты</h1>
        <Button className="gap-2" style={{ backgroundColor: '#FF6B35' }}><Plus className="h-4 w-4" /> Добавить сайт</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sites.map((s, index) => {
          const conversionRate = ((s.conversions / s.usersDaily) * 100).toFixed(1);
          return (
            <Card key={s.id} className="cursor-pointer overflow-hidden glass-panel border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6B35]/50 hover:shadow-xl hover:shadow-[#FF6B35]/10" onClick={() => setSelectedSite(s.id)}>
              <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-950 relative">
                <div className="absolute inset-3 rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="text-[11px] text-white/60 mb-2">Site Preview</div>
                  <div className="h-16 rounded bg-gradient-to-r from-[#FF6B35]/40 to-purple-500/30" />
                  <div className="mt-2 grid grid-cols-3 gap-1">
                    <div className="h-3 rounded bg-white/10" />
                    <div className="h-3 rounded bg-white/10" />
                    <div className="h-3 rounded bg-white/10" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-black/60 border border-white/10">#{index + 1}</div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-base">{s.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">Лендинг для лидогенерации и аналитики пользовательского поведения.</p>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-[#FF9A73] mt-2 block truncate">{s.url}</a>
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-2"><Users className="h-3.5 w-3.5 mb-1 text-[#FF6B35]" />{s.usersDaily} / день</div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-2"><Clock className="h-3.5 w-3.5 mb-1 text-[#FF6B35]" />{s.avgTime}</div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-2"><TrendingUp className="h-3.5 w-3.5 mb-1 text-[#FF6B35]" />{conversionRate}% форма</div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-2"><MousePointer className="h-3.5 w-3.5 mb-1 text-[#FF6B35]" />{s.clicks} кликов</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {site && (
        <Dialog open={!!site} onOpenChange={() => setSelectedSite(null)}>
          <DialogContent className="max-w-5xl glass-panel border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2"><Globe className="h-6 w-6 text-[#FF6B35]" />{site.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {[
                ['Посетители / день', site.usersDaily],
                ['Среднее время', site.avgTime],
                ['Клики', site.clicks],
                ['Конверсии', site.conversions],
                ['Bounce rate', `${site.bounceRate}%`],
                ['CTR формы', `${((site.conversions / site.clicks) * 100).toFixed(1)}%`],
                ['Новые визиты', Math.round(site.usersDaily * 0.74)],
                ['Возвраты', `${(100 - site.bounceRate).toFixed(0)}%`],
                ['Глубина просмотра', `${(site.clicks / site.usersDaily).toFixed(1)} стр.`],
                ['Лиды в работу', Math.round(site.conversions * 0.61)],
                ['CAC', '₽1 540'],
                ['ROMI', '+186%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="text-lg font-semibold mt-1">{value}</div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
