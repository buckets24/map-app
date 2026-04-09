import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import '@/lib/leaflet-icon-defaults'

const DEFAULT_CENTER: [number, number] = [51.505, -0.09]

export function MapView() {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={13}
      scrollWheelZoom
      className="z-0 h-[min(50vh,28rem)] w-full rounded-lg border border-border"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={DEFAULT_CENTER}>
        <Popup>Sample marker (London area).</Popup>
      </Marker>
    </MapContainer>
  )
}
