var nextURL
var api = new window.XMLHttpRequest()
var startGameBtn
var answerBtn

function init () {
  startGameBtn = document.getElementById('startGameBtn')
  answerBtn = document.getElementById('answerBtn')
  nextURL = 'http://vhost3.lnu.se:20080/question/1'
  startGameBtn.addEventListener('click', startGame)
  answerBtn.addEventListener('click', submitAnswer)
  console.log('Window loaded')
}
window.addEventListener('load', init)

function useApi (type, answer) {
  api.open(type, nextURL, true)
  api.setRequestHeader('Content-Type', 'application/json')
  api.responseType = 'json'
  api.send(JSON.stringify(answer))
  api.onreadystatechange = function () {
    if (api.readyState === 4 && api.status === 200) {
      nextURL = this.response.nextURL
      console.log(this.response)
      console.log(nextURL)
    }
  }
}

function startGame () {
  useApi('GET')
  console.log('Started game')
}

function submitAnswer () {
  useApi('POST', { answer: 2 })
}
