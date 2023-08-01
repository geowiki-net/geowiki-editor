import LeafletGeowiki from 'leaflet-geowiki'
const yaml = require('js-yaml')

class EditableLayer {
  constructor (app, options) {
    this.app = app
    this.options = options
  }

  load (callback) {
    if (this.options.style) {
      return callback()
    }

    fetch(this.options.styleFile)
      .then(req => req.text())
      .then(body => {
        this.options.style = yaml.load(body)
        callback()
      })
  }

  addTo (map) {
    const leafletGeowikiOptions = {
      overpassFrontend: this.options.source.overpassFrontend,
      style: this.options.style
    }

    // Initialize Geowiki viewer
    this.layer = new LeafletGeowiki(leafletGeowikiOptions).addTo(map)
  }
}

module.exports = EditableLayer
