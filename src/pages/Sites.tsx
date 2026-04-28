import { useState } from 'react';
import { Globe, Users, Clock, MousePointer, TrendingDown, TrendingUp, Plus } from 'lucide-react';
import { sites } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const trends = ['+12.4%', '-4.2%', '+2.1%', '-1.3%'];

export default function Sites() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const site = sites.find((s) => s.id === selectedSite);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Сайты</h1>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Добавить сайт</Button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sites.map((s, index) => {
          const conversionRate = ((s.conversions / s.usersDaily) * 100).toFixed(1);
          const cards = [
            { label: `${s.usersDaily} / день`, icon: <Users className="mb-1 h-3.5 w-3.5 text-[#ff6f3a]" /> },
            { label: s.avgTime, icon: <Clock className="mb-1 h-3.5 w-3.5 text-[#ff6f3a]" /> },
            { label: `${conversionRate}% форма`, icon: <TrendingUp className="mb-1 h-3.5 w-3.5 text-[#ff6f3a]" /> },
            { label: `${s.clicks} кликов`, icon: <MousePointer className="mb-1 h-3.5 w-3.5 text-[#ff6f3a]" /> },
          ];

          return (
            <Card key={s.id} className="cursor-pointer overflow-hidden bg-[#17171C] transition-all duration-200 ds-card-hover" onClick={() => setSelectedSite(s.id)}>
              <div className="relative h-40 bg-[#121216]">
                <div className="absolute inset-3 rounded-2xl border border-white/10 bg-black/35 p-3">
                  <div className="mb-2 text-[11px] text-white/60">Site Preview</div>
                  <div className="h-16 rounded-2xl bg-[#F4511E]/30 shadow-[0_0_24px_rgba(244,81,30,0.22)]" />
                  <div className="mt-2 grid grid-cols-3 gap-1"><div className="h-3 rounded bg-white/10" /><div className="h-3 rounded bg-white/10" /><div className="h-3 rounded bg-white/10" /></div>
                </div>
                <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-2 py-1 text-xs">#{index + 1}</div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-base font-semibold">{s.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Лендинг для лидогенерации и аналитики пользовательского поведения.</p>
                <a href={s.url} target="_blank" rel="noreferrer" className="mt-2 block truncate text-xs text-[#ff9a73]">{s.url}</a>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {cards.map((metric, i) => {
                    const trend = trends[i];
                    const positive = trend.startsWith('+');
                    return (
                      <div key={`${s.id}-${i}`} className="rounded-xl border border-white/10 bg-[#1D1D24] p-2">
                        {metric.icon}
                        <div className="mb-1">{metric.label}</div>
                        <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${positive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {trend}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {site && (
        <Dialog open={!!site} onOpenChange={() => setSelectedSite(null)}>
          <DialogContent className="max-w-5xl bg-[#121216]">
            <DialogHeader><DialogTitle className="flex items-center gap-2 text-2xl"><Globe className="h-6 w-6 text-[#ff4d00]" />{site.name}</DialogTitle></DialogHeader>
            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3">
              {[
                ['Посетители / день', site.usersDaily], ['Среднее время', site.avgTime], ['Клики', site.clicks], ['Конверсии', site.conversions], ['Bounce rate', `${site.bounceRate}%`], ['CTR формы', `${((site.conversions / site.clicks) * 100).toFixed(1)}%`], ['Новые визиты', Math.round(site.usersDaily * 0.74)], ['Возвраты', `${(100 - site.bounceRate).toFixed(0)}%`], ['Глубина просмотра', `${(site.clicks / site.usersDaily).toFixed(1)} стр.`], ['Лиды в работу', Math.round(site.conversions * 0.61)], ['CAC', '₽1 540'], ['ROMI', '+186%'],
              ].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="text-xs text-muted-foreground">{label}</div><div className="mt-1 text-lg font-semibold">{value}</div></div>)}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
