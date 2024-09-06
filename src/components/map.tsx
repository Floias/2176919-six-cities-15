import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import { useAppSelector } from '../hooks';
import { selectedCityLocation, pointSelected } from '../store/selectors';
import useMap from '../hooks/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import classNames from 'classnames';

export type Point = {
  id: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Points = Point[];

const defaultCustomIcon = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: './img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

type MapProps = {
  points: Points;
  isMain: boolean;
  selectedPoint?: Point | undefined;
};

function Map(props: MapProps): JSX.Element {
  const {points, isMain, selectedPoint} = props;
  const city = useAppSelector(selectedCityLocation);
  const pointSelectedByOffer = useAppSelector(pointSelected);

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayer = leaflet.layerGroup();

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [city, map]);

  useEffect(() => {
    const updatedPoints = [...points];
    if (map) {
      markerLayer.addTo(map);
      if (!isMain && pointSelectedByOffer) {
        updatedPoints.push(pointSelectedByOffer as Point);
      }
      updatedPoints.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id || point.id === pointSelectedByOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, selectedPoint, points, markerLayer, isMain, pointSelectedByOffer]);

  return (
    <section className={classNames(
      'map',
      {'cities__map': isMain},
      {'offer__map': !isMain}
    )} ref={mapRef}
    >
    </section>
  );
}

export default Map;
