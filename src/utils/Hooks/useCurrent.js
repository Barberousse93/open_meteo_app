import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import { dateFormat } from '../dateFormat'
import decryptWeatherCode from '../decryptWeatherCode'

export default function useCurrent(props) {
  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)
  const [current, setCurrent] = useState({})
  const [weatherCode, setWeatherCode] = useState({ description: '', image: '' })

  useEffect(() => {
    fetchCurrent()
  })

  useEffect(() => {
    if (data && data.current) {
      const formattedDate = dateFormat(data.current.time)
      const { weather_code: code, is_day: nightDayCode, ...rest } = data.current

      setCurrent({
        ...rest,
        time: formattedDate,
      })
      // const newCurrent = { ...data.current }
      // newCurrent.time = formattedDate
      // setCurrent(newCurrent)
      // const code = data.current.weather_code
      // const nightDayCode = data.current.is_day
      setWeatherCode(decryptWeatherCode({ code, nightDayCode }))
    }
  }, [data])

  async function fetchCurrent() {
    const apiUrl = props.mock
      ? 'src/mockedDatas/current.json'
      : 'https://api.open-meteo.com/v1/forecast?latitude=48.5115&longitude=3.5601&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto'

    setUrl(apiUrl)
  }
  return {
    isLoading,
    error,
    current,
    weatherCode,
  }
}
