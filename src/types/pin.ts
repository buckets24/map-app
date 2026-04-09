/** Saved map pin. `address` is null while geocoding; `false` means lookup failed. */
export type Pin = {
  id: string
  lat: number
  lng: number
  address: string | null | false
}
