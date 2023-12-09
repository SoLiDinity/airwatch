import CONFIG from './config';

const API_ENDPOPINTS = {
  ALL_INDONESIA_STATIONS: `${CONFIG.BASE_URL}v2/map/bounds?latlng=6.228,93.955,-10.05,142.031&networks=all&token=${CONFIG.TOKEN}`,
  STATION_DETAIL: id => `${CONFIG.BASE_URL}feed/@${id}/?token=${CONFIG.TOKEN}`,
};

export default API_ENDPOPINTS;
