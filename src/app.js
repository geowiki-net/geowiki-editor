require('leaflet')
import LeafletGeowiki from 'leaflet-geowiki'
import OverpassFrontend from 'overpass-frontend'

window.onload = () => {
  const options = {}

  // Create Leaflet map object
  const map = L.map('map').setView([ 47.0835225, 15.4600919 ], 18)

  // Show OSM map background
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // create link to overpass database (this could be a file, e.g. data.osm)
  const overpassFrontend = new OverpassFrontend('//overpass-api.de/api/interpreter')

  // Initialize Geowiki viewer
  var geowiki = new LeafletGeowiki({
    overpassFrontend,
    styleFile: 'default.yaml',
    // show map info (if available)
    info: { dom: document.getElementById('info') }
  }).addTo(map)

  // We could also add the map info with this command
  //geowiki.setOption('info', { dom: document.getElementById('info') })
}
