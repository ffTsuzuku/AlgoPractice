const smallestDifference = (
    arrayOne: number[],
    arrayTwo: number[]
): number[] => {
    // arrayOne.sort((a, b) => a - b)
    // arrayTwo.sort((a, b) => a - b)
    let pair: number[] = []
    // [-1, 2, 5, 7, 10, 13]
    // [-3, 4, 9, 12, 14, 15 ]

    // Loop thru a1 we keep comparing with b1 until oneof the following
    // We find a diff of 0.
    // or the new diff is greater than prev diff.
    // If case 1 we are finished.
    // if case 2 we move on to next element.
    let smallestDifference = Infinity
    for (let i = 0; i < arrayOne.length; i++) {
        for (let j = 0; j < arrayTwo.length; j++) {
            const elementOne = arrayOne[i]
            const elementTwo = arrayTwo[j]
            const diff = Math.abs(elementOne - elementTwo)

            if (diff === 0) return [elementOne, elementTwo]

            if (diff < smallestDifference) {
                pair = [elementOne, elementTwo]
                smallestDifference = diff
            }
        }
    }
    return pair
}
/**
We first sort the array so we can traverse through them more
Intelligently. Instead of using two for loops.
Next we start Going through the arrays from the start, and compare
the values.

If arrayOneVal < arrayTwo value, then we know that to bridge the gap
and get a smaller diff we should only move the arrayOne index forward.

If the inverse was true, we know that we should only move the index of
arrayTwo forward.

If the numbers are the same, then we have a diff of 0 and we can term.

Note if the diff is greather than previous diff, don't update.
**/

type Pair = [number, number]
const smallestDifferenceV2 = (
    arrayOne: number[],
    arrayTwo: number[]
): Pair => {
    let pair: Pair = [Infinity, Infinity]

    const ascendingSort = (a: number, b: number) => a - b
    arrayOne.sort(ascendingSort)
    arrayTwo.sort(ascendingSort)

    const calculateDiff = (a: number, b: number) => Math.abs(a - b)
    let arrayOneIndex = 0
    let arrayTwoIndex = 0
    while (
        arrayOneIndex < arrayOne.length &&
        arrayTwoIndex < arrayTwo.length
    ) {
        const arrayOneVal = arrayOne[arrayOneIndex]
        const arrayTwoVal = arrayTwo[arrayTwoIndex]

        if (arrayOneVal === arrayTwoVal) {
            return [arrayOneVal, arrayTwoVal]
        }

        const diff = calculateDiff(arrayOneVal, arrayTwoVal)
        const prevDiff = calculateDiff(pair[0], pair[1])
        if (isNaN(prevDiff) || diff < prevDiff) {
            pair = [arrayOneVal, arrayTwoVal]
        }

        if (arrayOneVal < arrayTwoVal) {
            arrayOneIndex++
        } else {
            arrayTwoIndex++
        }
    }
    return pair
}

console.log(
    smallestDifferenceV2(
        [-1, 5, 10, 20, 28, 3],
        [26, 134, 135, 15, 17]
    )
)

/**
 * Note: So originally I did this the naive way with two for loops.
 * I had an inkling that sorting the arrays could help me get a faster
 * time but I couldn't connect the dots. With the optimization
 * instead of looping through each element in array two for every
 * element of array one, we say compare the current val of array one
 * with array two. Since things are sorted, we know the effect moving
 * the index for either array will have on the sum. In other words
 * we know if incrementing the index of array one to two will lead
 * to a higher diff or lower. This we only increment the idnex of an
 * array when we know it will lead to a possible lower diff.
 */
