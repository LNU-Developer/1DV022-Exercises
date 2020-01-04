/**
 * Creates a window
 * @param {number} count - The unique instance number that will populate all IDs
 * @param {string} choice - The type of window to be created
 * @param {number} zIndex - The current zIndex value
 * @constructor
 */
class Window {
  constructor (count, choice, zIndex) {
    this.count = count
    this.choice = choice
    this.zIndex = zIndex
  }

  /**
   * Method to create all divs, images and content of a specific window
   * @returns {element} returns a window element
   */
  createWindow () {
    // Creating divs, text and adding style
    const windowElement = document.createElement('div')
    windowElement.setAttribute('id', `window${this.count}`)
    windowElement.setAttribute('class', 'windowElement')

    const headerElement = document.createElement('div')
    headerElement.setAttribute('id', `window${this.count}header`)
    headerElement.setAttribute('class', 'headerElement')
    windowElement.appendChild(headerElement)

    const menuElement = document.createElement('div')
    menuElement.innerHTML = this.menuChoice(this.choice)
    windowElement.appendChild(menuElement)

    const headerText = document.createElement('div')
    headerText.innerHTML = this.headerChoice(this.choice).alt
    headerText.setAttribute('class', 'headerText')
    headerElement.appendChild(headerText)

    // Adding app img and setting style
    const headerImg = document.createElement('img')
    headerImg.setAttribute('src', this.headerChoice(this.choice).src)
    headerImg.setAttribute('alt', this.headerChoice(this.choice).alt)
    headerElement.appendChild(headerImg)

    // Adding close img and setting style
    const closeImg = document.createElement('img')
    closeImg.setAttribute('src', 'image/baseline_close_black_18dp.png')
    closeImg.setAttribute('alt', 'Close')
    closeImg.setAttribute('id', `close${this.count}`)
    headerElement.appendChild(closeImg)

    // Adding minimize img and setting style
    const minimizeImg = document.createElement('img')
    minimizeImg.setAttribute('src', 'image/outline_remove_black_18dp.png')
    minimizeImg.setAttribute('alt', 'Minimize')
    minimizeImg.setAttribute('id', `minimize${this.count}`)
    headerElement.appendChild(minimizeImg)

    windowElement.insertAdjacentHTML('beforeend', this.rootChoice(this.choice))

    windowElement.style.top = `${(this.count * 30) % (window.innerHeight - 300)}px`
    windowElement.style.left = `${(this.count * 10) % (window.innerWidth - 300)}px`
    windowElement.style.zIndex = this.zIndex++
    return windowElement
  }

  /**
   * Method to populate with content depending on the type of window being created
   * @param {string} choice the type of window content to be returned
   * @returns {object} object containing src and alt data
   */
  headerChoice (choice) {
    if (choice === 'Memory') {
      return { src: 'image/baseline_layers_black_18dp2.png', alt: 'Memory' }
    } else if (choice === 'Chat') {
      return { src: 'image/baseline_chat_black_18dp2.png', alt: 'Chat' }
    } else if (choice === 'Github') {
      return { src: 'image/baseline_rss_feed_black_18dp2.png', alt: 'Github' }
    }
  }

  /**
   * Method to populate with content depending on the type of window being created
   * @param {string} choice the type of window content to be returned
   * @returns {html} returns html data to populate the menu
   */
  menuChoice (choice) {
    if (choice === 'Memory') {
      return `
              <p class="memoryMenu">Select game layout: 
              <select id="nrOfBricks${this.count}" tabindex="0">
              <option selected value="16">4x4</option>
              <option value="4">2x2</option>
              <option value="8">2x4</option>
              </select></p>`
    } else if (choice === 'Chat') {
      return `
              <div class="chatMenu"> 
                  <input autocomplete="off" id="nickName${this.count}" type="text" class="form-control" style="width: 100px;">
              </div>
              `
    } else if (choice === 'Github') {
      return `
              <div class="gitMenu"> 
              <button type="button" id="signInBtn${this.count}">Sign into Github</button>
                <div id="signInSettings${this.count}">
                  <p>Token:<input id="token${this.count}" type="text" style="width: 250px;"></p>
                  <button id="signInAcceptSettingsBtn${this.count}">Go</button></p>
                </div>
              <button type="button" id="allReposBtn${this.count}">List all user repos</button>  
              <button type="button" id="viewIssuesBtn${this.count}">List all user issues</button>
              <button type="button" id="starReposBtn${this.count}">Enter stars</button>
                <div id="starReposSettings${this.count}">
                  <p>View repos above:<input id="star${this.count}" type="text" style="width: 50px;"> stars</p>
                  <button id="starReposAcceptSettingsBtn${this.count}">Go</button></p>
                </div>
              </div>
              `
    }
  }

  /**
   * Method to populate with content depending on the type of window being created
   * @param {string} choice the type of window content to be returned
   * @returns {html} returns html data to populate the root div
   */
  rootChoice (choice) {
    if (choice === 'Memory') {
      return `
              <div id="bricks${this.count}" class="memoryDiv"</div>
              <div id="userMessage${this.count}"></div>
              `
    } else if (choice === 'Chat') {
      return `
              <div id="chat${this.count}" class="chatDiv">
                <div id="channels${this.count}" class="channelsDiv">
                  <lable>#</lable><input autocomplete="off" id="channel${this.count}" type="text" style="width: 100px;" placeholder="Add channel"><br>
                  <p><a href="#" id="defaultChannel${this.count}">#channel</a></p>
                </div>
                <h1>Messages</h2>    
                <div id="messageArea${this.count}" class="messageArea">
                  <p id="receivedMessages${this.count}"></p>
                </div>
                  <div id="inputArea" class="inputArea">
                    <h2>Type your message</h2>
                    <p><textarea rows="2" cols="45" id="userMessage${this.count}" tabindex="${this.count}"></textarea></p>
                  </div>
                </div>
               `
    } else if (choice === 'Github') {
      return `
              <div id="github${this.count}" class="githubDiv">
                <div id="githubMessageArea${this.count}" class="githubMessageArea">
                </div>
              </div>
            `
    }
  }
}

/**
   * Exporting module
   */
export {
  Window
}
