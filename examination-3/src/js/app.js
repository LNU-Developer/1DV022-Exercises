/**
 * Imports different modules to my application
 */
import { Chat } from './Chat.js'
import { Window } from './Window.js'
import { Memory } from './Memory.js'
import { Github } from './Github.js'

/**
 * Different variables to be used in the application
 */
let count = 0
let rootDiv
let zIndex = 0
let clickCount = 0
const timeout = 500

/**
 * Initiates when DOM has loaded
 */
function init () {
  rootDiv = document.getElementById('root')
  document.getElementById('Chat').children[0].addEventListener('click', createApp)
  document.getElementById('Memory').children[0].addEventListener('click', createApp)
  document.getElementById('Github').children[0].addEventListener('click', createApp)
  document.getElementById('minimizedWindows').addEventListener('click', hideWindows)
}

window.addEventListener('load', init, { once: true })

/**
 * Creates an application based on what was clicked
 * @param {object} event - adds the click event as a parameter
 */
function createApp (event) {
  clickCount++
  if (clickCount === 1) {
    setTimeout(function () {
      if (clickCount === 1) {
        let app
        const windowObj = new Window(count, String(event.target.parentNode.id), zIndex)
        const newWindow = windowObj.createWindow()
        rootDiv.appendChild(newWindow)
        dragElement(newWindow)
        if (event.target.parentNode.id === 'Chat') {
          app = new Chat(count)
        } else if (event.target.parentNode.id === 'Memory') {
          app = new Memory(count)
        } else if (event.target.parentNode.id === 'Github') {
          app = new Github(count)
        }
        app.startApp()
        count++
      } else {
        document.getElementById('minimizedWindows').classList.toggle('show')
      }
      clickCount = 0
    }, timeout || 300)
  }
}

/**
 * Function to hide windows when the minimize button is clicked
 * @param {object} event - adds the click event as a parameter
 */
function hideWindows (event) {
  document.getElementById('window' + event.target.id).classList.toggle('hide')
  const window = document.getElementById(event.target.id)
  window.parentNode.removeChild(window)
}

/**
 * Function to make an element dragable and to handle zIndex
 * @param {element} elmnt - the element to be made draggable
 */
function dragElement (elmnt) {
  var pos1 = 0
  var pos2 = 0
  var pos3 = 0
  var pos4 = 0

  document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
  elmnt.onmousedown = indexUpdate

  /**
 * Updates zIndex on click
 */
  function indexUpdate () {
    document.getElementById(elmnt.id).style.zIndex = zIndex++
  }

  /**
 * Function to call mouse events and to uppdate zindex
 * @param {oject} e - the mousedown event
 */
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

  /**
 * Function to handle dragging
 * @param {oject} e - the mousedown event
 */
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

  /**
 * Function to handle mouseup and mouse leave event
 */
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
