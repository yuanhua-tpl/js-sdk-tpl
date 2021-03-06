'use strict'

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config/')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('开始打包...\n')
spinner.start()

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    // console.log(chalk.yellow(
    //   '  Tip: 打包完成，你可以运行以下命令发版\n' +
    //   '  $ npm run publish \n'
    // ))
  })
})
