/* eslint-disable arrow-body-style */

import assert from 'assert'
import Cache from './cache'

describe('Cache', () => {
  const location = { x: 1, y: 1, f:'NORTH', state:'start'};
  describe('GET', () => {
    describe('return cache data', () => {
      it('if able to get from cache', (done) => {
        const redis = {
          get: (key, callback) => {
            return callback(null, JSON.stringify(location));
          }
        }
        const cache = new Cache(redis);
        cache.get('location')
          .then(data => {
            expect(data).toEqual(location);
            done();
          })
          .catch(error => {
            expect(error.message).not.toMatch(/Expected value to equal/);
            assert(false);
            done(error);
          });
      });
    });

    describe('return null', () => {
      it('if error when getting cache data', (done) => {
        const redis = {
          get: (key, callback) => {
            return callback(new Error('test'), null);
          }
        }
        const cache = new Cache(redis);
        cache.get('location')
          .then(data => {
            expect(data).toEqual(null);
            done();
          })
          .catch(error => {
            expect(error.message).not.toMatch(/Expected value to equal/);
            assert(false);
            done(e);
          });
      });

      it('if no key', (done) => {
        const redis = {
          get: (key, callback) => {
            return callback(null, JSON.stringify(location))
          }
        }
        const cache = new Cache(redis);
        cache.get(null)
          .then(data => {
            expect(data).toEqual(null);
            done();
          })
          .catch(error => {
            expect(error.message).not.toMatch(/Expected value to equal/);
            assert(false);
            done(error);
          });
      });
    });
  });

  describe('Setex', () => {
    const expiredTime = 60;
    describe('return OK', () => {
      it('if store cache successfully', (done) => {
        const redis = {
          setex: (key, time, data, callback) => {
            return callback(null, 'OK');
          }
        }
        const cache = new Cache(redis);
        cache.setex('location', expiredTime, location)
          .then(response => {
            expect(response).toEqual('OK');
            done();
          })
          .catch(error => {
            expect(error.message).not.toMatch(/Expected value to equal/);
            assert(false);
            done(error);
          })
      })
    })

    describe('return true', () => {
      it('if error when store cache data', (done) => {
        const redis = {
          setex: (key, time, data, callback) => {
            return callback(new Error('test'), null);
          }
        }
        const cache = new Cache(redis);
        cache.setex('location', expiredTime, location)
          .then(response => {
            expect(response).toEqual(true);
            done();
          })
          .catch(error => {
            expect(error.message).not.toMatch(/Expected value to equal/);
            assert(false);
            done(error);
          })
      })

      it('if no key', (done) => {
        const redis = {
          setex: (key, time, data, callback) => {
            return callback(null, 'OK');
          }
        }
        const cache = new Cache(redis);
        cache.setex(null, expiredTime, location)
          .then(response => {
            expect(response).toEqual(true);
            done();
          })
          .catch(error => {
            expect(error.message).not.toMatch(/Expected value to equal/);
            assert(false);
            done(error);
          })
      })
    })
  })
})
