/**
 * Declare a map of <char, count>. Next we need to loop through the string and
 * for each element we need to either insert it into the map or increment its
 * value. Once this is done we loop through the map and check for the first
 * entry who has a value of 1
 **/

const testSuite = [
    {
        input: 'abcdcaf',
        output: 1,
    },
    {
        input: '',
        output: -1,
    },
    {
        input: 'abcabc',
        output: -1,
    },
    {
        input: 'a',
        output: 0,
    },
]

const firstNonRepeatingChar = (string: string): number => {
    const wordBank = new Map<string, { count: number; index: number }>()
    // populating the word bank and generating char count.
    for (let i = 0; i < string.length; i++) {
        const char = string.charAt(i)
        const { count: currVal = undefined, index = undefined } =
            wordBank.get(char) ?? {}

        if (currVal !== undefined && index !== undefined) {
            wordBank.set(char, { count: currVal + 1, index })
        } else {
            wordBank.set(char, { count: 1, index: i })
        }
    }
    for (let [key, { count, index }] of wordBank) {
        if (count === 1) return index
    }
    return -1
}

const firstNonRepeatingCharV4 = (string: string): number => {
    const wordBank = new Map<string, { count: number; index: number }>()
    // populating the word bank and generating char count.
    for (let i = 0; i < string.length; i++) {
        const char = string[i]
        const { count: currVal = undefined, index = undefined } =
            wordBank.get(char) ?? {}

        if (currVal !== undefined && index !== undefined) {
            wordBank.set(char, { count: currVal + 1, index })
        } else {
            wordBank.set(char, { count: 1, index: i })
        }
    }
    for (let [key, { count, index }] of wordBank.entries()) {
        if (count === 1) return index
    }
    return -1
}

function firstNonRepeatingCharacterV2(string: string) {
    const charCounts = new Map<string, { count: number; index: number }>()

    // populate the charCounts map
    for (let i = 0; i < string.length; i++) {
        const char = string[i]
        const { count = 0, index = i } = charCounts.get(char) || {}
        charCounts.set(char, { count: count + 1, index })
    }

    // find the first non-repeating character
    for (let [char, { count, index }] of charCounts.entries()) {
        if (count === 1) return index
    }

    // no non-repeating character found
    return -1
}

export function firstNonRepeatingCharacterV3(string: string) {
    const charCounts = new Map<string, number>()

    // populate the charCounts map
    for (let i = 0; i < string.length; i++) {
        const char = string[i]
        charCounts.set(char, (charCounts.get(char) || 0) + 1)
    }

    // find the first non-repeating character
    for (let i = 0; i < string.length; i++) {
        const char = string[i]
        if (charCounts.get(char) === 1) return i
    }

    // no non-repeating character found
    return -1
}

testSuite.forEach((test, index) => {
    const ans = firstNonRepeatingChar(test.input)
    console.log({
        Test: 1,
        Input: test.input,
        Expected: test.output,
        Given: ans,
        Result: ans === test.output ? 'Passed' : 'Failed',
    })
})

/**
 * Notes:
 * I could have been more efficient by not storing the index in my map. Instead
 * since a map preserves the order of insertion I could have just reinterated
 * over the string and use that as the index as shown in example 3.
 *
 * In the case of iterating over a Map using Map.prototype.entries(), the
 * entries() method returns an iterator object that provides a way to iterate
 * over the key-value pairs in the Map. When you use a for...of loop to iterate
 * over the iterator object, the JavaScript engine creates an additional iterator
 * object to manage the iteration of the for...of loop.
 * By directly using the Map.prototype.entries() method and manually iterating
 * over the iterator object using the next() method, you can avoid creating an
 * unnecessary iterator object for the for...of loop. This can lead to a slight
 * performance improvement in some cases, especially for large collections.
 * However, the difference in performance is likely to be small, and the main
 * advantage of using Map.prototype.entries() directly is that it can make the
 * code slightly more concise and easier to read. Shown in v4.
 *
 * You don't need to use chatA to get the string at index i, you can use array
 * notation string[i]. shown in v4
 */
