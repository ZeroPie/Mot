import {renderMot} from './src/index.js'

const instructions1 = new lab.html.Screen({
  title: 'Anleitung',
  content: `
  <p> Es erscheinen 7 farbige Objekte auf dem Bildschirm:
  3 Blaue und 4 Grüne Kreise.
  <br> 
  <br> 
  Merken Sie sich welche Kreise blau sind.
  <br> 
  <br> 
  Nach drei Sekunden werden alle Kreise gruen und fangen an sich zufaellig zu bewegen
  <br> 
  <br> 
  Behalten Sie die urspruenglich blauen Kreise im Auge!
  <br> 
  <br> 
  Nach acht Sekunden bleibt alles stehen.
  <br> 
  <br> 
  Klicken Sie jetzt mit der Maus die drei urspruenglich baluen Kreise an.
  Klicken Sie einen Kreis ihn ihn nicht mehr auszuwaehlen.
  <br> 
  <br>
  Sobald Sie den dritten Kreis ausgewaehlt haben erschint die richtige Loesung auf dem Bildschirm
  <br>
  <br>
  Drücken Sie <kbd>Enter</kbd> um zum nächsten Feld zu gelangen  
  </p>

  
  `,

  responses: {
    'keypress(Enter)': 'response',
  },
})

const instructions2 = new lab.html.Screen({
  title: 'Anleitung',
  content: `
  <p>
  <br> 
  <br>
  Wenn Sie fragen haben, merken Sie sich an den Leiter des Experiments
  <br>
  <br>
  Drücken Sie <kbd>Enter</kbd> um zum nächsten Feld zu gelangen
  <br>
  </p>
  `,

  responses: {
    'keypress(Enter)': 'response',
  },
})

const instructions3 = new lab.html.Screen({
  title: 'Anleitung',
  content: `
  <p>
  <br> 
  <br>
  Zuerst erfolgt ein Probedurchlauf
  <br>
  <br>
  Die Ergebnisse werden nicht gewertet.
  <br>
  <br>
  Drücken Sie die <kbd>Leertaste</kbd> um zu beginnen.
  <br>
  </p>
  `,

  responses: {
    'keypress(Space)': 'response',
  },
})

const instructions4 = new lab.html.Screen({
  title: 'Anleitung 3',
  content: `
  <img src=">
  `,

  responses: {
    'keypress(Enter)': 'response',
  },
})


const canvasScreen = new lab.canvas.Screen({
  renderFunction: renderMot
})

const MOT = new lab.flow.Sequence({
  content: [
    canvasScreen,
    instructions1,
    instructions2,
    instructions3,
    instructions4,
    new lab.html.Screen({ content: 'I', timeout: 500 }),
    //new lab.html.Screen({ content: 'walk', timeout: 500 }),
  ],
})

MOT.run()
