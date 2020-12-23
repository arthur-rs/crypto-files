const { createInterface } = require('readline');

const print = (message, end = '\n') => {
  process.stdin.write(message + end)
}

const line = (size = 30) => {
  print('='.repeat(size))
}

const input = async (message) => { 
    
  const value = await new Promise((resolve) => {
    if (message) print(message, '')

    const ready = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    ready.question(message, (answer) => {
      resolve(answer)

      ready.close();
    });
  })

  return value
}

const list = async (list, title, size = 30) => {

  line()

  if (title) centerText(title, size)

  line()

  list.forEach((option, index) => {  
    let endRow = '\n'

    if(list.length === index) endRow = null

    print(`${index + 1} - ${option}`, endRow)   
  })

  line()

  const optionSelected = await input('Select a option: ')

  return optionSelected
}

const centerText = async (text, size = 30) => {
  const textLength = text.length

  if(textLength >= size){
    print(text)
    return
  }

  const margin = (size - textLength) / 2 
  
  print(`${' '.repeat(margin)}${text}`)
}

const trueOrFalse = async (message, defaultValue = false) => {
  while(true){
    let value = await input(message)
    value = String(value).toLocaleLowerCase()

    if(!value){
      return defaultValue
    }

    if((/y|yes|n|no/.test(value))){
      if(/y|yes/.test(value)){
        return true
      } else {
        return false
      }
    }
    
    print('Invalid selection, please try again!')    
  }
} 

module.exports = {
  input,
  line,
  print,
  list,
  trueOrFalse,
  centerText
}