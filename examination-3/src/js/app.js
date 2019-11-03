import { Chat } from './Chat.js'

let count = 0
let rootDiv
let chatMenu

function init () {
  rootDiv = document.getElementById('root')
  chatMenu = document.getElementById('chat')
  chatMenu.addEventListener('click', createChat)
}

window.addEventListener('load', init)

function createChat () {
  const chat = new Chat(count)
  rootDiv.insertAdjacentHTML('beforeend', chat.chat)
  chat.startChat()
  chat.sendMessage()
  count++
}
