// A run of data is any sequence of consecutive idential characters.
// Note: characters can be numbers, special chars, or alphabetical.
// Note: To encode a run, simply place a count value next to the char. e.g
// AAA would become 3A.
// Note: runs that have a length of 10 or greater need to be split up. Since
// there is no way to know if 12A is the string 1AA or AAAAAAAAAAAA. Hence
// instead we encode it as 9A3A.
// This means any time there is a # next to a char we know its encoded value.
// This also means all encoded data is represented a 2 chars worth of data.
const runLengthEncoding = (string: string): string => {
    let encodedMsg = ''

    let currChar = string[0]
    let currCharCount = 1

    for (let i = 1; i < string.length; i++) {
        if (string[i] === currChar) {
            currCharCount++
            continue
        }
        // Not the same as previous char.
        encodedMsg += encodeData(currChar, currCharCount)
        currChar = string[i]
        currCharCount = 1
    }
    encodedMsg += encodeData(currChar, currCharCount)
    return encodedMsg
}

const encodeData = (char: string, charCount: number): string => {
    let encodedMsg = ''
    const setsOf9 = Math.floor(charCount / 9)
    const residual = Math.floor(charCount % 9)
    for (let j = 0; j < setsOf9; j++) {
        encodedMsg += `9${char}`
    }
    if (residual) {
        encodedMsg += `${residual}${char}`
    }

    return encodedMsg
}

console.log(runLengthEncoding('AAAAAAAAAAAAABBCCCCDD'))

/**
 * Lessons Learned:
 * Its better to handle last element logic outside the for loop, especially if
 * you need to apply last element logic for multiple things. This way last element
 * logic is all consolidated into one place. Here we run the encodeMsg one last
 * time since it never gets run for the last element.
 *
 * I need to start thinking about last elements in general. In this case I
 * originally forgot to even handle the edge case for last element.
 *
 * I need to pay more attention to how I loop through things. I often mess up
 * the termination condition in for loops.
 */
