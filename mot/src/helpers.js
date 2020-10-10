const resizeCanvas = () => {
  canvasHeight = window.innerHeight
  canvasWidth = window.innerWidth
}

export const compose = (...functions) => args =>
  functions.reduceRight((arg, fn) => fn(arg), args)

const createRandomPosX = (min = 20, max = 1400) =>
  Math.trunc(Math.random() * (max - min) + min)


const createRandomPosY = (min = 20, max = 800) =>
Math.trunc(Math.random() * (max - min) + min)

const direction = velocity => (Math.random() < 0.5 ? velocity * -1 : velocity)

export const createCircle = ({
  id,
  x,
  y,
  r,
  vx,
  vy,
  color,
  initialColor,
  isSelected
}) => ({
  id,
  x,
  y,
  r,
  vx,
  vy,
  color,
  initialColor,
  isSelected
})

export const createCircles = (length, velocity) =>
  Array.from({ length }, (_, i) =>
    i <= 2
      ? createCircle({
          id: i,
          x: createRandomPosX(),
          y: createRandomPosY(),
          r: 20,
          vx: direction(velocity),
          vy: direction(velocity),
          color: 'blue',
          isSelected: false,
          initialColor: 'blue'
        })
      : createCircle({
          id: i,
          x: createRandomPosX(),
          y: createRandomPosY(),
          r: 20,
          vx: direction(velocity),
          vy: direction(velocity),
          color: 'green',
          isSelected: false,
          initialColor: 'green'
        })
  )

export const createSuffledCircles = (length, velocity) =>
  createCircles(length, velocity)
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])

export const createCircleStats = ctx => circle => {
  const { id, x, y, r, vx, vy, initialColor, isSelected } = circle
  ctx.font = '10px'
  ctx.fillStyle = 'red'
  ctx.textAlign = 'center'
  ctx.fillText(
    `id: ${id}, x: ${x}, y: ${y}, r: ${r} vx: ${vx}, vy: ${vy}, initialColor: ${initialColor}, isSelected: ${isSelected}`,
    x,
    y
  )
}

export const createCircleMovement = container => circle => {
  const { x, y, r, vx, vy, initialColor, ...rest } = circle

  if (x - r + vx < container.x || x + r + vx > container.x + container.w) {
    circle.vx = -vx
  }
  if (y + r + vy > container.y + container.h || y - r + vy < container.y) {
    circle.vy = -vy
  }
  circle.x += vx
  circle.y += vy

  return { x, y, r, vx, vy, initialColor, ...rest }
}

export const create2DCircle = ctx => ({
  x,
  y,
  r,
  color,
  initialColor,
  ...rest
}) => {
  let path2d = new Path2D()
  path2d.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill(path2d)
  return { path2d, x, y, r, color, initialColor, ...rest }
}

export const createStateInfo = ctx => state => () => {
  const {
    isRunning = false,
    score = 0,
    answers = 0,
    rounds = [],
    velocity = 0,
    currentRound = 0
  } = state
  ctx.font = '20px'
  ctx.fillStyle = 'orange'
  ctx.fillText(
    `isRunning: ${isRunning}
    score: ${score}
    answers: ${answers}
    round: ${rounds[currentRound].number}
    velocity: ${velocity}
    `,
    100,
    20
  )
}

const isCorrect = ({ initialColor, isSelected }) =>
  isSelected && initialColor === 'blue'

const isSelected = ({ isSelected }) => isSelected

export const getNumberOfCorrectAnswers = (acc, current) => {
  if (isCorrect(current)) {
    acc += 1
  }
  return acc
}

export const getNumberOfSelectedCircles = (acc, current) => {
  if (isSelected(current)) {
    acc += 1
  }
  return acc
}

export const isIntersect = (x, y, circle) =>
  Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2) < circle.r + 1

export const toggleWhiteFill = circle => {
  if (circle.isSelected === false) {
    circle.color = 'white'
    circle.isSelected = true
  } else {
    circle.color = 'green'
    circle.isSelected = false
  }
}

export const scriptExists = url =>
  document.querySelectorAll(`script[src="${url}"]`).length > 0

export const makeFullScreenContainer = () => {
  const containerEle = document.getElementById('container')
  containerEle.classList.add('-frameless')
  const main = document.getElementById('main')
  main.classList.add('-frameless')
  return containerEle
}

export const enterFullScreen = () => {
  const docEle = document.documentElement

  if (docEle.requestFullscreen) {
    docEle.requestFullscreen()
  } else if (docEle.mozRequestFullScreen) {
    docEle.mozRequestFullScreen()
  } else if (docEle.webkitRequestFullScreen) {
    docEle.webkitRequestFullScreen()
  } else if (docEle.msRequestFullscreen) {
    docEle.msRequestFullscreen()
  }
}
