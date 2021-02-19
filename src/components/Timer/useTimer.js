import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Subject } from 'rxjs';

const subject = new Subject();

const countService = {
    start: () => subject.next(1),
    clear: () => subject.next(),
    onMessage: () => subject.asObservable()
};

const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [interv, setInterv] = useState();

    useEffect(() => {
        const subscription = countService.onMessage().subscribe(message => {
            if (message) {
                setTimer((timer) => timer + message);
            } else {
                setTimer(initialState);
            }
        });

        // return unsubscribe method to execute when component unmounts
        return subscription.unsubscribe;
    }, []);

    const handleStart = () => {
        setInterv(setInterval(run, 1000));
    };

    const run = () => {
        countService.start();
    };

    const handleStop = () => {
        clearInterval(interv);
        setInterv();
    };

    const handleReset = () => {
        clearInterval(interv);
        countService.clear();
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
        }
    };

    return { timer, interv, handleStart, handleStop, handleReset, handleWait };
};

export default useTimer;