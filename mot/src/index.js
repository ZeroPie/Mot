import {
  createSuffledCircles,
  createCircleStats,
  create2DCircle,
  createCircleMovement,
  createStateInfo,
  getNumberOfCorrectAnswers,
  isIntersect,
  toggleWhiteFill,
  getNumberOfSelectedCircles
} from './helpers.js'

export const renderMot = datastore => (ts, canvas, ctx, obj) => {
  const compose = (...functions) => args =>
    functions.reduceRight((arg, fn) => fn(arg), args)

  canvas.classList.add('canvas')

  canvas.webkitRequestFullScreen()

  let canvasWidth = canvas.width
  let canvasHeight = canvas.height

  const container = { x: 0, y: 0, w: canvasWidth, h: canvasHeight }

  const state = {
    velocity: 5,
    circles: [],
    answers: 0,
    currentRound: 0,
    isRunning: true,
    animationFrameReq: '',
    correctRatio: 0,
    score: 500,
    tries: 2,
    moveTime: 8000,
    fails: 0,
    velocityChangeProbablity: 0.3,
    directionChangeProbablity: 0.3,
    rounds: [{ number: 0 }],
    correctAnswers: 0
  }

  const drawCircle = create2DCircle(ctx)
  const moveCircle = createCircleMovement(container)
  const showState = createStateInfo(ctx)(state)

  const showCircleStats = createCircleStats(ctx)
  //window.addEventListener("resize", resizeCanvas);

  state.circles = createSuffledCircles(7, state.velocity)

  const advanceLvl = () => {
    state.fails = 0
    state.tries = 2
    state.velocity *= 2
  }
  const evalAnswers = () => {
    state.answers = state.circles.reduce(getNumberOfSelectedCircles, 0)

    // Answered 3 times End Answering Phase
    if (state.answers === 3) {
      state.answers = 0
      state.currentRound += 1
      state.correctRatio = state.correctAnswers / 3
      state.correctAnswers = state.circles.reduce(getNumberOfCorrectAnswers, 0)

      if (state.correctAnswers === 3) {
        advanceLvl()
      }

      if (state.correctAnswers < 3) {
        state.fails += 1
        if (state.fails >= 2) {
          state.tries -= 1
        }
      }

      state.rounds.push({
        number: state.currentRound,
        correctAnswers: state.correctAnswers
      })

      state.circles = createSuffledCircles(7, state.velocity)
      state.isRunning = true
      state.correctAnswers = 0
      if (state.tries > 0) {
        startRound()
      } else {
        alert('Ende')
        clearCanvas()
      }
    }
  }

  const updateState = () => {
    evalAnswers()
    showState()
    updateScore(109)
    clearCanvas()
    state.circles.map(drawCircle)
  }

  const updateScore = score => {
    datastore.set('score', score)
    console.log(score)
  }

  const handleClick = ({ offsetX: x, offsetY: y }) => {
    if (!state.isRunning) {
      highlightAnswers(x, y)
      updateState()
      showState()
    }
  }

  canvas.addEventListener('click', handleClick)

  const highlightAnswers = (x, y) =>
    state.circles
      .filter(circle => isIntersect(x, y, circle))
      .map(toggleWhiteFill)

  canvas.addEventListener('click', () => console.log(state))

  const run = () => {
    clearCanvas()

    const animate = compose(showState, drawCircle, moveCircle)

    if (state.isRunning) {
      state.animationFrameReq = requestAnimationFrame(run)
      state.circles.map(animate)
    }
  }

  const clearCanvas = () => {
    const { x, y, w, h } = container
    ctx.fillStyle = 'black'
    ctx.fillRect(x, y, w, h)
  }

  const stop = (intervalId, velChangeId) => {
    cancelAnimationFrame(state.animationFrameReq)
    clearInterval(intervalId)
    clearInterval(velChangeId)
    state.isRunning = false
  }

  const startRound = () => {
    datastore.set('score', 500)
    console.log('datastore', datastore)
    console.log('state', state)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    if (state.correctRatio === 1) {
      state.velocity = state.velocity + state.velocity * 0.05
    }

    requestAnimationFrame(run)
    state.isRunning = true
    const dirChangeId = setInterval(randomDirectionChange, state.moveTime / 4)
    const velChangeId = setInterval(randomVelocityChange, state.moveTime / 4)
    setTimeout(() => stop(dirChangeId, velChangeId), state.moveTime)

    setTimeout(turnAllCirclesGreen, state.moveTime / 2)
  }

  const turnAllCirclesGreen = () =>
    state.circles.map(circle => (circle.color = 'green'))

  const randomVelocityChange = () => {
    state.circles.map(circle => {
      if (Math.random() < state.velocityChangeProbablity) {
        circle.vy *= 2
        circle.vx *= 2
        setTimeout(() => {
          circle.vy /= 2
          circle.vx /= 2
        }, 500)
      }
    })
  }

  const randomDirectionChange = () => {
    state.circles.map(circle => {
      const { vx, vy } = circle
      if (Math.random() < state.directionChangeProbablity) {
        if (Math.random() < state.directionChangeProbablity) {
          circle.vy = -vx
        } else {
          circle.vx = -vy
        }
      }
    })
  }

  startRound()
}
