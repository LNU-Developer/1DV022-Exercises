/**
 * Creates an instance of a memorygame
 * * @param {number} count - The unique instance number that will populate all IDs
 * @constructor
 */

class Memory {
  constructor (count) {
    this.count = count
    this.userTries = 0
    this.foundPic = 0
    this.frontPic = []
    this.turnedPic = []
    this.start = 0
    this.stop = 0
  }

  /**
  * Function to handle initial start and adding eventlisteners
  */
  startApp () {
    document.getElementById(`nrOfBricks${this.count}`).focus()
    document.getElementById(`bricks${this.count}`).addEventListener('click', this.selectImg.bind(this))
    document.getElementById(`bricks${this.count}`).addEventListener('keydown', this.keyUse.bind(this))
    document.getElementById(`nrOfBricks${this.count}`).addEventListener('keydown', this.keyUse.bind(this))
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeMemory.bind(this), { once: true })
    document.getElementById(`nrOfBricks${this.count}`).addEventListener('change', this.removeBricks.bind(this))
    document.getElementById(`nrOfBricks${this.count}`).addEventListener('change', this.createBricks.bind(this))
    document.getElementById(`minimize${this.count}`).addEventListener('click', this.minimizeMemory.bind(this))
    this.createBricks(16)
    this.ranomdizePics()
  }

  /**
   * Event handler for key strokes
   * @param {object} event - keystroke
   */
  keyUse (event) {
    const id = Number(document.activeElement.id)
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.selectImg(event)
    } else if (event.keyCode === 37 && id !== 0) {
      this.picsElems[id].previousElementSibling.focus()
    } else if (event.keyCode === 39 && id !== this.picsElems.length - 1) {
      this.picsElems[id].nextElementSibling.focus()
    } else if (event.keyCode === 38 && id > 3) {
      this.picsElems[id - 4].focus()
    } else if (event.keyCode === 40 && id < this.picsElems.length - 4) {
      this.picsElems[id + 4].focus()
    } else if (event.keyCode === 27) {
      this.closeMemory()
    } else {
      document.getElementById(`nrOfBricks${this.count}`).focus()
    }
  }

  /**
  * Event handler for clicking on img
  * @param {object} event - click
  */
  selectImg (event) {
    if (!isNaN(event.target.id) && this.turnedPic.length < 2 && event.target.tabIndex === 0) {
      this.picsElems[event.target.id].src = `image/${[this.frontPic[event.target.id]]}.png`
      this.turnedPic.push(event.target.id)
      if (this.turnedPic.length === 2) {
        this.checkPics()
      }
    }
  }

  /**
  * Async function to turn and check brick as well as check win condition
  */
  async checkPics () {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const first = this.turnedPic.pop()
    const second = this.turnedPic.pop()

    if (first !== second) {
      this.userTries++
      if (this.frontPic[first] === this.frontPic[second]) {
        this.picsElems[first].style.opacity = 0
        this.picsElems[second].style.opacity = 0
        this.picsElems[first].tabIndex = -1
        this.picsElems[second].tabIndex = -1
        this.foundPic = this.foundPic + 2
        if (this.foundPic === this.picsElems.length) {
          this.removeBricks(0)
          document.getElementById(`userMessage${this.count}`).innerHTML = `Congratulation! It took you ${this.userTries} tries and ${this.timer(0)} seconds!`
        }
      } else {
        this.picsElems[first].src = 'image/0.png'
        this.picsElems[second].src = 'image/0.png'
      }
    } else {
      this.turnedPic.push(first)
    }
  }

  /**
 * Functions to randomize array containing picture id references.
 */
  ranomdizePics () {
    document.getElementById(`userMessage${this.count}`).innerHTML = ``
    this.userTries = 0
    this.foundPic = 0
    this.frontPic.length = 0
    const values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
    values.length = this.picsElems.length
    for (const value of values) {
      this.frontPic.push(value)
    }

    let tempValue, randomNo
    let currentElement = this.frontPic.length

    while (currentElement !== 0) {
      randomNo = Math.floor(Math.random() * (currentElement))

      currentElement--

      tempValue = this.frontPic[randomNo]
      this.frontPic[randomNo] = this.frontPic[currentElement]
      this.frontPic[currentElement] = tempValue
    }
    this.timer(1)
  }

  /**
  * Function to populate the amount of bricks that should be used as a playfield
  * @param {number} event - number of bricks that are to be created
  */
  createBricks (event) {
    for (let i = 0; i < Number(event); i++) {
      const img = document.createElement('img')
      img.setAttribute('src', 'image/0.png')
      img.setAttribute('alt', 'Brick')
      img.setAttribute('tabindex', 0)
      img.setAttribute('id', i)
      img.setAttribute('class', 'memoryDiv')
      document.getElementById(`bricks${this.count}`).appendChild(img)
    }
    this.picsElems = document.getElementById(`bricks${this.count}`).getElementsByTagName('img')
    for (let i = 0; i < this.picsElems.length; i++) {
      this.picsElems[i].src = 'image/0.png'
    }
  }

  /**
  * Function to remove all bricks
  * @param {object} event - Object containing the value of the change option
  */
  removeBricks (event) {
    for (let i = this.picsElems.length - 1; i >= 0; i--) {
      document.getElementById(`bricks${this.count}`).removeChild(this.picsElems[i])
    }
    if (event !== 0) {
      this.createBricks(Number(event.target.value))
      this.ranomdizePics()
    }
  }

  /**
   * Function to start and end timer
   * @param {number} choice - selecting a choice of 1 or any other value to start/stop clock
   * @returns {number} returns seconds it took from startvalue
   */
  timer (choice) {
    if (choice === 1) {
      this.startValue = Date.now()
    } else {
      return Math.floor((Date.now() - this.startValue) / 1000)
    }
  }

  /**
   * Function to remove all eventlisteners and to remove HTML reference to created Window
   */
  closeMemory () {
    const window = document.getElementById(`window${this.count}`)
    document.getElementById(`close${this.count}`).removeEventListener('click', this.closeMemory.bind(this), { once: true })
    document.getElementById(`bricks${this.count}`).removeEventListener('click', this.selectImg.bind(this))
    document.getElementById(`bricks${this.count}`).removeEventListener('keydown', this.keyUse.bind(this))
    document.getElementById(`nrOfBricks${this.count}`).removeEventListener('change', this.removeBricks.bind(this))
    document.getElementById(`nrOfBricks${this.count}`).removeEventListener('change', this.createBricks.bind(this))
    document.getElementById(`nrOfBricks${this.count}`).removeEventListener('keydown', this.keyUse.bind(this))
    window.parentNode.removeChild(window)
  }

  /**
   * Function to minimize created Window
   */
  minimizeMemory () {
    const a = document.createElement('a')
    a.setAttribute('href', '#')
    a.setAttribute('id', `${this.count}`)
    a.innerHTML = `Memory`
    document.getElementById('minimizedWindows').appendChild(a)
    document.getElementById(`window${this.count}`).classList.toggle('hide')
  }
}

/**
   * Exporting module
   */
export {
  Memory
}
