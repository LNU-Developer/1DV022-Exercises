class Memory {
  constructor (count) {
    this.count = count
    this.memory = `
<p>Select game layout: 
<select id="nrOfBricks${this.count}">
<option selected>4x4</option>
<option>2x2</option>
<option>2x4</option>
</select>
</p>
<div id="bricks${this.count}" style="width: 250px; display: inline-block;">
<img src="image/0.png" alt="Brick" tabindex="0" id="0" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="1" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="2" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="3" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="4" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="5" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="6" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="7" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="8" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="9" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="10" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="11" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="12" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="13" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="14" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="Brick" tabindex="0" id="15" width="60px" height="60px" margin="2px">
</div>
<div id="userMessage${this.count}"></div>
`
    this.userTries = 0
    this.foundPic = 0
    this.frontPic = []
    this.turnedPic = []
  }

  startGame () {
    this.picsElems = document.getElementById(`bricks${this.count}`).getElementsByTagName('img')
    for (let i = 0; i < this.picsElems.length; i++) {
      this.picsElems[i].src = '/examination-3/src/image/0.png'
    }
    this.ranomdizePics()
    this.picsElems[0].focus()
    document.getElementById(`bricks${this.count}`).addEventListener('click', this.selectImg.bind(this))
    document.getElementById(`bricks${this.count}`).addEventListener('keydown', this.keyUse.bind(this))
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeMemory.bind(this))
    document.getElementById(`nrOfBricks${this.count}`).addEventListener('change', this.changeBricks.bind(this))
  }

  keyUse (event) {
    const id = Number(document.activeElement.id)
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.selectImg(event)
    }
    if (event.keyCode === 37 && id !== 0) {
      this.picsElems[id].previousElementSibling.focus()
    }
    if (event.keyCode === 39 && id !== this.picsElems.length - 1) {
      this.picsElems[id].nextElementSibling.focus()
    }
    if (event.keyCode === 38 && id > 3) {
      this.picsElems[id - 4].focus()
    }
    if (event.keyCode === 40 && id < this.picsElems.length - 4) {
      this.picsElems[id + 4].focus()
    }
  }

  selectImg (event) {
    if (!isNaN(event.target.id) && this.turnedPic.length < 2 && event.target.tabIndex === 0) {
      this.picsElems[event.target.id].src = `/examination-3/src/image/${[this.frontPic[event.target.id]]}.png`
      this.turnedPic.push(event.target.id)
      if (this.turnedPic.length === 2) {
        this.checkPics()
      }
    }
  }

  async checkPics () {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const first = this.turnedPic.pop()
    const second = this.turnedPic.pop()
    this.userTries++

    if (first !== second) {
      if (this.frontPic[first] === this.frontPic[second]) {
        this.picsElems[first].style.opacity = 0
        this.picsElems[second].style.opacity = 0
        this.picsElems[first].tabIndex = -1
        this.picsElems[second].tabIndex = -1
        this.foundPic = this.foundPic + 2
        if (this.foundPic === this.picsElems.length) {
          const length = this.picsElems.length
          for (let i = length - 1; i >= 0; i--) {
            document.getElementById(`bricks${this.count}`).removeChild(this.picsElems[i])
          }
          document.getElementById(`userMessage${this.count}`).innerHTML = `Congratulation! It took you ${this.userTries} tries!`
        }
      } else {
        this.picsElems[first].src = '/examination-3/src/image/0.png'
        this.picsElems[second].src = '/examination-3/src/image/0.png'
      }
    } else {
      this.turnedPic.push(first)
    }
  }

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
  }

  changeBricks () {
    const bricksSelection = document.getElementById(`nrOfBricks${this.count}`)
    const rawSelection = bricksSelection.options[bricksSelection.selectedIndex].text
    const length = this.picsElems.length
    const total = Number(rawSelection.charAt(0)) * Number(rawSelection.charAt(2))
    for (let i = length - 1; i >= 0; i--) {
      document.getElementById(`bricks${this.count}`).removeChild(this.picsElems[i])
    }
    for (let i = 0; i < total; i++) {
      const img = document.createElement('img')
      img.setAttribute('src', 'image/0.png')
      img.setAttribute('alt', 'Brick')
      img.setAttribute('tabindex', 0)
      img.setAttribute('id', i)
      img.setAttribute('width', '60px')
      img.setAttribute('height', '60px')
      img.setAttribute('margin', '2px')
      document.getElementById(`bricks${this.count}`).appendChild(img)
    }
    this.ranomdizePics()
  }

  closeMemory () {
    const window = document.getElementById(`window${this.count}`)
    document.getElementById(`close${this.count}`).removeEventListener('click', this.closeMemory.bind(this))
    document.getElementById(`bricks${this.count}`).removeEventListener('click', this.selectImg.bind(this))
    document.getElementById(`bricks${this.count}`).removeEventListener('keydown', this.keyUse.bind(this))
    document.getElementById(`nrOfBricks${this.count}`).removeEventListener('change', this.changeBricks.bind(this))
    window.parentNode.removeChild(window)
  }
}

export {
  Memory
}
