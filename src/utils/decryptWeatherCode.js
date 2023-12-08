import { weatherCodes } from './weatherCodes.js'

export default function decryptWeatherCode(props) {
  let weatherCode = {}

  let nightDay = props.nightDayCode === 1 ? 'day' : 'night'

  if (!weatherCodes[props.code]) {
    weatherCode.description = 'Code inconnu : ' + props.code
    weatherCode.image = null
  } else {
    weatherCode.description = weatherCodes[props.code][nightDay].description
    weatherCode.image = weatherCodes[props.code][nightDay].image
  }

  return weatherCode
}
