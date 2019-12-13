class Window {
  constructor (count, choice) {
    this.count = count
    this.choice = choice
  }

  createWindow () {
    const windowElement = document.createElement('div')
    const headerElement = document.createElement('div')
    const menuElement = document.createElement('div')
    const headerText = document.createElement('div')

    const headerImg = document.createElement('img')
    headerImg.setAttribute('src', this.headerChoice(this.choice).src)
    headerImg.setAttribute('alt', this.headerChoice(this.choice).alt)
    headerImg.setAttribute('float', 'left')
    headerImg.setAttribute('width', '25px')
    headerImg.setAttribute('height', '25px')
    headerElement.appendChild(headerImg)

    headerText.innerHTML = this.headerChoice(this.choice).alt
    headerText.style.display = 'inline'
    headerText.style.lineHeight = '27px'
    headerText.style.verticalAlign = 'top'
    headerElement.style.borderColor = 'orange'
    headerElement.style.background = 'orange'
    headerElement.style.borderWidth = 'medium'
    headerElement.style.borderStyle = 'outset'
    headerElement.style.cursor = 'default'

    const closeImg = document.createElement('img')
    closeImg.setAttribute('src', 'image/baseline_close_black_18dp.png')
    closeImg.setAttribute('alt', 'Close')
    closeImg.setAttribute('id', `close${this.count}`)
    closeImg.setAttribute('style', `float: right`)

    headerElement.appendChild(closeImg)

    const minimizeImg = document.createElement('img')
    minimizeImg.setAttribute('src', 'image/outline_remove_black_18dp.png')
    minimizeImg.setAttribute('alt', 'Minimize')
    minimizeImg.setAttribute('style', `float: right`)
    headerElement.appendChild(minimizeImg)

    menuElement.innerHTML = this.menuChoice(this.choice)

    windowElement.setAttribute('id', `window${this.count}`)
    windowElement.style.background = 'lightgrey'
    windowElement.style.boxShadow = '10px 10px 10px 6px rgba(0, 0, 0, 0.75)'
    windowElement.style.padding = '5px'
    menuElement.style.background = 'grey'
    headerElement.setAttribute('id', `window${this.count}header`)
    windowElement.style.position = 'absolute'

    windowElement.appendChild(headerElement)
    headerElement.appendChild(headerText)
    windowElement.appendChild(menuElement)

    return windowElement
  }

  headerChoice (choice) {
    if (choice === 'Memory') {
      return { src: 'image/baseline_layers_black_18dp2.png', alt: 'Memory' }
    } else if (choice === 'Chat') {
      return { src: 'image/baseline_chat_black_18dp2.png', alt: 'Chat' }
    }
  }

  menuChoice (choice) {
    if (choice === 'Memory') {
      return `
              <p>Select game layout: 
              <select id="nrOfBricks${this.count}">
              <option selected value="16">4x4</option>
              <option value="4">2x2</option>
              <option value="8">2x4</option>
              </select></p>`
    } else if (choice === 'Chat') {
      return ` <p>
      <a role="button" id="userName">Nickname</a>
      </p>`
    }
  }
}

export { Window }
