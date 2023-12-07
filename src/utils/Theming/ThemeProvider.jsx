/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import ThemeContext from './ThemeContext'
import { LOCAL_STORAGE_KEY, DARK_THEME, LIGHT_THEME } from './Theme.js'

function ThemeHandler(props) {
  const [isDark, setDark] = useState(localStorage.getItem(LOCAL_STORAGE_KEY) === 'true')

  const ctxValue = {
    isDark,
    toggleTheme,
  }

  function toggleTheme() {
    setDark(!isDark)
    localStorage.setItem(LOCAL_STORAGE_KEY, !isDark)
  }

  function getTheme() {
    if (isDark) {
      return DARK_THEME
    } else {
      return LIGHT_THEME
    }
  }

  return (
    <ThemeContext.Provider value={ctxValue}>
      <ThemeProvider theme={getTheme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeHandler
