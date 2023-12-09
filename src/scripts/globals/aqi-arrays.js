const aqi = {
  status: [
    'Baik',
    'Sedang',
    'Tidak sehat untuk kelompok sensitif',
    'Tidak sehat',
    'Sangat tidak sehat',
    'Berbahaya',
    'Polutan Tidak Terdeteksi',
  ],
  colors: ['#38d020', '#E7BE27', '#F28330', '#E9474A', '#923BC5', '#7B2D51', 'lightgray'],
  class: [
    'good',
    'moderate',
    'unhealthy-groups',
    'unhealthy',
    'very-unhealthy',
    'hazardous',
    'good',
  ],
  classUrl: [
    'good-url',
    'moderate-url',
    'unhealthy-groups-url',
    'unhealthy-url',
    'very-unhealthy-url',
    'hazardous-url',
    'good-url',
  ],
  info: [
    'Indeks udara dalam kategori baik menandakan bahwa kualitas udara sedang atau sangat bersih, dan tidak menimbulkan risiko kesehatan bagi masyarakat umum. Aktivitas luar ruangan dapat dilakukan dengan nyaman tanpa mempengaruhi kesehatan pernapasan.',
    'Status sedang menunjukkan bahwa kualitas udara masih dapat ditoleransi, meskipun individu yang sangat peka terhadap polusi udara mungkin mengalami efek kesehatan minimal. Disarankan bagi kelompok sensitif untuk mengurangi aktivitas luar ruangan yang berkepanjangan.',
    'Pada status ini, kualitas udara dapat memengaruhi kelompok sensitif seperti anak-anak, lansia, atau individu dengan penyakit pernapasan. Kelompok ini sebaiknya membatasi aktivitas luar ruangan dan mengikuti saran kesehatan yang disarankan oleh otoritas kesehatan.',
    'Kategori tidak sehat menandakan bahwa kualitas udara dapat menyebabkan efek kesehatan pada masyarakat umum. Semua orang, terlepas dari kelompok sensitif, disarankan untuk membatasi aktivitas luar ruangan, terutama jika memiliki masalah pernapasan.',
    'Status ini mengindikasikan bahwa kualitas udara sangat buruk dan dapat menyebabkan efek kesehatan serius. Semua orang harus membatasi aktivitas luar ruangan sebanyak mungkin dan mengambil langkah-langkah perlindungan tambahan.',
    'Pada kondisi berbahaya, kualitas udara sangat buruk dan dapat memberikan risiko kesehatan yang serius. Semua orang seharusnya menghindari aktivitas luar ruangan, dan jika mungkin, menggunakan masker atau perlindungan lainnya saat berada di luar. Langkah-langkah pencegahan ekstra harus diambil untuk melindungi kesehatan pernapasan.',
  ],
};

export default aqi;
