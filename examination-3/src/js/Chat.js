class Chat {
  constructor (count) {
    this.count = count
    this.chat = `
                <div id="chat${this.count}" style="padding: 8px;">
                <div id="messageArea">
                <h2>Messages</h2>
                <span id="receivedMessages${this.count}"></span>
                </div>
                <div id="inputArea">
                <h2>Type your message</h2>
                <p><textarea rows="5" cols="50" style="resize: none;" id="userMessage${this.count}"></textarea></p>
                </div>
                <button type="button" id="sendMessage${this.count}">Send message</button>
                </div>
               `
  }

  startChat () {
    this.ws = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeChat.bind(this))
    document.getElementById(`sendMessage${this.count}`).addEventListener('click', this.sendMessage.bind(this))
    document.getElementById('userName').addEventListener('click', this.changeUsername.bind(this))
    this.ws.addEventListener('message', this.listenMessage.bind(this))
  }

  sendMessage () {
    const username = String(this.userName)
    const data = {
      type: 'message',
      data: document.getElementById(`userMessage${this.count}`).value,
      username: username,
      channel: 'channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.ws.send(JSON.stringify(data))
    document.getElementById(`userMessage${this.count}`).value = ''
  }

  listenMessage (event) {
    const receivedMessages = document.getElementById(`receivedMessages${this.count}`)
    const data = JSON.parse(event.data)
    if (data.type === 'message' || data.type === 'notification') {
      receivedMessages.innerHTML += data.username + '<br>'
      receivedMessages.innerHTML += data.data + '<br><br>'
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
