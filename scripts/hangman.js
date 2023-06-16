class Hangman {
    constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('')
    this.remainingGuesses = remainingGuesses
    this.status = 'playing'
    this.guessedLetters = []
    }
    get puzzle() {
        let _puzzle = ''
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                _puzzle += letter
            } else {
                _puzzle += '*'
            }
    })
    return _puzzle
    }
    
    calculateStatus() {
        let finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
        if (this.word.every((letter) => this.guessedLetters.includes(letter))){
            this.status = 'finished'
        }
    }
    checkLetter(guess, guessedLetters) {
        guess = guess.toLowerCase()
        const isBadGuess = !this.word.includes(guess)
    
        this.calculateStatus()
        
        return isBadGuess
    }


    addToGuessedLetters(letter){
        this.guessedLetters.push(letter)
        this.calculateStatus()
    }
} 




// playing with recusersion

// function rangeOfNumbers(startNum, endNum) {
//     if (startNum > endNum) {
//         return []
//       } else {
//         const range = rangeOfNumbers(startNum + 1, endNum)
//         range.push(startNum) 
//         return range
//       }
//   };
 
// console.log(rangeOfNumbers(10,20))


//   function rangeOfNumbers2(startNum, endNum) {
//     if (endNum < startNum) {
//       return [];
//     } else {
//       const numbers = rangeOfNumbers2(startNum, endNum - 1);
//       numbers.push(endNum); 
//       return numbers;
//     }
//   }
//   console.log(rangeOfNumbers2(10,20))



// let printNumTwo;
// for (let i = 0; i < 3; i++) {
//   if (i === 2) {
//     printNumTwo = function() {
//       return i;
//     };
//   }
// }
// console.log(printNumTwo());
// // console.log(i);