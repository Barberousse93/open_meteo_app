import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
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
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import React, { useState, useEffect, createContext } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import TownSearch from '../components/TownSearch.jsx'
import Current from '../components/Current.jsx'
import Daily from '../components/Daily.jsx'
import Hourly from '../components/Hourly/hourly.jsx'

const mock = true

const TownInfos = {}
export const Town = createContext(TownInfos)
const HistoriqueArray = []
export const Historique = createContext(HistoriqueArray)
const Favorite = {}
export const FavoriteTown = createContext(Favorite)

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [townInfo, setTownInfo] = useState(TownInfos)
  const [favoriteTownState, setFavoriteTown] = useState(Favorite)
  const [historique, setHistorique] = useState(HistoriqueArray)

  const [formIsVisible, setFormIsVisible] = useState()

  const handleSelectItem = () => {
    setFormIsVisible(false) // Fermer le formulaire une fois un item sélectionné
    setIsOpen(false)
  }

  useEffect(() => {
    // Lecture des données enregistrées dans le LocalStorage (historique)
    const storedHistorique = JSON.parse(localStorage.getItem('OpenMeteo_historique'))
    if (storedHistorique) {
      setHistorique(storedHistorique)
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

  const handleListItemClick = (itemID) => {
    const selectedTown = historique.find((item) => item.id === itemID)
    setTownInfo({
      latitude: selectedTown.latitude,
      longitude: selectedTown.longitude,
      selectedTown: selectedTown.townName,
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

  const handleClickFavorite = (itemID) => {
    // Click sur l'icone "étoile" pour ajouter dans les favoris

    // const FavoriActuel = favoriteTownState
    // console.log('FavoriActuel', FavoriActuel)

    // retrait de l'historique
    // DeleteFromHistorique(itemID)

    // Affichage dans la liste "Favori"
    const itemToAddFavorite = historique.find((item) => item.id === itemID)
    setFavoriteTown({
      id: itemID,
      townName: itemToAddFavorite.townName,
      latitude: itemToAddFavorite.latitude,
      longitude: itemToAddFavorite.longitude,
    })
    // Mise à jour du localStorage
    localStorage.setItem('OpenMeteo_favorite', JSON.stringify(itemToAddFavorite))
    setTownInfo({
      selectedTown: itemToAddFavorite.townName,
      latitude: itemToAddFavorite.latitude,
      longitude: itemToAddFavorite.longitude,
    })
  }

  const handleClickFavoriteItem = () => {
    // Click sur l'item "favori"
    setTownInfo({
      selectedTown: favoriteTownState.townName,
      latitude: favoriteTownState.latitude,
      longitude: favoriteTownState.logitude,
    })
    setIsOpen(false)
  }

  const DeleteFromHistorique = (itemID) => {
    console.log('Delete ' + itemID)
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
            {/* // ****************** Drawer ******************* // */}
            <Drawer anchor='left' open={isOpen} variant='temporary'>
              {/* // ************** Chevron "retour" *************** // */}
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
                  <ListItemText
                    primary={favoriteTownState.townName ? favoriteTownState.townName : null}
                    onClick={handleClickFavoriteItem}
                  />
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
                        onClick={() => handleClickFavorite(item.id)}
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
