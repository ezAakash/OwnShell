import { createInterface } from "node:readline";
import Path from "path";
import { access, constants, readdir } from "fs/promises"
import type { PathLike } from "node:fs";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const builtIns = ['echo', 'exit', 'type']
const pathDir : string[] | undefined  = process.env.PATH?.split(Path.delimiter) || []


async function searchForCommand(cmd: string): Promise<string | null> {
    for (const path of pathDir!) {
        const filePath: PathLike = Path.join(path ,cmd)
        try{
            await access(filePath, constants.X_OK)
            return filePath
        }
        catch {
            continue
        }
    }

    return null
}


rl.prompt();

rl.on('line', async (command) => {//created a REPL here.
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

      if ( words[i] === "" ) {
        continue
      }

      if (builtIns.includes(words[i]!)){
        console.log(`${words[i]} is a shell builtin`)
        continue
      }
      
      const filePath = await searchForCommand(words[i]!);
    
      if (!!filePath) {
        console.log(`${words[i]} is ${filePath}`)
      }
      else {
        console.log(`${words[i]} not found`)
      }
    }
  }
  else if(command.startsWith('echo')) {
    const words = command.split(/\s+/)

    if ( words[0] !== 'echo') {
      console.log(`${command}: command not found`)
      return 
    }

    const output = words.slice(1).join(" ");
    process.stdout.write(output + "\n");
  }
  else{
    console.log(`${command}: command not found`)
  }

  rl.prompt()
})