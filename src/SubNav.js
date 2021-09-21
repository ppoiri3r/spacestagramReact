function SubNav({image, title}) {
  return (
    <li className="savedPosts">
      <img className="savedPostImage" src={image} alt={title}/>
    </li>
  )
}

export default SubNav;