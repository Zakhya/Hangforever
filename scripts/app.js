
const puzzleEl1 = document.querySelector('#puzzle')
const puzzleEl2 = document.querySelector('#puzzle2')
const puzzleEl3 = document.querySelector('#puzzle3')
const puzzleEl4 = document.querySelector('#puzzle4')
const statusMessageEl = document.querySelector('#guesses')
const levelNumberEl = document.querySelector('#levelNumber')
const guessesContainer = document.querySelector('#guessesContainer')
const guessesLabel = document.querySelector('#guessesLabel')
const scoreLabelNumber = document.querySelector('#scoreLabelNumber')
const shopElement = document.querySelector('#shop')
const themeLabel = document.querySelector('#themeLabel')
const statusMessage1 = document.createElement('p')
const statusMessage2 = document.createElement('p')
const statusMessage3 = document.createElement('p')
const statusMessage4 = document.createElement('p')
let guessedLettersEl = document.querySelector('#guessedLetters')
let roundScore = 0
let isPlaying = false;
let isTimerRunning = false;
let randomTheme = ''
let level = 1
let score = 0
let game1
let game2
let game3
let game4
let ranOnce = false
let remainingGuesses = 10
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
    roundScore = 0
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
         
         game1.puzzle.split('').forEach((letter) => {
           displayWord(puzzleEl1, letter)
            roundScore++
        })
        if(game1.status === 'finished') puzzleEl1.className = "green-text puzzle"
        
        game2.puzzle.split('').forEach((letter) => {
            displayWord(puzzleEl2, letter)
            roundScore++
        })
        if(game2.status === 'finished') puzzleEl2.className = "green-text puzzle"
        
        game3.puzzle.split('').forEach((letter) => {
            displayWord(puzzleEl3, letter)
            roundScore++
        })
        if(game3.status === 'finished') puzzleEl3.className = "green-text puzzle"
        
        game4.puzzle.split('').forEach((letter) => {
            displayWord(puzzleEl4, letter)
            roundScore++
        })
        if(game4.status === 'finished') puzzleEl4.className = "green-text puzzle"
        console.log(roundScore)
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
              roundScore = 0
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
        function displayWord(puzzleEl, letter){
            let letterEl = document.createElement('span')
            letterEl.className = "letterSpan"
            letterEl.textContent = letter
            puzzleEl.appendChild(letterEl)
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
        nextLevel()
  }

  function generatePuzzle(diff){


  }


const startGame = () =>{
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
    render()
} 


const nextLevel = () => {
    randomTheme = wordList[Math.floor(Math.random() * 4)]

    level++ 
    if(level <= 6){       
        const randomThemedEasyWords = randomTheme.easyWords
        console.log(randomThemedEasyWords)

        const noDuplicates = checkForDuplicates(randomThemedEasyWords)
        generateGames(noDuplicates)

        guessedLetters = []
        remainingGuesses += 3
        render()
    } else if (level >= 7 && level <= 14){
        const randomThemedMidWords = randomTheme.midWords
        console.log(randomThemedMidWords)
        
        const noDuplicates = checkForDuplicates(randomThemedMidWords)
        generateGames(noDuplicates)

        guessedLetters = []
        remainingGuesses += 2
        render()
    } else if (level > 14){
        const randomThemedHardWords = randomTheme.hardWords
        console.log(randomThemedHardWords)
        
        const noDuplicates = checkForDuplicates(randomThemedHardWords)
        generateGames(noDuplicates)

        guessedLetters = []
        remainingGuesses++
        render()
    }

    function checkForDuplicates(randomThemedEasyWords){
          let noDuplicates = []
      
          let puzzle = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          noDuplicates.push(puzzle)
          let puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(noDuplicates.includes(puzzle2)){
              puzzle2 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          noDuplicates.push(puzzle2)
  
          let puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(noDuplicates.includes(puzzle3)){
              puzzle3 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          noDuplicates.push(puzzle3)
          
          let puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          if(noDuplicates.includes(puzzle4)){
              puzzle4 = randomThemedEasyWords[Math.floor(Math.random() * randomThemedEasyWords.length)]
          }
          noDuplicates.push(puzzle4)
          return noDuplicates
    }

    function generateGames(noDuplicates){
        game1 = new Hangman(noDuplicates[0], 5)
        game2 = new Hangman(noDuplicates[1], 5)
        game3 = new Hangman(noDuplicates[2], 5)
        game4 = new Hangman(noDuplicates[3], 5)
    }
}

const reset = () => {

    guessedLetters = []
    level = 1
    remainingGuesses = 10
    score = 0
    guessedLettersEl.textContent = ''
    puzzleEl1.classList.remove("green-text")
    puzzleEl2.classList.remove("green-text")
    puzzleEl3.classList.remove("green-text")
    puzzleEl4.classList.remove("green-text")
    startGame()
}

function backFromShop(){
    puzzleEl1.classList.remove("shopItem")
    puzzleEl2.classList.remove("shopItem")
    puzzleEl3.classList.remove("shopItem")
    puzzleEl4.classList.remove("shopItem")
    shopElement.textContent = "Shop"
    shopElement.removeEventListener('click', backFromShop)
    shopElement.addEventListener('click', renderShop)
    render()
}

function renderShop(){
    roundScore = 0
    puzzleEl1.innerHTML = ''
    puzzleEl2.innerHTML = ''
    puzzleEl3.innerHTML = ''
    puzzleEl4.innerHTML = ''
    puzzleEl1.classList.remove("shopItem")
    puzzleEl2.classList.remove("shopItem")
    puzzleEl3.classList.remove("shopItem")
    puzzleEl4.classList.remove("shopItem")
    puzzleEl1.classList.add("shopItem")
    puzzleEl2.classList.add("shopItem")
    puzzleEl3.classList.add("shopItem")
    puzzleEl4.classList.add("shopItem")
    shopElement.textContent = "Back"
    shopElement.removeEventListener('click', renderShop)
    shopElement.addEventListener('click', backFromShop)
    letter = document.createElement('span')
    letter.className = "letterSpan"

    let shield = 'shield'
    shield.split('').forEach((letter) => {
    let letterEl = document.createElement('span')
    letterEl.className = "letterSpan"
    letterEl.textContent = letter
    puzzleEl1.appendChild(letterEl)
        })
    document.querySelector('#puzzle').addEventListener('click', shieldClick)
    function shieldClick(){
        console.log("Shield")
    }

    let permaLetter = 'permaLetter'
    permaLetter.split('').forEach((letter) => {
    let letterEl = document.createElement('span')
    letterEl.className = "letterSpan"
    letterEl.textContent = letter
    puzzleEl2.appendChild(letterEl)
        })
    document.querySelector('#puzzle2').addEventListener('click', permaLetterClick)
    function permaLetterClick(){
        console.log("Shield")
    }

    let areaOfEffect = 'area of effect'
    areaOfEffect.split('').forEach((letter) => {
    let letterEl = document.createElement('span')
    letterEl.className = "letterSpan"
    letterEl.textContent = letter
    puzzleEl3.appendChild(letterEl)
        })
    document.querySelector('#puzzle3').addEventListener('click', areaEffectClick)
    function areaEffectClick(){
        console.log("Shield")
    }
    
    let extraGuess = 'extra guess'
    extraGuess.split('').forEach((letter) => {
    let letterEl = document.createElement('span')
    letterEl.className = "letterSpan"
    letterEl.textContent = letter
    puzzleEl4.appendChild(letterEl)
        })
    document.querySelector('#puzzle4').addEventListener('click', extraGuessClick)
    function extraGuessClick(){
        console.log("Shield")
    }
    }


document.querySelector('#reset').addEventListener('click', reset)
shopElement.addEventListener('click', renderShop)

startGame()

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

