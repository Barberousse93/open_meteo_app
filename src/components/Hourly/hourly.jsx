import React, { useContext } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Customized } from 'recharts'
import useHourly from '../../utils/Hooks/useHourly'
import { Town } from '../../App'
import Loader from '../Loader'

import {
  CustomTooltipTemperatures,
  CustomTooltipPrecipitations,
  CustomTooltipVents,
} from './CustomToolTips'

import {
  CustomLegendTemperatures,
  CustomLegendPrecipitations,
  CustomLegendVents,
} from './CustomLegends'

import { weatherIcon, WindDirectionIcon, HotFreezeIcon } from './Icons/Icons'

function Hourly(props) {
  const { townInfo } = useContext(Town)
  const { isLoading, error, hourly, convertedHourly } = useHourly(props)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error : {error}</div>
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
