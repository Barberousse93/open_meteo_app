import React, { useContext } from 'react' // , { useContext }
import useCurrent from '../utils/Hooks/useCurrent'
import NavigationIcon from '@mui/icons-material/Navigation'
import { Town } from '../App'

function Current(props) {
  const { townInfo } = useContext(Town)
  console.log('current town', townInfo)
  const { isLoading, error, current, weatherCode } = useCurrent(props)
  // console.log(current)

  if (isLoading) {
    return <div>Is Loading...</div>
  }
  if (error) {
    return <div>Error : {error}</div>
  }
  // console.log('town.selectedTown', town.selectedTown)
  return (
    townInfo &&
    townInfo.selectedTown && (
      <>
        <div> Données mockée ? : {props.mock ? 'true' : 'false'}</div>
        <h1>{townInfo.selectedTown} </h1>
        <div>Heure mise à jour : {current.time}</div>
        <div>
          Température : {current.temperature_2m}°C (ressenti : {current.apparent_temperature}°C)
        </div>
        <div>
          Vent : {current.wind_speed_10m}kmh{' '}
          <span>
            <NavigationIcon sx={{ transform: `rotate(${current.wind_direction_10m}deg)`, ml: 1 }} />
          </span>
        </div>
        <div>Rafales : {current.wind_gusts_10m}kmh</div>
        <div>
          {weatherCode.description}
          <img src={weatherCode.image} alt={weatherCode.description} />
        </div>
      </>
    )
  )
}

export default Current
