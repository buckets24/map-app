import { Marker, Popup } from 'react-leaflet'

import type { Pin } from '@/types/pin'

type PinMarkersProps = {
  pins: Pin[]
  onDelete: (pinId: string) => void
  onDragEnd: (pinId: string, lat: number, lng: number) => void
}

export default function PinMarkers({
  pins,
  onDelete,
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
              <button
                type="button"
                onClick={() => onDelete(pin.id)}
                className="text-xs text-red-500 hover:text-red-700 font-medium mt-1"
              >
                Remove pin
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}
