const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },

  prompts: {
    // name: {
    //   when: 'isNotTest',
    //   type: 'string',
    //   required: true,
    //   message: 'Project name',
    // },
    // author: {
    //   when: 'isNotTest',
    //   type: 'string',
    //   message: 'Author',
    // },
    packing: {
      when: 'isNotTest',
      type: 'list',
      message: 'webpack or rollup ?',
      choices: [
        {
          name: 'Webpack',
          value: 'webpack',
          short: 'webpack',
        },
        {
          name: 'Rollup',
          value: 'rollup',
          short: 'rollup',
        },
      ],
    },
    // description: {
    //   when: 'isNotTest',
    //   type: 'string',
    //   required: false,
    //   message: 'Project description',
    //   default: 'A Vue.js project',
    // },
  },
  filters: {
    // webpack 配置 start
    'build/**/*': "packing === 'webpack'",
    // webpack 配置 end
    // rollup 配置 start
    'rollup.config.js': "packing === 'rollup'",
    // rollup 配置 end
  },
  complete: function (data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)
    // NPM installation by default
    if (typeof data.autoInstall === "undefined") data.autoInstall = 'npm'
    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
