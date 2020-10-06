import { renderMot } from './src/renderMot.js'
import {
  instruction1,
  instruction2,
  instruction3,
  pointsScreen,
  finalScreen
} from './src/screens.js'

import initialState from './src/initialState.js'
import { scriptExists } from './src/helpers.js'

const state = { ...initialState }

const createScreen = screenOptions => new lab.html.Screen(screenOptions)

const canvasScreen = new lab.canvas.Screen({
  renderFunction: renderMot(state),
  responses: {
    'keypress(r)': 'r'
  }
})

const MOT = new lab.flow.Sequence({
  content: [
    createScreen(instruction1),
    createScreen(instruction2),
    createScreen(instruction3),
    canvasScreen,
    createScreen(pointsScreen(state.score)),
    createScreen(finalScreen)
  ]
})

MOT.run()

MOT.on('end', () => {
  if (scriptExists('jatos')) {
    jatos.submitResultData({ score: state.score })
    jatos.endStudy()
  }
})
