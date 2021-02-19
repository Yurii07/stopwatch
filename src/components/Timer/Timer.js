import React from 'react';
import { formatTime } from "../utils";
import styles from './timer.module.scss'
import useTimer from "./useTimer";

const Timer = () => {
    const { timer, interv, handleStart, handleStop, handleReset, handleWait } = useTimer(0)

    return (
        <div className={styles.stopwatch}>
            <div>
                <h1 className={styles.introTitle}>STOPWATCH </h1>
            </div>
            <p className={styles.clock}>{formatTime(timer)}</p>
            <div className={'btnGroup'}>
                {!interv
                    ? <button className={styles.btn} onClick={handleStart}>Start</button>
                    : <button className={styles.btn} onClick={handleStop}>Stop</button>
                }
                <button className={styles.btn} onClick={() => handleWait()}>Wait</button>
                <button className={styles.btn} onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
