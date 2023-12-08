import { useEffect, useState, useContext } from 'react'
import useFetch from './useFetch'
import { Town } from '../../App'

import { dateFormat } from '../dateFormat'
import decryptWeatherCode from '../decryptWeatherCode'

export default function useCurrent(props) {
  const { townInfo } = useContext(Town)
  console.log('useCurrent town', townInfo)

  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)
  const [current, setCurrent] = useState({})
  const [weatherCode, setWeatherCode] = useState({ description: '', image: '' })

  // console.log('current')

  useEffect(() => {
    if (townInfo.selectedTown) {
      fetchCurrent()
    }
  }, [townInfo])

  // town.selectedTown && fetchCurrent()

  useEffect(() => {
    if (data && data.current) {
      const formattedDate = dateFormat(data.current.time)
      const { weather_code: code, is_day: nightDayCode, ...rest } = data.current

      setCurrent({
        ...rest,
        time: formattedDate,
      })
      setWeatherCode(decryptWeatherCode({ code, nightDayCode }))
    }
  }, [data])

  async function fetchCurrent() {
    console.log('coucou')
    const apiUrl = props.mock
      ? 'src/mockedDatas/current.json'
      : `https://api.open-meteo.com/v1/forecast?latitude=${townInfo.latitude}&longitude=${townInfo.longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto`

    setUrl(apiUrl)
  }
  return {
    isLoading,
    error,
    current,
    weatherCode,
  }
}
