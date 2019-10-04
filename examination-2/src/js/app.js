var nextURL
var startGameBtn
var answerBtn
// var questionId
// var questionMessage
// var answerType
// var submittedAnswer
var response
// var questionArea
function init () {
  // questionArea = document.getElementById('questionArea')
  // answerType = document.getElementById('answerType')
  // questionId = document.getElementById('questionId')
  // questionMessage = document.getElementById('questionMessage')
  startGameBtn = document.getElementById('startGameBtn')
  answerBtn = document.getElementById('answerBtn')
  nextURL = 'http://vhost3.lnu.se:20080/question/1'
  startGameBtn.addEventListener('click', startGame)
  answerBtn.addEventListener('click', submitAnswer)
  console.log('Window loaded')
}
window.addEventListener('load', init)

function useApi (type, answer) {
  return new Promise(function (resolve) {
    var api = new window.XMLHttpRequest()
    api.open(type, nextURL, true)
    api.setRequestHeader('Content-Type', 'application/json')
    api.responseType = 'json'
    api.onload = function () {
      nextURL = api.response.nextURL
      return resolve(api.response)
    }
    api.send(JSON.stringify(answer))
  })
}

// function apiData () {
// svar = this.response
// nextURL = this.response.nextURL
// console.log(this.response)
// console.log(nextURL)

// if (this.response.message === 'You got your question! Now send me the answer via HTTP POST to the nextURL in JSON-format') {
// questionMessage.innerHTML = this.response.question
// questionId.innerHTML = this.response.id
// answerType.innerHTML = '<input type="text" name="answer" id="userAnswer" size="5">'
// submittedAnswer = document.getElementById('userAnswer').value
// console.log(submittedAnswer)
// } // else if (|| 'You got your question! Now send me which alternative that is right (the key) as the answer via HTTP POST to the nextURL in JSON-format'))
// }

async function startGame () {
  response = await useApi('GET')
  console.log(response)
}

async function submitAnswer () {
  response = await useApi('POST', { answer: 2 })
  console.log(response)
}
