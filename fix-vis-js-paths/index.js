function fixVisJsPaths({ html }) {
  const oldPaths = ['../exampleUtil.js']
  const newPaths = ['../../exampleUtil.js']
  oldPaths.forEach((oldPath, i) => {
    html = html.replace(oldPath, newPaths[i])
  })
  return html
}

module.exports = fixVisJsPaths
