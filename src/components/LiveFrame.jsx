import { forwardRef, useEffect, useRef, useState } from 'react'

// Runs a real page in an iframe at its native size (e.g. 390 x 844),
// scaled down to fit the width of its container.
const LiveFrame = forwardRef(function LiveFrame(
  { src, width = 390, height = 844, title, interactive = true, onLoad },
  iframeRef
) {
  const box = useRef(null)
  const [k, setK] = useState(1)

  useEffect(() => {
    const el = box.current
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div className="live" ref={box} style={{ height: height * k }}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        loading="lazy"
        onLoad={onLoad}
        tabIndex={interactive ? 0 : -1}
        style={{ width, height, transform: `scale(${k})`, pointerEvents: interactive ? 'auto' : 'none' }}
      />
    </div>
  )
})

export default LiveFrame
