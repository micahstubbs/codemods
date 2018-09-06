const fs = require('fs')
const cheerio = require('cheerio')

function abstractOutJs({ filepath }) {
  // check if index.html file exists
  if (fs.existsSync(filepath)) {
    // read index.html file
    const html = fs.readFileSync(filepath, 'utf-8')
    const $ = cheerio.load(html, { xmlMode: true })
    // let scriptTagContent = $('body > script')
    let scriptTagContent = $('script:not([src])')[0].children[0].data.slice(
      1,
      -2
    )
    // console.log(scriptTagContent)

    const targetDir = filepath
      .split('/')
      .slice(0, -1)
      .join('/')
    console.log('targetDir', targetDir)
    const outputFilepath = `${targetDir}/index.js`
    fs.writeFileSync(outputFilepath, scriptTagContent, {})
    console.log(`wrote script tag contents to ${outputFilepath}`)
  } else {
    console.log(`${filepath} not found`)
  }
}

module.exports = abstractOutJs
