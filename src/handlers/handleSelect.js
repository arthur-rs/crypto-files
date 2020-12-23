const { randomBytes } = require('crypto')
const { stat } = require('fs/promises')
const { print, input, line, trueOrFalse, centerText } = require('../utils/stdio')

const decrypt = require('../core/decrypt')
const encrypt = require('../core/encrypt')

const menu = require('../layouts/menu')

const CheckDir = async (path) => {
  try {
    await stat(path)
    return true
  } catch (err) {
    return false 
  }
}

const handleSelect = async (type) => {
 
  console.clear()

  line()
  centerText(type.charAt(0).toUpperCase() + type.slice(1))
  line()

  let path
  let autoGenerateKey = false
  let key

  while(true){
    path = await input('Select the directory: ')
  
    const existDir = await CheckDir(path)

    if(existDir) break
    
    print('Invalid Directory, try again!')    
  }

  if(type === 'encrypt')
    autoGenerateKey = await trueOrFalse('Generate key automatically? <Y/n>: ', true)
  
  if(autoGenerateKey){
    key = randomBytes(32).toString('base64')
  } else {

    while(true){
      key = await input('Select the key: ')

      if(key) break

      print('You need to enter a key, try again')
    }
  }
  
  const bytesKey = Buffer.alloc(32, key)
  const bytesIv = Buffer.alloc(16, key)  
  
  if(autoGenerateKey) print(`\nKey: ${bytesKey.toString()}\n`)

  line()

  const run = await trueOrFalse('Do you really want to continue? <Y/n>: ', true)
  
  if(!run) return menu()

  if(type === 'encrypt'){
    await encrypt(path, bytesKey, bytesIv)
  } else {
    await decrypt(path, bytesKey, bytesIv)
  }

  if(autoGenerateKey){
    print(`\nKey: ${bytesKey.toString()}\n`) 
    line()
  } 

  await input('<- Press any key to continue ->')
}

module.exports = handleSelect
