var nextURL
var startGameBtn
var answerBtn
var questionId
var questionMessage
// var questionArea
var apiResponse
function init () {
  // questionArea = document.getElementById('questionArea')
  questionId = document.getElementById('questionId')
  questionMessage = document.getElementById('questionMessage')
  startGameBtn = document.getElementById('startGameBtn')
  answerBtn = document.getElementById('answerBtn')
  nextURL = 'http://vhost3.lnu.se:20080/question/1'
  startGameBtn.addEventListener('click', startGame)
  answerBtn.addEventListener('click', submitAnswer)
  console.log('Window loaded')
}
window.addEventListener('load', init)

function useApi (type, answer) {
  var api = new window.XMLHttpRequest()

  api.addEventListener('load', apiData)
  api.open(type, nextURL, true)
  api.setRequestHeader('Content-Type', 'application/json')
  api.responseType = 'json'
  api.send(JSON.stringify(answer))
}

function apiData () {
  apiResponse = this.response
  nextURL = this.response.nextURL
  console.log(this.response)
  console.log(nextURL)

  if (apiResponse.message === 'You got your question! Now send me the answer via HTTP POST to the nextURL in JSON-format' || 'You got your question! Now send me which alternative that is right (the key) as the answer via HTTP POST to the nextURL in JSON-format') {
    questionMessage.innerHTML = apiResponse.question
    questionId.innerHTML = apiResponse.id
  }
}

function startGame () {
  useApi('GET')
  startGameBtn.disabled = true
}

function submitAnswer () {
  useApi('POST', { answer: 2 })
  startGameBtn.disabled = false
}
