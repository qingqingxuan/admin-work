export function useMenuWidth() {
  const r = document.querySelector(':root') as HTMLElement
  const styles = getComputedStyle(r)
  const menuWith = styles.getPropertyValue('--menu-width')
  return parseInt(menuWith)
}

export function useChangeMenuWidth(width: Number) {
  const r = document.querySelector(':root') as HTMLElement
  r.style.setProperty('--menu-width', width + 'px')
}
