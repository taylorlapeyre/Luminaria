import { useState } from "react";
import useInterval from "./useInterval";
import { Node, Location, Direction, getNextLocation } from "../lib/model";
import { playSound } from "../lib/sound";

export default ({
  speed,
  startingPosition,
  nodeGrid,
  octave,
  synth
}: {
  speed: number,
  startingPosition: Location,
  nodeGrid: Node[][],
  octave: number,
  synth: any
}) => {
  const [location, setLocation] = useState(startingPosition);
  const [isMoving, setIsMoving] = useState(true);

  useInterval(
    () => {
      const { row, col } = location;
      const { direction, note } = nodeGrid[row][col];

      synth.triggerAttackRelease(note + octave, "16n");

      const nextLocation = getNextLocation(
        location,
        direction,
        nodeGrid.length
      );
      setLocation(nextLocation);
    },
    isMoving ? speed : null
  );

  return {
    start: () => setIsMoving(true),
    stop: () => setIsMoving(false),
    location
  };
};
