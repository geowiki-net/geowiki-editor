import Events from 'events'

class DataChooser extends Events {
  constructor (app) {
    super()
    this.app = app
    this.dom = document.createElement('select')

    this.app.sources.forEach((source, index) => {
      const option = document.createElement('option')
      option.value = index
      option.appendChild(document.createTextNode(source.name))

      this.dom.appendChild(option)
    })

    this.dom.onchange = () => this.emit('change', this.app.sources[this.dom.value])
  }
}

module.exports = DataChooser
