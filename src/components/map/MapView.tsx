import type { LatLng } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import '@/lib/leaflet-icon-defaults'

import MapClickHandler from './MapClickhandler'
import PinMarkers from './PinMarkers'
import type { Pin } from '@/types/pin'

const DEFAULT_CENTER: [number, number] = [14.5813079, 120.9736056]
const DEFAULT_ZOOM = 6

type MapViewProps = {
  pins: Pin[]
  onMapClick: (latlng: LatLng) => void
  onDragEnd: (pinId: string, lat: number, lng: number) => void
}

export default function MapView({
  pins,
  onMapClick,
  onDragEnd,
}: MapViewProps) {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg border border-border">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={onMapClick} />
        <PinMarkers pins={pins} onDragEnd={onDragEnd} />
      </MapContainer>
    </div>
  )
}
