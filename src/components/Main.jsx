import React, { useEffect } from 'react'
import { useState } from 'react';
import DiceImage1 from "./images/Dice1.png"
import DiceImage2 from "./images/Dice2.png"
import DiceImage3 from "./images/Dice3.png"
import DiceImage4 from "./images/Dice4.png"
import DiceImage5 from "./images/Dice5.png"
import DiceImage6 from "./images/Dice6.png"
import './Die1.css'
import Confetti from "react-confetti"

function Main() 
{
   
    const [seconds, setSeconds] = useState(0);
   const [isClicked, setIsClicked] = useState(false);
  const [bestTime,setbestTime]=useState(null);
  const [tenzies,setTenzies]=useState(false);
  const [rollcount,setRollCount]=useState(0);
  const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight,
});

useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  useEffect(() => {
    if (tenzies) return;
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000); 
    return () => clearInterval(intervalId);
  }, [tenzies]); 

const diceImages=[
    DiceImage1,
    DiceImage2,
    DiceImage3,
    DiceImage4,
    DiceImage5,
    DiceImage6   

]

// const [image,setImage]=useState(diceImages[0])
// const [image2,setImage2]=useState(diceImages[1])
// const [image3,setImage3]=useState(diceImages[2])
// const [image4,setImage4]=useState(diceImages[3])
// const [image5,setImage5]=useState(diceImages[4])
// const [image6,setImage6]=useState(diceImages[5])

const [dice, setDice] = useState(
  Array.from({ length: 10 }, () => ({
    value: Math.floor(Math.random() * 6)+1,
    frozen: false
  }))
);

useEffect(()=>{
  const allfrozen= dice.every(die=>die.frozen);
  const firstValue=dice[0].value;
  const allSameValue= dice.every(die=>die.value === firstValue);
  if(allfrozen && allSameValue)
  {
    setTenzies(true);
  }
},[dice]);
useEffect(()=>{
  if(!tenzies)return;
  setbestTime(prev=>
   prev === null || seconds < prev ? seconds : prev
  );
}, [tenzies, seconds]);

const toggleFreeze = (index) => {
  setDice(prevDice =>
    prevDice.map((die, i) =>
      i === index ? { ...die, frozen: !die.frozen } : die
    )
  );
};

const rollDice = () => {
  if (tenzies) {

    setTenzies(false);
    setSeconds(0);
    setRollCount(0);
    setDice(
      Array.from({ length: 10 }, () => ({
        value: Math.floor(Math.random() * 6) + 1,
        frozen: false
      }))
    );
  } else {

    setRollCount(prev => prev + 1);
    setDice(prevDice =>
      prevDice.map(die =>
        die.frozen
          ? die
          : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }
};

// const rollDice =()=>{
//     var randomNum1=Math.floor(Math.random()*6);
//     var randomNum2=Math.floor(Math.random()*6);
//     var randomNum3=Math.floor(Math.random()*6);
//     var randomNum4=Math.floor(Math.random()*6);
//     var randomNum5=Math.floor(Math.random()*6);
//     var randomNum6=Math.floor(Math.random()*6); 
//     setImage(diceImages[randomNum1]);
//     setImage2(diceImages[randomNum2]);
//     setImage3(diceImages[randomNum3]);
//     setImage4(diceImages[randomNum4]);
//     setImage5(diceImages[randomNum5]);
//     setImage6(diceImages[randomNum6]);
// }
  return (
<div
      style={{
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a2433",
        height: "100vh",
        width: "100vw"
      }}
    >
      {tenzies && (
  <Confetti
    width={windowSize.width}
    height={windowSize.height}
    numberOfPieces={300}
    recycle={false}
  />
)}

      <div
        style={{
          flexDirection: "column",
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
          height: "400px",
          width: "400px",
          textAlign: "center"
        }}
      >
        <h1>Tenzi</h1>
        <p style={{ color: "#585858", fontSize: "15px" }}>
          Roll until all dice are the same. Click each die to freeze it.
        </p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h3>Rolls<p>{rollcount}</p></h3>
          <h3>Best Time<p>{bestTime !==null? bestTime:0}</p></h3>
          <h3>Time<p>{seconds}</p></h3>
        </div>
        <div
  style={{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    // alignItems:"center",
    gap: "10px",
    justifyItems: "center"
  }}
>
  {dice.map((die, index) => (
    <img
      key={index}
      src={diceImages[die.value-1]}
      className={die.frozen ? "clicked-image" : "normal-image"}
      onClick={() => toggleFreeze(index)}
      style={{ cursor: "pointer", width: "50px" }}
      alt={`die-${die.value}`}
    />
  ))}
</div>
        {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h3>Rolls<p>0</p></h3>
          <h3>Best Time<p>0</p></h3>
          <h3>Time<p>{seconds}</p></h3>
        </div>
        <div style={{marginLeft:"180px"}}>
          {dice.map((die, index) => (
    <img
      key={index}
      src={diceImages[die.value]}
      className={die.frozen ? "clicked-image" : "normal-image"}
      onClick={() => toggleFreeze(index)}
      style={{ cursor: "pointer", width: "50px" }}
      />
  ))}
        {/* <div style={{ display: "flex",justifyContent: "center",height:"50px",width:"50px"}}> */}
          {/* <img className={imageClass} src={image} onClick={handleClick}  style={{ cursor: 'pointer' }}/>
          <img className={imageClass} src={image2} onClick={handleClick}/>
           <img className={imageClass} src={image3} onClick={handleClick}/>
            <img className={imageClass} src={image4} onClick={handleClick}/>
            <img className={imageClass} src={image5} onClick={handleClick}/>
            </div>
            <div style={{display:"flex",justifyContent:"center",height:"50px",width:"50px"}}>
            <img className={imageClass} src={image6} onClick={handleClick}/>
            <img className={imageClass} src={image3} onClick={handleClick}/>
            <img className={imageClass} src={image5} onClick={handleClick}/>
            <img className={imageClass} src={image} onClick={handleClick}/>
            <img className={imageClass} src={image4} onClick={handleClick}/>
        </div>  
        </div>  */}
        
        <button onClick={rollDice}>Roll Dice</button>
      </div>
    // </div>
  );
}
export default Main
