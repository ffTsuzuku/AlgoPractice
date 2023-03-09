const palindrome = (input): boolean => {
    for (let i = 0, j = input.length - 1; i <= j; i++, j--) {
        if (input.charAt(i) !== input.charAt(j)) return false
    }
    return true
}

console.log(palindrome('abcdcba'))
