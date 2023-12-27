import convertirEnDirection from '../../utils/ConvertirDegreEnDirection'
import decryptWeatherCode from '../../utils/decryptWeatherCode'
import { useTheme } from '@emotion/react'

export const CustomTooltipTemperatures = ({ active, payload }) => {
  const theme = useTheme()
  if (active && payload && payload[0]) {
    return (
      <>
        <div
          style={{
            background: theme.palette.primary.main,
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <div style={{ color: theme.palette.graphs[0] }}>
            Température : {payload[0].payload.temperature}°C
          </div>
          <div style={{ color: theme.palette.graphs[1] }}>
            Ressenti : {payload[0].payload.ressenti}°C
          </div>
        </div>
      </>
    )
  }
}

export const CustomTooltipPrecipitations = ({ active, payload }) => {
  const theme = useTheme()

  if (active && payload && payload[0]) {
    const code = payload[0].payload.code
    const nightDayCode = payload[0].payload.nightDayCode
    const weatherCode = decryptWeatherCode({ code, nightDayCode })
    return (
      <>
        <div
          style={{ background: theme.palette.primary.main, padding: '10px', borderRadius: '5px' }}
        >
          <div>{weatherCode.description}</div>
          <div style={{ color: theme.palette.graphs[3] }}>
            Couverture nuageuse : {payload[0].payload.couverture}%
          </div>
          <div style={{ color: theme.palette.graphs[2] }}>
            Probabilité de pluie : {payload[0].payload.proba_precipitations}%
          </div>
          <div style={{ color: theme.palette.graphs[4] }}>Pluie : {payload[0].payload.pluie}mm</div>
          <div style={{ color: theme.palette.graphs[5] }}>Neige : {payload[0].payload.neige}cm</div>
        </div>
      </>
    )
  }
}

export const CustomTooltipVents = ({ active, payload }) => {
  const theme = useTheme()
  if (active && payload && payload[0]) {
    const direction = convertirEnDirection(payload[0].payload.direction - 180)
    return (
      <>
        <div
          style={{ background: theme.palette.primary.main, padding: '10px', borderRadius: '5px' }}
        >
          <div>Direction : {direction}</div>
          <div style={{ color: theme.palette.graphs[6] }}>
            Force du vent : {payload[0].payload.vitesse}km/h
          </div>
          <div style={{ color: theme.palette.graphs[7] }}>
            Rafales : {payload[0].payload.rafales}km/h
          </div>
        </div>
      </>
    )
  }
}
