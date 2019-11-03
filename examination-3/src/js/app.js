import { Chat } from './Chat.js'

let count = 0
let rootDiv

function init () {
  rootDiv = document.getElementById('root')
  document.getElementById('chat').addEventListener('click', createChat)
  document.getElementById('memory').addEventListener('click', createMemory)
  document.getElementById('ownApp').addEventListener('click', createOwnApp)
}

window.addEventListener('load', init)

function createChat () {
  const chat = new Chat(count)
  rootDiv.insertAdjacentHTML('beforeend', chat.chat)
  chat.startChat()
  chat.sendMessage()
  count++
}

function createMemory () {
  console.log('Load memory')
}

function createOwnApp () {
  console.log('Load ownApp')
}
