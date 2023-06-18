
const puzzleEl1 = document.querySelector('#puzzle')
const puzzleEl2 = document.querySelector('#puzzle2')
const puzzleEl3 = document.querySelector('#puzzle3')
const puzzleEl4 = document.querySelector('#puzzle4')
const statusMessageEl = document.querySelector('#guesses')
const levelNumberEl = document.querySelector('#levelNumber')
const guessesContainer = document.querySelector('#guessesContainer')
const guessesLabel = document.querySelector('#guessesLabel')
const scoreLabelNumber = document.querySelector('#scoreLabelNumber')
const themeLabel = document.querySelector('#themeLabel')
const statusMessage1 = document.createElement('p')
const statusMessage2 = document.createElement('p')
const statusMessage3 = document.createElement('p')
const statusMessage4 = document.createElement('p')
let guessedLettersEl = document.querySelector('#guessedLetters')
let randomTheme = ''
let level = 0
let score = 0
let game1
let game2
let game3
let game4
let ranOnce = false
let remainingGuesses = 9
let status = 'playing'
let guessedLetters = []

function statusMessage(status) {
    if (status === 'playing') {
        return `Guesses left: ${remainingGuesses}`
    } else if (status === 'failed') {
        return `Nice try! but the words were: ${this.word.join('')}`
    } else {
        return 'Greta Work! You win!'
    }
}
console.log(wordList)

// puzzleEl.textContent = game1.puzzle
// guessesEl.textContent = game1.statusMessage

window.addEventListener('keydown', (e) => {
    if(remainingGuesses < 1) return
    const guess = e.key.toLowerCase()

    if (/^[a-z]$/.test(guess) === false) return
 
    let isBadGuess = (game1.checkLetter(guess, guessedLetters) &&
    game2.checkLetter(guess, guessedLetters) &&
    game3.checkLetter(guess, guessedLetters) &&
    game4.checkLetter(guess, guessedLetters))

    if(!guessedLetters.includes(guess)) {guessedLetters.push(guess)}

    if(isBadGuess) remainingGuesses--

    game1.addToGuessedLetters(guess)
    game2.addToGuessedLetters(guess)
    game3.addToGuessedLetters(guess)
    game4.addToGuessedLetters(guess)
   render(guess, isBadGuess)
})

const render = (guess, isBadGuess) => {
    puzzleEl1.innerHTML = ''
    puzzleEl2.innerHTML = ''
    puzzleEl3.innerHTML = ''
    puzzleEl4.innerHTML = ''
    letter = document.createElement('span')
    letter.className = "letterSpan"
    levelNumberEl.textContent = `Level: ${level}`
    themeLabel.textContent = `Theme: ${randomTheme.theme}`
    scoreLabelNumber.textContent = `${score}`
    guessesLabel.textContent = `Guesses: ${remainingGuesses}`
    // setup game1Ends to trigger additional status messages without redundant guesses left
    if (remainingGuesses <= 0) {   
        statusMessage1.textContent = `${game1.word.join('')}`
        guessesContainer.appendChild(statusMessage1)
       statusMessage2.textContent = `${game2.word.join('')}`
       guessesContainer.appendChild(statusMessage2)
       statusMessage3.textContent = `${game3.word.join('')}`
       guessesContainer.appendChild(statusMessage3)
       statusMessage4.textContent = `${game4.word.join('')}`
       guessesContainer.appendChild(statusMessage4)
    }
    if (remainingGuesses > 0) {   
        statusMessage1.innerHTML = ''
        guessesContainer.appendChild(statusMessage1)
       statusMessage2.innerHTML = ''
       guessesContainer.appendChild(statusMessage2)
       statusMessage3.innerHTML = ''
       guessesContainer.appendChild(statusMessage3)
       statusMessage4.innerHTML = ''
       guessesContainer.appendChild(statusMessage4)
    }
    let lastLetter = guessedLetters[guessedLetters.length - 1]
    if(guessedLetters.length && !guessedLettersEl.textContent.includes(guess)){

         letter.textContent = `${lastLetter} `
         if(isBadGuess){
             letter.className = "bad-letter"
         } else {
             letter.className = "green-text"
         }
         guessedLettersEl.appendChild(letter)
         }
         
        let roundScore = 0

        game1.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.className = "letterSpan"
            letterEl.textContent = letter
            puzzleEl1.appendChild(letterEl)
            roundScore++
        })
        if(game1.status === 'finished') puzzleEl1.className = "green-text puzzle"
        
        game2.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.className = "letterSpan"
            letterEl.textContent = letter
            puzzleEl2.appendChild(letterEl)
            roundScore++
        })
        if(game2.status === 'finished') puzzleEl2.className = "green-text puzzle"
        
        game3.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.className = "letterSpan"
            letterEl.textContent = letter
            puzzleEl3.appendChild(letterEl)
            roundScore++
        })
        if(game3.status === 'finished') puzzleEl3.className = "green-text puzzle"
        
        game4.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.className = "letterSpan"
            letterEl.textContent = letter
            puzzleEl4.appendChild(letterEl)
            roundScore++
        })
        if(game4.status === 'finished') puzzleEl4.className = "green-text puzzle"

        if(game1.status === "finished" 
        && game2.status === "finished" 
        && game3.status === "finished" 
        && game4.status === "finished"){
            remainingGuesses = 5
            statusMessage1.textContent = ''
            statusMessage2.textContent = ''
            statusMessage3.textContent = ''
            statusMessage4.textContent = ''
            guessedLettersEl.textContent = ''
            puzzleEl1.classList.remove("green-text")
            puzzleEl2.classList.remove("green-text")
            puzzleEl3.classList.remove("green-text")
            puzzleEl4.classList.remove("green-text")
            increaseScore(score, score, roundScore)
            .then(() => {
              console.log('Score increment completed!');
            })
            .catch(error => {
              console.error('Error:', error);
            });
            startGame()
        }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function increaseScore(displayScore, initialScore, roundScore) {
    while (displayScore < (roundScore + initialScore)) {
      displayScore++;
      scoreLabelNumber.textContent = `${displayScore}`
      scoreLabelNumber.className = "green-text"
      console.log(displayScore); // Print the current score
      
      await sleep(40); // Wait for 200 milliseconds (0.2 seconds)
    }
    score = displayScore
    scoreLabelNumber.className = 'scoreLabelNumber'
    console.log(score);
  }



const startGame = async () => {
    level++ 
    if(level <= 6){
        randomTheme = wordList[Math.floor(Math.random() * 4)]
        const randomThemedEasyWords = randomTheme.easyWords
        console.log(randomThemedEasyWords)
        
        //generate words and check for duplicates
        let checkForDuplicates = []
        
        let puzzle = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        checkForDuplicates.push(puzzle)
        let puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        if(checkForDuplicates.includes(puzzle2)){
            puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        }
        checkForDuplicates.push(puzzle2)

        let puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        if(checkForDuplicates.includes(puzzle3)){
            puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        }
        checkForDuplicates.push(puzzle3)
        
        let puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        if(checkForDuplicates.includes(puzzle4)){
            puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        }
        checkForDuplicates.push(puzzle4)

        game1 = new Hangman(puzzle, 5)
        game2 = new Hangman(puzzle2, 5)
        game3 = new Hangman(puzzle3, 5)
        game4 = new Hangman(puzzle4, 5)
        guessedLetters = []
        remainingGuesses += 3
        render()
    } else if (level >= 7 && level <= 14){
        randomTheme = wordList[Math.floor(Math.random() * 4)]
        const randomThemedEasyWords = randomTheme.midWords
        console.log(randomThemedEasyWords)
  
        
          //generate words and check for duplicates
          let checkForDuplicates = []
        
          let puzzle = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          checkForDuplicates.push(puzzle)
          let puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(checkForDuplicates.includes(puzzle2)){
              puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          checkForDuplicates.push(puzzle2)
  
          let puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(checkForDuplicates.includes(puzzle3)){
              puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          checkForDuplicates.push(puzzle3)
          
          let puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(checkForDuplicates.includes(puzzle4)){
              puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          checkForDuplicates.push(puzzle4)

          
        game1 = new Hangman(puzzle, 5)
        game2 = new Hangman(puzzle2, 5)
        game3 = new Hangman(puzzle3, 5)
        game4 = new Hangman(puzzle4, 5)
        guessedLetters = []
        remainingGuesses += 2
        render()
    } else if (level > 14){
        randomTheme = wordList[Math.floor(Math.random() * 4)]
        const randomThemedEasyWords = randomTheme.hardWords
        console.log(randomThemedEasyWords)
     
        
          //generate words and check for duplicates
          let checkForDuplicates = []
        
          let puzzle = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          checkForDuplicates.push(puzzle)
          let puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(checkForDuplicates.includes(puzzle2)){
              puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          checkForDuplicates.push(puzzle2)
  
          let puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(checkForDuplicates.includes(puzzle3)){
              puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          checkForDuplicates.push(puzzle3)
          
          let puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(checkForDuplicates.includes(puzzle4)){
              puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          checkForDuplicates.push(puzzle4)

  
        game1 = new Hangman(puzzle, 5)
        game2 = new Hangman(puzzle2, 5)
        game3 = new Hangman(puzzle3, 5)
        game4 = new Hangman(puzzle4, 5)
        guessedLetters = []
        remainingGuesses++
        render()
    }
}

const reset = () => {

    guessedLetters = []
    level = 0
    remainingGuesses = 9
    score = 0
    guessedLettersEl.textContent = ''
    puzzleEl1.classList.remove("green-text")
    puzzleEl2.classList.remove("green-text")
    puzzleEl3.classList.remove("green-text")
    puzzleEl4.classList.remove("green-text")
    startGame()
}



document.querySelector('#reset').addEventListener('click', reset)

startGame()


// getPuzzle('2').then((puzzle) => {
//     console.log(puzzle)
// }).catch((err) => {
//     console.log(err)
// })

getCurrentCountry().then((country) => {
    console.log(country.name)
}).catch((err) => {
    console.log(err)
})

getLocation().then((location) => {
   return getCountry(location.country)
}).then((country) => {
    console.log(country.name)
}).catch((err) => {
    console.log(err)
})








// const createTipper = (baseTip) => {
//     return (amount) => {
//         return baseTip * amount
//     }
// }

// const tip20 = createTipper(.2)
// const tip30 = createTipper(.3)
// console.log(tip20(100))
// console.log(tip30(150))




// setTimeout(() => {
//     console.log(tip20(300))
// }, 2000)



// const getDataPromise = (num) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         typeof num === 'number' ? resolve(num * 2) : reject('number must be provided')
//     },350)
// })

// getDataPromise(2).then((data) => {
//     getDataPromise(2).then((data) => {
//         console.log(data)
//     }, (err) => {
//         console.log(err)
//     })
//         }, (err) => {
//         console.log(err)
//     })



    // getDataPromise(10).then((data) => {
    //     console.log(data)
    //     return getDataPromise(data)
    // }).then((data) => {
    //     console.log(data)
    //     return 'test data'
    // }).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log(err)
    // })

