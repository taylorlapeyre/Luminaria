export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export interface Location {
  row: number;
  col: number;
}

export function generateRandomDirectionGrid(size: number) {
  let rows: number[][] = [];

  for (let i = 0; i < size; i++) {
    let row = [];

    for (let j = 0; j < size; j++) {
      row.push(Math.floor(Math.random() * 10) % 4);
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
  const { row, col } = location;

  if (direction === Direction.Up) {
    if (row === 0) {
      return { row: maxSize, col };
    } else {
      return { row: row - 1, col };
    }
  }

  if (direction === Direction.Down) {
    if (row === maxSize) {
      return { row: 0, col };
    } else {
      return { row: row + 1, col };
    }
  }

  if (direction === Direction.Left) {
    if (col === 0) {
      return { row, col: maxSize };
    } else {
      return { row, col: col - 1 };
    }
  }

  if (direction === Direction.Right) {
    if (col === maxSize) {
      return { row, col: 0 };
    } else {
      return { row, col: col + 1 };
    }
  }

  return location;
}

export function getNextDirection(direction: Direction): Direction {
  if (direction === Direction.Up) {
    return Direction.Right;
  }

  if (direction === Direction.Right) {
    return Direction.Down;
  }

  if (direction === Direction.Down) {
    return Direction.Left;
  }

  if (direction === Direction.Left) {
    return Direction.Up;
  }

  return direction;
}

export function rotateLocationInGrid(
  directionGrid: number[][],
  row: number,
  col: number
) {
  const direction = directionGrid[row][col];
  const nextDirection = getNextDirection(direction);

  const newDirectionGrid = [...directionGrid];

  directionGrid[row][col] = nextDirection;

  return newDirectionGrid;
}