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
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Switch name='switchTheme' checked={isDark} onChange={toggleTheme} />
      <label htmlFor='switchTheme'> Theme&nbsp;</label> {isDark ? 'Clair' : 'Sombre'}
      <Button onClick={handleReset}>Reset</Button>
    </div>
  )
}

export default SwitchTheme
