var nickname
var userMessage
var receivedMessages

function init () {
  nickname = document.getElementById('nickname')
  userMessage = document.getElementById('userMessage')
  receivedMessages = document.getElementById('receivedMessages')
}
window.addEventListener('load', init)

const ws = new window.WebSocket('ws://188.166.67.186:9080')

ws.addEventListener('open', event => {
  receivedMessages.innerHTML += 'Welcome! Please type something to start a conversation. Remember the channels are monitored and abuse will not be allowed' + '<br><br>'
})

ws.addEventListener('message', event => {
  const data = JSON.parse(event.data)
  if (data.username !== 'The Server') {
    receivedMessages.innerHTML += data.username + '<br>'
    receivedMessages.innerHTML += data.data + '<br><br>'
  }
})

document.getElementById('sendMessage').addEventListener('click', event => {
  const data = {
    type: 'message',
    data: userMessage.value,
    username: nickname.value,
    channel: 'channel',
    key: 'asldfkjasdlkfj' }
  ws.send(JSON.stringify(data))
  userMessage.value = ''
})
