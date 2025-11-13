import { useState, useEffect } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

import {
  Eye,
  Sun,
  Moon,
  Type,
  Contrast,
  RotateCcw,
  X,
  Accessibility,
  Minus,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting, resetSettings } = useAccessibility();
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  const applyTheme = (next: 'light' | 'dark') => {
    setThemeState(next);
    localStorage.setItem('theme', next);
    const root = document.documentElement;
    if (next === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const initial = saved === 'dark' || document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(initial);
  }, []);
  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg border-2 hover:scale-110 transition-transform"
        aria-label="Accessibility settings"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto bg-card border-2 border-border shadow-2xl p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility panel"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Theme Toggle */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <Sun className="h-4 w-4" />
              Theme
            </Label>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => applyTheme('light')}
                className="flex-1"
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => applyTheme('dark')}
                className="flex-1"
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
            </div>
          </div>

          {/* Contrast Control */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <Contrast className="h-4 w-4" />
              Contrast
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'high', 'higher'] as const).map((level) => (
                <Button
                  key={level}
                  variant={settings.contrast === level ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('contrast', level)}
                  className="capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Type className="h-4 w-4" />
                Font Size
              </Label>
              <span className="text-sm font-mono">{settings.fontSize}px</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateSetting('fontSize', Math.max(12, settings.fontSize - 1))}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Slider
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSetting('fontSize', value)}
                min={12}
                max={24}
                step={1}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateSetting('fontSize', Math.min(24, settings.fontSize + 1))}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Line Height */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Line Height</Label>
              <span className="text-sm font-mono">{settings.lineHeight.toFixed(1)}</span>
            </div>
            <Slider
              value={[settings.lineHeight]}
              onValueChange={([value]) => updateSetting('lineHeight', value)}
              min={1.2}
              max={2.5}
              step={0.1}
              className="flex-1"
            />
          </div>

          {/* Focus Mode */}
          <div className="space-y-3">
            <Button
              variant={settings.focusMode ? 'default' : 'outline'}
              onClick={() => updateSetting('focusMode', !settings.focusMode)}
              className="w-full"
            >
              <Eye className="h-4 w-4 mr-2" />
              {settings.focusMode ? 'Exit Focus Mode' : 'Enable Focus Mode'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Hides navigation and distractions for distraction-free reading
            </p>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={resetSettings}
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>

          {/* Info */}
          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Settings are saved automatically to your browser
          </p>
        </div>
      )}
    </>
  );
};
