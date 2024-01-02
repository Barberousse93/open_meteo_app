import React, { useEffect, useState } from 'react'
import decryptWeatherCode from '../utils/decryptWeatherCode'
import { timeFormat, dateIsYesterday, dateIsToday, convertDay } from '../utils/dateFormat'
import Thermometre from '@mui/icons-material/DeviceThermostat'
import SunsetSunrise from '@mui/icons-material/WbTwilight'
import Rain from '@mui/icons-material/WaterDrop'
import Snow from '@mui/icons-material/AcUnit'
import Wind from '@mui/icons-material/Air'
import NavigationIcon from '@mui/icons-material/Navigation'
import { Grid, Tooltip, Typography } from '@mui/material'

export default function Card(datas) {
  const [dateAAfficher, setDateAAfficher] = useState(null)
  const [weather, setWeather] = useState({})
  const [cardDatas, setCardDatas] = useState({})
  const [sunSetRise, setSunSetRise] = useState({ sunset: '', sunrise: '' })
  const [correctedDirection, setCorrectedDirection] = useState(0)

  useEffect(() => {
    switch (true) {
      case dateIsYesterday(cardDatas.time):
        setDateAAfficher('Hier')
        break
      case dateIsToday(cardDatas.time):
        setDateAAfficher("Aujourd'hui")
        break
      default:
        setDateAAfficher(convertDay(cardDatas.time))
    }

    const code = cardDatas.weatherCode
    const nigthDayCode = 1
    setWeather(decryptWeatherCode({ code, nigthDayCode }))

    setCardDatas(datas.donnees)

    setSunSetRise({ sunset: timeFormat(cardDatas.sunset), sunrise: timeFormat(cardDatas.sunrise) })

    if (cardDatas.windDirectionDominant <= 180) {
      setCorrectedDirection(parseInt(cardDatas.windDirectionDominant) + 180)
    } else {
      setCorrectedDirection(parseInt(cardDatas.windDirectionDominant) - 180)
    }
  }, [cardDatas.time])

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={12} sm={12} md={12} lg={2} style={{ textAlign: 'center' }}>
        <Typography
          fontSize={{
            lg: 20,
            md: 20,
            sm: 25,
            xs: 30,
          }}
        >
          {dateAAfficher}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} lg={2} style={{ textAlign: 'center' }}>
        <Tooltip
          arrow
          title={weather.description}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -40],
                  },
                },
              ],
            },
          }}
        >
          <img src={weather.image} />
        </Tooltip>
      </Grid>
      <Grid item xs={6} sm={4} lg={2} style={{ textAlign: 'center' }}>
        <Thermometre /> {cardDatas.temperatureMin}°C / {cardDatas.temperatureMax}°C
      </Grid>

      <Grid item xs={6} sm={4} lg={2} style={{ textAlign: 'center' }}>
        <SunsetSunrise /> {sunSetRise.sunrise} / {sunSetRise.sunset}
      </Grid>

      <Grid item xs={6} sm={6} md={6} lg={2} style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Rain /> {cardDatas.precipitationProbability}%
          {cardDatas.precipitationProbability > 0 ? <div>{cardDatas.rainSum}mm</div> : null}
        </div>
        {cardDatas.snowfallSum > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Snow /> {cardDatas.snowfallSum}cm
          </div>
        ) : null}
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={2} style={{ textAlign: 'center' }}>
        <Wind /> {cardDatas.windSpeedMax}km/h{' '}
        <NavigationIcon sx={{ transform: `rotate(${correctedDirection}deg)`, ml: 1 }} /> (
        {cardDatas.windGustsMax}km/h)
      </Grid>
    </Grid>
  )
}
