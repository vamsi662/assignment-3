import {Component} from 'react'
import TabItem from '../TabItem'
import ThumbnailItem from '../ThumbnailItem'
import './index.css'

class Match extends Component {
  state = {
    score: 0,
    activeTabId: 'FRUIT',
    gameOver: false,
    sec: 60,
    imageurl: '',
    idOfImage: '',
  }

  componentDidMount() {
    const {imagesList} = this.props
    console.log(imagesList)
    const sizeOfImagesList = imagesList.length
    console.log(sizeOfImagesList)
    const randomIndex = Math.floor(Match.random * imagesList.length)
    const imageObject = imagesList[randomIndex]
    const {imageUrl, id} = imageObject
    this.stopTimer = setInterval(this.runTimer, 1000)
    this.setState({
      imageurl: imageUrl,
      idOfImage: id,
    })
  }

  runTimer = () => {
    this.setState(prevState => ({sec: prevState.sec - 1}))
  }

  onClickTab = id => {
    const {tabsList} = this.props
    const tabObject = tabsList.find(eachTab => eachTab.tabId === id)
    this.setState({activeTabId: tabObject.tabId})
  }

  onClickThumbnail = id => {
    const {idOfImage} = this.state
    const {imagesList} = this.props
    const matchSuccess = idOfImage === id
    if (matchSuccess === false) {
      clearInterval(this.stopTimer)
      this.setState({gameOver: true})
    } else {
      const randomIndex = Math.floor(Match.random * imagesList.length)
      const imageObject = imagesList[randomIndex]
      const {imageUrl} = imageObject
      this.setState(prevState => ({
        imageurl: imageUrl,
        score: prevState.score + 1,
      }))
    }
  }

  displayResult = () => {
    clearInterval(this.stopTimer)
    this.setState({gameOver: true})
  }

  onClickPlayAgain = () => {
    const imageObject = this.getImage()
    const {imageUrl, id} = imageObject
    this.setState({
      score: 0,
      activeTabId: 'FRUIT',
      gameOver: false,
      sec: 60,
      imageurl: imageUrl,
      idOfObject: id,
    })
    this.runTimer()
  }

  getImage = () => {
    const {imagesList} = this.props
    const randomIndex = Math.floor(Match.random * imagesList.length)
    const imageObject = imagesList[randomIndex]
    const {imageUrl, id} = imageObject
    const returnObject = {imageUrl, id}
    return returnObject
  }

  render() {
    const {activeTabId, gameOver, imageurl, score, sec} = this.state
    sec === 0 && this.displayResult()
    const {tabsList, imagesList} = this.props
    const filteredImagesList = imagesList.filter(
      eachImage => eachImage.category === activeTabId,
    )
    return (
      <div className="bg-con">
        <div className="main-con">
          <div className="header-con">
            <div className="logo-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                className="logo-image"
                alt="website logo"
              />
            </div>
            <div className="score-con">
              <p className="score">
                score: <span className="score-span">{score}</span>
              </p>
              <div className="timer-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  className="timer-image"
                />
                <p className="sec">{sec} sec</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main-con-2">
          {gameOver && (
            <div className="result-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
              />
              <p className="your-score">YOUR SCORE</p>
              <p className="result-score">{score}</p>
              <div>
                <button
                  type="button"
                  className="playagain-btn"
                  onClick={this.onClickPlayAgain}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    alt="play again"
                  />
                  PLAY AGAIN
                </button>
              </div>
            </div>
          )}
          {!gameOver && (
            <div className="sub-con">
              <div>
                <img src={imageurl} alt="match" className="image" />
              </div>
              <ul className="tabs-list">
                {tabsList.map(eachTab => (
                  <TabItem
                    tabDetails={eachTab}
                    onClickTab={this.onClickTab}
                    key={eachTab.tabId}
                    isTabActive={activeTabId === eachTab.tabId}
                  />
                ))}
              </ul>
              <ul className="thumbnail-list">
                {filteredImagesList.map(eachThumbnail => (
                  <ThumbnailItem
                    thumbnailDetails={eachThumbnail}
                    key={eachThumbnail.id}
                    onClickThumbnail={this.onClickThumbnail}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Match
