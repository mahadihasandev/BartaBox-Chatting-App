import Grid from '@mui/material/Grid'
import React from 'react'
import GroupList from '../layouts/GroupList'
import FriendList from '../layouts/FriendList'
import MessageUi from '../layouts/MessageUi'

function Message() {
  return (
    <div>
      <div className='grid-division'>
    <Grid container spacing={3}>
      <Grid size={4}>
        <GroupList/>
         <FriendList Uichange='changeui'/>
      </Grid>
      <Grid size={8}>
        <MessageUi/>
      </Grid> 
    </Grid>  
    
  </div>
    </div>
  )
}

export default Message