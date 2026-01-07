import React from 'react';
import '../assets/CSS/Button.css';

export default function Button({ text, onClick, type = "button", className = "" }) {
  return (
    <button 
      type={type} 
      className={`btn-primary ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
}
