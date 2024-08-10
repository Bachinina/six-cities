import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { ServerLocation } from '../../types/offer';
import useMap from '../../hooks/map';
import { useEffect } from 'react';

type MapProps = {
  className?: string;
  center: ServerLocation;
  points: ServerLocation[];
  selectedPoint: ServerLocation | undefined;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ className, center, points, selectedPoint }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, center);
  const markersLayerRef = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {

    if (map) {
      // Обновление центра карты
      map.setView([center.latitude, center.longitude], map.getZoom());

      if (markersLayerRef.current) {
        // Очистка слоя маркеров
        markersLayerRef.current.clearLayers();
      } else {
        // Создание слоя маркеров
        markersLayerRef.current = leaflet.layerGroup().addTo(map);
      }

      points.forEach((point) => {
        leaflet
          .marker(
            {
              lat: point.latitude,
              lng: point.longitude,
            },
            {
              icon:
                point.latitude === selectedPoint?.latitude &&
                  point.longitude === selectedPoint?.longitude
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(markersLayerRef.current!);
      });
    }
  }, [map, points, selectedPoint, defaultCustomIcon, currentCustomIcon]);

  return <section className={`${className} map`} ref={mapRef}></section>;
}

export { Map };
