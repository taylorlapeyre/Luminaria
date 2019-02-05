import { useState } from "react";
import useInterval from "./useInterval";
import { Node, Location, Direction, getNextLocation } from "../lib/model";
import { playSound } from "../lib/sound";
import Notes from "../notes.json";

// Hack to get TS from complaining about JSON
let MyNotes: { [key: string]: number } = Notes;

export default ({
  speed,
  startingPosition,
  nodeGrid
}: {
  speed: number;
  startingPosition: Location;
  nodeGrid: Node[][];
}) => {
  const [location, setLocation] = useState(startingPosition);
  const [isMoving, setIsMoving] = useState(true);

  useInterval(
    () => {
      const { row, col } = location;
      const { direction, note } = nodeGrid[row][col];

      playSound(MyNotes[note]);

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
