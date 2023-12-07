import React, { useContext } from 'react'
import Switch from '@mui/material/Switch'
import ThemeContext from '../utils/Theming/ThemeContext'

function SwitchTheme() {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  return (
    <>
      <Switch name='switchTheme' checked={isDark} onChange={toggleTheme} />
      <label htmlFor='switchTheme'> Theme&nbsp;</label> {isDark ? 'Clair' : 'Sombre'}
    </>
  )
}

export default SwitchTheme
