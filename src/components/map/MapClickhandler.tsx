import type { LatLng } from 'leaflet'
import { useMapEvents } from 'react-leaflet'

type MapClickHandlerProps = {
  onMapClick: (latlng: LatLng) => void
}

export default function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng)
    },
  })
  return null
}
