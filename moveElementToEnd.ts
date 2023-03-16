/**
 * Given an array and an number, this function will move all instances
 * of that number inside the array to the end of the array. Note
 * this is done inplace and consequently modifed the original array.
 *
 * Note: this function does not preserve the order of the elements.
 * @param array
 * @param toMove
 */
const moveElementToEnd = (
    array: number[],
    toMove: number
): number[] => {
    // O(nlogn)
    array.sort((a, b) => a - b)

    let sIndex: number | undefined = undefined
    let eIndex: number | undefined = undefined

    // O (n)
    for (let i = 0; i < array.length; i++) {
        const currVal = array[i]
        if (currVal === toMove) {
            // if sIndex is not set set it.
            // if eIndex is not set set it.
            if (sIndex == undefined && eIndex == undefined) {
                console.log('init', i)
                sIndex = i
                eIndex = i
            } else {
                eIndex = i
            }
        }
    }

    if (sIndex == undefined || eIndex == undefined) return array

    // O (n)
    array.splice(sIndex, eIndex - sIndex + 1)

    // O(m)
    for (let i = 0; i < eIndex - sIndex + 1; i++) {
        array.push(toMove)
    }

    return array
}
export { moveElementToEnd }
