import React from 'react'
import useCurrent from '../utils/Hooks/useCurrent'
// import NavigationIcon from '@mui/icons-material/Navigation'

function Current(props) {
  const { isLoading, error, current, weatherCode } = useCurrent(props)
  // console.log(current)

  if (isLoading) {
    return <div>Is Loading...</div>
  }
  if (error) {
    return <div>Error : {error}</div>
  }

  return (
    <>
      <div> Données mockée ? : {props.mock ? 'true' : 'false'}</div>
      <div>Heure mise à jour : {current.time}</div>
      <div>
        Température : {current.temperature_2m}°C (ressenti : {current.apparent_temperature}°C)
      </div>
      <div>
        Vent : {current.wind_speed_10m}kmh <span> ({current.wind_direction_10m}) </span>
        {/* <NavigationIcon
            sx={{ transform: `rotate(${current.wind_direction_10}deg)`, ml: 1 }}
            /> */}
      </div>
      <div>Rafales : {current.wind_gusts_10m}kmh</div>
      <div>
        {weatherCode.description}
        <img src={weatherCode.image} alt={weatherCode.description} />
      </div>
    </>
  )
}

export default Current
