import Events from 'events'
import Window from 'modulekit-window'

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

    const optionAdd = document.createElement('option')
    optionAdd.value = 'add'
    optionAdd.appendChild(document.createTextNode('Add data source'))
    this.dom.appendChild(optionAdd)

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

  select (index) {
    this.current = 0
    this.dom.value = index
    this.emit('change', this.app.sources[index])
  }

  addDataSource () {
    const w = new Window({
      title: 'Add data source'
    })

    w.show()
  }
}

module.exports = DataChooser
