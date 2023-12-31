import CONFIG from './config';

const API_ENDPOPINTS = {
  ALL_INDONESIA_STATIONS: `${CONFIG.WAQI_BASE_URL}v2/map/bounds?latlng=6.228,93.955,-10.05,142.031&networks=all&token=${CONFIG.TOKEN}`,
  AIRWATCH_ALL_ARTICLES: `${CONFIG.AIRWATCH_ARTICLES_BASE_URL}/articles`,
  STATION_DETAIL: id => `${CONFIG.WAQI_BASE_URL}feed/@${id}/?token=${CONFIG.TOKEN}`,
  AIRWATCH_ARTICLE_DETAIL: id => `${CONFIG.AIRWATCH_ARTICLES_BASE_URL}/articles/${id}`,
};

export default API_ENDPOPINTS;
