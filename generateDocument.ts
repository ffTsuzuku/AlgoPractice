// We need to figure out if its possible to recreate a string (document)
// given a character bank.
// Note once you use a character from the bank it is not resuable and you must
// contain additional copies of that letter to reuse it.
// Note: The "" string is free to generate.

// Free test case.
/// Word Bank "Bste!hetsi ogEAxpelrt x "
// Document:  = "AlgoExpert is the Best!"
// Output: True

interface testCase {
    characters: string
    document: string
    ans: boolean
}

const testSuite: testCase[] = [
    {
        characters: 'Bste!hetsi ogEAxpelrt x ',
        document: 'AlgoExpert is the Best!',
        ans: true,
    },
    {
        characters: 'sfjskl;fjskl fhkshn;sd;j',
        document: '',
        ans: true,
    },
    {
        characters: '',
        document: '',
        ans: true,
    },
    {
        characters: '',
        document: 'jfsklfjsdklsd',
        ans: false,
    },
    {
        characters: 'Abcd',
        document: 'abcd',
        ans: false, // NOTE: This may actually be true
    },
]

const generateDocument = (characters: string, document: string): boolean => {
    const wordBank = new Map<string, number>()

    // populate word bank with given chars.
    for (const char of characters) {
        const charCount = wordBank.get(char)
        if (charCount) {
            wordBank.set(char, charCount + 1)
        } else {
            wordBank.set(char, 1)
        }
    }

    for (const char of document) {
        const charCount = wordBank.get(char)
        if (charCount) {
            wordBank.set(char, charCount - 1)
        } else {
            return false
        }
    }
    // empty document.
    return true
}

const generateDocumentV2 = (characters: string, document: string): boolean => {
    // 128 possible ascii values.
    const wordBank = new Array(128).fill(0)

    // populate bank
    for (const char of characters) {
        wordBank[char.charCodeAt(0)]++
    }

    for (const char of document) {
        wordBank[char.charCodeAt(0)]--
        if (wordBank[char.charCodeAt(0)] < 0) {
            return false
        }
    }

    return true
}

testSuite.forEach((test, index) => {
    const { characters, document, ans } = test

    console.log(
        `Test ${index}: ${generateDocumentV2(characters, document) === ans}`
    )
})

/**
 * Notes:
 *
 * From now on when dealing with chars and confirming their value, I should take
 * into account if I want to differentiate between capital and lowercase. In
 * this case it didnt end up mattering, but that was something I almost overlooked.
 *
 * Another solution provided by chatGPT would be to use an array instead of a
 * map. The array solution is listed above as V2.
 *
 * Use a plain object instead of a Map:
 * Using a plain object instead of a Map can be more efficient because objects
 * are optimized for key-value storage and can be faster to access than maps.
 *
 *
 */
