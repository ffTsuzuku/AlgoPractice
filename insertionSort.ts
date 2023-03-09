// Loop thru the input array.
// Take the current element and look through the sorted array and find the right index.
const insertionSort = (inputArray: number[]): number[] => {
    const sorted: number[] = []

    for (const element of inputArray) {
        if (!sorted.length) sorted.push(element)
        else {
            let inserted = false
            for (let i = sorted.length - 1; i >= 0; i--) {
                if (sorted[i] > element) continue
                else sorted.splice(i + 1, 0, element)
                inserted = true
                break
            }
            if (!inserted) sorted.splice(0, 0, element)
        }
    }
    return sorted
}

const array = [2, 5, 8, 9, 5, 6, 3, -8, -2]
console.log(`Sorting: ${array}`)
console.log(insertionSort(array))
