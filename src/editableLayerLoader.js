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

  app.on('style-get-list', (promises) => {
    promises.push(new Promise((resolve) => {
      const list = Object.keys(localStorage)
        .map(id => {
          const m = id.match(/^style-(.*)$/)
          return m ? m[1] : null
        })
        .filter(id => id)

      resolve(list)
    }))
  })

  callback()
}
