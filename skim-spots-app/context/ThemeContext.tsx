import React from "react";

export const DARK = "dark";
export const LIGHT = "light";

export const ThemeContext = React.createContext<{
  darkTheme: boolean;
  toggleTheme: (value: boolean) => void;
}>({ darkTheme: false, toggleTheme: () => {} });

export const ThemeProvider: React.FC = ({ children }) => {
  const [darkTheme, setDarkTheme] = React.useState<boolean>(false);
  return (
    <ThemeContext.Provider
      value={{
        darkTheme,
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
