import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation, Phone, Clock, Star } from "lucide-react";
import { type Motorcycle } from "../types/motorcycle";

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const brandIcons: Record<string, L.Icon> = {};

const getBrandIcon = (brand: string): L.Icon => {
  if (!brandIcons[brand]) {
    brandIcons[brand] = L.divIcon({
      className: "custom-marker",
      html: `<div class="marker-content" style="background-color: ${getBrandColor(brand)}">
              <span class="marker-text">${brand.charAt(0)}</span>
             </div>`,
      iconSize: [30, 30],
      popupAnchor: [0, -15],
    });
  }
  return brandIcons[brand];
};

const getBrandColor = (brand: string): string => {
  const colors: Record<string, string> = {
    Kawasaki: "#00A651",
    Triumph: "#E60000",
    BMW: "#0066B4",
    Ducati: "#D90000",
    "Harley-Davidson": "#E87722",
    Yamaha: "#E2231A",
    Honda: "#E60012",
    KTM: "#FF6600",
    Suzuki: "#FEBE10",
  };
  return colors[brand] || "#F97316";
};

interface Dealership {
  id: string;
  name: string;
  brand: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  rating: number;
  lat: number;
  lng: number;
}

interface DealershipMapProps {
  motorcycles: Motorcycle[];
  selectedBrand?: string;
  onDealershipSelect?: (dealership: Dealership) => void;
}

export const DealershipMap: React.FC<DealershipMapProps> = ({
  motorcycles,
  selectedBrand,
  onDealershipSelect,
}) => {
  const [dealerships, setDealerships] = useState<Dealership[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [selectedDealership, setSelectedDealership] =
    useState<Dealership | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    39.8283, -98.5795,
  ]);

  useEffect(() => {
    const brands = [...new Set(motorcycles.map((m) => m.manufacturer))];
    const generatedDealerships: Dealership[] = [];

    const cities = [
      {
        name: "New York",
        lat: 40.7128,
        lng: -74.006,
        state: "NY",
        zip: "10001",
      },
      {
        name: "Los Angeles",
        lat: 34.0522,
        lng: -118.2437,
        state: "CA",
        zip: "90001",
      },
      {
        name: "Chicago",
        lat: 41.8781,
        lng: -87.6298,
        state: "IL",
        zip: "60601",
      },
      {
        name: "Houston",
        lat: 29.7604,
        lng: -95.3698,
        state: "TX",
        zip: "77001",
      },
      {
        name: "Phoenix",
        lat: 33.4484,
        lng: -112.074,
        state: "AZ",
        zip: "85001",
      },
      {
        name: "Philadelphia",
        lat: 39.9526,
        lng: -75.1652,
        state: "PA",
        zip: "19101",
      },
      {
        name: "San Antonio",
        lat: 29.4241,
        lng: -98.4936,
        state: "TX",
        zip: "78201",
      },
      {
        name: "San Diego",
        lat: 32.7157,
        lng: -117.1611,
        state: "CA",
        zip: "92101",
      },
      { name: "Dallas", lat: 32.7767, lng: -96.797, state: "TX", zip: "75201" },
      {
        name: "Austin",
        lat: 30.2672,
        lng: -97.7431,
        state: "TX",
        zip: "78701",
      },
      {
        name: "Seattle",
        lat: 47.6062,
        lng: -122.3321,
        state: "WA",
        zip: "98101",
      },
      {
        name: "Denver",
        lat: 39.7392,
        lng: -104.9903,
        state: "CO",
        zip: "80201",
      },
      { name: "Miami", lat: 25.7617, lng: -80.1918, state: "FL", zip: "33101" },
      {
        name: "Boston",
        lat: 42.3601,
        lng: -71.0589,
        state: "MA",
        zip: "02101",
      },
      {
        name: "San Francisco",
        lat: 37.7749,
        lng: -122.4194,
        state: "CA",
        zip: "94101",
      },
    ];

    brands.forEach((brand) => {
      const numDealerships = Math.floor(Math.random() * 2) + 2; // 2-3 dealerships per brand
      const shuffledCities = [...cities].sort(() => 0.5 - Math.random());

      for (let i = 0; i < numDealerships && i < shuffledCities.length; i++) {
        const city = shuffledCities[i];
        const dealership: Dealership = {
          id: `${brand}-${city.name}`,
          name: `${brand} Motorcycles of ${city.name}`,
          brand: brand,
          address: `${Math.floor(Math.random() * 9000) + 1000} ${["Broadway", "Main St", "Motorcycle Ave", "Speedway", "Auto Row"][Math.floor(Math.random() * 5)]}`,
          city: city.name,
          state: city.state,
          zip: city.zip,
          phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          hours: "Mon-Sat: 9AM-7PM, Sun: 11AM-5PM",
          rating: 4 + Math.random(),
          lat: city.lat + (Math.random() - 0.5) * 0.05,
          lng: city.lng + (Math.random() - 0.5) * 0.05,
        };
        generatedDealerships.push(dealership);
      }
    });

    setDealerships(generatedDealerships);
  }, [motorcycles]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log("Geolocation not available:", error);
        },
      );
    }
  }, []);

  const filteredDealerships =
    selectedBrand && selectedBrand !== "All"
      ? dealerships.filter((d) => d.brand === selectedBrand)
      : dealerships;

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): string => {
    const R = 3959;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance < 1
      ? `${Math.round(distance * 5280)} ft`
      : `${distance.toFixed(1)} mi`;
  };

  const handleDealershipClick = (dealership: Dealership) => {
    setSelectedDealership(dealership);
    if (onDealershipSelect) {
      onDealershipSelect(dealership);
    }
  };

  return (
    <div className="dealership-map-container">
      <div className="map-header">
        <div className="map-title">
          <MapPin className="w-5 h-5 text-orange-500" />
          <h2>Find Dealerships Near You</h2>
        </div>
        {userLocation && (
          <div className="user-location-badge">
            <Navigation className="w-3 h-3" />
            <span>Location enabled</span>
          </div>
        )}
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={mapCenter}
          zoom={5}
          style={{ height: "500px", width: "100%", borderRadius: "0.75rem" }}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {filteredDealerships.map((dealership) => (
            <Marker
              key={dealership.id}
              position={[dealership.lat, dealership.lng]}
              icon={getBrandIcon(dealership.brand)}
              eventHandlers={{
                click: () => handleDealershipClick(dealership),
              }}
            >
              <Tooltip permanent={false}>{dealership.name}</Tooltip>
              <Popup>
                <div className="map-popup">
                  <h3>{dealership.name}</h3>
                  <div className="popup-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`star ${i < Math.floor(dealership.rating) ? "filled" : ""}`}
                      />
                    ))}
                    <span>{dealership.rating.toFixed(1)}</span>
                  </div>
                  <p className="popup-address">
                    {dealership.address}
                    <br />
                    {dealership.city}, {dealership.state} {dealership.zip}
                  </p>
                  <p className="popup-phone">
                    <Phone className="w-3 h-3" /> {dealership.phone}
                  </p>
                  <p className="popup-hours">
                    <Clock className="w-3 h-3" /> {dealership.hours}
                  </p>
                  {userLocation && (
                    <p className="popup-distance">
                      <Navigation className="w-3 h-3" />
                      {calculateDistance(
                        userLocation[0],
                        userLocation[1],
                        dealership.lat,
                        dealership.lng,
                      )}{" "}
                      away
                    </p>
                  )}
                  <button className="popup-button">Get Directions</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="dealership-list">
        <h3>Nearby Dealerships</h3>
        <div className="dealership-items">
          {filteredDealerships.slice(0, 6).map((dealership) => (
            <div
              key={dealership.id}
              className={`dealership-item ${selectedDealership?.id === dealership.id ? "active" : ""}`}
              onClick={() => handleDealershipClick(dealership)}
            >
              <div
                className="dealership-icon"
                style={{ backgroundColor: getBrandColor(dealership.brand) }}
              >
                {dealership.brand.charAt(0)}
              </div>
              <div className="dealership-info">
                <h4>{dealership.name}</h4>
                <p className="dealership-address">
                  {dealership.city}, {dealership.state}
                </p>
                <div className="dealership-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star-small ${i < Math.floor(dealership.rating) ? "filled" : ""}`}
                    />
                  ))}
                  <span>({dealership.rating.toFixed(1)})</span>
                </div>
              </div>
              {userLocation && (
                <div className="dealership-distance">
                  {calculateDistance(
                    userLocation[0],
                    userLocation[1],
                    dealership.lat,
                    dealership.lng,
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
