// Goal take a special array (spa)and return its product sum.
// A Special array is a non-empty array that contains integers or other sp array
// The sum of an SPA is sum of its elements multipled by depth level.
// Depth starts at 1.

// array = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
// ans: 12

type SpecialArray = Array<number | SpecialArray>
const productSum = (specialArray: SpecialArray, depth = 1): number => {
    let total = 0
    for (const element of specialArray) {
        if (Array.isArray(element)) {
            total += productSum(element, depth + 1)
        } else {
            total += element
        }
    }

    return depth * total
}

console.log(productSum([5, 2, [7, -1], 3, [6, [-13, 8], 4]]))
