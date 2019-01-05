const outputPath = 'dist'

// 必要参数
const baseOptions = {
  entryFile: 'src/index.js',
  outputPath,
  templateFile: 'src/index.tmpl.html',
  templateTitle: 'init-project',
  cssPath: 'styles',
  purifycssFile: ['src/*.html', 'src/**/*.js'],
  assetsPath: 'assets',
  moduleToDll: {
    react: ['react', 'react-dom', 'react-router-dom']
  },
  dllFiles: ['react.dll.js', 'react.manifest.json']
}

// 可选参数
const extraOptions = {
  needsCssInHtml: false, // 打包时是否将 css 放入 html（选择 true 则不能去掉不用的 css 代码）
  copyConfig: null // 是否有不需要处理，直接拷贝的文件
  // copyConfig: {
  //   fromPath: 'src/docs',
  //   toPath: `${outputPath}/docs`
  // },
}

module.exports = Object.assign(baseOptions, extraOptions)
