import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CardItem = ({ item, index, isMobile }) => {
    
    const AnimateCardOnScreen = {
        offscreen: { y: "20%", opacity: 0 },
        onscreen: { y: "0%", opacity: 1 }
    }

    const controls = useAnimation();
    const [ref, inView] = useInView();
  
    useEffect(() => {
      if (inView) {
        controls.start("onscreen");
      }
    }, [controls, inView]);
  
    return (
      <motion.div
        variants={AnimateCardOnScreen}
        initial="offscreen"
        animate={controls}
        ref={ref}
        className={`card rounded-none bg-base-100 outline outline-1 outline-slate-200`}
        transition={{
          duration: .75,
          delay: isMobile < 768 ? .25 : (index % 3) - 0.25 < 0 ? 0.25 : ((index % 3) - 0.25 < 1.25 ? 0.75 : 1.25)
        }}
      >
        <figure>
          <img src={`http://localhost:5000/Images/${item.image}`} alt={item.bagName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title cursor default ">{item.bagName}</h2>
          {/* <p className='cursor-default'>{item.description}</p> */}
          <div className="card-actions justify-end">
            <Link to={`product/${item.bagName}`}><button className="btn btn-primary text-white no-animation">Details</button></Link>
          </div>
        </div>
      </motion.div>
    );
  };

export default CardItem;