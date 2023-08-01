import LeafletGeowiki from 'leaflet-geowiki'
const yaml = require('js-yaml')

class EditableLayer {
  constructor (app, options) {
    this.app = app
    this.options = options

    this.dom = document.createElement('div')
    this.domStyle = document.createElement('textarea')
    this.domStyle.onchange = () => this.applyStyle(this.domStyle.value)
    this.dom.appendChild(this.domStyle)
  }

  load (callback) {
    if (this.options.style) {
      return callback()
    }

    fetch(this.options.styleFile)
      .then(req => req.text())
      .then(body => {
        this.applyStyle(body)
        callback()
      })
  }

  applyStyle (body) {
    this.domStyle.value = body
    this.options.style = yaml.load(body)

    if (this.map) {
      this.addTo(this.map)
    }
  }

  addTo (map) {
    this.map = map

    if (this.layer) {
      this.layer.remove()
    }

    const leafletGeowikiOptions = {
      overpassFrontend: this.options.source.overpassFrontend,
      style: this.options.style
    }

    // Initialize Geowiki viewer
    this.layer = new LeafletGeowiki(leafletGeowikiOptions).addTo(map)
  }
}

module.exports = EditableLayer
