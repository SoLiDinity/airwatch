import API_ENDPOPINTS from '../globals/api-endpoints';
import OPTIONS from '../globals/fetch-options';
import CustomAlert from '../utils/custom-alert-initiator';
import Loader from '../utils/loader-performer';

class DataSource {
  static async allIndonesiaStationsData() {
    Loader.performLoader();
    try {
      const response = await fetch(API_ENDPOPINTS.ALL_INDONESIA_STATIONS, OPTIONS.method('GET'));
      const responseJson = await response.json();

      const excludedCountries = ['malaysia', 'thailand', 'singapore', 'brunei'];
      const excludedCities = [
        'miri',
        'kuala lumpur',
        'bukit bintang',
        'klcc',
        'ipoh',
        'perai',
        'M702 AQMS-MDP IT Store Station',
      ];
      const isAlphanumeric = str => /^[a-zA-Z0-9\s$%,-]+$/i.test(str);
      const indonesiaStations = responseJson.data.filter(data => {
        const stationNameLower = data.station.name.toLowerCase();
        const { aqi } = data;
        const isExcluded =
          excludedCountries.some(country => stationNameLower.includes(country)) ||
          excludedCities.some(city => stationNameLower.includes(city)) ||
          !isAlphanumeric(stationNameLower) ||
          aqi === '-';

        return !isExcluded;
      });

      setTimeout(() => {
        Loader.finishLoader();
      }, 500);

      return indonesiaStations;
    } catch (error) {
      setTimeout(() => {
        Loader.finishLoader();
      }, 500);

      CustomAlert.init({
        backgroundColor: 'red',
        message: `<i class="fa-solid fa-triangle-exclamation"></i> Gagal: ${error.message}`,
      });

      return `Gagal: ${error.message}`;
    }
  }

  static async stationDetail(id, loader = true) {
    if (loader) {
      Loader.performLoader();
    }

    try {
      const response = await fetch(API_ENDPOPINTS.STATION_DETAIL(id));
      const responseJson = await response.json();

      if (loader) {
        setTimeout(() => {
          Loader.finishLoader();
        }, 500);
      }

      return responseJson.data;
    } catch (error) {
      if (loader) {
        setTimeout(() => {
          Loader.finishLoader();
        }, 500);
      }

      CustomAlert.init({
        backgroundColor: 'red',
        message: `<i class="fa-solid fa-triangle-exclamation"></i> Gagal: ${error.message}`,
      });

      return `Gagal: ${error.message}`;
    }
  }

  static async summaryIdnAqi() {
    const allIndonesiaAqi = await this.allIndonesiaStationsData();
    const promises = allIndonesiaAqi.map(station => this.stationDetail(station.uid, false));

    const allAqiData = await Promise.all(promises);

    const validFilteredAqiData = allAqiData.filter(
      stationDetailData =>
        stationDetailData &&
        stationDetailData.attributions[0]?.url === 'http://www.bmkg.go.id/' &&
        stationDetailData.aqi !== null,
    );

    const sortedDataAqi = [...validFilteredAqiData].sort((a, b) => b.aqi - a.aqi);

    const topAqi = sortedDataAqi.slice(0, 10);
    const bottomAqi = sortedDataAqi.slice(-10).reverse();

    const totalAqi = validFilteredAqiData.reduce(
      (sum, station) => sum + parseInt(station.aqi, 10),
      0,
    );

    const latestUpdate = Math.max(
      ...validFilteredAqiData.map(station => new Date(station.time.s).getTime()),
    );
    const latestUpdateDate = new Date(latestUpdate);

    const currentDate = new Date();
    const timeDifference = currentDate - latestUpdateDate;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    const formattedLatestUpdate = `${
      hoursDifference > 0 ? `${hoursDifference} jam` : ''
    } ${minutesDifference} menit yang lalu (${latestUpdateDate.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    })})`;

    return {
      topAqi,
      bottomAqi,
      averageAqi: Math.round(totalAqi / validFilteredAqiData.length),
      latestUpdate: formattedLatestUpdate,
    };
  }

  static async allBlogsArticles(loader = true) {
    if (loader) {
      Loader.performLoader();
    }

    try {
      const response = await fetch(API_ENDPOPINTS.AIRWATCH_ALL_ARTICLES, OPTIONS.method('GET'));
      const responseJson = await response.json();

      if (loader) {
        setTimeout(() => {
          Loader.finishLoader();
        }, 500);
      }

      return responseJson.data;
    } catch (error) {
      if (loader) {
        setTimeout(() => {
          Loader.finishLoader();
        }, 500);
      }

      CustomAlert.init({
        backgroundColor: 'red',
        message: `<i class="fa-solid fa-triangle-exclamation"></i> Gagal: ${error.message}`,
      });

      return `Gagal: ${error.message}`;
    }
  }

  static async specificBlogsArticlesById(id) {
    Loader.performLoader();
    try {
      const response = await fetch(
        API_ENDPOPINTS.AIRWATCH_ARTICLE_DETAIL(id),
        OPTIONS.method('GET'),
      );

      setTimeout(() => {
        Loader.finishLoader();
      }, 800);

      const responseJson = await response.json();

      return responseJson.data;
    } catch (error) {
      setTimeout(() => {
        Loader.finishLoader();
      }, 500);

      CustomAlert.init({
        backgroundColor: 'red',
        message: `<i class="fa-solid fa-triangle-exclamation"></i> Gagal: ${error.message}`,
      });

      return `Gagal: ${error.message}`;
    }
  }
}

export default DataSource;
