<<<<<<< HEAD
let circles = [
  {
    id: 1,
    x: 500,
    y: 100,
    r: 10,
    vx: 3,
    vy: -3,
    color: 200,
  },
  {
    id: 2,
    x: 600,
    y: 300,
    r: 10,
    vx: -3,
    vy: 3,
    color: 200,
  },

  {
    id: 3,
    x: 500,
    y: 100,
    r: 10,
    vx: -3,
    vy: -3,
    color: 100,
  },
  {
    id: 4,
    x: 300,
    y: 500,
    r: 10,
    vx: 3,
    vy: 3,
    color: 100,
  },
  {
    id: 5,
    x: 10,
    y: 400,
    r: 10,
    vx: 3,
    vy: 3,
    color: 100,
  },
  {
    id: 6,
    x: 140,
    y: 50,
    r: 10,
    vx: 3,
    vy: 3,
    color: 100,
  },
  {
    id: 7,
    x: 10,
    y: 10,
    r: 10,
    vx: 3,
    vy: 3,
    color: 200,
  },
]
=======
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
>>>>>>> f6449a4ac35bccbd9ed78d5203d7db21ba4cf1b5

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

<<<<<<< HEAD
const instructions4 = new lab.html.Screen({
  title: 'Anleitung 3',
  content: `
  <img src=">
  `,

  responses: {
    'keypress(Enter)': 'response',
  },
})

const renderFunction = function (ts, canvas, context, obj) {
  const canvasWidth = (canvas.width = window.innerWidth)
  const canvasHeight = (canvas.height = window.innerHeight)
  const container = { x: 0, y: 0, width: canvasWidth, height: canvasHeight }

  const animate = () => {
    context.fillStyle = 'black'
    const { x, y, width, height } = container
    context.fillRect(x, y, width, height)
    start()
    animationFrameReq = requestAnimationFrame(animate)
  }

  const start = () => {
    circles.forEach(drawAndMoveCircles)
  }

  const drawCircle = (circle) => {
    let { x, y, r, color } = circle
    context.fillStyle = 'hsl(' + color + ', 100%, 50%)'
    context.beginPath()
    context.arc(x, y, r, 0, Math.PI * 2, true)
    context.fill()
    return circle
  }

  const moveCircle = (circle) => {
    const { x, y, r, vx, vy } = circle
    if (x - r + vx < container.x || x + r + vx > container.x + container.width) {
      circle.vx = -vx
    }
    if (y + r + vy > container.y + container.height || y - r + vy < container.y) {
      circle.vy = -vy
    }

    circle.x += vx
    circle.y += vy
  }

  const drawAndMoveCircles = (circle) => {
    moveCircle(drawCircle(circle))
  }

  function isIntersect(point, circle) {
    return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.r + 7
  }

  let running = true

  canvas.addEventListener('click', (e) => {
    if (!running) {
      resume()
    }

    const pos = {
      x: e.clientX,
      y: e.clientY,
    }
    circles.forEach((circle) => {
      if (isIntersect(pos, circle)) {
        console.log('click on circle: ' + circle.id)
      }
    })
  })

  const stop = () => {
    cancelAnimationFrame(animationFrameReq)
    running = false
  }

  const resume = () => {
    if (running) return
    requestAnimationFrame(animate)
    running = false
  }

  const turnCirclesGreen = () => {
    circles.forEach((circle) => (circle.color = 100))
  }

  setTimeout(turnCirclesGreen, 2000)
  setTimeout(stop, 6000)

  requestAnimationFrame(animate)
}

const canvasScreen = new lab.canvas.Screen({
  renderFunction: renderFunction,
})

const MOT = new lab.flow.Sequence({
  content: [
    canvasScreen,
=======



const MOT = new lab.flow.Sequence({
  content: [
    welcomeScreen,
>>>>>>> f6449a4ac35bccbd9ed78d5203d7db21ba4cf1b5
    instructions1,
    instructions2,
    instructions3,
    instructions4,
    new lab.html.Screen({ content: 'I', timeout: 500 }),
    //new lab.html.Screen({ content: 'walk', timeout: 500 }),
  ],
})

MOT.run()
