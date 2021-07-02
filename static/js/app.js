import { Trie } from './Trie.js'
import { gutenberg } from './gutenberg.js'
import { strRandom, fillChar, strNoAccent,splitToSpan, allWords } from './function.js'

//building of my Trie tree
//


const arbre = new Trie()
const gutenbergList = gutenberg.split('\n')
console.log('not ready');
gutenbergList.forEach(word => {
  arbre.insert(strNoAccent(word)) 
})
let wordtoguess = []
console.log('ready');
let finded = []

const button = document.querySelector('button#allword')
button.addEventListener('click', e =>{
  e.preventDefault()
  const input = document.querySelector('input#toGuess')
  let response =new Set( allWords('',input.value.split(''),arbre))
  response = [...response]
  response = response.filter(word => word.length > 2)
  response
    .sort((a,b) => a.length > b.length ? -1 : 1)
    .forEach( res => {
      handleGoodResponse(res, false)
    })
  input.value = ''
})



const newgame = (lvl) => {
  document.querySelector('#charlist').innerHTML = ''
  let stringtest = strRandom(lvl)
  splitToSpan(stringtest)
  document.querySelector('input#toGuess').value = stringtest
  const solution = document.querySelector('#solution')
  const guessed = document.querySelector('#guessed')

  solution.innerHTML = ''
  guessed.innerHTML=''
  let response =new Set( allWords('',stringtest.split(''),arbre))
  response = [...response]
  wordtoguess = response.filter(word => word.length > 2)
    .sort((a,b) => a.length > b.length ? -1 : 1)
  for (let i = 3 ; i <= wordtoguess[0].length ; i++) {
    [guessed, solution].forEach(div =>{

      const ul = document.createElement('ul')
      ul.classList.add('sorted_guessed')
      ul.setAttribute('data-length',i)
      const li = document.createElement('li')
      li.innerHTML = `<strong>Réponse(s) à ${i} caractères`
      ul.appendChild(li)
      div.appendChild(ul)
    })
  }
  return stringtest
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

const handleGoodResponse = (input, game) => {
  let guessdiv
  if (game) {
     guessdiv = document.querySelector('#guessed')
    finded.push(input)
  }else{
     guessdiv = document.querySelector('#solution')
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
  const goodResponse = wordtoguess.lastIndexOf(input.value)>=0
  if (goodResponse) { handleGoodResponse(input.value, true) }
  else{ handleWrongResponse(input.value) }
  input.select()
})

// ----------- ScrabbleHelper


const scrabbleButton = document.querySelector('#scrabbleButton')
scrabbleButton.addEventListener('click', e => {
  e.preventDefault()

  const charsetScrabbleHelper = document.querySelector('input#charset').value
  let response =new Set( allWords('',charsetScrabbleHelper.split(''),arbre))
  response = [...response]
  response = response.sort((a,b) => a.length > b.length ? -1 : 1)
  const scrabbleSoluce = {}
  for (let i = 1; i <= response[0].length; i++) {
    scrabbleSoluce[i] = response.filter(word => word.length == i)
  }

  const scrabbleTable = document.querySelector('#scrabbleSolution')
  for (const prop in scrabbleSoluce) {
    const ul = document.createElement('ul')
    const title = document.createElement('h2')
    title.innerHTML =`${prop} lettre(s) -- (${prop.length} soluce)`
    ul.appendChild(title)
    ul.setAttribute('data-size',prop)
    scrabbleSoluce[prop].forEach( (word) => {
      const li = document.createElement('li')
      li.innerHTML = word
      ul.appendChild(li)
    } )
    scrabbleTable.appendChild(ul)

  }
  const table = document.createElement('ul')
})
