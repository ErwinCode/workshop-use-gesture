import { useSpring, animated } from '@react-spring/web'
import { pseudoRandom } from '@kaliber/math'
import { useDrag } from '@use-gesture/react'
import styles from './App.css'

export default function App({ sticker, seed }) {
  const x = pseudoRandom(`${seed}x`)
  const y = pseudoRandom(`${seed}y`)
  const bind = useDrag(handleDrag, {})

  const [spring, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))

  return (
    <div className={styles.component} style={{ '--x': x, '--y': y }}>
      <animated.img
        className={styles.sticker}
        src={sticker}
        draggable='false'
        alt=''
        style={spring}
        {...bind()}
      />
    </div>
  )

  function handleDrag({ offset: [x, y], down }) {
    api.start({ y, x, scale: down ? 1.5 : 1 })
  }
}
