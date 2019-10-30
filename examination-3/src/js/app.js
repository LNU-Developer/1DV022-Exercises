import { Chat } from './Chat.js'
let count = 0

// const home = ``

// const routes = {
//  '/': home,
//  '/chat': chat
// }

const root = document.getElementById('root')

document.getElementById('chat').addEventListener('click', function (pathname) {
  pathname = '/chat' // temp fix

  if (pathname === '/chat') {
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname
    )

    var test = new Chat(count)
    test.startChat()
    root.insertAdjacentHTML('beforeend', test.chat)
    test.startEvents()
    test.sendMessage()
    count++
  }
})

// window.onpopstate = () => {
// root.innerHTML = routes[window.location.pathname]
// }
