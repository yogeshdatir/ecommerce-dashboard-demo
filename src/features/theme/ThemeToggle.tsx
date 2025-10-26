import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="
        relative w-16 h-8 rounded-full transition-colors duration-300 ease-in-out cursor-pointer
        dark:bg-slate-700 bg-blue-400
        focus:outline-none focus:ring-2 focus:ring-offset-2
        dark:focus:ring-slate-500 focus:ring-blue-500
      "
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full bg-white
          transform transition-transform duration-300 ease-in-out
          flex items-center justify-center
          dark:translate-x-8 translate-x-0
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-slate-700" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
