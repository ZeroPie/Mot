import { renderMot } from './src/index.js'
import { instruction1, instruction2, instruction3, finalScreen } from './src/screens.js'

const scoreScreen = new lab.html.Screen(finalScreen)

const createScreen = (screenOptions) => new lab.html.Screen(screenOptions) 

const canvasScreen = new lab.canvas.Screen({
  renderFunction: renderMot
})

const MOT = new lab.flow.Sequence({
  content: [
    canvasScreen,
    createScreen(instruction1),
    createScreen(instruction2),
    createScreen(instruction3),
    createScreen(finalScreen)
  ],
})

MOT.run()
