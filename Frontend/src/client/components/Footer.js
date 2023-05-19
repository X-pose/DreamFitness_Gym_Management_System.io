import React from 'react'
import { useRef } from "react";
import { useEffect } from "react";
import '../../public/css/footer.css'
import videoFile2 from '../../public/Videos/foot.mp4'
export default function Footer() {

    const videoRef2 = useRef(null);



    useEffect(() => {
        videoRef2.current.play();
      }, []);
    










  return (
    <div>
         
        <div className='containerfooter'>

        <video className="background-video2" ref={videoRef2} src={videoFile2} autoPlay muted loop />
            <div className='child1'>

            <h1 className='hugedmf'>DMF</h1>
            </div>

            
            <div className='child1'>
                <div className='contentfoot'>
            <b className='bigbig'>CONTACT INFO</b>
            <br></br>
            <br></br>
            No,101/3 <br></br>
            New Kandy Rd, <br></br>
            Kaduwela,10640<br></br>
            <br></br>
            dreamfitness@gmail.com<br></br>
            011 1231239
            </div>
            </div>


            
            <div className='child1'>
            <div className='contentfoot'>
            <b className='bigbig'>QUICK LINKS
            </b>
            <br></br>
            <br></br>
            FEEDBACK<br></br>
            FAQ<br></br>
            OUR CREW<br></br>
            GALLERY
            </div>
            </div>


            
            <div className='child1'>
            <div className='contentfoot'>
            <b className='bigbig'>CLUB HOURS
            </b>
            <br></br>
            <br></br>
            Monday-Thursday 5am-9:00pm<br></br>
            Friday 5am-7:30pm<br></br>
            Saturday-Sunday 7am-6pm<br></br>
            </div>
            </div>







        </div>
  
    </div>
  )
}