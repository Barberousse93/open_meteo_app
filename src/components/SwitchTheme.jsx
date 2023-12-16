import React, { useContext } from 'react'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import ThemeContext from '../utils/Theming/ThemeContext'

function SwitchTheme() {
  function handleReset() {
    localStorage.removeItem('OpenMeteo')
    window.location.reload()
  }

  const { isDark, toggleTheme } = useContext(ThemeContext)
  return (
    <>
      <Switch name='switchTheme' checked={isDark} onChange={toggleTheme} />
      <label htmlFor='switchTheme'> Theme&nbsp;</label> {isDark ? 'Clair' : 'Sombre'}
      <Button onClick={handleReset}>Reset</Button>
    </>
  )
}

export default SwitchTheme
