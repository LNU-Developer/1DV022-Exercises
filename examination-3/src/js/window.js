function createWindow () {
  const windowElement = document.createElement('div')
  const headerElement = document.createElement('div')
  const menuElement = document.createElement('div')
  const headerText = document.createElement('p')

  headerText.innerHTML = 'Header text'

  menuElement.innerHTML = 'Menu'

  windowElement.style.background = 'white'
  windowElement.style.width = 'fit-content'
  windowElement.style.padding = '5px'

  menuElement.style.background = 'red'
  headerElement.style.background = 'yellow'

  windowElement.appendChild(headerElement)
  headerElement.appendChild(headerText)
  windowElement.appendChild(menuElement)
  return windowElement
}
export { createWindow }