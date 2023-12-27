import React, { useContext } from 'react'
import { useTheme } from '@emotion/react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Customized } from 'recharts'
import useHourly from '../../utils/Hooks/useHourly'
import { Town } from '../../utils/Hooks/useLandingPage'
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
import { Divider, Paper } from '@mui/material'

function Hourly(props) {
  const { townInfo } = useContext(Town)
  const { isLoading, error, hourly, convertedHourly } = useHourly(props)

  const theme = useTheme()

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error : {error}</div>
  }

  return (
    townInfo &&
    townInfo.townName &&
    hourly && (
      <Paper style={{ overflow: 'auto hidden', backgroundColor: theme.palette.primary.main }}>
        <LineChart
          width={1024}
          height={250}
          data={convertedHourly}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          style={{ marginTop: '20px', marginBottom: '10px' }}
        >
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <XAxis dataKey='time' stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip content={<CustomTooltipTemperatures />} />
          <Legend content={<CustomLegendTemperatures />} />
          <Line
            type='monotone'
            dataKey='temperature'
            stroke={theme.palette.graphs[0]}
            dot={<Customized component={HotFreezeIcon} />}
          />
          <Line type='monotone' dataKey='ressenti' stroke={theme.palette.graphs[1]} />
        </LineChart>
        <Divider sx={{ color: theme.palette.text.primary }} />
        <LineChart
          width={1024}
          height={250}
          data={convertedHourly}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          style={{ marginTop: '20px', marginBottom: '10px' }}
        >
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <XAxis dataKey='time' stroke={theme.palette.text.secondary} />
          <YAxis yAxisId='left' stroke={theme.palette.text.secondary} />
          <YAxis yAxisId='right' orientation='right' stroke={theme.palette.text.secondary} />
          <Tooltip content={<CustomTooltipPrecipitations />} />
          <Legend content={<CustomLegendPrecipitations />} />
          <Line
            yAxisId='left'
            type='monotone'
            dataKey='proba_precipitations'
            stroke={theme.palette.graphs[2]}
          />
          <Line
            yAxisId='left'
            type='monotone'
            dataKey='couverture'
            stroke={theme.palette.graphs[3]}
          />
          <Line yAxisId='right' type='monotone' dataKey='pluie' stroke={theme.palette.graphs[4]} />
          <Line yAxisId='right' type='monotone' dataKey='neige' stroke={theme.palette.graphs[5]} />
          <Line
            yAxisId='left'
            type='monotone'
            // dataKey='météo'
            stroke='#8884d8'
            dot={<Customized component={weatherIcon} />}
          />
        </LineChart>
        <Divider sx={{ color: theme.palette.text.primary }} />
        <LineChart
          width={1024}
          height={250}
          data={convertedHourly}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <XAxis dataKey='time' stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip content={<CustomTooltipVents />} />
          <Legend content={<CustomLegendVents />} />
          <Line
            type='monotone'
            dataKey='vitesse'
            stroke={theme.palette.graphs[6]}
            dot={<WindDirectionIcon />}
          />
          <Line type='monotone' dataKey='rafales' stroke={theme.palette.graphs[7]} />
          {/* <Line type='monotone' dataKey='direction' stroke='#8884d8' dot={<WindDirectionIcon />} /> */}
        </LineChart>
      </Paper>
    )
  )
}

export default Hourly
