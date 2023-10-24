const JSDOM = require('jsdom').JSDOM

import App from './App'
App.addExtension({
  id: 'listDataDirectory',
  initFun
})

function initFun (app, callback) {
  if (!app.config.dataDirectory) {
    return callback()
  }

  app.on('style-get-list', (promises) => {
    promises.push(new Promise((resolve, reject) => {
      loadDataDirectory(app.config.dataDirectory,
        (err, files) => {
          if (err) { reject(err) }

          const list = files.filter(name => name.match(/\.yaml$/))
          resolve(list)
        }
      )
    }))
  })

  callback()
}

function loadDataDirectory (path, callback) {
  let mode = 'http-server'

  fetch(path + '?F=2')
    .then(req => {
      const server = req.headers.get('server')
      if (server) {
        if (server.match(/^Apache\//)) {
          mode = 'apache'
        }
      }

      return req.text()
    })
    .then(text => {
      const dom = new JSDOM(text)

      let qry
      if (mode === 'http-server') {
        qry = 'table tr td.display-name'
      } else if (mode === 'apache') {
        qry = 'table tr td:nth-child(2)'
      }

      let list = dom.window.document.querySelectorAll(qry)
      list = Array.from(list)
        .map(d => d.textContent)
        .filter(name => name.substr(0, 1) !== '.')

      callback(null, list)
    })
}
