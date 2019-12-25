class Github {
  constructor (count) {
    this.count = count
  }

  startGithub () {
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeGithub.bind(this), { once: true })
    document.getElementById(`signInBtn${this.count}`).addEventListener('click', this.signIn.bind(this))
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
  }

  signIn () {
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`signInAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptSignin.bind(this), { once: true })
  }

  async acceptSignin () {
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    this.token = document.getElementById(`token${this.count}`).value
    const url = 'https://api.github.com/search/issues?q=repo:RMarjanovic/1DV022-Exercises type:issue'
    await this.fetchIssuesPrivate(url)
  }

  fetchIssuesPrivate (url) {
    const token = this.token
    return new Promise(function (resolve, reject) {
      const response = window.fetch(url, { method: 'get', headers: { Accept: 'application/json', Authorization: `Token ${token}` } })
      return resolve(response)
    })
      .then(res => res.json())
      .then(data => console.log(data.items))
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
