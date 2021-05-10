require('colors');


const showMenu = () => {

  return new Promise( resolve => {
    console.clear();
  
    console.log('======================='.green);
    console.log('   Select an option');
    console.log('=======================\n'.green);
  
    console.log(`${ '1.-'.green } Create a todo`);
    console.log(`${ '2.-'.green } Show todos`);
    console.log(`${ '3.-'.green } Show complete todos`);
    console.log(`${ '4.-'.green } Create pending todos`);
    console.log(`${ '5.-'.green } Mark as complete`);
    console.log(`${ '6.-'.green } Delete todo`);
    console.log(`${ '0.-'.green } End \n`);
  
    const read_line = require('readline').createInterface({
      input:  process.stdin,
      output: process.stdout
    });
  
    read_line.question('Select an option: ', (option_selected) => {
      read_line.close();

      resolve(option_selected);
    });
  });

}

const pauseApp = () => {

  return new Promise(resolve => {
    const read_line = require('readline').createInterface({
      input:  process.stdin,
      output: process.stdout
    });
  
    read_line.question(`\nPress ${ 'ENTER'.blue } to continue\n`, (option_selected) => {
      read_line.close();

      resolve();
    });
  })

}

module.exports = {
  showMenu,
  pauseApp
};