import { Trie } from './Trie.js'
import { gutenberg } from './gutenberg.js'
import { strRandom, fillChar, strNoAccent,splitToSpan, allWords } from './function.js'


//building of my Trie tree

const arbre = new Trie()
const gutenbergList = gutenberg.split('\n')
console.log('not ready');
gutenbergList.forEach(word => {
  arbre.insert(strNoAccent(word)) 
})
let finded = []
let wordtoguess = []
console.log('ready');


const button = document.querySelector('button#allword')
button.addEventListener('click', e =>{
  e.preventDefault()
  const input = document.querySelector('input#toGuess')

  guessed.innerHTML = ''
  setUpGame()

  let response =allWords('',input.value.split(''),arbre)
  response = response.filter(word => word.length > 2)
  response
    .sort((a,b) => a.length > b.length ? -1 : 1)
    .forEach( res => {
      handleGoodResponse(res, false)
    })
  input.value = ''
})

const initialState = () => {
  finded = []
  wordtoguess = []
}


const newgame = (lvl) => {
  initialState()
  resetGame()

  let stringtest = strRandom(lvl).toLowerCase()
  splitToSpan(stringtest)
  document.querySelector('input#toGuess').value = stringtest

  let response =allWords('',stringtest.split(''),arbre)
  wordtoguess = response.filter(word => word.length > 2)
    .sort((a,b) => a.length > b.length ? -1 : 1)
  //create answor box for response and solution
  setUpGame()
  return stringtest
}

const setUpGame = () => {
  if (wordtoguess.length !== 0) {
    for (let i = 3 ; i <= wordtoguess[0].length ; i++) {
      const ul = document.createElement('ul')
      ul.classList.add('sorted_guessed')
      ul.setAttribute('data-length',i)
      const li = document.createElement('li')
      li.innerHTML = `<strong>Réponse(s) à ${i} caractères`
      ul.appendChild(li)
      guessed.appendChild(ul)
    }
  }
}

const resetGame = () => {
  //document.querySelector('#corp').style.display = 'flex'
  document.querySelector('#charlist').innerHTML = ''
  guessed.innerHTML=''
}

const refresh = document.querySelector('#refresh')
refresh.addEventListener('click', e => {
  e.preventDefault()
  const lvl = parseInt(document.querySelector('select').value)
  let toGuess = newgame(lvl)
})

const handleWrongResponse = (input) => {
  console.log('Wrong', input);
}

const handleGoodResponse = (input, game=true) => {
  let guessdiv = document.querySelector('#guessed')
  if (game) {
    finded.push(input)
  }
  const length = input.length

  const newresponse = document.createElement('li')
  if (finded.indexOf(input)>=0) {
    newresponse.style.color = 'green'
  }else{
    newresponse.style.color = 'firebrick'
  }
  newresponse.innerHTML = input
  guessdiv.querySelector(`ul[data-length="${length}"]`).appendChild(newresponse)
  wordtoguess  = wordtoguess.filter(e=>e!==input)
}

const play = document.querySelector('button#try')
play.addEventListener('click', e =>{
  e.preventDefault()
  const input = document.querySelector('input#play')
  const goodResponse = wordtoguess.indexOf(input.value)>=0

  goodResponse ?
    handleGoodResponse(input.value) : 
    handleWrongResponse(input.value)
  input.select()
})

// ----------- ScrabbleHelper


const scrabbleButton = document.querySelector('#scrabbleButton')
scrabbleButton.addEventListener('click', e => {
  e.preventDefault()

  const charsetScrabbleHelper = document.querySelector('input#charset').value.toLowerCase()
  let response =allWords('',charsetScrabbleHelper.split(''),arbre)
  response = response.sort((a,b) => a.length > b.length ? -1 : 1)
  const scrabbleSoluce = {}
  for (let i = 1; i <= response[0].length; i++) {
    scrabbleSoluce[i] = response.filter(word => word.length == i)
  }

  const scrabbleTable = document.querySelector('#scrabbleSolution')
  scrabbleTable.innerHTML = ''
  for (const prop in scrabbleSoluce) {
    if (scrabbleSoluce[prop].length > 0) {
      const ul = document.createElement('ul')
      const title = document.createElement('h5')
      title.innerHTML =`${prop} lettre(s) -- (${scrabbleSoluce[prop].length} soluce)`
      ul.appendChild(title)
      ul.setAttribute('data-size',prop)
      scrabbleSoluce[prop].forEach( (word) => {
        const li = document.createElement('li')
        li.innerHTML = word
        ul.appendChild(li)
      } )
      scrabbleTable.appendChild(ul)

    }

  }
  const table = document.createElement('ul')

  document.querySelector('input#charset').select()
})
