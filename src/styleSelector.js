import App from './App'
App.addExtension({
  id: 'stytleSelector',
  initFun
})

function initFun (app, callback) {
  const parentNode = document.getElementById('editor-style')

  const dom = document.createElement('select')
  parentNode.appendChild(dom)

  app.on('state-apply', state => {
    if (state.styleFile) {
      const hasStyleFile = !!Array.from(dom.children)
        .filter(option => option.value === state.styleFile)
        .length

      if (!hasStyleFile) {
        const option = document.createElement('option')
        option.value = state.styleFile
        option.appendChild(document.createTextNode(state.styleFile))
        dom.appendChild(option)
      }

      dom.value = state.styleFile
    }
  })

  dom.onchange = () => {
    app.stateApply({ styleFile: dom.value })
    app.updateLink()
  }

  callback()
}
