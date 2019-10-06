var nextURL
var startGameBtn
var answerBtn
var questionId
var questionNumber
var questionMessage
var questionArea
var answerType
var submittedAnswer
var response
var userAnswer
var userOption
var answerArea
var countdownTimer
var userMessage
var totalTime
var timeLeft
var nicknameArea
var userNickname
var highscoreArea

function init () {
  highscoreArea = document.getElementById('highscoreArea')
  nicknameArea = document.getElementById('nicknameArea')
  userNickname = document.getElementById('userNickname')
  answerArea = document.getElementById('answerArea')
  questionArea = document.getElementById('questionArea')
  userMessage = document.getElementById('userMessage')
  answerType = document.getElementById('answerType')
  questionId = document.getElementById('questionId')
  questionMessage = document.getElementById('questionMessage')
  startGameBtn = document.getElementById('startGameBtn')
  answerBtn = document.getElementById('answerBtn')
  startGameBtn.addEventListener('click', startGame)
  answerBtn.addEventListener('click', submitAnswer)

  updateHighscore()
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

function updateQuestion () {
  questionTimer('start')
  answerType.innerHTML = ''
  questionNumber++

  questionMessage.innerHTML = response.question
  questionId.innerHTML = questionNumber

  if (response.message === 'You got your question! Now send me the answer via HTTP POST to the nextURL in JSON-format') {
    answerType.innerHTML = '<input type="text" name="answer" id="userAnswer" size="20">'
    userAnswer = document.getElementById('userAnswer')
  } else if (response.message === 'You got your question! Now send me which alternative that is right (the key) as the answer via HTTP POST to the nextURL in JSON-format') {
    userAnswer = ''
    for (let i = 0; i < Object.keys(response.alternatives).length; i++) {
      answerType.innerHTML += '<input type="radio" name="userOption" value=alt' + (i + 1) + '>' + Object.values(response.alternatives)[i] + '<br>'
    }
    userOption = document.getElementsByName('userOption')
  }
}

async function startGame () {
  userMessage.innerHTML = ''
  questionNumber = 0
  totalTime = 0
  nextURL = 'http://vhost3.lnu.se:20080/question/1'
  response = await useApi('GET')
  updateQuestion()
  showAreas(true)
}

async function submitAnswer () {
  totalTime += questionTimer('stop')
  if (!userAnswer.id) {
    for (let i = 0; i < userOption.length; i++) {
      if (userOption[i].checked) {
        submittedAnswer = userOption[i].value
      }
    }
  } else {
    submittedAnswer = userAnswer.value
  }

  response = await useApi('POST', { answer: submittedAnswer })

  if (response.message === 'Wrong answer! :(') {
    userMessage.innerHTML = 'Sorry, wrong answer, please start over'
    showAreas(false)
  } else if (response.nextURL !== undefined) {
    response = await useApi('GET')
    updateQuestion()
  } else {
    userMessage.innerHTML = 'Congratualtions, you finished the quiz. It took you ' + totalTime + ' seconds.'
    showAreas(false)
    checkHighscore(totalTime)
  }
}

function questionTimer (choice) {
  if (choice === 'start') {
    timeLeft = 20
    countdownTimer = setInterval(function () {
      userMessage.innerHTML = timeLeft + ' seconds remaining'
      timeLeft -= 1
      if (timeLeft <= 0) {
        clearInterval(countdownTimer)
        userMessage.innerHTML = 'Sorry, the time is up, please start over'
        showAreas(false)
      }
    }, 1000)
  } else if (choice === 'stop') {
    clearInterval(countdownTimer)
    return 20 - timeLeft
  }
}

function showAreas (choice) {
  if (choice === true) {
    startGameBtn.disabled = true
    answerArea.hidden = false
    questionArea.hidden = false
    userNickname.disabled = true
  } else {
    startGameBtn.disabled = false
    answerArea.hidden = true
    questionArea.hidden = true
    userNickname.disabled = false
  }
}

function checkHighscore (score) {
  let sessionStorage = window.sessionStorage.getItem('highscore') || '[]'
  let highscore = []
  let result = { 'nickname': userNickname.value, 'score': score }
  let parseStorage = JSON.parse(sessionStorage)
  for (let i = 0; i < parseStorage.length; i++) {
    highscore.push(parseStorage[i])
  }
  highscore.push(result)
  highscore.sort((a, b) => a.score - b.score)
  highscore = highscore.slice(0, 5)

  window.sessionStorage.setItem('highscore', JSON.stringify(highscore))
  updateHighscore()
}

function updateHighscore () {
  let parseStorage = JSON.parse(window.sessionStorage.getItem('highscore'))
  if (parseStorage !== null) {
    let html = '<table>\n<tr>\n<th>#</th>\n<th>Nickname</th>\n<th>Score</th>\n</tr>\n'
    for (let i = 0; i < parseStorage.length; i++) {
      html += '<tr>\n<td>' + (i + 1) + '</td>\n<td>' + parseStorage[i].nickname + '</td>\n<td>' + parseStorage[i].score + '</td>\n</tr>\n'
    }
    html += '</table>'
    highscoreArea.innerHTML = html // Since the dom tries to compensate for unfinished tags on each add I need to add all of the html in one go.
  }
}
