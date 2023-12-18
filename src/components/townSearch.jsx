import React, { useContext } from 'react'
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
import { Town } from '../components/LandingPage'

// import Current from './current'

function TownSearch(props) {
  // console.log('props TownSearch', props)
  const town = useContext(Town)

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
    historique,
  } = useTownSearch(props)

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <div>Error : {error}</div>
  }
  // console.log('context : ', town)

  return (
    props.formIsVisible && (
      <Box style={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
        <TextField
          style={{
            borderRadius: '5px',
          }}
          onChange={(e) => handleChange(e)}
          onKeyUp={handleKeyUp}
          value={ville}
          size='small'
          placeholder='Rechercher une ville...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon style={{ cursor: 'pointer' }} onClick={handleClick} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <ClearIcon onClick={() => setVille('')} style={{ cursor: 'pointer' }} />
              </InputAdornment>
            ),
          }}
        ></TextField>

        {selectIsVisible && (
          <FormControl fullWidth>
            <InputLabel variant='outlined'>Sélectionnez dans la liste</InputLabel>
            <Select
              value={changeTown}
              onChange={(e) => handleChangeTown(e)}
              defaultValue=''
              label='Sélectionnez dans la liste'
            >
              {resultList.map((item) => (
                <MenuItem
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
      </Box>
    )
  )
}

export default TownSearch
