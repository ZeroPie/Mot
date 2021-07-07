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
  getNumberOfSelectedCircles,
  makeFullScreenContainer
} from './helpers.js'

/**
 * @param  {number} ts - time
 * @param  {HTMLElement} canvas
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {LabJsScreen} screen
 */
export const renderMot = state => (ts, canvas, ctx, screen) => {
  canvas.classList.add('canvas')
  const containerEle = makeFullScreenContainer()

  let canvasWidth = (canvas.width = containerEle.offsetWidth)
  let canvasHeight = (canvas.height = containerEle.offsetHeight)

  const container = { x: 0, y: 0, w: canvasWidth, h: canvasHeight }

  const drawCircle = create2DCircle(ctx)
  const moveCircle = createCircleMovement(container)

  /** [1] Can be used for interactive debugging
   * const showState = createStateInfo(ctx)(state)
   * const showCircleStats = createCircleStats(ctx)
   **/

  state.circles = createSuffledCircles(7, state.velocity)

  const advanceLvl = () => {
    state.fails = 0
    state.tries = 2
    state.velocity *= 1.05
    state.score += 11
  }

  const looseLife = () => {
    state.fails += 1
    if (state.fails >= 2) {
      state.tries -= 1
    }
  }

  const setupState = () => {
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

    state.tries > 0 ? startRound() : finishGame()

    // Participants Trial which is not counted
    if (state.isProbe) {
      if (state.currentRound > 3) {
        screen.end()
      }
    }
  }

  const finishGame = () => {
    screen.options.datastore.set('score', state.score)
    screen.end()
  }

  const updateState = () => {
    evalAnswers()
    state.circles.map(drawCircle)
  }

  /**
   * @param  {number} offsetX
   * @param  {number} offsetY
   */
  const handleClick = ({ offsetX: x, offsetY: y }) => {
    if (!state.isRunning) {
      highlightAnswers(x, y)
      updateState()
    }
  }

  canvas.addEventListener('click', handleClick)

  /**
   * @param  {number} x
   * @param  {number} y
   */
  const highlightAnswers = (x, y) =>
    state.circles
      .filter(circle => isIntersect(x, y, circle))
      .map(toggleWhiteFill)

  const run = () => {
    clearCanvas()

    const animate = compose(
      //[1] showState,
      drawCircle,
      moveCircle
    )

    if (state.isRunning) {
      state.animationFrameReq = requestAnimationFrame(run)
      state.circles.map(animate)
    }
  }
  /**
   * @param  {string} fillStyle='black'
   */
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
    setupState()
    screen.options.datastore.set('score', state.score)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    requestAnimationFrame(run)

    const directionChangeId = setInterval(
      randomDirectionChange,
      state.moveTime / 10
    )
    const velolcityChangeId = setInterval(
      randomVelocityChange,
      state.moveTime / 7
    )
    setTimeout(() => stop(directionChangeId, velolcityChangeId), state.moveTime)

    setTimeout(turnAllCirclesGreen, state.moveTime / 5)
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
