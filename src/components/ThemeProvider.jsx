import { createContext, useContext, useState } from 'react'
const ThemeContext = createContext(null)
export function ThemeProvider({ children }) {
 const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'dark')
 function toggle() {
  const next = theme === 'dark' ? 'light' : 'dark'
  setTheme(next); document.documentElement.dataset.theme = next
  try { localStorage.setItem('theme', next) } catch {}
 }
 return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
