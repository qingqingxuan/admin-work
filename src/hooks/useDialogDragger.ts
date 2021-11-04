const range = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

const listeners: { name: string; listener: (e: MouseEvent) => void }[] = []

export function drag(wrap: HTMLElement) {
  wrap.style.cursor = 'move'
  const parent = wrap.parentElement
  if (!parent) {
    return
  }
  let startX = 0
  let startY = 0
  let status = ''
  wrap.addEventListener('mousedown', (e: MouseEvent) => {
    e.preventDefault()
    status = 'down'
    range.left = -((document.documentElement.clientWidth - parent.clientWidth) / 2)
    range.right = Math.abs(range.left)
    range.top = -(document.documentElement.clientHeight - parent.clientHeight) / 2
    range.bottom = Math.abs(range.top)
    startX = e.clientX - (parseInt(parent.style.left) || 0)
    startY = e.clientY - (parseInt(parent.style.top) || 0)
    const handleMove = (e: MouseEvent) => {
      if (status !== 'down') return
      const moveX = e.clientX
      const moveY = e.clientY
      let distX = moveX - startX
      let distY = moveY - startY
      if (distX <= range.left) {
        distX = range.left
      }
      if (distX >= range.right) {
        distX = range.right
      }
      if (distY <= range.top) {
        distY = range.top
      }
      if (distY >= range.bottom) {
        distY = range.bottom
      }
      parent.style.left = distX + 'px'
      parent.style.top = distY + 'px'
    }
    const handleUp = () => {
      status = 'up'
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }
    listeners.push(
      {
        name: 'mousemove',
        listener: handleMove,
      },
      {
        name: 'mouseup',
        listener: handleUp,
      }
    )
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
    wrap.addEventListener('mouseup', () => {
      handleUp()
    })
  })
}

export function unDrag(wrap: HTMLElement) {
  listeners.forEach((it: any) => {
    wrap.removeEventListener(it.name, it.listener)
  })
  listeners.length = 0
}
