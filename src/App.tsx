import { useCallback, useState } from 'react'
import type { LatLng } from 'leaflet'
import { MapPin } from 'lucide-react'

import MapView from '@/components/map/MapView'
import PinList from '@/components/map/PinList'
import type { Pin } from '@/types/pin'

async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<string | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
    {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'PinDropApp/1.0 (contact@pindrop.app)',
        Accept: 'application/json',
      },
    },
  )
  if (!res.ok) return null
  const data = (await res.json()) as { display_name?: string }
  return data.display_name ?? null
}

const STORAGE_KEY = 'pindrop_pins'

export default function App() {
  const [pins, setPins] = useState<Pin[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as Pin[]) : []
    } catch {
      return []
    }
  })

  const updateAndPersist = useCallback((updater: (prev: Pin[]) => Pin[]) => {
    setPins((prev) => {
      const updated = updater(prev)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const handleDragEnd = useCallback(
    async (pinId: string, lat: number, lng: number) => {
      updateAndPersist((prev) =>
        prev.map((p) =>
          p.id === pinId ? { ...p, lat, lng, address: null } : p,
        ),
      )
      const address = await reverseGeocode(lat, lng)
      updateAndPersist((prev) =>
        prev.map((p) =>
          p.id === pinId ? { ...p, lat, lng, address } : p,
        ),
      )
    },
    [updateAndPersist],
  )

  const handleMapClick = useCallback(
    async (latlng: LatLng) => {
      const newPin: Pin = {
        id: crypto.randomUUID(),
        lat: latlng.lat,
        lng: latlng.lng,
        address: null,
      }
      updateAndPersist((prev) => [newPin, ...prev])

      const address = await reverseGeocode(latlng.lat, latlng.lng)
      updateAndPersist((prev) =>
        prev.map((p) => (p.id === newPin.id ? { ...p, address } : p)),
      )
    },
    [updateAndPersist],
  )

  const handleDeletePin = useCallback(
    (pinId: string) => {
      updateAndPersist((prev) => prev.filter((p) => p.id !== pinId))
    },
    [updateAndPersist],
  )

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Carlo Carpio
            </h1>
            <p className="text-xs text-muted-foreground -mt-0.5">Dev Assessment</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-7rem)]">
          {/* Map */}
          <div className="flex-1 min-h-[400px] lg:min-h-0">
            <MapView
              pins={pins}
              onMapClick={handleMapClick}
              onDragEnd={handleDragEnd}
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0 bg-card rounded-lg border border-border shadow-lg p-5 overflow-hidden flex flex-col">
            <PinList pins={pins} onDeletePin={handleDeletePin} />
          </div>
        </div>
      </main>
    </div>
  )
}
