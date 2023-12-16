import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState, useEffect, createContext } from 'react'
import TownSearch from '../components/TownSearch.jsx'
import Current from '../components/Current.jsx'
import Daily from '../components/Daily.jsx'
import Hourly from '../components/Hourly/hourly.jsx'

const mock = false

const TownInfos = { name: '', latitude: '', longitude: '', selectedTown: '' }
export const Town = createContext(TownInfos)

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [townInfo, setTownInfo] = useState(TownInfos)
  const [formIsVisible, setFormIsVisible] = useState(true)
  const updateFormIsVisible = (newState) => {
    setFormIsVisible(newState)
  }

  useEffect(() => {
    // Lecture des données enregistrées dans le LocalStorage
    const storedTownInfo = JSON.parse(localStorage.getItem('OpenMeteo'))
    if (storedTownInfo) {
      setTownInfo(storedTownInfo)
      setFormIsVisible(false)
    }
  }, [])

  const handleOpenDrawer = () => {
    setIsOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsOpen(false)
  }
  return (
    <Town.Provider value={{ townInfo, setTownInfo }}>
      <Box>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={handleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Open Météo
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer anchor='left' open={isOpen} variant='temporary'>
          <h1 onClick={handleCloseDrawer} style={{ margin: '50px' }}>
            Drawer
          </h1>
        </Drawer>
        <Container>
          <TownSearch
            mock={mock}
            formIsVisible={formIsVisible}
            updateFormIsVisible={updateFormIsVisible}
          />
          <Current mock={mock} />
          <Hourly mock={mock} />
          <Daily mock={mock} />
        </Container>
      </Box>
    </Town.Provider>
  )
}

export default LandingPage
