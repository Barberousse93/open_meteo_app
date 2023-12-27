import React, { useContext } from 'react' // , { useContext }
import { useTheme } from '@emotion/react'
import useCurrent from '../utils/Hooks/useCurrent'
import NavigationIcon from '@mui/icons-material/Navigation'
import Wind from '@mui/icons-material/Air'
import Link from '@mui/material/Link'
import { Town } from '../utils/Hooks/useLandingPage'
import Loader from './Loader'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

function Current(props) {
  const theme = useTheme()
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
      <Paper
        sx={{ padding: '30px', backgroundColor: theme.palette.primary.dark, borderRadius: '20px' }}
      >
        <Typography variant='p'>Actuellement</Typography>
        <Divider sx={{ color: theme.palette.primary.dark }} />
        {/*  */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant='h1' sx={{ fontWeight: 'bolder' }}>
                {current.temperature_2m}
              </Typography>
              <Typography variant='h3' sx={{ fontWeight: 'normal' }}>
                °C
              </Typography>
              <Typography variant='h6' sx={{ alignSelf: 'end' }}>
                Ressenti : {current.apparent_temperature}°C
              </Typography>
            </div>
            <Typography variant='h5'>{weatherCode.description}</Typography>
          </Box>
          <img src={weatherCode.image} alt={weatherCode.description} width='150px' height='150px' />
        </Box>
        {/*  */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant='h4'
            sx={{ fontFamily: 'Roboto', marginTop: '30px', marginBottom: '30px' }}
          >
            {townInfo.townName}
          </Typography>
          <Link
            href={`https://www.google.fr/maps/@${townInfo.latitude},${townInfo.longitude},13z?entry=ttu`}
            target='_blank'
            underline='hover'
            sx={{ color: '#0f0', alignSelf: 'center', marginLeft: '20px' }}
          >
            Carte
          </Link>
        </div>
        {/*  */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
            <div
              style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around' }}
            >
              <Wind sx={{ m1: 1, fontSize: '35px' }} />
              <Typography variant='h6'>{current.wind_speed_10m}km/h</Typography>
              <span>
                <NavigationIcon
                  sx={{
                    transform: `rotate(${current.wind_direction_10m}deg)`,
                    ml: 1,
                    fontSize: '35px',
                  }}
                />
              </span>
            </div>
            <Typography variant='h6' sx={{ alignSelf: 'center' }}>
              (Rafales : {current.wind_gusts_10m}km/h)
            </Typography>
          </div>
          <p style={{ width: '100%', textAlign: 'right', fontSize: '10px' }}>{current.time}</p>
        </div>
      </Paper>
    )
  )
}

export default Current
