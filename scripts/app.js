
const puzzleEl1 = document.querySelector('#puzzle')
const puzzleEl2 = document.querySelector('#puzzle2')
const puzzleEl3 = document.querySelector('#puzzle3')
const puzzleEl4 = document.querySelector('#puzzle4')
const statusMessageEl = document.querySelector('#guesses')
const guessesContainer = document.querySelector('#guessesContainer')
const statusMessage1 = document.createElement('p')
const statusMessage2 = document.createElement('p')
const statusMessage3 = document.createElement('p')
const statusMessage4 = document.createElement('p')
const guessedLettersEl = document.querySelector('#guessedLetters')
let game1
let game2
let game3
let game4
let ranOnce = false
let remainingGuesses = 5
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
    statusMessageEl.textContent = `${remainingGuesses}`
    if(guessedLetters.length && !guessedLettersEl.textContent.includes(guess)){

         letter.textContent = `${lastLetter} `
         if(isBadGuess){
             letter.className = "bad-letter"
         } else {
             letter.className = "good-letter"
         }
         guessedLettersEl.appendChild(letter)
         
         }
    if(game1.status === 'playing'){
        game1.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl1.appendChild(letterEl)
        })
    } else {
        puzzleEl1.textContent= ''
    }
    if(game2.status === 'playing'){
        game2.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl2.appendChild(letterEl)
        })
    }
    if(game3.status === 'playing'){
        game3.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl3.appendChild(letterEl)
        })
    }
    if(game4.status === 'playing'){
        game4.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl4.appendChild(letterEl)
        })
    }
}

const startGame = async () => {
const puzzle = await getPuzzle('2')
const puzzle2 = await getPuzzle('2')
const puzzle3 = await getPuzzle('2')
const puzzle4 = await getPuzzle('2')
game1 = new Hangman(puzzle, 5)
game2 = new Hangman(puzzle2, 5)
game3 = new Hangman(puzzle3, 5)
game4 = new Hangman(puzzle4, 5)
remainingGuesses = 5
statusMessage1.textContent = ''
statusMessage2.textContent = ''
statusMessage3.textContent = ''
statusMessage4.textContent = ''
guessedLettersEl.textContent = ''
guessedLetters = []
render()
}


document.querySelector('#reset').addEventListener('click', startGame)

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

