import * as Position from '../constant/position';
import * as State from '../constant/state';
import { isWithinTable, checkState } from './../middleware/constraint';
import deepcopy from 'deepcopy'

function isNumeric(input) {
  let regex = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
  return regex.test(input);
}

function isDirection(input) {
  if(input === Position.Types.NORTH ||
     input === Position.Types.SOUTH ||
     input === Position.Types.EAST  ||
     input === Position.Types.WEST) {
    return true;
  }
  return false;
}

export default class Robot {
  constructor() {
  }

  place (x, y, f) {
    return new Promise((resolve, reject) => {
      if (!isNumeric(x) || !isNumeric(y) || !isDirection(f)) {
        throw ('invalid param');
      }

      let loc = {};
      loc.x = x;
      loc.y = y;
      loc.f = f;
      loc.state = State.Types.INITIAL;

      if(isWithinTable(loc)) {
        loc.state = State.Types.START;
      }

      resolve(loc);
    })
  }

  move (location) {
    return new Promise((resolve, reject) => {
      if(checkState(location)) {
        let loc = deepcopy(location);
        switch(loc.f) {
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
        }

        if(isWithinTable(loc)){
          resolve(loc);
        }
      }
    })
  }

  left (loc) {
    return new Promise((resolve, reject) => {
      if(checkState(loc)) {
        switch(loc.f) {
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
        }
      }
      resolve(loc);
    })
  }

  right (loc) {
    return new Promise((resolve, reject) => {
      if(checkState(loc)) {
        switch(loc.f) {
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
        }
      }
      resolve(loc);
    })
  }

  report (loc) {
    if(checkState(loc)) {
      console.log(`location of the robot: ${loc.x}, ${loc.y} - facing ${loc.f}`);
    }
  }
}
