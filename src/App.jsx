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
// import Loader from './components/loader.jsx'
// import { createContext } from 'react'

// const mock = true

// const TownInfos = { name: '', latitude: '', longitude: '', selectedTown: '' }
// export const Town = createContext(TownInfos)

export default function App() {
  // const [townInfo, setTownInfo] = useState(TownInfos)
  // const [formIsVisible, setFormIsVisible] = useState(true)
  // const updateFormIsVisible = (newState) => {
  //   setFormIsVisible(newState)
  // }

  // useEffect(() => {
  //   // Lecture des données enregistrées dans le LocalStorage
  //   const storedTownInfo = JSON.parse(localStorage.getItem('OpenMeteo'))
  //   if (storedTownInfo) {
  //     setTownInfo(storedTownInfo)
  //     setFormIsVisible(false)
  //   }
  // }, [])

  return (
    <>
      <ThemeHandler>
        <CssBaseline />
        <SwitchTheme />
        {/* <Town.Provider value={{ townInfo, setTownInfo }}> */}
        <LandingPage />
        {/* <TownSearch
            mock={mock}
            formIsVisible={formIsVisible}
            updateFormIsVisible={updateFormIsVisible}
          />
          <Current mock={mock} />
          <Hourly mock={mock} />
          <Daily mock={mock} /> */}
        {/* </Town.Provider> */}
      </ThemeHandler>
    </>
  )
}
