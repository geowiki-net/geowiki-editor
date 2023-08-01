require('leaflet')
import async from 'async'
import OverpassFrontend from 'overpass-frontend'
import EditableLayer from './EditableLayer'

class App {
  constructor () {
    this.sources = [
      {
        name: 'OpenStreetMap (via overpass-api.de)',
        url: '//overpass-api.de/api/interpreter',
      }
    ]

    this.sources.forEach(src => {
      src.overpassFrontend = new OverpassFrontend(src.url)
    })
  }

  initMap () {
    // Create Leaflet map object
    this.map = L.map('map').setView([ 47.0835225, 15.4600919 ], 18)

    // Show OSM map background
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map)
  }

  load (callback) {
    this.editableLayers = [
      new EditableLayer(app, {
        source: this.sources[0],
        styleFile: 'default.yaml'
      })
    ]

    this.domEditor = document.getElementById('editor')

    async.each(this.editableLayers, (el, done) => {
      el.load((err) => {
        if (err) { return done(err) }
        el.addTo(this.map)
        this.domEditor.appendChild(el.dom)
        done()
      })
    }, (err) => {
      if (err) { return alert(err) }
    })
  }
}

const app = new App()

window.onload = () => {
  app.initMap()

  app.load()

  // We could also add the map info with this command
  //geowiki.setOption('info', { dom: document.getElementById('info') })
}
