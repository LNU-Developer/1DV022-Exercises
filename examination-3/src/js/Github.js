/**
 * Creates an instance of a Github app
 * * @param {number} count - The unique instance number that will populate all IDs
 * @constructor
 */

class Github {
  constructor (count) {
    this.count = count
  }

  /**
  * Function to handle initial start and adding eventlisteners
  */
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

  /**
  * Function to show menu when clicking on btn, and to add event handlers for that menu option
  */
  signIn () {
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`signInAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptSignIn.bind(this), { once: true })
  }

  /**
  * Function store Token code into variable and to show all menu items after providing this
  */
  acceptSignIn () {
    this.token = document.getElementById(`token${this.count}`).value
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`viewIssuesBtn${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`allReposBtn${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`starReposBtn${this.count}`).setAttribute('class', 'githubvisibleSettings')
  }

  /**
  * Function fetch all user repos
  */
  allRepos () {
    document.getElementById(`githubMessageArea${this.count}`).innerHTML = ''
    this.links = `https://api.github.com/user/repos`
    this.type = 'allRepos'
    this.fetch(this.links, this.type, this.token)
  }

  /**
  * Function fetch all issues assigned to user
  */
  viewIssues () {
    document.getElementById(`githubMessageArea${this.count}`).innerHTML = ''
    this.links = 'https://api.github.com/issues'
    this.type = 'userIssues'
    this.fetch(this.links, this.type, this.token)
  }

  /**
  * Function to show menu when clicking on btn, and to add event handlers for that menu option
  */
  starRepos () {
    document.getElementById(`signInSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubvisibleSettings')
    document.getElementById(`starReposAcceptSettingsBtn${this.count}`).addEventListener('click', this.acceptStarRepos.bind(this), { once: true })
  }

  /**
  * Function fetch all repos above a certian star count as well as to hide menu option
  */
  acceptStarRepos () {
    document.getElementById(`githubMessageArea${this.count}`).innerHTML = ''
    document.getElementById(`starReposSettings${this.count}`).setAttribute('class', 'githubinvisibleSettings')
    const stars = document.getElementById(`star${this.count}`).value
    this.links = `https://api.github.com/search/repositories?q=stars:>${stars}`
    this.type = 'star'
    this.fetch(this.links, this.type, this.token)
  }

  /**
   * Event handler for scroll events. If reaching the bottom of the page a new fetch request is made with the next url
   * @param {object} event - scroll
   */
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

  /**
   * Method to fetch data from Github by providing parameters. Will call the parser function to parse data
   * @param {string} url - the url of the fetch that is made
   * @param {string} type - the type of fetch that is being made (e.g. if its a starcount fetch or issues fetch)
   * @param {string} token - Token code to add to the fetch request
   */
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

  /**
   * Method to take fetched data and parse by creating HTML elements.
   * @param {object} data - Object containing the body of the fetched data that will be parsed
   * @param {string} type - the type of fetch that is being made (e.g. if its a starcount fetch or issues fetch)
   * @param {object} header - Object containing the header of the fetched data, where the next link will be received
   */
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

  /**
   * Method to actually append created elements
   * @param {element} img - img element created in the parser method
   * @param {element} anchor - a element created in the parser method
   */
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

/**
   * Exporting module
   */
export {
  Github
}
