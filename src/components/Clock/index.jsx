import React from 'react';
import useClock from '../../hooks/useClock';
function Clock() {
    const {timeString}= useClock();
    return (
        <div>
            {timeString}
        </div>
    );
}

export default Clock;