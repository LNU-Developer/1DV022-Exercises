class Github {
  constructor (count) {
    this.count = count
  }

  startGithub () {
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeGithub.bind(this), { once: true })
    document.getElementById(`signInBtn${this.count}`).addEventListener('click', this.signIn.bind(this))
    document.getElementById(`starReposBtn${this.count}`).addEventListener('click', this.starReps.bind(this))
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
  }

  signIn () {
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`signInAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptSignin.bind(this), { once: true })
  }

  starReps () {
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`starReposAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptStarRepos.bind(this), { once: true })
  }

  async acceptSignin () {
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    this.token = document.getElementById(`token${this.count}`).value
    const url = 'https://api.github.com/search/issues?q=repo:RMarjanovic/1DV022-Exercises type:issue'
    await this.fetch(url, this.token)
  }

  async acceptStarRepos () {
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    const stars = document.getElementById(`star${this.count}`).value
    const url = `https://api.github.com/search/repositories?q=stars:>${stars}`
    await this.fetch(url)
  }

  fetch (url, token) {
    const myToken = token
    let header
    if (myToken === undefined) {
      header = { Accept: 'application/json' }
    } else {
      header = { Accept: 'application/json', Authorization: `Token ${myToken}` }
    }
    return new Promise(function (resolve, reject) {
      const response = window.fetch(url, { method: 'get', headers: header })
      return resolve(response)
    })
      .then(res => res.json())
      .then(data => this.populate(data))
  }

  async populate (myData) {
    const data = await myData
    console.log(myData)
    data.items.forEach(keys => {
      const img = document.createElement('img')
      if (keys.user === undefined) {
        img.src = keys.owner.avatar_url
      } else {
        img.src = keys.user.avatar_url
      }
      img.style.width = '32px'
      img.style.height = '32px'
      const anchor = document.createElement('a')
      anchor.href = keys.html_url
      if (keys.title === undefined) {
        anchor.textContent = keys.name
      } else {
        anchor.textContent = keys.title
      }
      document.getElementById(`githubMessageArea${this.count}`).appendChild(img)
      document.getElementById(`githubMessageArea${this.count}`).appendChild(anchor)
      document.getElementById(`githubMessageArea${this.count}`).appendChild(document.createElement('br'))
    })
  }

  closeGithub () {
    document.getElementById(`signInBtn${this.count}`).removeEventListener('click', this.signIn.bind(this))
    const window = document.getElementById(`window${this.count}`)
    window.parentNode.removeChild(window)
  }
}
export {
  Github
}
