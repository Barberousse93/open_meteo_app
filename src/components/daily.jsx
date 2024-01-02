import React, { useContext } from 'react'
import { useTheme } from '@emotion/react'
import useDaily from '../utils/Hooks/useDaily'
import { Town } from '../utils/Hooks/useLandingPage'
import Loader from './Loader'
import Card from './Card'
import Paper from '@mui/material/Paper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Typography, Divider } from '@mui/material'

function Daily(props) {
  const theme = useTheme()
  const { townInfo } = useContext(Town)
  const { isLoading, error, daily, isAccordionOpen, handleAccordionToggle } = useDaily(props)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error : {error}</div>
  }

  return (
    townInfo &&
    townInfo.townName &&
    daily && (
      <Accordion
        sx={{
          backgroundColor: theme.palette.primary.dark,
          borderRadius: '20px !important',
          marginBottom: '50px !important',
        }}
        expanded={isAccordionOpen}
        onChange={handleAccordionToggle}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}
        >
          <Typography>Prévisions 7 prochains jours</Typography>
        </AccordionSummary>
        <Divider sx={{ backgroundColor: theme.palette.primary.dark }} />
        <AccordionDetails>
          <Paper style={{ overflow: 'auto hidden', backgroundColor: theme.palette.primary.main }}>
            {daily.time &&
              daily.time.map((day, index) => (
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
        </AccordionDetails>
      </Accordion>
    )
  )
}

export default Daily
