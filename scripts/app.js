
const puzzleEl1 = document.querySelector('#puzzle')
const puzzleEl2 = document.querySelector('#puzzle2')
const puzzleEl3 = document.querySelector('#puzzle3')
const puzzleEl4 = document.querySelector('#puzzle4')
const statusMessageEl = document.querySelector('#guesses')
const levelNumberEl = document.querySelector('#levelNumber')
const guessesContainer = document.querySelector('#guessesContainer')
const guessesLabel = document.querySelector('#guessesLabel')
const guessesLabelNumber = document.querySelector('#guessesLabelNumber')
const highScoreLabelNumber = document.querySelector('#highScoreLabelNumber')
const losingMessage = document.querySelector('#losingMessage')
const statusBarElement = document.querySelector('#statusBar')
const body = document.querySelector('#body')
const scoreLabelNumber = document.querySelector('#scoreLabelNumber')
const moneyLabelText = document.querySelector('#moneyLabelText')
const moneyLabelNumber = document.querySelector('#moneyLabelNumber')
const scoreLabelText = document.querySelector('#scoreLabelText')
const shopElement = document.querySelector('#shop')
const themeLabel = document.querySelector('#themeLabel')
const puzzleContainer = document.querySelector('#puzzleContainer')
const placeToAppend = document.querySelector('#placeToAppend')
const statusMessage1 = document.createElement('p')
const statusMessage2 = document.createElement('p')
const statusMessage3 = document.createElement('p')
const statusMessage4 = document.createElement('p')
let guessedLettersEl = document.querySelector('#guessedLetters')
let costEl = document.querySelector('#cost')
let maxScore = 0
let isAreaOfEffectMenuOpen = false
let shopIsOpen = false
let willSkipLevel = false
let isPermaMenuOpen = false
let roundScore = 0
let permaLetterArray = []
let areaOfEffectArray = []
let isPlaying = false;
let randomTheme = ''
let level = 1
let score = 0
let money = 0
let game1
let game2
let game3
let game4
let ranOnce = false
let remainingGuesses = 10
let status = 'playing'
let guessedLetters = []
let handleMouseEnterskipLevel = handleMouseEnter.bind(null, 120);
let handleMouseEnterPermaLetter = handleMouseEnter.bind(null, 75);
let handleMouseEnterAreaOfEffect = handleMouseEnter.bind(null, 150);
let handleMouseEnterExtraGuess = handleMouseEnter.bind(null, 55);

let timerElement = document.getElementById('timer');
let seconds = 60;
let intervalId;
let isTimerRunning = false
let timeLeft
let secondsAddToScore

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


function startTimer() {
    intervalId = setInterval(updateTimer, 1000); // Update timer every second (1000 milliseconds)
    isTimerRunning = true
  }

  function stopTimer() {
    clearInterval(intervalId);
    isTimerRunning = false;
    timeLeft = seconds
  }

  function updateTimer() {
    if (seconds > 0) {
        seconds--
     console.log(seconds)
    } else {
      stopTimer();
    }
  }

function calcTimeLeftScore(){
    if(seconds <= 55) return secondsAddToScore = 11
    if(seconds <= 50) return secondsAddToScore = 10
    if(seconds <= 45) return secondsAddToScore = 9
    if(seconds <= 40) return secondsAddToScore = 8 
    if(seconds <= 35) return secondsAddToScore = 7 
    if(seconds <= 30) return secondsAddToScore = 6 
    if(seconds <= 25) return secondsAddToScore = 5 
    if(seconds <= 20) return secondsAddToScore = 4 
    if(seconds <= 15) return secondsAddToScore = 3 
    if(seconds <= 10) return secondsAddToScore = 2
    if(seconds <= 5) return secondsAddToScore = 1

}
// puzzleEl.textContent = game1.puzzle
// guessesEl.textContent = game1.statusMessage

window.addEventListener('keydown', (e) => {
    if(shopIsOpen) return
    if(remainingGuesses < 1) return
    const guess = e.key.toLowerCase()
    console.log(guess)
    if(isAreaOfEffectMenuOpen){
        areaOfEffectArray.push(guess)
        game1.addToAreaOfEffectLetters(guess)
        game2.addToAreaOfEffectLetters(guess)
        game3.addToAreaOfEffectLetters(guess)
        game4.addToAreaOfEffectLetters(guess)

        if(!guessedLetters.includes(guess)){
            game1.addToGuessedLetters(guess)
            game2.addToGuessedLetters(guess)
            game3.addToGuessedLetters(guess)
            game4.addToGuessedLetters(guess)
        }


        puzzleEl1.classList.remove("shopItem")
        puzzleEl2.classList.remove("shopItem")
        puzzleEl3.classList.remove("shopItem")
        puzzleEl4.classList.remove("shopItem")
        shopElement.textContent = "Shop"
        shopElement.removeEventListener('click', backFromShop)
        shopElement.addEventListener('click', renderShop)

        scoreLabelText.style.display = 'block'
        moneyLabelText.style.display = 'none'
        scoreLabelNumber.style.display = 'inline'
        scoreLabelNumber.textContent = score
    }

    if(isPermaMenuOpen){
        isPermaMenuOpen = false

        permaLetterArray.push(guess)
        game1.addToPermaLetters(guess)
        game2.addToPermaLetters(guess)
        game3.addToPermaLetters(guess)
        game4.addToPermaLetters(guess)
        if(!guessedLetters.includes(guess)){
            game1.addToGuessedLetters(guess)
            game2.addToGuessedLetters(guess)
            game3.addToGuessedLetters(guess)
            game4.addToGuessedLetters(guess)
        }


        puzzleEl1.classList.remove("shopItem")
        puzzleEl2.classList.remove("shopItem")
        puzzleEl3.classList.remove("shopItem")
        puzzleEl4.classList.remove("shopItem")
        shopElement.textContent = "Shop"
        shopElement.removeEventListener('click', backFromShop)
        shopElement.addEventListener('click', renderShop)

        scoreLabelText.style.display = 'block'
        moneyLabelText.style.display = 'none'
        scoreLabelNumber.style.display = 'inline'
        scoreLabelNumber.textContent = score
    }

    if (/^[a-z]$/.test(guess) === false) return
    if(!guessedLetters.includes(guess)) {guessedLetters.push(guess)}
 
    let isBadGuess = (game1.checkLetter(guess, guessedLetters) &&
    game2.checkLetter(guess, guessedLetters) &&
    game3.checkLetter(guess, guessedLetters) &&
    game4.checkLetter(guess, guessedLetters))

    if(isBadGuess) remainingGuesses--
    
    game1.addToGuessedLetters(guess)
    game2.addToGuessedLetters(guess)
    game3.addToGuessedLetters(guess)
    game4.addToGuessedLetters(guess)
    if(!isTimerRunning) startTimer()

    render(guess, isBadGuess)
})

const render = (guess, isBadGuess) => {
   if(!willSkipLevel){
    const scoreLabelNumber = document.querySelector('#scoreLabelNumber')
    roundScore = 0
    puzzleEl1.innerHTML = ''
    puzzleEl2.innerHTML = ''
    puzzleEl3.innerHTML = ''
    puzzleEl4.innerHTML = ''
    letter = document.createElement('span')
    letter.className = "letterSpan"
    scoreLabelNumber.textContent = `${score}`
    levelNumberEl.textContent = `Level: ${level}`
    themeLabel.textContent = `Theme: ${randomTheme.theme}`
    
    guessesLabelNumber.textContent = remainingGuesses
  
    
    // setup game1Ends to trigger additional status messages without redundant guesses left
    if (remainingGuesses <= 0) {  

        game1.word.forEach((letter) => {
            displayWord(puzzleEl1, letter)
         })
         if(game1.status !== 'finished') puzzleEl1.className = "red-text puzzle"
         
         game2.word.forEach((letter) => {
             displayWord(puzzleEl2, letter)
         })
         if(game2.status !== 'finished') puzzleEl2.className = "red-text puzzle"
         
         game3.word.forEach((letter) => {
             displayWord(puzzleEl3, letter)
         })
         if(game3.status !== 'finished') puzzleEl3.className = "red-text puzzle"
         
         game4.word.forEach((letter) => {
             displayWord(puzzleEl4, letter)
         })
         if(game4.status !== 'finished') puzzleEl4.className = "red-text puzzle"

         localStorage.setItem("maxScore", Math.max(maxScore, score))
         losingMessage.style.display = 'block'
         shopElement.style.display = 'none'
         return
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
    if(isBadGuess !== undefined && guess !== undefined){

    
    let lastLetter = guessedLetters[guessedLetters.length - 1]
    if(guessedLetters.length && !guessedLettersEl.textContent.includes(guess)){

         letter.textContent = `${lastLetter} `
         if(isBadGuess){
             letter.className = "red-text"
         } else {
             letter.className = "green-text"
         }
         guessedLettersEl.appendChild(letter)
         }
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
        }
        if((game1.status === "finished" 
        && game2.status === "finished" 
        && game3.status === "finished" 
        && game4.status === "finished") || willSkipLevel === true){
            stopTimer()
            willSkipLevel = false
            statusMessage1.textContent = ''
            statusMessage2.textContent = ''
            statusMessage3.textContent = ''
            statusMessage4.textContent = ''

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
        console.log(`Round Score: ${roundScore}`)
        roundScore += calcTimeLeftScore()
        seconds = 60
        console.log(`Round Score: ${roundScore}`)
        while (displayScore < (roundScore + initialScore)) {
            displayScore++;
            scoreLabelNumber.textContent = `${displayScore}`
            scoreLabelNumber.className = "green-text"
            
            await sleep(40); // Wait for 200 milliseconds (0.2 seconds)
        }
        score = displayScore
        money += roundScore
        scoreLabelNumber.className = 'scoreLabelNumber'
        console.log(score);
        scoreLabelNumber.textContent = `${score}`
        nextLevel()
  }
    
    async function decrementMoney(displayMoney, initialMoney, itemCost) {
        while (displayMoney > (initialMoney - itemCost)) {
            displayMoney--;
            moneyLabelNumber.textContent = `${displayMoney}`
            moneyLabelNumber.className = "red-text"
            
            await sleep(40); // Wait for 200 milliseconds (0.2 seconds)
        }
        money = displayMoney
        moneyLabelNumber.className = 'moneyLabelNumber'
  }



const startGame = () =>{
    if(!maxScore){
        maxScore = localStorage.getItem("maxScore")
        maxScore = 0
    }
    highScoreLabelNumber.textContent = ` ${maxScore}`

    losingMessage.style.display = 'none'

    randomTheme = wordList[Math.floor(Math.random() * wordList.length)]
    randomThemedEasyWords = randomTheme.easyWords
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

    level += 1
    if(level <= 9){       
        const randomThemedEasyWords = randomTheme.easyWords
        console.log(randomThemedEasyWords)

        const noDuplicates = checkForDuplicates(randomThemedEasyWords)
        generateGames(noDuplicates)

        guessedLettersEl.textContent=''

        permaLetterArray.forEach((letter) =>{
            game1.addToPermaLetters(letter)
            game2.addToPermaLetters(letter)
            game3.addToPermaLetters(letter)
            game4.addToPermaLetters(letter)
        })

        let carryOverPermaLetters =  guessedLetters.filter((letter) => permaLetterArray.includes(letter))
        carryOverPermaLetters.forEach((letter) =>{
            thisLetter = document.createElement('span')
            thisLetter.className = "green-text"
            thisLetter.textContent = `${letter}`
            guessedLettersEl.appendChild(thisLetter)
        })

        guessedLetters = []
        remainingGuesses += 3
        render()
    } else if (level >= 10){
        const randomThemedHardWords = randomTheme.hardWords
        console.log(randomThemedHardWords)
        
        const noDuplicates = checkForDuplicates(randomThemedHardWords)
        generateGames(noDuplicates)

        guessedLettersEl.textContent=''

        permaLetterArray.forEach((letter) =>{
            game1.addToPermaLetters(letter)
            game2.addToPermaLetters(letter)
            game3.addToPermaLetters(letter)
            game4.addToPermaLetters(letter)

        })

        let carryOverPermaLetters =  guessedLetters.filter((letter) => permaLetterArray.includes(letter))
        carryOverPermaLetters.forEach((letter) =>{
            thisLetter = document.createElement('span')
            thisLetter.className = "green-text"
            thisLetter.textContent = `${letter}`
            guessedLettersEl.appendChild(thisLetter)
        })

        guessedLetters = []
        remainingGuesses += 2
        render()
    } else if (level > 14){
        const randomThemedHardWords = randomTheme.hardWords
        console.log(randomThemedHardWords)
        
        const noDuplicates = checkForDuplicates(randomThemedHardWords)
        generateGames(noDuplicates)

        guessedLettersEl.textContent=''

        permaLetterArray.forEach((letter) =>{
            game1.addToPermaLetters(letter)
            game2.addToPermaLetters(letter)
            game3.addToPermaLetters(letter)
            game4.addToPermaLetters(letter)

        })

        let carryOverPermaLetters =  guessedLetters.filter((letter) => permaLetterArray.includes(letter))
        carryOverPermaLetters.forEach((letter) =>{
            thisLetter = document.createElement('span')
            thisLetter.className = "green-text"
            thisLetter.textContent = `${letter}`
            guessedLettersEl.appendChild(thisLetter)
        })

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
    shopElement.style.display = 'block'

    guessedLetters = []
    permaLetterArray = []
    level = 1
    remainingGuesses = 10
    score = 0
    money = 0
    guessedLettersEl.textContent = ''
    puzzleEl1.classList.remove("green-text")
    puzzleEl1.classList.remove("red-text")
    puzzleEl2.classList.remove("green-text")
    puzzleEl2.classList.remove("red-text")
    puzzleEl3.classList.remove("green-text")
    puzzleEl3.classList.remove("red-text")
    puzzleEl4.classList.remove("green-text")
    puzzleEl4.classList.remove("red-text")
    startGame()
}

function backFromShop(){

    if(isPermaMenuOpen){
        money += 75
    }
    shopIsOpen = false
    puzzleEl1.classList.remove("shopItem")
    puzzleEl2.classList.remove("shopItem")
    puzzleEl3.classList.remove("shopItem")
    puzzleEl4.classList.remove("shopItem")
    shopElement.textContent = "Shop"
    shopElement.removeEventListener('click', backFromShop)
    shopElement.addEventListener('click', renderShop)

    isPermaMenuOpen = false
    scoreLabelText.style.display = 'block'
    moneyLabelText.style.display = 'none'
    scoreLabelNumber.style.display = 'inline'
    scoreLabelNumber.textContent = score

    removeShopListeners()

    guessedLettersEl.style.display = 'block'
    costEl.style.display = 'none'

    render()
}

function removeShopListeners(){
    puzzleEl1.parentNode.removeEventListener('mouseover', handleMouseEnterskipLevel);
    puzzleEl2.parentNode.removeEventListener('mouseover', handleMouseEnterPermaLetter);
    puzzleEl3.parentNode.removeEventListener('mouseover', handleMouseEnterAreaOfEffect);
    puzzleEl4.parentNode.removeEventListener('mouseover', handleMouseEnterExtraGuess);
  
    puzzleEl1.parentNode.removeEventListener('mouseout', handleMouseExit);
    puzzleEl2.parentNode.removeEventListener('mouseout', handleMouseExit);
    puzzleEl3.parentNode.removeEventListener('mouseout', handleMouseExit);
    puzzleEl4.parentNode.removeEventListener('mouseout', handleMouseExit);
  
    puzzleEl1.removeEventListener('click', skipLevel);
    puzzleEl2.removeEventListener('click', permaLetterClick);
    puzzleEl3.removeEventListener('click', areaEffectClick);
    puzzleEl4.removeEventListener('click', extraGuessClick);
}

function handleMouseEnter(cost){
    costEl.textContent = `Cost: ${cost}`
    if(money - cost >= 0){
        moneyLabelNumber.textContent = money - cost
        costEl.className = 'green-text'
    } else {
        moneyLabelNumber.className = 'red-text' 
        costEl.className = 'red-text'
        
    }
    
    console.log("running enter")
}
function handleMouseExit(){
    costEl.textContent = `Cost: `
    costEl.classList.remove('green-text')
    costEl.classList.remove('red-text')
    moneyLabelNumber.textContent = money
    moneyLabelNumber.className = 'moneyLabelNumber'
    console.log("running exit")
 }

function renderShop(){
    guessedLettersEl.style.display = 'none'
    costEl.style.display = 'block'

    shopIsOpen = true
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

    puzzleEl1.parentNode.addEventListener('mouseover', handleMouseEnterskipLevel);
    puzzleEl2.parentNode.addEventListener('mouseover', handleMouseEnterPermaLetter);
    puzzleEl3.parentNode.addEventListener('mouseover', handleMouseEnterAreaOfEffect);
    puzzleEl4.parentNode.addEventListener('mouseover', handleMouseEnterExtraGuess);
  
    puzzleEl1.parentNode.addEventListener('mouseout', handleMouseExit);
    puzzleEl2.parentNode.addEventListener('mouseout', handleMouseExit);
    puzzleEl3.parentNode.addEventListener('mouseout', handleMouseExit);
    puzzleEl4.parentNode.addEventListener('mouseout', handleMouseExit);
  
    puzzleEl1.addEventListener('click', skipLevel);
    puzzleEl2.addEventListener('click', permaLetterClick);
    puzzleEl3.addEventListener('click', areaEffectClick);
    puzzleEl4.addEventListener('click', extraGuessClick);


    scoreLabelText.style.display = 'none'
    moneyLabelText.style.display = 'block'
    moneyLabelNumber.style.display = 'inline'
    moneyLabelNumber.textContent = money

    shopElement.textContent = "Back"
    shopElement.removeEventListener('click', renderShop)
    shopElement.addEventListener('click', backFromShop)

    letter = document.createElement('span')
    letter.className = "letterSpan"


    let shield = 'Skip Level'
    shield.split('').forEach((letter) => {
    let letterEl = document.createElement('span')
    letterEl.className = "letterSpan"
    letterEl.textContent = letter
    puzzleEl1.appendChild(letterEl)
        })
    document.querySelector('#puzzle').addEventListener('click', skipLevel)
    
    let permaLetter = 'permaLetter'
    permaLetter.split('').forEach((letter) => {
    let letterEl = document.createElement('span')
    letterEl.className = "letterSpan"
    letterEl.textContent = letter
    puzzleEl2.appendChild(letterEl)
        })
    document.querySelector('#puzzle2').addEventListener('click', permaLetterClick)
    
    let areaOfEffect = 'area of effect'
    areaOfEffect.split('').forEach((letter) => {
        let letterEl = document.createElement('span')
        letterEl.className = "letterSpan"
        letterEl.textContent = letter
        puzzleEl3.appendChild(letterEl)
    })
    document.querySelector('#puzzle3').addEventListener('click', areaEffectClick)
    
    let extraGuess = 'extra guess'
    extraGuess.split('').forEach((letter) => {
        let letterEl = document.createElement('span')
        letterEl.className = "letterSpan"
        letterEl.textContent = letter
        puzzleEl4.appendChild(letterEl)
    })
    document.querySelector('#puzzle4').addEventListener('click', extraGuessClick)
}

function areaEffectClick(){
    if(money >= 150){
        console.log("Shield")
        document.querySelector('#puzzle3').removeEventListener('click', areaEffectClick)
        openAreaOfEffectMenu()
    }
}
function permaLetterClick(){
    if(money >= 75){
        openPermaLetterMenu()
        document.querySelector('#puzzle2').removeEventListener('click', permaLetterClick)
    }
}
function extraGuessClick(){
    if(money > 55){
        cost = 55
            remainingGuesses += 1
            guessesLabelNumber.className = 'green-text'
            decrementMoney(money, money, cost)
            .then(() => {
              console.log('Score increment completed!');
              guessesLabelNumber.className = 'guessesLabelNumber'
            })
            .catch(error => {
              console.error('Error:', error);
            });
            guessesLabelNumber.textContent = remainingGuesses
            moneyLabelNumber.textContent = `${money}`

        }
    }
function openAreaOfEffectMenu(){
    removeShopListeners()
    isAreaOfEffectMenuOpen = true
    shopIsOpen = false

    decrementMoney(money, money, 75)
    .then(() => {
      console.log('Score increment completed!');
      guessesLabelNumber.className = 'guessesLabelNumber'
    })
    .catch(error => {
      console.error('Error:', error);
    });
   
    
    puzzleEl1.innerHTML = ''
    puzzleEl2.innerHTML = ''
    puzzleEl3.innerHTML = ''
    puzzleEl4.innerHTML = ''
    let chooseOne = ["Choose", "Letter"]
    chooseOne[0].split('').forEach((letter) => {
        let letterEl = document.createElement('span')
        letterEl.className = "letterSpan"
        letterEl.textContent = letter
        puzzleEl1.appendChild(letterEl)
     })
    chooseOne[1].split('').forEach((letter) => {
        let letterEl = document.createElement('span')
        letterEl.className = "letterSpan"
        letterEl.textContent = letter
        puzzleEl2.appendChild(letterEl)
     })

     guessedLettersEl.style.display = 'block'
     costEl.style.display = 'none'

}   
function openPermaLetterMenu(){
    removeShopListeners()
    isPermaMenuOpen = true
    shopIsOpen = false

    decrementMoney(money, money, 75)
    .then(() => {
      console.log('Score increment completed!');
      guessesLabelNumber.className = 'guessesLabelNumber'
    })
    .catch(error => {
      console.error('Error:', error);
    });
   
    
    puzzleEl1.innerHTML = ''
    puzzleEl2.innerHTML = ''
    puzzleEl3.innerHTML = ''
    puzzleEl4.innerHTML = ''
    let chooseOne = ["Choose", "Letter"]
    chooseOne[0].split('').forEach((letter) => {
        let letterEl = document.createElement('span')
        letterEl.className = "letterSpan"
        letterEl.textContent = letter
        puzzleEl1.appendChild(letterEl)
     })
    chooseOne[1].split('').forEach((letter) => {
        let letterEl = document.createElement('span')
        letterEl.className = "letterSpan"
        letterEl.textContent = letter
        puzzleEl2.appendChild(letterEl)
     })

     guessedLettersEl.style.display = 'block'
     costEl.style.display = 'none'

}

function skipLevel(){
    if(money >= 120){
    removeShopListeners()
    willSkipLevel = true

    puzzleEl1.classList.remove("shopItem")
    puzzleEl2.classList.remove("shopItem")
    puzzleEl3.classList.remove("shopItem")
    puzzleEl4.classList.remove("shopItem")
    shopElement.textContent = "Shop"
    shopElement.removeEventListener('click', backFromShop)
    shopElement.addEventListener('click', renderShop)

    scoreLabelText.style.display = 'block'
    moneyLabelText.style.display = 'none'
    scoreLabelNumber.style.display = 'inline'
    scoreLabelNumber.textContent = score

    document.querySelector('#puzzle').removeEventListener('click', skipLevel)
    guessedLettersEl.style.display = 'block'
    costEl.style.display = 'none'

    render()
    }
}

if(document.querySelector('#reset')) document.querySelector('#reset').addEventListener('click', reset)
shopElement.addEventListener('click', renderShop)
moneyLabelText.style.display = 'none'
startGame()

getCurrentCountry().then((country) => {
    // console.log(country.name)
}).catch((err) => {
    console.log(err)
})

getLocation().then((location) => {
   return getCountry(location.country)
}).then((country) => {
    // console.log(country.name)
}).catch((err) => {
    console.log(err)
})

