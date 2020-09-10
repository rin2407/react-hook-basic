import React from 'react';
import './ColorBox.scss';
import { useState } from 'react';
function getRandomColor() {
    const COLOR_LIST=['deeppink','red','yellow','black','blue'];
    const randomIndex= Math.trunc(Math.random()*5);
    return COLOR_LIST[randomIndex];
}
function ColorBox() {
    const [color,setColor] = useState(()=>{
        const initColor= localStorage.getItem('box_color') || ('green')
        return initColor;
    });
    function handleBoxClick() {
        const newColor= getRandomColor();
        setColor(newColor);
        localStorage.setItem('box_color',newColor);
    }
    return (
        <div 
           className='color-box' 
           style={{ backgroundColor: color}}
           onClick={handleBoxClick}

        >
        </div>
    );
}

export default ColorBox;