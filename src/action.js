import Redis from 'redis';
import config from 'config';
import Robot from './services/robot';
import Cache from './utils/cache';

const redis = Redis.createClient(config.redis.port, config.redis.host);
const cache = new Cache(redis);
const robot = new Robot();
const key = 'location';

function handleError(error) {
  console.log(error);
  cache.quit();
}

function storeLocation(location) {
  cache.set(key, location);
  cache.quit();
}

exports.place = (x, y, f) => robot.place(x, y, f)
  .then((location) => {
    storeLocation(location);
    return location;
  })
  .catch(error => handleError(error));

exports.move = () => cache.get(key)
  .then(storedLocation => robot.move(storedLocation)
    .then((location) => {
      storeLocation(location);
      return location;
    }))
  .catch(error => handleError(error));

exports.left = () => cache.get(key)
  .then(storedLocation => robot.left(storedLocation)
    .then((location) => {
      storeLocation(location);
      return location;
    }))
  .catch(error => handleError(error));

exports.right = () => cache.get(key)
  .then(storedLocation => robot.right(storedLocation)
    .then((location) => {
      storeLocation(location);
      return location;
    }))
  .catch(error => handleError(error));

exports.report = () => cache.get(key)
  .then((storedLocation) => {
    robot.report(storedLocation);
    cache.quit();
  })
  .catch(error => handleError(error));
