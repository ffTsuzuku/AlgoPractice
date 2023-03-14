/**
 * Given an array of distinct numbers, that is guranteed to be
 * non-empty. This function should find all triplets that add up to
 * equal a target sum. This functin should return the a two-dimensional
 * array of the triplets. With his triplet array being sorted in
 * ascending order.
 */
type Pair = [number, number]
type Triplet = [number, number, number]
type test = { input: { nums: number[]; target: number }; ouput: Pair[] }

const twoSum = (array: number[], targetSum: number): Pair[] => {
    let pairBank = new Set<string>()
    const numberBank = new Set(array)

    for (const currNum of numberBank) {
        const remainder = targetSum - currNum

        // there will never be a duplicate so dont look for one
        if (remainder === currNum) {
            continue
        }

        if (numberBank.has(remainder)) {
            const pair = [currNum, remainder].sort((a, b) => a - b).toString()
            if (pairBank.has(pair)) continue
            pairBank.add(pair)
        }
    }
    return Array.from(pairBank.values())
        .map((pair) => {
            return pair.split(',').map((num) => parseInt(num)) as Pair
        })
        .sort((pair1, pair2) => {
            for (let i = 0; i < pair1.length; i++) {
                const num1 = pair1[i]
                const num2 = pair2[i]

                if (num1 === num2) continue
                return num1 - num2
            }
            return pair1[0] - pair2[0]
        })
}

const threeSum = (array: number[], target: number): Triplet[] => {
    const tripletBank = new Set<string>()

    for (let i = 0; i < array.length; i++) {
        const currNum = array[i]
        const remainder = target - currNum
        const pairs = twoSum(array.slice(i + 1), remainder)
        for (const pair of pairs) {
            const [num1, num2] = pair
            if (num1 !== undefined && num2 !== undefined) {
                const triplet = [currNum, num1, num2].sort((a, b) => a - b)
                const stringTriplet = triplet.join(',')
                if (tripletBank.has(stringTriplet)) continue
                tripletBank.add(stringTriplet)
            }
        }
    }

    return Array.from(tripletBank.values())
        .map((tripletString) => {
            return tripletString
                .split(',')
                .map((tripletNum) => parseInt(tripletNum)) as Triplet
        })
        .sort((triplet1, triplet2) => {
            for (let i = 0; i < triplet1.length; i++) {
                if (triplet1[i] === triplet2[i]) continue

                return triplet1[i] - triplet2[i]
            }

            return triplet1[0] - triplet2[0]
        })
}

const threeSumsV2 = (array: number[], target: number): Triplet[] => {
    const triplets: Triplet[] = []
    array.sort((a, b) => a - b)
    for (let i = 0; i < array.length; i++) {
        const currNum = array[i]
        for (let j = i + 1, k = array.length - 1; j < k; ) {
            const left = array[j]
            const right = array[k]

            const sum = currNum + left + right
            if (sum === target) {
                triplets.push([currNum, left, right])
                j++
                k--
            } else if (sum < target) {
                j++
            } else {
                k--
            }
        }
    }
    return triplets
}

const twoSumTestSuite: test[] = [
    {
        input: {
            nums: [1, 2, 3, 4, 5, 10, -5, 0, 15],
            target: 10,
        },
        ouput: [
            [-5, 15],
            [0, 10],
        ],
    },
    {
        input: {
            nums: [],
            target: 10,
        },
        ouput: [],
    },
    {
        input: {
            nums: [-29, 10, 23, 15, 11],
            target: 10,
        },
        ouput: [],
    },
]

twoSumTestSuite.forEach((test, index) => {
    const {
        input: { nums, target },
        ouput,
    } = test

    const res = twoSum(nums, target)
    console.log({
        test: index,
        input: nums,
        ans: ouput,
        got: res,
        passed: JSON.stringify(res) === JSON.stringify(ouput),
    })
})
