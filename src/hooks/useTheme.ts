import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem('p-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark';
  });

  const setTheme = useCallback((t: 'dark' | 'light') => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('p-theme', t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, setTheme, toggleTheme };
}
