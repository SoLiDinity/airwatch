import * as L from 'leaflet';
import { GestureHandling } from 'leaflet-gesture-handling';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import DataSource from '../../data/data-source';
import getAqiInfo from '../../utils/get-aqi-info';

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
        `;
  },

  async afterRender() {
    L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
    const map = L.map('map', {
      center: [-1.67, 118.3],
      zoom: 6,
      gestureHandling: true,
    });

    const mapLink = '<a href="https://www.esri.com/">Esri</a>';
    const dataLink = '<a href="https://waqi.info/">WAQI</a>';

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: `&copy; ${mapLink} | data by &copy; ${dataLink}`,
      maxZoom: 18,
    }).addTo(map);

    const indonesiaStations = await DataSource.alllIndonesiaStationsData();

    const aqiClass = ['good', 'moderate', 'unhealthy-groups', 'unhealthy', 'very-unhealthy', 'hazardous', 'good'];
    indonesiaStations.forEach((data) => {
      const indexIcon = L.divIcon({
        html: `
          <div
            id="indexOnMapContainer"
            class="${getAqiInfo(data.aqi, aqiClass)}"
          >${data.aqi}</div>
        `,
        className: 'indexOnMap',
        iconSize: [50, 50],
        iconAnchor: [12, 12],
        popupAnchor: [-3, 0],
      });

      const aqiStatus = ['Baik', 'Sedang', 'Tidak sehat untuk kelompok sensitif', 'Tidak sehat', 'Sangat tidak sehat', 'Berbahaya', 'Tidak terdeteksi adanya cemaran PM2.5'];
      L.marker([data.lat, data.lon], { icon: indexIcon }).addTo(map).bindPopup(`
        <div class="popup">
          <div class="container">
            <h3>${data.station.name}</h3>
            <p>Index Udara: ${data.aqi}</p>
            <p>${getAqiInfo(data.aqi, aqiStatus)}</p>
            <a href="/#/detail/${data.uid}">Selengkapnya</a>
          </div>
        </div>
    `);
    });
  },
};

export default Maps;
