import API_ENDPOPINTS from '../globals/api-endpoints';
import OPTIONS from '../globals/fetch-options';

class DataSource {
  static async alllIndonesiaStationsData() {
    try {
      const response = await fetch(API_ENDPOPINTS.ALL_INDONESIA_STATIONS, OPTIONS.method('GET'));
      const responseJson = await response.json();

      const excludedCountries = ['malaysia', 'thailand', 'singapore', 'brunei'];
      const excludedCities = ['miri', 'kuala lumpur', 'bukit bintang', 'klcc', 'ipoh', 'perai'];
      const isAlphanumeric = str => /^[a-zA-Z0-9\s$%,-]+$/i.test(str);
      const indonesiaStations = responseJson.data.filter(data => {
        const stationNameLower = data.station.name.toLowerCase();
        const aqi = data.aqi;
        const isExcluded =
          excludedCountries.some(country => stationNameLower.includes(country)) ||
          excludedCities.some(city => stationNameLower.includes(city)) ||
          !isAlphanumeric(stationNameLower) ||
          aqi === '-';

        return !isExcluded;
      });

      return indonesiaStations;
    } catch (error) {
      return `Gagal: ${error.message}`;
    }
  }

  static async stationDetail(id) {
    try {
      const response = await fetch(API_ENDPOPINTS.STATION_DETAIL(id));
      const responseJson = await response.json();

      return responseJson.data;
    } catch (error) {
      return `Gagal: ${error.message}`;
    }
  }

  static async summaryIdnAqi() {
    const allIndonesiaAqi = await this.alllIndonesiaStationsData();
    let latestUpdate;
    const filteredAqiData = await Promise.all(
      allIndonesiaAqi.map(async (station) => {
        const stationDetailData = await this.stationDetail(station.uid);
        latestUpdate = stationDetailData.time.s;
        if (
          stationDetailData.attributions[0].url === 'http://www.bmkg.go.id/'
          && stationDetailData.aqi !== null
        ) {
          if (stationDetailData.time.s > latestUpdate) {
            latestUpdate = stationDetailData.time.s;
          }
          return stationDetailData;
        }
        return null;
      }),
    );

    const validFilteredAqiData = filteredAqiData.filter(
      (data) => data !== null,
    );

    const sortedDataAqi = [...validFilteredAqiData].sort(
      (a, b) => b.aqi - a.aqi,
    );

    const topAqi = sortedDataAqi.slice(0, 10);
    const bottomAqi = sortedDataAqi.slice(-10).reverse();
    const totalAqi = validFilteredAqiData.reduce(
      (sum, station) => sum + parseInt(station.aqi, 10),
      0,
    );
    const averageAqi = Math.round(totalAqi / validFilteredAqiData.length);

    const updateDate = new Date(latestUpdate);
    const currentDate = new Date();

    const timeDifference = currentDate - updateDate;
    const hoursDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutesDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    return {
      topAqi,
      bottomAqi,
      averageAqi,
      latestUpdate,
      hoursDifference,
      minutesDifference,
    };
  }
}

export default DataSource;
