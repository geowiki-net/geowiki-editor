import Events from 'events'
import Window from 'modulekit-window'

class DataChooser extends Events {
  constructor (app) {
    super()
    this.app = app
    this.dom = document.createElement('select')

    this.showSources()
    this.app.on('sources-change', () => this.showSources())

    this.dom.onchange = () => {
      if (this.dom.value === 'add') {
        this.select(this.current)

        return this.addDataSource((err, index) => {
          if (index !== null) {
            this.select(index)
          }
        })
      }

      this.select(this.dom.value)
    }

    this.select(0)
  }

  showSources () {
    while (this.dom.firstChild) {
      this.dom.removeChild(this.dom.firstChild)
    }

    this.app.sources.forEach((source, index) => {
      const option = document.createElement('option')
      option.value = index
      option.appendChild(document.createTextNode(source.name))

      this.dom.appendChild(option)
    })

    const optionAdd = document.createElement('option')
    optionAdd.value = 'add'
    optionAdd.appendChild(document.createTextNode('Add data source'))
    this.dom.appendChild(optionAdd)
  }

  select (index) {
    this.current = 0
    this.dom.value = index
    this.emit('change', this.app.sources[index])
  }

  addDataSource (callback) {
    const w = new Window({
      title: 'Add data source'
    })

    const buttonURL = document.createElement('button')
    buttonURL.appendChild(document.createTextNode('Add URL of an Overpass API server or a .osm or .osm.bz2 file'))
    w.content.appendChild(buttonURL)

    const buttonUpload = document.createElement('button')
    buttonUpload.appendChild(document.createTextNode('Upload .osm or .osm.bz2 file'))
    w.content.appendChild(buttonUpload)

    buttonURL.onclick = () => {
      w.content.innerHTML = ''

      const form = document.createElement('form')

      form.appendChild(document.createTextNode('Enter URL of Overpass API server or .osm or .osm.bz2 file:'))
      form.appendChild(document.createElement('br'))

      const inputURL = document.createElement('input')
      inputURL.name = 'url'
      form.appendChild(inputURL)

      form.appendChild(document.createElement('br'))

      const inputSubmit = document.createElement('input')
      inputSubmit.type = 'submit'
      inputSubmit.value = 'Ok'
      form.appendChild(inputSubmit)

      w.content.appendChild(form)

      inputSubmit.onclick = () => {
        global.setTimeout(() => {
          const def = {
            name: form.elements.url.value,
            url: form.elements.url.value
          }

          this.app.addSource(def)
          w.close()
          callback(null, this.app.sources.length - 1)
        }, 0)

        return false
      }

      const inputCancel = document.createElement('input')
      inputCancel.type = 'button'
      inputCancel.value = 'Cancel'
      form.appendChild(inputCancel)

      inputCancel.onclick = () => {
        w.close()
        callback(null, null)
        return false
      }
    }

    buttonUpload.onclick = () => {
      w.content.innerHTML = ''

      const form = document.createElement('form')

      form.appendChild(document.createTextNode('Upload .osm or .osm.bz2 file:'))
      form.appendChild(document.createElement('br'))

      const inputFile = document.createElement('input')
      inputFile.type = 'file'
      inputFile.name = 'file'
      form.appendChild(inputFile)

      form.appendChild(document.createElement('br'))

      const inputSubmit = document.createElement('input')
      inputSubmit.type = 'submit'
      inputSubmit.value = 'Ok'
      form.appendChild(inputSubmit)

      w.content.appendChild(form)

      inputSubmit.onclick = () => {
        global.setTimeout(() => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const def = {
              name: form.elements.file.value,
              url: e.target.result
            }

            this.app.addSource(def)
            w.close()
            callback(null, this.app.sources.length - 1)
          }
          reader.readAsDataURL(form.elements.file.files[0])
        }, 0)

        return false
      }

      const inputCancel = document.createElement('input')
      inputCancel.type = 'button'
      inputCancel.value = 'Cancel'
      form.appendChild(inputCancel)

      inputCancel.onclick = () => {
        w.close()
        callback(null, null)
        return false
      }
    }

    w.show()
  }
}

module.exports = DataChooser
