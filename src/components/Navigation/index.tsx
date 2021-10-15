import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { handleLogout } from '../../utils/authActions'
import Sidebar from '../SideBar'
import styles from './styles.module.css'
import { FiMenu } from 'react-icons/fi'
import { UIContext } from '../../utils/UIProvider'
import MailIcon from '@mui/icons-material/Mail'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { AuthContext } from '../../utils/AuthProvider'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  profileMenu: {
    '& .MuiMenu-list': {
      padding: '2rem',
    },
  },

  profileTitle: {
    marginTop: '0rem',
  },
  menuItem: {
    fontSize: '1.6rem !important',
  },
})

function Navigation() {
  const [visible, setVisible] = useState<boolean>(false)
  const { countInquiries } = useContext(UIContext)
  const { user } = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()

  return (
    <>
      <Sidebar visible={visible} setVisible={setVisible} />
      <nav className={styles.navigation}>
        <h1
          className={
            user
              ? styles.navigation__title
              : `${styles.navigation__title} styles.navigation__title`
          }
        >
          ETM Software
        </h1>
        <div
          className={
            user
              ? styles.navigation__links
              : `${styles.navigation__links} ${styles.navigation__links__loggedout}`
          }
        >
          {!user ? (
            <>
              {/* <Box justifyContent='space-between'> */}
              <Link className={styles.navigation__button} to='/signin'>
                Sign In
              </Link>
              <Link className={styles.navigation__button} to='/signup'>
                Sign Up
              </Link>

              {/* </Box> */}
            </>
          ) : (
            <>
              <Link to='/'>Home</Link>
              <Link to='/add-service'>Add Service</Link>
              <Link to='/inquiry'>
                <>
                  Inquiry
                  {countInquiries ? (
                    <IconButton size='large' color='inherit'>
                      <Badge badgeContent={countInquiries} color='error'>
                        <MailIcon />
                      </Badge>
                    </IconButton>
                  ) : null}
                </>
              </Link>
              <IconButton onClick={handleClick}>
                <Avatar sx={{ bgcolor: 'rgb(70, 70, 187)' }}>
                  {nameInitials(user?.displayName!)}
                </Avatar>
              </IconButton>
            </>
          )}
        </div>

        <div
          onClick={() => setVisible(true)}
          className={styles.navigation__menu}
        >
          <FiMenu />
        </div>
        <Menu
          className={classes.profileMenu}
          id='basic-menu'
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <h2 className={classes.profileTitle}>{user?.displayName!}</h2>
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              handleClose()
              handleLogout()
            }}
          >
            Sign Out
          </MenuItem>
        </Menu>
      </nav>
    </>
  )
}

const nameInitials = (name: string) => {
  const [firstName, lastName] = name.toUpperCase().split(' ')
  return `${firstName[0]} ${lastName[0]}`
}

export default Navigation
