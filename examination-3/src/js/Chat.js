class Chat {
  constructor (count) {
    this.count = count
    this.channel = 'channel'
  }

  startApp () {
    this.ws = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeChat.bind(this), { once: true })
    document.getElementById(`minimize${this.count}`).addEventListener('click', this.minimizeChat.bind(this))
    document.getElementById(`changeUsernameBtn${this.count}`).addEventListener('click', this.showMenu.bind(this))
    document.getElementById(`changeChannelNameBtn${this.count}`).addEventListener('click', this.showMenu.bind(this))
    document.getElementById(`window${this.count}`).addEventListener('keydown', this.keyHandle.bind(this))
    this.ws.addEventListener('message', this.listenMessage.bind(this))
    document.getElementById(`userMessage${this.count}`).focus()
    document.getElementById(`nameSettings${this.count}`).setAttribute('class', 'invisibleSettings')
    document.getElementById(`channelSettings${this.count}`).setAttribute('class', 'invisibleSettings')

    document.getElementById(`userMessage${this.count}`).disabled = true

    const sessionStorage = window.sessionStorage.getItem('username')
    if (sessionStorage === null) {
      document.getElementById(`changeUsernameBtn${this.count}`).click()
      document.getElementById(`nickName${this.count}`).value = 'Jon Doe'
      document.getElementById(`receivedMessages${this.count}`).innerHTML += `<p class="receivedMessages">You will need to enter a username before you can continue</p>`
      document.getElementById(`receivedMessages${this.count}`).innerHTML += `<p class="receivedMessages">The Matrix ${this.getTime()}</p>`
    } else {
      this.userName = sessionStorage
      document.getElementById(`userMessage${this.count}`).disabled = false
    }
  }

  /**
   * Event handler for key strokes
   * @param {object} event - keystroke
   */

  keyHandle (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.userName = window.sessionStorage.getItem('username')
      document.getElementById(`userMessage${this.count}`).focus()
      if (document.getElementById(`userMessage${this.count}`).value !== '') {
        const username = String(this.userName)
        this.messageData = document.getElementById(`userMessage${this.count}`).value
        const data = {
          type: 'message',
          data: document.getElementById(`userMessage${this.count}`).value,
          username: username,
          channel: this.channel,
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd',
          id: 'myApp'
        }
        this.ws.send(JSON.stringify(data))
        document.getElementById(`userMessage${this.count}`).value = ''
      }
    } else if (event.keyCode === 27) {
      this.closeChat()
    }
  }

  getTime () {
    const time = new Date()
    let minutes

    if (time.getMinutes() < 10) {
      minutes = '0' + time.getMinutes()
    } else {
      minutes = time.getMinutes()
    }

    return time.getHours() + ':' + minutes
  }

  listenMessage (event) {
    this.userName = window.sessionStorage.getItem('username')
    const receivedMessages = document.getElementById(`receivedMessages${this.count}`)
    const data = JSON.parse(event.data)

    let classData

    if (data.id !== 'myApp') {
      classData = 'receivedMessages'
    } else {
      classData = 'sentMessages'
    }
    if ((data.type === 'message') && (data.username !== 'The Server' || data !== '')) {
      receivedMessages.innerHTML += `<p class=${classData}>${data.data}</p>`
      receivedMessages.innerHTML += `<p class=${classData}>${data.username} ${this.getTime()}</p>`
      document.getElementById(`messageArea${this.count}`).scrollTo(0, document.getElementById(`messageArea${this.count}`).scrollHeight)
    }
  }

  showMenu (event) {
    if (event.target.id === `changeUsernameBtn${this.count}`) {
      document.getElementById(`nickName${this.count}`).value = String(this.userName)
      document.getElementById(`nameSettings${this.count}`).setAttribute('class', 'visibleSettings')
      document.getElementById(`nameAcceptSettingsBtn${this.count}`).addEventListener('click', this.updateUsername.bind(this), { once: true })
      document.getElementById(`channelSettings${this.count}`).setAttribute('class', 'invisibleSettings')
    } else if (event.target.id === `changeChannelNameBtn${this.count}`) {
      document.getElementById(`channel${this.count}`).value = String(this.channel)
      document.getElementById(`channelSettings${this.count}`).setAttribute('class', 'visibleSettings')
      document.getElementById(`channelAcceptSettingsBtn${this.count}`).addEventListener('click', this.updateUsername.bind(this), { once: true })
      document.getElementById(`nameSettings${this.count}`).setAttribute('class', 'invisibleSettings')
    }
  }

  updateUsername (event) {
    if (event.target.id === `nameAcceptSettingsBtn${this.count}`) {
      this.userName = document.getElementById(`nickName${this.count}`).value
      document.getElementById(`nameSettings${this.count}`).setAttribute('class', 'invisibleSettings')
      window.sessionStorage.setItem('username', this.userName)
      document.getElementById(`userMessage${this.count}`).disabled = false
    } else if (event.target.id === `channelAcceptSettingsBtn${this.count}`) {
      this.channel = document.getElementById(`channel${this.count}`).value
      document.getElementById(`channelSettings${this.count}`).setAttribute('class', 'invisibleSettings')
    }
  }

  /**
   * Function to remove all eventlisteners, close socket and to remove HTML reference to created Window
   */
  closeChat () {
    const window = document.getElementById(`window${this.count}`)
    this.ws.close()
    document.getElementById(`window${this.count}`).removeEventListener('keydown', this.closeChat.bind(this))
    document.getElementById(`changeUsernameBtn${this.count}`).removeEventListener('click', this.showMenu.bind(this))
    document.getElementById(`changeChannelNameBtn${this.count}`).removeEventListener('click', this.showMenu.bind(this))
    document.getElementById(`minimize${this.count}`).removeEventListener('click', this.minimizeChat.bind(this))
    this.ws.removeEventListener('message', this.listenMessage.bind(this))
    window.parentNode.removeChild(window)
  }

  /**
   * Function to minimize created Window
   */
  minimizeChat () {
    const a = document.createElement('a')
    a.setAttribute('href', '#')
    a.setAttribute('id', `${this.count}`)
    a.innerHTML = `Chat`
    document.getElementById('minimizedWindows').appendChild(a)
    document.getElementById(`window${this.count}`).classList.toggle('hide')
  }
}

export {
  Chat
}
