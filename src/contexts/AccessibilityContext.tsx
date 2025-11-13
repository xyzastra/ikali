import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilitySettings {
  focusMode: boolean;
  fontSize: number;
  lineHeight: number;
  contrast: 'normal' | 'high' | 'higher';
  reduceMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetSettings: () => void;
  toggleFocusMode: () => void;
}

const defaultSettings: AccessibilitySettings = {
  focusMode: false,
  fontSize: 16,
  lineHeight: 1.8,
  contrast: 'normal',
  reduceMotion: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const stored = localStorage.getItem('a11y-settings');
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('a11y-settings', JSON.stringify(settings));

    // Apply settings to document
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
    document.documentElement.style.setProperty('--line-height', settings.lineHeight.toString());
    
    // Apply focus mode class
    if (settings.focusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }

    // Apply contrast
    document.body.setAttribute('data-contrast', settings.contrast);

    // Apply reduce motion
    if (settings.reduceMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const toggleFocusMode = () => {
    setSettings((prev) => ({ ...prev, focusMode: !prev.focusMode }));
  };

  return (
    <AccessibilityContext.Provider
      value={{ settings, updateSetting, resetSettings, toggleFocusMode }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
