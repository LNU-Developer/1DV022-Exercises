import { Chat } from './Chat.js'
import { Window } from './window.js'
import { Memory } from './Memory.js'

let count = 0
let rootDiv
let zIndex = 0

function init () {
  rootDiv = document.getElementById('root')
  document.getElementById('chat').addEventListener('click', createChat)
  document.getElementById('memory').addEventListener('click', createMemory)
  document.getElementById('ownApp').addEventListener('click', createOwnApp)
}

window.addEventListener('load', init)

function createChat () {
  const window = new Window(count, 'Chat')
  const newWindow = window.createWindow()
  const chat = new Chat(count)
  rootDiv.appendChild(newWindow)
  newWindow.insertAdjacentHTML('beforeend', chat.chat)
  dragElement(newWindow)
  chat.startChat()
  chat.sendMessage()
  count++
}

function createMemory () {
  const window = new Window(count, 'Memory')
  const newWindow = window.createWindow()
  const memory = new Memory(count)
  rootDiv.appendChild(newWindow)
  newWindow.insertAdjacentHTML('beforeend', memory.memory)
  dragElement(newWindow)
  memory.startGame()
  count++
}

function createOwnApp () {
  console.log('Load ownApp')
}

function dragElement (elmnt) {
  var pos1 = 0
  var pos2 = 0
  var pos3 = 0
  var pos4 = 0
  if (document.getElementById((elmnt.id + 'header'))) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown
  }

  function dragMouseDown (e) {
    // Set focus when clicked, as well as make all other elements see through

    for (let i = 0; i < count; i++) {
      document.getElementById('window' + i).style.opacity = '0.8'
    }
    document.getElementById(elmnt.id).style.zIndex = zIndex++
    document.getElementById(elmnt.id).style.opacity = '1'

    e = e || window.event
    e.preventDefault()

    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmouseleave = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag (e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
    elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
  }

  function closeDragElement () {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null

    // Make all elements visible when mousebutton is released

    for (let i = 0; i < count; i++) {
      document.getElementById('window' + i).style.opacity = '1'
    }
  }
}
