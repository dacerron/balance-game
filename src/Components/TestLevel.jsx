import { useKeyboardControls, Box } from "@react-three/drei";
import { useFrame, } from "@react-three/fiber";
import { useRef, useEffect, useContext } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { GameStateContext } from "../App"

function TestLevel(props) {
    const meshRef = useRef();
    const [sub, get] = useKeyboardControls()
    const { endGameEvent, startGameEvent, gameStarted, gameOver } = useContext(GameStateContext)

    useFrame((state, delta) => {
        if(gameStarted && !gameOver) {
            const upPressed = get().up
            const downPressed = get().down
            const rightPressed = get().right
            const leftPressed = get().left
            if (upPressed && !downPressed) {
                meshRef.current.applyTorqueImpulse({ x: -30, y: 0, z: 0 }, true);
            }
            if (downPressed && !upPressed) {
                meshRef.current.applyTorqueImpulse({ x: 30, y: 0, z: 0 }, true);
            }
            if (leftPressed && !rightPressed) {
                meshRef.current.applyTorqueImpulse({ x: 0, y: 0, z: 30 }, true);
            }
            if (rightPressed && !leftPressed) {
                meshRef.current.applyTorqueImpulse({ x: 0, y: 0, z: -30 }, true);
            }
        }


        //meshRef.current.addForce({ x: 0, y: 5, z: 0 }, true);

    })

    return (<>
        {gameStarted && !gameOver ? <RigidBody ref={meshRef} lockTranslations={true} rotation={[0.05, 0, 0.05]}>
            <Box args={[5, 1, 5]}>
                <meshStandardMaterial color="hotpink"></meshStandardMaterial>
            </Box>
            <CuboidCollider args={[4, 0.5, 4]} ></CuboidCollider>
        </RigidBody> : null}</>
    )
}

export default TestLevel