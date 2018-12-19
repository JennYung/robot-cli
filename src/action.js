'use strict';
import Robot from './services/robot'
import Redis from 'redis'
import Cache from './utils/cache'
import config from 'config'

const redis = Redis.createClient(config.redis.port, config.redis.host);
const cache = new Cache(redis);
const robot = new Robot();
const key = 'location';

function handleError (error) {
  console.log(error);
  cache.quit();
}

function storeLocation (location) {
  cache.setex(key, config.redis.expiredTime, location);
  cache.quit();
}

exports.place = (x,y,f) => {
  return robot.place(x, y, f)
    .then(location => {
      storeLocation(location);
      return location;
    })
    .catch(error => handleError(error))
}

exports.move = () => {
  return cache.get(key)
    .then(storedLocation => {
      return robot.move(storedLocation)
        .then(location => {
          storeLocation(location);
          return location;
        })
    })
    .catch(error => handleError(error))
}

exports.left = () => {
  return cache.get(key)
    .then(storedLocation => {
      return robot.left(storedLocation)
        .then(location => {
          storeLocation(location);
          return location;
        })
    })
    .catch(error => handleError(error))
}

exports.right = () => {
  return cache.get(key)
    .then(storedLocation => {
      return robot.right(storedLocation)
        .then(location => {
          storeLocation(location);
          return location;
        })
    })
    .catch(error => handleError(error))
}

exports.report = () => {
  return cache.get(key)
    .then(storedLocation => {
      robot.report(storedLocation)
      cache.quit();
    })
    .catch(error => handleError(error))
}

