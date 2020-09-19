import { renderMot } from './src/index.js'
import { anleitung1, anleitung2, anleitung3, finalScreen } from './src/screens.js'

const scoreScreen = new lab.html.Screen(finalScreen)

const createScreen = (screenOptions) => new lab.html.Screen(screenOptions) 

const canvasScreen = new lab.canvas.Screen({
  renderFunction: renderMot
})

const MOT = new lab.flow.Sequence({
  content: [
    canvasScreen,
    createScreen(anleitung1),
    createScreen(anleitung2),
    createScreen(anleitung3),
    createScreen(finalScreen)
  ],
})

MOT.run()
