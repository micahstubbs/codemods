const fs = require('fs')
const cheerio = require('cheerio')

function abstractOutJs({ filepath }) {
  // check if index.html file exists
  if (fs.existsSync(filepath)) {
    // read index.html file
    const html = fs.readFileSync(filepath, 'utf-8')
    const $ = cheerio.load(html)
    let scriptTagContent = $('body > script')
    // console.log(scriptTagContent)
    console.log(typeof scriptTagContent)
    // .split(/\n/)
    // .shift()
    // .pop()
    // .join(/\n/)

    const targetDir = filepath
      .split('/')
      .slice(0, -1)
      .concat([''])
      .join('/')
    console.log('targetDir', targetDir)
    fs.writeFileSync('script-tag-content.js', scriptTagContent, {})
  } else {
    console.log(`${filepath} not found`)
  }
}

module.exports = abstractOutJs
