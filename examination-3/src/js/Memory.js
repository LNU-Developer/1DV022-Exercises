class Memory {
  constructor (count) {
    this.count = count
    this.memory = `
<div id="bricks${this.count}" style="width: 250px; display: inline-block;">
<img src="image/0.png" alt="spelbricka" class="" id="0" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="1" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="2" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="3" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="4" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="5" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="6" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="7" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="8" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="9" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="10" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="11" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="12" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="13" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="14" width="60px" height="60px" margin="2px">
<img src="image/0.png" alt="spelbricka" class="" id="15" width="60px" height="60px" margin="2px">
</div> <!-- End bricks -->
`
    this.frontPic = []
  }

  startGame () {
    this.picsElems = document.getElementById(`bricks${this.count}`).getElementsByTagName('img')
    for (let i = 0; i < this.picsElems.length; i++) {
      this.picsElems[i].src = '/examination-3/src/image/0.png'
    }
    this.ranomdizePics()
    document.getElementById(`bricks${this.count}`).addEventListener('click', this.clickedImg.bind(this))
  }

  clickedImg (event) {
    this.picsElems[event.target.id].src = `/examination-3/src/image/${[this.frontPic[event.target.id]]}.png`
  }

  ranomdizePics () {
    const values = [1, 2, 3, 4, 5, 6, 7, 8]

    for (const value of values) {
      this.frontPic.push(value)
    }

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
}

export {
  Memory
}
