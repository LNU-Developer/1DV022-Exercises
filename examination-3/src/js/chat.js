
const ws = new window.WebSocket('ws://188.166.67.186:9080')

ws.addEventListener('message', event => {
  const receivedMessages = document.getElementById('receivedMessages')
  const data = JSON.parse(event.data)
  if (data.type === 'message') {
    receivedMessages.innerHTML += data.username + '<br>'
    receivedMessages.innerHTML += data.data + '<br><br>'
  }
})

document.addEventListener('click', function (event) {
  if (event.target.id && event.target.id === 'sendMessage') {
    const data = {
      type: 'message',
      data: document.getElementById('userMessage').value,
      username: document.getElementById('nickname').value,
      channel: 'channel',
      key: 'asldfkjasdlkfj'
    }
    ws.send(JSON.stringify(data))
    document.getElementById('userMessage').value = ''
  }
})
