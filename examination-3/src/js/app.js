
var chat = `
  <div id="nicknameArea">
  <h2>Enter your nickname</h2>
  <p><input type="text" name="name" id="nickname" size="20"></p>
  </div>
  <div id="messageArea">
  <h2>Messages</h2>
  <span id="receivedMessages"></span>
  </div>
  <div id="inputArea">
  <h2>Type your message</h2>
  <p><textarea rows="1" cols="50" id="userMessage"></textarea></p>
  </div>
  <button type="button" id="sendMessage">Send message</button>
  `
var home = ``

const routes = {
  '/': home,
  '/chat': chat
}

const root = document.getElementById('root')
root.innerHTML = routes[window.location.pathname]

document.getElementById('chat').addEventListener('click', function (pathname) {
  pathname = '/chat' // temp fix
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  root.innerHTML = routes[pathname]
})

window.onpopstate = () => {
  root.innerHTML = routes[window.location.pathname]
}
