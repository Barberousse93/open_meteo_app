export default function convertirEnDirection(angle) {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSO',
    'SO',
    'OSO',
    'O',
    'ONO',
    'NO',
    'NNO',
  ]
  const index = Math.round((angle / 360) * (directions.length - 1)) % directions.length
  return directions[index]
}
