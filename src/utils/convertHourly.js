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
    cloud_cover,
    wind_speed_10m,
    wind_gusts_10m,
    wind_direction_10m,
  } = originalDatas

  if (originalDatas && originalDatas.time) {
    const convertedDatas = []

    time.forEach((timestamp, index) => {
      convertedDatas.push({
        time: timestamp.split('T')[1].substring(0, 5),
        temperature: temperature_2m[index],
        ressenti: apparent_temperature[index],
        proba_precipitations: precipitation_probability[index],
        pluie: rain[index],
        neige: snowfall[index],
        code: weather_code[index],
        nightDayCode: is_day[index],
        couverture: cloud_cover[index],
        vitesse: wind_speed_10m[index],
        rafales: wind_gusts_10m[index],
        direction: wind_direction_10m[index] + 180,
      })
    })
    return convertedDatas
  }
}
