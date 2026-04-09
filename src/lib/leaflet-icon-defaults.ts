import L from 'leaflet'

// `L.Icon.Default` prepends a detected `imagePath` to `iconUrl`, which in Vite becomes
// `.../node_modules/leaflet/dist/images/` + `/leaflet/marker-icon.png` (broken). Drop the
// override so the base `L.Icon` uses our URLs as-is.
// See: https://github.com/Leaflet/Leaflet/blob/main/src/layer/marker/Icon.Default.js
const proto = L.Icon.Default.prototype as L.Icon.Default & {
  _getIconUrl?: (name: string) => string | undefined
}
delete proto._getIconUrl

const ICON_BASE = `${import.meta.env.BASE_URL}leaflet/`

L.Icon.Default.mergeOptions({
  iconRetinaUrl: `${ICON_BASE}marker-icon-2x.png`,
  iconUrl: `${ICON_BASE}marker-icon.png`,
  shadowUrl: `${ICON_BASE}marker-shadow.png`,
})
