import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/system'

const DisabledBackground = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  background: '#333',
  opacity: 0.5,
  zIndex: 10,
})

export default function Loader() {
  return (
    <>
      <CircularProgress
        size={70}
        sx={{
          position: 'absolute',
          //     left: '50%',
          //     top: '50%',
          //   transform: 'translate(-50%, -50%)',
          zIndex: 20,
        }}
      />
      <DisabledBackground />
    </>
  )
}
