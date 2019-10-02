var nextURL
var api = new window.XMLHttpRequest()
var startGameBtn
var answerBtn

function testResponse () {
  console.log(JSON.parse(this.response))
}

function init () {
  startGameBtn = document.getElementById('startGameBtn')
  answerBtn = document.getElementById('answerBtn')
  nextURL = 'http://vhost3.lnu.se:20080/question/1'
  startGameBtn.addEventListener('click', startGame)
  answerBtn.addEventListener('click', submitAnswer)
  console.log('Window loaded')
}
window.addEventListener('load', init)

function startGame () {
  api.open('GET', nextURL, true)
  api.setRequestHeader('Content-Type', 'application/json')
  api.send()
  api.addEventListener('load', testResponse)
  console.log('Started game')
}

function submitAnswer () {
  console.log('Answer provided')
}
