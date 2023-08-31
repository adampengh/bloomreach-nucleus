import { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from '@/themes';
import { StylesProvider } from '@mui/styles';

export const ThemeContext = createContext((_themeName: string) => {});

const ThemeProviderWrapper = (props: any) => {
  const [themeName, _setThemeName] = useState('BloomreachNucleusLight');

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'BloomreachNucleusLight';
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string) => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
