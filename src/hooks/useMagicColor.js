import { useState,useEffect,useRef } from "react";
function randomColor(currentColor){
    const LIST_COLOR=['blue','black','red','yellow'];
    const currentIndex= LIST_COLOR.indexOf(currentColor);
    let newIndex= currentIndex;
    while(currentIndex=== newIndex){
        newIndex= Math.trunc(Math.random()*4);
    }
    const newColor= LIST_COLOR[newIndex];
    return newColor;
}
function useMagicColor(props) {
    const [color,setColor]= useState('transparent');
    const ColorRef = useRef('transparent');
    useEffect(() => {
        const colorIntervel=setInterval(()=>{
            const newColor= randomColor(ColorRef.current);
            setColor(newColor);
            ColorRef.current= newColor;
        },2000)
        return () => {
            clearInterval(colorIntervel);
        }
    }, [])
    return color;
}

export default useMagicColor;