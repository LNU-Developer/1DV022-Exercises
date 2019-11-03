function createWindow () {
  const windowElement = document.createElement('div')
  const headerElement = document.createElement('div')
  const menuElement = document.createElement('div')

  windowElement.setAttribute('style', 'background: #002418;')
  windowElement.appendChild(headerElement)
  windowElement.appendChild(menuElement)
  return windowElement
}
export { createWindow }
