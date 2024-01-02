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
import TownSearch from './TownSearch.jsx'
import Current from '../components/Current.jsx'
import Daily from '../components/Daily.jsx'
import Hourly from '../components/Hourly/hourly.jsx'
import SwitchTheme from './SwitchTheme.jsx'
import useLandingPage from '../utils/Hooks/useLandingPage.js'
import { Historique } from '../utils/Hooks/useLandingPage.js'
import { FavoriteTown } from '../utils/Hooks/useLandingPage.js'
import { Town } from '../utils/Hooks/useLandingPage.js'

import { useTheme } from '@emotion/react'

export default function LandingPage() {
  // const mock = false
  const environnement = import.meta.env.MODE
  const mock = environnement === 'development'

  const theme = useTheme()

  const {
    isOpen,
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
                  backgroundColor: theme.palette.primary.light,
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
                <Divider sx={{ backgroundColor: theme.palette.primary.dark }} />
                <SwitchTheme />
              </div>
              <Divider sx={{ backgroundColor: theme.palette.primary.dark }} />
              {/* // ****************** Liste "favori" ******************* // */}
              <List
                sx={{ width: '100%', backgroundColor: theme.palette.primary.light }}
                subheader={
                  <ListSubheader edge='left' sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Typography variant='p' sx={{ color: theme.palette.text.primary }}>
                      Favori
                    </Typography>
                  </ListSubheader>
                }
              >
                {favoriteTownState.townName && (
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
                )}
              </List>
              <Divider sx={{ backgroundColor: theme.palette.primary.dark }} />
              {/* // ****************** List "Autres Lieu" ******************* // */}
              <List
                sx={{ width: '100%', backgroundColor: theme.palette.primary.light }}
                subheader={
                  <ListSubheader edge='left' sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Typography variant='p' sx={{ color: theme.palette.text.primary }}>
                      Autres lieux
                    </Typography>
                  </ListSubheader>
                }
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
              <Divider sx={{ backgroundColor: theme.palette.primary.dark }} />
              {/* // ************ Bouton "+" ********************* // */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: theme.palette.primary.light,
                }}
              >
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
            {townInfo && townInfo.townName && (
              <Container style={{ top: '50px', position: 'relative' }}>
                <Current mock={mock} />

                <Hourly mock={mock} />
                <Divider sx={{ backgroundColor: theme.palette.primary.dark }} />
                {/* <Accordion
                  sx={{
                    backgroundColor: theme.palette.primary.dark,
                    borderRadius: '20px !important',
                    marginBottom: '50px !important',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}
                  >
                    <Typography>Prévisions 7 prochains jours</Typography>
                  </AccordionSummary>
                  <Divider sx={{ backgroundColor: theme.palette.primary.dark }} />
                  <AccordionDetails> */}
                <Daily mock={mock} />
                {/* </AccordionDetails>
                </Accordion> */}
              </Container>
            )}
          </Box>
        </FavoriteTown.Provider>
      </Historique.Provider>
    </Town.Provider>
  )
}
