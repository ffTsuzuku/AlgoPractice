// Takes in an array of at least 3 integers
// Does not sort the input array
// returns a sorted array of the three largest integers in the input array
// Can contain duplicates if necessary

// array = [141, 1, -17, 7, -17, -27, 18, 541, 8, 7, 7]
// ans = [18, 141, 541]

const topThreeNums = (source: number[]) => {
    const topThree: number[] = []

    for (const num of source) {
        if (topThree.length < 3) topThree.push(num)
        else {
            let greaterThanIndex: number | null = null
            const firstTopElement = topThree[0]
            const secondTopElement = topThree[1]
            const thirdTopElement = topThree[2]

            if (num > firstTopElement) {
                greaterThanIndex = 0
            }

            if (num > secondTopElement && firstTopElement > secondTopElement) {
                greaterThanIndex = 1
            }

            if (
                num > thirdTopElement &&
                firstTopElement > thirdTopElement &&
                secondTopElement > thirdTopElement
            ) {
                greaterThanIndex = 2
            }

            if (greaterThanIndex != null)
                topThree.splice(greaterThanIndex, 1, num)
        }
    }

    return topThree.sort((a: number, b: number) => a - b)
}

console.log(topThreeNums([141, 1, -17, 7, -17, -27, 18, 541, 8, 7, 7]))
