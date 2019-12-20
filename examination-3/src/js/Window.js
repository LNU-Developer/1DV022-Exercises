class Window {
  constructor (count, choice) {
    this.count = count
    this.choice = choice
  }

  createWindow () {
    // Creating divs, text and adding style
    const windowElement = document.createElement('div')
    windowElement.setAttribute('id', `window${this.count}`)
    windowElement.setAttribute('class', 'windowElement')

    const headerElement = document.createElement('div')
    headerElement.setAttribute('id', `window${this.count}header`)
    headerElement.setAttribute('class', 'headerElement')
    windowElement.appendChild(headerElement)

    const menuElement = document.createElement('div')
    menuElement.innerHTML = this.menuChoice(this.choice)
    windowElement.appendChild(menuElement)

    const headerText = document.createElement('div')
    headerText.innerHTML = this.headerChoice(this.choice).alt
    headerText.setAttribute('class', 'headerText')
    headerElement.appendChild(headerText)

    // Adding app img and setting style
    const headerImg = document.createElement('img')
    headerImg.setAttribute('src', this.headerChoice(this.choice).src)
    headerImg.setAttribute('alt', this.headerChoice(this.choice).alt)
    headerElement.appendChild(headerImg)

    // Adding close img and setting style
    const closeImg = document.createElement('img')
    closeImg.setAttribute('src', 'image/baseline_close_black_18dp.png')
    closeImg.setAttribute('alt', 'Close')
    closeImg.setAttribute('id', `close${this.count}`)
    headerElement.appendChild(closeImg)

    // Adding minimize img and setting style
    const minimizeImg = document.createElement('img')
    minimizeImg.setAttribute('src', 'image/outline_remove_black_18dp.png')
    minimizeImg.setAttribute('alt', 'Minimize')
    headerElement.appendChild(minimizeImg)

    windowElement.insertAdjacentHTML('beforeend', this.rootChoice(this.choice))

    windowElement.style.top = `${(this.count * 50) % window.innerHeight}px`
    windowElement.style.left = `${(this.count * 20) % window.innerWidth}px`
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
              <p class="memoryMenu">Select game layout: 
              <select id="nrOfBricks${this.count}" tabindex="0">
              <option selected value="16">4x4</option>
              <option value="4">2x2</option>
              <option value="8">2x4</option>
              </select></p>`
    } else if (choice === 'Chat') {
      return ` <p>
      <a role="button" id="userName" class="chatMenu">Nickname</a>
      </p>`
    }
  }

  rootChoice (choice) {
    if (choice === 'Memory') {
      return `
              <div id="bricks${this.count}" class="memoryDiv"</div>
              <div id="userMessage${this.count}"></div>
              `
    } else if (choice === 'Chat') {
      return `
              <div id="chat${this.count}" class="chatDiv">
                <div id="messageArea" class="messageArea">
                  <h2>Messages</h2>
                  <p id="receivedMessages${this.count}"></p>
                </div>
                <div id="inputArea" class="inputArea">
                  <h2>Type your message</h2>
                  <p><textarea rows="2" cols="30" id="userMessage${this.count}"></textarea></p>
                  <button type="button" id="sendMessage${this.count}">Send message</button>
                </div>
              </div>
               `
    }
  }
}

export { Window }
