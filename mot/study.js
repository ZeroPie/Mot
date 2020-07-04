const welcomeScreen = new lab.html.Screen({
  title: 'Welcome',
  content: `
  <p> Willkommen zum Experiment:
  <br>
  <br>
  <span> Multiple Objekt Tracking 
  <br>
  <br>
 Drücken Sie <kbd>Enter</kbd> um zum nächsten Feld zu gelangen
  </p>
  `,

  responses: {
    'keypress(Enter)': 'response',
  },
})

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

const MOT = new lab.flow.Sequence({
  content: [
    welcomeScreen,
    instructions1,
    instructions2,
    new lab.html.Screen({ content: 'I', timeout: 500 }),
    //new lab.html.Screen({ content: 'walk', timeout: 500 }),
  ],
  events: {
    visibilitychange: function (event) {
      if (document.hidden) {
        alert(`Please don't change windows while the experiment is running`)
      }
    },
  },
})

MOT.run()
