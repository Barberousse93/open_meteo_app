// Composants MUI
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
// import { makeStyles } from '@mui/material'
// Icones MUI
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AddTown from '@mui/icons-material/AddCircle'
import MenuIcon from '@mui/icons-material/Menu'
import LeftArrow from '@mui/icons-material/KeyboardArrowLeft'
import StarIcon from '@mui/icons-material/Star'
import Divider from '@mui/material/Divider'
// Composants REACT
import React, { useState, useEffect, createContext } from 'react'
// Composants internes
import TownSearch from '../components/TownSearch.jsx'
import Current from '../components/Current.jsx'
import Daily from '../components/Daily.jsx'
import Hourly from '../components/Hourly/hourly.jsx'
import SwitchTheme from './SwitchTheme.jsx'
// import useLandingPage from '../utils/Hooks/useLandingPage.js'

const mock = true

const TownInfos = {}
export const Town = createContext(TownInfos)
const HistoriqueArray = []
export const Historique = createContext(HistoriqueArray)
const Favorite = {}
export const FavoriteTown = createContext(Favorite)

function LandingPage() {
  // initialisation des states
  const [isOpen, setIsOpen] = useState(false) // gestion du Drawer
  const [formIsVisible, setFormIsVisible] = useState() // Gestion du formulaire de recherche
  const [townInfo, setTownInfo] = useState(TownInfos) // Ville affichée
  const [favoriteTownState, setFavoriteTown] = useState(Favorite) // Favori
  const [historique, setHistorique] = useState(HistoriqueArray) // Histrique

  useEffect(() => {
    // Lecture des données enregistrées dans le LocalStorage (historique)
    const storedHistorique = JSON.parse(localStorage.getItem('OpenMeteo_historique'))
    if (storedHistorique) {
      setHistorique(storedHistorique)
    }
  }, [])

  useEffect(() => {
    // Forçage du chargement du favori.
    // Lecture des données enregistrées dans le LocalStorage (Favori)
    const favoriteTownInfo = JSON.parse(localStorage.getItem('OpenMeteo_favorite'))
    if (favoriteTownInfo) {
      setFavoriteTown(favoriteTownInfo)
      setTownInfo(favoriteTownInfo)
    } else {
      // Lecture des données enregistrées dans le LocalStorage (dernière selection)
      const storedTownInfo = JSON.parse(localStorage.getItem('OpenMeteo'))
      if (storedTownInfo) {
        setTownInfo(storedTownInfo)
      }
    }
  }, [])

  const handleSelectItem = () => {
    setFormIsVisible(false) // Fermer le formulaire une fois un item sélectionné
    setIsOpen(false)
  }

  const handleOpenDrawer = () => {
    setIsOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsOpen(false)
  }

  const handleClickAdd = () => {
    setFormIsVisible(!formIsVisible)
  }

  const handleListItemClick = (itemID) => {
    const townName = historique.find((item) => item.id === itemID)
    setTownInfo({
      latitude: townName.latitude,
      longitude: townName.longitude,
      townName: townName.townName,
    })
    setIsOpen(false)
  }

  const handleClickDelete = (itemID) => {
    // Si l'item à supprimer correspond à la ville sélectionnée..
    const townToDelete = historique.find((item) => item.id === itemID)
    if (
      townToDelete.latitude === townInfo.latitude &&
      townToDelete.longitude === townInfo.longitude
    ) {
      // mise à blanc...
      setTownInfo({})
    }

    DeleteFromHistorique(itemID)
    setIsOpen(false)
  }

  const handleClickFavoriteIcon = (itemID) => {
    // Recherche de l'élément dans l'historique
    const itemToAddFavorite = historique.find((item) => item.id === itemID)

    // Supression du futur favori de l'historique
    DeleteFromHistorique(itemID)

    // Ajout du favori précédent à l'historique
    setHistorique((prevHistorique) => {
      const updatedHistorique = [...prevHistorique, favoriteTownState]
      localStorage.setItem('OpenMeteo_historique', JSON.stringify(updatedHistorique))
      return updatedHistorique
    })

    // Mise à jour du favori actuel
    setFavoriteTown({
      id: itemID,
      townName: itemToAddFavorite.townName,
      latitude: itemToAddFavorite.latitude,
      longitude: itemToAddFavorite.longitude,
    })

    // Mise à jour du localStorage pour les favoris
    localStorage.setItem('OpenMeteo_favorite', JSON.stringify(itemToAddFavorite))

    // Mise à jour des informations de la ville sélectionnée
    setTownInfo({
      townName: itemToAddFavorite.townName,
      latitude: itemToAddFavorite.latitude,
      longitude: itemToAddFavorite.longitude,
    })

    setIsOpen(false)
  }

  const handleClickFavoriteItem = () => {
    // Click sur l'item "favori"
    setTownInfo({
      townName: favoriteTownState.townName,
      latitude: favoriteTownState.latitude,
      longitude: favoriteTownState.longitude,
    })
    setIsOpen(false)
  }

  const DeleteFromHistorique = (itemID) => {
    const idASupprimer = historique.findIndex((item) => item.id === itemID)

    if (idASupprimer !== -1) {
      // l'ID existe dans le tableau
      const newHistorique = [
        ...historique.slice(0, idASupprimer),
        ...historique.slice(idASupprimer + 1),
      ]
      // Mise à our du state
      setHistorique(newHistorique)
      // Mise à jour du localStorage
      localStorage.setItem('OpenMeteo_historique', JSON.stringify(newHistorique))
    }
  }

  return (
    <Town.Provider value={{ townInfo, setTownInfo }}>
      <Historique.Provider value={{ historique, setHistorique }}>
        <FavoriteTown.Provider value={{ favoriteTownState, setFavoriteTown }}>
          <Box>
            <AppBar position='fixed'>
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
                <Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
                  Open Météo
                </Typography>
              </Toolbar>
            </AppBar>
            {/* // ****************** Drawer ******************* // */}
            <Drawer anchor='left' open={isOpen} variant='temporary'>
              {/* // ************** Chevron "retour" *************** // */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  // justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
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
                <Divider />
                <SwitchTheme />
              </div>
              <Divider />
              {/* // ****************** Liste "favori" ******************* // */}
              <List
                sx={{ width: '100%' }}
                subheader={<ListSubheader edge='left'>Favori</ListSubheader>}
              >
                <ListItem>
                  <ListItemIcon>
                    <StarIcon style={{ color: '#ff0' }} />
                  </ListItemIcon>
                  <ListItemButton>
                    <ListItemText
                      primary={favoriteTownState.townName ? favoriteTownState.townName : null}
                      onClick={handleClickFavoriteItem}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              {/* // ****************** List "Autres Lieu" ******************* // */}
              <List
                sx={{ width: '100%' }}
                subheader={<ListSubheader edge='left'>Autres lieux...</ListSubheader>}
              >
                {historique.map((item) => (
                  <div key={item.id} style={{ display: 'flex' }}>
                    <ListItemButton>
                      <StarIcon
                        onClick={() => handleClickFavoriteIcon(item.id)}
                        style={{ color: 'GrayText' }}
                      />
                    </ListItemButton>

                    <ListItemButton onClick={() => handleListItemClick(item.id)}>
                      <ListItemText primary={item.townName} />
                    </ListItemButton>

                    <ListItemButton>
                      <DeleteIcon onClick={() => handleClickDelete(item.id)} />
                    </ListItemButton>
                  </div>
                ))}
              </List>
              <Divider />
              {/* // ************ Bouton "+" ********************* // */}
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
        </FavoriteTown.Provider>
      </Historique.Provider>
    </Town.Provider>
  )
}

export default LandingPage
