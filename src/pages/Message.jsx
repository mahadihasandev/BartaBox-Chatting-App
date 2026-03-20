import React from 'react'
import MessageUi from '../layouts/MessageUi'

function Message() {
  return (
    <section className='message-page-container'>
      <div className='message-page-header'>
        <h1>Chats</h1>
        <p>Stay connected with friends and groups in real time.</p>
      </div>
      <MessageUi className='message-main'/>
    </section>
  )
}

export default Message