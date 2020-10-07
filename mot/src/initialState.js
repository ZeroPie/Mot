const initialState = {
  velocity: 1,
  circles: [],
  answers: 0,
  name: '',
  currentRound: 0,
  isRunning: true,
  animationFrameReq: '',
  isProbe: false,
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

export default initialState
