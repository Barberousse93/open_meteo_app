import { createTheme } from '@mui/material'

const LOCAL_STORAGE_KEY = 'isDark'

const DARK_THEME = createTheme({
  // ...baseTheme,
  palette: {
    type: 'dark',
    primary: {
      main: '#222',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#353030',
    },
    text: {
      primary: '#f7f2f2',
      secondary: '#cfcfcf',
    },
    graphs: [
      '#8884d8',
      '#82ca9d',
      '#d88484',
      '#caa282',
      '#99bd3d',
      '#B79662',
      '#ab9494',
      '#F5AB00',
      '#f40632',
    ],
  },
})

const LIGHT_THEME = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#83abf3',
      light: '#8fc0f3',
      dark: '#62a5f3',
    },
    secondary: {
      main: '#5e95d3',
    },
    text: {
      primary: 'rgba(0,0,0,0.85)',
      secondary: 'rgba(0,0,0,0.6)',
    },
    background: {
      default: '#83bafb',
    },
    graphs: [
      '#851E6E',
      '#76a028',
      '#297979',
      '#E85921',
      '#743DBD',
      '#B79662',
      '#463C3C',
      '#F5AB00',
      '#AD001F',
    ],
  },
})

export { DARK_THEME, LIGHT_THEME, LOCAL_STORAGE_KEY }
