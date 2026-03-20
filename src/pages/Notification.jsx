import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const defaultAlerts = [
  {
    id: 1,
    title: 'New friend request',
    description: 'Someone wants to connect with you. Review requests from the Home page.',
    type: 'social',
  },
  {
    id: 2,
    title: 'Chat tips',
    description: 'Pick any friend from Friend List to start a real-time conversation.',
    type: 'message',
  },
  {
    id: 3,
    title: 'Security reminder',
    description: 'Enable login alerts from Settings for additional account safety.',
    type: 'security',
  },
]

function Notification() {
  const activeUser = useSelector((state) => state.activeUser.value)
  const storageKey = `notifications-${activeUser?.uid || 'guest'}`
  const [notifications, setNotifications] = useState(() => {
    const cached = localStorage.getItem(storageKey)
    if (cached) {
      return JSON.parse(cached)
    }
    return defaultAlerts.map((alert) => ({ ...alert, isRead: false }))
  })

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications],
  )

  const updateNotifications = (next) => {
    setNotifications(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  const markAllRead = () => {
    const next = notifications.map((item) => ({ ...item, isRead: true }))
    updateNotifications(next)
  }

  const clearAll = () => {
    updateNotifications([])
  }

  const toggleRead = (id) => {
    const next = notifications.map((item) =>
      item.id === id ? { ...item, isRead: !item.isRead } : item,
    )
    updateNotifications(next)
  }

  return (
    <section className='screen-card'>
      <div className='screen-card-header'>
        <div>
          <h2>Notifications</h2>
          <p>You have {unreadCount} unread alerts.</p>
        </div>
        <div className='screen-card-actions'>
          <button onClick={markAllRead}>Mark all read</button>
          <button className='secondary-btn' onClick={clearAll}>Clear all</button>
        </div>
      </div>

      <div className='notification-list'>
        {notifications.length === 0 && (
          <div className='empty-state'>
            <h3>All caught up</h3>
            <p>There are no notifications right now.</p>
          </div>
        )}

        {notifications.map((item) => (
          <article
            key={item.id}
            className={`notification-item ${item.isRead ? 'read' : 'unread'}`}
          >
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
            <button className='tiny-btn' onClick={() => toggleRead(item.id)}>
              {item.isRead ? 'Mark unread' : 'Mark read'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Notification