import React, { useEffect, useContext } from 'react'
import ridwan from '../images/aboutUs/ridwan.png';
import alex from '../images/aboutUs/alex.png';
import julia from '../images/aboutUs/julia.jpg';
import vishal from '../images/aboutUs/vishal.jpeg';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { allData } from '../context/AppContext.js'


const AboutUs = () => {
    
    const controls = useAnimation();
    const [mainref, inView] = useInView();

    const controlsDescription = useAnimation();
    const [Descriptionref, DescriptioninView] = useInView();

    const {AnimateTextVariants, AnimateZoomVariant} = useContext(allData);

    useEffect(() => {
        if (inView) {
          controls.start("onscreen");
        }

        if(DescriptioninView)
        {
            controlsDescription.start("onscreen");
        }

    }, [inView, controls, controlsDescription, DescriptioninView])    

    return (

        <div>   
            <motion.div 
             initial="offscreen"
             animate={controls}
             ref={mainref}
             viewport={{ amount: 0.0}}
            className='container my-10 text-content text-center overflow-hidden'>
                <h2 className="text-3xl font-medium text-center mb-20 ">Our Team</h2>

                <div className='place-items-center text-center mb-30 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-4'>

                    <div className="card w-64 cent ">
                        <motion.figure 
                         variants={AnimateZoomVariant}
                         transition={{ duration: 1.25,
                           ease: "backInOut",
                           delay: 0
                         }}
                        className='rounded-box'><img className='w-64 h-64' src={ridwan} alt="ridwan" /></motion.figure>
                        <motion.div 
                          variants={AnimateTextVariants}
                          transition={{ duration: 1.25,
                            ease: "backInOut",
                            delay: 0.10
                          }}
                        className="card-body h-40">
                            <h3 className="card-title mx-auto font-normal">Ridwan</h3>
                            <p className=" mx-auto italic font-light text-base">Full Stack Developer</p>
                        </motion.div>
                    </div>

                    <div className="card w-64 bg-base-100">
                        <motion.figure 
                         variants={AnimateZoomVariant}
                         transition={{ duration: 1.25,
                           ease: "backInOut",
                           delay: 0.30
                         }}
                        className='rounded-box'><img className='w-64 h-64' src={julia} alt="julia" /></motion.figure>
                        <motion.div 
                          variants={AnimateTextVariants}
                          transition={{ duration: 1.25,
                            ease: "backInOut",
                            delay: 0.40
                          }} className="card-body h-40">
                            <h3 className="card-title mx-auto font-normal ">Julia</h3>
                            <p className=" mx-auto italic font-light text-base">Frontend Lead, Designer</p>
                        </motion.div>
                    </div>

                    <div className="card w-64 bg-base-100">
                        <motion.figure 
                         variants={AnimateZoomVariant}
                         transition={{ duration: 1.25,
                           ease: "backInOut",
                           delay: 0.60
                         }} className='rounded-box'><img className='w-64 h-64' src={alex} alt="alex" /></motion.figure>
                        <motion.div 
                          variants={AnimateTextVariants}
                          transition={{ duration: 1.25,
                            ease: "backInOut",
                            delay: 0.70
                          }} className="card-body h-40">
                            <h3 className="card-title mx-auto font-normal">Alex</h3>
                            <p className=" mx-auto italic font-light text-base">Backend Lead</p>
                        </motion.div>
                    </div>
                    <div className="card w-64 bg-base-100">
                        <motion.figure 
                          variants={AnimateZoomVariant}
                          transition={{ duration: 1.25,
                            ease: "backInOut",
                            delay: 0.90
                          }}
                        className='rounded-box'><img className='w-64 h-64' src={vishal} alt="vishal" /></motion.figure>
                        <motion.div 
                        variants={AnimateTextVariants}
                        transition={{ duration: 1.25,
                          ease: "backInOut",
                          delay: 1.00
                        }}
                        className="card-body h-40">
                            <h3 className="card-title mx-auto font-normal">Vishal</h3>
                            <h2 className="mx-auto italic font-light text-base">Backend Lead, Designer</h2>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div 
            ref={Descriptionref}
            initial="offscreen"
            animate={controlsDescription}
            className='container w-3/4 my-20 text-content text-left italic'>
                <motion.p 
                 variants={AnimateTextVariants}
                 transition={{ duration: 1.25,
                   ease: "backInOut",
                   delay: 0
                 }}
                className=''>We are a team of aspiring web developers who graduated from MAGES Institute of Excellence's Full Stack Web Development program. Over the past 6 months, we've honed our skills through rigorous coursework and collaborative projects, culminating in the creation of this very website you're exploring. Our journey at MAGES has equipped us with the technical expertise and teamwork spirit necessary to bring your digital vision to life. We're passionate about innovation, user experience, and pushing the boundaries of what's possible on the web. This website is just the beginning; we're eager to tackle new challenges and create even more impactful online experiences in the future. Feel free to browse our portfolio and contact us to discuss your web development needs. We're confident that our combined skills and dedication can help you achieve your online goals.</motion.p>
            </motion.div>





        </div>


    );

}

export default AboutUs