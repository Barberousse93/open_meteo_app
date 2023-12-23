import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@mui/material'
import ThemeHandler from './utils/Theming/ThemeProvider.jsx'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import LandingPage from './components/LandingPage.jsx'

export default function App() {
  return (
    <>
      <ThemeHandler>
        <CssBaseline />
        <LandingPage />
      </ThemeHandler>
    </>
  )
}
