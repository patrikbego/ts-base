describe("Algo Expert", () => {
    describe("simple tests", () => {

        test("sortedSquaredArray", async () => {
            function sortedSquaredArray(array: number[]) {
                if(!array) return []
                for (let i = 0; i < array.length; i++) {
                    array[i] *= array[i]
                }
                return array.sort((a, b) => a - b);
            }

            expect(sortedSquaredArray([1,2,4])).toEqual([1,4,16]);
            expect(sortedSquaredArray([1,-2,-4])).toEqual([1,4,16]);
            expect(sortedSquaredArray([-2, 1,2,4])).toEqual([1,4, 4,16]);
            expect(sortedSquaredArray([])).toEqual([]);
            expect(sortedSquaredArray([-2])).toEqual([4]);
        })

        test("reverseString", async () => {
            function reverseString(s: string[]): string[] {
                let l = 0;
                let r = s.length -1;
                while (l < r) {
                    let temp = s[l];
                    s[l] = s[r];
                    s[r] = temp;
                    l ++;
                    r --;
                }
                return s;
            }

            expect(reverseString([])).toEqual([])
            expect(reverseString(['a', 'b', 'n'])).toEqual(['n', 'b', 'a'])
            expect(reverseString(['a', 'b'])).toEqual(['b', 'a'])
        })

        test("isValidSubsequence", async () => {
            function isValidSubsequence(array: number[], sequence: number[]) {
                if (sequence.length > array.length || sequence.length === 0) return false;
                let pointer = 0;
                for (let i = 0; i < array.length; i++) {
                    if(sequence[pointer] === array[i]) {
                        pointer ++;
                    }
                }
                return pointer === sequence.length;
            }

            expect(isValidSubsequence([1, 2, 4], [4, 2])).toEqual(false)
            expect(isValidSubsequence([1, 2, 4], [2, 4])).toEqual(true)
            expect(isValidSubsequence([1, 2, 4], [])).toEqual(false)
            expect(isValidSubsequence([1, 2, 4], [1,2,3,4])).toEqual(false)
        })

        test("2 number sum - binary search", async () => {
            function twoNumberSum(array: number[], targetSum: number) {
                array.sort((a, b) => (a - b));
                let l = 0;
                let r = array.length - 1;
                while (l < r) {
                    if (array[l] + array[r] === targetSum) {
                        return [array[l], array[r]]
                    } else if (array[l] + array[r] > targetSum) {
                        r--;
                    } else {
                        l++;
                    }
                }
                return [];
            }

            console.log(twoNumberSum([5, 6, 7, 1, 2, 4], 3))
            expect(twoNumberSum([1, 2, 4], 3)).toEqual([1, 2])
        })


        test("2 number sum - intuitive solution", async () => {
            function twoNumberSum(array: number[], targetSum: number) {
                for (let i = 0; i < array.length; i++) {
                    for (let j = 0; j < array.length; j++) {
                        if (array[i] + array[j] === targetSum && i != j) {
                            return [array[i], array[j]];
                        }
                    }
                }
                return [-1, -1];
            }

            console.log(twoNumberSum([1, 2, 4], 3))
            expect(twoNumberSum([1, 2, 4], 3)).toEqual([1, 2])
        })

        test(" 1 + 1 = 2", async () => {
            expect(1 + 1).toEqual(2);
        })
    })
})