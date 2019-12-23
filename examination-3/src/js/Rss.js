class RSS {
  constructor (count) {
    this.count = count
  }

  startRSS () {
    document.getElementById(`close${this.count}`).addEventListener('click', this.closeRSS.bind(this), { once: true })
  }

  closeRSS () {
    const window = document.getElementById(`window${this.count}`)
    window.parentNode.removeChild(window)
  }
}
export {
  RSS
}
