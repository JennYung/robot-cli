import program from 'commander';
import {
  place, move, left, right, report
} from './action';

program
  .version('0.1.0');

// error on unknown commands
program.on('command:*', () => {
  console.error('Invalid command \nSee --help for a list of available commands.');
  process.exit(1);
});

program
  .command('place <x-axis> <y-axis> <direction>')
  .alias('p')
  .description('place your robot')
  .action((x, y, direction) => {
    console.log('place your robot');
    place(x, y, direction);
  });

program
  .command('move')
  .alias('m')
  .description('move your robot one step forward')
  .action(() => {
    console.log('move your robot one step forward');
    move();
  });

program
  .command('left')
  .alias('l')
  .description('rotate your robot to the left')
  .action(() => {
    console.log('rotate your robot to the left');
    left();
  });

program
  .command('right')
  .alias('r')
  .description('rotate your robot to the right')
  .action(() => {
    console.log('rotate your robot to the right');
    right();
  });

program
  .command('report')
  .description('announce your robot location')
  .action(() => {
    console.log('announce your robot location');
    report();
  });

program.parse(process.argv);
