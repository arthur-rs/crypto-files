const { createReadStream, createWriteStream } = require('fs')
const { rm } = require('fs/promises')
const { pipeline } = require('stream')
const { resolve, extname } = require('path')

const getAllFiles = require('../utils/getAllFiles')

const { createDecipheriv } = require('crypto')
const { promisify } = require('util')
const { line, print } = require('../utils/stdio')

const pipelineAsync = promisify(pipeline)

const decrypt = async (path, key, iv) => {
  console.time('decrypting')

  const files = (await getAllFiles(path))
    .filter((file) => extname(file) === '.crypt')

  for (const file of files) {
    const filePath = resolve(path, file)

    const fileReadStream = createReadStream(filePath)
    const fileWriteStream = createWriteStream(filePath.replace('.crypt', ''))
    const decipher = createDecipheriv('aes256', key, iv);
    
    await pipelineAsync(fileReadStream, decipher, fileWriteStream)
 
    await rm(filePath)

    fileReadStream.removeAllListeners()
    fileReadStream.close()

    decipher.removeAllListeners()

    fileWriteStream.removeAllListeners()
    fileWriteStream.close()

    print(`File: "${filePath}" has been decrypted`)
  }

  line()
  console.timeEnd('decrypting')
  print(`Total of ${files.length} decrypted files`)
  print('')
  print(`Thank you for using!`)
  print('Created by: Arthur Reis')
  print('Email: arthurreis074@gmail.com')
  line()
}

module.exports = decrypt