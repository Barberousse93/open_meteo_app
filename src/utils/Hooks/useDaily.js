// https://api.open-meteo.com/v1/forecast?latitude=48.5115&longitude=3.5601&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,snowfall_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=auto&past_days=1
import { useEffect, useState, useContext } from 'react'
import useFetch from './useFetch'
import { Town } from '../../components/LandingPage'

export default function useDaily(props) {
  const { townInfo } = useContext(Town)

  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)
  const [daily, setDaily] = useState({})

  //   if (daily) console.log('daily', daily)

  useEffect(() => {
    if (townInfo.townName) {
      fetchDaily()
    }
  }, [townInfo])

  useEffect(() => {
    if (data.daily) {
      setDaily(data.daily)
    }
  }, [data])

  async function fetchDaily() {
    const apiUrl = props.mock
      ? 'src/mockedDatas/daily.json'
      : `https://api.open-meteo.com/v1/forecast?latitude=${townInfo.latitude}&longitude=${townInfo.longitude}&&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,rain_sum,snowfall_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=auto&past_days=1
        `

    setUrl(apiUrl)
  }

  return { isLoading, error, daily }
}
