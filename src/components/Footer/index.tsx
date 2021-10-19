import React from 'react'
import { useLocation } from 'react-router'
import styles from './styles.module.css'

function Footer() {
  const { pathname } = useLocation()
  return (
    <div
      className={
        pathname === '/'
          ? `${styles.footer} ${styles.footer__snap}`
          : styles.footer
      }
    >
      ETM Software {new Date().getFullYear()}
    </div>
  )
}

export default Footer
