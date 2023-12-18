import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import AddTown from '@mui/icons-material/AddCircle'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import LeftArrow from '@mui/icons-material/KeyboardArrowLeft'
import StarIcon from '@mui/icons-material/Star'
import React, { useState, useEffect, createContext } from 'react'
import TownSearch from '../components/TownSearch.jsx'
import Current from '../components/Current.jsx'
import Daily from '../components/Daily.jsx'
import Hourly from '../components/Hourly/hourly.jsx'

const mock = true

const TownInfos = { name: '', latitude: '', longitude: '', selectedTown: '' }
export const Town = createContext(TownInfos)

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [townInfo, setTownInfo] = useState(TownInfos)
  const [favoriteTown, setFavoriteTown] = useState({
    id: '',
    name: '',
    latitude: '',
    longitude: '',
  })
  const [historique, setHistorique] = useState(localStorage.getItem('OpenMeteo_historique') || [])
  // console.log('historique LandingPage', historique)
  const [formIsVisible, setFormIsVisible] = useState()

  const handleSelectItem = () => {
    setFormIsVisible(false) // Fermer le formulaire une fois un item sélectionné
    setIsOpen(false)
  }

  useEffect(() => {
    // Lecture des données enregistrées dans le LocalStorage (historique)
    const OldHistorique = JSON.parse(localStorage.getItem('OpenMeteo_historique'))
    if (OldHistorique) {
      setHistorique(OldHistorique)
      // console.log('LandingPage historique', historique)
    }
  }, [])

  useEffect(() => {
    // Lecture des données enregistrées dans le LocalStorage (Favori)
    const favoriteTownInfo = JSON.parse(localStorage.getItem('OpenMeteo_favorite'))
    if (favoriteTownInfo) {
      setFavoriteTown(favoriteTownInfo)
    }
  }, [])

  useEffect(() => {
    // Lecture des données enregistrées dans le LocalStorage (dernière selection)
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

  const handleClickAdd = () => {
    setFormIsVisible(!formIsVisible)
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
        {/* // ************************************* // */}
        <Drawer anchor='left' open={isOpen} variant='temporary'>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size='large'
              edge='end'
              color='inherit'
              aria-label='close'
              sx={{ mr: 2 }}
              onClick={handleCloseDrawer}
            >
              <LeftArrow />
            </IconButton>
          </div>
          <List
            sx={{ width: '100%' }}
            subheader={<ListSubheader edge='left'>Favori</ListSubheader>}
          >
            <ListItem>
              <ListItemIcon>
                <StarIcon style={{ color: '#ff0' }} />
              </ListItemIcon>
              <ListItemText primary={favoriteTown.name ? favoriteTown.name : null} />
            </ListItem>
          </List>
          {/* // ************************************* // */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              size='large'
              edge='end'
              color='inherit'
              aria-label='close'
              sx={{ mr: 2 }}
              onClick={handleClickAdd}
            >
              <AddTown />
            </IconButton>
          </div>
          <TownSearch
            mock={mock}
            formIsVisible={formIsVisible}
            handleSelectItem={handleSelectItem}
            style={{ margin: '10px' }}
          />
        </Drawer>
        <Container>
          <Current mock={mock} />
          <Hourly mock={mock} />
          <Daily mock={mock} />
        </Container>
      </Box>
    </Town.Provider>
  )
}

export default LandingPage
