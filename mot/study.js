import { renderMot } from './src/index.js'
import { instruction1, instruction2, instruction3, finalScreen } from './src/screens.js'

const createScreen = (screenOptions) => new lab.html.Screen(screenOptions) 

const datastore = new lab.data.Store()

const canvasScreen = new lab.canvas.Screen({
  renderFunction: renderMot(datastore),
  datastore,
  responses: {
    'keypress(r)': 'red',
  }  
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