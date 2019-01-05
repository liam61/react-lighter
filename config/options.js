const outputPath = 'dist'

module.exports = {
  entryFile: 'src/index.js',
  outputPath,
  templateFile: 'src/index.tmpl.html',
  templateTitle: 'init-project',
  cssPath: 'styles',
  purifycssFile: ['src/*.html', 'src/**/*.js'],
  assetsPath: 'assets',
  copyConfig: {
    copyPath: 'src/docs',
    toPath: `${outputPath}/docs`
  },
  moduleToDll: {
    react: ['react', 'react-dom', 'react-router-dom']
  },
  dllFiles: ['react.dll.js', 'react.manifest.json']
}
