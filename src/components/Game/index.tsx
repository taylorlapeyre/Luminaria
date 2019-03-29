import Tone from "tone";
import React, { Component, useState } from "react";
import usePlankton from "../../hooks/usePlankton";
import style from "./style.module.css";
import classnames from "classnames";
import {
  Direction,
  generateRandomNodeGrid,
  rotateLocationInNodeGrid
} from "../../lib/model";

Tone.start();

const redSynth = new Tone.Synth().toMaster();

const blueSynth = new Tone.Synth().toMaster();

const yellowSynth = new Tone.Synth().toMaster();

const greenSynth = new Tone.Synth().toMaster();

export default function App(props: { size: number }) {
  const [nodeGrid, setNodeGrid] = useState(generateRandomNodeGrid(props.size));

  const red = usePlankton({
    synth: redSynth,
    nodeGrid,
    speed: 400,
    octave: 4,
    startingPosition: { row: 0, col: 0 }
  });

  const blue = usePlankton({
    synth: blueSynth,
    nodeGrid,
    octave: 0,
    speed: 1600,
    startingPosition: { row: 1, col: 1 }
  });

  const yellow = usePlankton({
    synth: yellowSynth,
    nodeGrid,
    speed: 800,
    octave: 3,
    startingPosition: { row: 4, col: 0 }
  });

  const green = usePlankton({
    synth: greenSynth,
    nodeGrid,
    speed: 1200,
    octave: 2,
    startingPosition: { row: 2, col: 4 }
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
              row === blue.location.row && col === blue.location.col,
            [style.yellowNode]:
              row === yellow.location.row && col === yellow.location.col,
            [style.greenNode]:
              row === green.location.row && col === green.location.col

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
