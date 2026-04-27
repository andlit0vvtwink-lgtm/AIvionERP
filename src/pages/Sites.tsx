import { useState } from 'react';
import { Globe, Users, Clock, MousePointer, TrendingUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { sites } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Sites() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const site = sites.find((s) => s.id === selectedSite);

  if (site) {
    return (
      <div>
        <Button size="sm" variant="ghost" onClick={() => setSelectedSite(null)} className="mb-4 gap-1">
          <ArrowLeft className="h-4 w-4" /> Назад к сайтам
        </Button>
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-8 w-8 text-[#FF6B35]" />
          <div>
            <h1 className="text-2xl font-bold">{site.name}</h1>
            <a href={site.url} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:underline">{site.url}</a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Пользователей / день</div>
              <div className="text-2xl font-bold">{site.usersDaily.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Среднее время</div>
              <div className="text-2xl font-bold">{site.avgTime}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Клики</div>
              <div className="text-2xl font-bold">{site.clicks.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Конверсии</div>
              <div className="text-2xl font-bold">{site.conversions}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="font-semibold mb-3">Топ страницы</div>
              <div className="space-y-2">
                {site.topPages.map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{p.page}</span>
                    <Badge variant="secondary">{p.views} просмотров</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="font-semibold mb-3">Источники трафика</div>
              <div className="space-y-2">
                {site.trafficSources.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{s.source}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B35]" style={{ width: `${s.percent}%` }} />
                      </div>
                      <span className="text-muted-foreground text-xs">{s.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="font-semibold mb-3">Дополнительные метрики</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Bounce Rate</div>
                <div className="text-lg font-semibold">{site.bounceRate}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Конверсия</div>
                <div className="text-lg font-semibold">{((site.conversions / site.usersDaily) * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Кликов / пользователь</div>
                <div className="text-lg font-semibold">{(site.clicks / site.usersDaily).toFixed(1)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Показатель роста</div>
                <div className="text-lg font-semibold text-green-500 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> +12%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Сайты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((s) => (
          <Card key={s.id} className="cursor-pointer hover:shadow-md transition-all hover:border-[#FF6B35]/50" onClick={() => setSelectedSite(s.id)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <Globe className="h-5 w-5 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="font-semibold">{s.name}</h3>
                  <div className="text-xs text-muted-foreground">{s.url}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3 w-3" /> {s.usersDaily} / день
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" /> {s.avgTime}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MousePointer className="h-3 w-3" /> {s.clicks} кликов
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="h-3 w-3" /> {s.conversions} конв.
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <Button size="sm" variant="ghost" className="gap-1 text-xs">
                  Подробнее <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
