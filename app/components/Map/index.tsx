"use client";
import { useMemo } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MapContainer = ReactMapboxGl({
  accessToken:
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY!
});
interface MapProps {
  center?: [number, number];
}

export default function Map({ center }: MapProps) {
  const lngLat = useMemo(() => {
    const lat = +(center?.[0] ?? 24);
    const lng = +(center?.[1] ?? 90);

    return [lng, lat] as [number, number];
  }, [center])

  return (
    <MapContainer
      style="mapbox://styles/mapbox/outdoors-v12"
      containerStyle={{
        height: '350px',
        width: '100%'
      }}
      center={lngLat}
      zoom={[4]}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={lngLat} />
      </Layer>
      <Marker coordinates={lngLat} anchor="bottom-right">
        <FaMapMarkerAlt color="#F6657E" size={30} />
      </Marker>
    </MapContainer>
  )
}