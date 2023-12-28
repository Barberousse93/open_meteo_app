import { useContext, useEffect, useState } from 'react'
import useFetch from './useFetch'
// import { Town } from '../Hooks/useLandingPage'
import { Historique, Town } from '../Hooks/useLandingPage'
import { v4 as uuidv4 } from 'uuid'

export default function useTownSearch(props) {
  const { townInfo, setTownInfo } = useContext(Town)
  const { historique, setHistorique } = useContext(Historique)
  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)
  const [searchVal, setSearchVal] = useState('')
  const [ville, setVille] = useState('')
  const [changeTown, setChangeTown] = useState('')
  const [resultList, setResultList] = useState([])
  const [selectIsVisible, setSelectIsVisible] = useState(false)

  const [faireMAJ, setFaireMAJ] = useState(false)

  useEffect(() => {
    // Lecture de l'historique au chargement si il esxite
    const storedHistorique = JSON.parse(localStorage.getItem('OpenMeteo_historique'))
    if (storedHistorique) setHistorique(storedHistorique)
  }, [])

  useEffect(() => {
    if (searchVal) {
      fetchTownSearch()
      if (data && data.results) {
        setResultList(data.results)
        setSelectIsVisible(true)
      }
    }
  }, [searchVal, data])

  function handleClick() {
    setSearchVal(townInfo.name)
    if (townInfo.name !== ville) {
      setVille('')
    }
  }

  function handleChange(e) {
    setVille(e.target.value)
    setTownInfo((prevTownInfo) => ({
      ...prevTownInfo,
      name: e.target.value,
    }))

    handleClick()
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      handleClick()
    }
  }

  function handleChangeTown(e) {
    setChangeTown(e.target.value)
  }

  useEffect(() => {
    // Ecriture des données enregistrées dans le LocalStorage
    const currentTownInfo = townInfo
    if (currentTownInfo.townName) {
      localStorage.setItem('OpenMeteo', JSON.stringify(currentTownInfo))
    }
  }, [townInfo])

  useEffect(() => {
    if (faireMAJ) {
      console.log('FaireMAJ historique', historique)
      localStorage.setItem('OpenMeteo_historique', JSON.stringify(historique))
      setHistorique(historique)
    }
  }, [faireMAJ])

  function handleClickItem(itemProps) {
    setTownInfo((prevTownInfo) => ({
      ...prevTownInfo,
      townName: itemProps.name,
      latitude: itemProps.latitude,
      longitude: itemProps.longitude,
    }))

    props.handleSelectItem()
    // Vérifier si la sélection existe déjà dans l'historique
    const selectionExists =
      historique &&
      historique.some(
        (item) =>
          item.townName === itemProps.name &&
          item.latitude === itemProps.latitude &&
          item.longitude === itemProps.longitude,
      )
    // Si la sélection n'existe pas dans l'historique, l'ajouter
    if (!selectionExists) {
      setHistorique((prevHistorique) => {
        // Vérifier que prevHistorique est un tableau avant d'ajouter le nouvel élément
        const existingHistorique = prevHistorique ?? []

        const selectionExists = existingHistorique.some(
          (item) =>
            item.townName === props.name &&
            item.latitude === props.latitude &&
            item.longitude === props.longitude,
        )

        // Si la sélection n'existe pas dans l'historique, l'ajouter
        if (!selectionExists) {
          const newHistoriqueItem = {
            id: uuidv4(),
            townName: itemProps.name,
            latitude: itemProps.latitude,
            longitude: itemProps.longitude,
          }

          const updatedHistorique = [...existingHistorique, newHistoriqueItem]

          return updatedHistorique
        }
        // RAZ Liste resultat
        setResultList([])
        // RAZ TextField
        setSearchVal('')
        // Si la sélection existe déjà, retourner le tableau existant
        return existingHistorique
      })

      setFaireMAJ(true)
    }
  }

  async function fetchTownSearch() {
    const apiUrl = props.mock
      ? 'src/mockedDatas/geocoding_List.json'
      : `https://geocoding-api.open-meteo.com/v1/search?name=${searchVal}&count=20&language=fr&format=json`

    setUrl(apiUrl)
  }

  return {
    resultList,
    isLoading,
    error,
    handleKeyUp,
    handleClick,
    handleChange,
    ville,
    setVille,
    handleChangeTown,
    changeTown,
    handleClickItem,
    selectIsVisible,
    historique,
  }
}
