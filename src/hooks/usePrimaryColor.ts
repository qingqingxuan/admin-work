export default function (color: string) {
  const el = document.body as HTMLElement
  const tempColors = color.split('#')[1]
  const r = parseInt('0x' + tempColors.slice(0, 2))
  const g = parseInt('0x' + tempColors.slice(2, 4))
  const b = parseInt('0x' + tempColors.slice(4, 6))
  for (let i = 1; i <= 9; i++) {
    el.style.setProperty('--primary-' + i, `${r}, ${g}, ${b}`)
  }
}
