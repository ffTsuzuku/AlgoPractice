const ceasar = (message: string, key: number): string => {
    let encryptedMsg = ''
    const charRange = [97, 122]
    for (let i = 0; i < message.length; i++) {
        let newChar = message.charCodeAt(i) + key
        if (newChar > 122) {
            const distanceFromZtoNewChar = newChar - charRange[1]
            const totalAlphabetSetsInDistance = Math.floor(
                distanceFromZtoNewChar / 26
            )
            const overflowDelta =
                distanceFromZtoNewChar - totalAlphabetSetsInDistance * 26
            newChar = charRange[0] + overflowDelta - 1
        }
        encryptedMsg += String.fromCharCode(newChar)
    }
    return encryptedMsg
}

console.log(ceasar('abc', 57))
