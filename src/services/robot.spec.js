/* eslint-disable arrow-body-style */
import Robot from './robot'

describe('Robot', () => {

  const robot = new Robot();

  beforeEach(() => {});

  afterEach(() => {});

  describe('Place', () => {
    test('should passed with valid location within the table', () => {
      return robot.place(1, 1, 'NORTH')
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'NORTH', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should failed if out of table range', () => {
      return robot.place(1, 10, 'NORTH')
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot will fall from the table');
        })
    });

    test('should failed if invalid param for facing', () => {
      return robot.place(1, 1, 'anything')
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('invalid param');
        })
    });

    test('should failed if invalid param for x', () => {
      return robot.place('anything', 1, 'NORTH')
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('invalid param');
        })
    });

    test('should failed if invalid param for y', () => {
      return robot.place(1, 'anything', 'NORTH')
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('invalid param');
        })
    });
  });

  describe('Move', () => {
    test('should passed with valid location within the table - move up y axis', () => {
      return robot.move({ x: 1, y: 1, f:'NORTH', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 2, f:'NORTH', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed with valid location within the table - move down y axis', () => {
      return robot.move({ x: 1, y: 1, f:'SOUTH', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 0, f:'SOUTH', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed with valid location within the table - move up x axis', () => {
      return robot.move({ x: 1, y: 1, f:'EAST', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 2, y: 1, f:'EAST', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed with valid location within the table - move down x axis', () => {
      return robot.move({ x: 1, y: 1, f:'WEST', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 0, y: 1, f:'WEST', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should failed if out of table range above y axis', () => {
      return robot.move({ x: 1, y: 5, f:'NORTH', state:'start'})
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot will fall from the table');
        })
    });

    test('should failed if out of table range below y axis', () => {
      return robot.move({ x: 1, y: 0, f:'SOUTH', state:'start'})
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot will fall from the table');
        })
    });

    test('should failed if out of table range above x axis', () => {
      return robot.move({ x: 5, y: 1, f:'EAST', state:'start'})
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot will fall from the table');
        })
    });

    test('should failed if out of table range below x axis', () => {
      return robot.move({ x: 0, y: 1, f:'WEST', state:'start'})
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot will fall from the table');
        })
    });

    test('should failed if location is null', () => {
      return robot.move(null)
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });

    test('should failed if location is undefined', () => {
      return robot.move()
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });

    test('should failed if location state is not in start mode', () => {
      return robot.move({ x: 1, y: 1, f:'WEST', state:'initial'})
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });
  });

  describe('Left', () => {
    test('should passed after rotate to the right direction for NORTH', () => {
      return robot.left({ x: 1, y: 1, f:'NORTH', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'WEST', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed after rotate to the right direction for WEST', () => {
      return robot.left({ x: 1, y: 1, f:'WEST', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'SOUTH', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed after rotate to the right direction for SOUTH', () => {
      return robot.left({ x: 1, y: 1, f:'SOUTH', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'EAST', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed after rotate to the right direction for EAST', () => {
      return robot.left({ x: 1, y: 1, f:'EAST', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'NORTH', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should failed if location is null', () => {
      return robot.left(null)
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });

    test('should failed if location is undefined', () => {
      return robot.left()
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });

    test('should failed if location state is not in start mode', () => {
      return robot.left({ x: 1, y: 1, f:'WEST', state:'initial'})
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });
  });

  describe('Right', () => {
    test('should passed after rotate to the right direction for NORTH', () => {
      return robot.right({ x: 1, y: 1, f:'NORTH', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'EAST', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed after rotate to the right direction for EAST', () => {
      return robot.right({ x: 1, y: 1, f:'EAST', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'SOUTH', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed after rotate to the right direction for SOUTH', () => {
      return robot.right({ x: 1, y: 1, f:'SOUTH', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'WEST', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should passed after rotate to the right direction for WEST', () => {
      return robot.right({ x: 1, y: 1, f:'WEST', state:'start'})
        .then(location => {
          expect(location).toHaveProperty('x');
          expect(location).toHaveProperty('y');
          expect(location).toHaveProperty('y');
          expect(location).toEqual({ x: 1, y: 1, f:'NORTH', state:'start'});
        })
        .catch(error => {
          expect(error).toBeUndefined();
        })
    });

    test('should failed if location is null', () => {
      return robot.right(null)
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });

    test('should failed if location is undefined', () => {
      return robot.right()
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });

    test('should failed if location state is not in start mode', () => {
      return robot.right({ x: 1, y: 1, f:'WEST', state:'initial'})
        .then(location => {
          expect(location).toBeUndefined();
        })
        .catch(error => {
          expect(error).toEqual('Robot has not been placed on the table yet');
        })
    });
  });

  describe('Report', () => {
    let outputData = "";
    function storeLog(inputs){ outputData += inputs };
    test('should passed if valid location', () => {
      console["log"] = jest.fn(storeLog);
      robot.report({ x: 1, y: 1, f:'NORTH', state:'start'})
      expect(outputData).toBe('location of the robot: 1, 1 - facing NORTH');
    });

    test('should failed if location is null', () => {
      try {
        const unexpectedString = /location of the robot/;
        console["log"] = jest.fn(storeLog);
        robot.report(null)
        expect(outputData).toEqual(expect.not.stringMatching(unexpectedString));
      }catch(error) {
        expect(error).toEqual('Robot has not been placed on the table yet');
      }
    });

    test('should failed if location is undefined', () => {
      try {
        const unexpectedString = /location of the robot/;
        console["log"] = jest.fn(storeLog);
        robot.report()
        expect(outputData).toEqual(expect.not.stringMatching(unexpectedString));
      }catch(error) {
        expect(error).toEqual('Robot has not been placed on the table yet');
      }
    });

    test('should failed if location state is not in start mode', () => {
      try {
        const unexpectedString = /location of the robot/;
        console["log"] = jest.fn(storeLog);
        robot.report({ x: 1, y: 1, f:'WEST', state:'initial'})
        expect(outputData).toEqual(expect.not.stringMatching(unexpectedString));
      }catch(error) {
        expect(error).toEqual('Robot has not been placed on the table yet');
      }
    });
  });
});
