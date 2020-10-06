import {
  createSuffledCircles,
  createCircleStats,
  create2DCircle,
  createCircleMovement,
  createStateInfo,
  getNumberOfCorrectAnswers,
  isIntersect,
  toggleWhiteFill,
  compose,
  getNumberOfSelectedCircles
} from './helpers.js'

const makeFullScreenContainer = () => {
  const containerEle = document.getElementById('container')
  const main = document.getElementById('main')
  containerEle.classList.add('-frameless')
  main.classList.add('-frameless')
  return containerEle
}

export const renderMot = state => (ts, canvas, ctx, screen) => {
  canvas.classList.add('canvas')
  const containerEle = makeFullScreenContainer()

  let canvasWidth = (canvas.width = containerEle.offsetWidth)
  let canvasHeight = (canvas.height = containerEle.offsetHeight)

  const container = { x: 0, y: 0, w: canvasWidth, h: canvasHeight }

  const drawCircle = create2DCircle(ctx)
  const moveCircle = createCircleMovement(container)
  const showState = createStateInfo(ctx)(state)

  const showCircleStats = createCircleStats(ctx)

  state.circles = createSuffledCircles(7, state.velocity)

  const advanceLvl = () => {
    state.fails = 0
    state.tries = 2
    state.velocity *= 1.05
    state.score += 15
  }

  const looseLife = () => {
    state.fails += 1
    if (state.fails >= 2) {
      state.tries -= 1
    }
  }

  const setupNextRound = () => {
    state.answers = 0
    state.currentRound += 1
    state.circles = createSuffledCircles(7, state.velocity)
    state.isRunning = true
    state.correctAnswers = 0
  }

  const updateRound = () => {
    state.correctRatio = state.correctAnswers / 3
    state.correctAnswers = state.circles.reduce(getNumberOfCorrectAnswers, 0)
  }

  const evalAnswers = () => {
    state.answers = state.circles.reduce(getNumberOfSelectedCircles, 0)

    if (state.answers < 3) {
      return
    }

    updateRound()

    state.correctAnswers === 3 ? advanceLvl() : looseLife()

    state.rounds.push({
      number: state.currentRound,
      correctAnswers: state.correctAnswers
    })

    setupNextRound()

    if (state.tries > 0) {
      startRound()
    } else {
      clearCanvas('white')
      screen.options.datastore.set('score', state.score)
      const resultJson = study.options.datastore.exportJson()
      screen.end()
    }
  }

  const updateState = () => {
    evalAnswers()
    updateScore(state.score)
    state.circles.map(drawCircle)
  }

  const updateScore = score => {
    screen.options.datastore.set('score', score)
  }

  const handleClick = ({ offsetX: x, offsetY: y }) => {
    if (!state.isRunning) {
      highlightAnswers(x, y)
      updateState()
    }
  }

  canvas.addEventListener('click', handleClick)

  const highlightAnswers = (x, y) =>
    state.circles
      .filter(circle => isIntersect(x, y, circle))
      .map(toggleWhiteFill)

  const run = () => {
    clearCanvas()

    const animate = compose(
      //showState,
      drawCircle,
      moveCircle
    )

    if (state.isRunning) {
      state.animationFrameReq = requestAnimationFrame(run)
      state.circles.map(animate)
    }
  }

  const clearCanvas = (fillStyle = 'black') => {
    const { x, y, w, h } = container
    ctx.fillStyle = fillStyle
    ctx.fillRect(x, y, w, h)
  }

  const stop = (directionChangeId, velolcityChangeId) => {
    state.isRunning = false
    clearCanvas('grey')
    state.circles.map(drawCircle)
    cancelAnimationFrame(state.animationFrameReq)
    clearInterval(directionChangeId)
    clearInterval(velolcityChangeId)
  }

  const startRound = () => {
    screen.options.datastore.set('score', state.score)

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    requestAnimationFrame(run)
    state.isRunning = true
    const directionChangeId = setInterval(
      randomDirectionChange,
      state.moveTime / 4
    )
    const velolcityChangeId = setInterval(
      randomVelocityChange,
      state.moveTime / 4
    )
    setTimeout(() => stop(directionChangeId, velolcityChangeId), state.moveTime)

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
