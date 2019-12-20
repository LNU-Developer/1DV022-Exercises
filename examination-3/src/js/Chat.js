class Chat {
  constructor (count) {
    this.count = count
  }

  startChat () {
    this.ws = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeChat.bind(this))
    document.getElementById(`sendMessage${this.count}`).addEventListener('click', this.sendMessage.bind(this))
    document.getElementById('userName').addEventListener('click', this.changeUsername.bind(this))
    this.ws.addEventListener('message', this.listenMessage.bind(this))
    document.getElementById(`userMessage${this.count}`).focus()
  }

  sendMessage () {
    document.getElementById(`userMessage${this.count}`).focus()
    if (document.getElementById(`userMessage${this.count}`).value !== '') {
      const username = String(this.userName)
      this.messageData = document.getElementById(`userMessage${this.count}`).value
      const data = {
        type: 'message',
        data: document.getElementById(`userMessage${this.count}`).value,
        username: username,
        channel: 'channel',
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd',
        id: 'myApp'
      }
      this.ws.send(JSON.stringify(data))
      document.getElementById(`userMessage${this.count}`).value = ''
    }
  }

  listenMessage (event) {
    const receivedMessages = document.getElementById(`receivedMessages${this.count}`)
    const time = new Date()
    const data = JSON.parse(event.data)

    let classData

    if (data.id !== 'myApp') {
      classData = 'receivedMessages'
    } else {
      classData = 'sentMessages'
    }
    if ((data.type === 'message' || data.type === 'notification') && data.username !== 'The Server') {
      receivedMessages.innerHTML += `<p class=${classData}>${data.data}</p>`
      receivedMessages.innerHTML += `<p class=${classData}>${data.username} ${time.getHours()}:${time.getMinutes()}</p>`
      document.getElementById(`messageArea${this.count}`).scrollTo(0, document.getElementById(`messageArea${this.count}`).scrollHeight)
    }
  }

  changeUsername () {
    while (this.userName === null || this.userName === '' || this.userName === undefined) {
      this.userName = window.prompt('Please enter your nickname')
    }
  }

  closeChat () {
    const window = document.getElementById(`window${this.count}`)
    this.ws.close()
    document.getElementById(`close${this.count}`).removeEventListener('click', this.closeChat.bind(this))
    document.getElementById(`sendMessage${this.count}`).removeEventListener('click', this.sendMessage.bind(this))
    document.getElementById('userName').removeEventListener('click', this.changeUsername)
    this.ws.removeEventListener('message', this.listenMessage.bind(this))
    window.parentNode.removeChild(window)
  }
}

export {
  Chat
}
