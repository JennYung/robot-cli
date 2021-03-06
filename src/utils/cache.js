export default class Cache {
  constructor(redis) {
    this._redis = redis;
  }

  get(key) {
    return new Promise((resolve) => {
      if (key) {
        this._redis.get(key, (error, data) => {
          if (error) {
            resolve(null);
          }
          resolve(JSON.parse(data));
        });
      } else {
        resolve(null);
      }
    });
  }

  set(key, cache) {
    return new Promise((resolve) => {
      if (key) {
        this._redis.set(key, JSON.stringify(cache), (error, response) => {
          if (error) {
            resolve(true);
          }
          resolve(response);
        });
      } else {
        resolve(true);
      }
    });
  }

  quit() {
    this._redis.quit();
  }
}
