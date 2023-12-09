export default function convertHourly(originalDatas) {
  console.log('originalDatas', originalDatas)
  const { time, temperature_2m, apparent_temperature } = originalDatas
  const convertedDatas = []

  time.forEach((timestamp, index) => {
    console.log('timestamp', timestamp)
    convertedDatas.push({
      time: timestamp.split('T')[1].substring(0, 5),
      temperature: temperature_2m[index],
      ressenti: apparent_temperature[index],
    })
  })
  console.log('convertedDatas', convertedDatas)
  return convertedDatas
}
