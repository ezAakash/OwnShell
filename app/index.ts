import { createInterface } from "node:readline";
import Path from "path";
import { access, constants} from "fs/promises"
import type { PathLike } from "node:fs";
import { spawn } from "child_process";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const builtIns = ['echo', 'exit', 'type']
const pathDir : string[] | undefined  = process.env.PATH?.split(Path.delimiter) || []


async function searchForExecCommand(cmd: string): Promise<string | null> {
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

let runCommand = (cmd: string, args: string[]) => {
    spawn(cmd, args, { stdio: "inherit"})
}

rl.prompt();

rl.on('line', async (input) => {//created a REPL here.
    const inputParts: string[] = input.split(/\s+/)
    const cmd = inputParts[0]
    const args = inputParts.slice(1)

    if ( cmd === 'exit') {
        rl.close()
        return 
    }
    else if( cmd === "type") {  
        for (let i = 0; i < args!.length; i++) {
            if (builtIns.includes(args[i]!)){
                console.log(`${args[i]} is a shell builtin`)
                continue
            }
            
            const filePath = await searchForExecCommand(args[i]!);
            
            if ( filePath ) console.log(`${args[i]} is ${filePath}`)
            else console.log(`${args[i]} not found`)
        }
    }
    else if( cmd === 'echo' ) {
        const output = args.join(" ");
        process.stdout.write(output + "\n");
    }
    else if (await searchForExecCommand(cmd!)) {
        //console.log("command reached here")
        runCommand(cmd!, args)
        //console.log("command reached here111")
        
    }
    else {
        console.log(`${cmd}: command not found`)
    }

    rl.prompt()
})