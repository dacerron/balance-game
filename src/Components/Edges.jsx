import { RigidBody } from "@react-three/rapier";
import { Box } from '@react-three/drei'

export default function Edges({ endGameEvent }) {
    return (
        <RigidBody sensor={true} colliders={'hull'} lockTranslations={true}
            onIntersectionEnter={({ manifold, target, other }) => {
                //TODO: check that ball was the other collider
                console.log('edge collision');
                endGameEvent();
            }}>
            <Box position={[0, -20, 0]} args={[1000, 5, 1000]}
            > </Box>
        </RigidBody>)
}