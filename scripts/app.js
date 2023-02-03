
const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let game1

// puzzleEl.textContent = game1.puzzle
// guessesEl.textContent = game1.statusMessage

window.addEventListener('keydown', (e) => {
    const guess = e.key
    game1.makeGuess(guess)
   render()
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        let letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })

}

const startGame = async () => {
const puzzle = await getPuzzle('2')
game1 = new Hangman(puzzle, 5)
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




    function rentalCarCost(days) {
        let total = days * 40
        if (days >= 7) {
          total -= 50
        } else if(days >= 3) {
          total -= 20
        } else {
         return total
        }
        return total
      }
