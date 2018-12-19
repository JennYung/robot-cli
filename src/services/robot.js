import deepcopy from 'deepcopy';
import * as Position from '../constant/position';
import * as State from '../constant/state';
import { isWithinTable, checkState } from '../middleware/constraint';

function isNumeric(input) {
  const regex = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
  return regex.test(input);
}

function isDirection(input) {
  if (input === Position.Types.NORTH
     || input === Position.Types.SOUTH
     || input === Position.Types.EAST
     || input === Position.Types.WEST) {
    return true;
  }
  return false;
}

export default class Robot {
  place(x, y, f) {
    return new Promise((resolve) => {
      if (!isNumeric(x) || !isNumeric(y) || !isDirection(f)) {
        throw new Error('invalid param');
      }

      const loc = {};
      loc.x = x;
      loc.y = y;
      loc.f = f;
      loc.state = State.Types.INITIAL;

      if (isWithinTable(loc)) {
        loc.state = State.Types.START;
      }

      resolve(loc);
    });
  }

  move(location) {
    return new Promise((resolve) => {
      if (checkState(location)) {
        const loc = deepcopy(location);
        switch (loc.f) {
          case Position.Types.NORTH:
            loc.y++;
            break;
          case Position.Types.SOUTH:
            loc.y--;
            break;
          case Position.Types.WEST:
            loc.x--;
            break;
          case Position.Types.EAST:
            loc.x++;
            break;
          default:
            break;
        }

        if (isWithinTable(loc)) {
          resolve(loc);
        }
      }
    });
  }

  left(loc) {
    return new Promise((resolve) => {
      if (checkState(loc)) {
        switch (loc.f) {
          case Position.Types.NORTH:
            loc.f = Position.Types.WEST;
            break;
          case Position.Types.SOUTH:
            loc.f = Position.Types.EAST;
            break;
          case Position.Types.EAST:
            loc.f = Position.Types.NORTH;
            break;
          case Position.Types.WEST:
            loc.f = Position.Types.SOUTH;
            break;
          default:
            break;
        }
      }
      resolve(loc);
    });
  }

  right(loc) {
    return new Promise((resolve) => {
      if (checkState(loc)) {
        switch (loc.f) {
          case Position.Types.NORTH:
            loc.f = Position.Types.EAST;
            break;
          case Position.Types.SOUTH:
            loc.f = Position.Types.WEST;
            break;
          case Position.Types.EAST:
            loc.f = Position.Types.SOUTH;
            break;
          case Position.Types.WEST:
            loc.f = Position.Types.NORTH;
            break;
          default:
            break;
        }
      }
      resolve(loc);
    });
  }

  report(loc) {
    if (checkState(loc)) {
      console.log(`location of the robot: ${loc.x}, ${loc.y} - facing ${loc.f}`);
    }
  }
}
