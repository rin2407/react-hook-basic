import {useState,useEffect} from 'react';
function useClock() {
    const [timeString, setTimeString] = useState('')
    function formatDate(date){
          const hour= `0${date.getHours()}`.slice(-2);
          const minute= `0${date.getMinutes()}`.slice(-2);
          const second= `0${date.getSeconds()}`.slice(-2);
          return `${hour}:${minute}:${second}`;
    }
    useEffect(() => {
        const clockInterval =setInterval(() => {
            const now= new Date();
            const newTimeString= formatDate(now);
            setTimeString(newTimeString);
        }, 1000);
        return () => {
            clearInterval(clockInterval);
        }
    },[])
    return {timeString}
}

export default useClock;