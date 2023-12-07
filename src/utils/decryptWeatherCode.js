import { weatherCodes } from './weatherCodes.js'

export default function decryptWeatherCode(props) {
  console.log(props)
  let weatherCode = {}

  let nightDay = props.nightDayCode === 1 ? 'day' : 'night'
  console.log(nightDay)

  console.log(weatherCodes[props.code])

  if (!weatherCodes[props.code]) {
    weatherCode.description = 'Code inconnu : ' + props.code
    weatherCode.image = null
    // weatherCode = {
    //   description: `Code inconnu : ${props.code}`,
    //   image: null,
    // }
  } else {
    weatherCode.description = weatherCodes[props.code][nightDay].description
    weatherCode.image = weatherCodes[props.code][nightDay].image
    // weatherCode = {
    //   description: weatherCodes[props.code][nightDay].description,
    //   image: weatherCodes[props.code][nightDay].image,
  }

  console.log('weatherCode', weatherCode)
  return weatherCode
}
