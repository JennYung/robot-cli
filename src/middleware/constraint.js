import * as State from '../constant/state';
import config from 'config'

function checkLocation(loc) {
  if(!loc || !loc.state) {
    throw ('Robot has not been placed on the table yet');
  }
  return true;
}

exports.isWithinTable = (loc) => {
  if(checkLocation(loc) &&
     (loc.x < config.table.origin ||
      loc.x > config.table.max ||
      loc.y < config.table.origin ||
      loc.y > config.table.max)) {
    throw ('Robot will fall from the table');
  }
  return true;
}

exports.checkState = (loc) => {
  if(checkLocation(loc) && loc.state != State.Types.START) {
    throw ('Robot has not been placed on the table yet');
  }
  return true;
}

