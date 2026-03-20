
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails } from '../slices/userInfoSlice'

const defaultSettings = {
  messagePreview: true,
  desktopAlerts: true,
  darkBubbles: false,
}

function Settings() {
  const user = useSelector((state) => state.activeUser.value)
  const dispatch = useDispatch()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const key = useMemo(() => `settings-${user?.uid || 'guest'}`, [user?.uid])

  const [settings, setSettings] = useState(() => {
    const cached = localStorage.getItem(key)
    return cached ? JSON.parse(cached) : defaultSettings
  })

  const persistSettings = (next) => {
    setSettings(next)
    localStorage.setItem(key, JSON.stringify(next))
  }

  const toggleSetting = (name) => {
    persistSettings({ ...settings, [name]: !settings[name] })
  }

  const saveProfile = () => {
    const updated = { ...user, displayName: displayName.trim() || user?.displayName }
    dispatch(userDetails(updated))
    localStorage.setItem('activeUser', JSON.stringify(updated))
  }


  return (
    <section className='screen-card'>
      <div className='screen-card-header'>
        <div>
          <h2>Settings</h2>
          <p>Manage profile details and app preferences.</p>
        </div>
      </div>

      <div className='settings-grid'>
        <article className='settings-panel'>
          <h3>Profile</h3>
          <label>Display name</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            type='text'
            placeholder='Your display name'
          />
          <button onClick={saveProfile}>Save profile</button>
        </article>

        <article className='settings-panel'>
          <h3>Preferences</h3>
          <div className='setting-row'>
            <span>Message preview</span>
            <button className='tiny-btn' onClick={() => toggleSetting('messagePreview')}>
              {settings.messagePreview ? 'On' : 'Off'}
            </button>
          </div>
          <div className='setting-row'>
            <span>Desktop alerts</span>
            <button className='tiny-btn' onClick={() => toggleSetting('desktopAlerts')}>
              {settings.desktopAlerts ? 'On' : 'Off'}
            </button>
          </div>
          <div className='setting-row'>
            <span>Dark chat bubbles</span>
            <button className='tiny-btn' onClick={() => toggleSetting('darkBubbles')}>
              {settings.darkBubbles ? 'On' : 'Off'}
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Settings