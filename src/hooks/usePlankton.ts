import { useState } from "react";
import useInterval from "./useInterval";
import { Location, Direction, getNextLocation } from "../model";

export default ({
  speed,
  startingPosition,
  directionGrid
}: {
  speed: number;
  startingPosition: Location;
  directionGrid: Direction[][];
}) => {
  const [location, setLocation] = useState(startingPosition);

  const { start, stop } = useInterval({
    startImmediate: true,
    duration: speed,
    callback: () => {
      const { row, col } = location;
      const direction = directionGrid[row][col];
      const nextLocation = getNextLocation(
        location,
        direction,
        directionGrid.length - 1
      );
      setLocation(nextLocation);
    }
  });

  return { start, stop, location };
};
