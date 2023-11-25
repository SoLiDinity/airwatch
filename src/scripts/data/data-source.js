import API_ENDPOPINTS from '../globals/api-endpoints';
import OPTIONS from '../globals/fetch-options';

class DataSource {
  static async alllIndonesiaStationsData() {
    try {
      const response = await fetch(API_ENDPOPINTS.GET_ALL_INDONESIA_DATA, OPTIONS.method('GET'));
      const responseJson = await response.json();

      const excludedCountries = ['malaysia', 'thailand', 'singapore', 'brunei'];
      const excludedCities = ['miri', 'kuala lumpur', 'bukit bintang', 'klcc', 'ipoh', 'perai'];

      const indonesiaStations = responseJson.data.filter((data) => {
        const stationNameLower = data.station.name.toLowerCase();
        const isExcluded = excludedCountries.some((country) => stationNameLower.includes(country))
          || excludedCities.some((city) => stationNameLower.includes(city));

        return !isExcluded;
      });

      return indonesiaStations;
    } catch (error) {
      return `Gagal: ${error.message}`;
    }
  }
}

export default DataSource;
