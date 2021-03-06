const fs = require('fs')
const { exec } = require('child_process')
const fixVisJsPaths = require(`${__dirname}/../fix-vis-js-paths`)

function abstractOutJs({ filepath }) {
  // check if index.html file exists
  if (fs.existsSync(filepath)) {
    //
    // read index.html file
    //
    const html = fs.readFileSync(filepath, 'utf-8')

    //
    // parse out js
    //
    const scriptTagInlineJsPattern = /<script type="text\/javascript">[\s\S]*<\/script>/
    const scriptTagMatches = html.match(scriptTagInlineJsPattern)

    if (scriptTagMatches !== null) {
      let scriptTagContent = scriptTagMatches[0]
        .replace(`<script type="text/javascript">`, '')
        .replace(`</script>`, '')
        .replace(
          `var network = new vis.Network(container, data, options)`,
          `new vis.Network(container, data, options)`
        )
        .replace(
          `network = new vis.Network(container, data, options)`,
          `new vis.Network(container, data, options)`
        )
        .trim()

      // prepend eslint globals annotation
      let eslintAnnotation = '/* global vis */'
      if (scriptTagContent.includes('getScaleFreeNetwork'))
        eslintAnnotation = '/* global vis getScaleFreeNetwork */'
      scriptTagContent = `${eslintAnnotation}\n${scriptTagContent}`
      // console.log('scriptTagContent', scriptTagContent)

      //
      // write the js out to an index.js file
      //
      const targetDir = filepath
        .split('/')
        .slice(0, -1)
        .join('/')
      const outputFilepath = `${targetDir}/index.js`
      fs.writeFileSync(outputFilepath, scriptTagContent, {})
      console.log(`wrote script tag contents to ${outputFilepath}`)

      //
      // prettier format js
      //
      exec(
        `${__dirname}/../node_modules/.bin/prettier --config ${__dirname}/../.prettierrc.json --write ${outputFilepath}`
      )
      console.log('prettier formatting parsed js')
      console.log(
        `prettier --config .prettierrc.json --write ${outputFilepath}`
      )

      //
      // replace script tag in html
      // also
      // replace double quotes " with ' single quotes
      // update paths in html
      //
      let newHtml = fixVisJsPaths({ html })
        .replace(
          scriptTagInlineJsPattern,
          "<script src='./index.js' type='text/javascript'></script>"
        )
        .replace(/"/g, `'`)

      //
      // write out replaced html to filepath
      // (overwrite source file)
      //
      fs.writeFileSync(filepath, newHtml, {})
      console.log(`wrote new HTML to ${filepath}`)
    } else {
      console.log('no script tags with inline js found')
    }
  } else {
    console.log(`${filepath} not found`)
  }
}

module.exports = abstractOutJs
