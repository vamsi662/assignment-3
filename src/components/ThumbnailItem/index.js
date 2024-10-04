import './index.css'

const ThumbnailItem = props => {
  const {thumbnailDetails, onClickThumbnail} = props
  const {thumbnailUrl, id} = thumbnailDetails
  const thumbnailClick = () => {
    onClickThumbnail(id)
  }
  return (
    <li className="item">
      <button type="button" className="thumbnail-btn" onClick={thumbnailClick}>
        <img src={thumbnailUrl} className="thumbnail-image" alt="thumbnail" />
      </button>
    </li>
  )
}

export default ThumbnailItem
