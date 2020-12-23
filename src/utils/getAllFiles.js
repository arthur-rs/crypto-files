const { readdir, stat } = require('fs/promises')
const { join, resolve } = require('path')

const getAllFiles = async (path) => {
  const read = await readdir(path)
  
  const files = []

  const directories = []

  for (const file of read) {
    const fileStatus = await stat(join(path, file))
   
    if(fileStatus.isDirectory()){
      directories.push(file)
    } else {
      files.push(file)
    }
  }

  const filesInDirectories = []

  for (const directory of directories) {
    const files = await getAllFiles(resolve(path, directory))
    const filesPath = files.map((file) => join(directory, file)) 
    filesInDirectories.push(...filesPath)
  }

  return [...files, ...filesInDirectories]
}

module.exports = getAllFiles