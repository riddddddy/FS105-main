import React, { useContext, useEffect } from 'react';
import home2 from "../images/home/home2.jpg"
import home3 from "../images/home/home3.jpg"
import home4 from "../images/home/home4.jpg"
import home5 from "../images/home/home5.jpg"
import home6 from "../images/home/home6.jpg"
import home7 from "../images/home/home7-removebg.png"
import home8 from "../images/home/home8.jpg"
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { allData } from '../context/AppContext.js'
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatHomeVariants = {
  offscreen: { scale: 1.25 },
  onscreen: { scale: 1, transition: { duration: 2 } }
};

const AnimateImageHome8 = {
  offscreen: {
    scale: 1.50
  },
  onscreen: {
    scale: 1,
  }
}


const Home = () => {

  const {AnimateCard, AnimateTextVariants, AnimateZoomVariant} = useContext(allData);

  const controls = useAnimation();
  const [mainref, inView] = useInView();

  const controlsTwoImage = useAnimation()
  const [twoImageref, TwoinView] = useInView();
  
  const controlsCard = useAnimation();
  const [Cardref, CardinView] = useInView();

  const controlsBigImage = useAnimation()
  const [BigImageref, BigImageinView] = useInView();
  
  const controlsExperience = useAnimation()
  const [Experienceref, ExperienceinView] = useInView();
  



  useEffect(() => {
    if (inView) {
      controls.start("onscreen");
    }

    if(TwoinView)
    {
      controlsTwoImage.start("onscreen");
    }

    if(CardinView){
      controlsCard.start("onscreen");
    }

    if(BigImageinView)
    {
      controlsBigImage.start("onscreen");
    }

    if(ExperienceinView)
    {
      controlsExperience.start("onscreen");
    }

  }, [controls, inView, TwoinView, controlsTwoImage, CardinView, controlsCard, BigImageinView, controlsBigImage, ExperienceinView, controlsExperience]);

  return (
    <>
      <motion.div 
            initial="offscreen"
            animate={controls}
            ref={mainref}
            viewport={{ amount: 0.0}} className='overflow-hidden'>
        <motion.div 
            variants={AnimatHomeVariants}
            className="hero min-h-screen relative scale-125" style={{backgroundImage: 'url(https://cdn.discordapp.com/attachments/1199688598123978762/1207562448996016159/sdfsdf.jpg?ex=65e0192b&is=65cda42b&hm=999e0197794a387df7544917f862394e5b8f48eab48749d816ab7cafd542f9a5&)'}}>
          <div className="hero-overlay bg-opacity-0"></div>
          <div className="hero-content text-center text-base-100 sticky top-5">
            <motion.div className="mt-40"
              variants={AnimateTextVariants}
              transition={{duration: 2}}
            >
              <h1 className="mb-10 text-5xl italic font-light"> Crafted for Queens</h1>
              <p className="mb-10 italic font-normal">made for you </p>
              <Link to='/products'><button className="btn btn-primary text-white  rounded-none">Shop Now</button></Link>
            </motion.div>
          </div>   
        </motion.div>
      </motion.div>
      <motion.div 
        initial="offscreen"
        animate={controlsTwoImage}
        ref={twoImageref}
        viewport={{ amount: 0.0 }}
        className='overflow-hidden'>
        <div className="hero min-h-screen max-[768px]:flex-col flex">
            <div
                className='relative w-full md:w-1/2 overflow-hidden'>
                <motion.div 
                variants={AnimatHomeVariants}
                className='bg-cover bg-center flex items-center justify-center scale-125' style={{ backgroundImage: `url(${home2})`, minHeight: '100vh' }}>
          
                </motion.div>
                <motion.p
                  variants={AnimateTextVariants}
                  transition={{ duration: 2 }}
                 className="absolute top-[40%] transform translate-x-[-50%] translate-y-[-50%] w-full text-white text-center mt-48 text-4xl font-light">
                  Carry confidence, wherever you go.
                </motion.p>
            </div>

            <div
                className='relative w-full md:w-1/2 overflow-hidden'>
                <motion.div 
                variants={AnimatHomeVariants}
                className='bg-cover bg-center flex items-center justify-center scale-125' style={{ backgroundImage: `url(${home3})`, minHeight: '100vh' }}>
          
                </motion.div>
                <motion.p
                  variants={AnimateTextVariants}
                  transition={{ duration: 2 }}
                 className="absolute top-[40%] transform translate-x-[-50%] translate-y-[-50%] w-full text-white text-center mt-48 text-4xl font-light">
                 Your story, exquisitely crafted.
                </motion.p>
            </div>
          </div>
      </motion.div>
    <motion.div 
        initial="offscreen"
        ref={Cardref}
        animate={controlsCard}
        viewport={{ amount: 0.0 }}
        className="hero min-h-screen"
      >
        <div className="hero-content grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className='container flex flex-col items-center px-4'>
            <motion.div
              variants={AnimateCard}
              transition={{ duration: 1.25,
                ease: "backInOut",
                delay: 0
              }}
            >
              <img src={home4} className="max-w-full h-auto"/>
            </motion.div>
            <motion.div
              variants={AnimateTextVariants}
              transition={{ duration: 1.25,
                ease: "backInOut",
                delay: 0
              }}
            className='text-center mt-10'>
              <h6 className='font-bold underline'>PERSONALIZATION</h6>
            <p>We provide unique bags and items with initials to create a unique and special piece.</p>
            </motion.div>
          </div>

          <div className='container flex flex-col items-center px-4'>
            <motion.div
             variants={AnimateCard}
             transition={{ duration: 1.25,
               ease: "backInOut",
               delay: 0.20
             }}
            >
             <img src={home5} className="max-w-full h-auto"/>
            </motion.div>
            <motion.div 
              variants={AnimateTextVariants}
              transition={{ duration: 1.25,
                ease: "backInOut",
                delay: 0.20
              }}
            className='text-center mt-10'>
              <h6 className='font-bold underline'>PACKAGING</h6>
            <p>Choose our online exclusive tote bags to make a gift more personalized and special.</p>
            </motion.div>
          </div>

          <div className='container flex flex-col items-center px-4'>
          <motion.div
           variants={AnimateCard}
           transition={{ duration: 1.25,
             ease: "backInOut",
             delay: 0.30
           }}
          >
            <img src={home6} className="max-w-full h-auto"/>
          </motion.div> 
            <motion.div
            variants={AnimateTextVariants}
            transition={{ duration: 1.25,
              ease: "backInOut",
              delay: 0.30
            }}
            className='text-center mt-10'>
              <h6 className='font-bold underline'>COLLECT IN STORE</h6>
              <p>You can order online and collect your order from our nearest store to you.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div 
      initial="offscreen"
      ref={BigImageref}
      animate={controlsBigImage}
      viewport={{ amount: 0.0 }}
      className='hero min-h-screen' >
        <div className='hero-content grid grid-cols-1'>
          <div className='bg-[#D4D4D3] overflow-hidden'>
            <motion.img 
              variants={AnimateImageHome8}
              transition={{
                duration: 1.50
              }}
            src={home7} className=' w-full p-5'></motion.img>
          </div>
          <motion.p 
          variants={AnimateTextVariants}
          transition={{
            duration: 2
          }}
          className='text-center text-base-content'>Allow the Luxurialoom masterpiece to captivate you. Not simply a best-selling bag, it's a coveted expression of premium luxury designed for the woman who defines elegance. Imagine the exquisite touch of meticulously crafted materials, a timeless design that complements your signature style, and the quiet confidence it exudes with every step. This is not just an accessory; it's an investment in timeless sophistication, an iconic piece waiting to become yours. Discover why others have been swept away by its allure and elevate your everyday to the extraordinary. Embrace the Luxurialoom masterpiece, and let it tell your story of discerning taste and effortless refinement.</motion.p>
        </div>
        
      </motion.div>

      <motion.div 
       initial="offscreen"
       ref={Experienceref}
       animate={controlsExperience}
       viewport={{ amount: 0.3 }}
      className="hero min-h-screen ">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2">
          <motion.div
          variants={AnimateZoomVariant}
          transition={{
            duration: 1
          }}
          className="">
            <img src={home8}/>
          </motion.div>
            <motion.div 
            variants={AnimateTextVariants}
            transition={{
              duration: 1
            }}
            className="w-50 text-center ml-0 lg:ml-40">
              <p className='mb-10 text-base-content italic'>"Experience the unmatched quality and craftsmanship of our designer bags. Each stitch, each detail, is a testament to the heritage and expertise of these iconic brands. Owning a LuxuriaLoom bag is an investment in timeless luxury that will be cherished for generations to come."</p>
              <Link to='/products'><button className="btn btn-primary text-white no-animation rounded-none">See More</button></Link>
            </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
