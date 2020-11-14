const CONFIG = require('../CONFIG/')
const packageInfo = require('../package.json')
const fs = require('fs')

function HapAmendAsyncPlugin(options) { }
HapAmendAsyncPlugin.prototype.apply = function (compiler) {
  compiler.plugin("done", function () {
    // Do something async...
    Object.keys(CONFIG.entry).map(key => {
      amendTent(key)
    })
  });
};

function amendTent(name) {
  let jsPath = `${CONFIG.filePath.dist}/${name}.js`;
  fs.readFile(jsPath, 'utf-8', function (error, result) {
    const time = new Date().toLocaleDateString()
    const auth = `
/* !
* {{name}}
* {{name}} v${packageInfo.version}
* updated date ${time}
*/
`
    const data = auth + result;
    fs.writeFile(jsPath, data, function (error) {
      // console.log(jsPath + '  Compile successfully')
    })
  })
}
module.exports = HapAmendAsyncPlugin;