import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { handleLogout } from '../../utils/authActions'
import styles from './styles.module.css'
import { UIContext } from '../../utils/UIProvider'
import MailIcon from '@mui/icons-material/Mail'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { AuthContext } from '../../utils/AuthProvider'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  menu: {
    '& .MuiMenu-list': {
      padding: '2rem 4rem',
      // height: '30rem',
    },
    '& .MuiMenu-paper': {
      borderRadius: '2rem',
    },
    '& .Mui-focusVisible': {
      backgroundColor: 'white !important',
    },
  },

  mobileMenu: {
    '@media(min-width: 800px)': {
      display: 'none',
    },
    '& .MuiMenu-list': {
      textAlign: 'center',
      // padding: '2rem 4rem',
      // height: '30rem',
      // '@media(max-width: 600px)': {
      //   height: '35rem',
      // },
    },
  },

  profileMenu: {
    '@media(max-width: 800px)': {
      display: 'none',
    },
  },

  profileTitle: {
    marginTop: '0rem',
  },
  menuItem: {
    fontSize: '1.6rem !important',
    display: 'flex',
    width: '12rem',
    height: '5rem',
    justifyContent: 'center',
    flexDirection: 'column',
    '&:hover': {
      backgroundColor: 'white !important',
      // fontSize: '1.8rem !important',
      color: 'blue !important',
      transition: 'font-size 0.1s',
    },
  },
}))

function Navigation() {
  const { countInquiries } = useContext(UIContext)
  const { user } = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()

  return (
    <>
      {/* <Sidebar visible={visible} setVisible={setVisible} /> */}
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
              <Menu
                className={`${classes.menu} ${classes.profileMenu}`}
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
                  disableRipple
                  className={classes.menuItem}
                  onClick={() => {
                    handleClose()
                    handleLogout()
                  }}
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          )}
        </div>

        <div
          // onClick={() => setVisible(true)}
          className={styles.navigation__menu}
        >
          <>
            <div onClick={handleMobileMenuOpen}>
              <MoreVertIcon
                style={{
                  fontSize: '3.5rem',
                }}
              />
            </div>
            <Menu
              anchorEl={mobileMoreAnchorEl}
              className={`${classes.menu} ${classes.mobileMenu}`}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id='mobile-menu-id'
              // keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!mobileMoreAnchorEl}
              onClose={handleMobileMenuClose}
            >
              <h2 className={classes.profileTitle}>Menu</h2>
              <Link to='/'>
                <MenuItem
                  onClick={() => {
                    handleMobileMenuClose()
                  }}
                  disableRipple
                  className={classes.menuItem}
                >
                  <p>Services</p>
                </MenuItem>
              </Link>
              <Link to='add-service'>
                <MenuItem
                  onClick={() => {
                    handleMobileMenuClose()
                  }}
                  disableRipple
                  className={classes.menuItem}
                >
                  <p>Add Service</p>
                </MenuItem>
              </Link>
              <Link to='inquiry'>
                <MenuItem
                  onClick={() => {
                    handleMobileMenuClose()
                  }}
                  disableRipple
                  className={classes.menuItem}
                >
                  <p>Inquiry</p>
                </MenuItem>
              </Link>

              <MenuItem
                onClick={() => {
                  handleMobileMenuClose()
                  handleLogout()
                }}
                disableRipple
                className={classes.menuItem}
              >
                <p>Sign out</p>
              </MenuItem>
            </Menu>
          </>
          {/* <FiMenu /> */}
          {/* <IconButton> */}

          {/* </IconButton> */}
          {/* <IconButton
            size='large'
            onClick={handleMobileMenuOpen}
            color='inherit'
          >
            <MoreIcon />
          </IconButton> */}
        </div>
      </nav>
    </>
  )
}

const nameInitials = (name: string) => {
  const [firstName, lastName] = name.toUpperCase().split(' ')
  return `${firstName[0]} ${lastName[0]}`
}

export default Navigation
