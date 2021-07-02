export function strNoAccent(a) {
  var b="áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
      c="aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
      d="";
  for(var i = 0, j = a.length; i < j; i++) {
    var e = a.substr(i, 1);
    d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
  }
  return d;
}


//this function look for all valid word with my random char
//it's a recursive function that 

export const allWords = (begin , chars, trie) => {
  let result = []


  let listChar = []
  if (trie.isValid(begin)) {
    chars.forEach(char =>{
      if (listChar.indexOf(char)<0) {
        listChar.push(char)
        let copychar = chars.slice()
        copychar.splice(chars.indexOf(char),1)
        result.push(allWords(begin+char,copychar,trie ))
      }
    })
  }
  if (trie.contains(begin)) {
    result.push(begin)
  }
  return result.flat()
}


export const fillChar = (level) => {
  let response = ''
  for (let i = 0; i < level; i++) {
    let templateChar = document.querySelector('#randomChar').content
    let copyNode = document.importNode(templateChar, true)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    response += alphabet[Math.floor(Math.random() * 25)]
    copyNode.querySelector('.char').innerHTML = alphabet[Math.floor(Math.random() * 25)]
    document.querySelector('#charlist').append(copyNode)
  }
}
export const strRandom = (lvl) => {
  let response = []
  //la proportion de lettre s'est faite en fonction des lettres du scrabble
  const allletter = 'neeeeeeeeeeeeeeeaaaaaaaaaaiiiiiiiioooooouuuuuuynnnnnrrrrrrssssssttttttllllldddmmmggbbccppffhhvvjqkwxyz'
  for (let i = 0; i < lvl; i++) {
    response.push( allletter[Math.floor(Math.random() * ( allletter.length-1 ))])
  }
  return response.sort((a,b) => { Math.random() - 0.5 }).join('')
}

export const splitToSpan = (string) => {
  let arrstring = string.split('')
  arrstring.forEach(char => {
    let templateChar = document.querySelector('#randomChar').content
    let copyNode = document.importNode(templateChar, true)
    copyNode.querySelector('.char').innerHTML = char
    document.querySelector('#charlist').append(copyNode)
  })

}
