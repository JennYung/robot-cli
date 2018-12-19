# Description

This is a cli application to be able to move a robot within a dimension

## Prerequisite

Please click into the following link to install redis:
https://redis.io/topics/quickstart

## Getting Started

Install dependencies:

```bash
yarn
```

Run redis server in another terminal:

```bash
redis-server
```

Create a link in /usr/local/bin

```bash
yarn link
```

## Example Input and Output

```bash
 Example a

    robot place 0 0 NORTH
    robot move
    robot report

Expected output:

    location of the robot: 0, 1 - facing NORTH

Example b

    robot place 0 0 NORTH
    robot left
    robot report

Expected output:

    location of the robot: 0, 0 - facing WEST

Example c

    robot place 1 2 EAST
    robot move
    robot move
    robot left
    robot move
    robot report

Expected output

    location of the robot: 3, 3 - facing NORTH
```

## Remove Link from /usr/local/bin

```bash
yarn unlink
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix
```

## Test

```bash
# run all tests with Jest
yarn test

# run unit tests with coverage
yarn test:unit
```

Please change the table's dimension in the config file for a wider area.
