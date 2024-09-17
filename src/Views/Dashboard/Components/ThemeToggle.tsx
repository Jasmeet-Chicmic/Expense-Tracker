import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="p-4 flex items-center justify-center">
      <label className="flex items-center cursor-pointer">
        {/* Toggle Container */}
        <div className="relative inline-flex items-center">
          {/* Hidden Checkbox */}
          <input
            type="checkbox"
            className="sr-only"
            checked={isDarkMode}
            onChange={handleThemeToggle}
          />
          {/* Track */}
          <div className="block bg-gray-600 w-28 h-10 rounded-full relative flex items-center px-2">
            {/* Light Text */}
            <span
              className={`absolute right-3 text-white font-semibold transition-opacity duration-300 ${
                isDarkMode ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Light
            </span>
            {/* Dark Text */}
            <span
              className={`absolute left-3 text-white font-semibold transition-opacity duration-300 ${
                isDarkMode ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Dark
            </span>
            {/* Toggle Circle */}
            <div
              className={`absolute top-1 left-1 bg-white w-10 h-8 rounded-full transition-transform duration-300 ${
                isDarkMode ? 'translate-x-16' : ''
              }`}
            ></div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
