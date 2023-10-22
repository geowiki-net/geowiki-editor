import App from './App'
App.addExtension({
  id: 'editableLayerLoader',
  initFun
})

function initFun (app, callback) {
  app.on('style-get', (style, promises) => {
    if (style.match(/^[0-9a-z]{32}$/)) {
      const source = localStorage.getItem('style-' + style)
      
      if (!source) {
        return
      }

      promises.push(new Promise((resolve, reject) => {
        resolve(source)
      }))
    }
  })

  callback()
}
