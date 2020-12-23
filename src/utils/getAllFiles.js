const { readdir } = require('fs/promises')
const { extname, join, resolve } = require('path')

const getAllFiles = async (path) => {
  const read = await readdir(path)
  const files = read.filter((file) => extname(file))
  const directories = read.filter((file) => !extname(file))

  const filesInDirectories = []

  for (const directory of directories) {
    const files = await getAllFiles(resolve(path, directory))
    const filesPath = files.map((file) => join(directory, file)) 
    filesInDirectories.push(...filesPath)
  }

  return [...files, ...filesInDirectories]
}

module.exports = getAllFiles