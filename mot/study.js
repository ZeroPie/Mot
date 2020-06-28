const instructions1 = new lab.html.Screen({
  title: 'Anleitung',
  content: `
  <p class = 'test'> Es erscheinen verschiedene Objekte auf dem Bildschirm.
  Zählen Sie laut die Anzahl der dunkelblauen Kreise und wiederholen Sie laut die gesamte Anzahl. 
  <br> 
  <br>
  Drücken Sie sofort die <kbd>Leertaste</kbd>.
  Also zum Beispiel bei vier dunkelblauen Kreisen: 
  "1, 2, 3, 4, ..., 4 - <kbd>Leertaste</kbd>"
  Merken Sie sich die gesamte Anzahl pro Bild - diese wird später abgefragt 
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
  title: 'Anleitung 2',
  content: `
  <p> Nach einigen Bildern erscheint eine Eingabemaske.
  <br> 
  <br>
  Tragen Sie jetzt die gemerkten Zahlen in der richtigen Reihenfolge ein.
  <br>
  <br>
  Wenn Sie eine Zahl nicht mehr wissen, lassen Sie das entsprechende Feld frei.
  <br>
  <br>
  Drücken Sie <kbd>Enter</kbd> um zum nächsten Feld zu gelangen
  <br>
  `,

  responses: {
    'keypress(Enter)': 'response',
  },
})

const instructions3 = new lab.html.Screen({
  title: 'Anleitung 3',
  content: `
  <p> Zählen Sie laut und sorgfälltig mit und merken Sie sich die Zahlen gut
  <br> 
  <br>
  Wenn Sie fragen haben, merken Sie sich an den Leiter des Experiments
  <br>
  <br>
  Drücken Sie <kbd>Enter</kbd> um zum nächsten Feld zu gelangen
  <br>
  `,

  responses: {
    'keypress(Enter)': 'response',
  },
})

const MOT = new lab.flow.Sequence({
  content: [
    instructions1,
    instructions2,
    instructions3,
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
