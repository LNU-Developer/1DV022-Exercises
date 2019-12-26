class Github {
  constructor (count) {
    this.count = count
  }

  startGithub () {
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeGithub.bind(this), { once: true })
    document.getElementById(`viewIssuesBtn${this.count}`).addEventListener('click', this.viewIssues.bind(this))
    document.getElementById(`starReposBtn${this.count}`).addEventListener('click', this.starRepos.bind(this))
    document.getElementById(`allReposBtn${this.count}`).addEventListener('click', this.allRepos.bind(this))
    document.getElementById(`signInBtn${this.count}`).addEventListener('click', this.signIn.bind(this))
    document.getElementById(`viewIssuesBtn${this.count}`).disabled = true
    document.getElementById(`allReposBtn${this.count}`).disabled = true
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
  }

  signIn () {
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`signInAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptSignIn.bind(this), { once: true })
  }

  acceptSignIn () {
    document.getElementById(`viewIssuesBtn${this.count}`).disabled = false
    document.getElementById(`allReposBtn${this.count}`).disabled = false
    this.token = document.getElementById(`token${this.count}`).value
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
  }

  async allRepos () {
    const url = `https://api.github.com/user/repos`
    await this.fetch(url, 'allRepos', this.token)
  }

  async viewIssues () {
    const url = 'https://api.github.com/issues'
    await this.fetch(url, 'userIssues', this.token)
  }

  starRepos () {
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`starReposAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptStarRepos.bind(this), { once: true })
  }

  async acceptStarRepos () {
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    const stars = document.getElementById(`star${this.count}`).value
    const url = `https://api.github.com/search/repositories?q=stars:>${stars}`
    await this.fetch(url, 'star')
  }

  fetch (url, type, token) {
    let header
    if (token === undefined) {
      header = { Accept: 'application/json' }
    } else {
      header = { Accept: 'application/json', Authorization: `Token ${token}` }
    }
    return new Promise(function (resolve, reject) {
      const response = window.fetch(url, { method: 'get', headers: header })
      return resolve(response)
    })
      .then(res => res.json())
      .then(data => this.populate(data, type))
  }

  async populate (data, type) {
    await data
    console.log(data)

    if (type === 'userIssues') {
      data.forEach(i => {
        const img = document.createElement('img')
        const anchor = document.createElement('a')
        anchor.textContent = i.title
        anchor.href = i.html_url
        img.src = i.user.avatar_url
        img.style.width = '32px'
        img.style.height = '32px'
        document.getElementById(`githubMessageArea${this.count}`).appendChild(img)
        document.getElementById(`githubMessageArea${this.count}`).appendChild(anchor)
        document.getElementById(`githubMessageArea${this.count}`).appendChild(document.createElement('br'))
      })
    } else if (type === 'star') {
      data.items.forEach(i => {
        const img = document.createElement('img')
        const anchor = document.createElement('a')
        anchor.textContent = i.name
        anchor.href = i.html_url
        img.src = i.owner.avatar_url
        img.style.width = '32px'
        img.style.height = '32px'
        document.getElementById(`githubMessageArea${this.count}`).appendChild(img)
        document.getElementById(`githubMessageArea${this.count}`).appendChild(anchor)
        document.getElementById(`githubMessageArea${this.count}`).appendChild(document.createElement('br'))
      })
    } else if (type === 'allRepos') {
      data.forEach(i => {
        const img = document.createElement('img')
        const anchor = document.createElement('a')
        anchor.textContent = i.name
        anchor.href = i.html_url
        img.src = i.owner.avatar_url
        img.style.width = '32px'
        img.style.height = '32px'
        document.getElementById(`githubMessageArea${this.count}`).appendChild(img)
        document.getElementById(`githubMessageArea${this.count}`).appendChild(anchor)
        document.getElementById(`githubMessageArea${this.count}`).appendChild(document.createElement('br'))
      })
    }
  }

  closeGithub () {
    document.getElementById(`signInBtn${this.count}`).removeEventListener('click', this.signIn.bind(this))
    document.getElementById(`viewIssuesBtn${this.count}`).removeEventListener('click', this.viewIssues.bind(this))
    document.getElementById(`starReposBtn${this.count}`).removeEventListener('click', this.starRepos.bind(this))
    document.getElementById(`allReposBtn${this.count}`).removeEventListener('click', this.allRepos.bind(this))
    const window = document.getElementById(`window${this.count}`)
    window.parentNode.removeChild(window)
  }
}
export {
  Github
}
