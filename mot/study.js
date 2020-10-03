import { renderMot } from './src/index.js'
import {
  instruction1,
  instruction2,
  instruction3,
  pointsScreen,
  finalScreen
} from './src/screens.js'

const createScreen = screenOptions => new lab.html.Screen(screenOptions)

const canvasScreen = new lab.canvas.Screen({
  renderFunction: renderMot,
  responses: {
    'keypress(r)': ''
  }
  //viewport: [0],
  //viewportScale: 1,
  //translateOrigin: false
})

const containerEle = document.getElementById('container')
containerEle.webkitRequestFullScreen()

const MOT = new lab.flow.Sequence({
  content: [
    createScreen(instruction1),
    createScreen(instruction2),
    createScreen(instruction3),
    canvasScreen,
    createScreen(pointsScreen(1000)),
    createScreen(finalScreen)
  ]
})

MOT.run()
