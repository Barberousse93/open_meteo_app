import React, { useContext } from 'react'
import useDaily from '../utils/Hooks/useDaily'
import { Town } from '../utils/Hooks/useLandingPage'
import Loader from './Loader'
import Card from './Card'
import { Box, Paper } from '@mui/material'

function Daily(props) {
  const { townInfo } = useContext(Town)
  const { isLoading, error, daily } = useDaily(props)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error : {error}</div>
  }

  return (
    townInfo &&
    townInfo.townName &&
    daily &&
    daily.time && (
      <Paper>
        {daily.time.map((day, index) => (
          <Card
            key={index}
            donnees={{
              time: day,
              weatherCode: daily.weather_code[index],
              temperatureMax: daily.temperature_2m_max[index],
              temperatureMin: daily.temperature_2m_min[index],
              sunrise: daily.sunrise[index],
              sunset: daily.sunset[index],
              rainSum: daily.rain_sum[index],
              snowfallSum: daily.snowfall_sum[index],
              precipitationProbability: daily.precipitation_probability_max[index],
              windSpeedMax: daily.wind_speed_10m_max[index],
              windGustsMax: daily.wind_gusts_10m_max[index],
              windDirectionDominant: daily.wind_direction_10m_dominant[index],
            }}
          />
        ))}
      </Paper>
    )
  )
}

export default Daily
