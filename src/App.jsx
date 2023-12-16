import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material'
import ThemeHandler from './utils/Theming/ThemeProvider.jsx'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import LandingPage from './components/LandingPage.jsx'

import SwitchTheme from './components/SwitchTheme.jsx'

export default function App() {
  return (
    <>
      <ThemeHandler>
        <CssBaseline />
        <SwitchTheme />
        <LandingPage />
      </ThemeHandler>
    </>
  )
}
