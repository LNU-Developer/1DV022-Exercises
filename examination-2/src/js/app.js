var nextURL
var api = new window.XMLHttpRequest()

function testResponse () {
  console.log(JSON.parse(this.response))
}

function init () {
  nextURL = 'http://vhost3.lnu.se:20080/question/1'
  api.open('GET', nextURL, true)
  api.setRequestHeader('Content-Type', 'application/json')
  api.send()
  api.addEventListener('load', testResponse)
  console.log('Window loaded')
}
window.addEventListener('load', init)
