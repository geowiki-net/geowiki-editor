import LeafletGeowiki from 'leaflet-geowiki/all'
import yaml from 'js-yaml'
import md5 from 'md5'
import state from 'geowiki-viewer/src/state'

import App from './App'
App.addExtension({
  id: 'styleEditor',
  requireExtensions: ['data', 'lang'],
  initFun
})

let textarea

function initFun (app, callback) {
  app.on('style-load', source => {
    if (!textarea) {
      return
    }

    textarea.value = source
  })

  const dom = document.getElementById('editor-style')

  const form = document.createElement('form')
  form.className = 'styleEditor'
  form.onsubmit = () => {
    const id = md5(textarea.value)
    localStorage.setItem('style-' + id, textarea.value)

    state.apply({
      styleFile: id
    })

    app.updateLink()

    return false
  }

  textarea = document.createElement('textarea')
  form.appendChild(textarea)

  const submit = document.createElement('input')
  submit.type = 'submit'
  submit.value = 'Apply'
  form.appendChild(submit)

  dom.appendChild(form)

  callback()
}
