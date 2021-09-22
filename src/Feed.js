import { useState } from 'react';
// credit for animated heart:
// https://www.npmjs.com/package/react-animated-heart
import Heart from 'react-animated-heart';

function Feed({description, imgSrc, title, date, handleLikeFunction, completePost, isItLiked}) {
  const [click, setClick] = useState(isItLiked);
  const handleClick = () => {
    setClick(!click);
    handleLikeFunction(click, completePost);
  }
  
  return (
    <li className="post wrapper">
      <div className="imageContainer">
        <img src={imgSrc} alt={title}/>
      </div>
      <div className="details">
        <button className="heart"><span class="sr-only">Click here to like this post</span><Heart isClick={click} onClick={handleClick}/></button>
        <div className="postInfo">
          <h2>{title} - {date}</h2>
          <p>{description}</p>
        </div>
      </div>
    </li>
  )
}

export default Feed;