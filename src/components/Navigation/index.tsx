import { Link } from 'react-router-dom'
import { handleLogout } from '../../utils/authActions'
import './index.css'

function Navigation() {
  return (
    <nav className='navigation'>
      <Link to='/'>Home</Link>
      <Link to='/add-service'>Add Service</Link>
      <Link to='/inquiry'>Inquiry</Link>
      <button onClick={handleLogout}>log out</button>
    </nav>
  )
}

export default Navigation
