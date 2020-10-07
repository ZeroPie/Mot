// https://labjs.readthedocs.io/en/latest/reference/canvas.html?highlight=canvas.#canvas.Screen.options.ctxType

import {
  participantInfo,
  instruction1,
  instruction2,
  instruction3,
  instruction4,
  motCanvasScreen,
  pointsScreen,
  finalScreen
} from './src/screens.js'
import { renderMot } from './src/renderMot.js'
import initialState from './src/initialState.js'

const state = { ...initialState }

const skipOnS = { 'keypress(s)': 'skip' }

sessionStorage.data = JSON.stringify({ name: '', score: 0 })

const MOT = new lab.flow.Sequence({
  content: [
    new lab.html.Form(participantInfo),
    new lab.html.Screen(instruction1),
    new lab.html.Screen(instruction2),
    new lab.html.Screen(instruction3),

    new lab.canvas.Screen({
      motCanvasScreen,
      renderFunction: renderMot({ ...state, isProbe: true }),
      responses: skipOnS
    }),
    new lab.html.Screen(instruction4),
    new lab.canvas.Screen({
      motCanvasScreen,
      renderFunction: renderMot(state),
      responses: skipOnS
    }),
    new lab.html.Screen(pointsScreen(state)),
    new lab.html.Screen(finalScreen)
  ]
})

MOT.run()

MOT.on('run', () => {
  if (jatos) {
    jatos.submitResultData(JSON.parse(sessionStorage.data))
  }
})

MOT.on('end', () => {
  if (jatos) {
    let prevData = JSON.parse(sessionStorage.data)
    sessionStorage.data = JSON.stringify({ ...prevData, score: state.score })
    jatos.submitResultData(JSON.parse(sessionStorage.data))
    jatos.endStudy()
  }
})
