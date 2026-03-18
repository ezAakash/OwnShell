import { createInterface } from "node:readline";
import Path from "path";
import { access, constants} from "fs/promises"
import { type PathLike } from "node:fs";
import { execFileSync } from "child_process";
import { chdir } from "process"
import parse from "../utils/parse";


const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const builtIns = ['echo', 'exit', 'type', 'pwd', 'cd']
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


rl.prompt();

rl.on('line', async (input) => {//created a REPL here.
    const trimmedInput = input.trim()
    const parsedInput = parse(trimmedInput) as string[]
    const cmd = parsedInput[0]
    const args = parsedInput.slice(2)

    if ( cmd === 'exit') {
        rl.close()
        return
    }
    else if ( cmd === "cd") {
        const newdirPath = args.join(" ")
        
        try {
            if ( newdirPath === '~' ) {
                chdir(process.env.HOME!)
            }else {
                chdir(newdirPath)
            }
        }
        catch (err) {
            console.error(`cd: ${newdirPath}: No such file or directory`)
        }
    }
    else if( cmd === 'pwd') {
        const pwd = process.cwd()
        console.log(pwd)
    }
    else if( cmd === "type") {  
        for (let i = 0; i < args!.length; i++) {
            if ( args[i] === " " ) continue 

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
        const output = args.join("");
        console.log(output)
    }
    else if (await searchForExecCommand(cmd!)) {
        execFileSync(cmd!, args, { stdio: 'inherit'})
    }
    else {
        console.log(`${cmd}: command not found`)
    }

    rl.prompt()
})