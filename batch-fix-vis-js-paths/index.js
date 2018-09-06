const fs = require('fs')
const fixVisJsPaths = require(`${__dirname}/../fix-vis-js-paths`)

function batchFixVisJsPaths(dirpath) {
  console.log(`walking ${dirpath}`)
  const contents = fs.readdirSync(dirpath)
  const dirs = contents.filter(d => !d.includes('.'))
  console.log('dirs', dirs)

  dirs.forEach(dir => {
    //
    // fix paths in html
    //
    const htmlFilePath = `${dirpath}/${dir}/index.html`
    const html = fs.readFileSync(htmlFilePath, 'utf-8')
    const newHtml = fixVisJsPaths({ html })

    //
    // write out replaced html to filepath
    // (overwrite source file)
    //
    fs.writeFileSync(htmlFilePath, newHtml, {})
    console.log(`wrote new HTML to ${htmlFilePath}`)
  })
}

module.exports = batchFixVisJsPaths
