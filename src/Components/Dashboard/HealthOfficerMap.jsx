// src/components/MedicalAssessmentsMap.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input"; // Assuming shadcn Input
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import toast from "react-hot-toast"; // For notifications
import { AccessibilityIcon } from 'lucide-react'; // Or your custom Wheelchair icon

// Fix for default Leaflet marker icons being broken in Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// --- Sample Data (Replace with your actual GeoJSON and assessment logic) ---
// In a real app, you'd fetch this from an API
// For demonstration, we'll simulate fetching a GeoJSON for Nairobi Sub-Counties
// and some mock assessment counts.
// The GeoJSON should contain a 'name' property for sub-county name and optionally 'center_lat', 'center_lng'
// If no center_lat/lng in GeoJSON properties, you'll need a way to calculate or estimate them.
const mockNairobiSubcountiesGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "name": "Dagoretti North", "county": "Nairobi", "center_lat": -1.27, "center_lng": 36.78, "assessmentCount": 45 }, "geometry": { "type": "Polygon", "coordinates": [[ [36.75, -1.25], [36.8, -1.25], [36.8, -1.3], [36.75, -1.3], [36.75, -1.25] ]] } },
    { "type": "Feature", "properties": { "name": "Embakasi Central", "county": "Nairobi", "center_lat": -1.32, "center_lng": 36.92, "assessmentCount": 30 }, "geometry": { "type": "Polygon", "coordinates": [[ [36.9, -1.3], [36.95, -1.3], [36.95, -1.35], [36.9, -1.35], [36.9, -1.3] ]] } },
    { "type": "Feature", "properties": { "name": "Westlands", "county": "Nairobi", "center_lat": -1.25, "center_lng": 36.79, "assessmentCount": 60 }, "geometry": { "type": "Polygon", "coordinates": [[ [36.77, -1.23], [36.82, -1.23], [36.82, -1.28], [36.77, -1.28], [36.77, -1.23] ]] } },
    { "type": "Feature", "properties": { "name": "Roysambu", "county": "Nairobi", "center_lat": -1.20, "center_lng": 36.88, "assessmentCount": 20 }, "geometry": { "type": "Polygon", "coordinates": [[ [36.86, -1.18], [36.91, -1.18], [36.91, -1.23], [36.86, -1.23], [36.86, -1.18] ]] } },
    { "type": "Feature", "properties": { "name": "Lang'ata", "county": "Nairobi", "center_lat": -1.35, "center_lng": 36.79, "assessmentCount": 55 }, "geometry": { "type": "Polygon", "coordinates": [[ [36.76, -1.33], [36.81, -1.33], [36.81, -1.38], [36.76, -1.38], [36.76, -1.33] ]] } },
    { "type": "Feature", "properties": { "name": "Kasarani", "county": "Nairobi", "center_lat": -1.21, "center_lng": 36.93, "assessmentCount": 10 }, "geometry": { "type": "Polygon", "coordinates": [[ [36.91, -1.19], [36.96, -1.19], [36.96, -1.24], [36.91, -1.24], [36.91, -1.19] ]] } }
  ]
};

const mockDisabilityAssessments = [
  { type: "Disability 1", count: 12 },
  { type: "Disability 2", count: 23 },
  { type: "Disability 3", count: 133 },
  { type: "Disability 4", count: 5 },
  { type: "Disability 5", count: 39 },
  { type: "Disability 6", count: 0 },
  { type: "Disability 7", count: 0 },
];
// --- End Sample Data ---


export function MedicalAssessmentsMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nairobiSubcounties, setNairobiSubcounties] = useState([]);
  const [totalAssessments, setTotalAssessments] = useState(0);
  const geoJsonRef = useRef(null); // Reference to the GeoJSON layer
  const mapRef = useRef(null); // Reference to the map instance

  // Fetch GeoJSON data for Nairobi Sub-Counties
  useEffect(() => {
    // In a real application, you'd fetch from your API or a hosted GeoJSON file:
    // fetch('/path/to/nairobi_subcounties.geojson')
    //   .then(res => res.json())
    //   .then(data => {
    //     setNairobiSubcounties(data.features);
    //     // Calculate total assessments initially
    //     const total = data.features.reduce((sum, feature) => sum + (feature.properties.assessmentCount || 0), 0);
    //     setTotalAssessments(total);
    //   })
    //   .catch(err => {
    //     console.error("Error loading GeoJSON:", err);
    //     toast.error("Failed to load map data.");
    //   });

    // --- Using mock data for demonstration ---
    setNairobiSubcounties(mockNairobiSubcountiesGeoJSON.features);
    const total = mockNairobiSubcountiesGeoJSON.features.reduce((sum, feature) => sum + (feature.properties.assessmentCount || 0), 0);
    setTotalAssessments(total);
    // --- End mock data ---

  }, []);

  // Function to determine style for each sub-county polygon
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          color: 'blue',
          dashArray: '',
          fillOpacity: 0.7
        });
      },
      mouseout: (e) => {
        geoJsonRef.current.clearLayers().addData(nairobiSubcounties); // Reset all styles
      },
      click: (e) => {
        toast.success(`Clicked on: ${feature.properties.name}`);
        // Optionally, zoom to the clicked feature
        mapRef.current.fitBounds(e.target.getBounds());
      }
    });
    // Set initial style
    layer.setStyle({
      fillColor: '#CBD5E1', // Light gray for polygons
      weight: 1,
      opacity: 1,
      color: 'black', // Border color
      dashArray: '1',
      fillOpacity: 0.5
    });

    // You could add tooltips or popups here for the polygons
    // layer.bindTooltip(feature.properties.name);
  };

  // Calculate bubble size based on assessment count
  const getMaxAssessmentCount = () => {
    return nairobiSubcounties.reduce((max, feature) => Math.max(max, feature.properties.assessmentCount || 0), 0);
  };

  const getBubbleRadius = (count) => {
    const maxCount = getMaxAssessmentCount();
    if (maxCount === 0 || count === 0) return 5; // Minimum size
    // Scale radius logarithmically for better visual distribution
    return 5 + (Math.log(count + 1) / Math.log(maxCount + 1)) * 30; // Max radius 35 (5 + 30)
  };

  // Filtered sub-counties for search (not directly implemented in map, but for data display)
  const filteredDisabilityAssessments = mockDisabilityAssessments.filter(item =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Center for Nairobi, Kenya
  const nairobiCenter = [-1.286389, 36.817223];
  const initialZoom = 9.5; // Zoom level to see Nairobi sub-counties


  return (
    <Card className="w-full">
      <CardHeader>
        {/* Green title */}
        <CardTitle className="text-xl font-semibold" style={{ color: 'var(--green-title)' }}>
          Medical Assessments by Sub-County
        </CardTitle>
        <CardDescription>
          Below is a list of all Medical Officers for your approval
        </CardDescription>
        <Input
          placeholder="Sub-County or Hospital"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4"
        />
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">TOTAL ASSESSMENTS</h3>
          <p className="text-4xl font-bold text-blue-700">{totalAssessments}</p>
        </div>

        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          {nairobiSubcounties.length > 0 ? (
            <MapContainer
              center={nairobiCenter}
              zoom={initialZoom}
              scrollWheelZoom={false}
              className="w-full h-full"
              whenCreated={mapInstance => { mapRef.current = mapInstance }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* GeoJSON Layer for sub-county boundaries */}
              <GeoJSON
                key={JSON.stringify(nairobiSubcounties)} // Use key to force re-render on data change
                data={mockNairobiSubcountiesGeoJSON} // Use the full GeoJSON object
                style={() => ({ // Default style for polygons
                  fillColor: 'transparent', // Make the polygons transparent initially
                  weight: 2,
                  opacity: 1,
                  color: 'black', // Black border
                  dashArray: '3',
                  fillOpacity: 0.7
                })}
                onEachFeature={onEachFeature}
                ref={geoJsonRef}
              />

              {/* Circle Markers (Bubbles) */}
              {nairobiSubcounties.map((feature, index) => {
                const centerLat = feature.properties.center_lat;
                const centerLng = feature.properties.center_lng;
                const count = feature.properties.assessmentCount || 0;

                if (centerLat && centerLng) {
                  return (
                    <CircleMarker
                      key={feature.properties.name || index}
                      center={[centerLat, centerLng]}
                      radius={getBubbleRadius(count)}
                      fillColor="hsl(var(--chart-1))" // Use your chart blue
                      color="white"
                      weight={1}
                      opacity={1}
                      fillOpacity={0.7}
                    >
                      <Popup>
                        <strong>{feature.properties.name}</strong><br />
                        Assessments: {count}
                      </Popup>
                    </CircleMarker>
                  );
                }
                return null;
              })}
            </MapContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading map data...
            </div>
          )}
          <div className="absolute top-4 right-4 z-[1000]">
            <AccessibilityIcon className="w-10 h-10 text-blue-600 opacity-80" />
          </div>
        </div>

        {/* Disability Type Assessments */}
        <div className="mt-6">
          {mockDisabilityAssessments.map((item, index) => (
            <p key={index} className="text-sm text-gray-700">
              <span className="font-semibold">{item.type}</span>: {item.count}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}