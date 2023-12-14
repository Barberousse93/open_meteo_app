import React, { useState } from 'react'
import { CssBaseline } from '@mui/material'
import ThemeHandler from './utils/Theming/ThemeProvider.jsx'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Current from './components/Current.jsx'
import TownSearch from './components/TownSearch.jsx'
import Hourly from './components/Hourly/hourly.jsx'
import SwitchTheme from './components/SwitchTheme.jsx'
// import Loader from './components/loader.jsx'
import { createContext } from 'react'
import Daily from './components/Daily.jsx'

const mock = true

const TownInfos = { name: '', latitude: '', longitude: '', selectedTown: '' }
export const Town = createContext(TownInfos)

export default function App() {
  const [townInfo, setTownInfo] = useState(TownInfos)
  return (
    <>
      <ThemeHandler>
        <CssBaseline />
        <SwitchTheme />
        <Town.Provider value={{ townInfo, setTownInfo }}>
          <TownSearch mock={mock} />
          <Current mock={mock} />
          <Hourly mock={mock} />
          <Daily mock={mock} />
        </Town.Provider>
      </ThemeHandler>
    </>
  )
}
