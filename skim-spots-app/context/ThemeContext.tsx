import React from "react";
import useColorScheme from "../hooks/useColorScheme";

export const DARK = "dark";
export const LIGHT = "light";

export const ThemeContext = React.createContext<{
  darkTheme: boolean;
  theme: "dark" | "light";
  toggleTheme: (value: boolean) => void;
}>({ darkTheme: false, theme: LIGHT, toggleTheme: () => {} });

export const ThemeProvider: React.FC = ({ children }) => {
  const [darkTheme, setDarkTheme] = React.useState<boolean>(
    useColorScheme() === DARK
  );
  const theme = darkTheme ? DARK : LIGHT;

  return (
    <ThemeContext.Provider
      value={{
        darkTheme,
        theme,
        toggleTheme: (value: boolean) => {
          if (value === true) {
            setDarkTheme(true);
          } else {
            setDarkTheme(false);
          }
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
