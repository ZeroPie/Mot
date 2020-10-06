import FullScreen from './FullScreen.js'
import CustomJs from './CustomJS.js'

export const instruction1 = {
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
    Behalten Sie die ursprünglich blauen Kreise im Auge!
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
    Drücken Sie <kbd>Leertaste</kbd> um zum nächsten Feld zu gelangen  
    </p>

    `,
  plugins: [new FullScreen()],

  responses: {
    'keypress(Space)': 'response'
  }
}

export const instruction2 = {
  title: 'Anleitung',
  content: `
    <p>
    <br> 
    <br>
    Wenn Sie fragen haben, merken Si e sich an den Leiter des Experiments
    <br>
    <br>
    Drücken Sie <kbd>Leertaste</kbd> um zum nächsten Feld zu gelangen
    <br>
    </p>
    `,

  responses: {
    'keypress(Space)': 'response'
  }
}

export const instruction3 = {
  title: 'Probedurchlauf',
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
    'keypress(Space)': 'response'
  }
}

export const instruction4 = {
  title: 'Testdurchlauf',
  content: `
    <p>
    <br> 
    <br>
    Jetzt erfolgt der Testdurchlauf
    <br>
    <br>
    Die Ergebnisse werden jetzt gewertet.
    <br>
    <br>
    Drücken Sie die <kbd>Leertaste</kbd> um zu beginnen.
    <br>
    </p>
    `,
  responses: {
    'keypress(Space)': 'response'
  }
}

export const motCanvasScreen = {
  responses: {
    'keypress(r)': 'r'
  }
}

export const pointsScreen = {
  title: 'Ende',
  content: `
    <p>
    <br> 
    <br>
    Ihre Punktanzahl:
    <br>
    <br>
    <span id="score">  </span>
    <br>
    <br>
    Drücken Sie die <kbd>Leertaste</kbd> Taste um das Experiment zu beenden.
    <br>
    </p>
    `,
  plugins: [
    new CustomJs(() => {
      const scoreElement = document.getElementById('score')
      console.log(scoreElement)
      console.log(state.score)
    })
  ],
  responses: {
    'keypress(Space)': 'response'
  }
}

export const finalScreen = {
  title: 'Danke',
  content: `Danke`,
  timeout: 500
}
