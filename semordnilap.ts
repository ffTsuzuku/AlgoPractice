/**
 * This function is given a list of unique words aka its a set of
 * words. Within this set this function will aim to find a semordnilap
 * pair, which is a pair of words that are
 * equivalent when one is read forward and the other is read backwards.
 *
 * Note if you find a pair, you should just remove them from the array
 * if possible to be optimal.Since those words wontbe used again.
 *
 * Similarly If you dont find a pair for a word, you can remove it if
 * possible to be most optimal.
 * @param words: The set of words to parse.
 * @returns returns an empty array if no pairs found. Else returns
 * an array of string arrays.
 */
const semordnilap = (words: string[]): string[][] => {
    const pairs: string[][] = []

    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            const word1 = words[i]
            const word2 = words[j]
            // cant be the same
            if (word1.length !== word2.length) continue

            let isSmordnilap = true
            for (let k = 0, l = word1.length - 1; k <= l; k++, l--) {
                if (word1[k] !== word2[l]) {
                    isSmordnilap = false
                    break
                }
            }

            if (isSmordnilap) {
                pairs.push([word1, word2])
            }
        }
    }
    return pairs
}

// Optimized to remove elements
const semordnilapV2 = (words: string[]): string[][] => {
    const pairs: string[][] = []

    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            const word1 = words[i]
            const word2 = words[j]
            // cant be the same
            if (word1.length !== word2.length) continue

            let isSmordnilap = true
            for (let k = 0, l = word1.length - 1; k <= l; k++, l--) {
                if (word1[k] !== word2[l]) {
                    isSmordnilap = false
                    break
                }
            }

            if (isSmordnilap) {
                pairs.push([word1, word2])
                words.splice(i, 1)
                words.splice(j - 1, 1)
                i--
                break
            }
        }
    }
    return pairs
}

const semordnilapV3 = (words: string[]) => {
    const pairsSet = new Set<string>()

    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            const word1 = words[i]
            const word2 = words[j]
            if (word1.length !== word2.length) continue
            const sortedPair = [word1, word2].sort().join(',')
            if (pairsSet.has(sortedPair)) continue
            const reversedWord2 = word2.split('').reverse().join('')
            if (word1 === reversedWord2) {
                pairsSet.add(sortedPair)
            }
        }
    }

    return Array.from(pairsSet, (pair) => pair.split(','))
}

const testSuite = [
    {
        input: ['diaper', 'abc', 'test', 'cba', 'repaid'],
        output: [
            ['diaper', 'repaid'],
            ['abc', 'cba'],
        ],
    },
    {
        input: [],
        output: [],
    },
    {
        input: ['man', 'monkey', 'final', 'new', 'old'],
        output: [],
    },
]

testSuite.forEach((test) => {
    console.log({
        input: test.input,
        expected: test.output,
        actual: semordnilap(test.input),
    })
})

/**
 * Notes:
 * Some takeaways for this is I'm still not being careful enough with
 * loop conditions.
 *
 * Before I wrote the following code I even told myself that l needs
 * to be decremented, but then I ended up not decrementing it which
 * led to me wasting time trying to debug my code.
 *
 * for (let k = 0, l = word1.length - 1; k <= l; k++, l--)
 *
 * I thought up of an optimzation where I can remove elements in the
 * array as I go along, which is an optimization but dangerous. If
 * i'm in an interview I can mention the optimization to the person
 * and say If I really needed to make this faster I could remove elements
 * from the array to optimize further. And then add that optimization
 * if they request it.
 *
 * In my attempt to add that optimization I did fail initially because
 * I struggled to properly adjust the i and j indexes to implement it
 * properly. In particular I overlooked this part.
 *
 * words.splice(j - 1, 1)
 *
 * Inititally I did not splice at index j - 1 and instead spliced at j.
 * I should have realized that removing an element that occurs
 * remove j would make it point to a future element.
 *
 *
 * While not relevant to this problem chatGPT brought up a good point
 * in that if the original words array was not guranteed to contain
 * unique words, you actually may want to optimize that by storing
 * pairs in a set. That way you can look up if a pair already exist in
 * O(1) time. Note in order to do this, youd need to convert the pair
 * which is typically an array into a string. Since set would not
 * detect objects as being similar.
 */
