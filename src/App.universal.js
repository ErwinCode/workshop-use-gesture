import { useSpring, animated } from '@react-spring/web'
import pit from '/images/avocados/pit.svg'
import { useDrag } from '@use-gesture/react'

import styles from './App.css'

export default function App() {
  const [spring, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const bind = useDrag(handleDrag, {
    from: () => [spring.x.get(), spring.y.get()],
    bounds: { left: -250, right: 250, top: -250, bottom: 250 },
    rubberband: true,
  })
  const [activeAvocado, setActiveAvocado] = React.useState(false)

  return (
    <div className={styles.component}>
      <div className={cx(styles.avocado, activeAvocado && styles.scaredAvocado)}>
        <animated.img
          className={styles.pit}
          src={pit}
          alt=''
          style={spring}
          draggable='false'
          {...bind()}
        />
      </div>
    </div>
  )
  function handleDrag({ offset: [x, y], down, distance }) {
    api.start({
      y: down ? y : 0,
      x: down ? x : 0,
      scale: down ? 1.5 : 1,
    })
    console.log(distance)
    setActiveAvocado(distance[0] > 10 && down)
  }
}
