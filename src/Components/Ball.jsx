import { useContext } from "react"
import { RigidBody } from "@react-three/rapier"
import { Sphere } from "@react-three/drei"
import { GameStateContext } from "../App";

export default function Ball() {

    const { endGameEvent, startGameEvent, gameOver, gameStarted } = useContext(GameStateContext);

    return (<>
        {gameStarted && !gameOver? <RigidBody lockTranslations={!gameStarted} colliders={"ball"}>
            <Sphere position={[0, 2, 0]} args={[1]}>
                <meshStandardMaterial color="yellow"></meshStandardMaterial>
            </Sphere>
        </RigidBody> : null}
    </>
    );
}