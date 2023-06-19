class Hangman {
    constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('')
    this.remainingGuesses = remainingGuesses
    this.status = 'playing'
    this.guessedLetters = []
    this.permaLetters = []
    }
    get puzzle() {
        let _puzzle = ''
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || this.permaLetters.includes(letter) || letter === ' ') {
                _puzzle += letter
            } else {
                _puzzle += '*'
            }
    })
    return _puzzle
    }
    
    calculateStatus() {
        let finished = this.word.every((letter) => this.guessedLetters.includes(letter) || this.permaLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    checkLetter(guess, guessedLetters) {
        guess = guess.toLowerCase()
        const isBadGuess = (!this.word.includes(guess) && !this.guessedLetters.includes(guess) && !this.permaLetters.includes(guess))
    
        this.calculateStatus()
        
        return isBadGuess
    }


    addToGuessedLetters(letter){
        this.guessedLetters.push(letter)
        this.calculateStatus()
    }

    addToPermaLetters(letter){
        if(!this.permaLetters.includes(letter)) this.permaLetters.push(letter)
        this.addToGuessedLetters(letter)
        console.log(this.permaLetters)
        this.calculateStatus()
    }
} 
