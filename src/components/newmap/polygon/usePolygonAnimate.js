import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const usePolygonAnimate = (delay = 0) => {
  const polygonRef = useRef(null);

  useEffect(() => {
    const el = polygonRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        snap: {
          ease: 'power.out',
        },
        start: 'top',
        end: 'bottom',
      },
    });

    tl.fromTo(el, { scale: 0 }, { scale: 1.3, duration: 1 })
      .to(el, { scale: 1, duration: 1 })
      .to(el, {
        scale: 1.2,
        transform: 'translate(-10px, -10px',
        duration: 1,
        repeat: -1,
        yoyo: true,
        delay,
      });
  }, [delay]);

  return polygonRef;
};

export default usePolygonAnimate;
