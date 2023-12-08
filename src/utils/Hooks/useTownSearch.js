import { useContext, useEffect, useState } from 'react'
import useFetch from './useFetch'
import { Town } from '../../App'

export default function useTownSearch(props) {
  const { townInfo, setTownInfo } = useContext(Town)
  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)
  const [searchVal, setSearchVal] = useState('')
  const [ville, setVille] = useState('')
  const [changeTown, setChangeTown] = useState('')
  const [resultList, setResultList] = useState([])

  useEffect(() => {
    // console.log(searchVal)
    if (searchVal) fetchTownSearch()
  }, [searchVal])

  useEffect(() => {
    if (data && data.results) {
      // console.log('data', data)
      setResultList(data.results)
    }
  }, [data])

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

  function handleClickItem(props) {
    console.log('handleClickItem props', props)
    setTownInfo((prevTownInfo) => ({
      ...prevTownInfo,
      selectedTown: props.name,
      latitude: props.latitude,
      longitude: props.longitude,
    }))

    console.log('useTownSearch town', townInfo) // <== OK
  }

  async function fetchTownSearch() {
    // console.log('searchVal', searchVal)
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
