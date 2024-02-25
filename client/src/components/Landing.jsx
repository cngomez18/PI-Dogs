import React from "react";
import { Link } from "react-router-dom";
import dogCreamImg from "../styles/dog-cream.jpg"
import  "../styles/Landing-styles.css"

export default function Landing(){
    //BUSCAR LINKKKKKK!!!!!!!!!!!!!!!!!!!!
    
  return(
    <div className="landingContainer">
        
      <div className="backgroundImageContainer">
        <img src={dogCreamImg} alt="dogdogdogdog" className="backgroundImage" />
      </div>

      <button className="enterButton">
        <Link to="/home" className="buttonText" >Enter</Link>
      </button>
  </div>
  )
}