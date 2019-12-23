import { Chat } from './Chat.js'
import { Window } from './Window.js'
import { Memory } from './Memory.js'
import { RSS } from './Rss.js'

let count = 0
let rootDiv
let zIndex = 0

function init () {
  rootDiv = document.getElementById('root')
  document.getElementById('chat').addEventListener('click', createChat)
  document.getElementById('memory').addEventListener('click', createMemory)
  document.getElementById('ownApp').addEventListener('click', createRSS)
}

window.addEventListener('load', init, { once: true })

function createChat () {
  const windowObj = new Window(count, 'Chat', zIndex)
  const newWindow = windowObj.createWindow()
  const chat = new Chat(count)
  rootDiv.appendChild(newWindow)
  dragElement(newWindow)
  chat.startChat()
  count++
}

function createMemory () {
  const windowObj = new Window(count, 'Memory', zIndex)
  const newWindow = windowObj.createWindow()
  const memory = new Memory(count)
  rootDiv.appendChild(newWindow)
  dragElement(newWindow)
  memory.startGame()
  count++
}

function createRSS () {
  const windowObj = new Window(count, 'RSS', zIndex)
  const newWindow = windowObj.createWindow()
  const rss = new RSS(count)
  rootDiv.appendChild(newWindow)
  dragElement(newWindow)
  rss.startRSS()
  count++
}

function dragElement (elmnt) {
  var pos1 = 0
  var pos2 = 0
  var pos3 = 0
  var pos4 = 0

  document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
  elmnt.onmousedown = indexUpdate

  function indexUpdate () {
    document.getElementById(elmnt.id).style.zIndex = zIndex++
  }

  function dragMouseDown (e) {
    document.getElementById(elmnt.id).style.zIndex = zIndex++
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
    // Set focus when clicked, as well as make all other elements see through
    for (let i = 0; i < count; i++) {
      if (document.getElementById('window' + i) !== null) {
        document.getElementById('window' + i).style.opacity = '0.8'
      }
    }

    document.getElementById(elmnt.id).style.opacity = '1'

    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    if (elmnt.offsetLeft - pos1 >= 0 && elmnt.offsetLeft >= 0 && window.innerWidth - elmnt.getBoundingClientRect().width - elmnt.offsetLeft >= 0 && elmnt.offsetLeft - pos1 <= window.innerWidth - elmnt.getBoundingClientRect().width) {
      elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
    } else if (elmnt.offsetLeft <= 100 && elmnt.offsetLeft - pos1 <= 100) { // Fixing bug by snapping in place if is close to border
      elmnt.style.left = '0px'
    } else if (window.innerWidth - elmnt.getBoundingClientRect().width - elmnt.offsetLeft <= 100 && elmnt.offsetLeft - pos1 >= window.innerWidth - elmnt.getBoundingClientRect().width - 100) { // Fixing bug by snapping in place if is close to border
      elmnt.style.left = window.innerWidth - elmnt.getBoundingClientRect().width - 1 + 'px'
    }

    if (elmnt.offsetTop - pos2 >= 0 && elmnt.offsetTop >= 0 && window.innerHeight - elmnt.getBoundingClientRect().height - elmnt.offsetTop >= 0 && elmnt.offsetTop - pos2 <= window.innerHeight - elmnt.getBoundingClientRect().height) {
      elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
    } else if (elmnt.offsetTop <= 100 && elmnt.offsetTop - pos2 <= 100) { // Fixing bug by snapping in place if is close to border
      elmnt.style.top = '0px'
    } else if (window.innerHeight - elmnt.getBoundingClientRect().height - elmnt.offsetTop <= 100 && elmnt.offsetTop - pos2 >= window.innerHeight - elmnt.getBoundingClientRect().height) { // Fixing bug by snapping in place if is close to border
      elmnt.style.top = window.innerHeight - elmnt.getBoundingClientRect().height - 1 + 'px'
    }
  }

  function closeDragElement () {
    // stop moving when mouse button is released:
    document.onmouseup = null
    document.onmousemove = null

    // Make all elements visible when mousebutton is released

    for (let i = 0; i < count; i++) {
      if (document.getElementById('window' + i) !== null) {
        document.getElementById('window' + i).style.opacity = '1'
      }
    }
  }
}
