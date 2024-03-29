// References to DOM
var userNickname
var highscoreArea
var startGameBtn
var answerBtn
var questionId
var questionMessage
var questionArea
var answerArea
var userMessage
var answerType

// Other JS variables
var nextURL
var questionNumber
var submittedAnswer
var response
var userAnswer
var userOption
var countdownTimer
var beginTime

/**
 * Initiates when DOM has loaded
 */

function init () {
  highscoreArea = document.getElementById('highscoreArea')
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
  window.addEventListener('keypress', keyStart)
  updateHighscore()
}
window.addEventListener('load', init)

/**
 * Event handler for key stroke enter
 *
 * @param {number} e - keystroke
 */

function keyStart (e) {
  if (e.keyCode === 13) {
    startGame()
  }
}

/**
 * Event handler for key stroke enter
 *
 * @param {number} e - keystroke
 */

function keyAnswer (e) {
  if (e.keyCode === 13) {
    submitAnswer()
  }
}

/**
 * Function to send and receive answer from API
 *
 * @param {string} type - API type (GET or POST)
 * @param {string} answer - The answer to be sent in a POST request
 * @returns {Promise} - Promise object representing an API response
 */
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

/**
 * Functions to update questions depending on received answer
 *
 */
function updateQuestion () {
  questionTimer('start')
  answerType.innerHTML = ''
  questionNumber++

  questionMessage.innerHTML = response.question
  questionId.innerHTML = questionNumber

  if (response.message === 'You got your question! Now send me the answer via HTTP POST to the nextURL in JSON-format') {
    userOption = ''
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

/**
 * Async functions to receive initial question and initate game
 *
 */
async function startGame () {
  beginTime = Date.now()
  userMessage.innerHTML = ''
  questionNumber = 0
  nextURL = 'http://vhost3.lnu.se:20080/question/1'
  response = await useApi('GET')
  updateQuestion()
  showAreas(true)
  window.removeEventListener('keypress', keyStart)
  window.addEventListener('keypress', keyAnswer)
}

/**
 * Async functions to submit and check answer
 *
 */
async function submitAnswer () {
  questionTimer('stop')
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
    const endTime = Math.round((Date.now() - beginTime) / 1000)
    userMessage.innerHTML = 'Congratualtions ' + userNickname.value + ', you finished the quiz. It took you ' + endTime + ' seconds.'
    showAreas(false)
    checkHighscore(endTime)
    window.addEventListener('keypress', keyStart)
    window.removeEventListener('keypress', keyAnswer)
  }
}

/**
 * Function to start and end timer
 *
 * @param {string} choice - selecting a choice of 'start' or 'stop' to start/stop clock
 */
function questionTimer (choice) {
  if (choice === 'start') {
    let timeLeft
    const start = Date.now()
    countdownTimer = setInterval(function () {
      timeLeft = 20 - Math.round((Date.now() - start) / 1000)
      userMessage.innerHTML = timeLeft + ' seconds remaining'

      if (timeLeft <= 0) {
        clearInterval(countdownTimer)
        userMessage.innerHTML = 'Sorry, the time is up, please start over'
        showAreas(false)
      }
    }, 200)
  } else if (choice === 'stop') {
    clearInterval(countdownTimer)
  }
}

/**
 * Function to show and hide different areas
 *
 */
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

/**
 * Function to update already stored score and saving top five.
 * *
 * @param {number} score - User end game score
 */
function checkHighscore (score) {
  const sessionStorage = window.sessionStorage.getItem('highscore') || '[]'
  let highscore = []
  const result = { nickname: userNickname.value, score: score }
  const parseStorage = JSON.parse(sessionStorage)
  for (let i = 0; i < parseStorage.length; i++) {
    highscore.push(parseStorage[i])
  }
  highscore.push(result)
  highscore.sort((a, b) => a.score - b.score)
  highscore = highscore.slice(0, 5)

  window.sessionStorage.setItem('highscore', JSON.stringify(highscore))
  updateHighscore()
}

/**
 * Function to inject HTML with score information
 *
 */
function updateHighscore () {
  const parseStorage = JSON.parse(window.sessionStorage.getItem('highscore'))
  if (parseStorage !== null) {
    let html = '<table>\n<tr>\n<th>#</th>\n<th>Nickname</th>\n<th>Score</th>\n</tr>\n'
    for (let i = 0; i < parseStorage.length; i++) {
      html += '<tr>\n<td>' + (i + 1) + '</td>\n<td>' + parseStorage[i].nickname + '</td>\n<td>' + parseStorage[i].score + '</td>\n</tr>\n'
    }
    html += '</table>'
    highscoreArea.innerHTML = html // Since the dom tries to compensate for unfinished tags on each add I need to add all of the html in one go.
  }
}
