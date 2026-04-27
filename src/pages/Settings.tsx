import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon, User, Bell, Shield } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>

      <div className="max-w-xl space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium">Алексей</div>
                <div className="text-xs text-muted-foreground">alex@aivion.ru</div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Имя</Label>
                <Input defaultValue="Алексей" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input defaultValue="alex@aivion.ru" className="mt-1" />
              </div>
              <Button size="sm" style={{ backgroundColor: '#FF6B35' }}>Сохранить</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <div className="font-medium">Оформление</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Тёмная тема</div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5" />
              <div className="font-medium">Уведомления</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm">Новые задачи</div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Упоминания</div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Дедлайны</div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5" />
              <div className="font-medium">Безопасность</div>
            </div>
            <Button size="sm" variant="outline">Сменить пароль</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
