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
import useLandingPage from '../utils/Hooks/useLandingPage.js'
import { Historique } from '../utils/Hooks/useLandingPage.js'
import { FavoriteTown } from '../utils/Hooks/useLandingPage.js'
import { Town } from '../utils/Hooks/useLandingPage.js'

const mock = true

export default function LandingPage() {
  const {
    isOpen,
    setIsOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleClickAdd,
    handleSelectItem,
    handleListItemClick,
    handleClickDelete,
    handleClickFavoriteIcon,
    handleClickFavoriteItem,
    formIsVisible,
    historique,
    setHistorique,
    favoriteTownState,
    setFavoriteTown,
    townInfo,
    setTownInfo,
  } = useLandingPage()

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
                      {/* // ****************** Icone active favori ******************* // */}
                      <StarIcon
                        onClick={() => handleClickFavoriteIcon(item.id)}
                        style={{ color: 'GrayText' }}
                      />
                    </ListItemButton>
                    {/* // ****************** Nom  favori ******************* // */}
                    <ListItemButton onClick={() => handleListItemClick(item.id)}>
                      <ListItemText primary={item.townName} />
                    </ListItemButton>
                    {/* // ****************** Icone Suppression ******************* // */}
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
            {/* // ****************** Resultats ******************* // */}
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
