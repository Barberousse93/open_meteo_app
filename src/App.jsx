import React from 'react'
import { CssBaseline } from '@mui/material'
import ThemeHandler from './utils/Theming/ThemeProvider.jsx'
import './App.css'
// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'

import Current from './components/current.jsx'
import TownSearch from './components/townSearch.jsx'
import SwitchTheme from './components/SwitchTheme.jsx'

const mock = true

export default function App() {
  return (
    <>
      <ThemeHandler>
        <CssBaseline />
        <SwitchTheme />
        <TownSearch mock={mock} />
        <Current mock={mock} />
      </ThemeHandler>
    </>
  )
}
