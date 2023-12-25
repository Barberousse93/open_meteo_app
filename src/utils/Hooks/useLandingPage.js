import { useState, createContext, useEffect } from 'react'

const HistoriqueArray = []
export const Historique = createContext(HistoriqueArray)
const Favorite = {}
export const FavoriteTown = createContext(Favorite)
const TownInfos = {}
export const Town = createContext(TownInfos)

export default function useLandingPage() {
  // Initialisation des states
  const [isOpen, setIsOpen] = useState(false) // gestion de l'ouverture du Drawer
  const [formIsVisible, setFormIsVisible] = useState() // Gestion du formulaire de recherche
  const [historique, setHistorique] = useState(HistoriqueArray) // Histrique
  const [favoriteTownState, setFavoriteTown] = useState(Favorite) // Favori
  const [townInfo, setTownInfo] = useState(TownInfos) // Ville affichée

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

  const handleOpenDrawer = () => {
    setIsOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsOpen(false)
  }

  const handleClickAdd = () => {
    setFormIsVisible(!formIsVisible)
  }

  const handleSelectItem = () => {
    setFormIsVisible(false) // Fermer le formulaire une fois un item sélectionné
    setIsOpen(false)
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
    if (favoriteTownState && favoriteTownState.townName) {
      setHistorique((prevHistorique) => {
        const updatedHistorique = [...prevHistorique, favoriteTownState]
        localStorage.setItem('OpenMeteo_historique', JSON.stringify(updatedHistorique))
        return updatedHistorique
      })
    }

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

  return {
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
  }
}
