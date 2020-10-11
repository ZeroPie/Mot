// https://labjs.readthedocs.io/en/latest/reference/canvas.html?highlight=canvas.#canvas.Screen.options.ctxType
import { flow, html, canvas } from 'lab.js'

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
import { scriptExists } from './src/helpers'
import { renderMot } from './src/renderMot.js'
import initialState from './src/initialState.js'

const state = { ...initialState }
const skipOnS = { 'keypress(s)': 'skip' }

sessionStorage.data = JSON.stringify({ name: '', score: 0 })

if (scriptExists('jatos')) {
  jatos.onLoad(() => {
    if (jatos.studyJsonInput) {
      state.moveTime = jatos.studyJsonInput.time || state.moveTime
    }
  })
}

const MOT = new flow.Sequence({
  content: [
    new html.Form(participantInfo),
    new html.Screen(instruction1),
    new html.Screen(instruction2),
    new html.Screen(instruction3),
    new canvas.Screen({
      motCanvasScreen,
      renderFunction: renderMot({ ...state, isProbe: true }),
      responses: skipOnS
    }),
    new html.Screen(instruction4),
    new canvas.Screen({
      motCanvasScreen,
      renderFunction: renderMot(state),
      responses: skipOnS
    }),
    new html.Screen(pointsScreen(state)),
    new html.Screen(finalScreen)
  ]
})

MOT.run()

MOT.on('run', () => {
  jatos.submitResultData(JSON.parse(sessionStorage.data))
})

MOT.on('end', () => {
  let prevData = JSON.parse(sessionStorage.data)
  sessionStorage.data = JSON.stringify({ ...prevData, score: state.score })
  console.log(sessionStorage.data)
  jatos.endStudy(JSON.parse(sessionStorage.data), true, sessionStorage.data)
})
