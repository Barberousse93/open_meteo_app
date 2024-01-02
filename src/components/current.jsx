import React, { useContext } from 'react'
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
        sx={{
          padding: '30px',
          backgroundColor: theme.palette.primary.dark,
          borderRadius: '20px',
        }}
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
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                variant='h1'
                sx={{ fontWeight: 'bolder' }}
                fontSize={{
                  lg: 100,
                  md: 80,
                  sm: 60,
                  xs: 60,
                }}
              >
                {current.temperature_2m}
              </Typography>
              <Typography
                variant='h3'
                sx={{ fontWeight: 'normal' }}
                fontSize={{
                  lg: 50,
                  md: 40,
                  sm: 30,
                  xs: 30,
                }}
              >
                °C
              </Typography>
              <Typography
                variant='h6'
                sx={{ alignSelf: 'end' }}
                fontSize={{
                  lg: '20px',
                  md: 20,
                  sm: 15,
                  xs: 12,
                }}
              >
                Ressenti : {current.apparent_temperature}°C
              </Typography>
            </div>
            <Typography
              variant='h5'
              fontSize={{
                lg: 35,
                md: 30,
                sm: 25,
                xs: 20,
              }}
            >
              {weatherCode.description}
            </Typography>
          </Box>
          <img src={weatherCode.image} alt={weatherCode.description} width='150px' height='150px' />
        </Box>
        {/*  */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant='h4'
            sx={{ fontFamily: 'Roboto', marginTop: '30px', marginBottom: '30px' }}
            fontSize={{
              lg: 45,
              md: 40,
              sm: 35,
              xs: 30,
            }}
          >
            {townInfo.townName}
          </Typography>
          <Link
            href={`https://www.google.fr/maps/@${townInfo.latitude},${townInfo.longitude},13z?entry=ttu`}
            target='_blank'
            underline='hover'
            sx={{ color: '#0f0', alignSelf: 'center', marginLeft: '20px' }}
            fontSize={{
              lg: 20,
              md: 20,
              sm: 15,
              xs: 15,
            }}
          >
            Carte
          </Link>
        </div>
        {/*  */}
        <div>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',

              width: '250px',
            }}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Wind
                sx={{
                  m1: 1,
                  color: 'gray',
                  fontSize: {
                    lg: 35,
                    md: 30,
                    sm: 25,
                    xs: 25,
                  },
                }}
              />
              <Typography
                variant='h6'
                fontSize={{
                  lg: 30,
                  md: 25,
                  sm: 25,
                  xs: 20,
                }}
              >
                {current.wind_speed_10m}km/h
              </Typography>
              <span>
                <NavigationIcon
                  sx={{
                    transform: `rotate(${current.wind_direction_10m}deg)`,
                    ml: 1,
                    fontSize: {
                      lg: 35,
                      md: 30,
                      sm: 25,
                      xs: 25,
                    },
                  }}
                />
              </span>
            </Box>
            <Typography
              variant='h6'
              sx={{ alignSelf: 'center' }}
              fontSize={{
                lg: 25,
                md: 20,
                sm: 20,
                xs: 15,
              }}
            >
              (Rafales : {current.wind_gusts_10m}km/h)
            </Typography>
          </Box>
          <p style={{ width: '100%', textAlign: 'right', fontSize: '10px' }}>{current.time}</p>
        </div>
      </Paper>
    )
  )
}

export default Current
