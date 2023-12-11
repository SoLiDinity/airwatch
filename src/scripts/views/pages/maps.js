import * as L from 'leaflet';
import { GestureHandling } from 'leaflet-gesture-handling';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import DataSource from '../../data/data-source';
import getAqiInfo from '../../utils/get-aqi-info';
import aqi from '../../globals/aqi-arrays';
import { createErrorPage } from '../templates/template-creator';

const Maps = {
  async render() {
    return `
        <div id="map">
          <div class="map-info">
            <div class="index-info">
                <div class="dot good"></div>
                <p>Baik</p>
            </div>
            <div class="index-info">
                <div class="dot moderate"></div>
                <p>Sedang</p>
            </div>
            <div class="index-info">
                <div class="dot unhealthy-groups"></div>
                <p>Tidak sehat untuk kelompok sensitif</p>
            </div>
            <div class="index-info">
                <div class="dot unhealthy"></div>
                <p>Tidak sehat</p>
            </div>
            <div class="index-info">
                <div class="dot very-unhealthy"></div>
                <p>Sangat Tidak sehat</p>
            </div>
            <div class="index-info">
                <div class="dot hazardous"></div>
                <p>Berbahaya</p>
            </div>
          </div>
        </div>
        <div class="map-page-error"></div>
        `;
  },

  async afterRender() {
    try {
      L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
      const map = L.map('map', {
        center: [-1.67, 118.3],
        zoom: 6,
        gestureHandling: true,
      });

      const indonesiaStations = await DataSource.allIndonesiaStationsData();
      const mapLink = '<a href="https://www.esri.com/">Esri</a>';
      const dataLink = '<a href="https://waqi.info/">WAQI</a>';

      L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: `&copy; ${mapLink} | data by &copy; ${dataLink}`,
          maxZoom: 18,
        },
      ).addTo(map);

      indonesiaStations.forEach(data => {
        const indexIcon = L.divIcon({
          html: `
            <div
              id="indexOnMapContainer"
              class="${getAqiInfo(data.aqi, aqi.class)}"
            >${data.aqi}</div>
          `,
          className: 'indexOnMap',
          iconSize: [50, 50],
          iconAnchor: [12, 12],
          popupAnchor: [-3, 0],
        });

        L.marker([data.lat, data.lon], { icon: indexIcon }).addTo(map).bindPopup(`
          <div class="popup">
            <div class="index-color-bg ${getAqiInfo(data.aqi, aqi.classUrl)} bg-img">
              <span>Index Udara</span>
              <div class="aqi-container"><h1 class="${getAqiInfo(data.aqi, aqi.class)}">${
                data.aqi
              }</h1></div>
              <div class="detail">
                <h3>${data.station.name}</h3>
                <span>Status: <strong style="color: ${getAqiInfo(
                  data.aqi,
                  aqi.colors,
                )}">${getAqiInfo(data.aqi, aqi.status)}</strong></span>
              </div>
            </div>
            <div class="container">
              <a class="to-detail-page" href="/#/detail/${
                data.uid
              }"><span>Selengkapnya<i class="fa-solid fa-arrow-right"></i></span></a>
            </div>
          </div>
      `);
      });
    } catch (error) {
      const mapContainer = document.querySelector('#map');
      const errorContainer = document.querySelector('.map-page-error');

      mapContainer.parentNode.removeChild(mapContainer);

      errorContainer.innerHTML += createErrorPage();
    }
  },
};

export default Maps;
