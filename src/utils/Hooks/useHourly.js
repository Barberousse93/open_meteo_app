// https://api.open-meteo.com/v1/forecast?latitude=48.5115&longitude=3.5601&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&timezone=auto&past_days=1&past_hours=1&forecast_hours=24
import { useEffect, useState, useContext } from 'react'
import useFetch from './useFetch'
import { Town } from '../../App'
import convertHourly from '../../utils/convertHourly'

export default function useHourly(props) {
  const { townInfo } = useContext(Town)

  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)
  const [hourly, setHourly] = useState([])
  const [convertedHourly, setConvertedHourly] = useState(null)

  useEffect(() => {
    if (hourly) {
      setConvertedHourly(convertHourly(hourly))
    }
  }, [hourly])

  useEffect(() => {
    if (townInfo.selectedTown) {
      fetchHourly()
    }
  }, [townInfo])

  useEffect(() => {
    if (data.hourly) {
      console.log('use Hourly data.hourly', data)
      setHourly(data.hourly)
    }
  }, [data])

  async function fetchHourly() {
    const apiUrl = props.mock
      ? 'src/mockedDatas/hourly.json'
      : `https://api.open-meteo.com/v1/forecast?latitude=${townInfo.latitude}&longitude=${townInfo.longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&timezone=auto&past_days=1&past_hours=1&forecast_hours=24
      `

    setUrl(apiUrl)
  }

  return {
    hourly,
    isLoading,
    error,
    convertedHourly,
  }
}
