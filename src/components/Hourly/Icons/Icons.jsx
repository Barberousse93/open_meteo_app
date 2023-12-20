import NavigationIcon from '@mui/icons-material/Navigation'
import Frost from '@mui/icons-material/AcUnit'
import Hot from '@mui/icons-material/LocalFireDepartment'
import decryptWeatherCode from '../../../utils/decryptWeatherCode'

export const weatherIcon = (props) => {
  const { cx } = props
  const code = props.payload.code
  const nightDayCode = props.payload.nightDayCode
  const weatherCode = decryptWeatherCode({ code, nightDayCode })
  return <image x={cx - 25} y={10} width={50} height={50} xlinkHref={weatherCode.image} />
}

export const WindDirectionIcon = (props) => {
  const { cx, cy, payload } = props
  const direction = parseInt(payload.direction)
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${direction})`}>
      <NavigationIcon
        x={-15}
        y={-15} // y={10} distance fixe du haut du graphique
        width={30}
        height={30}
        style={{ color: '#8884d8' }}
      />
    </g>
  )
}

export const HotFreezeIcon = (props) => {
  const { cx, cy, payload } = props
  switch (true) {
    case payload.temperature <= 0:
      return <Frost x={cx - 10} y={cy + 5} width={20} height={20} style={{ color: '#00f' }} />
      break
    case payload.temperature > 30:
      return <Hot x={cx - 10} y={cy + 5} width={20} height={20} style={{ color: '#f00' }} />
      break
    default:
      return (
        // default dot
        <svg x={cx - 5} y={cy - 5} width={10} height={10} fill='white'>
          <g transform='translate(6 6)'>
            <circle r='5' fill='#8884d8' />
            <circle r='3' fill='white' />
          </g>
        </svg>
      )
  }
}
