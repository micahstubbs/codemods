const fs = require('fs')
const abstractOutJs = require(`${__dirname}/../abstract-out-js`)

function batchAbstractOutJs(dirpath) {
  console.log(`walking ${dirpath}`)
  const contents = fs.readdirSync(dirpath)
  const dirs = contents.filter(d => !d.includes('.'))
  console.log('dirs', dirs)

  dirs.forEach(dir => {
    //
    // abstract out JS from html file
    //
    const newHtmlFilePath = `${dirpath}/${dir}/index.html`
    abstractOutJs({ filepath: newHtmlFilePath })
  })
}

module.exports = batchAbstractOutJs
