import { useTheme } from '@emotion/react'
export const CustomLegendTemperatures = () => {
  const theme = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: theme.palette.graphs[0],
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: theme.palette.graphs[0], marginRight: '10px' }}>
        Températures réelles
      </div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: theme.palette.graphs[1],
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: theme.palette.graphs[1] }}>Températures ressenties</div>
    </div>
  )
}

export const CustomLegendPrecipitations = () => {
  const theme = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: theme.palette.graphs[2],
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: theme.palette.graphs[2], marginRight: '10px' }}>% Pécipitations</div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: theme.palette.graphs[3],
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: theme.palette.graphs[3], marginRight: '10px' }}>Couverture nuageuse</div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: theme.palette.graphs[4],
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: theme.palette.graphs[4], marginRight: '10px' }}>Quantité pluie</div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: theme.palette.graphs[5],
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: theme.palette.graphs[5], marginRight: '10px' }}>Quantité neige</div>
    </div>
  )
}

export const CustomLegendVents = () => {
  const theme = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: theme.palette.graphs[6],
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: theme.palette.graphs[6], marginRight: '10px' }}>
        Vitesse et direction du vent
      </div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: theme.palette.graphs[7],
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: theme.palette.graphs[7] }}>Rafales</div>
    </div>
  )
}
