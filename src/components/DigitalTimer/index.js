import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {minutesCount: 25, secsCount: 0, isStarted: false}

  clearTimeInterval = () => clearInterval(this.intervalId)

  onClickMinus = () => {
    const {minutesCount} = this.state
    if (minutesCount > 1) {
      this.setState(previousState => ({
        minutesCount: previousState.minutesCount - 1,
      }))
    }
  }

  onCLickPlus = () => {
    this.setState(previousState => ({
      minutesCount: previousState.minutesCount + 1,
    }))
  }

  onClickStart = () => {
    this.setState(previousState => ({secsCount: previousState.secsCount - 1}))
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState({minutesCount: 25, secsCount: 0, isStarted: false})
  }

  onStartOrPauseTimer = () => {
    const {isStarted, minutesCount, secsCount} = this.state

    const isTimeCompleted = secsCount === minutesCount * 60
    if (isTimeCompleted) {
      this.setState({secsCount: 0})
    }
    if (isStarted) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.onIncrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isStarted: !prevState.isStarted,
    }))
  }

  onIncrementTimeElapsedInSeconds = () => {
    const {minutesCount, secsCount} = this.state
    const isTimerCompleted = secsCount === minutesCount * 60
    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({
        secsCount: prevState.secsCount + 1,
      }))
    }
  }

  gettingTimeFormat = () => {
    const {minutesCount, secsCount} = this.state
    const totalSecsRemaining = minutesCount * 60 - secsCount
    const minutes = Math.floor(totalSecsRemaining / 60)
    const seconds = Math.floor(totalSecsRemaining % 60)
    const minutesFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsFormat = seconds > 9 ? seconds : `0${seconds}`

    return `${minutesFormat}:${secondsFormat}`
  }

  render() {
    const {minutesCount, secsCount, isStarted} = this.state
    const isButtonDisabled = secsCount > 0

    const startOrPauseImageUrl = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isStarted ? 'pause icon' : 'play icon'
    const timerText = isStarted ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="second-container">
          <div className="clock-container">
            <div className="clock-sub-container">
              <h1 className="time">{this.gettingTimeFormat()}</h1>
              <p className="clock-status">{timerText}</p>
            </div>
          </div>

          <div className="timer-options-container">
            <div className="option-container">
              <button type="button" className="start-btn each-option">
                <img
                  src={startOrPauseImageUrl}
                  alt={startOrPauseAltText}
                  className="image"
                  onClick={this.onStartOrPauseTimer}
                />
                <p className="clock-status">{isStarted ? 'Pause' : 'Start'}</p>
              </button>

              <button type="button" className="start-btn each-option">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="image"
                  onClick={this.onResetTimer}
                />
                <p className="clock-status">Reset</p>
              </button>
            </div>

            <div className="limit-container">
              <p className="limit-heading">Set Timer Limit</p>
              <div className="limit-inc-dec-container">
                <button
                  className="inc-dec-btn"
                  type="button"
                  onClick={this.onClickMinus}
                  disabled={isButtonDisabled}
                >
                  -
                </button>
                <p className="time-set">{minutesCount}</p>
                <button
                  className="inc-dec-btn"
                  type="button"
                  onClick={this.onCLickPlus}
                  disabled={isButtonDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
