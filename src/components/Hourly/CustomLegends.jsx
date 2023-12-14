export const CustomLegendTemperatures = () => {
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
          backgroundColor: '#8884d8',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: '#8884d8', marginRight: '10px' }}>Températures réelles</div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: '#82ca9d',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: '#82ca9d' }}>Températures ressenties</div>
    </div>
  )
}

export const CustomLegendPrecipitations = () => {
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
          backgroundColor: '#8884d8',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: '#8884d8', marginRight: '10px' }}>% Pécipitaions</div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: '#d88484',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: '#d88484', marginRight: '10px' }}>Couverture nuageuse</div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: '#82ca9d',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: '#82ca9d', marginRight: '10px' }}>Quantité pluie</div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: '#caa282',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: '#caa282', marginRight: '10px' }}>Quantité neige</div>
    </div>
  )
}

export const CustomLegendVents = () => {
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
          backgroundColor: '#8884d8',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: '#8884d8', marginRight: '10px' }}>Vitesse et direction du vent</div>
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: '#82ca9d',
          borderRadius: '50%',
          marginRight: '5px',
        }}
      ></div>
      <div style={{ color: '#82ca9d' }}>Rafales</div>
    </div>
  )
}
