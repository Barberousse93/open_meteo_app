import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
// import InputAdornment from '@mui/material/InputAdornment'
// import SearchIcon from '@mui/icons-material/Search'
// import ClearIcon from '@mui/icons-material/Clear'

function TownSearch(props) {
  // console.log(props.mock)
  // const [ville, setVille] = useState('')

  return (
    <h1>TownSearch</h1>
    // <TextField
    //   style={{
    //     backgroundColor: 'rgba(255,255,255,0.1)',
    //     borderRadius: '5px',
    //   }}
    //   //   onChange={(e) => setVille(e.target.value)}
    //   //   onKeyUp={handleKeyUp}
    //   value={ville}
    //   size='small'
    //   placeholder='Rechercher une ville...'
    //   InputProps={{
    //     startAdornment: (
    //       <InputAdornment position='start'>
    //         <SearchIcon
    //           style={{ cursor: 'pointer' }}
    //           //   onClick={handleClick}
    //         />
    //       </InputAdornment>
    //     ),
    //     endAdornment: (
    //       <InputAdornment position='end'>
    //         <ClearIcon
    //           // onClick={() => setVille('')}
    //           style={{ cursor: 'pointer' }}
    //         />
    //       </InputAdornment>
    //     ),
    //   }}
    // ></TextField>
  )
}

export default TownSearch
