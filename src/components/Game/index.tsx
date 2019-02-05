import React, { Component, useState } from "react";
import usePlankton from "../../hooks/usePlankton";
import style from "./style.module.css";
import classnames from "classnames";
import {
  Direction,
  generateRandomNodeGrid,
  rotateLocationInNodeGrid
} from "../../lib/model";

export default function App(props: { size: number }) {
  const [nodeGrid, setNodeGrid] = useState(generateRandomNodeGrid(props.size));

  const red = usePlankton({
    nodeGrid,
    speed: 1600,
    startingPosition: { row: 0, col: 0 }
  });

  const blue = usePlankton({
    nodeGrid,
    speed: 400,
    startingPosition: { row: 1, col: 1 }
  });

  let rows = [];

  for (let row = 0; row < props.size; row++) {
    let nodes = [];

    for (let col = 0; col < props.size; col++) {
      const { direction } = nodeGrid[row][col];

      // arrow icon is facing right
      const degreeOffsets: { [key: number]: number } = {
        [Direction.Up]: 270,
        [Direction.UpRight]: 315,
        [Direction.Right]: 0,
        [Direction.DownRight]: 45,
        [Direction.Down]: 90,
        [Direction.DownLeft]: 135,
        [Direction.Left]: 180,
        [Direction.UpLeft]: 225
      };

      nodes.push(
        <div
          key={"" + row + col}
          onClick={() => {
            setNodeGrid(rotateLocationInNodeGrid(nodeGrid, { row, col }));
          }}
          style={{ transform: `rotate(${degreeOffsets[direction]}deg)` }}
          className={classnames(style.node, {
            [style.redNode]:
              row === red.location.row && col === red.location.col,
            [style.blueNode]:
              row === blue.location.row && col === blue.location.col
          })}
        />
      );
    }

    rows.push(nodes);
  }

  return (
    <div
      className={style.grid}
      style={{
        gridTemplateColumns: `repeat(${props.size}, 20px)`,
        gridTemplateRows: `repeat(${props.size}, 20px)`
      }}
    >
      {rows}
    </div>
  );
}
