import '../App.css'

import React, { useEffect, useState, useRef } from 'react'
import { GameStateContext } from '../App';

export default function GameUI({ startGame, gameEnded, saveScore }) {

    const INITIAL_SCORE = 0;

    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(-1);

    const interval = useRef();

    const start = () => {
        startGame();
        setGameStarted(true);
        setScore(0)
    }

    useEffect(() => {
        function handleTimer() {
            interval.current = setInterval(() => {
                setScore((count) => count + 1)
            }, 300)
        }
        if (gameStarted) {
            if (score === INITIAL_SCORE) {
                handleTimer();
            }
        }
        if (gameEnded && interval.current) {
            console.log('clearing interval');
            clearInterval(interval.current)
            saveScore(score);
        }
    }, [score, gameEnded])

    return (<div className={'ui-container'}>
        {gameStarted ?

            <div className={'score-container'}>
                <div className={'score-text'}>{score}</div>
            </div> :
            <div className={'menu-container'}>
                <div className={'start-button'} onClick={() => {
                    start();
                }}><p className={'start-text'}>START</p></div>

            </div>
        }
        {gameEnded ? <div className={'game-over-container'}> <div className={'game-over-text'}>GAME OVER</div>
        {score > JSON.parse(localStorage.getItem('scores'))[0]|| localStorage.getItem('scores') == undefined? <div className={'high-score-text'}>new high score!</div>:null}
        <p className={'scores-header'}>LEADERBOARD</p>
            <div className={'scores-list'}>
                {JSON.parse(localStorage.getItem('scores')).map((e) => {
                    return <div className={'scores-list-item'}>{e}</div>
                })}
            </div>
            <div className={"try-again-text"} onClick={() => {start()}}>try again</div></div> : null}
    </div>);
}