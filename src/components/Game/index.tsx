import React, { Component, useState } from "react";
import usePlankton from "../../hooks/usePlankton";
import style from "./style.module.css";
import classnames from "classnames";
import {
  Direction,
  generateRandomDirectionGrid,
  rotateLocationInGrid
} from "../../model";

export default function App(props: { size: number }) {
  const [directionGrid, setDirectionGrid] = useState(
    generateRandomDirectionGrid(props.size)
  );

  const red = usePlankton({
    directionGrid,
    speed: 100,
    startingPosition: { row: 0, col: 0 }
  });

  const blue = usePlankton({
    directionGrid,
    speed: 400,
    startingPosition: { row: 1, col: 1 }
  });

  const startGame = () => {
    blue.start();
    red.start();
  };

  const stopGame = () => {
    blue.stop();
    red.stop();
  };

  let rows = [];

  for (let row = 0; row < props.size; row++) {
    let nodes = [];

    for (let col = 0; col < props.size; col++) {
      const direction = directionGrid[row][col];

      nodes.push(
        <div
          key={`${row}-${col}`}
          onClick={() => {
            stopGame();
            setDirectionGrid(rotateLocationInGrid(directionGrid, row, col));
            startGame();
          }}
          className={classnames(style.node, {
            [style.redNode]:
              row === red.location.row && col === red.location.col,
            [style.blueNode]:
              row === blue.location.row && col === blue.location.col,
            [style.nodeRight]: direction === Direction.Right,
            [style.nodeLeft]: direction === Direction.Left,
            [style.nodeDown]: direction === Direction.Down,
            [style.nodeUp]: direction === Direction.Up
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
