import React from 'react'
import { useTheme } from '@emotion/react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import Box from '@mui/material/Box'
import useTownSearch from '../utils/Hooks/useTownSearch'
import Loader from './Loader'
import { Container, Paper } from '@mui/material'

function TownSearch(props) {
  const {
    resultList,
    isLoading,
    error,
    handleKeyUp,
    handleClick,
    handleChange,
    ville,
    setVille,
    handleChangeTown,
    changeTown,
    handleClickItem,
    selectIsVisible,
    // historique,
  } = useTownSearch(props)

  const theme = useTheme()

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <div>Error : {error}</div>
  }

  return (
    <div style={{ height: '100vh', backgroundColor: theme.palette.primary.light }}>
      {props.formIsVisible && (
        <Paper
          sx={{
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {/* Zone de saisie */}
          <TextField
            sx={{
              borderRadius: '5px',
              // backgroundColor: theme.palette.primary.light,
            }}
            onChange={(e) => handleChange(e)}
            onKeyUp={handleKeyUp}
            value={ville}
            size='small'
            placeholder='Rechercher une ville...'
            InputProps={{
              startAdornment: (
                // Icône "loupe"
                <InputAdornment position='start'>
                  <SearchIcon
                    style={{ cursor: 'pointer', color: theme.palette.text.primary }}
                    onClick={handleClick}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                // Icône "croix"
                <InputAdornment position='end'>
                  <ClearIcon
                    onClick={() => setVille('')}
                    style={{ cursor: 'pointer', color: theme.palette.text.primary }}
                  />
                </InputAdornment>
              ),
            }}
          ></TextField>

          {selectIsVisible && (
            <FormControl>
              {/* Liste déroulante résultat */}
              <InputLabel variant='outlined'>Sélectionnez dans la liste</InputLabel>
              <Select
                sx={{
                  backgroundColor: theme.palette.primary.light,
                }}
                value={changeTown}
                onChange={(e) => handleChangeTown(e)}
                defaultValue=''
                label='Sélectionnez dans la liste'
              >
                {resultList.map((item) => (
                  <MenuItem
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.text.primary,
                    }}
                    key={item.id}
                    value={item.id}
                    onClick={() =>
                      handleClickItem({
                        name: item.name,
                        latitude: item.latitude,
                        longitude: item.longitude,
                      })
                    }
                  >
                    {item.name} ({item.admin1}, {item.country})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Paper>
      )}
    </div>
  )
}

export default TownSearch
