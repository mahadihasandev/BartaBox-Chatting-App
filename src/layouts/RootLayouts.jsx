import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import SideBar from '../components/SideBar';

function RootLayouts() {
  return (
    <>
    <Grid container spacing={2}>
      <Grid size={2}>
        <SideBar/>
      </Grid>
      <Grid size={10}>
        <Outlet/>
      </Grid>
 
    </Grid>
        
    </>
  )
}

export default RootLayouts