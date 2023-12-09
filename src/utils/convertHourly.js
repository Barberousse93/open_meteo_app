export default function convertHourly(originalDatas) {
  console.log('originalDatas', originalDatas)
  const { time, temperature_2m, apparent_temperature, precipitation_probability, rain, snowfall } =
    originalDatas

  if (originalDatas && originalDatas.time) {
    const convertedDatas = []

    time.forEach((timestamp, index) => {
      console.log('timestamp', timestamp)
      convertedDatas.push({
        time: timestamp.split('T')[1].substring(0, 5),
        temperature: temperature_2m[index],
        ressenti: apparent_temperature[index],
        proba_precipitations: precipitation_probability[index],
        pluie: rain[index],
        neige: snowfall[index],
      })
    })
    console.log('convertedDatas', convertedDatas)
    return convertedDatas
  }
}
