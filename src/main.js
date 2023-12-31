import 'leaflet'
import 'geowiki-viewer/src/data'
import 'geowiki-viewer/src/lang'
import 'geowiki-viewer/src/map'
import 'geowiki-viewer/src/layer'
import 'geowiki-viewer/src/config'
import './dataSelector'
import './styleSelector'
import './styleEditor'
import './editableLayerLoader'
import './listDataDirectory'
import App from './App'

window.onload = function () {
  return new App()
}
