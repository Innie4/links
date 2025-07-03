export {};
declare global {
  interface Window {
    google: any;
  }
}

import { useState, useEffect } from 'react'

interface Provider {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
}

interface MapViewProps {
  providers: Provider[]
  selectedLocation: string
  onLocationSelect: (location: string) => void
}

export function MapView({
  providers,
  selectedLocation,
  onLocationSelect,
}: MapViewProps) {
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window !== 'undefined' && !map) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      document.body.appendChild(script)

      script.onload = () => {
        const mapElement = document.getElementById('map')
        if (mapElement) {
          const mapOptions = {
            zoom: 14,
            center: { lat: 7.3469, lng: 7.4451 }, // Anyigba coordinates
            styles: theme === 'dark' ? darkMapStyles : [],
          }
          const newMap = new window.google.maps.Map(mapElement, mapOptions)
          setMap(newMap)

          // Add search box
          const searchBox = new window.google.maps.places.SearchBox(
            document.getElementById('search-box')!
          )
          searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces()
            if (places.length > 0) {
              const place = places[0]
              onLocationSelect(place.formatted_address)
              newMap.setCenter(place.geometry?.location!)
            }
          })

          // Add markers for providers
          providers.forEach((provider) => {
            const marker = new window.google.maps.Marker({
              position: { lat: provider.latitude, lng: provider.longitude },
              map: newMap,
              title: provider.name,
            })
            marker.addListener('click', () => {
              window.location.href = `/provider/${provider.id}`
            })
            setMarkers((prev) => [...prev, marker])
          })
        }
      }
    }
  }, [providers, theme])

  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <div id="search-box" className="w-full p-2 bg-white dark:bg-gray-800">
        <input
          type="text"
          placeholder="Search location..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
      </div>
      <div id="map" className="h-full" />
    </div>
  )
}

const darkMapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#000000' }, { lightness: 13 }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#144b53' }, { lightness: 14 }, { weight: 1.4 }],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{ color: '#08304b' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#0c4152' }, { lightness: 5 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0b434f' }, { lightness: 25 }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0b3d51' }, { lightness: 16 }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#0f3b48' }, { lightness: 19 }],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#021019' }],
  },
]
