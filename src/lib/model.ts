export enum Direction {
  Up,
  UpRight,
  Right,
  DownRight,
  Down,
  DownLeft,
  Left,
  UpLeft
}

export interface Location {
  row: number;
  col: number;
}

export interface Node {
  note: string;
  direction: Direction;
}

function randomInt(upperBound: number) {
  return Math.floor(Math.random() * 10) % upperBound;
}

function getRandomPentatonicNote() {
  const pentatonicScale = ["C5", "D5", "E5", "G5", "A5", "C6"];
  return pentatonicScale[randomInt(pentatonicScale.length)];
}

export function generateRandomNodeGrid(size: number) {
  let rows: Node[][] = [];

  for (let i = 0; i < size; i++) {
    let row = [];

    for (let j = 0; j < size; j++) {
      row.push({
        direction: Direction.UpRight,
        note: getRandomPentatonicNote()
      });
    }

    rows.push(row);
  }

  return rows;
}

export function getNextLocation(
  location: Location,
  direction: Direction,
  maxSize: number
): Location {
  // JavaScript's modulo operator is actually _broken_. Amazing.
  function wrap(n: number) {
    return ((n % maxSize) + maxSize) % maxSize;
  }

  const { row, col } = location;

  if (direction === Direction.Up) {
    return { row: wrap(row - 1), col };
  }

  if (direction === Direction.UpRight) {
    return { row: wrap(row - 1), col: wrap(col + 1) };
  }

  if (direction === Direction.Right) {
    return { row, col: wrap(col + 1) };
  }

  if (direction === Direction.DownRight) {
    return { row: wrap(row + 1), col: wrap(col + 1) };
  }

  if (direction === Direction.Down) {
    return { row: wrap(row + 1), col };
  }

  if (direction === Direction.DownLeft) {
    return { row: wrap(row + 1), col: wrap(col - 1) };
  }

  if (direction === Direction.Left) {
    return { row, col: wrap(col - 1) };
  }

  if (direction === Direction.UpLeft) {
    return { row: wrap(row - 1), col: wrap(col - 1) };
  }

  return location;
}

export function getNextDirection(direction: Direction): Direction {
  return (direction + 1) % 8;
}

export function rotateLocationInNodeGrid(
  nodeGrid: Node[][],
  location: Location
) {
  const newNodeGrid = [...nodeGrid];
  const node = newNodeGrid[location.row][location.col];
  const nextDirection = getNextDirection(node.direction);

  newNodeGrid[location.row][location.col] = {
    ...node,
    direction: nextDirection
  };

  return newNodeGrid;
}
