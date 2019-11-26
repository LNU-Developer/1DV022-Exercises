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
    this.picElems = []
    this.frontPic = []
  }

  startGame () {
    this.picsElems = document.getElementById(`bricks${this.count}`).getElementsByTagName('img')
    for (let i = 0; i < this.picsElems.length; i++) {
      this.picsElems[i].src = '/examination-3/src/image/0.png'
    }
    this.ranomdizePics()
    document.getElementById(`bricks${this.count}`).addEventListener('click', this.clickedImg)
  }

  clickedImg (event) {
    console.log(event.target.id)
  }

  ranomdizePics () {
    const picNo = [] // Array för slumptal, väljer i sin tur bilden
    let r // Variabel för att ange ett slumpässigt tal
    const allNo = [] // Array som skall hålla alla möjliga tal (för bildernas referens)
    let a, b // Variablar för att hålla temporära värden för shuffle av array
    // Populera arrayn med maximalt möjliga referenser till bilderna
    for (let i = 0; i < 8; i++) {
      allNo[i] = i
    }

    // Tilldela ett random nummer mellan 0-15, antal gånger motsvarande hälften av alla picElems
    for (let i = 0; i < this.picsElems.length / 2; i++) {
      r = Math.floor(Math.random() * allNo.length)
      picNo[i] = allNo[r]
      allNo.splice(r, 1)
      this.frontPic[i] = picNo[i]
    }

    for (let i = picNo.length - 1; i > 0; i--) {
      a = Math.floor(Math.random() * (i + 1))
      b = picNo[i]
      picNo[i] = picNo[a]
      picNo[a] = b
    }

    // Populera resterande del av array med slumpade siffror så att allt inte hamnar på motsvarande platser
    for (let i = this.picsElems.length / 2; i < this.picsElems.length; i++) {
      this.frontPic[i] = picNo[i - this.picsElems.length / 2]
    }
  }
}

export {
  Memory
}
