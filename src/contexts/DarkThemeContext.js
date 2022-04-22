import { createContext, useEffect, useMemo, useState } from 'react';

export const DarkThemeContext = createContext({});
const LS_THEME_KEY = 'dark-mode';

const DarkThemeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(() => {
    const darkMode = JSON.parse(
      localStorage.getItem(LS_THEME_KEY) || '{"isDarkMode": true}',
    );
    return darkMode.isDarkMode;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleTheme = () => {
    setDarkMode(prevState => {
      localStorage.setItem(
        LS_THEME_KEY,
        JSON.stringify({ isDarkMode: !prevState }),
      );
      return !prevState;
    });
  };

  useEffect(() => {
    const bodyStyle = document.body.style;
    if (isDarkMode) {
      bodyStyle.backgroundColor = '#222';
      bodyStyle.backgroundImage = '';
    } else {
      bodyStyle.backgroundColor = 'transparent';
      bodyStyle.backgroundImage =
        'linear-gradient(to right, #42c1f4, #64ccf6, #7fd7f9, #99e2fc, #b1ecff)';
    }
  }, [isDarkMode]);

  const values = useMemo(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode, toggleTheme],
  );

  return (
    <DarkThemeContext.Provider value={values}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export default DarkThemeProvider;
