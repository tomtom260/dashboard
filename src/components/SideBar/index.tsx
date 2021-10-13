import { Link } from 'react-router-dom'
import { handleLogout } from '../../utils/authActions'
import styles from './styles.module.css'
import { FaTimes } from 'react-icons/fa'

type SidebarProps = {
  visible: boolean
  setVisible: (value: boolean) => void
}

function Sidebar({ visible, setVisible }: SidebarProps) {
  return (
    <div
      className={
        visible ? styles.sidebar : `${styles.sidebar} ${styles.sidebar__hidden}`
      }
    >
      <div onClick={() => setVisible(false)} className={styles.sidebar__close}>
        <FaTimes />
      </div>
      <div className={styles.sidebar__links}>
        <Link onClick={() => setVisible(false)} to='/'>
          Home
        </Link>
        <Link onClick={() => setVisible(false)} to='/add-service'>
          Add Service
        </Link>
        <Link onClick={() => setVisible(false)} to='/inquiry'>
          Inquiry
        </Link>
        <button
          className='button--text'
          onClick={() => {
            handleLogout()
            setVisible(false)
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Sidebar
