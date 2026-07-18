import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Crosshair, MapPin } from 'lucide-react';

export interface Facility {
  id: string;
  name: string;
  distance: string;
  lat: number;
  lng: number;
  type: 'hospital' | 'shelter' | 'police' | 'fire';
  distVal?: number;
}

export interface LeafletMapProps {
  dashLat: string;
  dashLng: string;
  userLat: string | null;
  userLng: string | null;
  facilities: Facility[];
  selectedFacilityId: string | null;
  onMapClick?: (lat: string, lng: string) => void;
}

export function LeafletMap({
  dashLat,
  dashLng,
  userLat,
  userLng,
  facilities,
  selectedFacilityId,
  onMapClick
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const activeEpicenterMarkerRef = useRef<L.Marker | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const centerLat = parseFloat(dashLat) || 34.0522;
  const centerLng = parseFloat(dashLng) || -118.2437;

  // Custom premium divIcons matching the dark tactical aesthetic
  const epicenterIcon = L.divIcon({
    className: 'custom-epicenter-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <span class="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-red-500 opacity-70"></span>
        <span class="animate-pulse absolute inline-flex h-6 w-6 rounded-full bg-red-600 opacity-40"></span>
        <div class="relative h-4 w-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center shadow-lg">
          <div class="h-1.5 w-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  const userIcon = L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <span class="animate-pulse absolute inline-flex h-7 w-7 rounded-full bg-blue-500 opacity-60"></span>
        <div class="relative h-3.5 w-3.5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center shadow-md">
          <div class="h-1 w-1 bg-white rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const getPoiIcon = (type: 'hospital' | 'shelter' | 'police' | 'fire', isSelected: boolean) => {
    let bgClass = 'bg-slate-700 border-slate-400';
    let iconLabel = '📍';

    if (type === 'hospital') {
      bgClass = isSelected ? 'bg-red-500 border-white ring-4 ring-red-500/30 scale-110' : 'bg-red-600 border-red-400';
      iconLabel = '➕';
    } else if (type === 'shelter') {
      bgClass = isSelected ? 'bg-emerald-500 border-white ring-4 ring-emerald-500/30 scale-110' : 'bg-emerald-600 border-emerald-400';
      iconLabel = '⛺';
    } else if (type === 'police') {
      bgClass = isSelected ? 'bg-blue-600 border-white ring-4 ring-blue-500/30 scale-110' : 'bg-blue-800 border-blue-400';
      iconLabel = '🛡️';
    } else if (type === 'fire') {
      bgClass = isSelected ? 'bg-amber-500 border-white ring-4 ring-amber-500/30 scale-110' : 'bg-amber-600 border-amber-400';
      iconLabel = '🔥';
    }

    return L.divIcon({
      className: `custom-poi-marker-${type}`,
      html: `
        <div class="h-6 w-6 ${bgClass} border rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
          <span class="text-white text-[10px] font-bold leading-none">${iconLabel}</span>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // 1. Initialize map container
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Use CartoDB Dark Matter tiles to fit the tactical dark UI perfectly
    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 14,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    // Click handler on map
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat.toFixed(4), e.latlng.lng.toFixed(4));
      }
    });

    mapRef.current = map;

    // Fix leaflet container resize bugs
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.off();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 2. Update Epicenter and User markers & Center map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Center map view on new coordinates
    map.setView([centerLat, centerLng], map.getZoom() || 14);

    // Update active epicenter marker
    if (activeEpicenterMarkerRef.current) {
      activeEpicenterMarkerRef.current.setLatLng([centerLat, centerLng]);
    } else {
      activeEpicenterMarkerRef.current = L.marker([centerLat, centerLng], { icon: epicenterIcon })
        .addTo(map)
        .bindPopup(`<div class="font-sans text-xs font-bold text-red-600">⚠️ Incident Epicenter</div><div class="text-[10px] text-slate-500 font-mono">${centerLat.toFixed(4)}, ${centerLng.toFixed(4)}</div>`);
    }

    // Update user marker
    if (userLat && userLng) {
      const uLat = parseFloat(userLat);
      const uLng = parseFloat(userLng);
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([uLat, uLng]);
      } else {
        userMarkerRef.current = L.marker([uLat, uLng], { icon: userIcon })
          .addTo(map)
          .bindPopup('<div class="font-sans text-xs font-bold text-blue-600">🔵 Your Location</div>');
      }
    } else if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
  }, [centerLat, centerLng, userLat, userLng]);

  // 3. Repopulate POI markers based on facilities prop
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add new markers
    facilities.forEach(poi => {
      if (poi.lat === undefined || poi.lng === undefined) return;

      const isSelected = selectedFacilityId !== null && (
        selectedFacilityId === poi.id || 
        poi.id.includes(selectedFacilityId) || 
        selectedFacilityId.includes(poi.id)
      );

      const marker = L.marker([poi.lat, poi.lng], {
        icon: getPoiIcon(poi.type, isSelected)
      })
        .addTo(map)
        .bindPopup(`
          <div class="font-sans text-xs p-1">
            <div class="font-bold text-slate-900">${poi.name}</div>
            <div class="text-[10px] text-slate-500 mt-1 capitalize font-semibold flex items-center gap-1">
              <span>Type:</span> <span class="px-1.5 py-0.5 rounded bg-slate-100">${poi.type}</span>
            </div>
            <div class="text-[9px] text-slate-400 mt-0.5 font-mono">Distance: ${poi.distance}</div>
          </div>
        `);

      if (isSelected) {
        marker.openPopup();
        map.setView([poi.lat, poi.lng], Math.max(map.getZoom() || 14, 15));
      }

      markersRef.current.push(marker);
    });
  }, [facilities, selectedFacilityId]);

  // Handlers for manual interactions
  const recenterOnUser = () => {
    const map = mapRef.current;
    if (map && userLat && userLng) {
      map.setView([parseFloat(userLat), parseFloat(userLng)], 15);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        if (map) {
          map.setView([uLat, uLng], 15);
        }
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Dynamic Overlay HUD Controls */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
        <button 
          onClick={recenterOnUser}
          className="p-2 bg-slate-900/90 border border-slate-800 hover:bg-slate-800 text-blue-400 hover:text-blue-300 rounded-lg shadow-lg backdrop-blur-md transition-all flex items-center justify-center"
          title="Center on GPS Location"
          id="btn-recenter-user"
        >
          <Crosshair className="h-4 w-4" />
        </button>
      </div>

      {/* Live Map Area */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[280px]" id="live-leaflet-map-panel" />

      {/* Map Legend Footer HUD */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] p-2 bg-slate-950/85 border border-slate-900 rounded-lg backdrop-blur-sm flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-red-500 animate-pulse" />
          <span>Active Epicenter: <span className="text-white font-bold">{centerLat.toFixed(4)}, {centerLng.toFixed(4)}</span></span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block border border-white flex items-center justify-center text-[8px] text-white font-bold">➕</span>
            <span>Hospitals</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block border border-white flex items-center justify-center text-[8px] text-white font-bold">⛺</span>
            <span>Shelters</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-800 inline-block border border-white flex items-center justify-center text-[8px] text-white font-bold">🛡️</span>
            <span>Police</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block border border-white flex items-center justify-center text-[8px] text-white font-bold">🔥</span>
            <span>Fire</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeafletMap;
