
const puzzleEl1 = document.querySelector('#puzzle')
const puzzleEl2 = document.querySelector('#puzzle2')
const puzzleEl3 = document.querySelector('#puzzle3')
const puzzleEl4 = document.querySelector('#puzzle4')
const statusMessageEl = document.querySelector('#guesses')
const levelNumberEl = document.querySelector('#levelNumber')
const guessesContainer = document.querySelector('#guessesContainer')
const statusMessage1 = document.createElement('p')
const statusMessage2 = document.createElement('p')
const statusMessage3 = document.createElement('p')
const statusMessage4 = document.createElement('p')
const guessedLettersEl = document.querySelector('#guessedLetters')
let level = 0
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
    levelNumberEl.textContent = `Level: ${level}`
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
             letter.className = "green-text"
         }
         guessedLettersEl.appendChild(letter)
         
         }


        game1.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl1.appendChild(letterEl)
        })
        if(game1.status === 'finished') puzzleEl1.className = "green-text puzzle"

        game2.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl2.appendChild(letterEl)
        })
        if(game2.status === 'finished') puzzleEl2.className = "green-text puzzle"

        game3.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl3.appendChild(letterEl)
        })
        if(game3.status === 'finished') puzzleEl3.className = "green-text puzzle"

        game4.puzzle.split('').forEach((letter) => {
            let letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl4.appendChild(letterEl)
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
            startGame()
        }
}

const startGame = async () => {
    level++ 
    if(level < 6){
        const randomThemedEasyWords = wordList[Math.floor(Math.random() * 4)].easyWords
        console.log(randomThemedEasyWords)
        const puzzle = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        const puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        const puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        const puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
        console.log(puzzle)
        console.log(puzzle2)
        console.log(puzzle3)
        console.log(puzzle4)
        game1 = new Hangman(puzzle, 5)
        game2 = new Hangman(puzzle2, 5)
        game3 = new Hangman(puzzle3, 5)
        game4 = new Hangman(puzzle4, 5)
        
        guessedLetters = []
        render()
    }
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

