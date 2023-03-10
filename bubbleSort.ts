const bubbleSort = (inputArray: number[]): number[] => {
    let unSorted = true
    let sortedElements = 0
    while (unSorted) {
        let shuffled = false

        // add sorting logic here
        // loop thru the array compare currNum to next if next is less than curr swap
        // continue thru rest of the array
        // keep looping thry until a shuffle doesnt occur
        // note at the end of each loop the last element in the array will be
        // guranteed to be the largest
        for (let i = 0; i < inputArray.length - sortedElements - 1; i++) {
            const curr = inputArray[i]
            const next = inputArray[i + 1]

            if (curr > next) {
                const tmp = next
                inputArray[i + 1] = curr
                inputArray[i] = tmp
                shuffled = true
            }
        }

        sortedElements++
        if (!shuffled) unSorted = false
    }
    return inputArray
}

console.log(bubbleSort([2, 3, 5, 5, 6, 8, 9]))
