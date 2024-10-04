import './index.css'

const TabItem = props => {
  const {tabDetails, isTabActive, onClickTab} = props
  const classname = isTabActive ? 'underline' : ''
  const {tabId, displayText} = tabDetails

  const tabClick = () => {
    onClickTab(tabId)
  }

  return (
    <li className={`tabItem ${classname}`}>
      <button type="button" className="tab-btn" onClick={tabClick}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
