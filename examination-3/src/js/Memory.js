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
  }

  startGame () {
    const startGameBtn = document.getElementById(`startGame${this.count}`)
    startGameBtn.addEventListener('click', function clickedGameButton (event) {
      this.picsElems = document.getElementById('bricks').getElementsByTagName('img')

      for (let i = 0; i < this.picsElems.length; i++) {
        this.picsElems[i].src = '/examination-3/src/image/0.png'
      }

      startGameBtn.disabled = true
    }.bind(this))
  }
}

export {
  Memory
}
