export default class CustomJs {
  constructor (callback) {
    this.callback = callback
  }

  handle (context, event) {
    if (event === 'show') {
      this.callback()
    }
  }
}
