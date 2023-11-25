import * as L from 'leaflet';
import { GestureHandling } from 'leaflet-gesture-handling';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import DataSource from '../../data/data-source';

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

    const mapLink = '<a href="http://www.esri.com/">Esri</a>';
    const dataLink = '<a href="http://aqicn.corg/">AQICN</a>';

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: `&copy; ${mapLink} | data by &copy; ${dataLink}`,
      maxZoom: 18,
    }).addTo(map);

    const indonesiaStations = await DataSource.alllIndonesiaStationsData();

    indonesiaStations.forEach((data) => {
      const getAirQualityStatusClass = (aqi) => {
        if (aqi <= 50) {
          return 'good';
        }
        if (aqi > 50 && aqi <= 100) {
          return 'moderate';
        }
        if (aqi > 100 && aqi <= 150) {
          return 'unhealthy-groups';
        }
        if (aqi > 150 && aqi <= 200) {
          return 'unhealthy';
        }
        if (aqi > 200 && aqi <= 300) {
          return 'very-unhealthy';
        }
        if (aqi > 300 && aqi <= 500) {
          return 'hazardous';
        }
        return 'index-nan';
      };

      const indexIcon = L.divIcon({
        html: `
          <div
            id="indexOnMapContainer"
            class="${getAirQualityStatusClass(data.aqi)}"
          >${data.aqi}</div>
        `,
        className: 'indexOnMap',
        iconSize: [50, 50],
        iconAnchor: [12, 12],
        popupAnchor: [-3, 0],
      });

      const getAirQualityStatus = (aqi) => {
        if (aqi <= 50) {
          return 'Baik';
        }
        if (aqi > 50 && aqi <= 100) {
          return 'Sedang';
        }
        if (aqi > 100 && aqi <= 150) {
          return 'Tidak sehat untuk kelompok sensitif';
        }
        if (aqi > 150 && aqi <= 200) {
          return 'Tidak sehat';
        }
        if (aqi > 200 && aqi <= 300) {
          return 'Sangat tidak sehat';
        }
        if (aqi > 300 && aqi <= 500) {
          return 'Berbahaya';
        }
        return 'Data tidak ada';
      };

      L.marker([data.lat, data.lon], { icon: indexIcon }).addTo(map).bindPopup(`
        <div class="popup">
          <div class="container">
            <h3>${data.station.name}</h3>
            <p>Index Udara: ${data.aqi}</p>
            <p>${getAirQualityStatus(data.aqi)}</p>
            <a href="/#/detail/${data.uid}">Selengkapnya</a>
          </div>
        </div>
    `);
    });
  },
};

export default Maps;
