
import "../../public/css/Home.css"
import { useRef } from "react";
import { useEffect } from "react";
import videoFile from '../../public/Videos/er.mp4';
import videoFile2 from '../../public/Videos/edd.mp4';
import Footer from "../components/Footer";

function Homepage() {

  const videoRef = useRef(null);


  useEffect(() => {
    videoRef.current.play();
  }, []);



  return (
    <div className="App">



      <div className="ContainerHome">
        <div className="contone">

          <video ref={videoRef} src={videoFile} autoPlay muted loop className="video-background" />

          <div className="welcome">
            <a>Welcome To <br /><b className="redc">DREAM FITNESS</b> </a>

          </div>
          <div className="welcome2">
            <a>Your Journey Starts<br /> Here  </a>
          </div>
          <div className="welcome3">
            <a>We believe that everyone has the potential to be their best selves, and we're here to help you unlock that potential. Our state-of-the-art gym features top-of-the-line equipment, experienced personal trainers, and a supportive community of like-minded individuals who are all striving to achieve their fitness goals.</a>
          </div>


        </div>




        <div className="programs">
          <div className="proleft">

            <div className="childleft1">
              <h2 className="titlepara">See our fitness programs</h2>


              <p className="para1">See our fitness programs, compare and choose what’s best for you!</p>
              <button className="buttontogo">See our plans</button>
            </div>

            <div className="childleft1">
              <h2 className="titlepara">Visit FAQ</h2>


              <p className="para1">Got any doubts ? Don’t hold back. Visit our evolving FAQ section and resolve your doubts !</p>
              <button className="buttontogo">visit FAQ</button>
            </div>

            <div className="childleft1">
              <h2 className="titlepara">Meet our instructors</h2>


              <p className="para1">Looking for the best and well knowledge instructors to achieve your fitness goal ? Why delay? Visit our instructor library and meet the best out there</p>
              <button className="buttontogo">Our CREW</button>
            </div>

            <div className="childleft1">
              <h2 className="titlepara">Clients transformations</h2>


              <p className="para1">See our clients transformations before and after. Compare and boost your motivation even higher!</p>
              <button className="buttontogo">visit</button>
            </div>


          </div>
          <div className="proright">


          </div>



          <div className="childleft2">
            <h2 className="titlepara">Customer reviews</h2>


            <p className="para1">Feels like too good to be true? See our customers feedbacks and be sure!</p>
            <button className="buttontogo">Feedbacks</button>
          </div>

        </div>

      </div>






    </div>

  );



}


export default Homepage