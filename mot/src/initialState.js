const initialState = {
  velocity: 1,
  circles: [],
  answers: 0,
  currentRound: 0,
  isRunning: true,
  animationFrameReq: '',
  correctRatio: 0,
  score: 500,
  tries: 2,
  moveTime: 1000,
  fails: 0,
  velocityChangeProbablity: 0.3,
  directionChangeProbablity: 0.3,
  rounds: [{ number: 0 }],
  correctAnswers: 0
}

export default initialState
