import React from 'react';
import './Die1.css'
// Assuming you have CSS to style the 'die' class and different 'face' classes

const Die = ({ value }) => {
  // Renders a div with a class name indicating the value, e.g., 'die face-1', 'die face-6'
  return <div className={`die face-${value}`}></div>;
};

export default Die;