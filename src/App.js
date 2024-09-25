import logo from './logo.svg';
import React, { useRef, useState, useMemo, Suspense, createContext } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { KeyboardControls, PerspectiveCamera, Sphere } from '@react-three/drei';
import TestLevel from './Components/TestLevel'
import { Physics, RigidBody } from '@react-three/rapier';
import GameUI from './Components/GameUI'
import Edges from './Components/Edges'
import Ball from './Components/Ball'
import './App.css';

const Controls = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  jump: 'jump',
}

const GameStateContext = createContext({ endGameEvent: null, startGameEvent: null, gameOver: false, gameStarted: false });
const maxScores = 10;

function App() {

  const map = useMemo(() => [
    { name: Controls.up, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.down, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ], [])

  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  function endGameEvent() {
    setGameOver(true);
    setGameStarted(false);
  }

  function startGameEvent() {
    setGameOver(false);
    setGameStarted(true);
  }

  function saveScore(score) {
    let currentScores = localStorage.getItem("scores");
    if (currentScores === '') {
      currentScores = [];
    } else {
      currentScores = JSON.parse(currentScores);
    }

    console.log(currentScores, score)
    currentScores.push(score)
    currentScores.sort();
    currentScores.reverse();
    if(currentScores.length > maxScores) {
      currentScores.pop();
    }
    console.log('scores after save : ' + currentScores)
    localStorage.setItem('scores', JSON.stringify(currentScores));
  }

  return (
    <GameStateContext.Provider value={{ endGameEvent, startGameEvent, gameOver, gameStarted }}>
      <GameUI gameEnded={gameOver} startGame={startGameEvent} saveScore={saveScore}></GameUI>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 10]}></PerspectiveCamera>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense>
          <Physics colliders={false} gravity={[0, -5, 0]}>
            <Ball></Ball>
            <KeyboardControls map={map}>
              <TestLevel></TestLevel>
            </KeyboardControls>
            <Edges endGameEvent={endGameEvent}></Edges>
          </Physics>
        </Suspense>
      </Canvas >
    </GameStateContext.Provider>
  );
}
export default App;
export { GameStateContext };
