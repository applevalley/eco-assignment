// 각 페이지 주소를 직접 입력하지 않고, 객체의 속성을 통해 접근하게 하기 위한 상수 선언
export const PAGE_URL = {
  MAIN: "/", // 메인 페이지
};

// 각 API 주소를 api 호출부에서 직접 입력하지 않게 하기 위한 상수 선언
export const API_URL = {
  ULTRA_WEATHER_LIVE: "/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst", // 초단기실황조회
  ULTRA_WEATHER_FORECAST: "/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst", // 초단기예보조회
  WEATHER_FORECAST: "/1360000/VilageFcstInfoService_2.0/getVilageFcst", // 단기예보조회
  FORECAST_VERSION: "/1360000/VilageFcstInfoService_2.0/getFcstVersion", // 예보버전조회

  MID_FORECAST: "/1360000/MidFcstInfoService/getMidFcst", // 중기전망조회
  MID_LAND_FORECAST: "/1360000/MidFcstInfoService/getMidLandFcst", // 중기육상예보조회
  MID_TEMPERATURE: "/1360000/MidFcstInfoService/getMidTa", // 중기기온조회
  MID_SEA: "/1360000/MidFcstInfoService/getMidSeaFcst", // 중기해상예보조회
};
