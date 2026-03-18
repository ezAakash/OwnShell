export default function parse(command: string) {
    // first tokenize it.
    //single quotes 
    const parsed: string[] = []

    const tokens = [...command]
    const n = tokens.length;
    let i = 0;
    // echo 'hello there'
    while ( i < n ) {
        // ' , space , character
        if ( tokens[i] === '"' ) {
            let literal = ""
            i++
            while ( i < n && tokens[i] !== "'" ) {
                literal += tokens[i++]
            }
            parsed.push(literal)
            literal = ""
        }
        else if ( tokens[i] === "'" ) {
            //entering single Quotes mode
            let literal = ""
            i++
            while ( i < n && tokens[i] !== "'" ) {
                literal += tokens[i++]
            }
            parsed.push(literal)
            literal = ""
        }
        else if ( tokens[i] === '\\' ){
            i++
            
            console.log(tokens[i])
        } else if ( tokens[i] !== " " ) {
            let cmdOrarg = tokens[i]
            i++
            while ( i < n && ![" ", "'" ].includes(tokens[i]!) ) {
                cmdOrarg += tokens[i++]!
            }
            parsed.push(cmdOrarg!)
        } 
        else {
            //hello 
            parsed.push(" ")
            i++
            while ( i < n && tokens[i] === " " ) {
                console.log(tokens[i])
                i++
            }
        }

    }

    return parsed
    
}