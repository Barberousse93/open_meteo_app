import React, { useEffect, useState } from 'react'
import decryptWeatherCode from '../utils/decryptWeatherCode'
import { timeFormat, dateIsYesterday, dateIsToday, convertDay } from '../utils/dateFormat'
import Thermometre from '@mui/icons-material/DeviceThermostat'
import SunsetSunrise from '@mui/icons-material/WbTwilight'
import Rain from '@mui/icons-material/WaterDrop'
import Snow from '@mui/icons-material/AcUnit'
import Wind from '@mui/icons-material/Air'
import NavigationIcon from '@mui/icons-material/Navigation'
import { Tooltip } from '@mui/material'

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '10px',
        // border: '1px solid black',
        // borderRadius: '10px',
      }}
    >
      <div>{dateAAfficher}</div>
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
      <div>
        <Thermometre /> {cardDatas.temperatureMin}°C / {cardDatas.temperatureMax}°C {'  '}
      </div>
      <div>
        <SunsetSunrise /> {sunSetRise.sunrise} / {sunSetRise.sunset}
      </div>

      <div>
        <Rain /> {cardDatas.precipitationProbability}%
        {cardDatas.precipitationProbability > 0 ? <div>{cardDatas.rainSum}mm</div> : null}
      </div>

      {cardDatas.snowfallSum > 0 ? (
        <div>
          <Snow /> {cardDatas.snowfallSum}cm
        </div>
      ) : null}

      <div>
        <Wind /> {cardDatas.windSpeedMax}km/h{' '}
        <NavigationIcon sx={{ transform: `rotate(${correctedDirection}deg)`, ml: 1 }} /> (
        {cardDatas.windGustsMax}km/h)
      </div>
    </div>
  )
}
