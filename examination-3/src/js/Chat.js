class Chat {
  constructor (count) {
    this.count = count
    this.chat = `
                <div id="chat${this.count}">
                <div id="nicknameArea">
                <h2>Enter your nickname</h2>
                <p><input type="text" name="name" id="nickname${this.count}" size="20"></p>
                </div>
                <div id="messageArea">
                <h2>Messages</h2>
                <span id="receivedMessages${this.count}"></span>
                </div>
                <div id="inputArea">
                <h2>Type your message</h2>
                <p><textarea rows="1" cols="50" id="userMessage${this.count}"></textarea></p>
                </div>
                <button type="button" id="sendMessage${this.count}">Send message</button>
                </div>
                `
  }

  closeChat () {
    const window = document.getElementById(`window${this.count}`)
    this.ws.close()
    window.parentNode.removeChild(window)
    this.ws.removeEventListener('message', this.listenMessage)
  }

  startChat () {
    this.ws = new window.WebSocket('ws://188.166.67.186:9080')
    document.getElementById(`closeChat${this.count}`).addEventListener('click', (event) => {
      this.closeChat()
    })

    this.listenMessage = function listenMessage (event) {
      const receivedMessages = document.getElementById(`receivedMessages${this.count}`)
      const data = JSON.parse(event.data)
      if (data.type === 'message' || data.type === 'notification') {
        receivedMessages.innerHTML += data.username + '<br>'
        receivedMessages.innerHTML += data.data + '<br><br>'
      }
    }.bind(this)
    this.ws.addEventListener('message', this.listenMessage)
  }

  sendMessage () {
    const sendMessage = document.getElementById(`sendMessage${this.count}`)
    sendMessage.addEventListener('click', function clickedButton (event) {
      const data = {
        type: 'message',
        data: document.getElementById(`userMessage${this.count}`).value,
        username: document.getElementById(`nickname${this.count}`).value,
        channel: 'channel',
        key: 'asldfkjasdlkfj'
      }
      this.ws.send(JSON.stringify(data))
      document.getElementById(`userMessage${this.count}`).value = ''
    }.bind(this))
  }
}

export {
  Chat
}
