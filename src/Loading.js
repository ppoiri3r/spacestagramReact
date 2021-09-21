// import { computeHeadingLevel } from '@testing-library/react';
// import astronaut from './assets/astronaut.png';
// import gif from './assets/giphy.gif'
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

function Loading() {
  const pageRef = useRef();
  useEffect(() => {
    gsap.to(pageRef.current, {opacity: 0, duration: 8})
  }, []);

  return (
    <div className="loader">
      <span className="circle"></span>
      <span className="circle"></span>
      <span className="circle"></span>
    </div>
  )
}

export default Loading;