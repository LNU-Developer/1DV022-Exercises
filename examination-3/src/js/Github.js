class Github {
  constructor (count) {
    this.count = count
  }

  startApp () {
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeGithub.bind(this), { once: true })
    document.getElementById(`minimize${this.count}`).addEventListener('click', this.minimizeGithub.bind(this))
    document.getElementById(`viewIssuesBtn${this.count}`).addEventListener('click', this.viewIssues.bind(this))
    document.getElementById(`starReposBtn${this.count}`).addEventListener('click', this.starRepos.bind(this))
    document.getElementById(`allReposBtn${this.count}`).addEventListener('click', this.allRepos.bind(this))
    document.getElementById(`signInBtn${this.count}`).addEventListener('click', this.signIn.bind(this))
    document.getElementById(`viewIssuesBtn${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`allReposBtn${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`starReposBtn${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`github${this.count}`).addEventListener('scroll', this.infinityScroll.bind(this))
  }

  signIn () {
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`signInAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptSignIn.bind(this), { once: true })
  }

  acceptSignIn () {
    this.token = document.getElementById(`token${this.count}`).value
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`viewIssuesBtn${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`allReposBtn${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`starReposBtn${this.count}`).setAttribute('class', 'githubvisibleSettings')
  }

  allRepos () {
    document.getElementById(`githubMessageArea${this.count}`).innerHTML = ''
    this.links = `https://api.github.com/user/repos`
    this.type = 'allRepos'
    this.fetch(this.links, this.type, this.token)
  }

  viewIssues () {
    document.getElementById(`githubMessageArea${this.count}`).innerHTML = ''
    this.links = 'https://api.github.com/issues'
    this.type = 'userIssues'
    this.fetch(this.links, this.type, this.token)
  }

  starRepos () {
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`starReposAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptStarRepos.bind(this), { once: true })
  }

  acceptStarRepos () {
    document.getElementById(`githubMessageArea${this.count}`).innerHTML = ''
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    const stars = document.getElementById(`star${this.count}`).value
    this.links = `https://api.github.com/search/repositories?q=stars:>${stars}`
    this.type = 'star'
    this.fetch(this.links, this.type, this.token)
  }

  infinityScroll (event) {
    const obj = event.target
    if ((obj.scrollTop === (obj.scrollHeight - obj.offsetHeight)) && (this.links !== null)) {
      const linkArray = this.links.split(',')
      const urls = linkArray.map(a => {
        return {
          url: a.split(';')[0].replace('>', '').replace('<', ''),
          title: a.split(';')[1]
        }
      })
      const nextLink = urls.find(element => element.title === ' rel="next"')
      if (nextLink !== undefined) {
        this.fetch(nextLink.url, this.type, this.token)
      }
    }
  }

  fetch (url, type, token) {
    return new Promise(function (resolve, reject) {
      const response = window.fetch(url, { method: 'get', resolveWithFullResponse: true, headers: { Accept: 'application/json', Authorization: `Token ${token}` } })
      return resolve(response)
    })
      .then(response => response.json().then(json => ({
        headers: response.headers,
        json
      })))
      .then(({ headers, json }) => this.parser(json, type, headers))
  }

  parser (data, type, headers) {
    this.links = headers.get('link')

    if (type === 'userIssues') {
      data.forEach(i => {
        const img = document.createElement('img')
        const anchor = document.createElement('a')
        anchor.textContent = i.title
        anchor.href = i.html_url
        img.src = i.user.avatar_url
        this.appendHTML(img, anchor)
      })
    } else if (type === 'star') {
      data.items.forEach(i => {
        const img = document.createElement('img')
        const anchor = document.createElement('a')
        anchor.textContent = i.name
        anchor.href = i.html_url
        img.src = i.owner.avatar_url
        this.appendHTML(img, anchor)
      })
    } else if (type === 'allRepos') {
      data.forEach(i => {
        const img = document.createElement('img')
        const anchor = document.createElement('a')
        anchor.textContent = i.name
        anchor.href = i.html_url
        img.src = i.owner.avatar_url
        this.appendHTML(img, anchor)
      })
    }
  }

  appendHTML (img, anchor) {
    document.getElementById(`githubMessageArea${this.count}`).appendChild(img)
    document.getElementById(`githubMessageArea${this.count}`).appendChild(anchor)
    document.getElementById(`githubMessageArea${this.count}`).appendChild(document.createElement('br'))
  }

  /**
   * Function to remove all eventlisteners and to remove HTML reference to created Window
   */
  closeGithub () {
    document.getElementById(`signInBtn${this.count}`).removeEventListener('click', this.signIn.bind(this))
    document.getElementById(`viewIssuesBtn${this.count}`).removeEventListener('click', this.viewIssues.bind(this))
    document.getElementById(`starReposBtn${this.count}`).removeEventListener('click', this.starRepos.bind(this))
    document.getElementById(`allReposBtn${this.count}`).removeEventListener('click', this.allRepos.bind(this))
    document.getElementById(`github${this.count}`).removeEventListener('scroll', this.infinityScroll.bind(this))
    const window = document.getElementById(`window${this.count}`)
    window.parentNode.removeChild(window)
  }

  /**
   * Function to minimize created Window
   */
  minimizeGithub () {
    const a = document.createElement('a')
    a.setAttribute('href', '#')
    a.setAttribute('id', `${this.count}`)
    a.innerHTML = `Github`
    document.getElementById('minimizedWindows').appendChild(a)
    document.getElementById(`window${this.count}`).classList.toggle('hide')
  }
}
export {
  Github
}
