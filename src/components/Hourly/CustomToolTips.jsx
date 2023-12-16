import convertirEnDirection from '../../utils/ConvertirDegreEnDirection'
import decryptWeatherCode from '../../utils/decryptWeatherCode'
export const CustomTooltipTemperatures = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    return (
      <>
        <div style={{ background: '#444', opacity: '0.8', padding: '10px', borderRadius: '5px' }}>
          <div style={{ color: '#8884d8' }}>Température : {payload[0].payload.temperature}°C</div>
          <div style={{ color: '#82ca9d' }}>Ressenti : {payload[0].payload.ressenti}°C</div>
        </div>
      </>
    )
  }
}

export const CustomTooltipPrecipitations = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    // console.log(payload[0].payload.pluie)
    const code = payload[0].payload.code
    const nightDayCode = payload[0].payload.nightDayCode
    const weatherCode = decryptWeatherCode({ code, nightDayCode })
    return (
      <>
        <div style={{ background: '#444', opacity: '0.8', padding: '10px', borderRadius: '5px' }}>
          <div>{weatherCode.description}</div>
          <div style={{ color: '#d88484' }}>
            Couverture nuageuse : {payload[0].payload.couverture}%
          </div>
          <div style={{ color: '#8884d8' }}>
            Probabilité de pluie : {payload[0].payload.proba_precipitations}%
          </div>
          <div style={{ color: '#82ca9d' }}>Pluie : {payload[0].payload.pluie}mm</div>
          <div style={{ color: '#caa282' }}>Neige : {payload[0].payload.neige}cm</div>
        </div>
      </>
    )
  }
}

export const CustomTooltipVents = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    // console.log(payload[0].payload.pluie)
    const direction = convertirEnDirection(payload[0].payload.direction - 180)
    return (
      <>
        <div style={{ background: '#444', opacity: '0.8', padding: '10px', borderRadius: '5px' }}>
          <div>Direction : {direction}</div>
          <div style={{ color: '#8884d8' }}>Force du vent : {payload[0].payload.vitesse}km/h</div>
          <div style={{ color: '#d88484' }}>Rafales : {payload[0].payload.rafales}km/h</div>
        </div>
      </>
    )
  }
}
