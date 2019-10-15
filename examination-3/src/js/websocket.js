const ws = new window.WebSocket('ws://188.166.67.186:9080')
ws.addEventListener('open', event => {
  console.log(ws.readyState)
})
ws.addEventListener('message', event => {
  console.log(event.data)
})
document.getElementById('sendMessage').addEventListener('click', event => {
  const data = {
    type: 'message',
    data: 'The message text is sent using the data property',
    username: 'MyFancyUsername',
    channel: 'my, not so secret, channel',
    key: 'asldfkjasdlkfj' }
  ws.send(JSON.stringify(data))
})
