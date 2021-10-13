import React from 'react'
import styles from './styles.module.css'

function Footer() {
  return (
    <div className={styles.footer}>ETM Software {new Date().getFullYear()}</div>
  )
}

export default Footer
