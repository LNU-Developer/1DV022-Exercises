/**
 * Creates an instance of a Chat app
 * * @param {number} count - The unique instance number that will populate all IDs
 * @constructor
 */

class Chat {
  constructor (count) {
    this.count = count
    this.currentChannel = 'channel'
    this.channels = []
    this.savedMessages = []
    this.userName = ''
  }

  /**
  * Function to handle initial start and adding eventlisteners. If no username exists it will block the user from typing messages.
  */
  startApp () {
    this.ws = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeChat.bind(this), { once: true })
    document.getElementById(`minimize${this.count}`).addEventListener('click', this.minimizeChat.bind(this))
    document.getElementById(`userMessage${this.count}`).addEventListener('keydown', this.sendMessage.bind(this))
    document.getElementById(`userMessage${this.count}`).addEventListener('input', this.emojiChecker.bind(this))
    document.getElementById(`channel${this.count}`).addEventListener('keydown', this.createChannel.bind(this))
    document.getElementById(`channels${this.count}`).addEventListener('click', this.changeChannel.bind(this))
    document.getElementById(`nickName${this.count}`).addEventListener('keydown', this.updateUsername.bind(this))
    this.ws.addEventListener('message', this.listenMessage.bind(this))
    document.getElementById(`userMessage${this.count}`).focus()
    document.getElementById(`userMessage${this.count}`).disabled = true
    document.getElementById(`channel${this.count}`).disabled = true

    const sessionStorage = JSON.parse(window.sessionStorage.getItem('data'))
    if (sessionStorage === null) {
      document.getElementById(`defaultChannel${this.count}`).click()
      document.getElementById(`receivedMessages${this.count}`).innerHTML += `<p class="receivedMessages">You will need to enter a username before you can continue</p>`
      document.getElementById(`receivedMessages${this.count}`).innerHTML += `<p class="receivedMessages">The Matrix ${this.getTime()}</p>`
      document.getElementById(`nickName${this.count}`).focus()
    } else {
      this.userName = String(sessionStorage[0])
      document.getElementById(`nickName${this.count}`).value = String(this.userName)
      this.savedMessages = sessionStorage[1]
      this.channels = sessionStorage[2]
      this.channels.forEach(element => { this.addChannel(element) })
      document.getElementById(`userMessage${this.count}`).disabled = false
      document.getElementById(`channel${this.count}`).disabled = false
      document.getElementById(`defaultChannel${this.count}`).click()
    }
  }

  /**
   * Method to add channels to html
   * @param {string} channel - The name of the channel
   */
  addChannel (channel) {
    const a = document.createElement('a')
    const p = document.createElement('p')
    a.setAttribute('href', '#')
    a.setAttribute('id', `${channel}${this.count}`)
    a.innerHTML = `#${channel}`
    p.appendChild(a)
    document.getElementById(`channels${this.count}`).appendChild(p)
  }

  /**
   * Method to add channel to channels list and to change focus to this channel
   * @param {string} channel - The name of the channel
   */
  createChannel (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      document.getElementById(`userMessage${this.count}`).focus()
      this.currentChannel = `${document.getElementById(`channel${this.count}`).value}`
      this.dataStorage()
      if ((!this.channels.includes(this.currentChannel)) && (this.currentChannel !== 'channel')) {
        this.channels.push(this.currentChannel)
        this.addChannel(this.currentChannel)
      }
      document.getElementById(`channel${this.count}`).value = ''
      document.getElementById(this.currentChannel + this.count).click()
    } else if (event.keyCode === 27) {
      this.closeChat()
    }
  }

  /**
   * Method to change which channel to populate and show messages for
   * @param {string} channel - The name of the channel to be populated
   */
  changeChannel (event) {
    if (event.target.tagName === 'A') {
      document.getElementById(`userMessage${this.count}`).focus()
      this.currentChannel = event.target.textContent.substr(1)
      this.messageCache(this.currentChannel)

      this.channels.forEach(element => {
        document.getElementById(element + this.count).parentNode.classList.remove('activeChannelsDiv')
      })
      document.getElementById(`defaultChannel${this.count}`).parentNode.classList.remove('activeChannelsDiv')

      const active = document.getElementById(event.target.id).parentNode
      active.setAttribute('class', 'activeChannelsDiv')
    }
  }

  /**
   * Method to populate channel with cached old messages
   * @param {string} channel - The name of the channel to be populated
   */
  messageCache (channel) {
    if (channel) {
      const receivedMessages = document.getElementById(`receivedMessages${this.count}`)
      receivedMessages.innerHTML = ``
      this.savedMessages.forEach(element => {
        if (element.channel === channel) {
          receivedMessages.innerHTML += `<p class=${element.CSS}>${element.message}</p>`
          receivedMessages.innerHTML += `<p class=${element.CSS}>${element.name} ${element.time}</p>`
        }
      })
      document.getElementById(`messageArea${this.count}`).scrollTo(0, document.getElementById(`messageArea${this.count}`).scrollHeight)
    }
  }

  /**
   * Method to store available data in local storage
   */
  dataStorage () {
    const array = []
    array.push(String(this.userName))
    array.push(this.savedMessages)
    array.push(this.channels)
    window.sessionStorage.setItem('data', JSON.stringify(array))
    console.log(array)
  }

  /**
   * Event handler for key strokes. If enter is selected the message is sent, and if esc is selected it will close the application
   * @param {object} event - keystroke
   */
  sendMessage (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      document.getElementById(`userMessage${this.count}`).focus()
      if (document.getElementById(`userMessage${this.count}`).value !== '') {
        const data = {
          type: 'message',
          data: document.getElementById(`userMessage${this.count}`).value,
          username: String(this.userName),
          channel: String(this.currentChannel),
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

  /**
   * Event handler for changes in input fields. Checks if a emoji shortcut has been entered and changes the value to the actual Emoji
   * @param {object} event - keystroke
   */
  emojiChecker (event) {
    let string = event.target.value
    const emojis = [
      { text: '-<@%', code: '\u{1F41D}' }, { text: '(|)', code: '\u{1F435}' }, { text: '(:)', code: '\u{1F437}' }, { text: ']:{', code: '\u{1F473}' },
      { text: '</3', code: '\u{1F494}' }, { text: '<3', code: '\u{1F49C}' }, { text: '~@~', code: '\u{1F4A9}' }, { text: ':-D', code: '\u{1F600}' },
      { text: ':D', code: '\u{1F600}' }, { text: '^_^', code: '\u{1F601}' }, { text: ':)', code: '\u{1F603}' }, { text: ':-)', code: '\u{1F603}' },
      { text: '=)', code: '\u{1F603}' }, { text: '=D', code: '\u{1F604}' }, { text: '^_;^', code: '\u{1F605}' }, { text: '}:)', code: '\u{1F608}' },
      { text: '}:-)', code: '\u{1F608}' }, { text: '}=)', code: '\u{1F608}' }, { text: ';-)', code: '\u{1F609}' }, { text: ';)', code: '\u{1F609}' },
      { text: 'B)', code: '\u{1F60E}' }, { text: 'B-)', code: '\u{1F60E}' }, { text: ':-|', code: '\u{1F610}' }, { text: ':|', code: '\u{1F610}' },
      { text: '=|', code: '\u{1F610}' }, { text: '-_-', code: '\u{1F611}' }, { text: 'o_o', code: '\u{1F613}' }, { text: 'u_u', code: '\u{1F614}' },
      { text: ':/', code: '\u{1F615}' }, { text: ':-/', code: '\u{1F615}' }, { text: '=/', code: '\u{1F615}' }, { text: ':S', code: '\u{1F616}' },
      { text: ':-S', code: '\u{1F616}' }, { text: ':s', code: '\u{1F616}' }, { text: ':-s', code: '\u{1F616}' }, { text: ':*', code: '\u{1F617}' },
      { text: ':-*', code: '\u{1F617}' }, { text: ';*', code: '\u{1F618}' }, { text: ';-*', code: '\u{1F618}' }, { text: ':P', code: '\u{1F61B}' },
      { text: ':-P', code: '\u{1F61B}' }, { text: '=P', code: '\u{1F61B}' }, { text: ':p', code: '\u{1F61B}' }, { text: ':-p', code: '\u{1F61B}' },
      { text: '=p', code: '\u{1F61B}' }, { text: ';P', code: '\u{1F61C}' }, { text: ';p', code: '\u{1F61C}' }, { text: ';-p', code: '\u{1F61C}' },
      { text: ';-P', code: '\u{1F61C}' }, { text: ':(', code: '\u{1F61E}' }, { text: ':-(', code: '\u{1F61E}' }, { text: '=(', code: '\u{1F61E}' },
      { text: '>.<', code: '\u{1F621}' }, { text: '>:(', code: '\u{1F621}' }, { text: '>:-(', code: '\u{1F621}' }, { text: '>=(', code: '\u{1F621}' },
      { text: 'T_T', code: '\u{1F622}' }, { text: `:'(`, code: '\u{1F622}' }, { text: ';_;', code: '\u{1F622}' }, { text: `='(`, code: '\u{1F622}' },
      { text: `>_<`, code: '\u{1F623}' }, { text: `D:`, code: '\u{1F626}' }, { text: `o.o`, code: '\u{1F62E}' }, { text: `:o`, code: '\u{1F62E}' },
      { text: `:-o`, code: '\u{1F62E}' }, { text: '=o', code: '\u{1F62E}' }, { text: 'O.O', code: '\u{1F632}' }, { text: ':O', code: '\u{1F632}' },
      { text: ':-O', code: '\u{1F632}' }, { text: '=O', code: '\u{1F632}' }, { text: 'x_x', code: '\u{1F635}' }, { text: 'X-O', code: '\u{1F635}' },
      { text: 'X-o', code: '\u{1F635}' }, { text: 'X(', code: '\u{1F635}' }, { text: 'X-(', code: '\u{1F635}' }, { text: ':X)', code: '\u{1F638}' },
      { text: ':3', code: '\u{1F638}' }, { text: '(=^..^=)', code: '\u{1F638}' }, { text: '(=^.^=)', code: '\u{1F638}' }, { text: '=^_^=', code: '\u{1F638}' }
    ]

    emojis.forEach(element => {
      if (string.includes(element.text)) {
        string = string.replace(element.text, element.code)
      }
      document.getElementById(`userMessage${this.count}`).value = string
    })
  }

  /**
   * Method to get and return the actual time
   * @returns {string} returns the time
   */
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

  /**
   * Event handler for listening on messages. Will parse messages when received
   * @param {object} event - messages
   */
  listenMessage (event) {
    const sessionStorage = JSON.parse(window.sessionStorage.getItem('data'))
    const data = JSON.parse(event.data)
    let classData

    if (data.id !== 'myApp') {
      classData = 'receivedMessages'
    } else {
      classData = 'sentMessages'
    }
    if ((data.type === 'message') && (data.username !== 'The Server' || data !== '')) {
      const receivedMessages = document.getElementById(`receivedMessages${this.count}`)
      this.savedMessages.push({ name: data.username, message: data.data, time: this.getTime(), channel: data.channel, CSS: classData })
      const length = this.savedMessages.length - 1
      if (data.channel === this.currentChannel) {
        receivedMessages.innerHTML += `<p class=${this.savedMessages[length].CSS}>${this.savedMessages[length].message}</p>`
        receivedMessages.innerHTML += `<p class=${this.savedMessages[length].CSS}>${this.savedMessages[length].name} ${this.savedMessages[length].time}</p>`
        document.getElementById(`messageArea${this.count}`).scrollTo(0, document.getElementById(`messageArea${this.count}`).scrollHeight)
      }
      if (sessionStorage !== null && sessionStorage[0] !== '') {
        this.userName = String(sessionStorage[0])
        document.getElementById(`nickName${this.count}`).value = String(this.userName)
        document.getElementById(`userMessage${this.count}`).disabled = false
        document.getElementById(`channel${this.count}`).disabled = false
        this.dataStorage()
      }
    }
  }

  /**
   * Event handler for accepting menu option change.
   * @param {object} event - clicked object
   */
  updateUsername (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      if (document.getElementById(`nickName${this.count}`).value !== '') {
        this.userName = document.getElementById(`nickName${this.count}`).value
        this.dataStorage()
        document.getElementById(`userMessage${this.count}`).disabled = false
        document.getElementById(`channel${this.count}`).disabled = false
        document.getElementById(`userMessage${this.count}`).focus()
      } else {
        document.getElementById(`receivedMessages${this.count}`).innerHTML += `<p class="receivedMessages">You will need to enter a username before you can continue</p>`
        document.getElementById(`receivedMessages${this.count}`).innerHTML += `<p class="receivedMessages">The Matrix ${this.getTime()}</p>`
        document.getElementById(`nickName${this.count}`).focus()
        document.getElementById(`messageArea${this.count}`).scrollTo(0, document.getElementById(`messageArea${this.count}`).scrollHeight)
      }
    } else if (event.keyCode === 27) {
      this.closeChat()
    }
  }

  /**
   * Function to remove all eventlisteners, close socket and to remove HTML reference to created Window
   */
  closeChat () {
    const window = document.getElementById(`window${this.count}`)
    this.ws.close()
    document.getElementById(`close${this.count}`).removeEventListener('click', this.closeChat.bind(this), { once: true })
    document.getElementById(`minimize${this.count}`).removeEventListener('click', this.minimizeChat.bind(this))
    document.getElementById(`userMessage${this.count}`).removeEventListener('keydown', this.sendMessage.bind(this))
    document.getElementById(`userMessage${this.count}`).removeEventListener('input', this.emojiChecker.bind(this))
    document.getElementById(`channel${this.count}`).removeEventListener('keydown', this.createChannel.bind(this))
    document.getElementById(`channels${this.count}`).removeEventListener('click', this.changeChannel.bind(this))
    document.getElementById(`nickName${this.count}`).removeEventListener('keydown', this.updateUsername.bind(this))
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

/**
   * Exporting module
   */
export {
  Chat
}
