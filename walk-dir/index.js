const fs = require('fs')
const { exec } = require('child_process')
const abstractOutJs = require(`${__dirname}/../abstract-out-js`)

function walkDir(dirpath) {
  console.log(`walking ${dirpath}`)
  const contents = fs.readdirSync(dirpath)
  const htmlFiles = contents.filter(d => d.includes('.html'))
  console.log('htmlFiles', htmlFiles)

  htmlFiles.forEach(f => {
    //
    // create a directory for html file
    //
    const newDirName = f.replace('.html', '')
    const newDirPath = `${dirpath}/${newDirName}`
    if (!fs.existsSync(newDirPath)) fs.mkdirSync(newDirPath)

    //
    // move html file into new directory
    // rename html file to index.html
    //
    const oldHtmlFilePath = `${dirpath}/${f}`
    const newHtmlFilePath = `${newDirPath}/index.html`
    if (fs.existsSync(oldHtmlFilePath)) {
      exec(`mv ${oldHtmlFilePath} ${newHtmlFilePath}`)
      console.log(`mv ${dirpath}/${f} ${newHtmlFilePath}`)
    }

    //
    // abstract out JS from html file
    //
    abstractOutJs({ filepath: newHtmlFilePath })
  })
}

module.exports = walkDir
