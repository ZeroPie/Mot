export default class FullScreen {
  constructor () {
    this.docElm = document.documentElement
    this.enterFullScreen = this.enterFullScreen
  }

  enterFullScreen () {
    if (this.docElm.requestFullscreen) {
      this.docElm.requestFullscreen()
    } else if (this.docElm.mozRequestFullScreen) {
      this.docElm.mozRequestFullScreen()
    } else if (this.docElm.webkitRequestFullScreen) {
      this.docElm.webkitRequestFullScreen()
    } else if (this.docElm.msRequestFullscreen) {
      this.docElm.msRequestFullscreen()
    }
  }

  handle (context, event) {
    if (event === 'show') {
      this.enterFullScreen()
    }
  }
}
