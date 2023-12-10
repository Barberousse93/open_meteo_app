import React, { useContext } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Customized } from 'recharts'
import useHourly from '../utils/Hooks/useHourly'
import { Town } from '../App'
import Loader from './loader'
import decryptWeatherCode from '../utils/decryptWeatherCode'

function Hourly(props) {
  const { townInfo } = useContext(Town)
  const { isLoading, error, hourly, convertedHourly } = useHourly(props)

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

    return <image x={cx - 20} y={10} width={40} height={40} xlinkHref={weatherCode.image} />
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
          <Tooltip />
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
          <Tooltip />
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