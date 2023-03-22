import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          alt="Nasa Logo"
          width="50"
          height="50"
          src="https://cdn.icon-icons.com/icons2/2699/PNG/512/nasa_logo_icon_170926.png"
        ></img>
        <Typography margin="auto" variant="h6">
          NASA Media Library
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
