import CircularProgress from '@mui/material/CircularProgress'
import styles from './styles.module.css'

function Loading() {
  return (
    <div className={`container ${styles.loading}`}>
      <CircularProgress size='5rem' />
    </div>
  )
}

export default Loading
