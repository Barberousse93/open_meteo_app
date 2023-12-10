import decryptWeatherCode from './decryptWeatherCode'

export default function convertHourly(originalDatas) {
  const {
    time,
    temperature_2m,
    apparent_temperature,
    precipitation_probability,
    rain,
    snowfall,
    weather_code,
    is_day,
  } = originalDatas

  if (originalDatas && originalDatas.time) {
    const convertedDatas = []

    time.forEach((timestamp, index) => {
      // const code = weather_code[index]
      // const nightDayCode = is_day[index]
      // const weatherCode = decryptWeatherCode({ code, nightDayCode })
      // const weatherCode = decryptWeatherCode({
      //   code: weather_code[index],
      //   nightDayCode: is_day[index],
      // })
      // console.log('weather_code', weather_code[index])
      // console.log('is_day', is_day[index])

      // console.log('timestamp', timestamp)
      convertedDatas.push({
        time: timestamp.split('T')[1].substring(0, 5),
        temperature: temperature_2m[index],
        ressenti: apparent_temperature[index],
        proba_precipitations: precipitation_probability[index],
        pluie: rain[index],
        neige: snowfall[index],
        code: weather_code[index],
        nightDayCode: is_day[index],
      })
    })
    return convertedDatas
  }
}