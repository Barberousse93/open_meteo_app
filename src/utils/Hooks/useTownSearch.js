import { useContext, useEffect, useState } from 'react'
import useFetch from './useFetch'
import { Town } from '../../components/LandingPage'

export default function useTownSearch(props) {
  const { townInfo, setTownInfo } = useContext(Town)
  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)
  const [searchVal, setSearchVal] = useState('')
  const [ville, setVille] = useState('')
  const [changeTown, setChangeTown] = useState('')
  const [resultList, setResultList] = useState([])

  useEffect(() => {
    if (searchVal) {
      fetchTownSearch()
      if (data && data.results) {
        setResultList(data.results)
      }
    }
  }, [searchVal, data])

  function handleClick() {
    setSearchVal(townInfo.name)
    setVille('')
  }

  function handleChange(e) {
    setVille(e.target.value)
    setTownInfo((prevTownInfo) => ({
      ...prevTownInfo,
      name: e.target.value,
    }))
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      handleClick()
    }
  }

  function handleChangeTown(e) {
    setChangeTown(e.target.value)
  }

  useEffect(() => {
    // Ecriture des données enregistrées dans le LocalStorage
    const currentTownInfo = townInfo
    if (currentTownInfo.selectedTown) {
      localStorage.setItem('OpenMeteo', JSON.stringify(currentTownInfo))
      props.updateFormIsVisible(false)
    }
  }, [townInfo])

  function handleClickItem(props) {
    setTownInfo((prevTownInfo) => ({
      ...prevTownInfo,
      selectedTown: props.name,
      latitude: props.latitude,
      longitude: props.longitude,
    }))
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
    handleChangeTown,
    changeTown,
    handleClickItem,
  }
}
