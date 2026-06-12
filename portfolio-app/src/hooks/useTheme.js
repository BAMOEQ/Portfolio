import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'dark';

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  } catch (e) {
    return DEFAULT_THEME;
  }
}

/**
 * Manages the light/dark theme.
 *
 * The CSS is the single source of truth for color — this hook only flips the
 * `data-theme` attribute on <html> and persists the choice to localStorage.
 * Defaults to dark when nothing is stored. A matching inline script in
 * public/index.html applies the stored theme before paint to avoid a flash.
 *
 * @returns {[string, () => void]} the current theme and a toggle function
 */
export default function useTheme() {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore write failures (e.g. private mode) */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggleTheme];
}
