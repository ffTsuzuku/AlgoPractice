// Loop through the array and find the smallest element.
// Take this element and swap it with the element @ position sortedElements
// Don't stop doing the above two steps until sorted Elements  arrayLength - 1
// Additionally only loop through unsorted elements at each pass thru
const selectionSort = (inputArray: number[]): number[] => {
    let sortedElements = 0
    while (sortedElements < inputArray.length) {
        let smallestElIndex: number | null = null
        for (let i = sortedElements; i < inputArray.length; i++) {
            if (smallestElIndex == null) smallestElIndex = i
            else if (inputArray[i] < inputArray[smallestElIndex]) {
                smallestElIndex = i
            }
        }
        if (smallestElIndex == null) continue
        else if (smallestElIndex !== sortedElements) {
            const leftMostUnsortedElement = inputArray[sortedElements]
            const smallestEl = inputArray[smallestElIndex]
            inputArray.splice(sortedElements, 1, smallestEl)
            inputArray.splice(smallestElIndex, 1, leftMostUnsortedElement)
        }
        sortedElements++
    }
    return inputArray
}

console.log(selectionSort([2, 3, 9, 9, 5, 6, 5]))
