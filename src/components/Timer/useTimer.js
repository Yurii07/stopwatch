import { useState } from 'react';
import { debounce } from "lodash";

const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [interv, setInterv] = useState();

    const handleStart = () => {
        setInterv(setInterval(run, 1000));
    };

    const run = () => {
        setTimer((timer) => timer + 1);
    };

    const handleStop = () => {
        clearInterval(interv);
        setInterv();
    };

    const handleReset = () => {
        clearInterval(interv);
        setTimer(0);
        handleStart();
    };

    const [isDoubleClick, setIsDoubleClick] = useState(false);
    const [waitReset] = useState(() => (debounce(() => {
            setIsDoubleClick(false);
        }, 300)
    ));

    const handleWait = () => {
        setIsDoubleClick(true);
        waitReset();
        if (isDoubleClick) {
            setIsDoubleClick(false);
            handleStop();
            console.log(' double click ');
        }
    };

    return { timer, interv, handleStart, handleStop, handleReset, handleWait }
}

export default useTimer