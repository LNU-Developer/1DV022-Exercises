
function reqListener () {
  console.log(JSON.parse(this.response).question)
}

var api = new window.XMLHttpRequest()
api.addEventListener('load', reqListener)
api.open('GET', 'http://vhost3.lnu.se:20080/question/1', true)
api.setRequestHeader('Content-Type', 'application/json')
api.send()
