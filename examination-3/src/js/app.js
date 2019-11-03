import { Chat } from './Chat.js'

let count = 0
let root
let chat

function init () {
  root = document.getElementById('root')
  chat = document.getElementById('chat')
  chat.addEventListener('click', clickMenu)
}

window.addEventListener('load', init)

function clickMenu (event) {
  var test = new Chat(count)
  root.insertAdjacentHTML('beforeend', test.chat)
  test.startChat()
  test.sendMessage()
  count++
}
