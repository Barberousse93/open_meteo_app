import React, { useContext, useState } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Customized } from 'recharts'
import useHourly from '../utils/Hooks/useHourly'
import { Town } from '../App'
import Loader from './loader'
import decryptWeatherCode from '../utils/decryptWeatherCode'
import NavigationIcon from '@mui/icons-material/Navigation'
import Frost from '@mui/icons-material/AcUnit'
import Hot from '@mui/icons-material/LocalFireDepartment'

function Hourly(props) {
  const { townInfo } = useContext(Town)
  const { isLoading, error, hourly, convertedHourly } = useHourly(props)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error : {error}</div>
  }

  const weatherIcon = (props) => {
    const { cx } = props
    const code = props.payload.code
    const nightDayCode = props.payload.nightDayCode
    const weatherCode = decryptWeatherCode({ code, nightDayCode })
    return <image x={cx - 25} y={10} width={50} height={50} xlinkHref={weatherCode.image} />
  }

  const WindDirectionIcon = (props) => {
    // console.log(props.payload.direction)
    const { cx, cy, payload } = props
    // console.log(props)
    const direction = parseInt(payload.direction)
    // console.log(direction, cx)
    return (
      <g transform={`translate(${cx}, ${cy}) rotate(${direction})`}>
        <NavigationIcon
          x={-15}
          y={-15} // y={10} distance fixe du haut du graphique
          width={30}
          height={30}
        />
      </g>
    )
  }

  const HotFreezeIcon = (props) => {
    const { cx, cy, payload } = props
    switch (true) {
      case payload.temperature <= 0:
        return <Frost x={cx - 10} y={cy + 5} width={20} height={20} style={{ color: '#00f' }} />
        break
      case payload.temperature > 30:
        return <Hot x={cx - 10} y={cy + 5} width={20} height={20} style={{ color: '#f00' }} />
        break
      default:
        return (
          // default dot
          <svg x={cx - 5} y={cy - 5} width={10} height={10} fill='white'>
            <g transform='translate(6 6)'>
              <circle r='5' fill='#8884d8' />
              <circle r='3' fill='white' />
            </g>
          </svg>
        )
    }
  }

  function convertirEnDirection(angle) {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSO',
      'SO',
      'OSO',
      'O',
      'ONO',
      'NO',
      'NNO',
    ]
    const index = Math.round((angle / 360) * (directions.length - 1)) % directions.length
    return directions[index]
  }

  const CustomTooltipTemperatures = ({ active, payload }) => {
    if (active && payload) {
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

  const CustomLegendTemperatures = () => {
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

  const CustomTooltipPrecipitations = ({ active, payload }) => {
    if (active && payload) {
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

  const CustomLegendPrecipitations = () => {
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

  const CustomTooltipVents = ({ active, payload }) => {
    if (active && payload) {
      // console.log(payload[0].payload.pluie)
      const direction = convertirEnDirection(payload[0].payload.direction)
      return (
        <>
          <div style={{ background: '#444', opacity: '0.8', padding: '10px', borderRadius: '5px' }}>
            <div>Direction : {direction}</div>
            <div style={{ color: '#d88484' }}>Force du vent : {payload[0].payload.vitesse}kmh</div>
            <div style={{ color: '#8884d8' }}>Rafales : {payload[0].payload.rafales}kmh</div>
          </div>
        </>
      )
    }
  }

  const CustomLegendVents = () => {
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
        <div style={{ color: '#8884d8', marginRight: '10px' }}>Vitesse du vent</div>
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

  return (
    townInfo &&
    townInfo.selectedTown &&
    hourly && (
      <>
        <LineChart
          width={1024}
          height={250}
          data={convertedHourly}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis />
          <Tooltip content={<CustomTooltipTemperatures />} />
          <Legend content={<CustomLegendTemperatures />} />
          <Line
            type='monotone'
            dataKey='temperature'
            stroke='#8884d8'
            dot={<Customized component={HotFreezeIcon} />}
          />
          <Line type='monotone' dataKey='ressenti' stroke='#82ca9d' />
        </LineChart>

        <LineChart
          width={1024}
          height={250}
          data={convertedHourly}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip content={<CustomTooltipPrecipitations />} />
          <Legend content={<CustomLegendPrecipitations />} />
          <Line yAxisId='left' type='monotone' dataKey='proba_precipitations' stroke='#8884d8' />
          <Line yAxisId='left' type='monotone' dataKey='couverture' stroke='#d88484' />
          <Line yAxisId='right' type='monotone' dataKey='pluie' stroke='#82ca9d' />
          <Line yAxisId='right' type='monotone' dataKey='neige' stroke='#caa282' />
          <Line
            yAxisId='left'
            type='monotone'
            // dataKey='météo'
            stroke='#8884d8'
            dot={<Customized component={weatherIcon} />}
          />
        </LineChart>

        <LineChart
          width={1024}
          height={250}
          data={convertedHourly}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis />
          <Tooltip content={<CustomTooltipVents />} />
          <Legend content={<CustomLegendVents />} />
          <Line type='monotone' dataKey='vitesse' stroke='#8884d8' dot={<WindDirectionIcon />} />
          <Line type='monotone' dataKey='rafales' stroke='#d88484' />
          {/* <Line type='monotone' dataKey='direction' stroke='#8884d8' dot={<WindDirectionIcon />} /> */}
        </LineChart>
      </>
    )
  )
}

export default Hourly
