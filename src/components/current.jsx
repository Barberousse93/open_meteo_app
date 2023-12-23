import React, { useContext } from 'react' // , { useContext }
import useCurrent from '../utils/Hooks/useCurrent'
import NavigationIcon from '@mui/icons-material/Navigation'
import Link from '@mui/material/Link'
import { Town } from '../utils/Hooks/useLandingPage'
import Loader from './Loader'

function Current(props) {
  const { townInfo } = useContext(Town)
  const { isLoading, error, current, weatherCode } = useCurrent(props)

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <div>Error : {error}</div>
  }

  return (
    townInfo &&
    townInfo.townName && (
      <>
        <div> Données mockée ? : {props.mock ? 'true' : 'false'}</div>
        <h1>{townInfo.townName} </h1>
        <Link
          href={`https://www.google.fr/maps/@${townInfo.latitude},${townInfo.longitude},13z?entry=ttu`}
          target='_blank'
          underline='hover'
        >
          Carte
        </Link>
        <div>Heure mise à jour : {current.time}</div>
        <div>
          Température : {current.temperature_2m}°C (ressenti : {current.apparent_temperature}°C)
        </div>
        <div>
          Vent : {current.wind_speed_10m}km/h{' '}
          <span>
            <NavigationIcon sx={{ transform: `rotate(${current.wind_direction_10m}deg)`, ml: 1 }} />
          </span>
        </div>
        <div>Rafales : {current.wind_gusts_10m}km/h</div>
        <div>
          {weatherCode.description}
          <img src={weatherCode.image} alt={weatherCode.description} />
        </div>
      </>
    )
  )
}

export default Current
