import { Marker, Popup } from 'react-leaflet'

import type { Pin } from '@/types/pin'

type PinMarkersProps = {
  pins: Pin[]
  onDragEnd: (pinId: string, lat: number, lng: number) => void
}

export default function PinMarkers({
  pins,
  onDragEnd,
}: PinMarkersProps) {
  return (
    <>
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          draggable={true}
          eventHandlers={{
            dragend(e) {
              const { lat, lng } = e.target.getLatLng()
              onDragEnd(pin.id, lat, lng)
            },
          }}
        >
          <Popup>
            <div className="text-sm space-y-1">
              {pin.address && (
                <p className="font-medium text-foreground">{pin.address}</p>
              )}
              <p className="text-muted-foreground text-xs font-mono">
                {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}
