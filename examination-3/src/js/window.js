class Window {
  constructor (count) {
    this.count = count
  }

  createWindow () {
    const windowElement = document.createElement('div')
    const headerElement = document.createElement('div')
    const menuElement = document.createElement('div')
    const headerText = document.createElement('p')

    headerText.innerHTML = 'Header text'
    menuElement.innerHTML = 'Menu'
    windowElement.setAttribute('id', `window${this.count}`)
    windowElement.style.background = 'grey'
    windowElement.style.boxShadow = '10px 10px 10px 6px rgba(0, 0, 0, 0.75)'
    windowElement.style.width = 'fit-content'
    windowElement.style.padding = '5px'
    menuElement.style.background = 'red'
    headerElement.style.background = 'yellow'
    headerElement.setAttribute('id', `window${this.count}header`)
    windowElement.style.position = 'absolute'

    const button = document.createElement('Button')
    const text = document.createTextNode('Close')
    button.appendChild(text)
    button.setAttribute('id', `closeChat${this.count}`)
    headerElement.appendChild(button)

    windowElement.appendChild(headerElement)
    headerElement.appendChild(headerText)
    windowElement.appendChild(menuElement)

    return windowElement
  }
}

export { Window }
