import App from './App'
App.addExtension({
  id: 'dataSelector',
  initFun
})

function initFun (app, callback) {
  const parentNode = document.getElementById('editor-data')

  const dom = document.createElement('select')
  parentNode.appendChild(dom)

  app.on('init', () => {
    const promises = []
    app.emit('data-get-list', promises)
    promises.forEach(p => p.then(list => {
      list.forEach(s => {
        const hasDataFile = !!Array.from(dom.children)
          .filter(option => option.value === s.id)
          .length

        if (hasDataFile) { return }

        const option = document.createElement('option')
        option.value = s.id
        option.appendChild(document.createTextNode(s.name))
        dom.appendChild(option)
      })
    }))
  })

  app.on('state-apply', state => {
    if (state.data) {
      const hasDataFile = !!Array.from(dom.children)
        .filter(option => option.value === state.data)
        .length

      if (!hasDataFile) {
        const option = document.createElement('option')
        option.value = state.data
        option.appendChild(document.createTextNode(state.data))
        dom.appendChild(option)
      }

      dom.value = state.data
    }
  })

  dom.onchange = () => {
    app.stateApply({ data: dom.value })
    app.updateLink()
  }

  callback()
}
