class Memory {
  constructor (count) {
    this.count = count
    this.memory = `
<div id="bricks">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}1">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}2">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}3">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}4">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}5">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}6">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}7">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}8">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}9">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}10">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}11">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}12">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}13">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}14">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}15">
<img src="image/0.png" alt="spelbricka" class="" id=img${this.count}16">
</div> <!-- End bricks -->
</div>
<button type="button" id="startGame${this.count}">Start Game</button>
</div>
`
    this.picElems = []
    this.frontPic = []
  }

  startGame () {
    const startGameBtn = document.getElementById(`startGame${this.count}`)
    startGameBtn.addEventListener('click', function clickedGameButton (event) {
      this.picsElems = document.getElementById('bricks').getElementsByTagName('img')

      for (let i = 0; i < this.picsElems.length; i++) {
        this.picsElems[i].src = '/examination-3/src/image/0.png'
      }
      this.ranomdizePics()
      startGameBtn.disabled = true
    }.bind(this))
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

    // Tilldela ett random nummer mellan 0-20, antal gånger motsvarande hälften av alla picElems
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
