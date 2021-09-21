import { useState } from 'react';
// credit for animated heart:
// https://www.npmjs.com/package/react-animated-heart
import Heart from 'react-animated-heart';

function Feed({description, imgSrc, title, date, handleLikeFunction, completePost, isItLiked}) {
  const [click, setClick] = useState(isItLiked);
  const handleClick = () => {
    setClick(!click);
    handleLikeFunction(click, completePost);
    // console.log(click, completePost)
  }
  
  return (
    <li className="post wrapper">
      <div className="imageContainer">
        <img src={imgSrc} alt={title}/>
      </div>
      <div className="details">
        <button className="heart" aria-label="Click here to like this post"><Heart isClick={click} onClick={handleClick} onTouchStart={handleClick} onTouch={handleClick}/></button>
        <div className="postInfo">
          <h2>{title} - {date}</h2>
          <p>{description}</p>
        </div>
      </div>
    </li>
  )
}

export default Feed;