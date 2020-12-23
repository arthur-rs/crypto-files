const { list, print, input, centerText } = require('../utils/stdio')
const handleSelect = require('../handlers/handleSelect')

const menu = async () => {

  const options = ['Encrypt directory', 'Decrypt directory', 'Close']

  const optionSelected = Number(await list(options, 'Crypto Files v1.0 '))

  if(isNaN(optionSelected)){
    print('This option not is a number, Try again!')
    await input('<- Press any key to continue ->')
    console.clear()
    return false
  }

  if(!(optionSelected > 0 && optionSelected <= options.length)){
    print('This option not exist, Try again!')
    await input('<- Press any key to continue ->')
    console.clear()
    return false
  }

  switch (optionSelected) {
    case 1:
      await handleSelect('encrypt')
      break;   
    case 2:
      await handleSelect('decrypt')
      break;
    case 3:
      console.clear()
      print('Bye')
      break
  }

  return true
} 

module.exports = menu