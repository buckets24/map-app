import { MapContainer, TileLayer } from 'react-leaflet';
import MapClickHandler from './MapClickhandler';
import PinMarkers from './PinMarkers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue with webpack/vite
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DEFAULT_CENTER: [number, number] = [14.5813079, 120.9736056];
const DEFAULT_ZOOM = 6;

export default function MapView({ pins, onMapClick, onDeletePin, onDragEnd }) {
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
        <PinMarkers pins={pins} onDelete={onDeletePin} onDragEnd={onDragEnd} />
      </MapContainer>
    </div>
  );
}