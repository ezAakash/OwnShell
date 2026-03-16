import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});


rl.prompt();

rl.on('line', (command) => {//created a REPL here.
  if ( command === 'exit') {
    rl.close()
    return 
  }
  else if( command.startsWith('echo ')) {
    const startIndex = command.indexOf('echo') + 4
    console.log(command.substring(5))
    rl.prompt()
  }
  else{
    console.log(`${command}: command not found`)
  }

  rl.prompt()
})