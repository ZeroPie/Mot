// https://labjs.readthedocs.io/en/latest/reference/canvas.html?highlight=canvas.#canvas.Screen.options.ctxType

import {
  instruction1,
  instruction2,
  instruction3,
  instruction4,
  motCanvasScreen,
  pointsScreen,
  finalScreen
} from './src/screens.js'
import { scriptExists } from './src/helpers.js'
import { renderMot } from './src/renderMot.js'
import initialState from './src/initialState.js'

const state = { ...initialState }

const MOT = new lab.flow.Sequence({
  content: [
    new lab.html.Screen(instruction1),
    new lab.html.Screen(instruction2),
    new lab.html.Screen(instruction3),

    new lab.canvas.Screen({
      motCanvasScreen,
      renderFunction: renderMot({ ...state, isProbe: true }),
      responses: {
        'keypress(Space)': 'response'
      }
    }),
    new lab.html.Screen(instruction4),
    new lab.canvas.Screen({
      motCanvasScreen,
      renderFunction: renderMot(state),
      responses: {
        'keypress(Space)': 'response'
      }
    }),
    new lab.html.Screen(pointsScreen),
    new lab.html.Screen(finalScreen)
  ]
})

MOT.run()

MOT.on('end', () => {
  if (scriptExists('jatos')) {
    jatos.submitResultData({ score: state.score })
    jatos.endStudy()
  }
})
