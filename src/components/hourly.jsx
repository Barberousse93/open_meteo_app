import React, { useContext, useState } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Customized } from 'recharts'
import useHourly from '../utils/Hooks/useHourly'
import { Town } from '../App'
import Loader from './loader'
import decryptWeatherCode from '../utils/decryptWeatherCode'

function Hourly(props) {
  const { townInfo } = useContext(Town)
  const { isLoading, error, hourly, convertedHourly } = useHourly(props)
  const [currentWeatherDesc, setCurrentWeatherDesc] = useState('')

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error : {error}</div>
  }

  const renderCustomizedDot = (props) => {
    const { cx } = props
    const code = props.payload.code
    const nightDayCode = props.payload.nightDayCode

    const weatherCode = decryptWeatherCode({ code, nightDayCode })
    setCurrentWeatherDesc(weatherCode.description)

    return <image x={cx - 25} y={10} width={50} height={50} xlinkHref={weatherCode.image} />
  }

  const CustomTooltip = ({ active, payload }) => {
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
  const CustomTooltip2 = ({ active, payload }) => {
    if (active && payload) {
      // console.log(payload[0].payload.pluie)
      const code = payload[0].payload.code
      const nightDayCode = payload[0].payload.nightDayCode
      const weatherCode = decryptWeatherCode({ code, nightDayCode })
      return (
        <>
          <div style={{ background: '#444', opacity: '0.8', padding: '10px', borderRadius: '5px' }}>
            <div>{weatherCode.description}</div>
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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type='monotone' dataKey='temperature' stroke='#8884d8' />
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
          <Tooltip content={<CustomTooltip2 />} />
          <Legend />
          <Line yAxisId='left' type='monotone' dataKey='proba_precipitations' stroke='#8884d8' />
          <Line yAxisId='right' type='monotone' dataKey='pluie' stroke='#82ca9d' />
          <Line yAxisId='right' type='monotone' dataKey='neige' stroke='#caa282' />
          <Line
            yAxisId='left'
            type='monotone'
            // dataKey='météo'
            stroke='#8884d8'
            dot={<Customized component={renderCustomizedDot} />}
          />
        </LineChart>
        {/*         
        {hourly.time.map((item, index) => (
          <p key={index}>{item}</p>
        ))} */}
      </>
    )
  )
}

export default Hourly
