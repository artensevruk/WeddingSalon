import React, { useRef } from 'react';

export const Video = () =>{
  const videoRef = useRef(null);
  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="videoContainer">
         <video className='video' width="940" height="540" ref={videoRef} controls onEnded={handleVideoEnd} >
           <source src="video/Wending.mp4" type="video/mp4" />
         </video>
       </div>
  )
 
}