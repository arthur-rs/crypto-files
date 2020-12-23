const { createReadStream, createWriteStream } = require("fs");
const { rm } = require("fs/promises");
const { pipeline } = require("stream");
const { resolve } = require("path");

const { createCipheriv } = require("crypto");
const { promisify } = require("util");
const { line, print } = require('../utils/stdio')

const getAllFiles = require('../utils/getAllFiles')

const pipelineAsync = promisify(pipeline);

const encrypt = async (path, key, iv) => {
  console.time('encrypting')
  const files = await getAllFiles(path);

  for (const file of files) {
    const filePath = resolve(path, file);

    const fileReadStream = createReadStream(filePath);
    const fileWriteStream = createWriteStream(filePath + ".crypt");
    const cipher = createCipheriv("aes256", key, iv);

    await pipelineAsync(fileReadStream, cipher, fileWriteStream);

    await rm(filePath);

    fileReadStream.removeAllListeners()
    fileReadStream.close()

    cipher.removeAllListeners()

    fileWriteStream.removeAllListeners()
    fileWriteStream.close()
    
    print(`File: ${filePath} has been encrypted`);
  }

  line()
  console.timeEnd('encrypting')
  print(`Total of ${files.length} encrypted files`)
  print()
  print(`Thank you for using!`)
  print('Created by: Arthur Reis')
  print('Email: arthurreis074@gmail.com')
  line()
};

module.exports = encrypt;
