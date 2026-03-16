import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const builtIns = ['echo', 'exit', 'type']

rl.prompt();

rl.on('line', (command) => {//created a REPL here.
  if ( command === 'exit') {
    rl.close()
    return 
  }
  else if( command.startsWith('type')) {
    const words = command.split(' ')
  
    if ( words[0] !== "type" ) {
      console.log(`${command} not found`)
      rl.prompt()
      return 
    }

    for (let i = 1; i < words.length; i++) {
      if (builtIns.includes(words[i]!)){
        console.log(`${words[i]} is a shell builtin`)
      }
      else if (words[i] === "") {
        continue
      }
      else {
        console.log(`${words[i]} not found`)
      }
    }
  }
  else{
    console.log(`${command}: command not found`)
  }

  rl.prompt()
})