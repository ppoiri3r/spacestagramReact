import { useEffect, useRef, useState } from 'react';
import SubNav from './SubNav.js'
import { gsap } from 'gsap';
function Nav({likedSubNav}) {
  // saved likes functionality
  const savedLikesRef = useRef();
  const [click, setClick] = useState(false);
  // const handleClick = () => {
  //   setClick(!click);
  // }

  const navRef = useRef();
  useEffect(() => {
    gsap.from(navRef.current, {y: -100, opacity: 0})
    gsap.to(navRef.current, { y: 0, duration: 1, opacity: 1});
  }, []);

  return (
  <nav ref={navRef}>
    <div className="wrapper navContent">
      <p className="logo">spacestagram</p>
      <div className="navButtons">
        <button title="Home"><span className="sr-only">Click here for home feed</span><i className="fas fa-home"></i></button>
        <button title="Saved Likes" onClick={() => setClick(!click)}><span className="sr-only">Click here to view your saved likes</span><i className="far fa-heart"></i></button>
      </div>
      {/* <section className="savedLikes wrapper"> */}
      <section ref={savedLikesRef} className={click ? 'savedLikes active' : 'savedLikes inactive'}>
        <h4 className="savedLikesHeading">Your Likes</h4>
        <ul className="savedLikesPosts">
          {
            likedSubNav.map((liked) => {
              return (
                <SubNav
                image={liked.url}
                title={liked.title}
                />
              )
            })
          }
        </ul>
      </section>
    </div>
  </nav>
  )
}

export default Nav;