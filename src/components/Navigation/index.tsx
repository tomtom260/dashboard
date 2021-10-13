import { useState } from 'react'
import { Link } from 'react-router-dom'
import { handleLogout } from '../../utils/authActions'
import Sidebar from '../SideBar'
import styles from './styles.module.css'
import { FiMenu } from 'react-icons/fi'

function Navigation() {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <>
      <Sidebar visible={visible} setVisible={setVisible} />
      <nav className={styles.navigation}>
        <h1 className={styles.navigation__title}>ETM Software</h1>
        <div className={styles.navigation__links}>
          <Link to='/'>Home</Link>
          <Link to='/add-service'>Add Service</Link>
          <Link to='/inquiry'>Inquiry</Link>
        </div>
        <button className='button--text' onClick={handleLogout}>
          Sign out
        </button>
        <div
          onClick={() => setVisible(true)}
          className={styles.navigation__menu}
        >
          <FiMenu />
        </div>
      </nav>
    </>
  )
}

export default Navigation
