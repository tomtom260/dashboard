import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { ServiceType } from '../../store/reducers/services'
import { useInView } from 'react-intersection-observer'
// import ScrollMagic from 'scrollmagic'
// import '/ScrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
// import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
import { useEffect } from 'react'

function Service({
  id,
  description,
  title,
}: Pick<ServiceType, 'title' | 'description' | 'id'>) {
  const { ref, inView } = useInView({
    threshold: 0,
  })

  return <div className={styles.service}>Hello</div>
}

export default Service
